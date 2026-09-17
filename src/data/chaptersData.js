// Bilingual Curriculum Dataset: English & Spanish
export const CHAPTERS_DATA = [
  {
    "num": 1,
    "code_module": "Module 1",
    "title": "Variables, Data Types & Formatting",
    "icon": "🐍",
    "prof_source": "Prof. Jade Cao (CCCC) — 01_Variables_and_Data_Types.ipynb",
    "desc": "Variables as memory labels, string transformations (f-strings, whitespace stripping), integers, floats, and the Student Profile Card mini-project.",
    "sections": [
      {
        "id": "1-1",
        "num": "1.1",
        "title": "Variables: Names for Values in Memory",
        "why": "Computers need human-friendly labels to track data stored in RAM. Assigning `score = 95` puts 95 into a memory slot and labels that slot `score`.",
        "concept": "Variables can change over time. Naming rules: must start with letter or underscore; no spaces; case-sensitive; snake_case is standard in Python.",
        "code": "student_name = 'Maya'\nquiz_score = 9\nfavorite_snack = 'popcorn'\nprint(f'{student_name} scored {quiz_score}/10 and loves {favorite_snack}.')",
        "expected_output": "Maya scored 9/10 and loves popcorn.",
        "pitfall": "Forgetting that Python variable names are case-sensitive: `Score` and `score` are two completely different memory slots!",
        "rep": {
          "title": "Student Profile Card Rep",
          "prompt": "Create student='Alex', course='Intro to Python', and room=204. Combine into card = f'{student} is in {course} (Room {room})'.",
          "starter": "student = 'Alex'\ncourse = 'Intro to Python'\nroom = 204\ncard = f'{student} is in {course} (Room {room})'\nprint(card)",
          "test_var": "card",
          "expected_val": "Alex is in Intro to Python (Room 204)",
          "title_es": "Repetición: Tarjeta de Perfil Estudiantil",
          "prompt_es": "Crea student='Alex', course='Intro to Python', y room=204. Combina en card = f'{student} is in {course} (Room {room})'."
        },
        "quiz": {
          "question": "Which of the following is a valid Python variable name following PEP 8 conventions?",
          "options": [
            "2nd_score",
            "quiz score",
            "total_score",
            "total-score"
          ],
          "answer": 2,
          "explanation": "In Python, variable names cannot start with numbers, cannot contain spaces, and cannot contain hyphens. `total_score` uses valid snake_case!",
          "question_es": "¿Cuál de los siguientes es un nombre de variable válido en Python según las convenciones PEP 8?",
          "options_es": [
            "2nd_score",
            "quiz score",
            "total_score",
            "total-score"
          ],
          "explanation_es": "En Python, los nombres de variables no pueden comenzar con números, contener espacios ni guiones. ¡`total_score` utiliza snake_case válido!"
        },
        "title_es": "Variables: Nombres para Valores en Memoria",
        "why_es": "Las computadoras necesitan etiquetas comprensibles para rastrear datos almacenados en la RAM. Asignar `score = 95` almacena 95 en una ranura de memoria y nombra esa ranura `score`.",
        "concept_es": "Las variables pueden cambiar con el tiempo. Reglas de nomenclatura: deben iniciar con letra o guion bajo; sin espacios; distinguen mayúsculas; snake_case es el estándar de Python.",
        "pitfall_es": "¡Olvidar que las variables en Python distinguen mayúsculas y minúsculas: `Score` y `score` son dos ranuras de memoria completamente diferentes!"
      },
      {
        "id": "1-2",
        "num": "1.2",
        "title": "Strings: Transformations, Whitespace & f-Strings",
        "why": "User text is messy (extra spaces, inconsistent capitalization). String methods sanitize inputs so 'yes ' and 'YES' both match 'yes'.",
        "concept": ".strip() removes invisible spaces. .title() capitalizes words. f-strings (f'Hello, {name}') inject live variables into text cleanly.",
        "code": "raw_name = '   jordan smith   '\nclean_name = raw_name.strip().title()\nprint(f'Formatted: |{clean_name}|')",
        "expected_output": "Formatted: |Jordan Smith|",
        "pitfall": "Strings in Python are immutable! Calling `name.strip()` does NOT change `name` unless you reassign it: `name = name.strip()`.",
        "rep": {
          "title": "Clean and Format Name Rep",
          "prompt": "Given raw = '  ada lovelace  ', clean whitespace and title-case into 'clean_name'.",
          "starter": "raw = '  ada lovelace  '\nclean_name = raw.strip().title()\nprint(clean_name)",
          "test_var": "clean_name",
          "expected_val": "Ada Lovelace",
          "title_es": "Repetición: Limpieza y Formato de Nombre",
          "prompt_es": "Dado raw = '  ada lovelace  ', limpia espacios en blanco y aplica mayúsculas en 'clean_name'."
        },
        "quiz": {
          "question": "What does `user = '  chris  '; user.strip(); print(user)` output on screen?",
          "options": [
            "'chris'",
            "'  chris  '",
            "None",
            "SyntaxError"
          ],
          "answer": 1,
          "explanation": "Strings are immutable! Calling `user.strip()` returns a new clean string, but because we didn't reassign `user = user.strip()`, `user` still has its spaces!",
          "question_es": "¿Qué muestra en pantalla `user = '  chris  '; user.strip(); print(user)`?",
          "options_es": [
            "'chris'",
            "'  chris  '",
            "None",
            "SyntaxError"
          ],
          "explanation_es": "¡Las cadenas son inmutables! Llamar a `user.strip()` genera una nueva cadena limpia, pero como no reasignamos `user = user.strip()`, ¡`user` conserva sus espacios!"
        },
        "title_es": "Cadenas: Transformaciones, Espacios y f-Strings",
        "why_es": "El texto introducido por el usuario suele ser desordenado (espacios adicionales, mayúsculas inconsistentes). Los métodos de cadenas limpian entradas para que 'si ' y 'SI' coincidan con 'si'.",
        "concept_es": ".strip() elimina espacios invisibles. .title() capitaliza cada palabra. Las f-strings (f'Hola, {name}') inyectan variables en vivo en el texto de forma limpia.",
        "pitfall_es": "¡Las cadenas en Python son inmutables! Llamar a `name.strip()` NO modifica `name` a menos que lo reasignes: `name = name.strip()`."
      }
    ],
    "title_es": "Variables, Tipos de Datos y Formato",
    "desc_es": "Variables como etiquetas de memoria, transformaciones de texto (f-strings, eliminación de espacios), enteros, flotantes y el mini-proyecto Tarjeta de Perfil Estudiantil."
  },
  {
    "num": 2,
    "code_module": "Module 2.1",
    "title": "Introducing Lists (Store, Access, & Organize)",
    "icon": "📋",
    "prof_source": "Prof. Jade Cao (CCCC) — Lecture_Module2.1_Intro_to_Lists.ipynb",
    "desc": "Prof. Cao teaches lists early: 0-based and negative indexing, modifying elements, append(), insert(), del, pop(), remove(), sort() vs sorted().",
    "sections": [
      {
        "id": "2-1",
        "num": "2.1",
        "title": "List Indexing & Adding Items (append & insert)",
        "why": "A single variable holds only one value. A list holds an entire sequence in order. `append()` adds to the back of the line; `insert()` cuts into a specific slot.",
        "concept": "Lists use zero-based indexing (`[0]`). Negative indexes count from the end (`[-1]` is the last item). `append(x)` adds at the end; `insert(idx, x)` adds at position.",
        "code": "waitlist = ['Maya', 'Leo']\nwaitlist.append('Ava')\nwaitlist.insert(0, 'Chris')\nprint(f'Queue: {waitlist}')\nprint(f'First: {waitlist[0]}, Last: {waitlist[-1]}')",
        "expected_output": "Queue: ['Chris', 'Maya', 'Leo', 'Ava']\nFirst: Chris, Last: Ava",
        "pitfall": "IndexError: attempting to access index equal to len(list). For a list of 3 items, valid indexes are 0, 1, 2. Index 3 crashes!",
        "rep": {
          "title": "Coffee Order Queue Rep",
          "prompt": "Start with orders = ['latte', 'drip']. Append 'mocha' and insert 'espresso' at index 0. Store first item in 'next_order'.",
          "starter": "orders = ['latte', 'drip']\norders.append('mocha')\norders.insert(0, 'espresso')\nnext_order = orders[0]\nprint(next_order)",
          "test_var": "next_order",
          "expected_val": "espresso",
          "title_es": "Repetición: Cola de Pedidos de Café",
          "prompt_es": "Comienza con orders = ['latte', 'drip']. Agrega 'mocha' con append e inserta 'espresso' en el índice 0. Guarda el primer elemento en 'next_order'."
        },
        "quiz": {
          "question": "Given `planets = ['Mercury', 'Venus', 'Earth', 'Mars']`, what does `planets[-2]` return?",
          "options": [
            "'Mercury'",
            "'Venus'",
            "'Earth'",
            "'Mars'"
          ],
          "answer": 2,
          "explanation": "Negative indexing counts backwards from the right: -1 is 'Mars', -2 is 'Earth'!",
          "question_es": "Dada la lista `planets = ['Mercury', 'Venus', 'Earth', 'Mars']`, ¿qué devuelve `planets[-2]`?",
          "options_es": [
            "'Mercury'",
            "'Venus'",
            "'Earth'",
            "'Mars'"
          ],
          "explanation_es": "La indexación negativa cuenta hacia atrás desde la derecha: -1 es 'Mars', ¡y -2 es 'Earth'!"
        },
        "title_es": "Indexación de Listas y Agregar Elementos (append e insert)",
        "why_es": "Una sola variable contiene un solo valor. Una lista contiene una secuencia completa en orden. `append()` agrega al final de la cola; `insert()` inserta en una posición específica.",
        "concept_es": "Las listas usan indexación en base cero (`[0]`). Los índices negativos cuentan desde el final (`[-1]` es el último). `append(x)` añade al final; `insert(idx, x)` añade en la posición.",
        "pitfall_es": "IndexError: intentar acceder a un índice igual a len(lista). Para una lista de 3 elementos, los índices válidos son 0, 1, 2. ¡El índice 3 provoca un error fatal!"
      },
      {
        "id": "2-2",
        "num": "2.2",
        "title": "Removing Items & Organizing (del, pop, remove, sort)",
        "why": "Different jobs require different tools: `del` removes by index; `pop()` removes and hands you the item; `remove()` searches by value; `sort()` organizes.",
        "concept": "`del list[idx]` deletes. `item = list.pop(idx)` removes and returns. `list.remove('value')` deletes first matching item. `list.sort()` changes in-place; `sorted(list)` returns a sorted copy.",
        "code": "tasks = ['email prof', 'lab homework', 'buy coffee']\ncompleted = tasks.pop(0)\nprint(f'Done: {completed}')\nprint(f'Remaining: {tasks}')",
        "expected_output": "Done: email prof\nRemaining: ['lab homework', 'buy coffee']",
        "pitfall": "Writing `my_list = my_list.sort()`. `sort()` modifies the list in place and returns `None`, so `my_list` becomes `None`!",
        "rep": {
          "title": "Streaming Watchlist Cleanup Rep",
          "prompt": "Given watchlist = ['Dune', 'Shrek', 'Arrival'], pop the last movie into 'watched'.",
          "starter": "watchlist = ['Dune', 'Shrek', 'Arrival']\nwatched = watchlist.pop()\nprint(watched)",
          "test_var": "watched",
          "expected_val": "Arrival",
          "title_es": "Repetición: Limpieza de Lista de Películas",
          "prompt_es": "Dada watchlist = ['Dune', 'Shrek', 'Arrival'], extrae con pop la última película en 'watched'."
        },
        "quiz": {
          "question": "Why does `print(['banana', 'apple'].sort())` output `None`?",
          "options": [
            "`sort()` does not work on strings",
            "Methods that modify lists in place in Python return `None` by design to prevent confusing copies",
            "It is a syntax error",
            "Because the list was empty"
          ],
          "answer": 1,
          "explanation": "In Python, in-place mutating methods like `.sort()` and `.reverse()` return `None` so you know they modified the existing list rather than creating a new one.",
          "question_es": "¿Por qué `print(['banana', 'apple'].sort())` produce `None`?",
          "options_es": [
            "`sort()` no funciona en cadenas de texto",
            "Los métodos que modifican listas in-situ en Python retornan `None` por diseño para evitar copias confusas",
            "Es un error de sintaxis",
            "Porque la lista estaba vacía"
          ],
          "explanation_es": "En Python, los métodos que mutan directamente como `.sort()` y `.reverse()` retornan `None` para confirmar que modificaron la lista existente en lugar de crear una nueva."
        },
        "title_es": "Eliminar Elementos y Organizar (del, pop, remove, sort)",
        "why_es": "Diferentes tareas requieren herramientas distintas: `del` elimina por índice; `pop()` elimina y te entrega el elemento; `remove()` busca por valor; `sort()` organiza.",
        "concept_es": "`del lista[idx]` elimina. `item = lista.pop(idx)` extrae y retorna. `lista.remove('valor')` elimina la primera coincidencia. `lista.sort()` ordena directamente; `sorted(lista)` retorna una copia ordenada.",
        "pitfall_es": "Escribir `mi_lista = mi_lista.sort()`. `sort()` modifica la lista directamente y retorna `None`, ¡por lo que `mi_lista` se convierte en `None`!"
      }
    ],
    "title_es": "Introducción a las Listas (Almacenar, Acceder y Organizar)",
    "desc_es": "La profesora Cao enseña listas desde el inicio: indexación en base 0 y negativa, modificación de elementos, append(), insert(), del, pop(), remove(), sort() frente a sorted()."
  },
  {
    "num": 3,
    "code_module": "Module 2.2",
    "title": "Working with Lists, Slices, & Tuples",
    "icon": "🔄",
    "prof_source": "Prof. Jade Cao (CCCC) — Lecture_Module2.2_Working_with_Lists.ipynb",
    "desc": "Looping through lists with for-loops, generating numbers with range(), slices [:], list copy vs assignment, and immutable tuples.",
    "sections": [
      {
        "id": "3-1",
        "num": "3.1",
        "title": "for Loops, range(), and Numerical Lists",
        "why": "Doing things by hand one item at a time is impossible with 10,000 items. A `for` loop automates repetitive tasks over every item in a sequence.",
        "concept": "`for item in collection:` executes indented block once per item. `range(start, stop, step)` generates numbers up to (non-inclusive) stop. Built-ins: `min()`, `max()`, `sum()`.",
        "code": "daily_miles = [120, 245, 80, 310]\ntotal_miles = sum(daily_miles)\nlongest_day = max(daily_miles)\nprint(f'Total: {total_miles} mi, Longest: {longest_day} mi')",
        "expected_output": "Total: 755 mi, Longest: 310 mi",
        "pitfall": "Indentation errors: Python uses whitespace to know which lines are inside the loop and which line executes after the loop is finished.",
        "rep": {
          "title": "Road Trip Daily Miles Rep",
          "prompt": "Given miles = [150, 220, 85], calculate total = sum(miles) and average = round(total / len(miles), 1). Store average in 'avg_miles'.",
          "starter": "miles = [150, 220, 85]\ntotal = sum(miles)\navg_miles = round(total / len(miles), 1)\nprint(avg_miles)",
          "test_var": "avg_miles",
          "expected_val": "151.7",
          "title_es": "Repetición: Millas Diarias de Viaje",
          "prompt_es": "Dadas miles = [150, 220, 85], calcula total = sum(miles) y promedio = round(total / len(miles), 1). Guarda en 'avg_miles'."
        },
        "quiz": {
          "question": "What numbers are generated by `list(range(2, 10, 3))`?",
          "options": [
            "[2, 5, 8]",
            "[2, 5, 8, 10]",
            "[3, 6, 9]",
            "[2, 3, 4]"
          ],
          "answer": 0,
          "explanation": "Start at 2, add step of 3: 2 + 3 = 5, 5 + 3 = 8. Adding 3 again reaches 11, which exceeds the stop limit of 10!",
          "question_es": "¿Qué números son generados por `list(range(2, 10, 3))`?",
          "options_es": [
            "[2, 5, 8]",
            "[2, 5, 8, 10]",
            "[3, 6, 9]",
            "[2, 3, 4]"
          ],
          "explanation_es": "Inicia en 2, suma paso de 3: 2 + 3 = 5, 5 + 3 = 8. Sumar 3 de nuevo daría 11, ¡lo cual excede el límite de parada de 10!"
        },
        "title_es": "Bucles for, range() y Listas Numéricas",
        "why_es": "Hacer cosas manualmente elemento por elemento es inviable con 10,000 datos. Un bucle `for` automatiza tareas repetitivas sobre cada elemento de una secuencia.",
        "concept_es": "`for item in coleccion:` ejecuta el bloque indentado una vez por elemento. `range(inicio, fin, paso)` genera números hasta (sin incluir) fin. Funciones integradas: `min()`, `max()`, `sum()`.",
        "pitfall_es": "Errores de indentación: Python utiliza los espacios en blanco para saber qué líneas están dentro del bucle y cuál se ejecuta al terminar."
      },
      {
        "id": "3-2",
        "num": "3.2",
        "title": "Slicing, Copying (.copy() vs =), and Tuples",
        "why": "`list_b = list_a` does NOT copy the items—it creates a second alias to the exact same list in RAM! To protect data, use `.copy()` or slices `[:]`.",
        "concept": "Slicing: `list[start:stop]`. Safe copy: `friend_route = my_route.copy()`. Tuples: defined with parentheses `(1920, 1080)` and are immutable (read-only).",
        "code": "my_route = ['Raleigh', 'Chicago', 'Denver']\nfriend_route = my_route.copy()\nfriend_route.append('Seattle')\nprint(f'My route: {my_route}')\nprint(f'Friend: {friend_route}')",
        "expected_output": "My route: ['Raleigh', 'Chicago', 'Denver']\nFriend: ['Raleigh', 'Chicago', 'Denver', 'Seattle']",
        "pitfall": "Writing `b = a` and modifying `b`, which secretly modifies `a` because both point to the same memory address.",
        "rep": {
          "title": "Route Preview Slice Rep",
          "prompt": "Given stops = ['Raleigh', 'Richmond', 'DC', 'Philly', 'NYC'], slice the first 3 stops into 'preview'.",
          "starter": "stops = ['Raleigh', 'Richmond', 'DC', 'Philly', 'NYC']\npreview = stops[:3]\nprint(preview)",
          "test_var": "preview",
          "expected_val": "['Raleigh', 'Richmond', 'DC']",
          "title_es": "Repetición: Vista Previa de Paradas de Ruta",
          "prompt_es": "Dadas stops = ['Raleigh', 'Richmond', 'DC', 'Philly', 'NYC'], extrae las primeras 3 paradas en 'preview'."
        },
        "quiz": {
          "question": "Why should you use a Tuple instead of a List for screen dimensions like `(1920, 1080)`?",
          "options": [
            "Tuples are immutable, guaranteeing dimensions cannot be accidentally modified or corrupted by other functions",
            "Tuples hold larger numbers than lists",
            "Lists cannot store numbers",
            "Tuples run 100x faster"
          ],
          "answer": 0,
          "explanation": "Tuples provide data integrity. When data should remain fixed (like coordinate pairs or screen dimensions), immutability prevents bugs.",
          "question_es": "¿Por qué deberías usar una Tupla en lugar de una Lista para dimensiones de pantalla como `(1920, 1080)`?",
          "options_es": [
            "Las tuplas son inmutables, garantizando que las dimensiones no se alteren accidentalmente por otras funciones",
            "Las tuplas admiten números más grandes que las listas",
            "Las listas no pueden almacenar números",
            "Las tuplas corren 100 veces más rápido"
          ],
          "explanation_es": "Las tuplas garantizan la integridad de los datos. Cuando los valores deben permanecer fijos (como coordenadas o resoluciones), la inmutabilidad previene errores."
        },
        "title_es": "Rebanado (Slicing), Copias (.copy() vs =) y Tuplas",
        "why_es": "`lista_b = lista_a` NO copia los elementos: ¡crea un segundo alias a la misma lista en RAM! Para proteger datos, usa `.copy()` o rebanadas `[:]`.",
        "concept_es": "Rebanado: `lista[inicio:fin]`. Copia segura: `amigo = mi_ruta.copy()`. Tuplas: definidas entre paréntesis `(1920, 1080)` y son inmutables (solo lectura).",
        "pitfall_es": "Escribir `b = a` y modificar `b`, lo cual altera en secreto a `a` porque ambos apuntan a la misma dirección de memoria."
      }
    ],
    "title_es": "Trabajando con Listas, Rebanadas y Tuplas",
    "desc_es": "Recorrer listas con bucles for, generar secuencias numéricas con range(), rebanadas [:], copia de listas frente a asignación, y tuplas inmutables."
  },
  {
    "num": 4,
    "code_module": "Module 3.1",
    "title": "Decision Structures with if, elif, else",
    "icon": "🔀",
    "prof_source": "Prof. Jade Cao (CCCC) — Lecture_Module3.1_If_Statements.ipynb",
    "desc": "Boolean conditions, = vs ==, string case handling, multiple conditions (and, or, in), if-elif-else chains, Smart Café Order Assistant.",
    "sections": [
      {
        "id": "4-1",
        "num": "4.1",
        "title": "Comparisons, Boolean Logic & Membership (in)",
        "why": "Programs must branch based on live data. Relational operators compare values; logical operators combine rules; `in` checks if an item exists in a list.",
        "concept": "`==` checks equality; `=` assigns. `in` checks membership in lists/strings. Case handling: `answer.lower() == 'yes'`. Multiple: `and` (both), `or` (either).",
        "code": "available = ['espresso', 'latte', 'cold brew']\nrequested = 'latte'\nif requested in available:\n    print(f'Serving your {requested}!')\nelse:\n    print(f'Sorry, we are out of {requested}.')",
        "expected_output": "Serving your latte!",
        "pitfall": "Accidentally using single `=` inside an `if` header instead of `==`.",
        "rep": {
          "title": "Café Order Availability Rep",
          "prompt": "Given menu = ['muffin', 'bagel', 'scone'] and item = 'bagel', check if item in menu and set available=True.",
          "starter": "menu = ['muffin', 'bagel', 'scone']\nitem = 'bagel'\navailable = item in menu\nprint(available)",
          "test_var": "available",
          "expected_val": "True",
          "title_es": "Repetición: Disponibilidad de Menú de Café",
          "prompt_es": "Dado menu = ['muffin', 'bagel', 'scone'] e item = 'bagel', comprueba si item in menu y asigna available=True."
        },
        "quiz": {
          "question": "What is the output of `'admin' in ['alice', 'bob', 'charlie']`?",
          "options": [
            "True",
            "False",
            "None",
            "TypeError"
          ],
          "answer": 1,
          "explanation": "The `in` keyword checks if the item is an element of the collection. Since 'admin' is not in the list, it returns False.",
          "question_es": "¿Cuál es el resultado de `'admin' in ['alice', 'bob', 'charlie']`?",
          "options_es": [
            "True",
            "False",
            "None",
            "TypeError"
          ],
          "explanation_es": "La palabra clave `in` comprueba si el elemento pertenece a la colección. Como 'admin' no está en la lista, retorna False."
        },
        "title_es": "Comparaciones, Lógica Booleana y Pertenencia (in)",
        "why_es": "Los programas deben ramificarse según datos en tiempo real. Los operadores relacionales comparan valores; los lógicos combinan reglas; `in` comprueba si un elemento está en una lista.",
        "concept_es": "`==` comprueba igualdad; `=` asigna. `in` comprueba pertenencia en listas/cadenas. Mayúsculas/minúsculas: `resp.lower() == 'si'`. Múltiples: `and` (ambas), `or` (cualquiera).",
        "pitfall_es": "Usar por accidente un solo `=` dentro del encabezado de un `if` en lugar del comparador `==`."
      },
      {
        "id": "4-2",
        "num": "4.2",
        "title": "The if-elif-else Decision Chain",
        "why": "When decisions have more than two outcomes (like pricing tiers or age categories), `if-elif-else` evaluates top to bottom and exits after the first match.",
        "concept": "`if` checks first condition. `elif` (else-if) checks subsequent mutually exclusive conditions. `else` is the catch-all fallback.",
        "code": "size = 'large'\nif size == 'small':\n    price = 3.50\nelif size == 'medium':\n    price = 4.25\nelif size == 'large':\n    price = 5.00\nelse:\n    price = 0.00\nprint(f'{size.title()} Price: ${price:.2f}')",
        "expected_output": "Large Price: $5.00",
        "pitfall": "Using multiple independent `if` statements instead of `elif`, causing multiple branches to trigger unintentionally.",
        "rep": {
          "title": "Drink Size Pricing Rep",
          "prompt": "Given size='medium', set price=3.00 for small, 4.00 for medium, 5.00 for large. Store price in 'drink_price'.",
          "starter": "size = 'medium'\nif size == 'small': drink_price = 3.00\nelif size == 'medium': drink_price = 4.00\nelse: drink_price = 5.00\nprint(drink_price)",
          "test_var": "drink_price",
          "expected_val": "4.0",
          "title_es": "Repetición: Precios por Tamaño de Bebida",
          "prompt_es": "Dado size='medium', asigna price=3.00 para small, 4.00 para medium, 5.00 para large en 'drink_price'."
        },
        "quiz": {
          "question": "In an `if-elif-else` ladder, what happens once Python finds a True condition?",
          "options": [
            "It executes that block and exits the entire ladder, skipping all remaining elif/else checks",
            "It continues checking every other elif below it",
            "It restarts from the top",
            "It converts the values to integers"
          ],
          "answer": 0,
          "explanation": "In an if-elif-else chain, conditions are mutually exclusive. Once one branch evaluates to True, its block runs and the entire rest of the chain is skipped.",
          "question_es": "En una estructura `if-elif-else`, ¿qué sucede una vez que Python encuentra una condición Verdadera (True)?",
          "options_es": [
            "Ejecuta ese bloque y sale de toda la estructura, ignorando el resto de comprobaciones elif/else",
            "Continúa comprobando cada uno de los elif posteriores",
            "Reinicia desde el principio",
            "Convierte los valores a números enteros"
          ],
          "explanation_es": "En una cadena if-elif-else, las condiciones son mutuamente excluyentes. En cuanto una rama resulta Verdadera, su bloque se ejecuta y el resto de la cadena se omite."
        },
        "title_es": "La Cadena de Decisiones if-elif-else",
        "why_es": "Cuando las decisiones tienen más de dos resultados posibles (como niveles de precios o rangos de edad), `if-elif-else` evalúa de arriba a abajo y sale en la primera coincidencia.",
        "concept_es": "`if` evalúa la primera condición. `elif` (else-if) evalúa condiciones posteriores mutuamente excluyentes. `else` es la opción por defecto cuando nada coincide.",
        "pitfall_es": "Usar múltiples sentencias `if` independientes en lugar de `elif`, provocando que varias ramas se ejecuten sin desearlo."
      }
    ],
    "title_es": "Estructuras de Decisión con if, elif, else",
    "desc_es": "Condiciones booleanas, = vs ==, manejo de mayúsculas/minúsculas, condiciones múltiples (and, or, in), cadenas if-elif-else y el Asistente Inteligente de Pedidos de Café."
  },
  {
    "num": 5,
    "code_module": "Module 3.2",
    "title": "Dictionaries: Data with Labels",
    "icon": "📖",
    "prof_source": "Prof. Jade Cao (CCCC) — Lecture_Module3.2_Dictionaries.ipynb",
    "desc": "Prof. Cao introduces Dictionaries right after Lists! Key-value pairs, adding/updating, safe lookups with .get(), looping with .items(), and nesting.",
    "sections": [
      {
        "id": "5-1",
        "num": "5.1",
        "title": "Creating, Accessing & Safe Lookups (.get())",
        "why": "Lists index by number (`items[0]`). But real-world data has labels: name, price, credits. Dictionaries map meaningful keys directly to values.",
        "concept": "`dict = {'key': value}`. Access with `dict['key']`. If key might not exist, `dict.get(key, default)` returns the default instead of crashing with KeyError.",
        "code": "course = {'code': 'CSC121', 'title': 'Python Programming', 'credits': 3}\nprint(f\"{course['code']}: {course['title']}\")\nprereq = course.get('prereq', 'None required')\nprint(f'Prerequisite: {prereq}')",
        "expected_output": "CSC121: Python Programming\nPrerequisite: None required",
        "pitfall": "Directly accessing `course['prereq']` when the key doesn't exist raises a fatal KeyError. Always use `.get()` for optional fields!",
        "rep": {
          "title": "Campus Course Record Rep",
          "prompt": "Create course = {'name': 'Python', 'seats': 24}. Add key 'instructor' = 'Jade Cao'. Store instructor in 'prof'.",
          "starter": "course = {'name': 'Python', 'seats': 24}\ncourse['instructor'] = 'Jade Cao'\nprof = course['instructor']\nprint(prof)",
          "test_var": "prof",
          "expected_val": "Jade Cao",
          "title_es": "Repetición: Registro de Curso Universitario",
          "prompt_es": "Crea course = {'name': 'Python', 'seats': 24}. Agrega la clave 'instructor' = 'Jade Cao'. Guarda en 'prof'."
        },
        "quiz": {
          "question": "What does `{'theme': 'dark'}.get('font_size', 14)` return?",
          "options": [
            "KeyError",
            "None",
            "14",
            "'dark'"
          ],
          "answer": 2,
          "explanation": "Since 'font_size' is not in the dictionary, `.get()` safely returns the provided fallback default of 14!",
          "question_es": "¿Qué retorna `{'theme': 'dark'}.get('font_size', 14)`?",
          "options_es": [
            "KeyError",
            "None",
            "14",
            "'dark'"
          ],
          "explanation_es": "Dado que 'font_size' no está en el diccionario, `.get()` retorna de forma segura el valor de respaldo proporcionado: 14."
        },
        "title_es": "Creación, Acceso y Búsquedas Seguras (.get())",
        "why_es": "Las listas se indexan por número (`items[0]`). Pero los datos reales tienen etiquetas: nombre, precio, créditos. Los diccionarios asocian claves significativas directamente a valores.",
        "concept_es": "`dict = {'clave': valor}`. Acceso con `dict['clave']`. Si la clave podría no existir, `dict.get(clave, por_defecto)` retorna el valor por defecto sin fallar con KeyError.",
        "pitfall_es": "Acceder directamente a `curso['prereq']` cuando la clave no existe genera un error fatal KeyError. ¡Usa siempre `.get()` para campos opcionales!"
      },
      {
        "id": "5-2",
        "num": "5.2",
        "title": "Looping through Dictionaries (.items(), .keys())",
        "why": "To display a summary or calculate totals across a dictionary, you need to iterate through its entries without knowing every key ahead of time.",
        "concept": "`for key, val in dict.items():` gives you both key and value on every iteration. `dict.keys()` gives keys; `dict.values()` gives values.",
        "code": "budget = {'rent': 850, 'groceries': 300, 'gas': 120}\ntotal_spent = 0\nfor category, amount in budget.items():\n    print(f'{category.title()}: ${amount}')\n    total_spent += amount\nprint(f'Total Budget: ${total_spent}')",
        "expected_output": "Rent: $850\nGroceries: $300\nGas: $120\nTotal Budget: $1270",
        "pitfall": "Looping directly with `for item in my_dict:` only loops over the keys, not the key-value pairs. Use `.items()` to unpack both!",
        "rep": {
          "title": "Inventory Total Calculation Rep",
          "prompt": "Given stock = {'apples': 10, 'bananas': 15, 'oranges': 8}, sum all quantities into 'total_fruit'.",
          "starter": "stock = {'apples': 10, 'bananas': 15, 'oranges': 8}\ntotal_fruit = sum(stock.values())\nprint(total_fruit)",
          "test_var": "total_fruit",
          "expected_val": "33",
          "title_es": "Repetición: Cálculo Total de Inventario",
          "prompt_es": "Dado stock = {'apples': 10, 'bananas': 15, 'oranges': 8}, suma todas las cantidades en 'total_fruit'."
        },
        "quiz": {
          "question": "Which dictionary method should you use in a `for` loop to unpack BOTH the key and the value simultaneously?",
          "options": [
            ".keys()",
            ".values()",
            ".items()",
            ".all()"
          ],
          "answer": 2,
          "explanation": "`dict.items()` yields key-value tuples, allowing clean unpacking like `for k, v in dict.items():`.",
          "question_es": "¿Qué método de diccionario debes usar en un bucle `for` para desempaquetar TANTO la clave como el valor simultáneamente?",
          "options_es": [
            ".keys()",
            ".values()",
            ".items()",
            ".all()"
          ],
          "explanation_es": "`dict.items()` produce tuplas de clave y valor, permitiendo un desempaquetado limpio como `for k, v in dict.items():`."
        },
        "title_es": "Recorrer Diccionarios (.items(), .keys())",
        "why_es": "Para mostrar un resumen o calcular totales en un diccionario, necesitas iterar por sus registros sin tener que conocer cada clave de antemano.",
        "concept_es": "`for clave, valor in dict.items():` te entrega ambos elementos en cada ciclo. `dict.keys()` entrega claves; `dict.values()` entrega valores.",
        "pitfall_es": "Hacer un bucle directo con `for item in mi_dict:` solo itera sobre las claves, no los pares clave-valor. ¡Usa `.items()` para desempaquetar ambos!"
      }
    ],
    "title_es": "Diccionarios: Datos con Etiquetas",
    "desc_es": "¡La profesora Cao presenta Diccionarios inmediatamente después de Listas! Pares clave-valor, agregar/actualizar, búsquedas seguras con .get(), iteración con .items() y anidación."
  },
  {
    "num": 6,
    "code_module": "Module 4.1 & 4.2",
    "title": "User Input, while Loops, & Workshops",
    "icon": "🔁",
    "prof_source": "Prof. Jade Cao (CCCC) — Lecture_Module4.1_While_Loops & Module4.2_workshop.ipynb",
    "desc": "input() casting, % modulo, condition-controlled while loops, sentinel values ('quit'), flags, break/continue, and the Grocery/Road Trip Workshops.",
    "sections": [
      {
        "id": "6-1",
        "num": "6.1",
        "title": "while Loops with Sentinels and Flags",
        "why": "A `for` loop runs a fixed number of times. A `while` loop keeps running until a specific condition or sentinel (e.g. user types 'quit') tells it to stop.",
        "concept": "Sentinel: a value that signals stop (e.g. `while answer != 'quit':`). Flags: boolean variable (`active = True`) controlling execution. `break` exits immediately.",
        "code": "tasks = ['lab 1', 'quiz 2', 'reading']\ncompleted = []\nwhile tasks:\n    current = tasks.pop(0)\n    completed.append(current)\nprint(f'Finished all {len(completed)} tasks!')",
        "expected_output": "Finished all 3 tasks!",
        "pitfall": "Forgetting to update the loop condition, creating an infinite loop that freezes your CPU.",
        "rep": {
          "title": "Grocery Cart Accumulator Rep",
          "prompt": "Sum prices = [4.50, 12.00, 3.25] using a while loop into 'cart_total' rounded to 2 decimals.",
          "starter": "prices = [4.50, 12.00, 3.25]\ncart_total = 0.0\nidx = 0\nwhile idx < len(prices):\n    cart_total += prices[idx]\n    idx += 1\ncart_total = round(cart_total, 2)\nprint(cart_total)",
          "test_var": "cart_total",
          "expected_val": "19.75",
          "title_es": "Repetición: Acumulador de Carrito de Compras",
          "prompt_es": "Suma precios = [4.50, 12.00, 3.25] usando un bucle while en 'cart_total' redondeado a 2 decimales."
        },
        "quiz": {
          "question": "What is the purpose of a 'sentinel value' in a while loop?",
          "options": [
            "To encrypt user input",
            "A predetermined input value (like 'quit' or -1) that signals the loop to terminate",
            "A special variable that speeds up math",
            "The starting value of an accumulator"
          ],
          "answer": 1,
          "explanation": "A sentinel is a distinct value entered by a user or encountered in data that signals that data entry is finished and repetition should stop.",
          "question_es": "¿Cuál es el propósito de un 'valor centinela' en un bucle while?",
          "options_es": [
            "Encriptar la entrada del usuario",
            "Un valor de entrada predeterminado (como 'quit' o -1) que indica al bucle que debe terminar",
            "Una variable especial que acelera las matemáticas",
            "El valor inicial de un acumulador"
          ],
          "explanation_es": "Un centinela es un valor distintivo ingresado por el usuario o encontrado en los datos que indica que la captura terminó y la repetición debe parar."
        },
        "title_es": "Bucles while con Centinelas y Banderas",
        "why_es": "Un bucle `for` se ejecuta un número fijo de veces. Un bucle `while` sigue ejecutándose hasta que una condición específica o centinela (ej. usuario escribe 'quit') indica que debe detenerse.",
        "concept_es": "Centinela: un valor que señala el fin (ej. `while respuesta != 'quit':`). Bandera: variable booleana (`activa = True`) que controla el bucle. `break` sale inmediatamente.",
        "pitfall_es": "Olvidar actualizar la condición del bucle, creando un bucle infinito que congela el procesador."
      },
      {
        "id": "6-2",
        "num": "6.2",
        "title": "Problem-Solving Workshop: Integrated Data Structures",
        "why": "Real applications combine tools: a list of dictionaries, updated in a while loop, totaled with an accumulator. This is Prof. Cao's workshop pattern.",
        "concept": "List of dicts: `cart = [{'name': 'Milk', 'price': 3.50}]`. Accumulate totals by looping through the records. Separate data collection from display.",
        "code": "cart = [{'item': 'Apples', 'price': 4.50}, {'item': 'Bread', 'price': 2.75}]\ntotal = sum(i['price'] for i in cart)\nprint(f'Items purchased: {len(cart)}, Total: ${total:.2f}')",
        "expected_output": "Items purchased: 2, Total: $7.25",
        "pitfall": "Trying to sum dictionaries directly: `sum(cart)` raises TypeError because Python cannot add dictionaries. Extract the numeric field!",
        "rep": {
          "title": "Road Trip Stops Accumulator Rep",
          "prompt": "Given stops = [{'city': 'Raleigh', 'miles': 120}, {'city': 'Richmond', 'miles': 140}], calculate total_miles = sum(s['miles'] for s in stops).",
          "starter": "stops = [{'city': 'Raleigh', 'miles': 120}, {'city': 'Richmond', 'miles': 140}]\ntotal_miles = sum(s['miles'] for s in stops)\nprint(total_miles)",
          "test_var": "total_miles",
          "expected_val": "260",
          "title_es": "Repetición: Acumulador de Paradas de Viaje",
          "prompt_es": "Dadas stops = [{'city': 'Raleigh', 'miles': 120}, {'city': 'Richmond', 'miles': 140}], calcula total_miles = sum(s['miles'] for s in stops)."
        },
        "quiz": {
          "question": "If `trip = [{'stop': 'A', 'miles': 50}, {'stop': 'B', 'miles': 70}]`, how do you access the miles of stop B?",
          "options": [
            "trip['miles'][1]",
            "trip[1]['miles']",
            "trip[1][0]",
            "trip.miles[1]"
          ],
          "answer": 1,
          "explanation": "`trip` is a list, so `trip[1]` gets the second dictionary `{'stop': 'B', 'miles': 70}`. Then `['miles']` extracts the value 70!",
          "question_es": "Si `trip = [{'stop': 'A', 'miles': 50}, {'stop': 'B', 'miles': 70}]`, ¿cómo accedes a las millas de la parada B?",
          "options_es": [
            "trip['miles'][1]",
            "trip[1]['miles']",
            "trip[1][0]",
            "trip.miles[1]"
          ],
          "explanation_es": "`trip` es una lista, así que `trip[1]` obtiene el segundo diccionario `{'stop': 'B', 'miles': 70}`. ¡Luego `['miles']` extrae el valor 70!"
        },
        "title_es": "Taller de Resolución de Problemas: Estructuras Integradas",
        "why_es": "Las aplicaciones reales combinan herramientas: una lista de diccionarios, actualizada en un bucle while, totalizada con un acumulador. Este es el patrón de los talleres de la Prof. Cao.",
        "concept_es": "Lista de diccionarios: `carrito = [{'name': 'Milk', 'price': 3.50}]`. Acumula totales recorriendo los registros. Separa la recolección de datos de su visualización.",
        "pitfall_es": "Intentar sumar diccionarios directamente: `sum(carrito)` genera TypeError porque Python no puede sumar diccionarios. ¡Extrae el campo numérico!"
      }
    ],
    "title_es": "Entrada de Usuario, Bucles while y Talleres",
    "desc_es": "Conversión de input(), operador módulo %, bucles while controlados por condición, centinelas ('quit'), banderas, break/continue y talleres de compras/viajes."
  },
  {
    "num": 7,
    "code_module": "Module 5.1 & 5.2",
    "title": "Functions: Modular Program Design",
    "icon": "📦",
    "prof_source": "Prof. Jade Cao (CCCC) — Lecture_Module5.1_Function1 & Module5.2_Function2.ipynb",
    "desc": "Prof. Cao's function series: Give a job a name, parameters vs arguments, defaults, return vs print, None for optional params, passing lists, and modules.",
    "sections": [
      {
        "id": "7-1",
        "num": "7.1",
        "title": "Defining Functions, Parameters, & Return Values",
        "why": "Copy-pasting code creates bugs. A function gives a job a name, packages logic into a reusable block, and returns calculated results.",
        "concept": "`def function_name(param1, param2=default):`. `return` gives data back to caller. Positional arguments match by position; keyword arguments match by name.",
        "code": "def calculate_discount(price, pct=0.10):\n    discount = price * pct\n    return round(price - discount, 2)\nprint(f'Regular sale: ${calculate_discount(50.0):.2f}')\nprint(f'VIP sale: ${calculate_discount(50.0, 0.25):.2f}')",
        "expected_output": "Regular sale: $45.00\nVIP sale: $37.50",
        "pitfall": "Using `print()` inside a function instead of `return`. `print()` only displays text on screen; `return` gives the value back so your program can use it!",
        "rep": {
          "title": "Café Discount Function Rep",
          "prompt": "Write calc_bill(price, tip_pct=0.15) that returns round(price * (1 + tip_pct), 2). Store calc_bill(40.0) in 'bill'.",
          "starter": "def calc_bill(price, tip_pct=0.15):\n    return round(price * (1 + tip_pct), 2)\nbill = calc_bill(40.0)\nprint(bill)",
          "test_var": "bill",
          "expected_val": "46.0",
          "title_es": "Repetición: Función de Descuento de Café",
          "prompt_es": "Escribe calc_bill(price, tip_pct=0.15) que retorne round(price * (1 + tip_pct), 2). Guarda calc_bill(40.0) en 'bill'."
        },
        "quiz": {
          "question": "What is the critical difference between `print()` and `return` inside a function?",
          "options": [
            "They are identical",
            "`print()` displays text on screen for a human, while `return` sends a value back into memory for the program to use in other calculations",
            "`return` can only output text",
            "`print()` is required in every function"
          ],
          "answer": 1,
          "explanation": "`print()` is a display side-effect. `return` passes the computed result back to the caller so it can be assigned to a variable or used in an `if` condition.",
          "question_es": "¿Cuál es la diferencia fundamental entre `print()` y `return` dentro de una función?",
          "options_es": [
            "Son exactamente idénticos",
            "`print()` muestra texto en pantalla para un humano, mientras que `return` envía un valor a la memoria para que el programa lo use en otros cálculos",
            "`return` solo puede devolver texto",
            "`print()` es obligatorio en cada función"
          ],
          "explanation_es": "`print()` es un efecto visual. `return` entrega el resultado calculado a quien llamó a la función para asignarlo a variables o usarlo en condiciones `if`."
        },
        "title_es": "Definición de Funciones, Parámetros y Retorno",
        "why_es": "Copiar y pegar código crea errores. Una función da un nombre a una tarea, empaqueta la lógica en un bloque reutilizable y devuelve resultados calculados.",
        "concept_es": "`def nombre_funcion(param1, param2=defecto):`. `return` devuelve datos a quien llama. Argumentos posicionales coinciden por posición; por clave coinciden por nombre.",
        "pitfall_es": "Usar `print()` dentro de una función en vez de `return`. `print()` solo muestra texto en pantalla; ¡`return` entrega el valor para que el programa pueda utilizarlo!"
      },
      {
        "id": "7-2",
        "num": "7.2",
        "title": "Optional Parameters with None & Passing Lists",
        "why": "Functions should handle both complete and partial data. Using `None` allows optional parameters. Passing lists allows functions to process batches.",
        "concept": "Optional param: `def build_user(name, nickname=None):`. Passing lists: modifying a list inside a function changes the caller's list unless you pass a copy `my_list[:]`.",
        "code": "def build_player(name, title=None):\n    if title:\n        return f'{name} the {title}'\n    return name\nprint(build_player('Jordan'))\nprint(build_player('Maya', 'Dragon Slayer'))",
        "expected_output": "Jordan\nMaya the Dragon Slayer",
        "pitfall": "Modifying a passed list inside a function unintentionally alters the caller's data. Pass `list[:]` if you need to protect the original.",
        "rep": {
          "title": "Character Profile Function Rep",
          "prompt": "Write format_title(name, rank=None). If rank, return f'{name} ({rank})', else return name. Store format_title('Chris', 'Captain') in 'title'.",
          "starter": "def format_title(name, rank=None):\n    if rank:\n        return f'{name} ({rank})'\n    return name\ntitle = format_title('Chris', 'Captain')\nprint(title)",
          "test_var": "title",
          "expected_val": "Chris (Captain)",
          "title_es": "Repetición: Función de Perfil de Personaje",
          "prompt_es": "Escribe format_title(name, rank=None). Si rank existe, retorna f'{name} ({rank})', si no retorna name. Guarda format_title('Chris', 'Captain') en 'title'."
        },
        "quiz": {
          "question": "If you want to pass a list `todo` to a function without allowing the function to modify your original list, what should you pass?",
          "options": [
            "`todo`",
            "`todo[:]` (a slice copy)",
            "`str(todo)`",
            "`None`"
          ],
          "answer": 1,
          "explanation": "Passing `todo[:]` creates a slice copy of the list. The function can modify its copy freely without altering the caller's original list in memory.",
          "question_es": "Si deseas pasar una lista `todo` a una función sin permitir que la función modifique tu lista original, ¿qué debes pasar?",
          "options_es": [
            "`todo`",
            "`todo[:]` (una copia por rebanada)",
            "`str(todo)`",
            "`None`"
          ],
          "explanation_es": "Pasar `todo[:]` genera una copia de la lista. La función puede modificar su copia libremente sin alterar la lista original en la memoria."
        },
        "title_es": "Parámetros Opcionales con None y Paso de Listas",
        "why_es": "Las funciones deben manejar datos completos y parciales. Usar `None` permite parámetros opcionales. Pasar listas permite procesar lotes de datos.",
        "concept_es": "Parámetro opcional: `def crear_usuario(nombre, apodo=None):`. Paso de listas: modificar una lista dentro de una función altera la lista original a menos que pases una copia `mi_lista[:]`.",
        "pitfall_es": "Modificar una lista recibida dentro de una función altera involuntariamente los datos originales. Pasa `lista[:]` si necesitas protegerla."
      }
    ],
    "title_es": "Funciones: Diseño Modular de Programas",
    "desc_es": "La serie de funciones de la Prof. Cao: dar un nombre a una tarea, parámetros frente a argumentos, valores por defecto, return vs print, None para parámetros opcionales y paso de listas."
  },
  {
    "num": 8,
    "code_module": "Extended Ch 6",
    "title": "Files, Exceptions, & Data Persistence",
    "icon": "📁",
    "prof_source": "Tony Gaddis (6th Ed.) — Chapter 6 Companion",
    "desc": "Moving beyond RAM: writing to disk ('w', 'a'), reading records ('r'), the with statement, and robust error recovery with try-except blocks.",
    "sections": [
      {
        "id": "8-1",
        "num": "8.1",
        "title": "File I/O and The with Statement",
        "why": "Variables disappear when programs terminate. Files preserve data on disk permanently. The `with` statement guarantees files close cleanly even if crashes occur.",
        "concept": "Modes: 'r' (read), 'w' (overwrite), 'a' (append). Context manager: `with open('data.txt', 'r') as f:`. Clean newlines with `.rstrip('\\n')`.",
        "code": "lines = ['Python Programming', 'Central Carolina Community College']\nfor line in lines:\n    print(f'Disk record: {line}')",
        "expected_output": "Disk record: Python Programming\nDisk record: Central Carolina Community College",
        "pitfall": "Opening an existing file in 'w' mode by mistake. Mode 'w' instantly truncates (erases) the file! Use 'a' to append.",
        "rep": {
          "title": "File Line Stripper Rep",
          "prompt": "Strip trailing newline from raw = 'data_record\\\\n' and store in 'clean_record'.",
          "starter": "raw = 'data_record\\n'\nclean_record = raw.rstrip('\\n')\nprint(clean_record)",
          "test_var": "clean_record",
          "expected_val": "data_record",
          "title_es": "Repetición: Limpieza de Línea de Archivo",
          "prompt_es": "Elimina el salto de línea final de raw = 'data_record\\\\n' y guarda en 'clean_record'."
        },
        "quiz": {
          "question": "Which file mode adds new content to the end of a file without erasing its existing data?",
          "options": [
            "'w'",
            "'r'",
            "'a'",
            "'x'"
          ],
          "answer": 2,
          "explanation": "Mode 'a' (Append) preserves existing file contents and writes all new records to the end of the file.",
          "question_es": "¿Qué modo de archivo añade nuevo contenido al final de un archivo sin borrar sus datos existentes?",
          "options_es": [
            "'w'",
            "'r'",
            "'a'",
            "'x'"
          ],
          "explanation_es": "El modo 'a' (Append) conserva los contenidos existentes del archivo y escribe todos los nuevos registros al final del mismo."
        },
        "title_es": "Entrada/Salida de Archivos y la Sentencia with",
        "why_es": "Las variables desaparecen cuando el programa termina. Los archivos conservan los datos en el disco de forma permanente. La sentencia `with` garantiza que los archivos se cierren limpiamente.",
        "concept_es": "Modos: 'r' (lectura), 'w' (sobrescribir), 'a' (anexar). Administrador de contexto: `with open('datos.txt', 'r') as f:`. Limpia saltos de línea con `.rstrip('\\n')`.",
        "pitfall_es": "Abrir un archivo existente en modo 'w' por error. ¡El modo 'w' borra instantáneamente todo el contenido previo! Usa 'a' para agregar al final."
      },
      {
        "id": "8-2",
        "num": "8.2",
        "title": "Exception Handling: try, except, finally",
        "why": "In the real world, users enter bad data and files go missing. Exception handling catches crashes gracefully and provides recovery instructions.",
        "concept": "`try:` runs code that might fail. `except ValueError:` catches specific error. `else:` runs if no error. `finally:` runs always.",
        "code": "user_entry = 'ninety'\ntry:\n    score = int(user_entry)\n    print(f'Score: {score}')\nexcept ValueError:\n    print('Handled: User entered non-numeric characters. Prompting again.')",
        "expected_output": "Handled: User entered non-numeric characters. Prompting again.",
        "pitfall": "Catching bare `except:` without specifying the error type, which silently hides syntax typos or NameErrors.",
        "rep": {
          "title": "Safe Integer Converter Rep",
          "prompt": "Try int('invalid'). On ValueError, set status='recovered'.",
          "starter": "try:\n    val = int('invalid')\nexcept ValueError:\n    status = 'recovered'\nprint(status)",
          "test_var": "status",
          "expected_val": "recovered",
          "title_es": "Repetición: Convertidor Seguro de Enteros",
          "prompt_es": "Intenta int('invalido'). Al ocurrir ValueError, asigna status='recovered'."
        },
        "quiz": {
          "question": "Which block in a try-except structure executes regardless of whether an exception occurred or not?",
          "options": [
            "else",
            "except",
            "finally",
            "catch"
          ],
          "answer": 2,
          "explanation": "`finally` always executes at the end, making it ideal for cleanup tasks like closing database connections or release file locks.",
          "question_es": "¿Qué bloque en una estructura try-except se ejecuta sin importar si ocurrió una excepción o no?",
          "options_es": [
            "else",
            "except",
            "finally",
            "catch"
          ],
          "explanation_es": "`finally` siempre se ejecuta al final, haciéndolo ideal para tareas de limpieza como cerrar conexiones a bases de datos o liberar archivos."
        },
        "title_es": "Manejo de Excepciones: try, except, finally",
        "why_es": "En el mundo real, los usuarios ingresan datos incorrectos y los archivos pueden no existir. El manejo de excepciones captura los fallos con gracia y ofrece instrucciones de recuperación.",
        "concept_es": "`try:` ejecuta código que podría fallar. `except ValueError:` captura un error específico. `else:` corre si no hubo error. `finally:` corre siempre.",
        "pitfall_es": "Capturar con un `except:` general sin especificar el tipo de error, lo cual oculta errores tipográficos de sintaxis o NameErrors."
      }
    ],
    "title_es": "Archivos, Excepciones y Persistencia de Datos",
    "desc_es": "Más allá de la RAM: escribir en disco ('w', 'a'), leer registros ('r'), la sentencia with y recuperación robusta de errores con bloques try-except."
  },
  {
    "num": 9,
    "code_module": "Extended Ch 10 & 11",
    "title": "Classes, OOP & Encapsulation",
    "icon": "🏗️",
    "prof_source": "Tony Gaddis (6th Ed.) — Chapters 10 & 11 Companion",
    "desc": "Object-Oriented Programming: classes as blueprints, instances in memory, __init__, encapsulation with private attributes, and inheritance.",
    "sections": [
      {
        "id": "9-1",
        "num": "9.1",
        "title": "Classes, __init__, and Encapsulation",
        "why": "Procedural code scatters data and functions across a program. OOP binds data (attributes) and behavior (methods) together into a cohesive entity.",
        "concept": "`class Name:` defines blueprint. `__init__(self, ...)` sets up state. `self` refers to active instance. Private attributes (`__var`) prevent unauthorized modification.",
        "code": "class BankAccount:\n    def __init__(self, owner, balance=0.0):\n        self.owner = owner\n        self.__balance = balance\n    def deposit(self, amount):\n        if amount > 0: self.__balance += amount\n    def get_balance(self):\n        return self.__balance\nacct = BankAccount('Maria', 150.0)\nacct.deposit(50.0)\nprint(f\"{acct.owner}'s balance: ${acct.get_balance():.2f}\")",
        "expected_output": "Maria's balance: $200.00",
        "pitfall": "Forgetting `self` as the first argument in class methods, which causes TypeError when calling `instance.method()`.",
        "rep": {
          "title": "Student Class Rep",
          "prompt": "Create class Student with __init__(self, name, major). Create s = Student('Alex', 'CS'). Store s.name in 'st_name'.",
          "starter": "class Student:\n    def __init__(self, name, major):\n        self.name = name\n        self.major = major\ns = Student('Alex', 'CS')\nst_name = s.name\nprint(st_name)",
          "test_var": "st_name",
          "expected_val": "Alex",
          "title_es": "Repetición: Clase Student",
          "prompt_es": "Crea la clase Student con __init__(self, name, major). Crea s = Student('Alex', 'CS'). Guarda s.name en 'st_name'."
        },
        "quiz": {
          "question": "What is the role of the `self` parameter in Python class methods?",
          "options": [
            "It is a keyword that imports standard classes",
            "It represents the specific instance of the object invoking the method",
            "It hides the method from other files",
            "It is an optional comment"
          ],
          "answer": 1,
          "explanation": "`self` provides the method access to that particular object's unique attributes in RAM.",
          "question_es": "¿Cuál es el rol del parámetro `self` en los métodos de clase en Python?",
          "options_es": [
            "Es una palabra clave para importar clases estándar",
            "Representa la instancia específica del objeto que invoca el método",
            "Oculta el método de otros archivos",
            "Es un comentario opcional"
          ],
          "explanation_es": "`self` brinda al método acceso a los atributos únicos de ese objeto en particular dentro de la memoria RAM."
        },
        "title_es": "Clases, __init__ y Encapsulación",
        "why_es": "El código procedimental dispersa datos y funciones. La POO agrupa datos (atributos) y comportamiento (métodos) en una sola entidad coherente.",
        "concept_es": "`class Nombre:` define el plano. `__init__(self, ...)` inicializa el estado. `self` refiere a la instancia activa. Atributos privados (`__var`) previenen alteraciones no autorizadas.",
        "pitfall_es": "Olvidar `self` como primer parámetro en métodos de clase, lo que provoca TypeError al invocar `instancia.metodo()`."
      }
    ],
    "title_es": "Clases, Programación Orientada a Objetos y Encapsulación",
    "desc_es": "Programación Orientada a Objetos: clases como planos de diseño, instancias en memoria, __init__, encapsulación con atributos privados y herencia."
  },
  {
    "num": 10,
    "code_module": "Extended Ch 14",
    "title": "Database Programming with SQLite",
    "icon": "🗄️",
    "prof_source": "Tony Gaddis (6th Ed.) — Chapter 14 Companion",
    "desc": "Connecting to SQLite databases, creating tables, parameterized CRUD queries, and preventing SQL injection attacks.",
    "sections": [
      {
        "id": "10-1",
        "num": "10.1",
        "title": "SQLite CRUD & Parameterized Queries",
        "why": "Flat text files can't handle multiple simultaneous users or indexed queries. Relational databases provide structured, indexed, ACID storage.",
        "concept": "`sqlite3.connect()`. `cur.execute()`. Always use `?` placeholders for user data to prevent catastrophic SQL injection attacks. `conn.commit()` saves changes.",
        "code": "import sqlite3\nconn = sqlite3.connect(':memory:')\ncur = conn.cursor()\ncur.execute('CREATE TABLE Courses (Code TEXT, Credits INT)')\ncur.execute('INSERT INTO Courses VALUES (?, ?)', ('CSC121', 3))\nconn.commit()\ncur.execute('SELECT * FROM Courses')\nprint(f'DB Record: {cur.fetchone()}')\nconn.close()",
        "expected_output": "DB Record: ('CSC121', 3)",
        "pitfall": "Using f-strings (f'INSERT INTO ... {val}') to construct SQL queries, which leaves your application wide open to SQL injection attacks!",
        "rep": {
          "title": "Parameterized SQL Query Rep",
          "prompt": "Create query string with ? placeholder: sql = 'SELECT * FROM Students WHERE major = ?'. Store in 'query'.",
          "starter": "query = 'SELECT * FROM Students WHERE major = ?'\nprint(query)",
          "test_var": "query",
          "expected_val": "SELECT * FROM Students WHERE major = ?",
          "title_es": "Repetición: Consulta SQL Parametrizada",
          "prompt_es": "Crea una cadena de consulta con marcador ?: sql = 'SELECT * FROM Students WHERE major = ?'. Guarda en 'query'."
        },
        "quiz": {
          "question": "Why should you always use '?' placeholders instead of string formatting in SQL queries?",
          "options": [
            "F-strings are illegal in Python SQL modules",
            "'?' placeholders ensure user input is treated strictly as data, completely preventing SQL Injection attacks",
            "'?' makes queries run faster in RAM",
            "SQL only accepts question marks"
          ],
          "answer": 1,
          "explanation": "Parameterized queries treat inputs as literal data values, preventing attackers from injecting executable SQL commands into your database.",
          "question_es": "¿Por qué siempre debes usar marcadores de posición '?' en lugar de formato de cadenas en consultas SQL?",
          "options_es": [
            "Las f-strings son ilegales en módulos SQL de Python",
            "Los marcadores '?' aseguran que la entrada del usuario se trate estrictamente como dato, impidiendo ataques de Inyección SQL",
            "'?' hace que las consultas se ejecuten más rápido en RAM",
            "SQL solo acepta signos de interrogación"
          ],
          "explanation_es": "Las consultas parametrizadas tratan las entradas como datos literales, impidiendo que usuarios malintencionados inyecten comandos SQL ejecutables en tu base de datos."
        },
        "title_es": "CRUD en SQLite y Consultas Parametrizadas",
        "why_es": "Los archivos de texto plano no pueden gestionar múltiples usuarios concurrentes ni consultas indexadas. Las bases de datos relacionales proporcionan almacenamiento estructurado, indexado y seguro.",
        "concept_es": "`sqlite3.connect()`. `cur.execute()`. Usa siempre marcadores de posición `?` para datos de usuario para evitar ataques de inyección SQL. `conn.commit()` guarda cambios.",
        "pitfall_es": "¡Usar f-strings (f'INSERT INTO ... {val}') para construir consultas SQL deja tu aplicación completamente vulnerable a ataques de inyección SQL!"
      }
    ],
    "title_es": "Programación de Bases de Datos con SQLite",
    "desc_es": "Conexión a bases de datos SQLite, creación de tablas, consultas CRUD parametrizadas y prevención de ataques de inyección SQL."
  }
];

/**
 * Dynamically returns localized chapters based on active language.
 * When lang === 'es', swaps in Spanish titles, descriptions, why explanations,
 * pitfalls, and quiz questions.
 */
export function getLocalizedChapters(lang = 'en') {
  if (lang !== 'es') return CHAPTERS_DATA;
  return CHAPTERS_DATA.map(ch => ({
    ...ch,
    title: ch.title_es || ch.title,
    desc: ch.desc_es || ch.desc,
    sections: ch.sections.map(sec => ({
      ...sec,
      title: sec.title_es || sec.title,
      why: sec.why_es || sec.why,
      concept: sec.concept_es || sec.concept,
      pitfall: sec.pitfall_es || sec.pitfall,
      quiz: sec.quiz ? {
        ...sec.quiz,
        question: sec.quiz.question_es || sec.quiz.question,
        options: sec.quiz.options_es || sec.quiz.options,
        explanation: sec.quiz.explanation_es || sec.quiz.explanation
      } : sec.quiz,
      rep: sec.rep ? {
        ...sec.rep,
        title: sec.rep.title_es || sec.rep.title,
        prompt: sec.rep.prompt_es || sec.rep.prompt
      } : sec.rep
    }))
  }));
}
