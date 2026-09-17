import React, { useState } from 'react';

export function ConceptBox({ section, onRunCode }) {
  const [copied, setCopied] = useState(false);
  const [terminalOutput, setTerminalOutput] = useState(null);

  const handleCopy = () => {
    navigator.clipboard.writeText(section.code);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  };

  const handleRun = () => {
    setTerminalOutput(section.expected_output || "Executed successfully.");
  };

  return (
    <div className="space-y-3">
      {/* Concept Narrative */}
      <div>
        <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400 block mb-1">
          Key Mechanics &amp; Rules:
        </span>
        <p className="text-xs md:text-sm text-slate-300 leading-relaxed">
          {section.concept}
        </p>
      </div>

      {/* Code Example Box */}
      <div className="space-y-1.5">
        <div className="flex items-center justify-between text-xs text-slate-400">
          <span className="font-bold uppercase tracking-wider text-[11px]">Reference Python Code:</span>
          <div className="flex items-center gap-2">
            <button
              onClick={handleRun}
              className="text-[11px] text-white font-bold bg-emerald-600 hover:bg-emerald-500 px-2.5 py-1 rounded-lg transition-colors flex items-center gap-1"
            >
              <span>▶</span> Run Snippet
            </button>
            <button
              onClick={handleCopy}
              className="text-[11px] text-blue-400 hover:text-blue-300 font-mono bg-slate-800 px-2.5 py-1 rounded border border-slate-700 transition-colors"
            >
              {copied ? 'Copied! ✓' : 'Copy'}
            </button>
          </div>
        </div>

        <pre className="p-3.5 bg-slate-950 border border-slate-800 rounded-xl overflow-x-auto code-font text-xs text-emerald-400 leading-relaxed">
          <code>{section.code}</code>
        </pre>

        {/* Output Console */}
        {terminalOutput && (
          <div className="p-3 bg-slate-950/90 border border-slate-800 rounded-xl font-mono text-xs space-y-1">
            <div className="flex items-center justify-between text-slate-500 text-[10px] border-b border-slate-800/80 pb-1">
              <span>Terminal Output:</span>
              <span className="text-emerald-400">Exit Code: 0</span>
            </div>
            <div className="text-slate-200 whitespace-pre-wrap pt-1 text-[11px] font-mono">
              <div className="text-slate-500">&gt; python script.py</div>
              <div className="text-emerald-300 font-semibold">{terminalOutput}</div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
