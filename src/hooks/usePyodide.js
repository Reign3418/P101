import { useState, useEffect, useRef } from 'react';

export function usePyodide() {
  const [isReady, setIsReady] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const pyodideRef = useRef(null);

  useEffect(() => {
    let mounted = true;

    async function loadEngine() {
      try {
        if (!window.loadPyodide) {
          let attempts = 0;
          while (!window.loadPyodide && attempts < 40) {
            await new Promise(r => setTimeout(r, 250));
            attempts++;
          }
          if (!window.loadPyodide) {
            throw new Error("Pyodide script not detected on window.");
          }
        }

        const pyodide = await window.loadPyodide({
          indexURL: "https://cdn.jsdelivr.net/pyodide/v0.26.2/full/"
        });

        if (mounted) {
          pyodideRef.current = pyodide;
          setIsReady(true);
          setIsLoading(false);
        }
      } catch (err) {
        if (mounted) {
          console.warn("Pyodide loading notice:", err);
          setError(err.message);
          setIsLoading(false);
        }
      }
    }

    loadEngine();

    return () => { mounted = false; };
  }, []);

  const executeCode = async (code, testVar = null, expectedVal = null) => {
    const startTime = performance.now();

    if (!pyodideRef.current) {
      // Engine not ready — block grading entirely to prevent false-pass
      return {
        success: false,
        passed: false,
        stdout: '',
        actualVal: null,
        expectedVal,
        elapsed: Math.round(performance.now() - startTime),
        engine: 'pending',
        pendingMessage: 'Python engine is still loading. Please wait a moment and try again.'
      };
    }

    const pyodide = pyodideRef.current;
    try {
      // Auto-load packages like numpy, scipy, matplotlib on demand if imported
      if (pyodide.loadPackagesFromImports) {
        try {
          await pyodide.loadPackagesFromImports(code);
        } catch (pkgErr) {
          console.warn("Pyodide package autoload notice:", pkgErr);
        }
      }

      // Run user code in an isolated namespace to prevent global bleed between reps/cells
      const sandboxSetup = `
import sys, io, builtins
_p101_sandbox = {}
_p101_out = io.StringIO()
_p101_old_stdout = sys.stdout
sys.stdout = _p101_out
try:
    exec(compile(${JSON.stringify(code)}, '<rep>', 'exec'), {'__builtins__': builtins, **_p101_sandbox}, _p101_sandbox)
finally:
    _p101_captured = _p101_out.getvalue()
    sys.stdout = _p101_old_stdout
`;
      await pyodide.runPythonAsync(sandboxSetup);
      const stdout = pyodide.globals.get('_p101_captured') || '';
      const elapsed = Math.round(performance.now() - startTime);

      let passed = true;
      let actualVal = null;

      if (testVar) {
        try {
          // Read from the sandbox dict, not global namespace
          const sandbox = pyodide.globals.get('_p101_sandbox');
          actualVal = sandbox && sandbox.get ? sandbox.get(testVar) : pyodide.globals.get(testVar);
          if (expectedVal !== null && actualVal !== undefined) {
            const actStr = String(actualVal).trim();
            const expStr = String(expectedVal).trim();

            // 1. Direct string comparison (case-insensitive)
            if (actStr.toLowerCase() === expStr.toLowerCase()) {
              passed = true;
            } else {
              // 2. Numeric equality (handles float/int like 4 vs 4.0, 60.0 vs 60.00)
              const actNum = parseFloat(actStr);
              const expNum = parseFloat(expStr);
              if (!isNaN(actNum) && !isNaN(expNum) && Math.abs(actNum - expNum) < 0.0001) {
                passed = true;
              } else {
                // 3. Normalized list/collection representations (quotes and spacing)
                const normAct = actStr.replace(/"/g, "'").replace(/\s*,\s*/g, ', ');
                const normExp = expStr.replace(/"/g, "'").replace(/\s*,\s*/g, ', ');
                if (normAct.toLowerCase() === normExp.toLowerCase()) {
                  passed = true;
                } else {
                  passed = false;
                }
              }
            }
          } else {
            passed = actualVal !== undefined && actualVal !== null;
          }
        } catch (e) {
          passed = false;
        }
      }

      return {
        success: true,
        passed,
        stdout: String(stdout),
        actualVal: actualVal !== undefined && actualVal !== null ? String(actualVal) : null,
        expectedVal: expectedVal ? String(expectedVal) : null,
        elapsed,
        engine: 'pyodide'
      };
    } catch (err) {
      const elapsed = Math.round(performance.now() - startTime);
      return {
        success: false,
        passed: false,
        error: parsePythonError(err.message),
        rawError: err.message,
        elapsed,
        engine: 'pyodide'
      };
    }
  };

  return { isReady, isLoading, error, executeCode };
}

function parsePythonError(msg) {
  if (msg.includes('SyntaxError')) {
    return {
      type: 'SyntaxError',
      summary: 'Python could not understand your syntax. Check for missing colons (:), unclosed quotes, or unbalanced parentheses ().',
      details: msg
    };
  }
  if (msg.includes('IndentationError')) {
    return {
      type: 'IndentationError',
      summary: 'Indentation mismatch. In Python, blocks inside if statements, loops, or functions must be consistently indented with 4 spaces.',
      details: msg
    };
  }
  if (msg.includes('TypeError')) {
    return {
      type: 'TypeError',
      summary: 'Data type mismatch (e.g. attempting to do math on a string or calling a non-function). Convert your values!',
      details: msg
    };
  }
  if (msg.includes('NameError')) {
    return {
      type: 'NameError',
      summary: 'A variable or function was referenced before it was defined or misspelled.',
      details: msg
    };
  }
  if (msg.includes('ZeroDivisionError')) {
    return {
      type: 'ZeroDivisionError',
      summary: 'Division by zero is mathematically undefined. Guard against zero inputs!',
      details: msg
    };
  }
  return {
    type: 'RuntimeError',
    summary: 'Execution encountered an unexpected issue.',
    details: msg
  };
}
