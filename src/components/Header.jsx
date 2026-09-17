import React from 'react';

export function Header({ activeChapter, totalChapters, sections, onOpenCitation, isVoiceMuted, onToggleVoice, pyodideReady }) {
  return (
    <header className="h-16 border-b border-slate-800 bg-slate-900/70 backdrop-blur-md px-4 md:px-6 flex items-center justify-between shrink-0 sticky top-0 z-20">
      <div className="flex items-center gap-3 truncate">
        <div className="flex items-center gap-2">
          <span className="text-xl">🐍</span>
          <span className="text-xs font-mono font-bold uppercase tracking-wider text-blue-400 hidden sm:inline">
            Chapter {activeChapter.num} of {totalChapters}
          </span>
        </div>
        <span className="text-slate-600 hidden sm:inline">|</span>
        <h1 className="text-sm md:text-base font-bold text-white truncate">
          {activeChapter.title}
        </h1>
      </div>

      <div className="flex items-center gap-2 shrink-0">
        {/* Pyodide Engine Status Indicator */}
        <div className="hidden lg:flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-mono border bg-slate-950 border-slate-800">
          <span className={`w-2 h-2 rounded-full ${pyodideReady ? 'bg-emerald-400 animate-pulse' : 'bg-amber-400'}`}></span>
          <span className="text-slate-300">{pyodideReady ? 'Pyodide 3.12 Ready' : 'Loading Python Engine...'}</span>
        </div>

        {/* Text to Speech Mute Toggle */}
        <button
          onClick={onToggleVoice}
          title={isVoiceMuted ? "Voice narration muted" : "Voice narration active"}
          className={`flex items-center gap-1 text-xs px-2.5 py-1.5 rounded-lg border transition-colors ${
            isVoiceMuted 
              ? 'bg-slate-800 text-slate-400 border-slate-700' 
              : 'bg-amber-500/15 text-amber-300 border-amber-500/40'
          }`}
        >
          <span>{isVoiceMuted ? '🔇' : '🔊'}</span>
          <span className="hidden sm:inline text-[11px] font-medium">Voice</span>
        </button>

        {/* Academic Citation Modal Button */}
        <button
          onClick={onOpenCitation}
          className="flex items-center gap-1 text-xs px-2.5 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 transition-colors"
        >
          <span>📜</span>
          <span className="hidden sm:inline text-[11px] font-medium">Citations</span>
        </button>
      </div>
    </header>
  );
}
