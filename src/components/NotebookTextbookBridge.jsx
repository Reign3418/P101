import React, { useState } from 'react';
import { 
  BookOpen, 
  ChevronDown, 
  ChevronUp, 
  Sparkles, 
  Cpu, 
  Compass, 
  ArrowRight,
  ExternalLink,
  HelpCircle
} from 'lucide-react';

/**
 * NotebookTextbookBridge
 * Renders an expandable pedagogical companion card on notebook cells,
 * bridging notebook lecture topics with Tony Gaddis's textbook and P101's "The Why" engine.
 */
export function NotebookTextbookBridge({ 
  bridgeData, 
  onJumpToCurriculum, 
  t, 
  lang = 'en',
  defaultExpanded = false 
}) {
  const [isExpanded, setIsExpanded] = useState(defaultExpanded);

  if (!bridgeData || !bridgeData.matched) return null;

  const isEs = lang === 'es';
  const {
    chapterNum,
    moduleCode,
    chapterTitle,
    sectionNum,
    sectionTitle,
    why,
    bookRef,
    breakdown,
    deepDive
  } = bridgeData;

  const handleJump = (e) => {
    e.stopPropagation();
    if (onJumpToCurriculum) {
      onJumpToCurriculum(chapterNum, bridgeData.sectionId);
    }
  };

  return (
    <div className="my-3 rounded-xl border border-blue-500/30 bg-gradient-to-r from-blue-950/40 via-slate-900/60 to-indigo-950/30 shadow-sm overflow-hidden transition-all duration-200">
      {/* Compact Banner Header (Always Visible) */}
      <div 
        onClick={() => setIsExpanded(!isExpanded)}
        className="px-3.5 py-2.5 flex items-center justify-between cursor-pointer select-none hover:bg-blue-500/10 transition-colors gap-2"
        title={isExpanded ? (t ? t('hideWhyAndTextbook') : 'Collapse Reference') : (t ? t('viewWhyAndTextbook') : 'Expand Reference')}
      >
        <div className="flex items-center gap-2.5 flex-wrap min-w-0">
          <div className="flex items-center justify-center w-6 h-6 rounded-lg bg-blue-500/20 text-blue-400 border border-blue-500/40 shrink-0">
            <BookOpen className="w-3.5 h-3.5" />
          </div>

          {/* Textbook Pill */}
          {bookRef && (
            <span className="px-2 py-0.5 rounded-full text-[10px] font-semibold bg-blue-500/15 text-blue-300 border border-blue-500/30 shrink-0">
              📖 Gaddis Ch {bookRef.gaddis_chapter} ({bookRef.gaddis_section})
            </span>
          )}

          {/* Module & Section Badge */}
          <span className="px-2 py-0.5 rounded-full text-[10px] font-mono bg-purple-500/15 text-purple-300 border border-purple-500/30 shrink-0">
            {moduleCode} • {sectionNum}
          </span>

          {/* Summary Hook */}
          <span className="text-xs font-semibold text-slate-200 truncate">
            {sectionTitle}
          </span>
        </div>

        <div className="flex items-center gap-2 shrink-0">
          <span className="text-[11px] font-medium text-blue-400 hidden sm:inline">
            {isExpanded 
              ? (t ? t('hideWhyAndTextbook') : 'Hide') 
              : (t ? t('viewWhyAndTextbook') : 'The Why & Book')}
          </span>
          <button 
            type="button"
            className="w-6 h-6 flex items-center justify-center rounded-md bg-slate-800/80 hover:bg-slate-700 text-slate-300 transition-colors"
            aria-label={isExpanded ? 'Collapse' : 'Expand'}
          >
            {isExpanded ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
          </button>
        </div>
      </div>

      {/* Expanded Pedagogical Drawer */}
      {isExpanded && (
        <div className="px-4 py-3.5 border-t border-blue-500/20 space-y-3.5 text-xs text-slate-300 bg-slate-950/60">
          
          {/* Textbook Attribution Card */}
          {bookRef && (
            <div className="p-3 rounded-lg bg-blue-900/15 border border-blue-500/25 space-y-1">
              <div className="flex items-center justify-between gap-2">
                <span className="text-[11px] font-bold text-blue-300 uppercase tracking-wider flex items-center gap-1.5">
                  <BookOpen className="w-3.5 h-3.5 text-blue-400" />
                  {isEs ? 'Libro de Texto — Tony Gaddis (6.ª Edición)' : 'Textbook Reference — Tony Gaddis (6th Edition)'}
                </span>
                <span className="text-[10px] font-mono text-blue-400/80">
                  Chapter {bookRef.gaddis_chapter} • {bookRef.gaddis_section}
                </span>
              </div>
              <div className="text-xs font-semibold text-white">
                {bookRef.title}
              </div>
              <p className="text-[11px] text-slate-300 leading-relaxed pt-0.5">
                {bookRef.explanation}
              </p>
            </div>
          )}

          {/* "The Why" Rationale */}
          {why && (
            <div className="p-3 rounded-lg bg-amber-500/10 border border-amber-500/25 space-y-1">
              <div className="text-[11px] font-bold text-amber-400 uppercase tracking-wider flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5 text-amber-400" />
                {t ? t('pedagogicalWhy') : 'The Why (Pedagogical Rationale)'}
              </div>
              <p className="text-[11px] text-slate-200 leading-relaxed">
                {why}
              </p>
            </div>
          )}

          {/* Mental Model Analogy & RAM Trace */}
          {breakdown && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-2.5">
              {/* Analogy */}
              {breakdown.analogy && (
                <div className="p-3 rounded-lg bg-purple-950/20 border border-purple-500/20 space-y-1">
                  <div className="text-[10px] font-bold text-purple-300 uppercase tracking-wider flex items-center gap-1.5">
                    <Compass className="w-3.5 h-3.5 text-purple-400" />
                    {t ? t('analogy') : 'Real-World Mental Model'}
                  </div>
                  <p className="text-[11px] text-slate-300 leading-relaxed">
                    {breakdown.analogy}
                  </p>
                </div>
              )}

              {/* RAM Execution Trace */}
              {breakdown.steps && breakdown.steps.length > 0 && (
                <div className="p-3 rounded-lg bg-emerald-950/20 border border-emerald-500/20 space-y-1">
                  <div className="text-[10px] font-bold text-emerald-300 uppercase tracking-wider flex items-center gap-1.5">
                    <Cpu className="w-3.5 h-3.5 text-emerald-400" />
                    {t ? t('ramTrace') : 'RAM Execution Trace'}
                  </div>
                  <ul className="text-[11px] text-slate-300 space-y-1">
                    {breakdown.steps.slice(0, 4).map((step, sIdx) => (
                      <li key={sIdx} className="leading-snug">
                        {step}
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          )}

          {/* Under-the-Hood Deep Dive (if available) */}
          {deepDive && (
            <div className="p-2.5 rounded-lg bg-slate-900 border border-slate-800 space-y-1">
              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">
                🔬 {deepDive.concept}
              </span>
              <p className="text-[11px] text-slate-300 leading-relaxed">
                {deepDive.detail}
              </p>
            </div>
          )}

          {/* Jump to Full Interactive Module Action */}
          <div className="pt-1 flex items-center justify-between gap-3 flex-wrap border-t border-slate-800/80">
            <div className="text-[11px] text-slate-400">
              {isEs 
                ? '¿Quieres practicar con ejercicios interactivos y cuestionarios autoevaluados?' 
                : 'Want to practice with live Pyodide sandboxes and autograded quizzes?'}
            </div>
            <button
              onClick={handleJump}
              type="button"
              className="px-3.5 py-1.5 rounded-lg bg-blue-600 hover:bg-blue-500 text-white font-semibold text-xs flex items-center gap-1.5 shadow-md shadow-blue-600/20 transition-all hover:translate-x-0.5"
            >
              <span>{t ? t('openInCurriculum') : `Open ${moduleCode} in Curriculum`}</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

        </div>
      )}
    </div>
  );
}
