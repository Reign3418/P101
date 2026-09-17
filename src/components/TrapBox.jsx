import React from 'react';

export function TrapBox({ pitfall, t }) {
  return (
    <div className="p-3.5 rounded-xl bg-rose-500/10 border border-rose-500/25 flex items-start gap-3">
      <span className="text-rose-400 text-base shrink-0 mt-0.5">⚠️</span>
      <div>
        <span className="text-xs font-bold text-rose-400 block uppercase tracking-wider">
          {t ? t('watchOutTrap') : 'Watch Out / Common Trap:'}
        </span>
        <p className="text-xs text-rose-200/90 mt-0.5 leading-relaxed">
          {pitfall}
        </p>
      </div>
    </div>
  );
}
