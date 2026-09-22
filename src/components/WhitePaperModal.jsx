import React, { useState, useEffect } from 'react';
import { 
  FileText, 
  BookOpen, 
  ShieldCheck, 
  Cpu, 
  ExternalLink, 
  Copy, 
  Check, 
  X, 
  Layers, 
  GraduationCap,
  Sparkles,
  Lock,
  Globe
} from 'lucide-react';

const CURRICULUM_SYNTHESIS_DATA = [
  {
    module: {
      en: 'Module 1: Variables & Formatting',
      es: 'Módulo 1: Variables y Formato',
      source: '01_Variables_and_Data_Types.ipynb'
    },
    gaddis: {
      en: 'Chapter 2 (Sections 2.4, 2.7, 2.8)',
      es: 'Capítulo 2 (Secciones 2.4, 2.7, 2.8)'
    },
    concepts: {
      en: 'RAM memory pointers, primitive types, int/float conversions, string immutability, f-strings, traceback debugging forensics.',
      es: 'Punteros en memoria RAM, tipos primitivos, conversión int/float, inmutabilidad de cadenas, f-strings, pistas de depuración en tracebacks.'
    },
    analogy: {
      en: 'Numbered warehouse bins with tied label tags; immutable stone tablet carved in granite.',
      es: 'Almacén con cajas numeradas y etiquetas con cuerda; lápida de piedra inmutable grabada en granito.'
    }
  },
  {
    module: {
      en: 'Module 2.1: Intro to Lists',
      es: 'Módulo 2.1: Introducción a Listas',
      source: 'Module2.1_Intro_to_Lists.ipynb'
    },
    gaddis: {
      en: 'Chapter 7 (Sections 7.1 – 7.4)',
      es: 'Capítulo 7 (Secciones 7.1 – 7.4)'
    },
    concepts: {
      en: '0-based & negative indexing, append vs insert, len(), del vs pop vs remove, sort() vs sorted(), dynamic over-allocation.',
      es: 'Índice en base 0 y negativo, append vs insert, len(), del vs pop vs remove, sort() vs sorted(), sobre-asignación dinámica.'
    },
    analogy: {
      en: 'Freight train with numbered boxcars; office desk in-box with paper shredder vs active folder.',
      es: 'Tren de carga con vagones numerados; bandeja de oficina con trituradora de papel vs escritorio activo.'
    }
  },
  {
    module: {
      en: 'Module 2.2: For Loops & Tuples',
      es: 'Módulo 2.2: Bucles for y Tuplas',
      source: 'Module2.2_Working_with_Lists.ipynb'
    },
    gaddis: {
      en: 'Chapter 4 (4.2, 4.3) & Chapter 7 (7.5, 7.7, 7.10)',
      es: 'Capítulo 4 (4.2, 4.3) y Cap 7 (7.5, 7.7, 7.10)'
    },
    concepts: {
      en: 'Count-controlled loops, range(), running accumulators, shallow copy protection ([:], .copy()), memory aliasing trap, immutable tuples.',
      es: 'Bucles por conteo, range(), acumuladores, copias superficiales ([:], .copy()), trampa de alias en memoria, tuplas inmutables.'
    },
    analogy: {
      en: 'Robotic arm scanning conveyor belt items; two physical keys opening the exact same house door.',
      es: 'Brazo robótico escaneando sobre cinta transportadora; dos llaves físicas para la misma puerta de casa.'
    }
  },
  {
    module: {
      en: 'Module 3.1: If-Elif-Else Decision Structures',
      es: 'Módulo 3.1: Estructuras if-elif-else',
      source: 'Module3.1_If_Statements.ipynb'
    },
    gaddis: {
      en: 'Chapter 3 (Sections 3.1, 3.3, 3.5)',
      es: 'Capítulo 3 (Secciones 3.1, 3.3, 3.5)'
    },
    concepts: {
      en: 'Relational operators, in / not in membership, and / or / not logic, short-circuit boolean evaluation, elif fallback chains.',
      es: 'Operadores relacionales, pertenencia in / not in, lógica and / or / not, evaluación de cortocircuito, cadenas elif ordenadas.'
    },
    analogy: {
      en: 'Security guard checking badge credentials at gate; mail sorting conveyor divert chute.',
      es: 'Guardia de seguridad revisando credenciales en puerta; canal de clasificación postal automatizado.'
    }
  },
  {
    module: {
      en: 'Module 3.2: Dictionaries & Key-Value Pairs',
      es: 'Módulo 3.2: Diccionarios y Pares Clave-Valor',
      source: 'Module3.2_Dictionaries.ipynb'
    },
    gaddis: {
      en: 'Chapter 9 (Section 9.1)',
      es: 'Capítulo 9 (Sección 9.1)'
    },
    concepts: {
      en: 'Key-value mapping, safe lookup with .get(), key error handling, dictionary mutation, unpacking loops with .items().',
      es: 'Mapeo clave-valor, búsqueda segura con .get(), manejo de errores KeyError, mutación de diccionarios, desempaquetado con .items().'
    },
    analogy: {
      en: 'Coat check locker with claim ticket; supermarket barcode scanner instantly resolving shelf price.',
      es: 'Taquilla de guardarropa con ticket de reclamo; escáner de código de barras asociando precio instantáneo.'
    }
  },
  {
    module: {
      en: 'Module 4.1 & 4.2: While Loops & Integrated Workshops',
      es: 'Módulo 4.1 y 4.2: Bucles while y Talleres Integrados',
      source: 'Module4.1_While_Loops & 4.2_workshop.ipynb'
    },
    gaddis: {
      en: 'Chapter 4 (4.1, 4.3, 4.4) & Chapter 7 Workshop',
      es: 'Capítulo 4 (4.1, 4.3, 4.4) y Taller del Cap 7'
    },
    concepts: {
      en: 'Condition-controlled pretest loops, sentinel values (\'quit\'), state flags, modulo operator %, nested data structures (lists of dicts).',
      es: 'Bucles de prueba previa, centinelas (\'quit\'), banderas de estado, operador módulo %, estructuras anidadas (listas de diccionarios).'
    },
    analogy: {
      en: 'Airport boarding gate ticket scanner; grocery register belt computing running customer cart total.',
      es: 'Puerta de embarque en aeropuerto; escáner de caja registradora calculando subtotal acumulado del carrito.'
    }
  },
  {
    module: {
      en: 'Module 5.1 & 5.2: Functions & Modularity',
      es: 'Módulo 5.1 y 5.2: Funciones y Modularidad',
      source: 'Module5.1_Function1 & 5.2_Function2.ipynb'
    },
    gaddis: {
      en: 'Chapter 5 (Sections 5.1, 5.2, 5.5, 5.7, 5.8)',
      es: 'Capítulo 5 (Secciones 5.1, 5.2, 5.5, 5.7, 5.8)'
    },
    concepts: {
      en: 'def keyword, parameters vs arguments, return vs print, caller stack frames, protecting lists with slices, *args and **kwargs.',
      es: 'Palabra clave def, parámetros vs argumentos, return vs print, marcos de pila, protección de listas con rebanadas, *args y **kwargs.'
    },
    analogy: {
      en: 'Tax accountant returning an official refund check; photocopying spiral notebook pages before sharing with classmates.',
      es: 'Contador entregando cheque de reembolso oficial; fotocopiar cuaderno en espiral antes de prestarlo a compañeros.'
    }
  },
  {
    module: {
      en: 'Extended Track: File I/O, OOP, Exceptions & SQL',
      es: 'Pista Extendida: Archivos, POO, Excepciones y SQL',
      source: 'Extended Engineering Track'
    },
    gaddis: {
      en: 'Chapters 6, 10, 11, 14',
      es: 'Capítulos 6, 10, 11, 14'
    },
    concepts: {
      en: 'Context managers (with open), exception handling (try-except-finally), class encapsulation, parameterized queries preventing SQL injection.',
      es: 'Gestores de contexto (with open), manejo de excepciones (try-except-finally), encapsulación en clases, consultas parametrizadas contra inyección SQL.'
    },
    analogy: {
      en: 'Legally binding lease agreement (with); building emergency sprinkler system; architectural blueprint vs physical house.',
      es: 'Contrato legal de arrendamiento (with); sistema de rociadores de emergencia; plano arquitectónico vs casa construida.'
    }
  }
];

export function WhitePaperModal({ isOpen, onClose, t, lang = 'en', onToggleLang }) {
  const [activeTab, setActiveTab] = useState('all');
  const [copied, setCopied] = useState(false);
  const [modalLang, setModalLang] = useState(lang);

  // Sync internal modal language with prop whenever modal opens or parent lang changes
  useEffect(() => {
    setModalLang(lang);
  }, [lang, isOpen]);

  if (!isOpen) return null;

  const currentLang = modalLang || lang || 'en';
  const isEs = currentLang === 'es';

  const handleLangChange = (targetLang) => {
    setModalLang(targetLang);
    if (onToggleLang) {
      onToggleLang(targetLang);
    }
  };

  const handleCopySummary = () => {
    const text = isEs ? `P101 Documento Blanco: Teoría Académica
Conectando los cuadernos de la Prof. Jade Cao (CCCC) con el libro de Tony Gaddis "Starting Out with Python" (6.ª Ed.)
Documento Completo: https://github.com/Reign3418/P101/blob/main/WHITE_PAPER.md

1. Motor Pedagógico: Teoría de Carga Cognitiva (Sweller) + Modelo Concreto-Representacional-Abstracto (CRA) + Práctica de Recuperación Activa.
2. Divulgación Progresiva en 3 Niveles: El "Porqué" Funcional -> Analogía Física y Trazado de RAM -> Mecánicas de CPython.
3. Arquitectura Sin Telemetría: 100% WebAssembly en el navegador (Pyodide v0.26.2). Cero bases de datos, cero telemetría, cumplimiento total con FERPA.
4. Equidad Multilingüe: Paridad del 100% en inglés y español con narración nativa mediante la API Web Speech.`
    : `P101 Academic Theory White Paper
Bridging Prof. Jade Cao (CCCC) Lecture Notebooks with Tony Gaddis "Starting Out with Python" (6th Ed.)
Full Paper: https://github.com/Reign3418/P101/blob/main/WHITE_PAPER.md

1. Pedagogical Engine: Cognitive Load Theory (Sweller) + Concrete-Representational-Abstract (CRA) Framework + Active Retrieval Practice.
2. Three-Tier Progressive Disclosure: Core Functional Why -> Physical Analogy & Step-by-Step RAM Trace -> CPython Internals.
3. Zero-Telemetry Architecture: 100% Client-Side WebAssembly (Pyodide v0.26.2). Zero database, zero telemetry, full FERPA compliance.
4. Multilingual Equity: 100% English & Spanish parity with native browser Web Speech API narration.`;

    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-3 sm:p-6 animate-in fade-in duration-200">
      <div className="bg-slate-900 border border-slate-700 rounded-2xl max-w-4xl w-full h-[90vh] flex flex-col shadow-2xl overflow-hidden">
        
        {/* Modal Header */}
        <div className="p-4 sm:p-5 border-b border-slate-800 bg-slate-950/80 flex flex-wrap items-center justify-between gap-3 shrink-0">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-blue-600/20 border border-blue-500/40 flex items-center justify-center text-blue-400 shrink-0">
              <GraduationCap className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-base sm:text-lg font-extrabold text-white tracking-wide">
                  {isEs ? 'Documento Blanco: Teoría Académica de P101' : 'P101 Academic & Technical Theory White Paper'}
                </h2>
                <span className="hidden md:inline-block px-2 py-0.5 rounded text-[10px] font-mono font-bold bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 uppercase">
                  {isEs ? 'Sin Telemetría • 100% Abierto' : 'Zero Telemetry • 100% Open'}
                </span>
              </div>
              <p className="text-xs text-slate-400">
                {isEs 
                  ? 'Para la Prof. Jade Cao (CCCC) y comités de evaluación curricular'
                  : 'Authored for Prof. Jade Cao (CCCC) & Faculty Curriculum Evaluators'}
              </p>
            </div>
          </div>

          {/* Right Action Controls: Dedicated Language Switcher + Copy + GitHub + Close */}
          <div className="flex items-center gap-2 flex-wrap">
            {/* Modal Language Choice Selector */}
            <div className="flex items-center bg-slate-950 border border-slate-700/80 rounded-lg p-0.5 text-xs font-mono font-bold shadow-inner">
              <button
                onClick={() => handleLangChange('en')}
                title="Read White Paper in English"
                className={`px-2.5 py-1 rounded-md transition-all flex items-center gap-1.5 text-xs ${
                  !isEs
                    ? 'bg-blue-600 text-white shadow font-extrabold'
                    : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                <span>🇺🇸</span> <span>English</span>
              </button>
              <button
                onClick={() => handleLangChange('es')}
                title="Leer Documento Blanco en Español"
                className={`px-2.5 py-1 rounded-md transition-all flex items-center gap-1.5 text-xs ${
                  isEs
                    ? 'bg-blue-600 text-white shadow font-extrabold'
                    : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                <span>🇪🇸</span> <span>Español</span>
              </button>
            </div>

            <button
              onClick={handleCopySummary}
              className="text-xs px-2.5 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 border border-slate-700 transition-colors flex items-center gap-1.5 font-medium"
              title={isEs ? "Copiar resumen del Documento Blanco al portapapeles" : "Copy White Paper Summary to clipboard"}
            >
              {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
              <span className="hidden sm:inline">{copied ? (isEs ? '¡Copiado!' : 'Copied!') : (isEs ? 'Copiar Resumen' : 'Copy Summary')}</span>
            </button>

            <a
              href="https://github.com/Reign3418/P101/blob/main/WHITE_PAPER.md"
              target="_blank"
              rel="noopener noreferrer"
              className="text-xs px-2.5 py-1.5 rounded-lg bg-blue-600/20 hover:bg-blue-600/30 text-blue-300 border border-blue-500/30 transition-colors flex items-center gap-1.5 font-medium"
              title={isEs ? "Ver código y documento completo en GitHub" : "Open full WHITE_PAPER.md on GitHub"}
            >
              <ExternalLink className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">{isEs ? 'Fuente GitHub' : 'GitHub Source'}</span>
            </a>

            <button
              onClick={onClose}
              className="text-slate-400 hover:text-white w-8 h-8 rounded-lg hover:bg-slate-800 flex items-center justify-center transition-colors text-lg ml-1"
              title={isEs ? "Cerrar" : "Close"}
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Quick-Jump Section Navigation */}
        <div className="px-4 py-2 border-b border-slate-800/80 bg-slate-950/40 flex items-center gap-1.5 overflow-x-auto custom-scroll text-xs shrink-0">
          <button
            onClick={() => setActiveTab('all')}
            className={`px-3 py-1 rounded-lg transition-all font-medium whitespace-nowrap ${
              activeTab === 'all' ? 'bg-blue-600 text-white font-bold' : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            {isEs ? 'Ver Todo' : 'Full White Paper'}
          </button>
          <button
            onClick={() => setActiveTab('pedagogy')}
            className={`px-3 py-1 rounded-lg transition-all font-medium whitespace-nowrap ${
              activeTab === 'pedagogy' ? 'bg-blue-600 text-white font-bold' : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            {isEs ? '1. Teoría Pedagógica' : '1. Pedagogical Theory'}
          </button>
          <button
            onClick={() => setActiveTab('curriculum')}
            className={`px-3 py-1 rounded-lg transition-all font-medium whitespace-nowrap ${
              activeTab === 'curriculum' ? 'bg-blue-600 text-white font-bold' : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            {isEs ? '2. Síntesis Curricular (Prof. Cao + Gaddis)' : '2. Curriculum Synthesis'}
          </button>
          <button
            onClick={() => setActiveTab('architecture')}
            className={`px-3 py-1 rounded-lg transition-all font-medium whitespace-nowrap ${
              activeTab === 'architecture' ? 'bg-blue-600 text-white font-bold' : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            {isEs ? '3. Arquitectura y Privacidad' : '3. Systems & Privacy'}
          </button>
          <button
            onClick={() => setActiveTab('udl')}
            className={`px-3 py-1 rounded-lg transition-all font-medium whitespace-nowrap ${
              activeTab === 'udl' ? 'bg-blue-600 text-white font-bold' : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            {isEs ? '4. Equidad Bilingüe (UDL)' : '4. Multilingual Equity'}
          </button>
          <button
            onClick={() => setActiveTab('audit')}
            className={`px-3 py-1 rounded-lg transition-all font-medium whitespace-nowrap ${
              activeTab === 'audit' ? 'bg-blue-600 text-white font-bold' : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            {isEs ? '5. Guía de Auditoría para Profesores' : '5. Faculty Audit Guide'}
          </button>
        </div>

        {/* Scrollable White Paper Content Body */}
        <div className="flex-1 overflow-y-auto custom-scroll p-4 sm:p-8 space-y-8 text-slate-300 text-xs sm:text-sm leading-relaxed">
          
          {/* Paper Title & Abstract Banner */}
          {(activeTab === 'all' || activeTab === 'pedagogy') && (
            <section className="space-y-4">
              <div className="p-4 sm:p-6 rounded-2xl bg-gradient-to-br from-blue-950/50 via-slate-900 to-indigo-950/40 border border-blue-500/30 space-y-3">
                <div className="flex items-center gap-2 text-blue-400 text-xs font-bold uppercase tracking-wider">
                  <Sparkles className="w-4 h-4" />
                  <span>{isEs ? 'Resumen Ejecutivo' : 'Executive Abstract'}</span>
                </div>
                <h3 className="text-base sm:text-xl font-extrabold text-white leading-snug">
                  {isEs 
                    ? 'P101: Optimización de Carga Cognitiva, Andamiaje Concreto-Representacional-Abstracto y Arquitectura Sin Telemetría para Estudiantes de Python'
                    : 'P101: Cognitive Load Optimization, Concrete-Representational-Abstract Scaffolding, and Zero-Telemetry Client-Side Architecture for Novice Python Programmers'}
                </h3>
                <p className="text-slate-300 text-xs sm:text-sm leading-relaxed">
                  {isEs
                    ? 'Los cursos introductorios de informática (CS1) enfrentan altas tasas de fricción cognitiva. Los estudiantes adultos, quienes cambian de carrera y los veteranos militares que regresan al aula a menudo no fallan por falta de aptitud, sino por sobrecarga de herramientas complejas (terminales, entornos virtuales) y falta de modelos mentales físicos sobre la memoria RAM. P101 sintetiza los 9 cuadernos de clase de la Prof. Jade Cao en Central Carolina Community College (CCCC) con el libro de texto de Tony Gaddis (Starting Out with Python, 6.ª Ed.), ejecutando Python 3.12 directamente en el navegador con 0 telemetría y 0 almacenamiento remoto.'
                    : 'Introductory computer science (CS1) courses face notoriously high attrition and cognitive friction. Adult learners, career switchers, and military veterans transitioning to civilian engineering frequently struggle not with logical aptitude, but with syntactic overload, ambiguous mental models of computer memory (RAM), and extraneous tooling friction. P101 bridges Prof. Jade Cao’s 9 classroom lecture notebooks at Central Carolina Community College (CCCC) with Tony Gaddis’s Starting Out with Python (6th Edition) textbook, running Python 3.12 entirely in the browser with zero telemetry and zero server data retention.'}
                </p>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 pt-2 text-[11px] font-mono">
                  <div className="p-2 rounded-lg bg-slate-950/60 border border-slate-800 text-center">
                    <span className="text-slate-400 block text-[10px]">{isEs ? 'Ejecución' : 'Runtime'}</span>
                    <span className="text-emerald-400 font-bold">WebAssembly (Pyodide)</span>
                  </div>
                  <div className="p-2 rounded-lg bg-slate-950/60 border border-slate-800 text-center">
                    <span className="text-slate-400 block text-[10px]">{isEs ? 'Telemetría' : 'Telemetry'}</span>
                    <span className="text-emerald-400 font-bold">{isEs ? '0% (Cero Rastreadores)' : '0% (Zero Trackers)'}</span>
                  </div>
                  <div className="p-2 rounded-lg bg-slate-950/60 border border-slate-800 text-center">
                    <span className="text-slate-400 block text-[10px]">{isEs ? 'Privacidad' : 'Compliance'}</span>
                    <span className="text-blue-400 font-bold">{isEs ? 'Cumple con FERPA' : 'FERPA Compliant'}</span>
                  </div>
                  <div className="p-2 rounded-lg bg-slate-950/60 border border-slate-800 text-center">
                    <span className="text-slate-400 block text-[10px]">{isEs ? 'Idiomas' : 'Language'}</span>
                    <span className="text-purple-400 font-bold">{isEs ? '100% Paridad EN / ES' : '100% EN & ES Parity'}</span>
                  </div>
                </div>
              </div>
            </section>
          )}

          {/* Section 1: Pedagogical Framework */}
          {(activeTab === 'all' || activeTab === 'pedagogy') && (
            <section className="space-y-4 pt-2">
              <div className="flex items-center gap-2 border-b border-slate-800 pb-2">
                <BookOpen className="w-5 h-5 text-amber-400" />
                <h3 className="text-sm sm:text-base font-bold text-white uppercase tracking-wider">
                  {isEs ? '1. Fundamentos Pedagógicos y Ciencias del Aprendizaje' : '1. Pedagogical Theory & Learning Sciences'}
                </h3>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-3.5">
                {/* Pillar 1: Cognitive Load Theory */}
                <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-2">
                  <div className="text-amber-400 font-bold text-xs flex items-center gap-1.5">
                    <span>🧠</span>
                    <span>{isEs ? 'Teoría de Carga Cognitiva' : 'Cognitive Load Theory (Sweller)'}</span>
                  </div>
                  <p className="text-xs text-slate-300 leading-relaxed">
                    {isEs
                      ? 'La memoria de trabajo humana solo procesa 4 elementos nuevos a la vez. P101 reduce la Carga Extraña a cero (sin instalaciones ni terminales) y optimiza la Carga Germana mediante divulgación progresiva en 3 niveles.'
                      : 'Working memory processes only 4 items simultaneously. P101 reduces Extraneous Load to zero (zero installation, zero terminal setup) and maximizes Germane Load through three-tier progressive disclosure.'}
                  </p>
                </div>

                {/* Pillar 2: CRA Model */}
                <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-2">
                  <div className="text-blue-400 font-bold text-xs flex items-center gap-1.5">
                    <span>🧱</span>
                    <span>{isEs ? 'Modelo Concreto-Representacional' : 'CRA Instructional Model (Bruner)'}</span>
                  </div>
                  <p className="text-xs text-slate-300 leading-relaxed">
                    {isEs
                      ? 'Nunca se muestra sintaxis abstracta sin antes anclarla en un modelo físico del mundo real (vagones de tren, tickets de guardarropa) seguido del diagrama paso a paso de punteros en la memoria RAM.'
                      : 'Students never encounter abstract code before grounding in a physical real-world model (train cars, coat check tickets) followed by explicit step-by-step RAM memory pointer traces.'}
                  </p>
                </div>

                {/* Pillar 3: Active Retrieval Practice */}
                <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-2">
                  <div className="text-emerald-400 font-bold text-xs flex items-center gap-1.5">
                    <span>⚡</span>
                    <span>{isEs ? 'Práctica de Recuperación Activa' : 'Retrieval Practice (Roediger)'}</span>
                  </div>
                  <p className="text-xs text-slate-300 leading-relaxed">
                    {isEs
                      ? 'La lectura pasiva genera una falsa "ilusión de dominio". El generador CodingRepLab muta los parámetros de los problemas aleatoriamente para obligar a reconstruir el esquema mental y evitar la memorización mecánica.'
                      : 'Passive reading creates an "illusion of competence". The CodingRepLab generator randomizes problem parameters dynamically, forcing structural schema retrieval over rote memorization.'}
                  </p>
                </div>
              </div>

              {/* The Three-Tier Progressive Disclosure Model Visual */}
              <div className="p-4 rounded-xl bg-slate-950/80 border border-slate-800 space-y-3">
                <span className="text-[11px] font-mono font-bold uppercase tracking-wider text-amber-400 block">
                  {isEs ? 'Modelo de Divulgación Progresiva en 3 Capas:' : 'The 3-Tier Progressive Disclosure Architecture:'}
                </span>
                <div className="space-y-2 font-mono text-xs">
                  <div className="p-2.5 rounded-lg bg-slate-900 border border-amber-500/30 flex items-start gap-3">
                    <span className="px-2 py-0.5 rounded bg-amber-500/20 text-amber-300 font-bold text-[10px] shrink-0 mt-0.5">
                      {isEs ? 'NIVEL 0' : 'TIER 0'}
                    </span>
                    <div>
                      <span className="text-amber-200 font-bold">{isEs ? 'El "Porqué" Funcional y Mecánicas Clave' : 'The Core Functional "Why" & Mechanics'}</span>
                      <p className="text-slate-400 text-[11px] font-sans mt-0.5">
                        {isEs ? '¿Por qué los ingenieros necesitan esta herramienta? Código de referencia en Python con ejecución interactiva en vivo.' : 'Why software engineers need this tool. Clean PEP 8 code snippet with live "▶ Run Snippet" execution.'}
                      </p>
                    </div>
                  </div>

                  <div className="p-2.5 rounded-lg bg-slate-900 border border-blue-500/30 flex items-start gap-3">
                    <span className="px-2 py-0.5 rounded bg-blue-500/20 text-blue-300 font-bold text-[10px] shrink-0 mt-0.5">
                      {isEs ? 'NIVEL 1' : 'TIER 1'}
                    </span>
                    <div>
                      <span className="text-blue-200 font-bold">{isEs ? '🤔 "No Entiendo" — Modelo Concreto y Libro de Gaddis' : '🤔 "I Don\'t Understand" — Concrete CRA & Gaddis Textbook Bridge'}</span>
                      <p className="text-slate-400 text-[11px] font-sans mt-0.5">
                        {isEs ? 'Analogía del mundo real, secuencia de punteros en memoria RAM paso a paso, cita exacta del capítulo y sección de Gaddis y narración de audio.' : 'Physical analogy, 3-step RAM allocation sequence, exact Tony Gaddis chapter/section citation, and read-aloud voice narration.'}
                      </p>
                    </div>
                  </div>

                  <div className="p-2.5 rounded-lg bg-slate-900 border border-indigo-500/30 flex items-start gap-3">
                    <span className="px-2 py-0.5 rounded bg-indigo-500/20 text-indigo-300 font-bold text-[10px] shrink-0 mt-0.5">
                      {isEs ? 'NIVEL 2' : 'TIER 2'}
                    </span>
                    <div>
                      <span className="text-indigo-200 font-bold">{isEs ? '🚀 "Profundizar Más" — Mecánicas del Motor CPython' : '🚀 "Keep Going" — CPython Engine Mechanics & Best Practices'}</span>
                      <p className="text-slate-400 text-[11px] font-sans mt-0.5">
                        {isEs ? 'Estructuras internas de CPython: caché de enteros pequeños (-5 a 256), algoritmo Timsort O(n log n), tablas hash O(1), marcos de pila y cláusulas de guarda.' : 'CPython internals: small integer interning (-5 to 256), Timsort O(n log n), hash table O(1) resolution, call stack frames, and enterprise guard clauses.'}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </section>
          )}

          {/* Section 2: Curriculum Synthesis */}
          {(activeTab === 'all' || activeTab === 'curriculum') && (
            <section className="space-y-4 pt-2">
              <div className="flex items-center gap-2 border-b border-slate-800 pb-2">
                <Layers className="w-5 h-5 text-blue-400" />
                <h3 className="text-sm sm:text-base font-bold text-white uppercase tracking-wider">
                  {isEs ? '2. Síntesis Curricular: Cuadernos de la Prof. Cao y Libro de Gaddis' : '2. Curriculum Synthesis: Prof. Cao\'s Notebooks & Tony Gaddis'}
                </h3>
              </div>

              <p className="text-xs text-slate-300 leading-relaxed">
                {isEs
                  ? 'La estructura de P101 fusiona deliberadamente la secuencia pedagógica de la Prof. Jade Cao con el rigor del libro Starting Out with Python (6.ª Edición). La profesora Cao introduce Listas tempranamente (Módulo 2.1) antes de estructuras de decisión complejas para que los alumnos puedan almacenar colecciones de datos de inmediato. A continuación, introduce Diccionarios (Módulo 3.2) para dar etiquetas semánticas a los datos, culminando en los talleres de Bucles While con acumuladores integrados.'
                  : 'P101 deliberately synthesizes Prof. Jade Cao’s classroom sequencing with Tony Gaddis\'s Starting Out with Python (6th Ed.). Prof. Cao introduces Lists early (Module 2.1) before conditionals so students immediately learn to manage collections. Dictionaries are introduced in Module 3.2 to teach labeled records, culminating in While Loop workshops that integrate lists of dictionaries with running accumulators.'}
              </p>

              {/* Fully Localized Module Mapping Table */}
              <div className="overflow-x-auto rounded-xl border border-slate-800 bg-slate-950">
                <table className="w-full text-left text-xs">
                  <thead className="bg-slate-900 text-slate-300 font-mono text-[11px] border-b border-slate-800">
                    <tr>
                      <th className="p-3 whitespace-nowrap">{isEs ? 'Módulo y Fuente (Prof. Cao)' : 'Module & Prof. Source'}</th>
                      <th className="p-3 whitespace-nowrap">{isEs ? 'Libro de Gaddis (6.ª Ed.)' : 'Gaddis 6th Ed. Mapping'}</th>
                      <th className="p-3">{isEs ? 'Conceptos Clave Dominados' : 'Key Concepts Mastered'}</th>
                      <th className="p-3">{isEs ? 'Analogía Física Mental' : 'Physical Real-World Analogy'}</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-800/80 text-[11px]">
                    {CURRICULUM_SYNTHESIS_DATA.map((row, idx) => (
                      <tr key={idx} className="hover:bg-slate-900/40 transition-colors">
                        <td className="p-3 font-semibold text-white whitespace-nowrap align-top">
                          <div>{isEs ? row.module.es : row.module.en}</div>
                          <div className="text-[10px] font-mono text-slate-500 mt-0.5">{row.module.source}</div>
                        </td>
                        <td className="p-3 font-mono text-blue-400 whitespace-nowrap align-top">
                          {isEs ? row.gaddis.es : row.gaddis.en}
                        </td>
                        <td className="p-3 text-slate-300 align-top leading-relaxed">
                          {isEs ? row.concepts.es : row.concepts.en}
                        </td>
                        <td className="p-3 text-amber-300/90 align-top leading-relaxed">
                          {isEs ? row.analogy.es : row.analogy.en}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </section>
          )}

          {/* Section 3: Architecture & Security */}
          {(activeTab === 'all' || activeTab === 'architecture') && (
            <section className="space-y-4 pt-2">
              <div className="flex items-center gap-2 border-b border-slate-800 pb-2">
                <ShieldCheck className="w-5 h-5 text-emerald-400" />
                <h3 className="text-sm sm:text-base font-bold text-white uppercase tracking-wider">
                  {isEs ? '3. Arquitectura de Sistemas y Privacidad: "Nada Oculto"' : '3. Systems Architecture: "Nothing Hidden"'}
                </h3>
              </div>

              <div className="p-4 rounded-xl bg-emerald-500/10 border border-emerald-500/30 space-y-2">
                <div className="flex items-center gap-2 text-emerald-400 font-bold text-xs">
                  <Lock className="w-4 h-4" />
                  <span>{isEs ? 'Garantía Estricta de Cero Telemetría y Cero Retención' : 'Strict Zero-Telemetry & Zero-Retention Guarantee'}</span>
                </div>
                <p className="text-xs text-slate-200 leading-relaxed">
                  {isEs
                    ? 'P101 opera enteramente como una aplicación estática alojada en GitHub Pages. No existe ningún servidor web intermedio, ninguna base de datos SQL en la nube y ningún servicio de seguimiento que capture pulsaciones, código o errores de los estudiantes. El 100% de la ejecución de Python ocurre dentro del motor WebAssembly (Pyodide v0.26.2) en la memoria RAM del propio navegador del usuario.'
                    : 'P101 operates entirely as a static single-page application delivered over GitHub Pages CDN. There is zero intermediary application server, zero cloud SQL database, and zero telemetry service intercepting student keystrokes, code submissions, or errors. 100% of Python code execution occurs within the WebAssembly (Pyodide v0.26.2) sandbox in the user’s local browser RAM.'}
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 text-xs">
                <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-2">
                  <span className="font-bold text-blue-400 flex items-center gap-1.5">
                    <ShieldCheck className="w-4 h-4" />
                    <span>{isEs ? 'Cumplimiento Institucional con FERPA' : 'FERPA Institutional Compliance'}</span>
                  </span>
                  <p className="text-slate-300 leading-relaxed">
                    {isEs
                      ? 'Bajo la ley FERPA, los registros y el rendimiento académico de los estudiantes deben ser protegidos. Al ejecutar el código localmente, ninguna tarea o calificación sale del dispositivo del estudiante.'
                      : 'Under the Family Educational Rights and Privacy Act (FERPA), student performance metrics and educational records must be protected. By executing locally, zero student code or mistakes are transmitted to third-party clouds.'}
                  </p>
                </div>

                <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-2">
                  <span className="font-bold text-purple-400 flex items-center gap-1.5">
                    <Cpu className="w-4 h-4" />
                    <span>{isEs ? 'Ejecución de Cuadernos BYOD en RAM' : 'BYOD Notebook Client Execution'}</span>
                  </span>
                  <p className="text-slate-300 leading-relaxed">
                    {isEs
                      ? 'Los cuadernos de clase (.ipynb) de la profesora se analizan en memoria mediante la API FileReader de HTML5. Ningún archivo con derechos de autor se sube a servidores públicos ni a la nube.'
                      : 'Classroom notebooks (.ipynb) are parsed in client RAM via the HTML5 FileReader API. Proprietary instructor course materials are never uploaded or committed to public cloud repositories.'}
                  </p>
                </div>
              </div>
            </section>
          )}

          {/* Section 4: Universal Design & Multilingual */}
          {(activeTab === 'all' || activeTab === 'udl') && (
            <section className="space-y-4 pt-2">
              <div className="flex items-center gap-2 border-b border-slate-800 pb-2">
                <Globe className="w-5 h-5 text-purple-400" />
                <h3 className="text-sm sm:text-base font-bold text-white uppercase tracking-wider">
                  {isEs ? '4. Diseño Universal para el Aprendizaje (UDL) y Equidad Bilingüe' : '4. Universal Design for Learning (UDL) & Multilingual Parity'}
                </h3>
              </div>

              <div className="p-4 rounded-xl bg-purple-500/10 border border-purple-500/30 space-y-2">
                <span className="text-purple-300 font-bold text-xs block">
                  {isEs ? 'Paridad Bilingüe 100% (Inglés y Español)' : '100% Bilingual Academic Parity (English & Spanish)'}
                </span>
                <p className="text-xs text-slate-200 leading-relaxed">
                  {isEs
                    ? 'El portal no utiliza traducción automática superficial. Cada título, concepto, analogía, trampa común, pregunta de examen y ejercicio interactivo fue traducido con precisión terminológica en español técnico. Permite a estudiantes hispanohablantes aprender conceptos computacionales complejos sin que la barrera del idioma opaque la lógica del software.'
                    : 'The portal avoids shallow machine translation. Every title, concept, physical analogy, common trap, quiz checkpoint, and interactive drill was tailored with rigorous Spanish technical terminology. This enables ESL students at community colleges to grasp computational abstractions without language barriers masking computational logic.'}
                </p>
              </div>

              <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-2">
                <span className="text-slate-300 font-bold text-xs block">
                  {isEs ? 'Narración por Voz Mediante la API W3C Web Speech' : 'Auditory Dual-Coding via W3C Web Speech API'}
                </span>
                <p className="text-xs text-slate-400 leading-relaxed">
                  {isEs
                    ? 'La teoría del doble canal (Paivio) demuestra que la información recibida simultáneamente por canales visuales y auditivos se retiene con mayor firmeza. P101 utiliza las voces nativas del sistema operativo (Google TTS, Microsoft Neural) sin incurrir en costos de servicios de voz en la nube ni recopilar grabaciones de audio.'
                    : 'Dual-coding theory (Paivio) confirms that information processed simultaneously through visual and auditory channels is retained with significantly higher fidelity. P101 utilizes native OS speech synthesis (Google TTS, Microsoft Neural) with zero cloud voice API subscriptions and zero voice scraping.'}
                </p>
              </div>
            </section>
          )}

          {/* Section 5: Faculty Audit Guide */}
          {(activeTab === 'all' || activeTab === 'audit') && (
            <section className="space-y-4 pt-2">
              <div className="flex items-center gap-2 border-b border-slate-800 pb-2">
                <Cpu className="w-5 h-5 text-teal-400" />
                <h3 className="text-sm sm:text-base font-bold text-white uppercase tracking-wider">
                  {isEs ? '5. Guía de Auditoría e Inspección para Profesores' : '5. Faculty Verification & Audit Guide'}
                </h3>
              </div>

              <p className="text-xs text-slate-300 leading-relaxed">
                {isEs
                  ? 'La profesora Jade Cao y los evaluadores curriculares pueden verificar de forma independiente la transparencia de P101 en menos de 2 minutos utilizando las herramientas de desarrollo de cualquier navegador:'
                  : 'Prof. Jade Cao and academic evaluation committees can independently verify P101\'s claims in under two minutes using standard browser developer tools:'}
              </p>

              <div className="space-y-2 font-mono text-xs">
                <div className="p-3 rounded-xl bg-slate-950 border border-slate-800 space-y-1">
                  <span className="text-teal-300 font-bold">{isEs ? 'Paso 1: Verificación de Cero Red (Network Tab)' : 'Step 1: Verify Zero Network Telemetry (Network Tab)'}</span>
                  <p className="text-slate-400 font-sans text-[11px]">
                    {isEs
                      ? 'Abra las Herramientas de Desarrollador (F12) -> Pestaña Red (Network). Haga clic en "▶ Run Snippet" o resuelva un ejercicio en el Rep Lab. Observará que NO se envía ninguna solicitud de red. El código corre en WebAssembly local.'
                      : 'Open Developer Tools (F12) -> Network tab. Click "▶ Run Snippet" or solve a drill in the Rep Lab. You will observe that ZERO HTTP requests are dispatched during execution. Code runs strictly in local WebAssembly.'}
                  </p>
                </div>

                <div className="p-3 rounded-xl bg-slate-950 border border-slate-800 space-y-1">
                  <span className="text-teal-300 font-bold">{isEs ? 'Paso 2: Inspección de Almacenamiento Local (Application Tab)' : 'Step 2: Inspect Local Storage (Application Tab)'}</span>
                  <p className="text-slate-400 font-sans text-[11px]">
                    {isEs
                      ? 'En F12 -> Aplicación (Application) -> Almacenamiento Local (Local Storage). Verifique que solo existen claves de preferencia de interfaz (p101_lang, py_completed_sections). Ningún dato personal ni código privado se almacena.'
                      : 'Navigate to F12 -> Application -> Local Storage. Verify that only client interface state keys exist (p101_lang, py_completed_sections, py_review_queue). Zero student PII or proprietary notebook data is retained.'}
                  </p>
                </div>

                <div className="p-3 rounded-xl bg-slate-950 border border-slate-800 space-y-1">
                  <span className="text-teal-300 font-bold">{isEs ? 'Paso 3: Auditoría del Código Fuente Abierto en GitHub' : 'Step 3: Audit Full Open-Source Codebase on GitHub'}</span>
                  <p className="text-slate-400 font-sans text-[11px]">
                    {isEs
                      ? 'Todo el código fuente de la plataforma, el archivo WHITE_PAPER.md y el historial de cambios se encuentran disponibles de manera 100% pública en: https://github.com/Reign3418/P101'
                      : 'All platform source code, the WHITE_PAPER.md documentation, and git commit history are 100% publicly auditable at: https://github.com/Reign3418/P101'}
                  </p>
                </div>
              </div>
            </section>
          )}

          {/* Footer Signoff */}
          <div className="p-4 rounded-xl bg-slate-950/60 border border-slate-800 text-center space-y-1 pt-4 text-xs text-slate-400">
            <p className="text-slate-200 font-bold">
              {isEs ? 'P101: Plataforma Abierta de Maestría en Programación Python' : 'P101: Open Mastery Platform for Python Programming'}
            </p>
            <p>
              {isEs 
                ? 'Proyecto de Estudiante de Central Carolina Community College (CCCC) • Prof. Jade Cao' 
                : 'Central Carolina Community College (CCCC) Student Project • Prof. Jade Cao'}
            </p>
          </div>

        </div>

      </div>
    </div>
  );
}
