import { useState, useEffect, useRef, useCallback } from 'react';

// Priority ladder for voice selection — best sounding first
const VOICE_PRIORITY = [
  // Chrome / Google voices (most natural, cloud-backed)
  'Google US English',
  'Google UK English Female',
  'Google UK English Male',
  // Microsoft Edge Neural (near-human quality)
  'Microsoft Aria Online (Natural)',
  'Microsoft Jenny Online (Natural)',
  'Microsoft Guy Online (Natural)',
  'Microsoft Ana Online (Natural)',
  // Windows built-in Microsoft voices (much cleaner than OS default)
  'Microsoft Aria - English (United States)',
  'Microsoft Jenny - English (United States)',
  'Microsoft Guy - English (United States)',
  'Microsoft David Desktop - English (United States)',
  'Microsoft Zira Desktop - English (United States)',
  'Microsoft Mark Desktop - English (United States)',
  // macOS / iOS natural voices
  'Samantha',
  'Karen',
  'Daniel',
  'Moira',
  // Any remaining en-US (wildcard fallback)
  'en-US',
];

const STORAGE_KEY = 'p101_selected_voice';

function pickBestVoice(voices) {
  if (!voices || voices.length === 0) return null;

  // Try each priority entry in order
  for (const priority of VOICE_PRIORITY) {
    if (priority === 'en-US') {
      // Wildcard: pick first en-US voice
      const found = voices.find(v => v.lang === 'en-US');
      if (found) return found;
    } else {
      const found = voices.find(v => v.name === priority);
      if (found) return found;
    }
  }

  // Last resort: any English voice
  const anyEn = voices.find(v => v.lang && v.lang.startsWith('en'));
  return anyEn || voices[0];
}

export function useVoice() {
  const [voices, setVoices] = useState([]);
  const [selectedVoiceName, setSelectedVoiceName] = useState(
    () => localStorage.getItem(STORAGE_KEY) || null
  );
  const [isMuted, setIsMuted] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const utteranceRef = useRef(null);

  // Load voices — must wait for voiceschanged event (Chrome async loads cloud voices)
  useEffect(() => {
    const synth = window.speechSynthesis;
    if (!synth) return;

    const loadVoices = () => {
      const available = synth.getVoices();
      if (available.length > 0) {
        setVoices(available);

        // If no saved preference, auto-select best voice
        setSelectedVoiceName(prev => {
          if (prev && available.find(v => v.name === prev)) return prev; // saved pref still exists
          const best = pickBestVoice(available);
          if (best) {
            localStorage.setItem(STORAGE_KEY, best.name);
            return best.name;
          }
          return prev;
        });
      }
    };

    loadVoices(); // Try immediately (Firefox/Safari)
    synth.addEventListener('voiceschanged', loadVoices); // Chrome fires this async
    return () => synth.removeEventListener('voiceschanged', loadVoices);
  }, []);

  const getActiveVoice = useCallback(() => {
    if (!selectedVoiceName || voices.length === 0) return null;
    return voices.find(v => v.name === selectedVoiceName) || pickBestVoice(voices);
  }, [voices, selectedVoiceName]);

  const speak = useCallback((text, { rate = 0.95, pitch = 1.0 } = {}) => {
    const synth = window.speechSynthesis;
    if (!synth || isMuted || !text) return;

    synth.cancel(); // Stop any current speech

    const utterance = new SpeechSynthesisUtterance(text);
    const voice = getActiveVoice();
    if (voice) utterance.voice = voice;
    utterance.rate = rate;
    utterance.pitch = pitch;
    utterance.lang = 'en-US';

    utterance.onstart = () => setIsSpeaking(true);
    utterance.onend = () => setIsSpeaking(false);
    utterance.onerror = () => setIsSpeaking(false);

    utteranceRef.current = utterance;
    synth.speak(utterance);
  }, [isMuted, getActiveVoice]);

  const stop = useCallback(() => {
    if (window.speechSynthesis) window.speechSynthesis.cancel();
    setIsSpeaking(false);
  }, []);

  const selectVoice = useCallback((voiceName) => {
    setSelectedVoiceName(voiceName);
    localStorage.setItem(STORAGE_KEY, voiceName);
  }, []);

  const toggleMute = useCallback(() => {
    setIsMuted(prev => {
      if (!prev) stop(); // If muting, stop current speech
      return !prev;
    });
  }, [stop]);

  // English voices only for the picker (filter out non-English noise)
  const englishVoices = voices.filter(v => v.lang && v.lang.startsWith('en'));

  return {
    voices: englishVoices,
    selectedVoiceName,
    selectVoice,
    speak,
    stop,
    isMuted,
    toggleMute,
    isSpeaking,
    activeVoice: getActiveVoice(),
  };
}
