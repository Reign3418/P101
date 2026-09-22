import React, { useState, useEffect } from 'react';

export function CodingRepLab({ 
  repData, 
  onExecuteCode, 
  onCompleteRep, 
  pyodideReady, 
  t, 
  lang = 'en',
  onViewRepLog 
}) {
  const [code, setCode] = useState(repData ? repData.starter : '');
  const [prompt, setPrompt] = useState(repData ? (lang === 'es' && repData.prompt_es ? repData.prompt_es : repData.prompt) : '');
  const [testVar, setTestVar] = useState(repData ? repData.test_var : null);
  const [expectedVal, setExpectedVal] = useState(repData ? repData.expected_val : null);
  const [result, setResult] = useState(null);
  const [isRunning, setIsRunning] = useState(false);
  const [repCount, setRepCount] = useState(0);
  const [flashNew, setFlashNew] = useState(false);

  // Sync state if section or language changes
  useEffect(() => {
    if (repData) {
      setCode(repData.starter);
      setPrompt(lang === 'es' && repData.prompt_es ? repData.prompt_es : repData.prompt);
      setTestVar(repData.test_var);
      setExpectedVal(repData.expected_val);
      setResult(null);
      setRepCount(0);
      setFlashNew(false);
    }
  }, [repData, lang]);

  if (!repData) return null;

  // Randomized Rep Generator!
  const rollRandomRep = () => {
    setResult(null);
    const newCount = repCount + 1;
    setRepCount(newCount);
    setFlashNew(true);
    setTimeout(() => setFlashNew(false), 1200);

    const names = ["Maya", "Alex", "Jordan", "Sam", "Taylor", "Chris", "Elena", "Marcus", "Chloe"];
    const pickedName = names[Math.floor(Math.random() * names.length)];

    if (testVar === 'card') {
      const courses = ["Intro to Python", "Data Structures", "Cybersecurity", "Web Dev", "Database Design"];
      const course = courses[Math.floor(Math.random() * courses.length)];
      const room = Math.floor(Math.random() * 300) + 101;
      const expected = `${pickedName} is in ${course} (Room ${room})`;
      setPrompt(lang === 'es'
        ? `Crea student='${pickedName}', course='${course}', y room=${room}. Combínalos en card = f'{student} is in {course} (Room {room})'.`
        : `Create student='${pickedName}', course='${course}', and room=${room}. Combine into card = f'{student} is in {course} (Room {room})'.`);
      setCode(`student = '${pickedName}'\ncourse = '${course}'\nroom = ${room}\ncard = f'{student} is in {course} (Room {room})'\nprint(card)`);
      setExpectedVal(expected);
    } else if (testVar === 'clean_name') {
      const dirtyNames = ["   ada lovelace   ", "   alan turing   ", "   grace hopper   ", "   katherine johnson   ", "   guido van rossum   ", "   margaret hamilton   "];
      const raw = dirtyNames[Math.floor(Math.random() * dirtyNames.length)];
      const expected = raw.trim().split(' ').map(w => w.charAt(0).toUpperCase() + w.slice(1).toLowerCase()).join(' ');
      setPrompt(lang === 'es'
        ? `Dado raw = '${raw}', limpia espacios en blanco y aplica mayúsculas en 'clean_name'.`
        : `Given raw = '${raw}', clean whitespace and title-case into 'clean_name'.`);
      setCode(`raw = '${raw}'\nclean_name = raw.strip().title()\nprint(clean_name)`);
      setExpectedVal(expected);
    } else if (testVar === 'next_order') {
      const drinks = ["latte", "drip", "cold brew", "cappuccino", "espresso", "mocha", "americano", "chai"];
      const d1 = drinks[Math.floor(Math.random() * drinks.length)];
      let d2 = drinks[Math.floor(Math.random() * drinks.length)];
      while (d2 === d1) d2 = drinks[Math.floor(Math.random() * drinks.length)];
      const addDrink = "mocha";
      const insertDrink = "espresso";
      setPrompt(lang === 'es'
        ? `Comienza con orders = ['${d1}', '${d2}']. Agrega '${addDrink}' con append e inserta '${insertDrink}' en el índice 0. Guarda el primer elemento en 'next_order'.`
        : `Start with orders = ['${d1}', '${d2}']. Append '${addDrink}' and insert '${insertDrink}' at index 0. Store first item in 'next_order'.`);
      setCode(`orders = ['${d1}', '${d2}']\norders.append('${addDrink}')\norders.insert(0, '${insertDrink}')\nnext_order = orders[0]\nprint(next_order)`);
      setExpectedVal(insertDrink);
    } else if (testVar === 'watched') {
      const allMovies = [["Dune", "Shrek", "Arrival"], ["The Matrix", "Inception", "Interstellar"], ["Alien", "Blade Runner", "Gravity"], ["Spider-Man", "Batman", "Avengers"]];
      const pickedSet = allMovies[Math.floor(Math.random() * allMovies.length)];
      const expected = pickedSet[pickedSet.length - 1];
      const starterList = JSON.stringify(pickedSet);
      setPrompt(lang === 'es'
        ? `Dada watchlist = ${starterList}, extrae con pop la última película en 'watched'.`
        : `Given watchlist = ${starterList}, pop the last movie into 'watched'.`);
      setCode(`watchlist = ${starterList}\nwatched = watchlist.pop()\nprint(watched)`);
      setExpectedVal(expected);
    } else if (testVar === 'avg_miles') {
      const m1 = Math.floor(Math.random() * 150) + 70;
      const m2 = Math.floor(Math.random() * 150) + 70;
      const m3 = Math.floor(Math.random() * 150) + 70;
      const avg = String(Math.round(((m1 + m2 + m3) / 3) * 10) / 10);
      setPrompt(lang === 'es'
        ? `Dadas miles = [${m1}, ${m2}, ${m3}], calcula total = sum(miles) y promedio = round(total / len(miles), 1). Guarda en 'avg_miles'.`
        : `Given miles = [${m1}, ${m2}, ${m3}], calculate total = sum(miles) and average = round(total / len(miles), 1). Store average in 'avg_miles'.`);
      setCode(`miles = [${m1}, ${m2}, ${m3}]\ntotal = sum(miles)\navg_miles = round(total / len(miles), 1)\nprint(avg_miles)`);
      setExpectedVal(avg);
    } else if (testVar === 'preview') {
      const citySets = [
        ["Raleigh", "Richmond", "DC", "Philly", "NYC"],
        ["Atlanta", "Charlotte", "Durham", "Richmond", "DC"],
        ["Seattle", "Portland", "Boise", "Salt Lake", "Denver"]
      ];
      const picked = citySets[Math.floor(Math.random() * citySets.length)];
      const exp = JSON.stringify(picked.slice(0, 3));
      setPrompt(lang === 'es'
        ? `Dadas stops = ${JSON.stringify(picked)}, extrae las primeras 3 paradas en 'preview'.`
        : `Given stops = ${JSON.stringify(picked)}, slice the first 3 stops into 'preview'.`);
      setCode(`stops = ${JSON.stringify(picked)}\npreview = stops[:3]\nprint(preview)`);
      setExpectedVal(exp);
    } else if (testVar === 'available') {
      const menus = [
        { menu: ['muffin', 'bagel', 'scone'], item: 'bagel', exp: 'True' },
        { menu: ['croissant', 'danish', 'cookie'], item: 'croissant', exp: 'True' },
        { menu: ['donut', 'cinnamon roll', 'biscuit'], item: 'biscuit', exp: 'True' }
      ];
      const m = menus[Math.floor(Math.random() * menus.length)];
      setPrompt(lang === 'es'
        ? `Dado menu = ${JSON.stringify(m.menu)} e item = '${m.item}', comprueba si item in menu y asigna available=True.`
        : `Given menu = ${JSON.stringify(m.menu)} and item = '${m.item}', check if item in menu and set available=True.`);
      setCode(`menu = ${JSON.stringify(m.menu)}\nitem = '${m.item}'\navailable = item in menu\nprint(available)`);
      setExpectedVal(m.exp);
    } else if (testVar === 'drink_price') {
      const sizes = [
        { size: 'small', price: '3.0' },
        { size: 'medium', price: '4.0' },
        { size: 'large', price: '5.0' }
      ];
      const s = sizes[Math.floor(Math.random() * sizes.length)];
      setPrompt(lang === 'es'
        ? `Dado size='${s.size}', asigna price=3.00 para small, 4.00 para medium, 5.00 para large. Guarda en 'drink_price'.`
        : `Given size='${s.size}', set price=3.00 for small, 4.00 for medium, 5.00 for large. Store price in 'drink_price'.`);
      setCode(`size = '${s.size}'\nif size == 'small': drink_price = 3.00\nelif size == 'medium': drink_price = 4.00\nelse: drink_price = 5.00\nprint(drink_price)`);
      setExpectedVal(s.price);
    } else if (testVar === 'prof') {
      const profs = ["Jade Cao", "Alan Turing", "Grace Hopper", "Ada Lovelace"];
      const profName = profs[Math.floor(Math.random() * profs.length)];
      const seats = Math.floor(Math.random() * 20) + 15;
      setPrompt(lang === 'es'
        ? `Crea course = {'name': 'Python', 'seats': ${seats}}. Agrega la clave 'instructor' = '${profName}'. Guarda en 'prof'.`
        : `Create course = {'name': 'Python', 'seats': ${seats}}. Add key 'instructor' = '${profName}'. Store instructor in 'prof'.`);
      setCode(`course = {'name': 'Python', 'seats': ${seats}}\ncourse['instructor'] = '${profName}'\nprof = course['instructor']\nprint(prof)`);
      setExpectedVal(profName);
    } else if (testVar === 'total_fruit') {
      const a = Math.floor(Math.random() * 15) + 5;
      const b = Math.floor(Math.random() * 15) + 5;
      const o = Math.floor(Math.random() * 15) + 5;
      const sum = String(a + b + o);
      setPrompt(lang === 'es'
        ? `Dado stock = {'apples': ${a}, 'bananas': ${b}, 'oranges': ${o}}, suma todas las cantidades en 'total_fruit'.`
        : `Given stock = {'apples': ${a}, 'bananas': ${b}, 'oranges': ${o}}, sum all quantities into 'total_fruit'.`);
      setCode(`stock = {'apples': ${a}, 'bananas': ${b}, 'oranges': ${o}}\ntotal_fruit = sum(stock.values())\nprint(total_fruit)`);
      setExpectedVal(sum);
    } else if (testVar === 'cart_total') {
      const p1 = (Math.floor(Math.random() * 8) + 2) + 0.50;
      const p2 = (Math.floor(Math.random() * 15) + 5) + 0.25;
      const p3 = (Math.floor(Math.random() * 10) + 1) + 0.75;
      const sum = String(Math.round((p1 + p2 + p3) * 100) / 100);
      setPrompt(lang === 'es'
        ? `Suma prices = [${p1}, ${p2}, ${p3}] usando un bucle while en 'cart_total' redondeado a 2 decimales.`
        : `Sum prices = [${p1}, ${p2}, ${p3}] using a while loop into 'cart_total' rounded to 2 decimals.`);
      setCode(`prices = [${p1}, ${p2}, ${p3}]\ncart_total = 0.0\nidx = 0\nwhile idx < len(prices):\n    cart_total += prices[idx]\n    idx += 1\ncart_total = round(cart_total, 2)\nprint(cart_total)`);
      setExpectedVal(sum);
    } else if (testVar === 'total_miles') {
      const m1 = (Math.floor(Math.random() * 8) + 5) * 20;
      const m2 = (Math.floor(Math.random() * 8) + 5) * 20;
      const sum = String(m1 + m2);
      setPrompt(lang === 'es'
        ? `Dadas stops = [{'city': 'Raleigh', 'miles': ${m1}}, {'city': 'Richmond', 'miles': ${m2}}], calcula total_miles = sum(s['miles'] for s in stops).`
        : `Given stops = [{'city': 'Raleigh', 'miles': ${m1}}, {'city': 'Richmond', 'miles': ${m2}}], calculate total_miles = sum(s['miles'] for s in stops).`);
      setCode(`stops = [{'city': 'Raleigh', 'miles': ${m1}}, {'city': 'Richmond', 'miles': ${m2}}]\ntotal_miles = sum(s['miles'] for s in stops)\nprint(total_miles)`);
      setExpectedVal(sum);
    } else if (testVar === 'bill') {
      const prices = [30.0, 40.0, 50.0, 60.0, 80.0];
      const price = prices[Math.floor(Math.random() * prices.length)];
      const tips = [0.15, 0.20, 0.25];
      const tip = tips[Math.floor(Math.random() * tips.length)];
      const total = String(Math.round(price * (1 + tip) * 10) / 10);
      setPrompt(lang === 'es'
        ? `Escribe calc_bill(price, tip_pct=${tip}) que retorne round(price * (1 + tip_pct), 2). Guarda calc_bill(${price}) en 'bill'.`
        : `Write calc_bill(price, tip_pct=${tip}) that returns round(price * (1 + tip_pct), 2). Store calc_bill(${price}) in 'bill'.`);
      setCode(`def calc_bill(price, tip_pct=${tip}):\n    return round(price * (1 + tip_pct), 2)\nbill = calc_bill(${price})\nprint(bill)`);
      setExpectedVal(total);
    } else if (testVar === 'title') {
      const ranks = ["Captain", "Commander", "Doctor", "Professor", "Major"];
      const rank = ranks[Math.floor(Math.random() * ranks.length)];
      const exp = `${pickedName} (${rank})`;
      setPrompt(lang === 'es'
        ? `Escribe format_title(name, rank=None). Si rank existe, retorna f'{name} ({rank})', si no retorna name. Guarda format_title('${pickedName}', '${rank}') en 'title'.`
        : `Write format_title(name, rank=None). If rank, return f'{name} ({rank})', else return name. Store format_title('${pickedName}', '${rank}') in 'title'.`);
      setCode(`def format_title(name, rank=None):\n    if rank:\n        return f'{name} ({rank})'\n    return name\ntitle = format_title('${pickedName}', '${rank}')\nprint(title)`);
      setExpectedVal(exp);
    } else if (testVar === 'clean_record') {
      const recs = ["patient_data", "invoice_record", "system_event", "student_grade", "telemetry_log"];
      const rec = recs[Math.floor(Math.random() * recs.length)];
      setPrompt(lang === 'es'
        ? `Elimina el salto de línea final de raw = '${rec}\\\\n' y guarda en 'clean_record'.`
        : `Strip trailing newline from raw = '${rec}\\\\n' and store in 'clean_record'.`);
      setCode(`raw = '${rec}\\n'\nclean_record = raw.rstrip('\\n')\nprint(clean_record)`);
      setExpectedVal(rec);
    } else if (testVar === 'status') {
      const invalids = ["'abc'", "'invalid'", "'not_a_num'", "'ninety'"];
      const inv = invalids[Math.floor(Math.random() * invalids.length)];
      setPrompt(lang === 'es'
        ? `Intenta int(${inv}). Al ocurrir ValueError, asigna status='recovered'.`
        : `Try int(${inv}). On ValueError, set status='recovered'.`);
      setCode(`try:\n    val = int(${inv})\nexcept ValueError:\n    status = 'recovered'\nprint(status)`);
      setExpectedVal('recovered');
    } else if (testVar === 'st_name') {
      const majors = ["CS", "Data Science", "Cybersecurity", "Software Eng"];
      const major = majors[Math.floor(Math.random() * majors.length)];
      setPrompt(lang === 'es'
        ? `Crea la clase Student con __init__(self, name, major). Crea s = Student('${pickedName}', '${major}'). Guarda s.name en 'st_name'.`
        : `Create class Student with __init__(self, name, major). Create s = Student('${pickedName}', '${major}'). Store s.name in 'st_name'.`);
      setCode(`class Student:\n    def __init__(self, name, major):\n        self.name = name\n        self.major = major\ns = Student('${pickedName}', '${major}')\nst_name = s.name\nprint(st_name)`);
      setExpectedVal(pickedName);
    } else if (testVar === 'query') {
      const tables = ["Students", "Courses", "Faculty", "Employees"];
      const tbl = tables[Math.floor(Math.random() * tables.length)];
      const q = `SELECT * FROM ${tbl} WHERE major = ?`;
      setPrompt(lang === 'es'
        ? `Crea una cadena de consulta con marcador ?: sql = '${q}'. Guarda en 'query'.`
        : `Create query string with ? placeholder: sql = '${q}'. Store in 'query'.`);
      setCode(`query = '${q}'\nprint(query)`);
      setExpectedVal(q);
    } else {
      setCode(repData.starter + `\n# Rep #${newCount}`);
    }
  };

  const handleRun = async () => {
    setIsRunning(true);
    const res = await onExecuteCode(code, testVar, expectedVal);
    setResult(res);
    setIsRunning(false);

    if (res.passed && onCompleteRep) {
      onCompleteRep({
        testVar,
        actualVal: res.actualVal,
        elapsed: res.elapsed
      });
    }
  };

  const handleReset = () => {
    setCode(repData.starter);
    setPrompt(lang === 'es' && repData.prompt_es ? repData.prompt_es : repData.prompt);
    setTestVar(repData.test_var);
    setExpectedVal(repData.expected_val);
    setResult(null);
    setRepCount(0);
    setFlashNew(false);
  };

  const repTitle = lang === 'es' && repData.title_es ? repData.title_es : repData.title;

  return (
    <div className={`bg-slate-950 border-2 rounded-2xl p-4 md:p-5 space-y-3 shadow-lg transition-all ${
      flashNew ? 'border-indigo-400 ring-2 ring-indigo-400/50' : 'border-purple-500/40'
    }`}>
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-purple-500/20 pb-2.5">
        <div className="flex items-center gap-2">
          <span className="px-2 py-0.5 rounded bg-purple-500/20 text-purple-300 font-bold font-mono text-[11px] uppercase border border-purple-500/30">
            🏋️ {t ? t('interactiveWorkout') : 'Coding Reps Lab'}
          </span>
          <span className="text-xs font-bold text-white">{repTitle}</span>
          {repCount > 0 && (
            <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-indigo-500/20 text-indigo-300 border border-indigo-500/40 font-bold animate-pulse">
              Rep #{repCount} (Randomized)
            </span>
          )}
        </div>

        <div className="flex items-center gap-2">
          {/* Roll New Randomized Rep Button */}
          <button
            onClick={rollRandomRep}
            className="px-2.5 py-1 rounded-lg bg-indigo-600 hover:bg-indigo-500 active:scale-95 text-white font-bold text-xs shadow flex items-center gap-1 transition-all"
            title="Generate fresh randomized inputs to test your logic"
          >
            <span>🎲</span>
            <span>{t ? t('newRandomRep') : 'New Random Rep'}</span>
          </button>

          {/* Run Python Rep Button */}
          <button
            onClick={handleRun}
            disabled={isRunning}
            className="px-3 py-1 rounded-lg bg-purple-600 hover:bg-purple-500 text-white font-bold text-xs shadow transition-all flex items-center gap-1.5 disabled:opacity-50"
          >
            <span>{isRunning ? '⏳' : '▶'}</span>
            <span>{isRunning ? (t ? t('running') : 'Running...') : (t ? t('runCode') : 'Run with Python')}</span>
          </button>

          <button
            onClick={handleReset}
            className="text-[11px] text-slate-400 hover:text-white px-2 py-1 rounded bg-slate-900 border border-slate-800 transition-colors"
          >
            {lang === 'es' ? 'Reiniciar' : 'Reset'}
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
          className={`w-full bg-slate-900/90 border rounded-xl p-3 code-font text-xs text-purple-300 focus:outline-none focus:border-purple-400 transition-all ${
            flashNew ? 'border-indigo-400 ring-2 ring-indigo-400/30' : 'border-slate-700'
          }`}
        />
      </div>

      {/* Result & Evaluation Panel */}
      {result && (
        <div className="space-y-2 pt-1">
          {result.passed ? (
            <div className="p-3.5 rounded-xl bg-emerald-500/15 border-2 border-emerald-500/40 space-y-1.5">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-emerald-300 flex items-center gap-1.5">
                  <span>🎉</span> {lang === 'es' ? '¡Repetición Completada! ¡Prueba Superada!' : 'Rep Completed! Test Case Passed!'}
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
              <div className="flex flex-wrap items-center justify-between gap-2 pt-0.5">
                <p className="text-xs text-emerald-100/90">
                  {lang === 'es' 
                    ? <>La variable objetivo <code>{testVar}</code> se evaluó a <code>{result.actualVal}</code>. ¡Memoria muscular registrada!</>
                    : <>Target variable <code>{testVar}</code> evaluated to <code>{result.actualVal}</code>. Muscle memory rep logged!</>}
                </p>
                {onViewRepLog && (
                  <button
                    onClick={onViewRepLog}
                    className="inline-flex items-center gap-1 text-[11px] font-bold text-emerald-200 hover:text-white bg-emerald-600/30 hover:bg-emerald-600/50 border border-emerald-400/40 px-2 py-0.5 rounded transition-all"
                  >
                    <span>📊</span>
                    <span>{lang === 'es' ? 'Ver Registro de Reps' : 'View Workout Log'}</span>
                  </button>
                )}
              </div>
            </div>
          ) : (
            <div className="p-3.5 rounded-xl bg-rose-500/15 border-2 border-rose-500/40 space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-rose-300 flex items-center gap-1.5">
                  <span>❌</span> {lang === 'es' ? 'Repetición Fallida / Necesita Revisión' : 'Rep Failed / Needs Review'}
                </span>
                <span className="text-[10px] bg-rose-500/20 text-rose-300 font-bold px-2 py-0.5 rounded font-mono">
                  {result.elapsed}ms
                </span>
              </div>

              {result.error ? (
                <div className="space-y-1">
                  <div className="text-xs font-bold text-rose-200">
                    {result.error.type}: {result.error.summary}
                  </div>
                  {result.error.details && (
                    <pre className="p-2 bg-slate-950/90 rounded text-[11px] font-mono text-rose-400 overflow-x-auto">
                      {result.error.details}
                    </pre>
                  )}
                </div>
              ) : (
                <div className="text-xs text-rose-200">
                  {lang === 'es'
                    ? <>Valor esperado <code>{result.expectedVal}</code>, pero se obtuvo <code>{result.actualVal ?? 'None'}</code>.</>
                    : <>Expected <code>{result.expectedVal}</code>, but got <code>{result.actualVal ?? 'None'}</code>.</>}
                </div>
              )}
            </div>
          )}
        </div>
      )}
    </div>
  );
}
