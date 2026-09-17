import React, { useState } from 'react';

export function Sidebar({ 
  chapters, 
  activeChapterNum, 
  onSelectChapter, 
  completedSections, 
  reviewQueue, 
  onFilterReviewQueue,
  onResetProgress,
  onOpenCitation,
  activeView = 'chapters',
  notebooks = [],
  activeNotebookId = null,
  onSelectNotebook,
  onOpenNotebookLab
}) {
  const [searchTerm, setSearchTerm] = useState('');

  const totalSections = chapters.reduce((acc, ch) => acc + ch.sections.length, 0);
  const masteredCount = Object.keys(completedSections).length;
  const masteryPct = totalSections > 0 ? Math.round((masteredCount / totalSections) * 100) : 0;
  const reviewCount = Object.keys(reviewQueue).length;

  const filteredChapters = chapters.filter(ch => {
    const term = searchTerm.toLowerCase();
    const inTitle = ch.title.toLowerCase().includes(term);
    const inDesc = ch.desc.toLowerCase().includes(term);
    const inSections = ch.sections.some(s => 
      s.title.toLowerCase().includes(term) ||
      s.concept.toLowerCase().includes(term) ||
      s.why.toLowerCase().includes(term)
    );
    return inTitle || inDesc || inSections;
  });

  return (
    <aside className="w-80 border-r border-slate-800 bg-slate-900/90 flex flex-col h-full shrink-0">
      {/* Brand & Mastery Header */}
      <div className="p-4 border-b border-slate-800 space-y-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="text-2xl">⚡</span>
            <div>
              <h2 className="text-sm font-extrabold text-white tracking-wide">P101 Mastery</h2>
              <span className="text-[10px] text-slate-400 font-mono">Tony Gaddis 6th Edition</span>
            </div>
          </div>
          <span className="text-xs font-mono font-bold text-emerald-400 bg-emerald-500/10 border border-emerald-500/30 px-2 py-0.5 rounded-full">
            {masteryPct}% Mastered
          </span>
        </div>

        {/* Global Progress Bar */}
        <div className="w-full bg-slate-950 rounded-full h-2 overflow-hidden border border-slate-800">
          <div 
            className="bg-gradient-to-r from-blue-500 via-indigo-500 to-emerald-400 h-2 rounded-full transition-all duration-500"
            style={{ width: `${masteryPct}%` }}
          />
        </div>

        {/* Review Queue Notification Pill */}
        {reviewCount > 0 && (
          <button
            onClick={onFilterReviewQueue}
            className="w-full p-2 rounded-lg bg-rose-500/15 border border-rose-500/30 flex items-center justify-between text-xs hover:bg-rose-500/20 transition-all text-rose-300 font-medium"
          >
            <span className="flex items-center gap-1.5">
              <span>⚠️</span>
              <span>Review Needed ({reviewCount})</span>
            </span>
            <span className="text-[10px] font-mono text-rose-400">Review &rarr;</span>
          </button>
        )}

        {/* Search Filter Box */}
        <div className="relative">
          <input
            type="text"
            placeholder="Search topics, syntax, why..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full bg-slate-950 border border-slate-700 rounded-lg px-3 py-1.5 text-xs text-slate-200 placeholder-slate-500 focus:outline-none focus:border-blue-500 transition-colors"
          />
        </div>
      </div>

      {/* BYOD Notebook Lab Quick Access */}
      <div className="p-2 border-b border-slate-800/80 bg-slate-950/40">
        <button
          onClick={onOpenNotebookLab}
          className={`w-full text-left px-3 py-2 rounded-xl text-xs flex items-center justify-between transition-all border ${
            activeView === 'notebook'
              ? 'bg-purple-600 text-white font-bold shadow-lg shadow-purple-600/20 border-purple-400/40'
              : 'bg-purple-950/30 text-purple-200 hover:bg-purple-900/40 border-purple-500/30'
          }`}
        >
          <div className="flex items-center gap-2">
            <span className="text-base">📓</span>
            <div>
              <div className="font-bold">Notebook Lab (BYOD)</div>
              <div className="text-[10px] text-purple-300/80">Import &amp; Run .ipynb Locally</div>
            </div>
          </div>
          <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-purple-500/20 text-purple-200 border border-purple-400/30 font-bold">
            {notebooks.length}
          </span>
        </button>

        {/* List of imported notebooks if any */}
        {notebooks.length > 0 && (
          <div className="mt-1.5 space-y-1 pl-2">
            {notebooks.map(nb => {
              const isSelected = activeView === 'notebook' && activeNotebookId === nb.id;
              return (
                <button
                  key={nb.id}
                  onClick={() => onSelectNotebook(nb.id)}
                  className={`w-full text-left px-2 py-1 rounded text-[11px] truncate block transition-colors ${
                    isSelected 
                      ? 'text-purple-300 font-bold bg-purple-500/20' 
                      : 'text-slate-400 hover:text-slate-200 hover:bg-slate-900'
                  }`}
                >
                  • {nb.name}
                </button>
              );
            })}
          </div>
        )}
      </div>

      {/* Chapters Navigation List */}
      <div className="px-3 pt-2 pb-1 text-[10px] font-mono uppercase tracking-wider text-slate-500 font-bold">
        Course Modules
      </div>
      <nav className="flex-1 overflow-y-auto custom-scroll p-2 space-y-1">
        {filteredChapters.map(ch => {
          const isActive = activeView === 'chapters' && ch.num === activeChapterNum;
          const chSecIds = ch.sections.map(s => s.id);
          const chDoneCount = chSecIds.filter(id => completedSections[id]).length;
          const isComplete = chDoneCount === chSecIds.length && chSecIds.length > 0;

          return (
            <button
              key={ch.num}
              onClick={() => onSelectChapter(ch.num)}
              className={`w-full text-left px-3 py-2.5 rounded-xl text-xs flex items-center justify-between transition-all ${
                isActive 
                  ? 'bg-blue-600 text-white font-bold shadow-lg shadow-blue-600/20 border border-blue-400/40' 
                  : 'text-slate-300 hover:bg-slate-800/80 border border-transparent'
              }`}
            >
              <div className="flex items-center gap-2.5 truncate">
                <span className="text-base">{ch.icon}</span>
                <span className="truncate">{ch.code_module ? `${ch.code_module}: ${ch.title}` : `Ch ${ch.num}: ${ch.title}`}</span>
              </div>
              <div className="flex items-center gap-1.5 shrink-0 ml-2">
                {isComplete && <span className="text-emerald-300 font-bold">✓</span>}
                <span className={`text-[10px] font-mono ${isActive ? 'text-blue-200' : 'text-slate-500'}`}>
                  {chDoneCount}/{ch.sections.length}
                </span>
              </div>
            </button>
          );
        })}
      </nav>

      {/* Footer Controls */}
      <div className="p-3 border-t border-slate-800 flex items-center justify-between text-xs">
        <button
          onClick={onOpenCitation}
          className="text-slate-400 hover:text-slate-200 flex items-center gap-1 text-[11px]"
        >
          <span>📜</span> Citations
        </button>
        <button
          onClick={onResetProgress}
          className="text-[11px] text-slate-500 hover:text-rose-400 transition-colors"
        >
          Reset Progress
        </button>
      </div>
    </aside>
  );
}
