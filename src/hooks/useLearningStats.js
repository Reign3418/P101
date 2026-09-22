import { useState, useEffect, useRef, useCallback } from 'react';

const STATS_STORAGE_KEY = 'p101_learning_stats';
const REP_LOG_STORAGE_KEY = 'p101_rep_log';
const IDLE_TIMEOUT_MS = 2 * 60 * 1000; // 2 minutes idle threshold

export function useLearningStats(activeChapterNum) {
  // Load saved statistics or default
  const [stats, setStats] = useState(() => {
    try {
      const saved = localStorage.getItem(STATS_STORAGE_KEY);
      if (saved) return JSON.parse(saved);
    } catch (e) {
      console.error('Failed to load stats:', e);
    }
    return {
      totalSeconds: 0,
      modules: {},
      firstUsed: Date.now(),
      lastUsed: Date.now()
    };
  });

  // Load rep log or default
  const [repLog, setRepLog] = useState(() => {
    try {
      const saved = localStorage.getItem(REP_LOG_STORAGE_KEY);
      if (saved) return JSON.parse(saved);
    } catch (e) {
      console.error('Failed to load rep log:', e);
    }
    return [];
  });

  const [sessionSeconds, setSessionSeconds] = useState(0);
  const lastActiveRef = useRef(Date.now());
  const isIdleRef = useRef(false);
  const activeChapterRef = useRef(activeChapterNum);

  useEffect(() => {
    activeChapterRef.current = activeChapterNum;
  }, [activeChapterNum]);

  // Track user activity to prevent idle time accumulation
  useEffect(() => {
    const handleActivity = () => {
      lastActiveRef.current = Date.now();
      if (isIdleRef.current) {
        isIdleRef.current = false;
      }
    };

    const handleVisibilityChange = () => {
      if (document.hidden) {
        isIdleRef.current = true;
      } else {
        lastActiveRef.current = Date.now();
        isIdleRef.current = false;
      }
    };

    window.addEventListener('mousemove', handleActivity);
    window.addEventListener('keydown', handleActivity);
    window.addEventListener('scroll', handleActivity, { passive: true });
    window.addEventListener('click', handleActivity);
    document.addEventListener('visibilitychange', handleVisibilityChange);

    return () => {
      window.removeEventListener('mousemove', handleActivity);
      window.removeEventListener('keydown', handleActivity);
      window.removeEventListener('scroll', handleActivity);
      window.removeEventListener('click', handleActivity);
      document.removeEventListener('visibilitychange', handleVisibilityChange);
    };
  }, []);

  // Record a module visit whenever active chapter changes
  useEffect(() => {
    if (!activeChapterNum) return;

    setStats(prev => {
      const currentMod = prev.modules[activeChapterNum] || {
        timeSeconds: 0,
        visits: 0,
        repsCount: 0,
        quizzesPassed: 0,
        lastActive: null
      };

      const next = {
        ...prev,
        lastUsed: Date.now(),
        modules: {
          ...prev.modules,
          [activeChapterNum]: {
            ...currentMod,
            visits: currentMod.visits + 1,
            lastActive: Date.now()
          }
        }
      };

      try {
        localStorage.setItem(STATS_STORAGE_KEY, JSON.stringify(next));
      } catch (err) {
        console.error('Error saving module visit:', err);
      }
      return next;
    });
  }, [activeChapterNum]);

  // Main 1-second interval timer for session and module study time
  useEffect(() => {
    const interval = setInterval(() => {
      const now = Date.now();
      if (now - lastActiveRef.current > IDLE_TIMEOUT_MS || document.hidden) {
        isIdleRef.current = true;
        return;
      }

      setSessionSeconds(prev => prev + 1);

      const chNum = activeChapterRef.current;
      setStats(prev => {
        const currentMod = prev.modules[chNum] || {
          timeSeconds: 0,
          visits: 1,
          repsCount: 0,
          quizzesPassed: 0,
          lastActive: now
        };

        const updated = {
          ...prev,
          totalSeconds: (prev.totalSeconds || 0) + 1,
          lastUsed: now,
          modules: {
            ...prev.modules,
            [chNum]: {
              ...currentMod,
              timeSeconds: (currentMod.timeSeconds || 0) + 1,
              lastActive: now
            }
          }
        };

        // Persist to localStorage every 5 seconds to reduce write thrashing
        if (updated.totalSeconds % 5 === 0) {
          try {
            localStorage.setItem(STATS_STORAGE_KEY, JSON.stringify(updated));
          } catch (e) {
            console.error('Error syncing stats:', e);
          }
        }

        return updated;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  // Explicit log function for completed repetitions
  const logRep = useCallback((repEntry) => {
    const newEntry = {
      id: 'rep_' + Date.now() + '_' + Math.random().toString(36).substring(2, 6),
      timestamp: Date.now(),
      ...repEntry
    };

    setRepLog(prev => {
      const updated = [newEntry, ...prev].slice(0, 500); // keep up to 500 reps
      try {
        localStorage.setItem(REP_LOG_STORAGE_KEY, JSON.stringify(updated));
      } catch (e) {
        console.error('Error saving rep log:', e);
      }
      return updated;
    });

    // Also increment repsCount for this module
    if (repEntry.chapterNum) {
      setStats(prev => {
        const mod = prev.modules[repEntry.chapterNum] || {
          timeSeconds: 0,
          visits: 1,
          repsCount: 0,
          quizzesPassed: 0,
          lastActive: Date.now()
        };

        const updated = {
          ...prev,
          lastUsed: Date.now(),
          modules: {
            ...prev.modules,
            [repEntry.chapterNum]: {
              ...mod,
              repsCount: (mod.repsCount || 0) + 1,
              lastActive: Date.now()
            }
          }
        };

        try {
          localStorage.setItem(STATS_STORAGE_KEY, JSON.stringify(updated));
        } catch (e) {
          console.error('Error updating module rep stats:', e);
        }
        return updated;
      });
    }
  }, []);

  // Explicit log function for quiz answers
  const logQuiz = useCallback((chapterNum, isCorrect) => {
    if (!chapterNum || !isCorrect) return;

    setStats(prev => {
      const mod = prev.modules[chapterNum] || {
        timeSeconds: 0,
        visits: 1,
        repsCount: 0,
        quizzesPassed: 0,
        lastActive: Date.now()
      };

      const updated = {
        ...prev,
        modules: {
          ...prev.modules,
          [chapterNum]: {
            ...mod,
            quizzesPassed: (mod.quizzesPassed || 0) + 1,
            lastActive: Date.now()
          }
        }
      };

      try {
        localStorage.setItem(STATS_STORAGE_KEY, JSON.stringify(updated));
      } catch (e) {
        console.error('Error saving quiz stats:', e);
      }
      return updated;
    });
  }, []);

  // Reset all stats & rep logs
  const resetStats = useCallback(() => {
    const emptyStats = {
      totalSeconds: 0,
      modules: {},
      firstUsed: Date.now(),
      lastUsed: Date.now()
    };
    setStats(emptyStats);
    setRepLog([]);
    setSessionSeconds(0);
    try {
      localStorage.removeItem(STATS_STORAGE_KEY);
      localStorage.removeItem(REP_LOG_STORAGE_KEY);
    } catch (e) {
      console.error('Error clearing stats:', e);
    }
  }, []);

  return {
    stats,
    repLog,
    sessionSeconds,
    logRep,
    logQuiz,
    resetStats
  };
}
