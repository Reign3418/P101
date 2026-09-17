import React, { useState, useRef, useEffect } from 'react';

export function Header({
  activeChapter,
  totalChapters,
  onOpenCitation,
  isMuted,
  onToggleMute,
  isSpeaking,
  voices = [],
  selectedVoiceName,
  onSelectVoice,
  activeVoice,
  pyodideReady,
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
        .trim()
    : 'Default Voice';

  return (
    <header className="h-16 border-b border-slate-800 bg-slate-900/70 backdrop-blur-md px-4 md:px-6 flex items-center justify-between shrink-0 sticky top-0 z-20">
      {/* Left: Chapter info */}
      <div className="flex items-center gap-3 truncate">
        <div className="flex items-center gap-2">
          <span className="text-xl">🐍</span>
          <span className="text-xs font-mono font-bold uppercase tracking-wider text-blue-400 hidden sm:inline">
            Chapter {activeChapter.num} of {totalChapters}
          </span>
        </div>
        <span className="text-slate-600 hidden sm:inline">|</span>
        <h1 className="text-sm md:text-base font-bold text-white truncate">
          {activeChapter.title}
        </h1>
      </div>

      {/* Right: Controls */}
      <div className="flex items-center gap-2 shrink-0">

        {/* Pyodide Status */}
        <div className="hidden lg:flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-mono border bg-slate-950 border-slate-800">
          <span className={`w-2 h-2 rounded-full ${pyodideReady ? 'bg-emerald-400 animate-pulse' : 'bg-amber-400'}`} />
          <span className="text-slate-300">
            {pyodideReady ? 'Python 3.12 Ready' : 'Loading Engine...'}
          </span>
        </div>

        {/* ── Voice Controls Group ── */}
        <div className="flex items-center gap-1 bg-slate-900 border border-slate-800 rounded-lg px-1 py-1">

          {/* Mute / Unmute toggle */}
          <button
            onClick={onToggleMute}
            title={isMuted ? 'Voice narration muted — click to unmute' : 'Voice narration on — click to mute'}
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
              {isMuted ? 'Muted' : isSpeaking ? 'Speaking...' : 'Voice'}
            </span>
          </button>

          {/* Voice picker button */}
          {!isMuted && voices.length > 0 && (
            <div className="relative" ref={pickerRef}>
              <button
                onClick={() => setVoicePickerOpen(prev => !prev)}
                title="Change voice"
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
                      🎙️ Select Narration Voice
                    </span>
                    <span className="text-[10px] text-slate-500 font-mono">{voices.length} available</span>
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
                    Google voices sound best in Chrome. Neural ★ voices are best in Edge.
                  </div>
                </div>
              )}
            </div>
          )}
        </div>

        {/* Citations button */}
        <button
          onClick={onOpenCitation}
          className="flex items-center gap-1 text-xs px-2.5 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 transition-colors"
        >
          <span>📜</span>
          <span className="hidden sm:inline text-[11px] font-medium">Citations</span>
        </button>
      </div>
    </header>
  );
}
