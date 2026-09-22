import React from 'react';
import { AlertTriangle, ArrowRight, CheckCircle2, Trash2, X, Sparkles } from 'lucide-react';

export function ReviewModal({
  isOpen,
  onClose,
  reviewItems = [],
  onJumpToSection,
  onDismissItem,
  onClearAll,
  t,
  lang = 'en',
}) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black/75 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="bg-slate-900 border border-slate-700 rounded-2xl max-w-xl w-full p-5 md:p-6 shadow-2xl space-y-5 text-xs text-slate-200 animate-in fade-in zoom-in duration-200">
        
        {/* Header */}
        <div className="flex items-center justify-between border-b border-slate-800 pb-3">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-rose-500/20 text-rose-400 border border-rose-500/30 flex items-center justify-center">
              <AlertTriangle className="w-4 h-4" />
            </div>
            <div>
              <h3 className="text-base font-bold text-white">
                {t ? t('reviewModalTitle') : 'Concepts Flagged for Review'}
              </h3>
              <p className="text-[11px] text-slate-400">
                {t ? t('reviewModalSubtitle') : 'Topics flagged during checkpoint quizzes so you can reinforce muscle memory.'}
              </p>
            </div>
          </div>
          <button 
            onClick={onClose} 
            className="text-slate-400 hover:text-white text-lg w-7 h-7 rounded-lg hover:bg-slate-800 flex items-center justify-center transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Review Items List */}
        <div className="space-y-3 max-h-96 overflow-y-auto custom-scroll pr-1">
          {reviewItems.length === 0 ? (
            <div className="p-6 text-center space-y-2 bg-slate-950/60 rounded-xl border border-slate-800">
              <Sparkles className="w-8 h-8 text-emerald-400 mx-auto" />
              <p className="text-xs text-slate-300">
                {t ? t('noReviews') : 'Great job! All checkpoint concepts are mastered and your review queue is clear.'}
              </p>
            </div>
          ) : (
            reviewItems.map(item => {
              if (item.isOrphaned) {
                return (
                  <div 
                    key={item.id} 
                    className="p-3.5 rounded-xl bg-amber-500/10 border border-amber-500/30 flex items-center justify-between gap-3"
                  >
                    <div>
                      <span className="text-[10px] font-mono uppercase tracking-wider text-amber-400 font-bold">
                        {lang === 'es' ? 'Etiqueta obsoleta' : 'Legacy / Outdated Tag'}
                      </span>
                      <p className="text-xs text-slate-300 mt-0.5">
                        {lang === 'es' 
                          ? `Elemento de prueba previo (ID: ${item.id}). Puedes limpiarlo ahora.` 
                          : `Previous session review item (ID: ${item.id}). You can safely clean it up.`}
                      </p>
                    </div>
                    <button
                      onClick={() => onDismissItem(item.id)}
                      className="px-3 py-1.5 rounded-lg bg-amber-600 hover:bg-amber-500 text-white text-xs font-bold shrink-0 transition-colors"
                    >
                      {lang === 'es' ? 'Limpiar' : 'Clean Up'}
                    </button>
                  </div>
                );
              }

              return (
                <div 
                  key={item.id}
                  className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-3 hover:border-slate-700 transition-all shadow-sm"
                >
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-800/80 pb-2">
                    <div>
                      <span className="text-[10px] font-mono text-blue-400 uppercase tracking-wider font-bold">
                        {item.chapterTitle}
                      </span>
                      <h4 className="text-sm font-bold text-white mt-0.5">
                        {item.sectionNum} {item.sectionTitle}
                      </h4>
                    </div>
                    <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-rose-500/15 text-rose-300 border border-rose-500/30 font-bold shrink-0 self-start sm:self-auto">
                      {lang === 'es' ? 'Quiz a Repasar' : 'Quiz Missed'}
                    </span>
                  </div>

                  <p className="text-xs text-slate-300 leading-relaxed italic bg-slate-900/60 p-2 rounded-lg border border-slate-800/60">
                    "{item.why}"
                  </p>

                  <div className="flex items-center justify-end gap-2 pt-1">
                    <button
                      onClick={() => onDismissItem(item.id)}
                      className="px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs border border-slate-700 transition-colors flex items-center gap-1.5"
                    >
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                      <span>{t ? t('markReviewed') : 'Mark Reviewed ✓'}</span>
                    </button>
                    <button
                      onClick={() => onJumpToSection(item.chapterNum, item.id)}
                      className="px-3.5 py-1.5 rounded-lg bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs shadow-lg shadow-blue-600/20 transition-all flex items-center gap-1.5"
                    >
                      <span>{t ? t('jumpToSection') : 'Go to Section & Review 🚀'}</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              );
            })
          )}
        </div>

        {/* Footer Actions */}
        <div className="border-t border-slate-800 pt-3 flex items-center justify-between">
          {reviewItems.length > 0 ? (
            <button
              onClick={onClearAll}
              className="text-[11px] text-slate-500 hover:text-rose-400 transition-colors flex items-center gap-1"
            >
              <Trash2 className="w-3 h-3" />
              <span>{t ? t('clearAllReviews') : 'Clear All from Review Queue'}</span>
            </button>
          ) : <div />}

          <button
            onClick={onClose}
            className="px-4 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-bold border border-slate-700 transition-colors"
          >
            {t ? t('close') : 'Close'}
          </button>
        </div>
      </div>
    </div>
  );
}
