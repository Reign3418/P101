import React, { useState } from 'react';
import { BookOpen, Sparkles, HelpCircle, ArrowDownCircle, ChevronUp, Volume2, Cpu } from 'lucide-react';

export function WhyBox({ 
  sectionId, 
  whyText, 
  bookRef, 
  breakdown, 
  deepDive, 
  onSpeak, 
  t, 
  lang = 'en' 
}) {
  const [showBreakdown, setShowBreakdown] = useState(false);
  const [showDeepDive, setShowDeepDive] = useState(false);

  const handleSpeakBreakdown = () => {
    let narration = "";
    if (bookRef) {
      narration += `From Tony Gaddis chapter ${bookRef.gaddis_chapter}, ${bookRef.gaddis_section}: ${bookRef.title}. ${bookRef.explanation} `;
    }
    if (breakdown) {
      narration += `Here is the real world analogy: ${breakdown.analogy} `;
      if (breakdown.steps && breakdown.steps.length > 0) {
        narration += `Step by step: ${breakdown.steps.join('. ')}`;
      }
    }
    onSpeak(narration);
  };

  const handleSpeakDeepDive = () => {
    if (deepDive) {
      const narration = `${deepDive.concept}. Under the hood in Python: ${deepDive.detail}`;
      onSpeak(narration);
    }
  };

  return (
    <div id={`why-box-${sectionId}`} className="why-box rounded-2xl bg-amber-500/10 border border-amber-500/30 overflow-hidden shadow-md transition-all">
      {/* Primary Why Header & Summary */}
      <div className="p-4 md:p-5 space-y-2.5">
        <div className="flex items-center justify-between">
          <div className="why-box-title text-xs font-extrabold text-amber-400 flex items-center gap-2 uppercase tracking-wider">
            <span className="text-base">💡</span>
            <span>{t ? t('whyUnderTheHood') : 'The "Why" Under the Hood:'}</span>
          </div>

          <button
            onClick={() => onSpeak(whyText)}
            className="text-[11px] text-amber-300 hover:text-amber-100 flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-amber-500/20 border border-amber-500/30 hover:bg-amber-500/30 transition-all font-medium"
            title="Listen to core concept summary"
          >
            <Volume2 className="w-3.5 h-3.5" />
            <span>{t ? t('readAloud') : 'Read Aloud'}</span>
          </button>
        </div>

        <p className="why-box-text text-xs md:text-sm text-amber-100/95 leading-relaxed font-medium">
          {whyText}
        </p>

        {/* Expansion Action Bar */}
        <div className="flex flex-wrap items-center gap-2 pt-2 border-t border-amber-500/20">
          {/* 1. "I Don't Understand" Button */}
          {(breakdown || bookRef) && (
            <button
              onClick={() => {
                setShowBreakdown(prev => !prev);
                if (!showBreakdown) setShowDeepDive(false);
              }}
              className={`text-xs px-3 py-1.5 rounded-xl border flex items-center gap-1.5 font-bold transition-all shadow-sm ${
                showBreakdown
                  ? 'bg-amber-500 text-slate-950 border-amber-400 font-extrabold shadow-amber-500/20'
                  : 'bg-amber-500/20 hover:bg-amber-500/30 text-amber-200 border-amber-500/40'
              }`}
            >
              <HelpCircle className="w-3.5 h-3.5" />
              <span>{showBreakdown ? (t ? t('hideDetails') : 'Collapse Details ▴') : (t ? t('iDontUnderstand') : "🤔 I Don't Understand (Explain More)")}</span>
            </button>
          )}

          {/* 2. "Keep Going" Button */}
          {deepDive && (
            <button
              onClick={() => {
                setShowDeepDive(prev => !prev);
                if (!showDeepDive) setShowBreakdown(false);
              }}
              className={`text-xs px-3 py-1.5 rounded-xl border flex items-center gap-1.5 font-bold transition-all shadow-sm ${
                showDeepDive
                  ? 'bg-indigo-600 text-white border-indigo-400 font-extrabold shadow-indigo-600/20'
                  : 'bg-indigo-950/40 hover:bg-indigo-900/40 text-indigo-300 border-indigo-500/40'
              }`}
            >
              <Cpu className="w-3.5 h-3.5" />
              <span>{showDeepDive ? (t ? t('hideDetails') : 'Collapse Details ▴') : (t ? t('keepGoing') : '🚀 Keep Going (Under the Hood)')}</span>
            </button>
          )}
        </div>
      </div>

      {/* ── EXPANDED LAYER 1: "I Don't Understand" (Analogy + Steps + Gaddis Book Ref) ── */}
      {showBreakdown && (
        <div className="bg-slate-950/90 border-t-2 border-amber-500/40 p-4 md:p-6 space-y-4 text-xs text-slate-200 animate-in fade-in slide-in-from-top-2 duration-200">
          
          {/* Top Bar with Audio */}
          <div className="flex items-center justify-between border-b border-slate-800 pb-2.5">
            <span className="text-[11px] font-mono uppercase tracking-wider text-amber-400 font-bold flex items-center gap-1.5">
              <span>🧩</span> {t ? t('analogyTitle') : 'Real-World Analogy & Mental Model:'}
            </span>
            <button
              onClick={handleSpeakBreakdown}
              className="text-[11px] text-amber-300 hover:text-amber-100 flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-amber-500/20 border border-amber-500/30 hover:bg-amber-500/30 transition-all font-medium"
            >
              <Volume2 className="w-3.5 h-3.5" />
              <span>{t ? t('listenBreakdown') : 'Listen to Breakdown'}</span>
            </button>
          </div>

          {/* Tony Gaddis Textbook Companion Box */}
          {bookRef && (
            <div className="p-3.5 rounded-xl bg-blue-500/10 border border-blue-500/30 space-y-1.5">
              <div className="flex items-center gap-2 text-blue-300 font-bold text-xs">
                <BookOpen className="w-4 h-4 text-blue-400 shrink-0" />
                <span>
                  Starting Out with Python (6th Ed) &bull; Chapter {bookRef.gaddis_chapter} ({bookRef.gaddis_section}): {bookRef.title}
                </span>
              </div>
              <p className="text-xs text-blue-100/90 leading-relaxed pl-6">
                {bookRef.explanation}
              </p>
            </div>
          )}

          {/* Analogy Box */}
          {breakdown?.analogy && (
            <div className="p-3.5 rounded-xl bg-amber-500/10 border border-amber-500/25 space-y-1">
              <span className="text-[11px] font-bold text-amber-300 block">
                {lang === 'es' ? '💡 Analogía Concreta:' : '💡 Concrete Mental Model:'}
              </span>
              <p className="text-xs md:text-sm text-amber-100 leading-relaxed">
                {breakdown.analogy}
              </p>
            </div>
          )}

          {/* Step-by-Step RAM Sequence */}
          {breakdown?.steps && breakdown.steps.length > 0 && (
            <div className="space-y-2 pt-1">
              <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400 block">
                {t ? t('stepByStepTitle') : 'Step-by-Step RAM & Execution Sequence:'}
              </span>
              <div className="space-y-2">
                {breakdown.steps.map((step, idx) => (
                  <div key={idx} className="flex items-start gap-2.5 p-2.5 rounded-xl bg-slate-900/90 border border-slate-800">
                    <span className="w-5 h-5 rounded-full bg-amber-500/20 text-amber-400 border border-amber-500/30 flex items-center justify-center font-mono font-bold text-[11px] shrink-0 mt-0.5">
                      {idx + 1}
                    </span>
                    <p className="text-xs text-slate-200 leading-relaxed">
                      {step}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      )}

      {/* ── EXPANDED LAYER 2: "Keep Going" (Under the Hood / CPython / Industry) ── */}
      {showDeepDive && deepDive && (
        <div className="bg-slate-950/95 border-t-2 border-indigo-500/40 p-4 md:p-6 space-y-3.5 text-xs text-slate-200 animate-in fade-in slide-in-from-top-2 duration-200">
          <div className="flex items-center justify-between border-b border-slate-800 pb-2.5">
            <div className="flex items-center gap-2">
              <span className="px-2 py-0.5 rounded bg-indigo-500/20 text-indigo-300 border border-indigo-500/30 font-mono text-[10px] uppercase font-bold">
                {deepDive.concept}
              </span>
              <span className="text-xs font-bold text-white">
                {t ? t('deepDiveTitle') : 'Under the Hood: CPython Mechanics'}
              </span>
            </div>

            <button
              onClick={handleSpeakDeepDive}
              className="text-[11px] text-indigo-300 hover:text-indigo-100 flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-indigo-500/20 border border-indigo-500/30 hover:bg-indigo-500/30 transition-all font-medium"
            >
              <Volume2 className="w-3.5 h-3.5" />
              <span>{t ? t('listenDeepDive') : 'Listen to Deep Dive'}</span>
            </button>
          </div>

          <div className="p-4 rounded-xl bg-indigo-950/20 border border-indigo-500/30 space-y-2">
            <p className="text-xs md:text-sm text-indigo-100/90 leading-relaxed font-mono">
              {deepDive.detail}
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
