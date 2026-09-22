import React, { useState } from 'react';

export function CitationModal({ isOpen, onClose, t, lang = 'en' }) {
  const [copiedType, setCopiedType] = useState(null);

  if (!isOpen) return null;

  const copyText = (text, type) => {
    navigator.clipboard.writeText(text);
    setCopiedType(type);
    setTimeout(() => setCopiedType(null), 1800);
  };

  const simpleCitation = lang === 'es'
    ? "Basado en el plan de estudios de Python de CCCC de la Prof. Jade Cao y Starting Out with Python (6.ª Ed.) por Tony Gaddis."
    : "Based on CCCC Python curriculum by Prof. Jade Cao & Starting Out with Python (6th Ed.) by Tony Gaddis.";

  const ccccCitation = "Cao, Jade. Python Programming Lecture Notebooks (Modules 1.0–6.1). Central Carolina Community College (CCCC).";
  const gaddisCitation = "Gaddis, Tony. Starting Out with Python. 6th ed., Pearson, 2024.";
  const sarahCoxCitation = "Cox, Sarah. Data Science Reference Sheets (NumPy, Matplotlib, SciPy Linear Algebra). Shared in CCCC Python class, distributed by Prof. Jade Cao.";

  return (
    <div className="fixed inset-0 z-50 bg-black/75 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="bg-slate-900 border border-slate-700 rounded-2xl max-w-lg w-full p-6 shadow-2xl space-y-5 text-xs text-slate-200">
        
        {/* Header */}
        <div className="flex items-center justify-between border-b border-slate-800 pb-3">
          <div className="flex items-center gap-2">
            <span className="text-xl">📚</span>
            <div>
              <h3 className="text-base font-bold text-white">
                {t ? t('citationsTitle') : 'Textbook Reference & Citations'}
              </h3>
              <p className="text-[11px] text-slate-400">
                {t ? t('citationsSubtitle') : 'Everything you need to know about citing this resource'}
              </p>
            </div>
          </div>
          <button 
            onClick={onClose} 
            className="text-slate-400 hover:text-white text-lg w-7 h-7 rounded-lg hover:bg-slate-800 flex items-center justify-center transition-colors"
          >
            &times;
          </button>
        </div>

        {/* Plain-English Curriculum & Book Cards */}
        <div className="space-y-2">
          {/* Professor Jade Cao Card */}
          <div className="p-3.5 rounded-xl bg-purple-500/10 border border-purple-500/30 flex items-start gap-3">
            <span className="text-2xl mt-0.5">👩‍🏫</span>
            <div className="space-y-0.5">
              <span className="text-[10px] uppercase font-bold tracking-wider text-purple-400">
                {t ? t('instructorRole') : 'Course Instructor & Curriculum:'}
              </span>
              <div className="text-purple-200 font-bold text-xs">
                {t ? t('instructorAffil') : 'Prof. Jade Cao • Central Carolina Community College (CCCC)'}
              </div>
              <p className="text-[11px] text-slate-300">
                {t ? t('instructorModules') : 'Lecture Notebook Modules 1.0 – 6.1 (Variables, Lists, Dicts, While Loops, Functions, Classes)'}
              </p>
            </div>
          </div>

          {/* Textbook Reference Card */}
          <div className="p-3.5 rounded-xl bg-blue-500/10 border border-blue-500/25 flex items-start gap-3">
            <span className="text-2xl mt-0.5">📖</span>
            <div className="space-y-0.5">
              <span className="text-[10px] uppercase font-bold tracking-wider text-blue-400">
                {t ? t('textbookRole') : 'Syllabus Companion Textbook:'}
              </span>
              <div className="text-blue-300 font-semibold text-xs">
                {t ? t('textbookTitle') : 'Starting Out with Python (6th Edition)'}
              </div>
              <div className="text-[11px] text-slate-300">
                {t ? t('textbookAuthor') : 'Author: Tony Gaddis • Publisher: Pearson'}
              </div>
            </div>
          </div>

          {/* Peer Contributor Card - Sarah Cox */}
          <div className="p-3.5 rounded-xl bg-emerald-500/10 border border-emerald-500/25 flex items-start gap-3">
            <span className="text-2xl mt-0.5">🤝</span>
            <div className="space-y-0.5">
              <span className="text-[10px] uppercase font-bold tracking-wider text-emerald-400">
                {t ? t('peerContributorRole') : 'Peer Contributor & Reference Shares:'}
              </span>
              <div className="text-emerald-300 font-bold text-xs">
                Sarah Cox • {t ? t('peerContributorTitle') : 'Python Class Peer Contributor'}
              </div>
              <p className="text-[11px] text-slate-300">
                {t ? t('peerContributorDesc') : 'Shared Data Science reference cheat sheets (NumPy Basics, Matplotlib 3.10 Anatomy & APIs, SciPy Linear Algebra) distributed to the class by Prof. Jade Cao.'}
              </p>
            </div>
          </div>
        </div>

        {/* When do you need this? Plain English */}
        <div className="space-y-1.5 bg-slate-950/60 p-3 rounded-xl border border-slate-800">
          <span className="text-[11px] font-bold text-amber-400 uppercase tracking-wider block">
            {t ? t('hwUsageTitle') : '💡 For Class Assignments & Homework Comments:'}
          </span>
          <p className="text-[11px] text-slate-300 leading-relaxed">
            {t ? t('hwUsageDesc') : 'All code drills, practice sandboxes, and "Why" breakdowns in this portal are original interactive exercises aligned with Prof. Jade Cao\'s lecture notebooks at CCCC and Tony Gaddis\'s textbook. Click below to copy citations:'}
          </p>
        </div>

        {/* 1-Click Copy Citation Options */}
        <div className="space-y-2.5">
          {/* 1. Quick Homework Comment (Most useful for students) */}
          <div className="p-3 rounded-xl bg-slate-950 border border-slate-800 space-y-1.5">
            <div className="flex items-center justify-between">
              <span className="text-[11px] font-bold text-emerald-400">
                {t ? t('forCodeComments') : '1. For Code Comments & Homework:'}
              </span>
              <button
                onClick={() => copyText(simpleCitation, 'simple')}
                className={`px-2 py-0.5 rounded text-[11px] font-mono border transition-all ${
                  copiedType === 'simple' 
                    ? 'bg-emerald-500/20 text-emerald-300 border-emerald-500/50 font-bold' 
                    : 'bg-slate-800 text-slate-300 hover:text-white border-slate-700'
                }`}
              >
                {copiedType === 'simple' ? (lang === 'es' ? '¡Copiado! ✓' : 'Copied! ✓') : (lang === 'es' ? 'Copiar' : 'Copy')}
              </button>
            </div>
            <p className="text-[11px] font-mono text-slate-300 bg-slate-900/90 p-2 rounded border border-slate-800/80">
              # {simpleCitation}
            </p>
          </div>

          {/* 2. Formal College Formats (Prof. Jade Cao / CCCC & Tony Gaddis) */}
          <div className="p-3 rounded-xl bg-slate-950 border border-slate-800 space-y-2">
            <span className="text-[11px] font-bold text-slate-400 block">
              {t ? t('formalAttributions') : '2. Formal Course & Textbook Attributions:'}
            </span>
            
            {/* Prof Jade Cao CCCC */}
            <div className="flex items-start justify-between gap-2 border-t border-slate-800/60 pt-2">
              <div className="text-[11px]">
                <span className="text-purple-400 font-bold font-mono">
                  {t ? t('ccccLectureSeries') : 'CCCC Lecture Series:'}{' '}
                </span>
                <span className="text-slate-300">{ccccCitation}</span>
              </div>
              <button
                onClick={() => copyText(ccccCitation, 'cccc')}
                className={`px-2 py-0.5 rounded text-[11px] font-mono border transition-all shrink-0 ${
                  copiedType === 'cccc' 
                    ? 'bg-emerald-500/20 text-emerald-300 border-emerald-500/50 font-bold' 
                    : 'bg-slate-800 text-slate-300 hover:text-white border-slate-700'
                }`}
              >
                {copiedType === 'cccc' ? (lang === 'es' ? '¡Copiado! ✓' : 'Copied! ✓') : (lang === 'es' ? 'Copiar' : 'Copy')}
              </button>
            </div>

            {/* Tony Gaddis */}
            <div className="flex items-start justify-between gap-2 border-t border-slate-800/60 pt-2">
              <div className="text-[11px]">
                <span className="text-blue-400 font-bold font-mono">
                  {t ? t('textbookReference') : 'Textbook Reference:'}{' '}
                </span>
                <span className="text-slate-300">{gaddisCitation}</span>
              </div>
              <button
                onClick={() => copyText(gaddisCitation, 'gaddis')}
                className={`px-2 py-0.5 rounded text-[11px] font-mono border transition-all shrink-0 ${
                  copiedType === 'gaddis' 
                    ? 'bg-emerald-500/20 text-emerald-300 border-emerald-500/50 font-bold' 
                    : 'bg-slate-800 text-slate-300 hover:text-white border-slate-700'
                }`}
              >
                {copiedType === 'gaddis' ? (lang === 'es' ? '¡Copiado! ✓' : 'Copied! ✓') : (lang === 'es' ? 'Copiar' : 'Copy')}
              </button>
            </div>

            {/* Sarah Cox Peer Contributor */}
            <div className="flex items-start justify-between gap-2 border-t border-slate-800/60 pt-2">
              <div className="text-[11px]">
                <span className="text-emerald-400 font-bold font-mono">
                  {t ? t('peerSharedResource') : 'Data Science Reference Sheets:'}{' '}
                </span>
                <span className="text-slate-300">{sarahCoxCitation}</span>
              </div>
              <button
                onClick={() => copyText(sarahCoxCitation, 'sarah')}
                className={`px-2 py-0.5 rounded text-[11px] font-mono border transition-all shrink-0 ${
                  copiedType === 'sarah' 
                    ? 'bg-emerald-500/20 text-emerald-300 border-emerald-500/50 font-bold' 
                    : 'bg-slate-800 text-slate-300 hover:text-white border-slate-700'
                }`}
              >
                {copiedType === 'sarah' ? (lang === 'es' ? '¡Copiado! ✓' : 'Copied! ✓') : (lang === 'es' ? 'Copiar' : 'Copy')}
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
            {t ? t('gotItThanks') : 'Got it, thanks!'}
          </button>
        </div>
      </div>
    </div>
  );
}
