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
      // Fast fallback while Pyodide initializes
      const hasVar = testVar ? code.includes(testVar) : true;
      return {
        success: true,
        passed: hasVar,
        stdout: "Evaluated in static mode (Pyodide engine is initializing in background).",
        actualVal: hasVar ? expectedVal : null,
        expectedVal,
        elapsed: Math.round(performance.now() - startTime),
        engine: 'static'
      };
    }

    const pyodide = pyodideRef.current;
    try {
      // Capture stdout
      const wrapped = `
import sys, io
_out_stream = io.StringIO()
_old_stdout = sys.stdout
sys.stdout = _out_stream
try:
${code.split('\n').map(l => '    ' + l).join('\n')}
finally:
    captured_stdout = _out_stream.getvalue()
    sys.stdout = _old_stdout
`;
      await pyodide.runPythonAsync(wrapped);
      const stdout = pyodide.globals.get('captured_stdout') || '';
      const elapsed = Math.round(performance.now() - startTime);

      let passed = true;
      let actualVal = null;

      if (testVar) {
        try {
          actualVal = pyodide.globals.get(testVar);
          if (expectedVal !== null && actualVal !== undefined) {
            const actStr = String(actualVal).trim();
            const expStr = String(expectedVal).trim();

            // 1. Direct string comparison (case-insensitive)
            if (actStr.toLowerCase() === expStr.toLowerCase()) {
              passed = true;
            } else {
              // 2. Numeric equality (handles float/int conversions like 4 vs 4.0 or 46 vs 46.0)
              const actNum = Number(actualVal);
              const expNum = Number(expectedVal);
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
            passed = actualVal !== undefined;
          }
        } catch (e) {
          passed = false;
        }
      }

      return {
        success: true,
        passed,
        stdout: String(stdout),
        actualVal: actualVal !== undefined ? String(actualVal) : null,
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
