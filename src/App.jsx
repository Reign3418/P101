import React, { useState, useEffect } from 'react';
import { getLocalizedChapters } from './data/chaptersData.js';
import { TRANSLATIONS } from './data/translations.js';
import { usePyodide } from './hooks/usePyodide.js';
import { useVoice } from './hooks/useVoice.js';
import { Sidebar } from './components/Sidebar.jsx';
import { Header } from './components/Header.jsx';
import { WhyBox } from './components/WhyBox.jsx';
import { ConceptBox } from './components/ConceptBox.jsx';
import { TrapBox } from './components/TrapBox.jsx';
import { CodingRepLab } from './components/CodingRepLab.jsx';
import { QuizBox } from './components/QuizBox.jsx';
import { CitationModal } from './components/CitationModal.jsx';
import { NotebookViewer } from './components/NotebookViewer.jsx';
import { ReviewModal } from './components/ReviewModal.jsx';
import { WhitePaperModal } from './components/WhitePaperModal.jsx';
import { useLearningStats } from './hooks/useLearningStats.js';
import { StatsDashboard } from './components/StatsDashboard.jsx';

export default function App() {
  const [lang, setLang] = useState(() => {
    try {
      return localStorage.getItem('p101_lang') || 'en';
    } catch {
      return 'en';
    }
  });

  const [theme, setTheme] = useState(() => {
    try {
      return localStorage.getItem('p101_theme') || 'dark';
    } catch {
      return 'dark';
    }
  });

  const toggleTheme = () => setTheme(prev => prev === 'dark' ? 'light' : 'dark');

  const [activeView, setActiveView] = useState('chapters'); // 'chapters' or 'notebook'
  const [activeChapterNum, setActiveChapterNum] = useState(1);
  const [importedNotebooks, setImportedNotebooks] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem('p101_user_notebooks') || '[]');
    } catch {
      return [];
    }
  });
  const [activeNotebookId, setActiveNotebookId] = useState(null);
  const [completedSections, setCompletedSections] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem('py_completed_sections') || '{}');
    } catch {
      return {};
    }
  });
  const [reviewQueue, setReviewQueue] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem('py_review_queue') || '{}');
    } catch {
      return {};
    }
  });
  const [isCitationOpen, setIsCitationOpen] = useState(false);
  const [isReviewModalOpen, setIsReviewModalOpen] = useState(false);
  const [isWhitePaperOpen, setIsWhitePaperOpen] = useState(false);

  // Internationalization helper
  const t = (key) => {
    return (TRANSLATIONS[lang] && TRANSLATIONS[lang][key]) || TRANSLATIONS.en[key] || key;
  };

  const { isReady: pyodideReady, executeCode } = usePyodide();
  const { speak, stop, isMuted, toggleMute, isSpeaking, voices, selectedVoiceName, selectVoice, activeVoice } = useVoice(lang);
  const { stats, repLog, sessionSeconds, logRep, logQuiz, resetStats } = useLearningStats(activeChapterNum);

  // Save state to localStorage
  useEffect(() => {
    localStorage.setItem('p101_lang', lang);
  }, [lang]);

  useEffect(() => {
    localStorage.setItem('p101_theme', theme);
  }, [theme]);

  useEffect(() => {
    localStorage.setItem('py_completed_sections', JSON.stringify(completedSections));
  }, [completedSections]);

  useEffect(() => {
    localStorage.setItem('py_review_queue', JSON.stringify(reviewQueue));
  }, [reviewQueue]);

  useEffect(() => {
    localStorage.setItem('p101_user_notebooks', JSON.stringify(importedNotebooks));
  }, [importedNotebooks]);

  const localizedChapters = getLocalizedChapters(lang);
  const activeChapter = localizedChapters.find(c => c.num === activeChapterNum) || localizedChapters[0];

  const handleSelectChapter = (chapterNum) => {
    setActiveChapterNum(chapterNum);
    setActiveView('chapters');
  };

  const handleAddNotebook = (newNb) => {
    setImportedNotebooks(prev => {
      const exists = prev.find(n => n.name === newNb.name);
      if (exists) {
        return prev.map(n => n.name === newNb.name ? newNb : n);
      }
      return [newNb, ...prev];
    });
    setActiveNotebookId(newNb.id);
    setActiveView('notebook');
  };

  const handleDeleteNotebook = (nbId) => {
    setImportedNotebooks(prev => prev.filter(n => n.id !== nbId));
    if (activeNotebookId === nbId) {
      setActiveNotebookId(null);
    }
  };

  const handleSelectNotebook = (nbId) => {
    setActiveNotebookId(nbId);
    setActiveView('notebook');
  };

  const handleOpenNotebookLab = () => {
    setActiveView('notebook');
  };

  const handleToggleComplete = (secId) => {
    setCompletedSections(prev => {
      const next = { ...prev };
      if (next[secId]) {
        delete next[secId];
      } else {
        next[secId] = true;
      }
      return next;
    });
  };

  const handleQuizAnswer = (secId, isCorrect) => {
    logQuiz(activeChapterNum, isCorrect);
    if (isCorrect) {
      setReviewQueue(prev => {
        const next = { ...prev };
        delete next[secId];
        return next;
      });
      setCompletedSections(prev => ({ ...prev, [secId]: true }));
    } else {
      setReviewQueue(prev => ({ ...prev, [secId]: true }));
    }
  };

  const handleTakeMeToReview = (secId) => {
    const el = document.getElementById(`why-box-${secId}`);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'center' });
      el.classList.add('highlight-focus');
      setTimeout(() => el.classList.remove('highlight-focus'), 4500);
      const sec = activeChapter.sections.find(s => s.id === secId);
      if (sec) {
        const intro = lang === 'es' ? "Aquí está el porqué de este concepto: " : "Here is the why behind this concept: ";
        speak(intro + sec.why, { rate: 0.92 });
      }
    }
  };

  const handleSpeakWhy = (text) => {
    speak(text, { rate: 0.95, pitch: 1.02 });
  };

  const reviewItems = Object.keys(reviewQueue).map(id => {
    for (const ch of localizedChapters) {
      const sec = ch.sections.find(s => s.id === id);
      if (sec) {
        return {
          id,
          chapterNum: ch.num,
          chapterTitle: ch.title,
          sectionNum: sec.num,
          sectionTitle: sec.title,
          why: sec.why
        };
      }
    }
    return { id, isOrphaned: true };
  });

  const handleFilterReviewQueue = () => {
    setIsReviewModalOpen(true);
  };

  const handleDismissReviewItem = (secId) => {
    setReviewQueue(prev => {
      const next = { ...prev };
      delete next[secId];
      return next;
    });
  };

  const handleClearAllReviews = () => {
    setReviewQueue({});
  };

  const handleJumpToReviewSection = (chapterNum, secId) => {
    setIsReviewModalOpen(false);
    setActiveView('chapters');
    setActiveChapterNum(chapterNum);

    setTimeout(() => {
      const el = document.getElementById(`sec-${secId}`) || document.getElementById(`why-box-${secId}`);
      if (el) {
        el.scrollIntoView({ behavior: 'smooth', block: 'center' });
        el.classList.add('highlight-focus');
        setTimeout(() => el.classList.remove('highlight-focus'), 4500);

        const ch = localizedChapters.find(c => c.num === chapterNum);
        const sec = ch?.sections.find(s => s.id === secId);
        if (sec && !isMuted) {
          const intro = lang === 'es'
            ? "Aquí está el repaso de este concepto: "
            : "Reviewing concept: ";
          speak(intro + sec.why, { rate: 0.92 });
        }
      }
    }, 300);
  };

  const handleJumpToCurriculum = (chNum, secId) => {
    setActiveChapterNum(chNum);
    setActiveView('chapters');
    if (secId) {
      setTimeout(() => {
        const el = document.getElementById(`sec-${secId}`) || document.getElementById(`why-box-${secId}`);
        if (el) {
          el.scrollIntoView({ behavior: 'smooth', block: 'center' });
          el.classList.add('highlight-focus');
          setTimeout(() => el.classList.remove('highlight-focus'), 4500);
        }
      }, 300);
    }
  };

  const handleResetProgress = () => {
    if (window.confirm(t('resetConfirm'))) {
      setCompletedSections({});
      setReviewQueue({});
      localStorage.removeItem('py_completed_sections');
      localStorage.removeItem('py_review_queue');
    }
  };

  return (
    <div className="flex h-screen w-screen overflow-hidden bg-slate-950 text-slate-100" data-theme={theme}>
      {/* Sidebar Navigation */}
      <Sidebar
        chapters={localizedChapters}
        activeChapterNum={activeChapterNum}
        onSelectChapter={handleSelectChapter}
        completedSections={completedSections}
        reviewQueue={reviewQueue}
        onFilterReviewQueue={handleFilterReviewQueue}
        onResetProgress={handleResetProgress}
        onOpenCitation={() => setIsCitationOpen(true)}
        onOpenWhitePaper={() => setIsWhitePaperOpen(true)}
        activeView={activeView}
        notebooks={importedNotebooks}
        activeNotebookId={activeNotebookId}
        onSelectNotebook={handleSelectNotebook}
        onOpenNotebookLab={handleOpenNotebookLab}
        t={t}
        lang={lang}
        onOpenStats={() => setActiveView('stats')}
        sessionSeconds={sessionSeconds}
        totalReps={repLog.length}
      />

      {/* Right Panel: Header always on top, content below */}
      <div className="flex-1 flex flex-col h-full overflow-hidden">
        {/* Global Header — always visible across all views */}
        <Header
          activeChapter={activeChapter}
          totalChapters={localizedChapters.length}
          sections={activeChapter.sections}
          onOpenCitation={() => setIsCitationOpen(true)}
          onOpenWhitePaper={() => setIsWhitePaperOpen(true)}
          onOpenStats={() => setActiveView('stats')}
          activeView={activeView}
          isMuted={isMuted}
          onToggleMute={toggleMute}
          isSpeaking={isSpeaking}
          voices={voices}
          selectedVoiceName={selectedVoiceName}
          onSelectVoice={selectVoice}
          activeVoice={activeVoice}
          pyodideReady={pyodideReady}
          lang={lang}
          onToggleLang={setLang}
          t={t}
          theme={theme}
          onToggleTheme={toggleTheme}
        />

        {/* Main View: Either Notebook Viewer, Stats Dashboard, or Standard Chapters */}
        {activeView === 'notebook' ? (
          <NotebookViewer
            notebooks={importedNotebooks}
            activeNotebookId={activeNotebookId}
            onSelectNotebook={handleSelectNotebook}
            onAddNotebook={handleAddNotebook}
            onDeleteNotebook={handleDeleteNotebook}
            onExecuteCode={executeCode}
            pyodideReady={pyodideReady}
            t={t}
            lang={lang}
            chapters={localizedChapters}
            onJumpToCurriculum={handleJumpToCurriculum}
          />
        ) : activeView === 'stats' ? (
          <StatsDashboard
            stats={stats}
            sessionSeconds={sessionSeconds}
            repLog={repLog}
            chapters={localizedChapters}
            completedSections={completedSections}
            onJumpToModule={(chNum) => {
              setActiveChapterNum(chNum);
              setActiveView('chapters');
            }}
            onBackToCurriculum={() => setActiveView('chapters')}
            onOpenNotebookLab={handleOpenNotebookLab}
            onResetStats={resetStats}
            t={t}
            lang={lang}
          />
        ) : (
          /* Main Study Area */
          <main className="flex-1 overflow-y-auto custom-scroll p-4 md:p-8 space-y-8 bg-slate-950">
            {/* Chapter Banner */}
            <div className="bg-gradient-to-r from-blue-900/40 via-indigo-900/30 to-purple-900/20 border border-blue-500/20 rounded-2xl p-6 shadow-xl">
              <div className="flex items-center gap-4">
                <span className="text-4xl">{activeChapter.icon}</span>
                <div>
                  <div className="flex flex-wrap items-center gap-2 mb-1.5">
                    <span className="text-xs font-mono font-bold uppercase tracking-wider text-blue-400 bg-blue-500/10 border border-blue-500/20 px-2 py-0.5 rounded">
                      {activeChapter.code_module || `${t('chapter')} ${activeChapter.num}`}
                    </span>
                    {activeChapter.prof_source && (
                      <span className="text-[10px] font-mono text-purple-300 bg-purple-500/15 border border-purple-500/30 px-2 py-0.5 rounded">
                        {activeChapter.prof_source}
                      </span>
                    )}
                  </div>
                  <h2 className="text-2xl font-bold text-white">{activeChapter.title}</h2>
                  <p className="text-xs text-slate-300 mt-1 max-w-2xl">{activeChapter.desc}</p>
                </div>
              </div>
            </div>

            {/* Sections List */}
            <div className="space-y-6">
              {activeChapter.sections.map(sec => {
                const isDone = completedSections[sec.id] || false;

                return (
                  <div 
                    key={sec.id}
                    id={`sec-${sec.id}`}
                    className="bg-slate-900 border border-slate-800 rounded-2xl p-5 md:p-6 shadow-md space-y-5 transition-all"
                  >
                    {/* Section Title Header */}
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-800 pb-3">
                      <div>
                        <span className="text-[11px] font-mono px-2 py-0.5 rounded bg-blue-500/10 text-blue-400 border border-blue-500/20 font-bold">
                          {t('section')} {sec.num}
                        </span>
                        <h3 className="text-lg font-bold text-white mt-1">{sec.title}</h3>
                      </div>

                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => handleToggleComplete(sec.id)}
                          className={`flex items-center gap-1.5 px-3 py-1 rounded-lg text-xs transition-colors border shadow-sm ${
                            isDone 
                              ? 'bg-emerald-500/20 text-emerald-300 border-emerald-500/40 font-bold' 
                              : 'bg-slate-800 text-slate-400 hover:text-slate-200 border-slate-700'
                          }`}
                        >
                          <span>{isDone ? '✓' : '○'}</span>
                          <span>{isDone ? t('mastered') : t('markLearned')}</span>
                        </button>
                      </div>
                    </div>

                    {/* 1. The Why Box */}
                    <WhyBox
                      sectionId={sec.id}
                      whyText={sec.why}
                      bookRef={sec.book_ref}
                      breakdown={sec.breakdown}
                      deepDive={sec.deep_dive}
                      onSpeak={handleSpeakWhy}
                      t={t}
                      lang={lang}
                    />

                    {/* 2. Mechanics & Code Snippet */}
                    <ConceptBox
                      section={sec}
                      onRunCode={executeCode}
                      t={t}
                      lang={lang}
                    />

                    {/* 3. Coding Reps Lab (Randomized Pyodide Workouts) */}
                    <CodingRepLab
                      repData={sec.rep}
                      onExecuteCode={executeCode}
                      onCompleteRep={(repDetails) => {
                        if (!completedSections[sec.id]) {
                          handleToggleComplete(sec.id);
                        }
                        logRep({
                          sectionId: sec.id,
                          sectionNum: sec.num,
                          chapterNum: activeChapter.num,
                          moduleTitle: activeChapter.code_module || `Module ${activeChapter.num}`,
                          sectionTitle: sec.title,
                          testVar: repDetails?.testVar || sec.rep?.test_var,
                          actualVal: repDetails?.actualVal ?? sec.rep?.expected_val,
                          elapsed: repDetails?.elapsed || 0
                        });
                      }}
                      onViewRepLog={() => setActiveView('stats')}
                      pyodideReady={pyodideReady}
                      t={t}
                      lang={lang}
                    />

                    {/* 4. Common Trap / Pitfall */}
                    <TrapBox 
                      pitfall={sec.pitfall} 
                      t={t} 
                    />

                    {/* 5. Checkpoint Quiz */}
                    <QuizBox
                      sectionId={sec.id}
                      quizData={sec.quiz}
                      onAnswer={handleQuizAnswer}
                      onTakeMeToReview={handleTakeMeToReview}
                      t={t}
                      lang={lang}
                    />
                  </div>
                );
              })}
            </div>
          </main>
        )}
      </div>

      {/* Academic Citation Modal */}
      <CitationModal
        isOpen={isCitationOpen}
        onClose={() => setIsCitationOpen(false)}
        t={t}
        lang={lang}
      />

      {/* Review Queue Modal */}
      <ReviewModal
        isOpen={isReviewModalOpen}
        onClose={() => setIsReviewModalOpen(false)}
        reviewItems={reviewItems}
        onJumpToSection={handleJumpToReviewSection}
        onDismissItem={handleDismissReviewItem}
        onClearAll={handleClearAllReviews}
        t={t}
        lang={lang}
      />

      {/* Academic Theory White Paper Modal */}
      <WhitePaperModal
        isOpen={isWhitePaperOpen}
        onClose={() => setIsWhitePaperOpen(false)}
        t={t}
        lang={lang}
        onToggleLang={setLang}
      />
    </div>
  );
}
