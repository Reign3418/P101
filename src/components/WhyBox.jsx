import React from 'react';

export function WhyBox({ sectionId, whyText, onSpeak }) {
  return (
    <div id={`why-box-${sectionId}`} className="p-4 rounded-xl bg-amber-500/10 border border-amber-500/25 space-y-2 transition-all">
      <div className="flex items-center justify-between">
        <div className="text-xs font-bold text-amber-400 flex items-center gap-1.5 uppercase tracking-wider">
          <span>💡</span> The "Why" Under the Hood:
        </div>
        <button
          onClick={() => onSpeak(whyText)}
          className="text-[11px] text-amber-300 hover:text-amber-100 flex items-center gap-1 px-2 py-0.5 rounded bg-amber-500/20 border border-amber-500/30 transition-colors"
        >
          <span>🎙️</span> Read Aloud
        </button>
      </div>
      <p className="text-xs md:text-sm text-amber-100/90 leading-relaxed font-normal">
        {whyText}
      </p>
    </div>
  );
}
