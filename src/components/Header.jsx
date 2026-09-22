import React, { useState, useRef, useEffect } from 'react';

export function Header({
  activeChapter,
  totalChapters,
  onOpenCitation,
  onOpenWhitePaper,
  isMuted,
  onToggleMute,
  isSpeaking,
  voices = [],
  selectedVoiceName,
  onSelectVoice,
  activeVoice,
  pyodideReady,
  lang = 'en',
  onToggleLang,
  t,
  onOpenStats,
  activeView = 'chapters'
}) {
  const [voicePickerOpen, setVoicePickerOpen] = useState(false);
  const pickerRef = useRef(null);

  // Close picker when clicking outside
  useEffect(() => {
    const handler = (e) => {
      if (pickerRef.current && !pickerRef.current.contains(e.target)) {
        setVoicePickerOpen(false);
      }
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, []);

  // Label for the currently active voice — trimmed to fit header
  const voiceLabel = activeVoice
    ? activeVoice.name
        .replace('Microsoft', 'MS')
        .replace('Online (Natural)', '★')
        .replace('Desktop', '')
        .replace(' - English (United States)', '')
        .replace(' - English (United Kingdom)', '')
        .replace(' - Spanish (Spain)', ' (ES)')
        .replace(' - Spanish (Mexico)', ' (MX)')
        .replace(' - Spanish (United States)', ' (US)')
        .trim()
    : (lang === 'es' ? 'Voz por defecto' : 'Default Voice');

  return (
    <header className="h-16 border-b border-slate-800 bg-slate-900/70 backdrop-blur-md px-4 md:px-6 flex items-center justify-between shrink-0 sticky top-0 z-20">
      {/* Left: Chapter info */}
      <div className="flex items-center gap-3 truncate">
        <div className="flex items-center gap-2">
          <span className="text-xl">🐍</span>
          <span className="text-xs font-mono font-bold uppercase tracking-wider text-blue-400 hidden sm:inline">
            {t ? t('chapter') : 'Chapter'} {activeChapter.num} {t ? t('of') : 'of'} {totalChapters}
          </span>
        </div>
        <span className="text-slate-600 hidden sm:inline">|</span>
        <h1 className="text-sm md:text-base font-bold text-white truncate">
          {activeChapter.title}
        </h1>
      </div>

      {/* Right: Controls */}
      <div className="flex items-center gap-2 shrink-0">
        {/* Language Switcher Toggle */}
        <div className="flex items-center bg-slate-950 border border-slate-800 rounded-lg p-0.5 text-xs font-mono font-bold shadow-inner">
          <button
            onClick={() => onToggleLang && onToggleLang('en')}
            title="Switch to English"
            className={`px-2 py-1 rounded-md transition-all flex items-center gap-1 text-[11px] ${
              lang === 'en'
                ? 'bg-blue-600 text-white shadow'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            <span>🇺🇸</span> <span>EN</span>
          </button>
          <button
            onClick={() => onToggleLang && onToggleLang('es')}
            title="Cambiar a Español"
            className={`px-2 py-1 rounded-md transition-all flex items-center gap-1 text-[11px] ${
              lang === 'es'
                ? 'bg-blue-600 text-white shadow'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            <span>🇪🇸</span> <span>ES</span>
          </button>
        </div>

        {/* Pyodide Status */}
        <div className="hidden lg:flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-mono border bg-slate-950 border-slate-800">
          <span className={`w-2 h-2 rounded-full ${pyodideReady ? 'bg-emerald-400 animate-pulse' : 'bg-amber-400'}`} />
          <span className="text-slate-300">
            {pyodideReady ? (t ? t('pythonEngineReady') : 'Python 3.12 Ready') : (t ? t('loadingEngine') : 'Loading Engine...')}
          </span>
        </div>

        {/* ── Voice Controls Group ── */}
        <div className="flex items-center gap-1 bg-slate-900 border border-slate-800 rounded-lg px-1 py-1">
          {/* Mute / Unmute toggle */}
          <button
            onClick={onToggleMute}
            title={isMuted ? (t ? t('voiceNarrationMuted') : 'Voice muted') : (t ? t('voiceNarrationActive') : 'Voice active')}
            className={`flex items-center gap-1 px-2 py-1 rounded-md text-xs transition-all font-medium ${
              isMuted
                ? 'text-slate-500 hover:text-slate-300'
                : isSpeaking
                  ? 'text-emerald-300 bg-emerald-500/15 border border-emerald-500/30 animate-pulse'
                  : 'text-amber-300 hover:text-amber-200'
            }`}
          >
            <span>{isMuted ? '🔇' : isSpeaking ? '🔊' : '🔊'}</span>
            <span className="hidden md:inline text-[11px]">
              {isMuted ? (t ? t('muted') : 'Muted') : isSpeaking ? (t ? t('speaking') : 'Speaking...') : (t ? t('voice') : 'Voice')}
            </span>
          </button>

          {/* Voice picker button */}
          {!isMuted && voices.length > 0 && (
            <div className="relative" ref={pickerRef}>
              <button
                onClick={() => setVoicePickerOpen(prev => !prev)}
                title={t ? t('selectVoice') : 'Change voice'}
                className="flex items-center gap-1 px-2 py-1 rounded-md text-[11px] text-slate-300 hover:text-white hover:bg-slate-800 transition-all font-mono max-w-[130px] truncate"
              >
                <span className="text-amber-400">▾</span>
                <span className="truncate">{voiceLabel}</span>
              </button>

              {/* Dropdown panel */}
              {voicePickerOpen && (
                <div className="absolute right-0 top-full mt-2 w-80 bg-slate-900 border border-slate-700 rounded-xl shadow-2xl shadow-black/50 z-50 overflow-hidden">
                  <div className="p-2 border-b border-slate-800 flex items-center justify-between">
                    <span className="text-[11px] font-bold text-slate-300 uppercase tracking-wide">
                      🎙️ {t ? t('selectVoice') : 'Select Narration Voice'}
                    </span>
                    <span className="text-[10px] text-slate-500 font-mono">
                      {voices.length} {t ? t('availableVoices') : 'available'}
                    </span>
                  </div>

                  <div className="max-h-72 overflow-y-auto custom-scroll p-1.5 space-y-0.5">
                    {voices.map(voice => {
                      const isSelected = voice.name === selectedVoiceName;
                      const isGoogle = voice.name.startsWith('Google');
                      const isNatural = voice.name.includes('Natural') || voice.name.includes('Neural');
                      const isMicrosoft = voice.name.startsWith('Microsoft');

                      let badge = null;
                      let badgeStyle = '';
                      if (isGoogle) { badge = 'Google'; badgeStyle = 'bg-blue-500/20 text-blue-300 border-blue-500/30'; }
                      else if (isNatural) { badge = 'Neural ★'; badgeStyle = 'bg-purple-500/20 text-purple-300 border-purple-500/30'; }
                      else if (isMicrosoft) { badge = 'Microsoft'; badgeStyle = 'bg-teal-500/20 text-teal-300 border-teal-500/30'; }

                      const displayName = voice.name
                        .replace(' Desktop - English (United States)', '')
                        .replace(' Desktop - English (United Kingdom)', '')
                        .replace(' - English (United States)', '')
                        .replace(' - English (United Kingdom)', '')
                        .replace(' - Spanish (Spain)', ' (ES)')
                        .replace(' - Spanish (Mexico)', ' (MX)')
                        .replace(' - Spanish (United States)', ' (US)')
                        .replace('Online (Natural)', '(Neural)')
                        .trim();

                      return (
                        <button
                          key={voice.name}
                          onClick={() => {
                            onSelectVoice(voice.name);
                            setVoicePickerOpen(false);
                          }}
                          className={`w-full text-left px-3 py-2 rounded-lg text-xs transition-all flex items-center justify-between gap-2 ${
                            isSelected
                              ? 'bg-amber-500/15 border border-amber-500/30 text-amber-200 font-bold'
                              : 'text-slate-300 hover:bg-slate-800 border border-transparent'
                          }`}
                        >
                          <div className="flex items-center gap-2 truncate">
                            {isSelected && <span className="text-amber-400">✓</span>}
                            <span className="truncate font-mono">{displayName}</span>
                          </div>
                          <div className="flex items-center gap-1.5 shrink-0">
                            {badge && (
                              <span className={`text-[10px] px-1.5 py-0.5 rounded border font-bold ${badgeStyle}`}>
                                {badge}
                              </span>
                            )}
                            <span className="text-[10px] text-slate-500 font-mono">{voice.lang}</span>
                          </div>
                        </button>
                      );
                    })}
                  </div>

                  <div className="p-2 border-t border-slate-800 text-[10px] text-slate-500 text-center">
                    {lang === 'es' 
                      ? 'Las voces Neural ★ de Edge y Google ofrecen la pronunciación más natural.' 
                      : 'Google voices sound best in Chrome. Neural ★ voices are best in Edge.'}
                  </div>
                </div>
              )}
            </div>
          )}
        </div>

        {/* Stats button */}
        {onOpenStats && (
          <button
            onClick={onOpenStats}
            className={`flex items-center gap-1.5 text-xs px-2.5 py-1.5 rounded-lg transition-all font-medium border ${
              activeView === 'stats'
                ? 'bg-blue-600 text-white font-bold border-blue-400 shadow-sm'
                : 'bg-slate-800 hover:bg-slate-700 text-blue-300 border-slate-700'
            }`}
            title={t ? t('stats') : 'Stats & Analytics'}
          >
            <span>📊</span>
            <span className="hidden sm:inline text-[11px] font-semibold">{t ? t('stats') : 'Stats'}</span>
          </button>
        )}

        {/* White Paper button */}
        <button
          onClick={onOpenWhitePaper}
          className="flex items-center gap-1.5 text-xs px-2.5 py-1.5 rounded-lg bg-blue-600/20 hover:bg-blue-600/30 text-blue-300 border border-blue-500/40 transition-colors shadow-sm font-medium"
          title={t ? t('whitePaperTheory') : 'Academic Theory White Paper'}
        >
          <span>🏛️</span>
          <span className="hidden sm:inline text-[11px] font-semibold">{t ? t('whitePaper') : 'White Paper'}</span>
        </button>

        {/* Citations button */}
        <button
          onClick={onOpenCitation}
          className="flex items-center gap-1 text-xs px-2.5 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 transition-colors"
        >
          <span>📜</span>
          <span className="hidden sm:inline text-[11px] font-medium">{t ? t('citations') : 'Citations'}</span>
        </button>
      </div>
    </header>
  );
}
