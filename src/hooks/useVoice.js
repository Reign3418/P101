import { useState, useEffect, useRef, useCallback } from 'react';

// Priority ladders for voice selection — best sounding first
const VOICE_PRIORITY_EN = [
  'Google US English',
  'Google UK English Female',
  'Google UK English Male',
  'Microsoft Aria Online (Natural)',
  'Microsoft Jenny Online (Natural)',
  'Microsoft Guy Online (Natural)',
  'Microsoft Ana Online (Natural)',
  'Microsoft Aria - English (United States)',
  'Microsoft Jenny - English (United States)',
  'Microsoft Guy - English (United States)',
  'Microsoft David Desktop - English (United States)',
  'Microsoft Zira Desktop - English (United States)',
  'Microsoft Mark Desktop - English (United States)',
  'Samantha',
  'Karen',
  'Daniel',
  'Moira',
  'en-US',
];

const VOICE_PRIORITY_ES = [
  'Google español',
  'Google español de Estados Unidos',
  'Microsoft Sabina Online (Natural)',
  'Microsoft Dalia Online (Natural)',
  'Microsoft Jorge Online (Natural)',
  'Microsoft Elvira Online (Natural)',
  'Microsoft Alvaro Online (Natural)',
  'Microsoft Helena - Spanish (Spain)',
  'Microsoft Laura - Spanish (Spain)',
  'Microsoft Pablo - Spanish (Spain)',
  'Microsoft Sabina - Spanish (Mexico)',
  'Microsoft Raul - Spanish (Mexico)',
  'Paulina',
  'Monica',
  'es-US',
  'es-ES',
  'es-MX',
];

function pickBestVoice(voices, lang = 'en') {
  if (!voices || voices.length === 0) return null;
  const priorityList = lang === 'es' ? VOICE_PRIORITY_ES : VOICE_PRIORITY_EN;

  for (const priority of priorityList) {
    if (priority.includes('-')) {
      const found = voices.find(v => v.lang && v.lang.toLowerCase() === priority.toLowerCase());
      if (found) return found;
    } else {
      const found = voices.find(v => v.name === priority);
      if (found) return found;
    }
  }

  // Fallback: any voice matching language prefix
  const anyLang = voices.find(v => v.lang && v.lang.startsWith(lang));
  if (anyLang) return anyLang;

  // Ultimate fallback
  return voices[0];
}

export function useVoice(lang = 'en') {
  const [voices, setVoices] = useState([]);
  const [selectedVoiceName, setSelectedVoiceName] = useState(
    () => localStorage.getItem(`p101_selected_voice_${lang}`) || null
  );
  const [isMuted, setIsMuted] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const utteranceRef = useRef(null);

  // Load voices from browser
  useEffect(() => {
    const synth = window.speechSynthesis;
    if (!synth) return;

    const loadVoices = () => {
      const available = synth.getVoices();
      if (available.length > 0) {
        setVoices(available);
      }
    };

    loadVoices();
    synth.addEventListener('voiceschanged', loadVoices);
    return () => synth.removeEventListener('voiceschanged', loadVoices);
  }, []);

  // Update selected voice whenever voices load or language changes
  useEffect(() => {
    if (voices.length === 0) return;

    const savedVoice = localStorage.getItem(`p101_selected_voice_${lang}`);
    const voiceExists = voices.find(v => v.name === savedVoice && v.lang && v.lang.startsWith(lang));

    if (voiceExists) {
      setSelectedVoiceName(voiceExists.name);
    } else {
      const best = pickBestVoice(voices, lang);
      if (best) {
        setSelectedVoiceName(best.name);
        localStorage.setItem(`p101_selected_voice_${lang}`, best.name);
      }
    }
  }, [lang, voices]);

  const getActiveVoice = useCallback(() => {
    if (voices.length === 0) return null;
    const current = voices.find(v => v.name === selectedVoiceName && v.lang && v.lang.startsWith(lang));
    return current || pickBestVoice(voices, lang);
  }, [voices, selectedVoiceName, lang]);

  const speak = useCallback((text, { rate = 0.94, pitch = 1.0 } = {}) => {
    const synth = window.speechSynthesis;
    if (!synth || isMuted || !text) return;

    synth.cancel();

    const utterance = new SpeechSynthesisUtterance(text);
    const voice = getActiveVoice();
    if (voice) {
      utterance.voice = voice;
      utterance.lang = voice.lang || (lang === 'es' ? 'es-ES' : 'en-US');
    } else {
      utterance.lang = lang === 'es' ? 'es-ES' : 'en-US';
    }

    utterance.rate = rate;
    utterance.pitch = pitch;

    utterance.onstart = () => setIsSpeaking(true);
    utterance.onend = () => setIsSpeaking(false);
    utterance.onerror = () => setIsSpeaking(false);

    utteranceRef.current = utterance;
    synth.speak(utterance);
  }, [isMuted, getActiveVoice, lang]);

  const stop = useCallback(() => {
    if (window.speechSynthesis) window.speechSynthesis.cancel();
    setIsSpeaking(false);
  }, []);

  const selectVoice = useCallback((voiceName) => {
    setSelectedVoiceName(voiceName);
    localStorage.setItem(`p101_selected_voice_${lang}`, voiceName);
  }, [lang]);

  const toggleMute = useCallback(() => {
    setIsMuted(prev => {
      if (!prev) stop();
      return !prev;
    });
  }, [stop]);

  // Filter voices matching the current language
  const languageVoices = voices.filter(v => v.lang && v.lang.startsWith(lang));

  return {
    voices: languageVoices.length > 0 ? languageVoices : voices,
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
