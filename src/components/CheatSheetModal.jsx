import React, { useState, useMemo } from 'react';
import { CHEAT_SHEETS_DATA } from '../data/cheatSheetsData.js';

export function CheatSheetModal({
  isOpen,
  onClose,
  t,
  lang = 'en',
  onExecuteCode,
  pyodideReady = false
}) {
  const [activeTab, setActiveTab] = useState('numpy'); // 'numpy', 'matplotlib', 'scipy'
  const [viewMode, setViewMode] = useState('drills'); // 'drills' | 'pdf'
  const [searchQuery, setSearchQuery] = useState('');
  const [copiedId, setCopiedId] = useState(null);
  const [executingId, setExecutingId] = useState(null);
  const [outputs, setOutputs] = useState({});
  const [copiedCitation, setCopiedCitation] = useState(false);

  // Sarah Cox formal citation string
  const sarahCitation = "Cox, Sarah. Data Science Reference Sheets (NumPy, Matplotlib, SciPy Linear Algebra). Shared in CCCC Python class, distributed by Prof. Jade Cao.";

  const handleCopyCitation = () => {
    navigator.clipboard.writeText(sarahCitation);
    setCopiedCitation(true);
    setTimeout(() => setCopiedCitation(false), 2000);
  };

  const handleCopyCode = (id, code) => {
    navigator.clipboard.writeText(code);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 1800);
  };

  const handleRunCode = async (id, code) => {
    if (!onExecuteCode) return;
    setExecutingId(id);
    try {
      const res = await onExecuteCode(code);
      setOutputs(prev => ({
        ...prev,
        [id]: {
          success: res.success,
          stdout: res.stdout || (res.success ? "(Executed with no stdout output)" : ""),
          error: res.error ? (res.error.summary || res.error.details || String(res.error)) : null,
          elapsed: res.elapsed
        }
      }));
    } catch (err) {
      setOutputs(prev => ({
        ...prev,
        [id]: {
          success: false,
          error: err.message || String(err)
        }
      }));
    } finally {
      setExecutingId(null);
    }
  };

  // Filter items based on active tab and search query
  const filteredData = useMemo(() => {
    const q = searchQuery.trim().toLowerCase();
    
    // If there is a search query, search across ALL categories
    if (q) {
      const results = [];
      Object.values(CHEAT_SHEETS_DATA).forEach(cat => {
        cat.sections.forEach(sec => {
          sec.items.forEach(item => {
            const matchesTitle = item.name.toLowerCase().includes(q);
            const matchesDesc = (item.desc_en + ' ' + item.desc_es).toLowerCase().includes(q);
            const matchesCode = item.code.toLowerCase().includes(q);
            const matchesTags = item.tags.some(tag => tag.toLowerCase().includes(q));
            const matchesSec = (sec.title_en + ' ' + sec.title_es).toLowerCase().includes(q);
            const matchesCat = (cat.name + ' ' + cat.title_en + ' ' + cat.title_es).toLowerCase().includes(q);

            if (matchesTitle || matchesDesc || matchesCode || matchesTags || matchesSec || matchesCat) {
              results.push({
                ...item,
                categoryName: cat.name,
                categoryIcon: cat.icon,
                sectionTitle: lang === 'es' ? sec.title_es : sec.title_en
              });
            }
          });
        });
      });
      return { isSearch: true, results };
    }

    // Default: return current category's sections
    const currentCat = CHEAT_SHEETS_DATA[activeTab] || CHEAT_SHEETS_DATA.numpy;
    return { isSearch: false, category: currentCat };
  }, [searchQuery, activeTab, lang]);

  if (!isOpen) return null;

  const currentCategory = CHEAT_SHEETS_DATA[activeTab] || CHEAT_SHEETS_DATA.numpy;
  const pdfUrl = `${import.meta.env.BASE_URL}cheatsheets/${currentCategory.pdfFilename}`;

  return (
    <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-2 sm:p-4">
      <div className="bg-slate-900 border border-slate-700/80 rounded-2xl max-w-5xl w-full max-h-[94vh] flex flex-col shadow-2xl overflow-hidden text-slate-200">
        
        {/* ── Top Header ── */}
        <div className="px-5 py-4 border-b border-slate-800 flex items-center justify-between bg-slate-950/70 shrink-0">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-600/30 via-indigo-600/20 to-teal-500/20 border border-blue-500/30 flex items-center justify-center text-xl shadow-inner">
              📊
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-base sm:text-lg font-bold text-white tracking-tight">
                  {lang === 'es' ? 'Kit de Referencia de Ciencia de Datos' : 'Data Science Reference Toolkit'}
                </h2>
                <span className="hidden sm:inline-block text-[10px] px-2 py-0.5 rounded-full font-mono bg-blue-500/20 text-blue-300 border border-blue-500/30 font-semibold">
                  NumPy • Matplotlib • SciPy
                </span>
              </div>
              <p className="text-[11px] text-slate-400">
                {lang === 'es' 
                  ? 'Guía interactiva, buscador de APIs, fragmentos ejecutables y visualizador de PDFs originales'
                  : 'Interactive quick-reference, searchable APIs, executable drills, and original PDF viewer'}
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="w-8 h-8 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-400 hover:text-white flex items-center justify-center text-lg transition-colors border border-slate-700"
            title={lang === 'es' ? 'Cerrar' : 'Close'}
          >
            &times;
          </button>
        </div>

        {/* ── Attribution Banner: Sarah Cox & Prof. Jade Cao ── */}
        <div className="px-5 py-2.5 bg-gradient-to-r from-emerald-950/40 via-teal-950/30 to-slate-950 border-b border-emerald-500/20 flex flex-wrap items-center justify-between gap-3 shrink-0">
          <div className="flex items-center gap-2.5 text-xs">
            <span className="text-lg">🤝</span>
            <div>
              <span className="font-semibold text-emerald-300">
                {lang === 'es' ? 'Aporte de la Clase:' : 'Classroom Share & Peer Citation:'}{' '}
              </span>
              <span className="text-slate-300 text-[11px]">
                {lang === 'es'
                  ? 'Hojas de referencia compartidas por la compañera '
                  : 'Reference cheat sheets shared with the class by peer contributor '}
                <strong className="text-white font-bold underline decoration-emerald-400 decoration-1 underline-offset-2">
                  Sarah Cox
                </strong>
                {lang === 'es'
                  ? ' • Distribuidas a la clase por la '
                  : ' • Distributed to the class by '}
                <strong className="text-purple-300 font-bold">
                  {lang === 'es' ? 'Prof. Jade Cao (CCCC)' : 'Prof. Jade Cao (CCCC)'}
                </strong>.
              </span>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => setViewMode('pdf')}
              className={`px-2.5 py-1 rounded-lg text-[11px] font-mono border transition-all flex items-center gap-1.5 shadow-sm ${
                viewMode === 'pdf'
                  ? 'bg-blue-600 text-white border-blue-400 font-bold'
                  : 'bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white border-slate-700'
              }`}
              title="Open full PDF viewer"
            >
              <span>📄</span>
              <span>{lang === 'es' ? 'Ver PDFs Originales' : 'View Original PDFs'}</span>
            </button>

            <button
              onClick={handleCopyCitation}
              className={`px-2.5 py-1 rounded-lg text-[11px] font-mono border transition-all flex items-center gap-1.5 shadow-sm ${
                copiedCitation
                  ? 'bg-emerald-500/25 text-emerald-200 border-emerald-500/60 font-bold'
                  : 'bg-emerald-900/30 hover:bg-emerald-900/50 text-emerald-300 border-emerald-700/50 hover:border-emerald-600'
              }`}
              title="Copy formal citation for Sarah Cox & Prof. Jade Cao"
            >
              <span>{copiedCitation ? '✓' : '📜'}</span>
              <span>{copiedCitation ? (lang === 'es' ? '¡Copiado!' : 'Copied!') : (lang === 'es' ? 'Citar a Sarah' : 'Cite Sarah Cox')}</span>
            </button>
          </div>
        </div>

        {/* ── Navigation, Mode Switcher & Search Bar ── */}
        <div className="px-5 py-3 border-b border-slate-800 bg-slate-900/90 flex flex-col md:flex-row items-center justify-between gap-3 shrink-0">
          {/* Category Tabs */}
          <div className="flex items-center gap-1.5 w-full md:w-auto overflow-x-auto custom-scroll pb-1 md:pb-0">
            {Object.values(CHEAT_SHEETS_DATA).map(cat => {
              const isActive = activeTab === cat.id;
              return (
                <button
                  key={cat.id}
                  onClick={() => {
                    setActiveTab(cat.id);
                    if (searchQuery) setSearchQuery('');
                  }}
                  className={`px-3 py-1.5 rounded-xl text-xs font-semibold flex items-center gap-2 transition-all shrink-0 border ${
                    isActive
                      ? 'bg-blue-600 text-white border-blue-400 shadow-md shadow-blue-600/30 font-bold'
                      : 'bg-slate-800 hover:bg-slate-750 text-slate-300 hover:text-white border-slate-700'
                  }`}
                >
                  <span className="text-sm">{cat.icon}</span>
                  <span>{cat.name}</span>
                  <span className={`text-[10px] px-1.5 py-0.2 rounded font-mono ${isActive ? 'bg-blue-700 text-blue-100' : 'bg-slate-900 text-slate-400'}`}>
                    {cat.pdfPages}p
                  </span>
                </button>
              );
            })}
          </div>

          {/* Right Controls: Mode Toggle (Drills vs PDF) & Search */}
          <div className="flex items-center gap-2.5 w-full md:w-auto justify-end">
            {/* View Mode Toggle */}
            <div className="flex items-center bg-slate-950 border border-slate-700 rounded-xl p-0.5 text-xs font-mono font-bold shadow-inner shrink-0">
              <button
                onClick={() => setViewMode('drills')}
                className={`px-2.5 py-1 rounded-lg transition-all flex items-center gap-1.5 text-[11px] ${
                  viewMode === 'drills'
                    ? 'bg-blue-600 text-white shadow'
                    : 'text-slate-400 hover:text-slate-200'
                }`}
                title="Interactive drills and copyable code cards"
              >
                <span>⚡</span>
                <span>{lang === 'es' ? 'Prácticas' : 'Drills'}</span>
              </button>

              <button
                onClick={() => setViewMode('pdf')}
                className={`px-2.5 py-1 rounded-lg transition-all flex items-center gap-1.5 text-[11px] ${
                  viewMode === 'pdf'
                    ? 'bg-emerald-600 text-white shadow'
                    : 'text-slate-400 hover:text-slate-200'
                }`}
                title="Full original PDF viewer and direct download"
              >
                <span>📄</span>
                <span>{lang === 'es' ? 'PDF Original' : 'Full PDF'}</span>
              </button>
            </div>

            {/* Search Input (visible during drills mode) */}
            {viewMode === 'drills' && (
              <div className="relative w-full md:w-64">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 text-xs">
                  🔍
                </span>
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder={lang === 'es' ? 'Buscar fórmulas, APIs...' : 'Search APIs, methods...'}
                  className="w-full bg-slate-950 border border-slate-700 rounded-xl pl-8 pr-8 py-1 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all font-mono"
                />
                {searchQuery && (
                  <button
                    onClick={() => setSearchQuery('')}
                    className="absolute right-2.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-white text-xs w-4 h-4 rounded-full flex items-center justify-center hover:bg-slate-800"
                  >
                    ✕
                  </button>
                )}
              </div>
            )}
          </div>
        </div>

        {/* ── Content View: PDF Viewer OR Interactive Drills ── */}
        <div className="flex-1 overflow-y-auto custom-scroll p-3 sm:p-5 space-y-5">
          
          {/* ======================================================== */}
          {/* MODE 1: ORIGINAL FULL PDF VIEWER                         */}
          {/* ======================================================== */}
          {viewMode === 'pdf' ? (
            <div className="flex flex-col h-full space-y-3">
              {/* PDF Top Bar */}
              <div className="p-3.5 rounded-2xl bg-slate-950/80 border border-slate-800 flex flex-wrap items-center justify-between gap-3 shadow-inner">
                <div className="flex items-center gap-3">
                  <span className="text-2xl">{currentCategory.icon}</span>
                  <div>
                    <h3 className="text-sm font-bold text-white flex items-center gap-2">
                      <span>{currentCategory.pdfTitle}</span>
                      <span className="text-[10px] px-2 py-0.5 rounded font-mono bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                        {currentCategory.pdfPages} {lang === 'es' ? 'Páginas' : 'Pages'}
                      </span>
                    </h3>
                    <p className="text-[11px] text-slate-400 font-mono">
                      {currentCategory.pdfFilename} • {currentCategory.pdfSize} • {lang === 'es' ? 'Archivo oficial compartido por Sarah Cox' : 'Original class share from Sarah Cox'}
                    </p>
                  </div>
                </div>

                {/* PDF Action Buttons */}
                <div className="flex items-center gap-2">
                  <a
                    href={pdfUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-3 py-1.5 rounded-xl text-xs font-mono bg-blue-600/20 hover:bg-blue-600/30 text-blue-300 border border-blue-500/40 transition-all flex items-center gap-1.5 shadow-sm font-medium"
                    title="Open PDF in a dedicated browser tab"
                  >
                    <span>↗</span>
                    <span>{lang === 'es' ? 'Abrir en Pestaña Nueva' : 'Open in New Tab'}</span>
                  </a>

                  <a
                    href={pdfUrl}
                    download={currentCategory.pdfFilename}
                    className="px-3 py-1.5 rounded-xl text-xs font-mono bg-emerald-600/20 hover:bg-emerald-600/30 text-emerald-300 border border-emerald-500/40 transition-all flex items-center gap-1.5 shadow-sm font-medium"
                    title="Download the PDF directly to your device"
                  >
                    <span>⬇</span>
                    <span>{lang === 'es' ? 'Descargar PDF' : 'Download PDF'}</span>
                  </a>

                  <button
                    onClick={() => setViewMode('drills')}
                    className="px-3 py-1.5 rounded-xl text-xs font-mono bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 transition-all flex items-center gap-1.5 shadow-sm font-medium"
                  >
                    <span>⚡</span>
                    <span>{lang === 'es' ? 'Ver Prácticas' : 'Interactive Drills'}</span>
                  </button>
                </div>
              </div>

              {/* Embedded PDF Viewer */}
              <div className="w-full h-[62vh] rounded-2xl overflow-hidden border border-slate-700/80 bg-slate-950 shadow-2xl relative">
                <iframe
                  src={`${pdfUrl}#toolbar=1&navpanes=0`}
                  className="w-full h-full border-0"
                  title={currentCategory.pdfTitle}
                />
              </div>

              <div className="text-center text-[11px] text-slate-400">
                {lang === 'es' 
                  ? '¿No se visualiza el visor de PDF integrado en tu navegador? ' 
                  : 'If the embedded PDF viewer does not render on your mobile browser, '}
                <a
                  href={pdfUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-400 underline hover:text-blue-300 font-mono"
                >
                  {lang === 'es' ? 'Haz clic aquí para abrirlo directamente' : 'click here to open it directly'}
                </a>.
              </div>
            </div>
          ) : (
            /* ======================================================== */
            /* MODE 2: INTERACTIVE CODE DRILLS & PLAYGROUND             */
            /* ======================================================== */
            <>
              {filteredData.isSearch ? (
                /* SEARCH RESULTS */
                <div className="space-y-4">
                  <div className="flex items-center justify-between text-xs text-slate-400 border-b border-slate-800 pb-2">
                    <span>
                      {lang === 'es' ? 'Resultados para' : 'Matching results for'}:{' '}
                      <strong className="text-blue-300 font-mono">"{searchQuery}"</strong>
                    </span>
                    <span className="font-mono text-slate-500">
                      {filteredData.results.length} {lang === 'es' ? 'encontrados' : 'found'}
                    </span>
                  </div>

                  {filteredData.results.length === 0 ? (
                    <div className="text-center py-12 text-slate-500 space-y-2">
                      <div className="text-3xl">🔎</div>
                      <p className="text-xs">
                        {lang === 'es' 
                          ? 'No se encontraron comandos coincidentes. Intenta con "solve", "scatter", "dot", o "array".' 
                          : 'No matching cheat sheet commands found. Try searching for "solve", "scatter", "dot", or "array".'}
                      </p>
                      <button
                        onClick={() => setSearchQuery('')}
                        className="px-3 py-1 bg-slate-800 hover:bg-slate-700 text-blue-400 rounded-lg text-xs"
                      >
                        {lang === 'es' ? 'Limpiar Búsqueda' : 'Clear Search'}
                      </button>
                    </div>
                  ) : (
                    <div className="grid grid-cols-1 gap-4">
                      {filteredData.results.map(item => renderCard(item, lang, copiedId, handleCopyCode, executingId, handleRunCode, outputs, pyodideReady))}
                    </div>
                  )}
                </div>
              ) : (
                /* CATEGORY TABBED VIEW */
                <div className="space-y-6">
                  {/* Category Header Banner with PDF Callout */}
                  <div className="p-4 rounded-2xl bg-slate-950/60 border border-slate-800 flex flex-col md:flex-row items-start md:items-center justify-between gap-3.5">
                    <div className="flex items-start gap-3.5">
                      <span className="text-3xl mt-0.5">{filteredData.category.icon}</span>
                      <div className="space-y-1">
                        <div className="flex items-center gap-2">
                          <h3 className="text-sm sm:text-base font-bold text-white">
                            {lang === 'es' ? filteredData.category.title_es : filteredData.category.title_en}
                          </h3>
                          <span className="text-[10px] px-2 py-0.5 rounded font-mono bg-blue-500/20 text-blue-300 border border-blue-500/30 font-bold">
                            {filteredData.category.badge}
                          </span>
                        </div>
                        <p className="text-xs text-slate-400 leading-relaxed">
                          {lang === 'es' ? filteredData.category.summary_es : filteredData.category.summary_en}
                        </p>
                      </div>
                    </div>

                    {/* Quick Button to open original PDF */}
                    <button
                      onClick={() => setViewMode('pdf')}
                      className="px-3.5 py-2 rounded-xl bg-gradient-to-r from-blue-600/25 to-indigo-600/25 hover:from-blue-600/35 hover:to-indigo-600/35 text-blue-200 border border-blue-500/40 text-xs font-mono font-bold flex items-center gap-2 transition-all shrink-0 shadow-md"
                      title="View the original PDF document"
                    >
                      <span className="text-sm">📄</span>
                      <span>{lang === 'es' ? 'Ver PDF Original' : 'View Original PDF'} ({filteredData.category.pdfPages}p)</span>
                      <span>→</span>
                    </button>
                  </div>

                  {/* Sections & Cards */}
                  {filteredData.category.sections.map(sec => (
                    <div key={sec.id} className="space-y-3">
                      <div className="flex items-center gap-2 border-b border-slate-800 pb-2">
                        <h4 className="text-xs font-bold uppercase tracking-wider text-slate-300">
                          {lang === 'es' ? sec.title_es : sec.title_en}
                        </h4>
                        <span className="text-[10px] font-mono text-slate-500">
                          ({sec.items.length})
                        </span>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {sec.items.map(item => renderCard(item, lang, copiedId, handleCopyCode, executingId, handleRunCode, outputs, pyodideReady))}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </>
          )}

        </div>

        {/* ── Footer ── */}
        <div className="px-5 py-3 border-t border-slate-800 bg-slate-950/80 flex items-center justify-between text-xs text-slate-400 shrink-0">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            <span className="text-[11px] hidden sm:inline">
              {lang === 'es' 
                ? 'Todos los ejercicios corren en tu navegador vía WebAssembly (Pyodide) con los 3 PDFs originales disponibles.' 
                : 'All drills run locally via Pyodide WebAssembly with all 3 original PDFs embedded.'}
            </span>
          </div>
          
          <button
            onClick={onClose}
            className="px-4 py-1.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs transition-all shadow-md shadow-blue-600/20"
          >
            {lang === 'es' ? 'Entendido ✓' : 'Done ✓'}
          </button>
        </div>

      </div>
    </div>
  );
}

/**
 * Reusable function to render an interactive reference card
 */
function renderCard(item, lang, copiedId, handleCopyCode, executingId, handleRunCode, outputs, pyodideReady) {
  const isCopied = copiedId === item.id;
  const isExecuting = executingId === item.id;
  const output = outputs[item.id];

  return (
    <div
      key={item.id}
      className="rounded-xl bg-slate-950/90 border border-slate-800 hover:border-slate-700 transition-all p-3.5 space-y-3 flex flex-col justify-between shadow-sm"
    >
      <div className="space-y-2">
        {/* Card Header */}
        <div className="flex items-start justify-between gap-2">
          <div className="space-y-0.5">
            {item.categoryName && (
              <span className="text-[10px] font-mono text-slate-500 flex items-center gap-1">
                <span>{item.categoryIcon}</span>
                <span>{item.categoryName}</span>
                <span>•</span>
                <span>{item.sectionTitle}</span>
              </span>
            )}
            <h5 className="text-xs font-bold text-white font-mono flex items-center gap-1.5">
              <span className="text-amber-400">›</span>
              {item.name}
            </h5>
          </div>

          {/* Quick tags */}
          <div className="flex flex-wrap gap-1 justify-end shrink-0 max-w-[150px]">
            {item.tags.slice(0, 3).map(tag => (
              <span
                key={tag}
                className="text-[9px] font-mono px-1.5 py-0.5 rounded bg-slate-900 text-slate-400 border border-slate-800"
              >
                #{tag}
              </span>
            ))}
          </div>
        </div>

        {/* Pedagogical Description */}
        <p className="text-[11px] text-slate-300 leading-relaxed">
          {lang === 'es' ? item.desc_es : item.desc_en}
        </p>

        {/* Code Snippet Box */}
        <div className="relative group">
          <pre className="p-2.5 rounded-lg bg-slate-900 border border-slate-800 text-[11px] font-mono text-slate-200 overflow-x-auto custom-scroll max-h-48 leading-snug">
            <code>{item.code}</code>
          </pre>
        </div>
      </div>

      {/* Card Action Controls & Pyodide Output */}
      <div className="space-y-2 pt-1 border-t border-slate-850">
        <div className="flex items-center justify-between gap-2">
          <span className="text-[10px] text-slate-500 font-mono">
            {isCopied ? (lang === 'es' ? '¡En portapapeles!' : 'In clipboard!') : 'Python 3.12'}
          </span>

          <div className="flex items-center gap-1.5">
            {/* Run Button */}
            <button
              onClick={() => handleRunCode(item.id, item.code)}
              disabled={isExecuting}
              className={`px-2.5 py-1 rounded-lg text-[10px] font-mono border transition-all flex items-center gap-1 ${
                isExecuting
                  ? 'bg-amber-500/20 text-amber-300 border-amber-500/40 animate-pulse'
                  : 'bg-emerald-600/20 hover:bg-emerald-600/30 text-emerald-300 border-emerald-500/40 hover:border-emerald-500'
              }`}
              title={pyodideReady ? "Execute snippet via Pyodide WebAssembly" : "Run in static mode or wait for Pyodide"}
            >
              <span>{isExecuting ? '⏳' : '▶'}</span>
              <span>{isExecuting ? (lang === 'es' ? 'Ejecutando...' : 'Running...') : (lang === 'es' ? 'Ejecutar' : 'Run')}</span>
            </button>

            {/* Copy Button */}
            <button
              onClick={() => handleCopyCode(item.id, item.code)}
              className={`px-2.5 py-1 rounded-lg text-[10px] font-mono border transition-all flex items-center gap-1 ${
                isCopied
                  ? 'bg-blue-600 text-white border-blue-400 font-bold'
                  : 'bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white border-slate-700'
              }`}
            >
              <span>{isCopied ? '✓' : '📋'}</span>
              <span>{isCopied ? (lang === 'es' ? 'Copiado' : 'Copied') : (lang === 'es' ? 'Copiar' : 'Copy')}</span>
            </button>
          </div>
        </div>

        {/* Execution Output Drawer */}
        {output && (
          <div className={`p-2 rounded-lg text-[10px] font-mono border transition-all space-y-1 ${
            output.success
              ? 'bg-slate-900 border-emerald-500/40 text-emerald-300'
              : 'bg-red-950/40 border-red-500/40 text-red-300'
          }`}>
            <div className="flex items-center justify-between text-[9px] text-slate-400 border-b border-slate-800/80 pb-1">
              <span>{output.success ? '✓ STDOUT Output' : '⚠ Error Output'}</span>
              {output.elapsed !== undefined && <span>⚡ {output.elapsed}ms</span>}
            </div>
            <pre className="whitespace-pre-wrap overflow-x-auto max-h-36 custom-scroll leading-tight">
              {output.success ? output.stdout : output.error}
            </pre>
          </div>
        )}
      </div>
    </div>
  );
}
