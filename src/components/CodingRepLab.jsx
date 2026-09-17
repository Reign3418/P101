import React, { useState, useEffect } from 'react';

export function CodingRepLab({ repData, onExecuteCode, onCompleteRep, pyodideReady }) {
  const [code, setCode] = useState(repData ? repData.starter : '');
  const [prompt, setPrompt] = useState(repData ? repData.prompt : '');
  const [testVar, setTestVar] = useState(repData ? repData.test_var : null);
  const [expectedVal, setExpectedVal] = useState(repData ? repData.expected_val : null);
  const [result, setResult] = useState(null);
  const [isRunning, setIsRunning] = useState(false);
  const [repCount, setRepCount] = useState(0);

  // Sync state if section changes
  useEffect(() => {
    if (repData) {
      setCode(repData.starter);
      setPrompt(repData.prompt);
      setTestVar(repData.test_var);
      setExpectedVal(repData.expected_val);
      setResult(null);
    }
  }, [repData]);

  if (!repData) return null;

  // Randomized Rep Generator!
  const rollRandomRep = () => {
    setResult(null);
    const names = [["Grace", "Hopper"], ["Alan", "Turing"], ["Guido", "van Rossum"], ["Ada", "Lovelace"], ["Katherine", "Johnson"]];
    const pickedName = names[Math.floor(Math.random() * names.length)];
    const randNum1 = Math.floor(Math.random() * 80) + 20;
    const randNum2 = Math.floor(Math.random() * 8) + 2;

    if (testVar === 'full_name') {
      const newExp = `${pickedName[0]} ${pickedName[1]}`;
      setPrompt(`Combine first='${pickedName[0]}' and last='${pickedName[1]}' into full_name='${newExp}'.`);
      setCode(`first = '${pickedName[0]}'
last = '${pickedName[1]}'
full_name = f'{first} {last}'
print(full_name)`);
      setExpectedVal(newExp);
    } else if (testVar === 'total') {
      const newPrice = Math.floor(Math.random() * 20) + 5;
      const newQty = Math.floor(Math.random() * 6) + 2;
      const newExp = String(newPrice * newQty * 1.0);
      setPrompt(`Given str_qty = '${newQty}' and price = ${newPrice}.0, calculate total = int(str_qty) * price.`);
      setCode(`str_qty = '${newQty}'
price = ${newPrice}.0
total = int(str_qty) * price
print(total)`);
      setExpectedVal(newExp);
    } else if (testVar === 'rem') {
      const dividend = Math.floor(Math.random() * 70) + 30;
      const divisor = Math.floor(Math.random() * 7) + 3;
      const newExp = String(dividend % divisor);
      setPrompt(`Find remainder of ${dividend} divided by ${divisor} and store in 'rem'.`);
      setCode(`rem = ${dividend} % ${divisor}
print(rem)`);
      setExpectedVal(newExp);
    } else {
      // General random variation
      setCode(repData.starter + `\n# Rep #${repCount + 1}`);
    }
    setRepCount(prev => prev + 1);
  };

  const handleRun = async () => {
    setIsRunning(true);
    const res = await onExecuteCode(code, testVar, expectedVal);
    setResult(res);
    setIsRunning(false);

    if (res.passed) {
      onCompleteRep();
    }
  };

  const handleReset = () => {
    setCode(repData.starter);
    setResult(null);
  };

  return (
    <div className="bg-slate-950 border-2 border-purple-500/40 rounded-2xl p-4 md:p-5 space-y-3 shadow-lg">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-purple-500/20 pb-2.5">
        <div className="flex items-center gap-2">
          <span className="px-2 py-0.5 rounded bg-purple-500/20 text-purple-300 font-bold font-mono text-[11px] uppercase border border-purple-500/30">
            🏋️ Coding Reps Lab
          </span>
          <span className="text-xs font-bold text-white">{repData.title}</span>
        </div>

        <div className="flex items-center gap-2">
          {/* Roll New Randomized Rep Button */}
          <button
            onClick={rollRandomRep}
            className="px-2.5 py-1 rounded-lg bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-xs shadow flex items-center gap-1 transition-all"
            title="Generate fresh randomized inputs to test your logic"
          >
            <span>🎲</span>
            <span>New Random Rep</span>
          </button>

          {/* Run Python Rep Button */}
          <button
            onClick={handleRun}
            disabled={isRunning}
            className="px-3 py-1 rounded-lg bg-purple-600 hover:bg-purple-500 text-white font-bold text-xs shadow transition-all flex items-center gap-1.5 disabled:opacity-50"
          >
            <span>{isRunning ? '⏳' : '▶'}</span>
            <span>{isRunning ? 'Running...' : 'Run with Python'}</span>
          </button>

          <button
            onClick={handleReset}
            className="text-[11px] text-slate-400 hover:text-white px-2 py-1 rounded bg-slate-900 border border-slate-800 transition-colors"
          >
            Reset
          </button>
        </div>
      </div>

      <p className="text-xs font-medium text-purple-200 leading-relaxed">
        {prompt}
      </p>

      {/* Code Editor */}
      <div className="relative">
        <textarea
          rows="4"
          spellCheck="false"
          value={code}
          onChange={(e) => setCode(e.target.value)}
          className="w-full bg-slate-900/90 border border-slate-700 rounded-xl p-3 code-font text-xs text-purple-300 focus:outline-none focus:border-purple-400 transition-all"
        />
      </div>

      {/* Result & Evaluation Panel */}
      {result && (
        <div className="space-y-2 pt-1">
          {result.passed ? (
            <div className="p-3.5 rounded-xl bg-emerald-500/15 border-2 border-emerald-500/40 space-y-1.5">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-emerald-300 flex items-center gap-1.5">
                  <span>🎉</span> Rep Completed! Test Case Passed!
                </span>
                <span className="text-[10px] bg-emerald-500/20 text-emerald-300 font-bold px-2 py-0.5 rounded font-mono">
                  {result.elapsed}ms • {result.engine}
                </span>
              </div>
              {result.stdout && (
                <div className="p-2 bg-slate-950/80 rounded-lg text-emerald-300/90 text-xs font-mono">
                  &gt; {result.stdout}
                </div>
              )}
              <p className="text-xs text-emerald-100/90">
                Target variable <code>{testVar}</code> evaluated to <code>{result.actualVal}</code>. Muscle memory rep logged!
              </p>
            </div>
          ) : (
            <div className="p-3.5 rounded-xl bg-rose-500/15 border-2 border-rose-500/40 space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-rose-300 flex items-center gap-1.5">
                  <span>❌</span> Rep Failed / Needs Review
                </span>
                <span className="text-[10px] bg-rose-500/20 text-rose-300 font-bold px-2 py-0.5 rounded font-mono">
                  {result.elapsed}ms
                </span>
              </div>

              {result.error ? (
                <div className="space-y-1 text-xs">
                  <div className="font-bold text-rose-300">{result.error.type}:</div>
                  <div className="text-rose-100/90">{result.error.summary}</div>
                  <pre className="text-[11px] text-rose-300/80 p-2 bg-slate-950/80 rounded overflow-x-auto">
                    {result.rawError}
                  </pre>
                </div>
              ) : (
                <div className="text-xs text-rose-200 space-y-1">
                  <div>Expected <code>{testVar} = {expectedVal}</code></div>
                  <div>Got: <code>{testVar} = {result.actualVal || 'undefined'}</code></div>
                </div>
              )}
            </div>
          )}
        </div>
      )}
    </div>
  );
}
