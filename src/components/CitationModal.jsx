import React, { useState } from 'react';

export function CitationModal({ isOpen, onClose }) {
  const [copiedType, setCopiedType] = useState(null);

  if (!isOpen) return null;

  const copyText = (text, type) => {
    navigator.clipboard.writeText(text);
    setCopiedType(type);
    setTimeout(() => setCopiedType(null), 1800);
  };

  const simpleCitation = "Based on concepts from Starting Out with Python (6th Edition) by Tony Gaddis (Pearson).";
  const apaCitation = "Gaddis, T. (2024). Starting Out with Python (6th ed.). Pearson.";
  const mlaCitation = "Gaddis, Tony. Starting Out with Python. 6th ed., Pearson, 2024.";

  return (
    <div className="fixed inset-0 z-50 bg-black/75 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="bg-slate-900 border border-slate-700 rounded-2xl max-w-lg w-full p-6 shadow-2xl space-y-5 text-xs text-slate-200">
        
        {/* Header */}
        <div className="flex items-center justify-between border-b border-slate-800 pb-3">
          <div className="flex items-center gap-2">
            <span className="text-xl">📚</span>
            <div>
              <h3 className="text-base font-bold text-white">Textbook Reference &amp; Citations</h3>
              <p className="text-[11px] text-slate-400">Everything you need to know about citing this resource</p>
            </div>
          </div>
          <button 
            onClick={onClose} 
            className="text-slate-400 hover:text-white text-lg w-7 h-7 rounded-lg hover:bg-slate-800 flex items-center justify-center transition-colors"
          >
            &times;
          </button>
        </div>

        {/* Plain-English Book Card */}
        <div className="p-3.5 rounded-xl bg-blue-500/10 border border-blue-500/25 flex items-start gap-3">
          <span className="text-2xl mt-0.5">📖</span>
          <div className="space-y-0.5">
            <span className="text-xs font-bold text-white">Primary Textbook:</span>
            <div className="text-blue-300 font-semibold text-xs">
              Starting Out with Python <span className="text-slate-400 font-normal">(6th Edition)</span>
            </div>
            <div className="text-[11px] text-slate-300">
              Author: <strong className="text-white">Tony Gaddis</strong> &bull; Publisher: Pearson
            </div>
          </div>
        </div>

        {/* When do you need this? Plain English */}
        <div className="space-y-1.5 bg-slate-950/60 p-3 rounded-xl border border-slate-800">
          <span className="text-[11px] font-bold text-amber-400 uppercase tracking-wider block">
            💡 Do you need to cite this for your class?
          </span>
          <p className="text-[11px] text-slate-300 leading-relaxed">
            All code drills, quizzes, and "Why" analogies in this app are <strong>original practice exercises</strong>. 
            If your professor asks where your learning framework comes from, or if you need to credit the book in homework comments, copy one of the formats below:
          </p>
        </div>

        {/* 1-Click Copy Citation Options */}
        <div className="space-y-2.5">
          {/* 1. Quick Homework Comment (Most useful for students) */}
          <div className="p-3 rounded-xl bg-slate-950 border border-slate-800 space-y-1.5">
            <div className="flex items-center justify-between">
              <span className="text-[11px] font-bold text-emerald-400">
                1. For Code Comments &amp; Homework:
              </span>
              <button
                onClick={() => copyText(simpleCitation, 'simple')}
                className={`px-2 py-0.5 rounded text-[11px] font-mono border transition-all ${
                  copiedType === 'simple' 
                    ? 'bg-emerald-500/20 text-emerald-300 border-emerald-500/50 font-bold' 
                    : 'bg-slate-800 text-slate-300 hover:text-white border-slate-700'
                }`}
              >
                {copiedType === 'simple' ? 'Copied! ✓' : 'Copy'}
              </button>
            </div>
            <p className="text-[11px] font-mono text-slate-300 bg-slate-900/90 p-2 rounded border border-slate-800/80">
              # {simpleCitation}
            </p>
          </div>

          {/* 2. Formal College Formats (APA & MLA) */}
          <div className="p-3 rounded-xl bg-slate-950 border border-slate-800 space-y-2">
            <span className="text-[11px] font-bold text-slate-400 block">
              2. For Formal Papers / Bibliography (if required):
            </span>
            
            {/* APA */}
            <div className="flex items-start justify-between gap-2 border-t border-slate-800/60 pt-2">
              <div className="text-[11px]">
                <span className="text-amber-400 font-bold font-mono">APA 7th: </span>
                <span className="text-slate-300">{apaCitation}</span>
              </div>
              <button
                onClick={() => copyText(apaCitation, 'apa')}
                className={`px-2 py-0.5 rounded text-[11px] font-mono border transition-all shrink-0 ${
                  copiedType === 'apa' 
                    ? 'bg-emerald-500/20 text-emerald-300 border-emerald-500/50 font-bold' 
                    : 'bg-slate-800 text-slate-300 hover:text-white border-slate-700'
                }`}
              >
                {copiedType === 'apa' ? 'Copied! ✓' : 'Copy'}
              </button>
            </div>

            {/* MLA */}
            <div className="flex items-start justify-between gap-2 border-t border-slate-800/60 pt-2">
              <div className="text-[11px]">
                <span className="text-blue-400 font-bold font-mono">MLA 9th: </span>
                <span className="text-slate-300">{mlaCitation}</span>
              </div>
              <button
                onClick={() => copyText(mlaCitation, 'mla')}
                className={`px-2 py-0.5 rounded text-[11px] font-mono border transition-all shrink-0 ${
                  copiedType === 'mla' 
                    ? 'bg-emerald-500/20 text-emerald-300 border-emerald-500/50 font-bold' 
                    : 'bg-slate-800 text-slate-300 hover:text-white border-slate-700'
                }`}
              >
                {copiedType === 'mla' ? 'Copied! ✓' : 'Copy'}
              </button>
            </div>
          </div>
        </div>

        {/* Close Button */}
        <div className="text-right pt-1">
          <button
            onClick={onClose}
            className="px-5 py-2 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs shadow-lg shadow-blue-600/20 transition-all"
          >
            Got it, thanks!
          </button>
        </div>
      </div>
    </div>
  );
}

