import React from 'react';

export function CitationModal({ isOpen, onClose }) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="bg-slate-900 border border-slate-700 rounded-2xl max-w-xl w-full p-6 shadow-2xl space-y-4 text-xs">
        <div className="flex items-center justify-between border-b border-slate-800 pb-3">
          <h3 className="text-base font-bold text-white flex items-center gap-2">
            <span>📜</span> Academic Attribution &amp; Citations
          </h3>
          <button onClick={onClose} className="text-slate-400 hover:text-white text-lg">&times;</button>
        </div>

        <p className="text-slate-300 leading-relaxed">
          This interactive study portal is an educational companion structured around the curriculum of:
        </p>

        <div className="space-y-3 bg-slate-950 p-4 rounded-xl border border-slate-800 font-mono text-[11px]">
          <div>
            <span className="text-amber-400 font-bold uppercase block mb-1">APA (7th Edition):</span>
            <p className="text-slate-300">Gaddis, T. (2024). <em>Starting Out with Python</em> (6th ed.). Pearson.</p>
          </div>
          <div>
            <span className="text-blue-400 font-bold uppercase block mb-1">MLA (9th Edition):</span>
            <p className="text-slate-300">Gaddis, Tony. <em>Starting Out with Python</em>. 6th ed., Pearson, 2024.</p>
          </div>
        </div>

        <p className="text-[11px] text-slate-400 italic">
          All explanations, code examples, drills, and interactive mechanics are original synthesis designed for student mastery.
        </p>

        <div className="text-right pt-2">
          <button
            onClick={onClose}
            className="px-4 py-1.5 rounded-lg bg-blue-600 hover:bg-blue-500 text-white font-bold"
          >
            Done
          </button>
        </div>
      </div>
    </div>
  );
}
