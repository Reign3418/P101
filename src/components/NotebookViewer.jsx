import React, { useState, useRef } from 'react';
import { Play, Copy, Check, Upload, Trash2, FileText, ShieldCheck, Sparkles, AlertCircle } from 'lucide-react';

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
        '> **Pro-Tip**: Click **"Run Cell"** on any code block below to execute it in your browser with Pyodide!'
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
        '> **Consejo Pro**: Haz clic en **"Ejecutar Celda"** en cualquier bloque de código para probarlo en vivo con Pyodide.'
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
        'print(f"Elementos del menú: {list(menu.keys())}")'
      ]
    },
    {
      cell_type: 'markdown',
      source: [
        '### Paso 2: Procesar Pedidos y Aplicar Reglas Comerciales\n',
        'A continuación procesamos los pedidos de los clientes. Si el pedido supera $8.00, aplicamos un **10% de descuento estudiantil / militar**.'
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
        '            print(f"Aviso: {item} está agotado.")\n',
        '            \n',
        '    descuento = 0.0\n',
        '    if es_estudiante_o_veterano and total >= 8.0:\n',
        '        descuento = total * 0.10\n',
        '        print(f"Descuento del 10% aplicado: -${descuento:.2f}")\n',
        '        \n',
        '    total_final = total - descuento\n',
        '    return round(total_final, 2)\n',
        '\n',
        'mi_pedido = ["latte", "cappuccino"]\n',
        'monto_a_pagar = calcular_cuenta(mi_pedido, es_estudiante_o_veterano=True)\n',
        'print(f"Monto total a pagar: ${monto_a_pagar:.2f}")'
      ]
    }
  ]
};

export function NotebookViewer({ 
  notebooks, 
  activeNotebookId, 
  onSelectNotebook, 
  onAddNotebook, 
  onDeleteNotebook,
  onExecuteCode,
  pyodideReady,
  t,
  lang = 'en'
}) {
  const [cellOutputs, setCellOutputs] = useState({});
  const [cellRunning, setCellRunning] = useState({});
  const [copiedCell, setCopiedCell] = useState(null);
  const [dragOver, setDragOver] = useState(false);
  const fileInputRef = useRef(null);

  const sampleNotebook = lang === 'es' ? SAMPLE_NOTEBOOK_ES : SAMPLE_NOTEBOOK_EN;
  const activeNotebook = notebooks.find(n => n.id === activeNotebookId) || notebooks[0] || null;

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

  const handleRunCell = async (cellIndex, code) => {
    setCellRunning(prev => ({ ...prev, [cellIndex]: true }));
    const result = await onExecuteCode(code);
    setCellRunning(prev => ({ ...prev, [cellIndex]: false }));
    setCellOutputs(prev => ({
      ...prev,
      [cellIndex]: result
    }));
  };

  const handleCopyCode = (cellIndex, code) => {
    navigator.clipboard.writeText(code);
    setCopiedCell(cellIndex);
    setTimeout(() => setCopiedCell(null), 1800);
  };

  const formatSource = (src) => {
    if (Array.isArray(src)) return src.join('');
    return String(src || '');
  };

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
        <div className="flex items-center gap-2">
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
            className="px-3 py-1.5 rounded-lg bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs flex items-center gap-1.5 shadow-lg shadow-blue-600/20 transition-all"
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
                <span className="max-w-[160px] truncate">{nb.name}</span>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    onDeleteNotebook(nb.id);
                  }}
                  className="text-slate-500 hover:text-rose-400 p-0.5 ml-1"
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

            <div className="flex items-center justify-center gap-3 pt-2">
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
              <div>
                <span className="text-[10px] font-mono text-blue-400 uppercase tracking-wider font-bold">
                  {t ? t('activeNotebook') : 'Active Notebook:'} {activeNotebook.name}
                </span>
                <h2 className="text-xl font-bold text-white mt-0.5">{activeNotebook.title}</h2>
                <span className="text-xs text-slate-400">
                  {activeNotebook.cells.length} {t ? t('totalCells') : 'Total Cells'} ({activeNotebook.cells.filter(c => c.cell_type === 'code').length} {t ? t('executableCells') : 'Executable Code Cells'})
                </span>
              </div>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => fileInputRef.current?.click()}
                  className="px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs border border-slate-700 flex items-center gap-1.5"
                >
                  <Upload className="w-3 h-3" />
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
                      className="p-4 rounded-xl bg-slate-900/40 border border-slate-800/60 text-slate-200 text-xs leading-relaxed space-y-2 prose prose-invert max-w-none"
                    >
                      <MarkdownPreview content={src} />
                    </div>
                  );
                }

                if (cell.cell_type === 'code') {
                  const output = cellOutputs[idx];
                  const isRunning = cellRunning[idx] || false;

                  return (
                    <div 
                      key={idx}
                      className="rounded-2xl border border-slate-800 bg-slate-900 shadow-md overflow-hidden space-y-0"
                    >
                      {/* Code Cell Header */}
                      <div className="bg-slate-950/80 px-4 py-2 border-b border-slate-800 flex items-center justify-between text-xs">
                        <span className="text-[11px] font-mono text-blue-400 font-bold">
                          In [{idx + 1}]:
                        </span>
                        <div className="flex items-center gap-2">
                          <button
                            onClick={() => handleCopyCode(idx, src)}
                            className="px-2 py-1 rounded text-[11px] font-mono bg-slate-800 hover:bg-slate-700 text-slate-300 border border-slate-700 flex items-center gap-1"
                          >
                            {copiedCell === idx ? <Check className="w-3 h-3 text-emerald-400" /> : <Copy className="w-3 h-3" />}
                            <span>{copiedCell === idx ? (t ? t('copiedCode') : 'Copied') : (t ? t('copyCode') : 'Copy')}</span>
                          </button>
                          <button
                            onClick={() => handleRunCell(idx, src)}
                            disabled={isRunning}
                            className="px-3 py-1 rounded-lg bg-emerald-600 hover:bg-emerald-500 disabled:opacity-50 text-white font-bold text-xs flex items-center gap-1.5 shadow transition-all"
                          >
                            <Play className="w-3 h-3 fill-current" />
                            <span>{isRunning ? (t ? t('running') : 'Running...') : (t ? t('runCell') : 'Run Cell')}</span>
                          </button>
                        </div>
                      </div>

                      {/* Code Text */}
                      <pre className="p-4 text-xs font-mono text-slate-200 bg-slate-950 overflow-x-auto custom-scroll leading-relaxed whitespace-pre">
                        <code>{src}</code>
                      </pre>

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

// Simple lightweight markdown parser for cell text
function MarkdownPreview({ content }) {
  const lines = content.split('\n');
  return (
    <div className="space-y-2">
      {lines.map((line, i) => {
        const trimmed = line.trim();
        if (trimmed.startsWith('# ')) {
          return <h1 key={i} className="text-lg font-extrabold text-white">{trimmed.replace('# ', '')}</h1>;
        }
        if (trimmed.startsWith('## ')) {
          return <h2 key={i} className="text-base font-bold text-slate-100">{trimmed.replace('## ', '')}</h2>;
        }
        if (trimmed.startsWith('### ')) {
          return <h3 key={i} className="text-sm font-semibold text-blue-300">{trimmed.replace('### ', '')}</h3>;
        }
        if (trimmed.startsWith('> ')) {
          return (
            <div key={i} className="border-l-2 border-amber-500 pl-3 py-1 text-amber-200 bg-amber-500/10 rounded-r text-[11px]">
              {trimmed.replace('> ', '')}
            </div>
          );
        }
        if (trimmed.startsWith('- ') || trimmed.startsWith('* ')) {
          return (
            <div key={i} className="flex items-start gap-2 text-slate-300 pl-2">
              <span className="text-blue-400 font-bold">•</span>
              <span>{trimmed.substring(2)}</span>
            </div>
          );
        }
        if (!trimmed) {
          return <div key={i} className="h-1" />;
        }
        return <p key={i} className="text-slate-300 leading-relaxed">{line}</p>;
      })}
    </div>
  );
}
