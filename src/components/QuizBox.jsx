import React, { useState, useEffect } from 'react';

export function QuizBox({ sectionId, quizData, onAnswer, onTakeMeToReview }) {
  const [chosenIdx, setChosenIdx] = useState(null);
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    setChosenIdx(null);
    setSubmitted(false);
  }, [sectionId]);

  if (!quizData) return null;

  const handleSelect = (idx) => {
    if (submitted) return;
    setChosenIdx(idx);
    setSubmitted(true);
    const isCorrect = idx === quizData.answer;
    onAnswer(sectionId, isCorrect);
  };

  const handleRetake = () => {
    setChosenIdx(null);
    setSubmitted(false);
  };

  return (
    <div className="bg-slate-950 border border-blue-500/30 rounded-xl p-4 md:p-5 space-y-3">
      <div className="flex items-center justify-between">
        <span className="text-xs font-bold text-blue-400 uppercase tracking-wider flex items-center gap-1.5">
          <span>❓</span> Interactive Checkpoint Quiz:
        </span>
        <span className={`text-[11px] font-mono font-bold ${
          !submitted ? 'text-slate-500' : (chosenIdx === quizData.answer ? 'text-emerald-400' : 'text-rose-400')
        }`}>
          {!submitted ? 'Unanswered' : (chosenIdx === quizData.answer ? 'Correct! ✓' : 'Review Needed')}
        </span>
      </div>

      <p className="text-xs md:text-sm font-medium text-slate-200">
        {quizData.question}
      </p>

      {/* Options List */}
      <div className="grid grid-cols-1 gap-2 pt-1">
        {quizData.options.map((opt, idx) => {
          let btnClass = "text-left p-2.5 rounded-lg border text-xs transition-all flex items-start gap-2 ";
          if (!submitted) {
            btnClass += "border-slate-800 hover:border-slate-600 bg-slate-900/80 text-slate-300";
          } else if (idx === quizData.answer) {
            btnClass += "border-emerald-500/50 bg-emerald-500/20 text-emerald-200 font-bold";
          } else if (idx === chosenIdx) {
            btnClass += "border-rose-500/50 bg-rose-500/20 text-rose-300 line-through";
          } else {
            btnClass += "border-slate-800 bg-slate-900/40 text-slate-500 opacity-60";
          }

          return (
            <button
              key={idx}
              disabled={submitted}
              onClick={() => handleSelect(idx)}
              className={btnClass}
            >
              <span className="font-mono text-slate-500 font-bold">{String.fromCharCode(65 + idx)}.</span>
              <span className="flex-1">{opt}</span>
            </button>
          );
        })}
      </div>

      {/* Feedback Panel */}
      {submitted && (
        <div className={`p-3 rounded-lg text-xs leading-relaxed space-y-2.5 ${
          chosenIdx === quizData.answer
            ? 'bg-emerald-500/15 border border-emerald-500/30 text-emerald-200'
            : 'bg-rose-500/15 border border-rose-500/30 text-rose-200'
        }`}>
          <div>
            <strong>{chosenIdx === quizData.answer ? '🎉 Spot on!' : 'Not quite.'}</strong>{' '}
            {quizData.explanation}
          </div>

          {chosenIdx !== quizData.answer && (
            <div className="flex items-center gap-2 pt-1">
              <button
                onClick={() => onTakeMeToReview(sectionId)}
                className="px-3 py-1.5 rounded-lg bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs shadow flex items-center gap-1"
              >
                <span>🔁</span>
                <span>Take Me to Review</span>
              </button>
              <button
                onClick={handleRetake}
                className="px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs border border-slate-700 flex items-center gap-1"
              >
                <span>🔄</span>
                <span>Retake Quiz</span>
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
