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
      setCode(`student = '${pickedName}'\ncourse = '${course}'\nroom = ${room}\n# TODO: create card using an f-string combining student, course, and room\ncard = \nprint(card)`);
      setExpectedVal(expected);
    } else if (testVar === 'clean_name') {
      const dirtyNames = ["   ada lovelace   ", "   alan turing   ", "   grace hopper   ", "   katherine johnson   ", "   guido van rossum   ", "   margaret hamilton   "];
      const raw = dirtyNames[Math.floor(Math.random() * dirtyNames.length)];
      const expected = raw.trim().split(' ').map(w => w.charAt(0).toUpperCase() + w.slice(1).toLowerCase()).join(' ');
      setPrompt(lang === 'es'
        ? `Dado raw = '${raw}', limpia espacios en blanco y aplica mayúsculas en 'clean_name'.`
        : `Given raw = '${raw}', clean whitespace and title-case into 'clean_name'.`);
      setCode(`raw = '${raw}'\n# TODO: strip whitespace and title-case raw, store in clean_name\nclean_name = \nprint(clean_name)`);
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
      setCode(`orders = ['${d1}', '${d2}']\n# TODO: append '${addDrink}' to orders, then insert '${insertDrink}' at index 0\n\n\nnext_order = \nprint(next_order)`);
      setExpectedVal(insertDrink);
    } else if (testVar === 'watched') {
      const allMovies = [["Dune", "Shrek", "Arrival"], ["The Matrix", "Inception", "Interstellar"], ["Alien", "Blade Runner", "Gravity"], ["Spider-Man", "Batman", "Avengers"]];
      const pickedSet = allMovies[Math.floor(Math.random() * allMovies.length)];
      const expected = pickedSet[pickedSet.length - 1];
      const starterList = JSON.stringify(pickedSet);
      setPrompt(lang === 'es'
        ? `Dada watchlist = ${starterList}, extrae con pop la última película en 'watched'.`
        : `Given watchlist = ${starterList}, pop the last movie into 'watched'.`);
      setCode(`watchlist = ${starterList}\n# TODO: pop the last movie from watchlist and store it in watched\nwatched = \nprint(watched)`);
      setExpectedVal(expected);
    } else if (testVar === 'avg_miles') {
      const m1 = Math.floor(Math.random() * 150) + 70;
      const m2 = Math.floor(Math.random() * 150) + 70;
      const m3 = Math.floor(Math.random() * 150) + 70;
      const avg = String(Math.round(((m1 + m2 + m3) / 3) * 10) / 10);
      setPrompt(lang === 'es'
        ? `Dadas miles = [${m1}, ${m2}, ${m3}], calcula total = sum(miles) y promedio = round(total / len(miles), 1). Guarda en 'avg_miles'.`
        : `Given miles = [${m1}, ${m2}, ${m3}], calculate total = sum(miles) and average = round(total / len(miles), 1). Store average in 'avg_miles'.`);
      setCode(`miles = [${m1}, ${m2}, ${m3}]\n# TODO: calculate total = sum(miles), then avg_miles = round(total / len(miles), 1)\ntotal = \navg_miles = \nprint(avg_miles)`);
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
      setCode(`stops = ${JSON.stringify(picked)}\n# TODO: slice the first 3 stops into preview\npreview = \nprint(preview)`);
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
      setCode(`menu = ${JSON.stringify(m.menu)}\nitem = '${m.item}'\n# TODO: check if item is in menu and assign the result to available\navailable = \nprint(available)`);
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
      setCode(`size = '${s.size}'\n# TODO: use if/elif/else to assign drink_price: 3.00 for small, 4.00 for medium, 5.00 for large\n\n\n\nprint(drink_price)`);
      setExpectedVal(s.price);
    } else if (testVar === 'prof') {
      const profs = ["Jade Cao", "Alan Turing", "Grace Hopper", "Ada Lovelace"];
      const profName = profs[Math.floor(Math.random() * profs.length)];
      const seats = Math.floor(Math.random() * 20) + 15;
      setPrompt(lang === 'es'
        ? `Crea course = {'name': 'Python', 'seats': ${seats}}. Agrega la clave 'instructor' = '${profName}'. Guarda en 'prof'.`
        : `Create course = {'name': 'Python', 'seats': ${seats}}. Add key 'instructor' = '${profName}'. Store instructor in 'prof'.`);
      setCode(`course = {'name': 'Python', 'seats': ${seats}}\n# TODO: add key 'instructor' = '${profName}' to course, then store course['instructor'] in prof\n\nprof = \nprint(prof)`);
      setExpectedVal(profName);
    } else if (testVar === 'total_fruit') {
      const a = Math.floor(Math.random() * 15) + 5;
      const b = Math.floor(Math.random() * 15) + 5;
      const o = Math.floor(Math.random() * 15) + 5;
      const sum = String(a + b + o);
      setPrompt(lang === 'es'
        ? `Dado stock = {'apples': ${a}, 'bananas': ${b}, 'oranges': ${o}}, suma todas las cantidades en 'total_fruit'.`
        : `Given stock = {'apples': ${a}, 'bananas': ${b}, 'oranges': ${o}}, sum all quantities into 'total_fruit'.`);
      setCode(`stock = {'apples': ${a}, 'bananas': ${b}, 'oranges': ${o}}\n# TODO: sum all values in stock into total_fruit\ntotal_fruit = \nprint(total_fruit)`);
      setExpectedVal(sum);
    } else if (testVar === 'cart_total') {
      const p1 = (Math.floor(Math.random() * 8) + 2) + 0.50;
      const p2 = (Math.floor(Math.random() * 15) + 5) + 0.25;
      const p3 = (Math.floor(Math.random() * 10) + 1) + 0.75;
      const sum = String(Math.round((p1 + p2 + p3) * 100) / 100);
      setPrompt(lang === 'es'
        ? `Suma prices = [${p1}, ${p2}, ${p3}] usando un bucle while en 'cart_total' redondeado a 2 decimales.`
        : `Sum prices = [${p1}, ${p2}, ${p3}] using a while loop into 'cart_total' rounded to 2 decimals.`);
      setCode(`prices = [${p1}, ${p2}, ${p3}]\ncart_total = 0.0\nidx = 0\n# TODO: write a while loop that adds each price to cart_total and increments idx\n\n\n\ncart_total = round(cart_total, 2)\nprint(cart_total)`);
      setExpectedVal(sum);
    } else if (testVar === 'total_miles') {
      const m1 = (Math.floor(Math.random() * 8) + 5) * 20;
      const m2 = (Math.floor(Math.random() * 8) + 5) * 20;
      const sum = String(m1 + m2);
      setPrompt(lang === 'es'
        ? `Dadas stops = [{'city': 'Raleigh', 'miles': ${m1}}, {'city': 'Richmond', 'miles': ${m2}}], calcula total_miles = sum(s['miles'] for s in stops).`
        : `Given stops = [{'city': 'Raleigh', 'miles': ${m1}}, {'city': 'Richmond', 'miles': ${m2}}], calculate total_miles = sum(s['miles'] for s in stops).`);
      setCode(`stops = [{'city': 'Raleigh', 'miles': ${m1}}, {'city': 'Richmond', 'miles': ${m2}}]\n# TODO: sum all 'miles' values from stops into total_miles\ntotal_miles = \nprint(total_miles)`);
      setExpectedVal(sum);
    } else if (testVar === 'bill') {
      const prices = [30.0, 40.0, 50.0, 60.0, 80.0];
      const price = prices[Math.floor(Math.random() * prices.length)];
      const tips = [0.15, 0.20, 0.25];
      const tip = tips[Math.floor(Math.random() * tips.length)];
      // Use toFixed(2) to match Python's round(..., 2) output format
      const total = parseFloat((price * (1 + tip)).toFixed(2)).toString();
      setPrompt(lang === 'es'
        ? `Escribe calc_bill(price, tip_pct=${tip}) que retorne round(price * (1 + tip_pct), 2). Guarda calc_bill(${price}) en 'bill'.`
        : `Write calc_bill(price, tip_pct=${tip}) that returns round(price * (1 + tip_pct), 2). Store calc_bill(${price}) in 'bill'.`);
      setCode(`def calc_bill(price, tip_pct=${tip}):\n    # TODO: return round(price * (1 + tip_pct), 2)\n    pass\n\nbill = \nprint(bill)`);
      setExpectedVal(total);
    } else if (testVar === 'title') {
      const ranks = ["Captain", "Commander", "Doctor", "Professor", "Major"];
      const rank = ranks[Math.floor(Math.random() * ranks.length)];
      const exp = `${pickedName} (${rank})`;
      setPrompt(lang === 'es'
        ? `Escribe format_title(name, rank=None). Si rank existe, retorna f'{name} ({rank})', si no retorna name. Guarda format_title('${pickedName}', '${rank}') en 'title'.`
        : `Write format_title(name, rank=None). If rank, return f'{name} ({rank})', else return name. Store format_title('${pickedName}', '${rank}') in 'title'.`);
      setCode(`def format_title(name, rank=None):\n    # TODO: if rank is given, return f'{name} ({rank})'; otherwise return name\n    pass\n\ntitle = \nprint(title)`);
      setExpectedVal(exp);
    } else if (testVar === 'clean_record') {
      const recs = ["patient_data", "invoice_record", "system_event", "student_grade", "telemetry_log"];
      const rec = recs[Math.floor(Math.random() * recs.length)];
      setPrompt(lang === 'es'
        ? `Usa io.BytesIO para leer b'${rec}\\n'. Decodifica y elimina el salto de línea en 'clean_record'.`
        : `Use io.BytesIO to read b'${rec}\\n'. Decode and strip the newline into 'clean_record'.`);
      setCode(`import io\nraw_bytes = b'${rec}\\n'\n# TODO: open raw_bytes with io.BytesIO and read the line, then decode and strip the newline into clean_record\nwith io.BytesIO(raw_bytes) as f:\n    clean_record = \nprint(clean_record)`);
      setExpectedVal(rec);
    } else if (testVar === 'status' && repData.starter && repData.starter.includes('class Player')) {
      const pairs = [
        { p1: 'Vega', p2: 'Sirius', dmg: 30 },
        { p1: 'Atlas', p2: 'Zephyr', dmg: 40 },
        { p1: 'Blaze', p2: 'Frost', dmg: 15 },
        { p1: 'Echo', p2: 'Titan', dmg: 35 }
      ];
      const pair = pairs[Math.floor(Math.random() * pairs.length)];
      const exp = `${pair.p1}:${100 - pair.dmg}|${pair.p2}:100`;
      setPrompt(lang === 'es'
        ? `Crea la clase Player con __init__(self, name, health=100) y take_damage(self, amount) que reste amount de self.health. Crea p1 = Player('${pair.p1}') y p2 = Player('${pair.p2}'). Llama p1.take_damage(${pair.dmg}). Guarda f'{p1.name}:{p1.health}|{p2.name}:{p2.health}' en 'status'.`
        : `Create class Player with __init__(self, name, health=100) and take_damage(self, amount) that subtracts amount from self.health. Create p1 = Player('${pair.p1}') and p2 = Player('${pair.p2}'). Call p1.take_damage(${pair.dmg}). Store f'{p1.name}:{p1.health}|{p2.name}:{p2.health}' in 'status'.`);
      setCode(`class Player:\n    def __init__(self, name, health=100):\n        # TODO: store name and health as instance attributes\n        pass\n\n    def take_damage(self, amount):\n        # TODO: subtract amount from self.health\n        pass\n\np1 = Player("${pair.p1}")\np2 = Player("${pair.p2}")\np1.take_damage(${pair.dmg})\nstatus = \nprint(status)`);
      setExpectedVal(exp);
    } else if (testVar === 'status') {
      const invalids = ["'abc'", "'invalid'", "'not_a_num'", "'ninety'"];
      const inv = invalids[Math.floor(Math.random() * invalids.length)];
      setPrompt(lang === 'es'
        ? `Intenta int(${inv}). Al ocurrir ValueError, asigna status='recovered'.`
        : `Try int(${inv}). On ValueError, set status='recovered'.`);
      setCode(`try:\n    val = int(${inv})\nexcept ValueError:\n    # TODO: assign status = 'recovered'\n    status = \nprint(status)`);
      setExpectedVal('recovered');
    } else if (testVar === 'summary') {
      const movies = [
        { title: 'Interstellar', genre: 'Sci-Fi', rating: 10 },
        { title: 'The Matrix', genre: 'Action', rating: 9 },
        { title: 'Arrival', genre: 'Sci-Fi', rating: 8 },
        { title: 'Dune', genre: 'Adventure', rating: 9 }
      ];
      const m = movies[Math.floor(Math.random() * movies.length)];
      const exp = `${m.title} (${m.genre}) - ${m.rating}/10`;
      setPrompt(lang === 'es'
        ? `Crea la clase Movie con __init__(self, title, genre, rating) y el método describe() que devuelva f'{self.title} ({self.genre}) - {self.rating}/10'. Instancia fav = Movie('${m.title}', '${m.genre}', ${m.rating}). Guarda fav.describe() en 'summary'.`
        : `Create class Movie with __init__(self, title, genre, rating) and method describe() that returns f'{self.title} ({self.genre}) - {self.rating}/10'. Instantiate fav = Movie('${m.title}', '${m.genre}', ${m.rating}). Store fav.describe() in 'summary'.`);
      setCode(`class Movie:\n    def __init__(self, title, genre, rating):\n        # TODO: assign self.title, self.genre, and self.rating\n        pass\n\n    def describe(self):\n        # TODO: return f-string: '{title} ({genre}) - {rating}/10'\n        pass\n\nfav = Movie("${m.title}", "${m.genre}", ${m.rating})\nsummary = \nprint(summary)`);
      setExpectedVal(exp);
    } else if (testVar === 'final_bal') {
      const txSets = [
        { start: 200, dep: 80, wd: 50, badWd: 900, exp: 230 },
        { start: 150, dep: 60, wd: 40, badWd: 500, exp: 170 },
        { start: 300, dep: 100, wd: 75, badWd: 800, exp: 325 },
        { start: 100, dep: 90, wd: 20, badWd: 400, exp: 170 }
      ];
      const tx = txSets[Math.floor(Math.random() * txSets.length)];
      setPrompt(lang === 'es'
        ? `Crea la clase BankAccount con __init__(self, owner, balance=0). Agrega deposit(amount) que solo sume si amount > 0, y withdraw(amount) que solo reste si 0 < amount <= self.balance. Crea acct = BankAccount('${pickedName}', ${tx.start}). deposit(${tx.dep}), withdraw(${tx.wd}), withdraw(${tx.badWd}). Guarda acct.balance en 'final_bal'.`
        : `Create class BankAccount with __init__(self, owner, balance=0). Add deposit(amount) that only adds if amount > 0, and withdraw(amount) that only subtracts if 0 < amount <= self.balance. Create acct = BankAccount('${pickedName}', ${tx.start}). deposit(${tx.dep}), withdraw(${tx.wd}), withdraw(${tx.badWd}). Store acct.balance in 'final_bal'.`);
      setCode(`class BankAccount:\n    def __init__(self, owner, balance=0):\n        # TODO: store owner and balance as instance attributes\n        pass\n\n    def deposit(self, amount):\n        # TODO: only add amount to self.balance if amount > 0\n        pass\n\n    def withdraw(self, amount):\n        # TODO: only subtract if 0 < amount <= self.balance\n        pass\n\nacct = BankAccount("${pickedName}", ${tx.start})\nacct.deposit(${tx.dep})\nacct.withdraw(${tx.wd})\nacct.withdraw(${tx.badWd})  # Should be rejected!\nfinal_bal = \nprint(final_bal)`);
      setExpectedVal(tx.exp);
    } else if (testVar === 'final_energy') {
      const petScenarios = [
        { name: 'Milo', play1: 25, rest1: 15, play2: 20, exp: 25 },
        { name: 'Rocky', play1: 40, rest1: 30, play2: 10, exp: 30 },
        { name: 'Bella', play1: 15, rest1: 50, play2: 30, exp: 40 },
        { name: 'Koda', play1: 35, rest1: 20, play2: 30, exp: 0 }
      ];
      const sc = petScenarios[Math.floor(Math.random() * petScenarios.length)];
      setPrompt(lang === 'es'
        ? `Crea la clase Pet con __init__(self, name, age) iniciando self.energy = 100. Agrega play(mins) reduciendo energía en mins*2 (piso 0 con max(0, ...)) y rest(amt) sumando amt (techo 100 con min(100, ...)). Crea pet = Pet('${sc.name}', 2). pet.play(${sc.play1}), pet.rest(${sc.rest1}), pet.play(${sc.play2}). Guarda pet.energy en 'final_energy'.`
        : `Create class Pet with __init__(self, name, age) setting self.energy = 100. Add play(mins) reducing energy by mins*2 (clamped floor 0 with max(0, ...)), and rest(amt) adding amt (clamped ceiling 100 with min(100, ...)). Create pet = Pet('${sc.name}', 2). pet.play(${sc.play1}), pet.rest(${sc.rest1}), pet.play(${sc.play2}). Store pet.energy in 'final_energy'.`);
      setCode(`class Pet:\n    def __init__(self, name, age):\n        self.name = name\n        self.age = age\n        self.energy = 100\n\n    def play(self, mins):\n        # TODO: reduce self.energy by mins*2, floor at 0 using max(0, ...)\n        pass\n\n    def rest(self, amt):\n        # TODO: increase self.energy by amt, cap at 100 using min(100, ...)\n        pass\n\npet = Pet("${sc.name}", 2)\npet.play(${sc.play1})\npet.rest(${sc.rest1})\npet.play(${sc.play2})\nfinal_energy = \nprint(final_energy)`);
      setExpectedVal(sc.exp);
    } else if (testVar === 'ev_info') {
      const evMakes = [
        { make: 'Tesla', model: 'Model 3', kwh: 75 },
        { make: 'Nissan', model: 'Leaf', kwh: 40 },
        { make: 'Hyundai', model: 'Ioniq 5', kwh: 77 },
        { make: 'Chevy', model: 'Bolt', kwh: 65 },
        { make: 'Rivian', model: 'R1T', kwh: 135 }
      ];
      const evChoice = evMakes[Math.floor(Math.random() * evMakes.length)];
      const exp = `${evChoice.make}: ${evChoice.kwh}kWh`;
      setPrompt(lang === 'es'
        ? `Crea Vehicle(make, model). Crea ElectricVehicle(Vehicle) con super().__init__(make, model) y self.battery=${evChoice.kwh}. Llama ev.battery_info() y guarda en 'ev_info'.`
        : `Create Vehicle(make, model). Create ElectricVehicle(Vehicle) with super().__init__(make, model) and self.battery=${evChoice.kwh}. Call ev.battery_info() and store in 'ev_info'.`);
      setCode(`class Vehicle:\n    def __init__(self, make, model):\n        self.make = make\n        self.model = model\n\nclass ElectricVehicle(Vehicle):\n    def __init__(self, make, model, battery):\n        # TODO: call super().__init__(make, model) and store self.battery\n        pass\n\n    def battery_info(self):\n        # TODO: return f'{self.make}: {self.battery}kWh'\n        pass\n\nev = ElectricVehicle('${evChoice.make}', '${evChoice.model}', ${evChoice.kwh})\nev_info = \nprint(ev_info)`);
      setExpectedVal(exp);
    } else if (testVar === 'item_count') {
      const libNames = ["Central", "West Campus", "Downtown", "SciTech"];
      const libName = libNames[Math.floor(Math.random() * libNames.length)];
      const count = Math.floor(Math.random() * 3) + 2; // 2 to 4 items
      const bookTitles = ["Python Basics", "Algorithms", "Data Systems", "Web Security"];
      const chosenBooks = bookTitles.slice(0, count);
      setPrompt(lang === 'es'
        ? `Crea Book(title) y Library(name) con self.items=[]. Agrega ${count} libros a la biblioteca '${libName}'. Guarda len(lib.items) en 'item_count'.`
        : `Create Book(title) and Library(name) with self.items=[]. Add ${count} books to library '${libName}'. Store len(lib.items) in 'item_count'.`);
      const bookInserts = chosenBooks.map(b => `lib.add_item(Book('${b}'))`).join('\n');
      setCode(`class Book:\n    def __init__(self, title):\n        self.title = title\n\nclass Library:\n    def __init__(self, name):\n        self.name = name\n        self.items = []\n\n    def add_item(self, item):\n        # TODO: append item to self.items\n        pass\n\nlib = Library('${libName}')\n${bookInserts}\nitem_count = \nprint(item_count)`);
      setExpectedVal(count);
    } else if (testVar === 'query' || testVar === 'rows') {
      const tables = ["Students", "Courses", "Faculty", "Employees"];
      const tbl = tables[Math.floor(Math.random() * tables.length)];
      setPrompt(lang === 'es'
        ? `Usa sqlite3 en memoria. Crea tabla ${tbl} (name TEXT, major TEXT), inserta una fila, y ejecuta SELECT * WHERE major = ? con parámetro ('CS',). Guarda fetchall() en 'rows'.`
        : `Use sqlite3 in-memory. Create ${tbl} (name TEXT, major TEXT), insert a row, execute SELECT * WHERE major = ? with ('CS',). Store fetchall() in 'rows'.`);
      setCode(`import sqlite3\nconn = sqlite3.connect(':memory:')\ncur = conn.cursor()\ncur.execute('CREATE TABLE ${tbl} (name TEXT, major TEXT)')\ncur.execute('INSERT INTO ${tbl} VALUES (?, ?)', ('Maya', 'CS'))\n# TODO: execute SELECT * FROM ${tbl} WHERE major = ? with parameter ('CS',)\n# then fetch all results into rows\n\nrows = \nprint(rows)\nconn.close()`);
      setExpectedVal("[('Maya', 'CS')]");
    } else if (testVar === 'result') {
      const candidates = [
        { raw: '  ALICE_dev ', clean: 'alice_dev' },
        { raw: '  bob_CODER   ', clean: 'bob_coder' },
        { raw: '  CAROL-99   ', clean: 'carol-99' },
        { raw: '   Dave_X  ', clean: 'dave_x' },
        { raw: '  Elena_Pro   ', clean: 'elena_pro' },
        { raw: '  FELIX_42   ', clean: 'felix_42' }
      ];
      const pick = candidates[Math.floor(Math.random() * candidates.length)];
      setPrompt(lang === 'es'
        ? `Escribe clean_user(name) devolviendo name.strip().lower(). Asegura con assert clean_user('  Maya  ') == 'maya'. Guarda clean_user('${pick.raw}') en 'result'.`
        : `Write clean_user(name) returning name.strip().lower(). Assert clean_user('  Maya  ') == 'maya'. Store clean_user('${pick.raw}') in 'result'.`);
      setCode(`def clean_user(name):\n    # TODO: return name.strip().lower()\n    pass\n\nassert clean_user('  Maya  ') == 'maya'\nresult = \nprint(result)`);
      setExpectedVal(pick.clean);
    } else if (testVar === 'fee') {
      const testHours = [2, 4, 5, 7, 8, 10];
      const h = testHours[Math.floor(Math.random() * testHours.length)];
      const expFee = Math.min(5 + (h - 1) * 3, 20);
      setPrompt(lang === 'es'
        ? `Corrige el cálculo de parking_fee(hours): 1ª hora $5, horas adicionales $3, tope $20. Verifica con assert parking_fee(1) == 5 y parking_fee(3) == 11. Guarda parking_fee(${h}) en 'fee'.`
        : `Fix the parking_fee(hours) calculation: 1st hour is $5, each additional hour is $3, max $20. (Formula: 5 + (hours - 1) * 3 capped at 20). Assert parking_fee(1) == 5 and parking_fee(3) == 11. Store parking_fee(${h}) in 'fee'.`);
      setCode(`def parking_fee(hours):\n    if hours < 1 or hours > 24:\n        raise ValueError('Hours must be between 1 and 24.')\n    # TODO: fix calculation (1st hr $5, add'l hrs $3, capped at 20)\n    return hours * 5\n\nassert parking_fee(1) == 5\nassert parking_fee(3) == 11\nfee = \nprint(fee)`);
      setExpectedVal(expFee);
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
            disabled={isRunning || !pyodideReady}
            className="px-3 py-1 rounded-lg bg-purple-600 hover:bg-purple-500 text-white font-bold text-xs shadow transition-all flex items-center gap-1.5 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <span>{isRunning ? '⏳' : !pyodideReady ? '⌛' : '▶'}</span>
            <span>{isRunning ? (t ? t('running') : 'Running...') : !pyodideReady ? 'Loading Python...' : (t ? t('runCode') : 'Run with Python')}</span>
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
        <div className="space-y-2 pt-1" role="status" aria-live="polite">
          {result.engine === 'pending' ? (
            <div className="p-3.5 rounded-xl bg-amber-500/15 border-2 border-amber-500/40 flex items-center gap-3">
              <span className="text-xl">⌛</span>
              <div>
                <p className="text-xs font-bold text-amber-300">Python Engine Still Loading</p>
                <p className="text-xs text-amber-200/80 mt-0.5">{result.pendingMessage || 'Please wait a moment and try again.'}</p>
              </div>
            </div>
          ) : result.passed ? (
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
