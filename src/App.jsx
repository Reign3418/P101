import React, { useState, useEffect } from 'react';
import { CHAPTERS_DATA } from './data/chaptersData.js';
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

export default function App() {
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

  const { isReady: pyodideReady, executeCode } = usePyodide();
  const { speak, stop, isMuted, toggleMute, isSpeaking, voices, selectedVoiceName, selectVoice, activeVoice } = useVoice();

  // Save progress to localStorage
  useEffect(() => {
    localStorage.setItem('py_completed_sections', JSON.stringify(completedSections));
  }, [completedSections]);

  useEffect(() => {
    localStorage.setItem('py_review_queue', JSON.stringify(reviewQueue));
  }, [reviewQueue]);

  useEffect(() => {
    localStorage.setItem('p101_user_notebooks', JSON.stringify(importedNotebooks));
  }, [importedNotebooks]);

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

  const activeChapter = CHAPTERS_DATA.find(c => c.num === activeChapterNum) || CHAPTERS_DATA[0];

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
      if (sec) speak("Here is the why behind this concept: " + sec.why, { rate: 0.92 });
    }
  };

  const handleSpeakWhy = (text) => {
    speak(text, { rate: 0.95, pitch: 1.02 });
  };

  const handleFilterReviewQueue = () => {
    const queueIds = Object.keys(reviewQueue);
    if (queueIds.length === 0) return;
    const targetChapter = CHAPTERS_DATA.find(ch => ch.sections.some(s => queueIds.includes(s.id)));
    if (targetChapter) {
      setActiveChapterNum(targetChapter.num);
    }
  };

  const handleResetProgress = () => {
    if (window.confirm("Reset all learning mastery and review queue data?")) {
      setCompletedSections({});
      setReviewQueue({});
      localStorage.removeItem('py_completed_sections');
      localStorage.removeItem('py_review_queue');
    }
  };

  return (
    <div className="flex h-screen w-screen overflow-hidden bg-slate-950 text-slate-100">
      {/* Sidebar Navigation */}
      <Sidebar
        chapters={CHAPTERS_DATA}
        activeChapterNum={activeChapterNum}
        onSelectChapter={handleSelectChapter}
        completedSections={completedSections}
        reviewQueue={reviewQueue}
        onFilterReviewQueue={handleFilterReviewQueue}
        onResetProgress={handleResetProgress}
        onOpenCitation={() => setIsCitationOpen(true)}
        activeView={activeView}
        notebooks={importedNotebooks}
        activeNotebookId={activeNotebookId}
        onSelectNotebook={handleSelectNotebook}
        onOpenNotebookLab={handleOpenNotebookLab}
      />

      {/* Main View: Either Notebook Viewer or Standard Chapters */}
      {activeView === 'notebook' ? (
        <NotebookViewer
          notebooks={importedNotebooks}
          activeNotebookId={activeNotebookId}
          onSelectNotebook={handleSelectNotebook}
          onAddNotebook={handleAddNotebook}
          onDeleteNotebook={handleDeleteNotebook}
          onExecuteCode={executeCode}
          pyodideReady={pyodideReady}
        />
      ) : (
        /* Main Study Area */
        <div className="flex-1 flex flex-col h-full overflow-hidden bg-slate-950">
          <Header
            activeChapter={activeChapter}
            totalChapters={CHAPTERS_DATA.length}
            sections={activeChapter.sections}
            onOpenCitation={() => setIsCitationOpen(true)}
            isMuted={isMuted}
            onToggleMute={toggleMute}
            isSpeaking={isSpeaking}
            voices={voices}
            selectedVoiceName={selectedVoiceName}
            onSelectVoice={selectVoice}
            activeVoice={activeVoice}
            pyodideReady={pyodideReady}
          />

        {/* Scrollable Content */}
        <main className="flex-1 overflow-y-auto custom-scroll p-4 md:p-8 space-y-8">
          {/* Chapter Banner */}
          <div className="bg-gradient-to-r from-blue-900/40 via-indigo-900/30 to-purple-900/20 border border-blue-500/20 rounded-2xl p-6 shadow-xl">
            <div className="flex items-center gap-4">
              <span className="text-4xl">{activeChapter.icon}</span>
              <div>
                <div className="flex flex-wrap items-center gap-2 mb-1.5">
                  <span className="text-xs font-mono font-bold uppercase tracking-wider text-blue-400 bg-blue-500/10 border border-blue-500/20 px-2 py-0.5 rounded">
                    {activeChapter.code_module || `Chapter ${activeChapter.num}`}
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
                        Section {sec.num}
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
                        <span>{isDone ? 'Mastered' : 'Mark Learned'}</span>
                      </button>
                    </div>
                  </div>

                  {/* 1. The Why Box */}
                  <WhyBox
                    sectionId={sec.id}
                    whyText={sec.why}
                    onSpeak={handleSpeakWhy}
                  />

                  {/* 2. Mechanics & Code Snippet */}
                  <ConceptBox
                    section={sec}
                    onRunCode={executeCode}
                  />

                  {/* 3. Coding Reps Lab (Randomized Pyodide Workouts) */}
                  <CodingRepLab
                    repData={sec.rep}
                    onExecuteCode={executeCode}
                    onCompleteRep={() => {
                      if (!completedSections[sec.id]) {
                        handleToggleComplete(sec.id);
                      }
                    }}
                    pyodideReady={pyodideReady}
                  />

                  {/* 4. Common Trap / Pitfall */}
                  <TrapBox pitfall={sec.pitfall} />

                  {/* 5. Checkpoint Quiz */}
                  <QuizBox
                    sectionId={sec.id}
                    quizData={sec.quiz}
                    onAnswer={handleQuizAnswer}
                    onTakeMeToReview={handleTakeMeToReview}
                  />
                </div>
              );
            })}
          </div>
        </main>
      </div>
      )}

      {/* Academic Citation Modal */}
      <CitationModal
        isOpen={isCitationOpen}
        onClose={() => setIsCitationOpen(false)}
      />
    </div>
  );
}
