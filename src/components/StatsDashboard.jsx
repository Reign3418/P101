import React, { useState } from 'react';
import { 
  BarChart2, 
  Clock, 
  Flame, 
  Dumbbell, 
  CheckCircle, 
  AlertTriangle, 
  ArrowRight, 
  RotateCcw, 
  Search, 
  Layers, 
  Calendar, 
  Activity,
  Award,
  Sparkles,
  ArrowLeft
} from 'lucide-react';

function formatDuration(totalSeconds) {
  if (!totalSeconds || totalSeconds < 1) return '0m';
  const hrs = Math.floor(totalSeconds / 3600);
  const mins = Math.floor((totalSeconds % 3600) / 60);
  const secs = totalSeconds % 60;

  if (hrs > 0) {
    return `${hrs}h ${mins}m`;
  }
  if (mins > 0) {
    return `${mins}m ${secs}s`;
  }
  return `${secs}s`;
}

function formatRelativeTime(timestamp, lang = 'en') {
  if (!timestamp) return lang === 'es' ? 'Nunca' : 'Never';
  const diffMs = Date.now() - timestamp;
  const diffMins = Math.floor(diffMs / 60000);
  const diffHours = Math.floor(diffMins / 60);
  const diffDays = Math.floor(diffHours / 24);

  if (diffMins < 1) return lang === 'es' ? 'Ahora mismo' : 'Just now';
  if (diffMins < 60) return `${diffMins}m ${lang === 'es' ? 'atrás' : 'ago'}`;
  if (diffHours < 24) return `${diffHours}h ${lang === 'es' ? 'atrás' : 'ago'}`;
  if (diffDays === 1) return lang === 'es' ? 'Ayer' : 'Yesterday';
  return `${diffDays}d ${lang === 'es' ? 'atrás' : 'ago'}`;
}

export function StatsDashboard({
  stats,
  sessionSeconds,
  repLog = [],
  chapters = [],
  completedSections = {},
  onJumpToModule,
  onBackToCurriculum,
  onOpenNotebookLab,
  onResetStats,
  t,
  lang = 'en'
}) {
  const [repSearch, setRepSearch] = useState('');
  const [activeTab, setActiveTab] = useState('overview'); // 'overview' | 'reps'
  const isEs = lang === 'es';

  // Calculate high-level summary metrics
  const totalSeconds = stats?.totalSeconds || 0;
  const moduleStats = stats?.modules || {};

  const totalSections = chapters.reduce((acc, ch) => acc + (ch.sections?.length || 0), 0);
  const masteredCount = Object.keys(completedSections).length;
  const masteryPct = totalSections > 0 ? Math.round((masteredCount / totalSections) * 100) : 0;

  const totalReps = repLog.length;

  // Modules explored count
  const exploredModulesCount = Object.keys(moduleStats).filter(
    k => (moduleStats[k]?.visits || 0) > 0 || (moduleStats[k]?.timeSeconds || 0) > 0
  ).length;

  // Identify modules with low engagement or touched only once
  const attentionAlerts = chapters.map(ch => {
    const s = moduleStats[ch.num] || { timeSeconds: 0, visits: 0, repsCount: 0 };
    const visits = s.visits || 0;
    const timeSec = s.timeSeconds || 0;
    const reps = s.repsCount || 0;

    if (visits === 0) {
      return {
        chapter: ch,
        type: 'never',
        title: ch.code_module || `Module ${ch.num}`,
        message: isEs 
          ? `No has iniciado este módulo todavía. ¡Explóralo para construir tu modelo mental!`
          : `Not started yet. Jump into this module to build your mental model!`
      };
    }
    if (visits === 1 && reps === 0 && timeSec < 180) {
      return {
        chapter: ch,
        type: 'once',
        title: ch.code_module || `Module ${ch.num}`,
        message: isEs 
          ? `Visitado solo 1 vez (${formatDuration(timeSec)}). Dedica unos minutos a resolver repeticiones aquí para equilibrar tu dominio.`
          : `Visited only once (${formatDuration(timeSec)}). Spend a few minutes running reps here to balance your foundation!`
      };
    }
    return null;
  }).filter(Boolean);

  // Filter rep log
  const filteredReps = repLog.filter(rep => {
    if (!repSearch) return true;
    const q = repSearch.toLowerCase();
    return (
      (rep.moduleTitle || '').toLowerCase().includes(q) ||
      (rep.sectionTitle || '').toLowerCase().includes(q) ||
      (rep.testVar || '').toLowerCase().includes(q) ||
      String(rep.actualVal || '').toLowerCase().includes(q)
    );
  });

  return (
    <div className="flex-1 flex flex-col h-full overflow-hidden bg-slate-950 text-slate-100">
      
      {/* Top Action Header Bar */}
      <div className="p-4 sm:p-6 border-b border-slate-800/80 bg-slate-900/60 backdrop-blur-md flex flex-wrap items-center justify-between gap-4 shrink-0">
        <div className="flex items-center gap-3">
          <button
            onClick={onBackToCurriculum}
            className="px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 transition-colors flex items-center gap-1.5 text-xs font-semibold"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>{t ? t('backToChapters') : '← Back to Curriculum'}</span>
          </button>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-lg sm:text-xl font-extrabold text-white flex items-center gap-2">
                <BarChart2 className="w-5 h-5 text-blue-400" />
                <span>{t ? t('statsDashboard') : 'Learning Stats & Session Analytics'}</span>
              </h1>
              <span className="hidden sm:inline-block px-2 py-0.5 rounded text-[10px] font-mono font-bold bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 uppercase">
                {isEs ? '100% Local • FERPA' : '100% Client-Side'}
              </span>
            </div>
            <p className="text-xs text-slate-400 mt-0.5">
              {t ? t('attentionDesc') : 'Monitors where you focus your study time and flags under-practiced modules.'}
            </p>
          </div>
        </div>

        {/* Header Right Controls */}
        <div className="flex items-center gap-2">
          {/* Navigation Tab Pills */}
          <div className="flex items-center bg-slate-950 border border-slate-800 rounded-lg p-0.5 text-xs font-mono font-bold">
            <button
              onClick={() => setActiveTab('overview')}
              className={`px-3 py-1 rounded-md transition-all ${
                activeTab === 'overview'
                  ? 'bg-blue-600 text-white shadow'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              {isEs ? 'Resumen & Atención' : 'Overview & Balance'}
            </button>
            <button
              onClick={() => setActiveTab('reps')}
              className={`px-3 py-1 rounded-md transition-all flex items-center gap-1.5 ${
                activeTab === 'reps'
                  ? 'bg-blue-600 text-white shadow'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              <span>🏋️ {isEs ? 'Repeticiones' : 'Rep Log'}</span>
              <span className="text-[10px] px-1.5 py-0.2 rounded-full bg-slate-800 text-slate-300 border border-slate-700">
                {totalReps}
              </span>
            </button>
          </div>

          <button
            onClick={() => {
              if (window.confirm(t ? t('clearStatsConfirm') : 'Reset session analytics?')) {
                onResetStats();
              }
            }}
            title={t ? t('clearStats') : 'Reset Session Analytics'}
            className="p-1.5 rounded-lg bg-slate-800 hover:bg-rose-950/40 text-slate-400 hover:text-rose-300 border border-slate-700 hover:border-rose-500/40 transition-colors"
          >
            <RotateCcw className="w-4 h-4" />
          </button>

          {/* Jump to BYOD Notebook Lab */}
          {onOpenNotebookLab && (
            <button
              onClick={onOpenNotebookLab}
              title={isEs ? 'Ir al Laboratorio de Cuadernos' : 'Go to Notebook Lab (BYOD)'}
              className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg bg-purple-950/40 hover:bg-purple-900/50 text-purple-200 border border-purple-500/30 hover:border-purple-400 transition-colors text-xs font-semibold"
            >
              <span>📓</span>
              <span className="hidden sm:inline">{isEs ? 'Cuadernos' : 'Notebook Lab'}</span>
            </button>
          )}
        </div>
      </div>

      {/* Main Scrollable Content */}
      <div className="flex-1 overflow-y-auto custom-scroll p-4 sm:p-6 md:p-8 space-y-6">
        
        {/* 5-Metric Summary Cards Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3">
          {/* 1. Total Study Time */}
          <div className="p-3.5 sm:p-4 rounded-xl bg-slate-900 border border-slate-800 shadow space-y-1">
            <div className="flex items-center justify-between text-slate-400 text-xs">
              <span>{t ? t('totalStudyTime') : 'Total Study Time'}</span>
              <Clock className="w-4 h-4 text-blue-400" />
            </div>
            <div className="text-xl sm:text-2xl font-mono font-extrabold text-white">
              {formatDuration(totalSeconds)}
            </div>
            <div className="text-[10px] text-slate-500 font-mono">
              {isEs ? 'acumulado en este navegador' : 'cumulative in browser'}
            </div>
          </div>

          {/* 2. Session Time */}
          <div className="p-3.5 sm:p-4 rounded-xl bg-slate-900 border border-blue-500/30 shadow space-y-1">
            <div className="flex items-center justify-between text-slate-400 text-xs">
              <span>{t ? t('sessionTime') : 'Current Session'}</span>
              <Activity className="w-4 h-4 text-emerald-400 animate-pulse" />
            </div>
            <div className="text-xl sm:text-2xl font-mono font-extrabold text-emerald-300">
              {formatDuration(sessionSeconds)}
            </div>
            <div className="text-[10px] text-emerald-400/80 font-mono">
              {isEs ? 'tiempo activo (pausa si inactivo)' : 'active (pauses when idle)'}
            </div>
          </div>

          {/* 3. Muscle Memory Reps */}
          <div className="p-3.5 sm:p-4 rounded-xl bg-slate-900 border border-purple-500/30 shadow space-y-1">
            <div className="flex items-center justify-between text-slate-400 text-xs">
              <span>{t ? t('totalRepsCompleted') : 'Muscle Memory Reps'}</span>
              <Dumbbell className="w-4 h-4 text-purple-400" />
            </div>
            <div className="text-xl sm:text-2xl font-mono font-extrabold text-purple-300">
              {totalReps}
            </div>
            <div className="text-[10px] text-purple-400/80 font-mono">
              {isEs ? 'repeticiones validadas con éxito' : 'successful coding reps'}
            </div>
          </div>

          {/* 4. Curriculum Mastery */}
          <div className="p-3.5 sm:p-4 rounded-xl bg-slate-900 border border-slate-800 shadow space-y-1">
            <div className="flex items-center justify-between text-slate-400 text-xs">
              <span>{t ? t('curriculumMastery') : 'Curriculum Mastery'}</span>
              <Award className="w-4 h-4 text-amber-400" />
            </div>
            <div className="text-xl sm:text-2xl font-mono font-extrabold text-amber-300">
              {masteryPct}%
            </div>
            <div className="text-[10px] text-slate-500 font-mono">
              {masteredCount} / {totalSections} {isEs ? 'secciones' : 'sections'}
            </div>
          </div>

          {/* 5. Modules Explored */}
          <div className="p-3.5 sm:p-4 rounded-xl bg-slate-900 border border-slate-800 shadow space-y-1 col-span-2 sm:col-span-1">
            <div className="flex items-center justify-between text-slate-400 text-xs">
              <span>{t ? t('modulesExplored') : 'Modules Explored'}</span>
              <Layers className="w-4 h-4 text-indigo-400" />
            </div>
            <div className="text-xl sm:text-2xl font-mono font-extrabold text-indigo-300">
              {exploredModulesCount} / {chapters.length}
            </div>
            <div className="text-[10px] text-slate-500 font-mono">
              {isEs ? 'capítulos curriculares' : 'curriculum chapters'}
            </div>
          </div>
        </div>

        {/* Tab 1: Overview & Attention Balance */}
        {activeTab === 'overview' && (
          <div className="space-y-6">
            
            {/* Attention & Balance Notification Banners */}
            {attentionAlerts.length > 0 ? (
              <div className="space-y-3">
                <div className="flex items-center gap-2 text-xs font-bold text-amber-400 uppercase tracking-wider">
                  <AlertTriangle className="w-4 h-4" />
                  <span>{t ? t('attentionAlert') : 'Curriculum Balance Alerts: Under-Practiced Modules'}</span>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {attentionAlerts.map(alert => (
                    <div 
                      key={alert.chapter.num}
                      className="p-3.5 rounded-xl bg-gradient-to-r from-amber-950/40 via-slate-900 to-slate-900 border border-amber-500/30 flex items-center justify-between gap-3"
                    >
                      <div className="space-y-1">
                        <div className="flex items-center gap-2">
                          <span className="text-sm">⚠️</span>
                          <span className="text-xs font-bold text-white font-mono">
                            {alert.chapter.code_module || `Module ${alert.chapter.num}`}
                          </span>
                          <span className="text-[10px] px-2 py-0.2 rounded bg-amber-500/20 text-amber-300 border border-amber-500/30 font-semibold">
                            {alert.type === 'never' ? (isEs ? 'Sin Visitar' : 'Not Started') : (isEs ? 'Solo 1 Visita' : '1 Visit Only')}
                          </span>
                        </div>
                        <p className="text-[11px] text-slate-300 leading-snug">
                          {alert.message}
                        </p>
                      </div>

                      <button
                        onClick={() => onJumpToModule(alert.chapter.num)}
                        className="px-3 py-1.5 rounded-lg bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs shadow transition-all shrink-0 flex items-center gap-1 hover:scale-105"
                      >
                        <span>{isEs ? 'Practicar' : 'Practice'}</span>
                        <ArrowRight className="w-3 h-3" />
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            ) : (
              <div className="p-4 rounded-xl bg-emerald-950/30 border border-emerald-500/30 flex items-center gap-3 text-xs text-emerald-200">
                <CheckCircle className="w-5 h-5 text-emerald-400 shrink-0" />
                <div>
                  <span className="font-bold block text-sm text-emerald-300">
                    {isEs ? '¡Excelente Equilibrio de Estudio!' : 'Well Balanced Curriculum Coverage!'}
                  </span>
                  <span>
                    {isEs 
                      ? 'Has interactuado activamente con todos los módulos del curso. ¡Sigue así!' 
                      : 'You have actively engaged with all modules across the curriculum. Keep up the solid practice!'}
                  </span>
                </div>
              </div>
            )}

            {/* Visual Attention Distribution Chart */}
            <div className="p-4 sm:p-5 rounded-2xl bg-slate-900 border border-slate-800 space-y-4">
              <div className="flex items-center justify-between border-b border-slate-800 pb-3">
                <div className="flex items-center gap-2">
                  <Flame className="w-5 h-5 text-orange-400" />
                  <div>
                    <h3 className="text-sm sm:text-base font-bold text-white">
                      {isEs ? 'Distribución Visual del Tiempo de Estudio' : 'Study Time Distribution Across Modules'}
                    </h3>
                    <p className="text-[11px] text-slate-400">
                      {isEs 
                        ? 'Compara visualmente cuánto tiempo has dedicado a cada concepto.' 
                        : 'Quickly compare time invested across each module to spot under-practiced areas.'}
                    </p>
                  </div>
                </div>
              </div>

              <div className="space-y-3 pt-1">
                {chapters.map(ch => {
                  const s = moduleStats[ch.num] || { timeSeconds: 0, visits: 0, repsCount: 0 };
                  const timeSec = s.timeSeconds || 0;
                  const pct = totalSeconds > 0 ? Math.round((timeSec / totalSeconds) * 100) : 0;
                  const visits = s.visits || 0;
                  const reps = s.repsCount || 0;

                  return (
                    <div key={ch.num} className="space-y-1">
                      <div className="flex items-center justify-between text-xs">
                        <div className="flex items-center gap-2">
                          <span className="text-sm">{ch.icon}</span>
                          <span className="font-bold text-white font-mono text-[11px]">
                            {ch.code_module || `Module ${ch.num}`}:
                          </span>
                          <span className="text-slate-300 truncate max-w-xs sm:max-w-md hidden sm:inline">
                            {ch.title}
                          </span>
                        </div>
                        <div className="flex items-center gap-3 font-mono text-[11px]">
                          <span className="text-slate-400">
                            {visits} {visits === 1 ? (isEs ? 'visita' : 'visit') : (isEs ? 'visitas' : 'visits')}
                          </span>
                          <span className="text-purple-300">
                            {reps} {reps === 1 ? 'rep' : 'reps'}
                          </span>
                          <span className="font-bold text-blue-400 w-16 text-right">
                            {formatDuration(timeSec)}
                          </span>
                        </div>
                      </div>

                      {/* Bar progress */}
                      <div className="w-full bg-slate-950 h-2 rounded-full overflow-hidden border border-slate-800">
                        <div 
                          className={`h-full rounded-full transition-all duration-500 ${
                            visits === 0 
                              ? 'bg-slate-700'
                              : visits === 1 && reps === 0
                                ? 'bg-amber-500'
                                : 'bg-gradient-to-r from-blue-500 via-indigo-500 to-purple-500'
                          }`}
                          style={{ width: `${Math.max(pct, visits > 0 ? 3 : 0)}%` }}
                        />
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Detailed Module Engagement Matrix Table */}
            <div className="rounded-2xl bg-slate-900 border border-slate-800 overflow-hidden shadow">
              <div className="p-4 border-b border-slate-800 bg-slate-950/60 flex items-center justify-between">
                <h3 className="text-sm font-bold text-white uppercase tracking-wider flex items-center gap-2">
                  <Layers className="w-4 h-4 text-blue-400" />
                  <span>{t ? t('moduleAttentionTitle') : 'Curriculum Engagement Matrix'}</span>
                </h3>
                <span className="text-xs text-slate-400 font-mono">
                  {chapters.length} {isEs ? 'Módulos' : 'Modules Total'}
                </span>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs">
                  <thead className="bg-slate-950 text-slate-400 font-mono text-[11px] border-b border-slate-800">
                    <tr>
                      <th className="p-3">{isEs ? 'Módulo & Tema' : 'Module & Topic'}</th>
                      <th className="p-3 text-center">{t ? t('visits') : 'Visits'}</th>
                      <th className="p-3 text-center">{t ? t('timeSpent') : 'Time Spent'}</th>
                      <th className="p-3 text-center">{t ? t('repsDone') : 'Reps Done'}</th>
                      <th className="p-3 text-center">{t ? t('lastActive') : 'Last Active'}</th>
                      <th className="p-3 text-center">{t ? t('status') : 'Status'}</th>
                      <th className="p-3 text-right">{t ? t('action') : 'Action'}</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-800/80 text-[11px]">
                    {chapters.map(ch => {
                      const s = moduleStats[ch.num] || { timeSeconds: 0, visits: 0, repsCount: 0, quizzesPassed: 0, lastActive: null };
                      const visits = s.visits || 0;
                      const timeSec = s.timeSeconds || 0;
                      const reps = s.repsCount || 0;
                      const chSecIds = (ch.sections || []).map(sec => sec.id);
                      const allDone = chSecIds.length > 0 && chSecIds.every(id => completedSections[id]);

                      return (
                        <tr key={ch.num} className="hover:bg-slate-800/40 transition-colors">
                          <td className="p-3 align-middle">
                            <div className="font-bold text-white flex items-center gap-2">
                              <span>{ch.icon}</span>
                              <span>{ch.code_module || `Module ${ch.num}`}</span>
                            </div>
                            <div className="text-slate-400 text-[11px] mt-0.5 truncate max-w-xs">
                              {ch.title}
                            </div>
                          </td>
                          <td className="p-3 text-center font-mono align-middle font-semibold">
                            <span className={visits === 0 ? 'text-slate-600' : visits === 1 ? 'text-amber-400 font-bold' : 'text-slate-200'}>
                              {visits}
                            </span>
                          </td>
                          <td className="p-3 text-center font-mono align-middle font-bold text-blue-300">
                            {formatDuration(timeSec)}
                          </td>
                          <td className="p-3 text-center font-mono align-middle">
                            <span className={`px-2 py-0.5 rounded font-bold ${
                              reps > 0 
                                ? 'bg-purple-500/20 text-purple-300 border border-purple-500/30' 
                                : 'text-slate-600'
                            }`}>
                              {reps}
                            </span>
                          </td>
                          <td className="p-3 text-center text-slate-400 font-mono align-middle text-[10px]">
                            {formatRelativeTime(s.lastActive, lang)}
                          </td>
                          <td className="p-3 text-center align-middle">
                            {allDone ? (
                              <span className="px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 font-bold text-[10px]">
                                {isEs ? 'Dominado ✓' : 'Mastered ✓'}
                              </span>
                            ) : visits > 0 ? (
                              <span className="px-2 py-0.5 rounded bg-blue-500/20 text-blue-300 border border-blue-500/30 font-semibold text-[10px]">
                                {isEs ? 'En Progreso' : 'In Progress'}
                              </span>
                            ) : (
                              <span className="px-2 py-0.5 rounded bg-slate-800 text-slate-500 font-normal text-[10px]">
                                {isEs ? 'Sin Iniciar' : 'Not Started'}
                              </span>
                            )}
                          </td>
                          <td className="p-3 text-right align-middle">
                            <button
                              onClick={() => onJumpToModule(ch.num)}
                              className="px-2.5 py-1 rounded-lg bg-blue-600/20 hover:bg-blue-600/30 text-blue-300 hover:text-white border border-blue-500/30 transition-all font-semibold text-[10px] inline-flex items-center gap-1"
                            >
                              <span>{isEs ? 'Practicar' : 'Practice'}</span>
                              <ArrowRight className="w-3 h-3" />
                            </button>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </div>

          </div>
        )}

        {/* Tab 2: Muscle Memory Workout Rep Log */}
        {activeTab === 'reps' && (
          <div className="space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 p-4 rounded-xl bg-slate-900 border border-slate-800">
              <div>
                <h3 className="text-sm sm:text-base font-bold text-white flex items-center gap-2">
                  <Dumbbell className="w-5 h-5 text-purple-400" />
                  <span>{t ? t('repLogTitle') : 'Muscle Memory Workout Rep Log'}</span>
                </h3>
                <p className="text-xs text-slate-400 mt-0.5">
                  {t ? t('repLogDesc') : 'Every coding repetition validated in browser WebAssembly is recorded below with live telemetry.'}
                </p>
              </div>

              {/* Search Bar */}
              <div className="relative min-w-[220px]">
                <Search className="w-3.5 h-3.5 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                <input
                  type="text"
                  placeholder={isEs ? 'Filtrar por variable o tema...' : 'Filter by variable or topic...'}
                  value={repSearch}
                  onChange={(e) => setRepSearch(e.target.value)}
                  className="w-full pl-8 pr-3 py-1.5 rounded-lg bg-slate-950 border border-slate-800 text-xs text-slate-200 placeholder-slate-500 focus:outline-none focus:border-purple-500"
                />
              </div>
            </div>

            {/* Rep Log Table */}
            {filteredReps.length > 0 ? (
              <div className="rounded-xl border border-slate-800 bg-slate-900 overflow-hidden shadow">
                <div className="overflow-x-auto">
                  <table className="w-full text-left text-xs">
                    <thead className="bg-slate-950 text-slate-400 font-mono text-[11px] border-b border-slate-800">
                      <tr>
                        <th className="p-3">{isEs ? 'Fecha y Hora' : 'Date & Time'}</th>
                        <th className="p-3">{isEs ? 'Módulo y Sección' : 'Module & Section'}</th>
                        <th className="p-3">{isEs ? 'Variable Evaluada' : 'Evaluated Target'}</th>
                        <th className="p-3 text-center">{isEs ? 'Velocidad' : 'Execution Speed'}</th>
                        <th className="p-3 text-right">{isEs ? 'Resultado' : 'Result'}</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-800/80 font-mono text-[11px]">
                      {filteredReps.map((rep) => (
                        <tr key={rep.id} className="hover:bg-slate-800/50 transition-colors">
                          <td className="p-3 text-slate-400 text-[10px] whitespace-nowrap">
                            {new Date(rep.timestamp).toLocaleDateString(lang === 'es' ? 'es-ES' : 'en-US', {
                              month: 'short',
                              day: 'numeric',
                              hour: '2-digit',
                              minute: '2-digit',
                              second: '2-digit'
                            })}
                          </td>
                          <td className="p-3 text-white font-sans font-medium whitespace-nowrap">
                            <div className="font-bold text-xs">{rep.moduleTitle || 'Curriculum Rep'}</div>
                            <div className="text-slate-400 text-[10px] font-mono">{rep.sectionTitle}</div>
                          </td>
                          <td className="p-3">
                            <span className="text-purple-300 font-bold">{rep.testVar}</span>
                            <span className="text-slate-500 mx-1">=</span>
                            <span className="text-emerald-300 bg-emerald-500/10 border border-emerald-500/20 px-1.5 py-0.5 rounded text-[10px]">
                              {String(rep.actualVal)}
                            </span>
                          </td>
                          <td className="p-3 text-center text-slate-400 text-[10px]">
                            {rep.elapsed ? `${rep.elapsed}ms • WASM` : 'Pyodide'}
                          </td>
                          <td className="p-3 text-right">
                            <span className="px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 font-bold text-[10px]">
                              Passed ✓
                            </span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            ) : (
              <div className="p-8 rounded-xl bg-slate-900/60 border border-slate-800 text-center space-y-3">
                <Dumbbell className="w-10 h-10 text-slate-600 mx-auto" />
                <p className="text-xs text-slate-400 max-w-md mx-auto">
                  {t ? t('noRepsYet') : 'No reps logged yet. Head to any section and hit "Run with Python" to log your first rep!'}
                </p>
                <button
                  onClick={onBackToCurriculum}
                  className="px-4 py-1.5 rounded-lg bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs shadow transition-all inline-flex items-center gap-1.5"
                >
                  <span>{isEs ? 'Ir a los Módulos' : 'Go to Modules'}</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            )}
          </div>
        )}

      </div>
    </div>
  );
}
