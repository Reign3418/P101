import React, { useState, useRef, useEffect, useMemo } from 'react';
import { 
  Play, 
  Copy, 
  Check, 
  Upload, 
  Trash2, 
  FileText, 
  ShieldCheck, 
  Sparkles, 
  AlertCircle,
  RotateCcw,
  Plus,
  PlayCircle,
  Image as ImageIcon,
  Target,
  CheckCircle2,
  ChevronDown,
  ChevronUp
} from 'lucide-react';

const SAMPLE_NOTEBOOK_EN = {
  id: 'sample-cafe-workshop',
  name: 'Sample_Cafe_Order_Workshop.ipynb',
  title: 'Interactive Python Workshop: Cafe Ordering System',
  cells: [
    {
      cell_type: 'markdown',
      source: [
        '# ☕ Interactive Cafe Workshop: Lists & Decision Logic\n',
        'Welcome to this interactive notebook! In this workshop, you will learn how to:\n',
        '- Manage an active orders queue using **Python lists** (`.append()`, `.pop()`)\n',
        '- Write decision logic with **`if-elif-else`** structures\n',
        '- Calculate drink totals and apply automated customer discounts\n',
        '\n',
        '> **Pro-Tip**: You can directly click into any code box below, type modifications, and hit **Shift + Enter** or **"Run Cell"** to execute live in your browser!'
      ]
    },
    {
      cell_type: 'code',
      source: [
        '# Step 1: Initialize the drink queue and available inventory\n',
        'menu = {\n',
        '    "latte": 4.50,\n',
        '    "cappuccino": 4.25,\n',
        '    "cold brew": 4.00,\n',
        '    "drip coffee": 3.00\n',
        '}\n',
        '\n',
        'order_queue = ["latte", "cold brew"]\n',
        'print(f"Current Queue: {order_queue}")\n',
        'print(f"Menu Items: {list(menu.keys())}")'
      ]
    },
    {
      cell_type: 'markdown',
      source: [
        '### Step 2: Processing Orders & Applying Business Rules\n',
        'Next, we process incoming customer orders. If an order is over $8.00, we apply a **10% Student / Military discount**!'
      ]
    },
    {
      cell_type: 'code',
      source: [
        'def checkout(items, is_student_or_veteran=True):\n',
        '    total = 0.0\n',
        '    for item in items:\n',
        '        if item in menu:\n',
        '            total += menu[item]\n',
        '        else:\n',
        '            print(f"Warning: {item} is out of stock.")\n',
        '            \n',
        '    discount = 0.0\n',
        '    if is_student_or_veteran and total >= 8.0:\n',
        '        discount = total * 0.10\n',
        '        print(f"10% Discount Applied: -${discount:.2f}")\n',
        '        \n',
        '    final_total = total - discount\n',
        '    return round(final_total, 2)\n',
        '\n',
        'my_order = ["latte", "cappuccino"]\n',
        'amount_due = checkout(my_order, is_student_or_veteran=True)\n',
        'print(f"Total Amount Due: ${amount_due:.2f}")'
      ]
    }
  ]
};

const SAMPLE_NOTEBOOK_ES = {
  id: 'sample-cafe-workshop',
  name: 'Taller_Muestra_Pedidos_Cafe.ipynb',
  title: 'Taller Interactivo de Python: Sistema de Pedidos de Café',
  cells: [
    {
      cell_type: 'markdown',
      source: [
        '# ☕ Taller Interactivo de Café: Listas y Lógica de Decisión\n',
        '¡Bienvenido a este cuaderno interactivo! En este taller aprenderás a:\n',
        '- Administrar una cola de pedidos usando **listas en Python** (`.append()`, `.pop()`)\n',
        '- Escribir lógica de decisión con estructuras **`if-elif-else`**\n',
        '- Calcular totales de bebidas y aplicar descuentos automáticos\n',
        '\n',
        '> **Consejo Pro**: Puedes hacer clic directamente en cualquier bloque de código, editarlo y pulsar **Shift + Enter** o **"Ejecutar Celda"** para probarlo en vivo.'
      ]
    },
    {
      cell_type: 'code',
      source: [
        '# Paso 1: Inicializar la cola de bebidas y el menú disponible\n',
        'menu = {\n',
        '    "latte": 4.50,\n',
        '    "cappuccino": 4.25,\n',
        '    "cold brew": 4.00,\n',
        '    "drip coffee": 3.00\n',
        '}\n',
        '\n',
        'cola_pedidos = ["latte", "cold brew"]\n',
        'print(f"Cola actual: {cola_pedidos}")\n',
        'print(f"Bebidas en menú: {list(menu.keys())}")'
      ]
    },
    {
      cell_type: 'markdown',
      source: [
        '### Paso 2: Procesar Pedidos y Aplicar Descuentos\n',
        'A continuación procesamos los pedidos. ¡Si la orden supera los $8.00, aplicamos un **10% de descuento para Estudiantes o Veteranos**!'
      ]
    },
    {
      cell_type: 'code',
      source: [
        'def calcular_cuenta(items, es_estudiante_o_veterano=True):\n',
        '    total = 0.0\n',
        '    for item in items:\n',
        '        if item in menu:\n',
        '            total += menu[item]\n',
        '        else:\n',
        '            print(f"Aviso: {item} no está disponible.")\n',
        '            \n',
        '    descuento = 0.0\n',
        '    if es_estudiante_o_veterano and total >= 8.0:\n',
        '        descuento = total * 0.10\n',
        '        print(f"10% Descuento Aplicado: -${descuento:.2f}")\n',
        '        \n',
        '    final_total = total - descuento\n',
        '    return round(final_total, 2)\n',
        '\n',
        'mi_pedido = ["latte", "cappuccino"]\n',
        'a_pagar = calcular_cuenta(mi_pedido, es_estudiante_o_veterano=True)\n',
        'print(f"Total a Pagar: ${a_pagar:.2f}")'
      ]
    }
  ]
};

// Heuristic engine to identify, extract, and monitor Scaffolded Learning exercises
function analyzeCellScaffolding(originalCode = '', currentCode = '', output = null) {
  const origLines = originalCode.split('\n');

  // Extract TODO / Practice / Exercise prompts
  const taskRegex = /#\s*(TODO|Exercise|Practice|Challenge|Task|Your Turn|Try It|Completa|Ejercicio|Práctica|Desafío)[:\s-]*(.+)/i;
  const tasks = [];
  
  origLines.forEach((line, lineIdx) => {
    const match = line.match(taskRegex);
    if (match) {
      tasks.push({
        id: lineIdx,
        text: match[2].trim(),
        type: match[1].toUpperCase()
      });
    }
  });

  const hasNotImplemented = /raise\s+NotImplementedError|#\s*your code here/i.test(originalCode);
  const isScaffolded = tasks.length > 0 || hasNotImplemented;

  if (!isScaffolded) {
    return { isScaffolded: false, tasks: [], state: null };
  }

  // Check for presence of uncompleted starter placeholders in current code
  // 1. Empty string assignments: var = "" or var = ''
  const hasEmptyStrings = /^\s*[\w_]+\s*=\s*["']\s*["']\s*$/m.test(currentCode);
  // 2. Uncalculated zeroes / None when calculation was requested in original
  const hasZeroOrNonePlaceholders = /^\s*[\w_]+\s*=\s*(0|None)\s*$/m.test(currentCode) && /calculate|compute|sum|promedio|total|cuenta|año|year|goal/i.test(originalCode);
  // 3. Standalone empty print calls: print()
  const hasEmptyPrints = /^\s*print\s*\(\s*\)\s*$/m.test(currentCode);
  // 4. pass or ellipsis or NotImplementedError in currentCode
  const hasPassOrEllipsis = /^\s*(pass|\.\.\.)\s*$/m.test(currentCode) || /raise\s+NotImplementedError/.test(currentCode);

  const hasRemainingPlaceholders = hasEmptyStrings || hasZeroOrNonePlaceholders || hasEmptyPrints || hasPassOrEllipsis;
  const isModified = currentCode.trim() !== originalCode.trim();
  const hasRun = output !== null && output !== undefined;
  const runSuccess = hasRun && output.success === true;

  // Determine pedagogical progress state
  let state = 'starter'; // 'starter' | 'in_progress' | 'completed'
  if (!isModified) {
    state = 'starter';
  } else if (hasRun && runSuccess && !hasRemainingPlaceholders) {
    state = 'completed';
  } else {
    state = 'in_progress';
  }

  return {
    isScaffolded: true,
    tasks,
    state,
    hasRemainingPlaceholders,
    isModified,
    hasRun,
    runSuccess
  };
}

export function NotebookViewer({ 
  notebooks = [], 
  activeNotebookId, 
  onSelectNotebook, 
  onAddNotebook, 
  onDeleteNotebook,
  onExecuteCode,
  pyodideReady,
  t,
  lang = 'en'
}) {
  const [cellCodes, setCellCodes] = useState({});
  const [cellOutputs, setCellOutputs] = useState({});
  const [cellRunning, setCellRunning] = useState({});
  const [copiedCell, setCopiedCell] = useState(null);
  const [dragOver, setDragOver] = useState(false);
  const [openAccordions, setOpenAccordions] = useState({});
  const fileInputRef = useRef(null);

  const isEs = lang === 'es';
  const sampleNotebook = isEs ? SAMPLE_NOTEBOOK_ES : SAMPLE_NOTEBOOK_EN;
  const activeNotebook = notebooks.find(n => n.id === activeNotebookId) || notebooks[0] || null;

  const formatSource = (src) => {
    if (Array.isArray(src)) return src.join('');
    return String(src || '');
  };

  // Initialize editable code state whenever the active notebook changes
  useEffect(() => {
    if (!activeNotebook?.cells) return;
    const initialCodes = {};
    activeNotebook.cells.forEach((cell, idx) => {
      if (cell.cell_type === 'code') {
        initialCodes[idx] = formatSource(cell.source);
      }
    });
    setCellCodes(initialCodes);
    setCellOutputs({});
    setCellRunning({});
  }, [activeNotebook?.id]);

  const handleFileUpload = (file) => {
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (e) => {
      try {
        const json = JSON.parse(e.target.result);
        if (!json.cells || !Array.isArray(json.cells)) {
          alert('Invalid Jupyter Notebook: missing "cells" array.');
          return;
        }

        // Extract a title from first markdown cell or filename
        let title = file.name.replace(/\.ipynb$/i, '').replace(/_/g, ' ');
        const firstMd = json.cells.find(c => c.cell_type === 'markdown');
        if (firstMd && Array.isArray(firstMd.source)) {
          const firstLine = firstMd.source[0] || '';
          if (firstLine.startsWith('#')) {
            title = firstLine.replace(/^#+\s*/, '').trim();
          }
        }

        const newNotebook = {
          id: 'nb-' + Date.now(),
          name: file.name,
          title: title,
          cells: json.cells
        };

        onAddNotebook(newNotebook);
      } catch (err) {
        alert('Error parsing .ipynb file: ' + err.message);
      }
    };
    reader.readAsText(file);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setDragOver(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFileUpload(e.dataTransfer.files[0]);
    }
  };

  const handleRunCell = async (cellIndex, codeToRun) => {
    setCellRunning(prev => ({ ...prev, [cellIndex]: true }));
    const result = await onExecuteCode(codeToRun);
    setCellRunning(prev => ({ ...prev, [cellIndex]: false }));
    setCellOutputs(prev => ({
      ...prev,
      [cellIndex]: result
    }));
  };

  const handleResetCell = (idx, originalSource) => {
    setCellCodes(prev => ({
      ...prev,
      [idx]: formatSource(originalSource)
    }));
  };

  const handleCopyCode = (cellIndex, code) => {
    navigator.clipboard.writeText(code);
    setCopiedCell(cellIndex);
    setTimeout(() => setCopiedCell(null), 1800);
  };

  const handleRunAllCells = async () => {
    if (!activeNotebook?.cells) return;
    for (let idx = 0; idx < activeNotebook.cells.length; idx++) {
      const cell = activeNotebook.cells[idx];
      if (cell.cell_type === 'code') {
        const code = cellCodes[idx] !== undefined ? cellCodes[idx] : formatSource(cell.source);
        await handleRunCell(idx, code);
      }
    }
  };

  const handleAddCodeCell = () => {
    if (!activeNotebook) return;
    const newCellIndex = activeNotebook.cells.length;
    activeNotebook.cells.push({
      cell_type: 'code',
      source: ['# Write your Python code here...\n']
    });
    setCellCodes(prev => ({
      ...prev,
      [newCellIndex]: '# Write your Python code here...\n'
    }));
  };

  const toggleScaffoldAccordion = (cellIdx) => {
    setOpenAccordions(prev => ({
      ...prev,
      [cellIdx]: !prev[cellIdx]
    }));
  };

  const scaffoldStats = useMemo(() => {
    if (!activeNotebook?.cells) return { total: 0, completed: 0, inProgress: 0 };
    let total = 0;
    let completed = 0;
    let inProgress = 0;

    activeNotebook.cells.forEach((cell, idx) => {
      if (cell.cell_type === 'code') {
        const orig = formatSource(cell.source);
        const curr = cellCodes[idx] !== undefined ? cellCodes[idx] : orig;
        const out = cellOutputs[idx];
        const sc = analyzeCellScaffolding(orig, curr, out);
        if (sc.isScaffolded) {
          total++;
          if (sc.state === 'completed') completed++;
          else if (sc.state === 'in_progress') inProgress++;
        }
      }
    });

    return { total, completed, inProgress };
  }, [activeNotebook, cellCodes, cellOutputs]);

  const isModifiedCount = activeNotebook?.cells
    ? Object.keys(cellCodes).filter(idx => {
        const orig = formatSource(activeNotebook.cells[idx]?.source);
        return cellCodes[idx] !== orig;
      }).length
    : 0;

  return (
    <div className="flex-1 flex flex-col h-full overflow-hidden bg-slate-950 text-slate-100">
      {/* Top Banner / Privacy & Compliance Header */}
      <div className="border-b border-slate-800 bg-slate-900/60 p-4 shrink-0 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
        <div>
          <div className="flex items-center gap-2">
            <span className="text-xl">📓</span>
            <h2 className="text-base font-bold text-white">
              {t ? t('byodTitle') : 'Bring Your Own Notebook (BYOD) Lab'}
            </h2>
            <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 font-bold flex items-center gap-1">
              <ShieldCheck className="w-3 h-3 inline" /> {t ? t('clientSidePrivacy') : '100% Client-Side Privacy'}
            </span>
          </div>
          <p className="text-[11px] text-slate-400 mt-0.5">
            {t ? t('byodSubtitle') : 'Load your lecture notebooks locally. Code runs in your browser via WebAssembly (Pyodide). Zero files stored on remote servers.'}
          </p>
        </div>

        {/* Action Controls */}
        <div className="flex items-center gap-2 flex-wrap">
          <input 
            type="file" 
            ref={fileInputRef} 
            accept=".ipynb,application/x-ipynb+json,application/json" 
            className="hidden" 
            onChange={(e) => {
              if (e.target.files?.[0]) handleFileUpload(e.target.files[0]);
              e.target.value = '';
            }}
          />
          <button
            onClick={() => fileInputRef.current?.click()}
            className="px-3 py-1.5 rounded-lg bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs flex items-center gap-1.5 shadow-lg shadow-blue-600/20 transition-all active:scale-95"
          >
            <Upload className="w-3.5 h-3.5" />
            <span>{t ? t('importIpynb') : 'Import .ipynb'}</span>
          </button>
          
          {notebooks.length === 0 && (
            <button
              onClick={() => onAddNotebook(sampleNotebook)}
              className="px-3 py-1.5 rounded-lg bg-purple-600/20 hover:bg-purple-600/30 text-purple-300 border border-purple-500/30 font-medium text-xs flex items-center gap-1.5 transition-all"
            >
              <Sparkles className="w-3.5 h-3.5" />
              <span>{t ? t('loadSampleDemo') : 'Load Sample Demo'}</span>
            </button>
          )}
        </div>
      </div>

      {/* Notebook Selector Bar (if multiple notebooks imported) */}
      {notebooks.length > 0 && (
        <div className="border-b border-slate-800/80 bg-slate-950 px-4 py-2 flex items-center gap-2 overflow-x-auto custom-scroll">
          <span className="text-[10px] uppercase font-bold text-slate-500 shrink-0">
            {t ? t('notebooksCount') : 'Notebooks:'}
          </span>
          {notebooks.map(nb => {
            const isActive = nb.id === activeNotebook?.id;
            return (
              <div 
                key={nb.id}
                className={`flex items-center gap-2 px-3 py-1 rounded-lg text-xs transition-all shrink-0 cursor-pointer border ${
                  isActive 
                    ? 'bg-blue-500/15 border-blue-500/40 text-blue-300 font-bold' 
                    : 'bg-slate-900 border-slate-800 text-slate-400 hover:text-slate-200'
                }`}
                onClick={() => onSelectNotebook(nb.id)}
              >
                <FileText className="w-3.5 h-3.5" />
                <span className="max-w-[160px] truncate" title={nb.name}>{nb.name}</span>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    onDeleteNotebook(nb.id);
                  }}
                  className="text-slate-500 hover:text-rose-400 p-0.5 ml-1 transition-colors"
                  title="Remove from browser"
                >
                  <Trash2 className="w-3 h-3" />
                </button>
              </div>
            );
          })}
        </div>
      )}

      {/* Main Content Area */}
      <div className="flex-1 overflow-y-auto custom-scroll p-4 md:p-8 space-y-6">
        {!activeNotebook ? (
          /* Empty State Dropzone */
          <div 
            onDragOver={(e) => { e.preventDefault(); setDragOver(true); }}
            onDragLeave={() => setDragOver(false)}
            onDrop={handleDrop}
            className={`max-w-2xl mx-auto mt-12 p-10 border-2 border-dashed rounded-3xl text-center space-y-4 transition-all ${
              dragOver ? 'border-blue-500 bg-blue-500/10' : 'border-slate-800 bg-slate-900/40 hover:border-slate-700'
            }`}
          >
            <div className="w-16 h-16 rounded-2xl bg-blue-500/10 border border-blue-500/20 text-blue-400 flex items-center justify-center mx-auto text-3xl">
              📂
            </div>
            <div>
              <h3 className="text-lg font-bold text-white">
                {t ? t('dropTitle') : 'Import Any Jupyter Notebook (.ipynb)'}
              </h3>
              <p className="text-xs text-slate-400 mt-1 max-w-md mx-auto leading-relaxed">
                {t ? t('dropSubtitle') : 'Drag and drop your lecture notebooks from Blackboard, Google Colab, or VS Code. Everything runs locally in your browser.'}
              </p>
            </div>

            <div className="flex items-center justify-center gap-3 pt-2 flex-wrap">
              <button
                onClick={() => fileInputRef.current?.click()}
                className="px-4 py-2 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs shadow-lg shadow-blue-600/20 flex items-center gap-2 transition-all"
              >
                <Upload className="w-4 h-4" />
                <span>{t ? t('browseFile') : 'Browse .ipynb File'}</span>
              </button>
              <button
                onClick={() => onAddNotebook(sampleNotebook)}
                className="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 font-medium text-xs border border-slate-700 flex items-center gap-2 transition-all"
              >
                <Sparkles className="w-4 h-4 text-purple-400" />
                <span>{t ? t('loadSampleDemo') : 'Load Sample Notebook'}</span>
              </button>
            </div>

            <div className="pt-4 border-t border-slate-800/80 text-[11px] text-slate-500 flex items-center justify-center gap-2">
              <ShieldCheck className="w-4 h-4 text-emerald-400" />
              <span>{t ? t('complianceNote') : 'Compliant with Community College policies: No files uploaded to servers.'}</span>
            </div>
          </div>
        ) : (
          /* Active Notebook Cell Stream */
          <div className="max-w-4xl mx-auto space-y-6">
            {/* Notebook Title Card */}
            <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 shadow-lg flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div className="space-y-1">
                <div className="flex items-center gap-2 flex-wrap">
                  <span className="text-[10px] font-mono text-blue-400 bg-blue-500/10 border border-blue-500/20 px-2 py-0.5 rounded font-bold uppercase truncate max-w-xs sm:max-w-md" title={activeNotebook.name}>
                    {activeNotebook.name}
                  </span>
                  {isModifiedCount > 0 && (
                    <span className="text-[10px] font-mono text-amber-300 bg-amber-500/15 border border-amber-500/30 px-2 py-0.5 rounded font-bold">
                      {isModifiedCount} {isEs ? 'modificadas' : 'edited'}
                    </span>
                  )}
                </div>
                <h2 className="text-xl font-bold text-white mt-0.5">{activeNotebook.title}</h2>
                <div className="flex items-center gap-3 text-xs text-slate-400 font-mono flex-wrap">
                  <span>{activeNotebook.cells.length} {t ? t('totalCells') : 'Total Cells'}</span>
                  <span>•</span>
                  <span className="text-emerald-400 font-bold">
                    {activeNotebook.cells.filter(c => c.cell_type === 'code').length} {t ? t('executableCells') : 'Executable Code Cells'}
                  </span>
                  {scaffoldStats.total > 0 && (
                    <>
                      <span>•</span>
                      <span className="text-purple-300 font-bold flex items-center gap-1.5 bg-purple-500/15 border border-purple-500/30 px-2 py-0.5 rounded-lg">
                        <Target className="w-3.5 h-3.5 text-purple-400" />
                        <span>{scaffoldStats.total} {t ? t('scaffoldExercisesCount') : 'Scaffolded Exercises'}</span>
                        <span className="text-slate-400 font-normal">
                          ({scaffoldStats.completed} {isEs ? 'completados' : 'completed'})
                        </span>
                      </span>
                    </>
                  )}
                </div>
              </div>

              {/* Top Controls: Run All Cells, Add Cell, Import Another */}
              <div className="flex items-center gap-2 flex-wrap">
                <button
                  onClick={handleRunAllCells}
                  className="px-3 py-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs flex items-center gap-1.5 shadow-md shadow-emerald-950/50 transition-all active:scale-95"
                  title={isEs ? "Ejecutar todas las celdas de código en secuencia" : "Run all code cells in sequence"}
                >
                  <PlayCircle className="w-3.5 h-3.5" />
                  <span>{isEs ? 'Ejecutar Todo' : 'Run All Cells'}</span>
                </button>

                <button
                  onClick={handleAddCodeCell}
                  className="px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs border border-slate-700 flex items-center gap-1.5 font-medium transition-colors"
                  title={isEs ? "Agregar una nueva celda de código editable" : "Add a new editable code cell"}
                >
                  <Plus className="w-3.5 h-3.5" />
                  <span>{isEs ? '+ Celda' : '+ Code Cell'}</span>
                </button>

                <button
                  onClick={() => fileInputRef.current?.click()}
                  className="px-3 py-1.5 rounded-lg bg-blue-600/20 hover:bg-blue-600/30 text-blue-300 text-xs border border-blue-500/30 flex items-center gap-1.5 font-medium transition-colors"
                >
                  <Upload className="w-3.5 h-3.5" />
                  <span>{t ? t('importAnother') : 'Import Another'}</span>
                </button>
              </div>
            </div>

            {/* Render Each Cell */}
            <div className="space-y-4">
              {activeNotebook.cells.map((cell, idx) => {
                const src = formatSource(cell.source);
                if (!src.trim()) return null;

                if (cell.cell_type === 'markdown') {
                  return (
                    <div 
                      key={idx}
                      className="p-4 sm:p-5 rounded-2xl bg-slate-900/40 border border-slate-800/60 text-slate-200 text-xs leading-relaxed space-y-2 prose prose-invert max-w-none shadow-sm"
                    >
                      <MarkdownPreview content={src} attachments={cell.attachments} />
                    </div>
                  );
                }

                if (cell.cell_type === 'code') {
                  const output = cellOutputs[idx];
                  const isRunning = cellRunning[idx] || false;
                  const originalCode = formatSource(cell.source);
                  const currentCode = cellCodes[idx] !== undefined ? cellCodes[idx] : originalCode;
                  const isModified = currentCode !== originalCode;
                  const scaffold = analyzeCellScaffolding(originalCode, currentCode, output);

                  return (
                    <div 
                      key={idx}
                      className="rounded-2xl border border-slate-800 bg-slate-900 shadow-md overflow-hidden space-y-0 transition-all focus-within:border-blue-500/50"
                    >
                      {/* Code Cell Header */}
                      <div className="bg-slate-950/90 px-4 py-2 border-b border-slate-800 flex items-center justify-between text-xs flex-wrap gap-2">
                        <div className="flex items-center gap-2 flex-wrap">
                          <span className="text-[11px] font-mono text-blue-400 font-bold">
                            In [{idx + 1}]:
                          </span>
                          {isModified && (
                            <span className="text-[10px] font-mono font-bold px-1.5 py-0.5 rounded bg-amber-500/20 text-amber-300 border border-amber-500/30">
                              {isEs ? '● Modificado' : '● Edited'}
                            </span>
                          )}

                          {scaffold.isScaffolded && (
                            <div className="flex items-center gap-1.5 flex-wrap">
                              {scaffold.state === 'starter' && (
                                <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded-full bg-purple-500/15 text-purple-300 border border-purple-500/30 flex items-center gap-1.5">
                                  <Target className="w-3 h-3 text-purple-400" />
                                  <span>{t ? t('scaffoldExercise') : 'Scaffolded Exercise'}</span>
                                  <span className="text-[9px] bg-purple-900/60 px-1.5 py-0.2 rounded-full text-purple-200">
                                    {t ? t('scaffoldStarter') : 'Starter'}
                                  </span>
                                </span>
                              )}
                              {scaffold.state === 'in_progress' && (
                                <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded-full bg-amber-500/20 text-amber-300 border border-amber-500/40 flex items-center gap-1.5 shadow-sm shadow-amber-950">
                                  <span className="relative flex h-2 w-2">
                                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-amber-400 opacity-75"></span>
                                    <span className="relative inline-flex rounded-full h-2 w-2 bg-amber-500"></span>
                                  </span>
                                  <span>{t ? t('scaffoldExercise') : 'Scaffolded Exercise'}</span>
                                  <span className="text-[9px] bg-amber-900/60 px-1.5 py-0.2 rounded-full text-amber-200">
                                    {t ? t('scaffoldInProgress') : 'In Progress'}
                                  </span>
                                </span>
                              )}
                              {scaffold.state === 'completed' && (
                                <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 flex items-center gap-1.5 shadow-sm shadow-emerald-950">
                                  <CheckCircle2 className="w-3 h-3 text-emerald-400" />
                                  <span>{t ? t('scaffoldExercise') : 'Scaffolded Exercise'}</span>
                                  <span className="text-[9px] bg-emerald-900/60 px-1.5 py-0.2 rounded-full text-emerald-200">
                                    {t ? t('scaffoldCompleted') : 'Completed ✓'}
                                  </span>
                                </span>
                              )}
                            </div>
                          )}
                        </div>

                        <div className="flex items-center gap-2">
                          {isModified && (
                            <button
                              onClick={() => handleResetCell(idx, originalCode)}
                              className="px-2 py-1 rounded text-[11px] font-mono bg-slate-900 hover:bg-slate-800 text-slate-400 hover:text-amber-300 border border-slate-800 flex items-center gap-1 transition-colors"
                              title={isEs ? "Restaurar código original" : "Reset to original starter code"}
                            >
                              <RotateCcw className="w-3 h-3" />
                              <span className="hidden sm:inline">{isEs ? 'Restaurar' : 'Reset'}</span>
                            </button>
                          )}

                          <button
                            onClick={() => handleCopyCode(idx, currentCode)}
                            className="px-2 py-1 rounded text-[11px] font-mono bg-slate-800 hover:bg-slate-700 text-slate-300 border border-slate-700 flex items-center gap-1 transition-colors"
                            title="Copy code to clipboard"
                          >
                            {copiedCell === idx ? <Check className="w-3 h-3 text-emerald-400" /> : <Copy className="w-3 h-3" />}
                            <span>{copiedCell === idx ? (t ? t('copiedCode') : 'Copied') : (t ? t('copyCode') : 'Copy')}</span>
                          </button>

                          <button
                            onClick={() => handleRunCell(idx, currentCode)}
                            disabled={isRunning}
                            className="px-3 py-1 rounded-lg bg-emerald-600 hover:bg-emerald-500 disabled:opacity-50 text-white font-bold text-xs flex items-center gap-1.5 shadow transition-all active:scale-95"
                            title="Run cell (Shift + Enter)"
                          >
                            <Play className="w-3 h-3 fill-current" />
                            <span>{isRunning ? (t ? t('running') : 'Running...') : (t ? t('runCell') : 'Run Cell')}</span>
                          </button>
                        </div>
                      </div>

                      {/* Scaffold Learning Goals Checklist Accordion */}
                      {scaffold.isScaffolded && scaffold.tasks.length > 0 && (
                        <div className="bg-slate-950/70 border-b border-slate-800/80 px-4 py-2 text-xs">
                          <div className="flex items-center justify-between gap-2 flex-wrap">
                            <button
                              type="button"
                              onClick={() => toggleScaffoldAccordion(idx)}
                              className="flex items-center gap-1.5 text-xs text-slate-300 hover:text-white font-medium transition-colors"
                            >
                              <Target className="w-3.5 h-3.5 text-purple-400 shrink-0" />
                              <span className="font-bold text-purple-300">
                                {t ? t('scaffoldGoals') : 'Learning Goals Detected'}
                              </span>
                              <span className="text-[10px] text-slate-400 font-mono">
                                ({scaffold.tasks.length} {isEs ? 'metas' : 'goals'})
                              </span>
                              {openAccordions[idx] ? (
                                <ChevronUp className="w-3 h-3 text-slate-400" />
                              ) : (
                                <ChevronDown className="w-3 h-3 text-slate-400" />
                              )}
                            </button>

                            <span className="text-[10px] font-mono">
                              {scaffold.state === 'completed' ? (
                                <span className="text-emerald-400 font-bold flex items-center gap-1">
                                  <CheckCircle2 className="w-3 h-3 inline" /> {isEs ? '¡Metas resueltas y probadas!' : 'Goals solved & verified!'}
                                </span>
                              ) : scaffold.state === 'in_progress' ? (
                                <span className="text-amber-300 font-semibold flex items-center gap-1">
                                  <span className="w-1.5 h-1.5 rounded-full bg-amber-400 animate-pulse inline-block"></span>
                                  {isEs ? 'Práctica en progreso...' : 'Practice in progress...'}
                                </span>
                              ) : (
                                <span className="text-purple-300/80">
                                  {isEs ? 'Listo para personalizar' : 'Ready to personalize & solve'}
                                </span>
                              )}
                            </span>
                          </div>

                          {/* Expanded Checklist */}
                          {openAccordions[idx] && (
                            <div className="mt-2 pt-2 border-t border-slate-800/60 space-y-1.5">
                              {scaffold.tasks.map((taskItem, tIdx) => (
                                <div key={tIdx} className="flex items-start gap-2 text-[11px] text-slate-300">
                                  <span className="text-purple-400 font-mono text-[10px] shrink-0 mt-0.5 font-bold">
                                    #{tIdx + 1}
                                  </span>
                                  <span className="leading-snug text-slate-200">{taskItem.text}</span>
                                </div>
                              ))}
                            </div>
                          )}
                        </div>
                      )}

                      {/* Interactive Editable Code Textarea */}
                      <div className="relative group">
                        <textarea
                          rows={Math.max(currentCode.split('\n').length, 2)}
                          value={currentCode}
                          onChange={(e) => {
                            const val = e.target.value;
                            setCellCodes(prev => ({ ...prev, [idx]: val }));
                          }}
                          onKeyDown={(e) => {
                            // Shift + Enter or Ctrl + Enter to run
                            if ((e.shiftKey || e.ctrlKey) && e.key === 'Enter') {
                              e.preventDefault();
                              handleRunCell(idx, currentCode);
                            }
                            // Tab indentation (4 spaces)
                            if (e.key === 'Tab') {
                              e.preventDefault();
                              const start = e.target.selectionStart;
                              const end = e.target.selectionEnd;
                              const val = e.target.value;
                              const newVal = val.substring(0, start) + '    ' + val.substring(end);
                              setCellCodes(prev => ({ ...prev, [idx]: newVal }));
                              setTimeout(() => {
                                e.target.selectionStart = e.target.selectionEnd = start + 4;
                              }, 0);
                            }
                          }}
                          spellCheck="false"
                          className="w-full bg-slate-950 p-4 text-xs font-mono text-slate-100 placeholder-slate-600 focus:outline-none focus:ring-1 focus:ring-blue-500/40 resize-y leading-relaxed border-0"
                          placeholder={isEs ? '# Escribe o edita código Python aquí...' : '# Type or edit Python code here...'}
                        />
                        <div className="absolute right-3 bottom-2 text-[10px] font-mono text-slate-600 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity">
                          Shift + Enter {isEs ? 'para ejecutar' : 'to run'}
                        </div>
                      </div>

                      {/* Output Console (if run) */}
                      {output && (
                        <div className="border-t border-slate-800/80 p-3 bg-slate-900/90 space-y-2">
                          <div className="flex items-center justify-between text-[11px]">
                            <span className="font-mono text-slate-400">Out [{idx + 1}]:</span>
                            <span className="font-mono text-[10px] text-slate-500">
                              {output.elapsed}ms ({output.engine})
                            </span>
                          </div>

                          {output.stdout && (
                            <pre className="p-2.5 rounded-lg bg-slate-950 border border-slate-800 font-mono text-xs text-emerald-300 whitespace-pre-wrap">
                              {output.stdout}
                            </pre>
                          )}

                          {!output.success && output.error && (
                            <div className="p-3 rounded-lg bg-rose-500/10 border border-rose-500/30 text-rose-300 space-y-1 text-xs">
                              <div className="flex items-center gap-1.5 font-bold">
                                <AlertCircle className="w-3.5 h-3.5" />
                                <span>{output.error.type}</span>
                              </div>
                              <p className="text-[11px] text-rose-200">{output.error.summary}</p>
                              <pre className="font-mono text-[10px] text-rose-400 bg-slate-950/60 p-2 rounded mt-1 overflow-x-auto">
                                {output.error.details}
                              </pre>
                            </div>
                          )}
                        </div>
                      )}
                    </div>
                  );
                }

                return null;
              })}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

// Resolves attachment:filename or raw data URI
function resolveImageSrc(src, attachments) {
  if (!src) return '';
  const trimmed = src.trim();
  if (trimmed.startsWith('attachment:')) {
    const filename = trimmed.replace('attachment:', '').trim();
    if (attachments && attachments[filename]) {
      const mimeTypes = Object.keys(attachments[filename]);
      if (mimeTypes.length > 0) {
        const mime = mimeTypes[0];
        const base64Data = attachments[filename][mime];
        return `data:${mime};base64,${base64Data}`;
      }
    }
  }
  return trimmed;
}

// Graceful notebook image renderer with fallback placeholder
function NotebookImage({ src, alt }) {
  const [hasError, setHasError] = useState(false);

  if (hasError || !src) {
    return (
      <div className="my-3 p-3 rounded-xl bg-slate-950/80 border border-slate-800 text-slate-400 flex items-center gap-2 text-xs font-mono">
        <ImageIcon className="w-4 h-4 text-slate-500 shrink-0" />
        <span className="font-semibold text-slate-300 truncate max-w-sm">{alt || 'Notebook Graphic'}</span>
        <span className="text-[10px] text-slate-500">({hasError ? 'Embedded graphic' : 'No source'})</span>
      </div>
    );
  }

  return (
    <div className="my-3 rounded-xl overflow-hidden bg-slate-950/60 border border-slate-800 p-1 flex flex-col items-center">
      <img
        src={src}
        alt={alt || 'Notebook graphic'}
        onError={() => setHasError(true)}
        loading="lazy"
        className="max-w-full rounded-lg max-h-96 object-contain shadow-md"
      />
      {alt && (
        <span className="text-[10px] text-slate-500 font-mono mt-1 px-2 text-center truncate max-w-md">
          {alt}
        </span>
      )}
    </div>
  );
}

// Tokenizes inline code, bold, links, and text
function parseFormattedText(text) {
  if (!text) return '';
  const tokenRegex = /(`[^`]+`|\*\*[^*]+\*\*|\[[^\]]+\]\([^)]+\))/g;
  const parts = text.split(tokenRegex);

  return parts.map((part, i) => {
    if (!part) return null;
    if (part.startsWith('`') && part.endsWith('`')) {
      return (
        <code key={i} className="px-1.5 py-0.5 mx-0.5 rounded bg-slate-950 border border-slate-800 font-mono text-emerald-300 text-[11px]">
          {part.slice(1, -1)}
        </code>
      );
    }
    if (part.startsWith('**') && part.endsWith('**')) {
      return (
        <strong key={i} className="text-white font-bold">
          {part.slice(2, -2)}
        </strong>
      );
    }
    const linkMatch = part.match(/^\[([^\]]+)\]\(([^)]+)\)$/);
    if (linkMatch) {
      return (
        <a
          key={i}
          href={linkMatch[2]}
          target="_blank"
          rel="noopener noreferrer"
          className="text-blue-400 hover:text-blue-300 underline font-medium"
        >
          {linkMatch[1]}
        </a>
      );
    }
    return part;
  });
}

// Splices markdown image tags ![alt](src) and formatted text
function renderInline(text, attachments) {
  if (!text) return null;

  const imageRegex = /!\[(.*?)\]\((.*?)\)/g;
  const parts = [];
  let lastIndex = 0;
  let match;

  while ((match = imageRegex.exec(text)) !== null) {
    if (match.index > lastIndex) {
      parts.push({ type: 'text', content: text.substring(lastIndex, match.index) });
    }
    const alt = match[1];
    const rawSrc = match[2];
    const resolvedSrc = resolveImageSrc(rawSrc, attachments);
    parts.push({ type: 'image', alt, src: resolvedSrc });
    lastIndex = match.index + match[0].length;
  }

  if (lastIndex < text.length) {
    parts.push({ type: 'text', content: text.substring(lastIndex) });
  }

  return parts.map((part, idx) => {
    if (part.type === 'image') {
      return <NotebookImage key={idx} src={part.src} alt={part.alt} />;
    }
    return <span key={idx}>{parseFormattedText(part.content)}</span>;
  });
}

// Markdown parser supporting code blocks, images, attachments, and formatting
function MarkdownPreview({ content, attachments }) {
  const lines = content.split('\n');
  const rendered = [];
  let inCodeBlock = false;
  let codeBlockLines = [];

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];
    const trimmed = line.trim();

    if (trimmed.startsWith('```')) {
      if (inCodeBlock) {
        rendered.push(
          <pre key={`code-${i}`} className="p-3 my-2 rounded-xl bg-slate-950 border border-slate-800 text-xs font-mono text-emerald-300 overflow-x-auto custom-scroll leading-relaxed">
            <code>{codeBlockLines.join('\n')}</code>
          </pre>
        );
        inCodeBlock = false;
        codeBlockLines = [];
      } else {
        inCodeBlock = true;
      }
      continue;
    }

    if (inCodeBlock) {
      codeBlockLines.push(line);
      continue;
    }

    if (trimmed.startsWith('# ')) {
      rendered.push(<h1 key={i} className="text-lg font-extrabold text-white mt-3 mb-1">{parseFormattedText(trimmed.replace('# ', ''))}</h1>);
      continue;
    }
    if (trimmed.startsWith('## ')) {
      rendered.push(<h2 key={i} className="text-base font-bold text-slate-100 mt-2.5 mb-1">{parseFormattedText(trimmed.replace('## ', ''))}</h2>);
      continue;
    }
    if (trimmed.startsWith('### ')) {
      rendered.push(<h3 key={i} className="text-sm font-semibold text-blue-300 mt-2 mb-0.5">{parseFormattedText(trimmed.replace('### ', ''))}</h3>);
      continue;
    }
    if (trimmed.startsWith('> ')) {
      rendered.push(
        <div key={i} className="border-l-2 border-amber-500 pl-3 py-1 text-amber-200 bg-amber-500/10 rounded-r text-xs my-2">
          {renderInline(trimmed.replace('> ', ''), attachments)}
        </div>
      );
      continue;
    }
    if (trimmed.startsWith('- ') || trimmed.startsWith('* ')) {
      rendered.push(
        <div key={i} className="flex items-start gap-2 text-slate-300 pl-2 text-xs">
          <span className="text-blue-400 font-bold">•</span>
          <span>{renderInline(trimmed.substring(2), attachments)}</span>
        </div>
      );
      continue;
    }

    if (!trimmed) {
      rendered.push(<div key={i} className="h-1.5" />);
      continue;
    }

    rendered.push(
      <p key={i} className="text-slate-300 text-xs leading-relaxed">
        {renderInline(line, attachments)}
      </p>
    );
  }

  if (inCodeBlock && codeBlockLines.length > 0) {
    rendered.push(
      <pre key="code-unclosed" className="p-3 my-2 rounded-xl bg-slate-950 border border-slate-800 text-xs font-mono text-emerald-300 overflow-x-auto custom-scroll leading-relaxed">
        <code>{codeBlockLines.join('\n')}</code>
      </pre>
    );
  }

  return <div className="space-y-1.5">{rendered}</div>;
}
