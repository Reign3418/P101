// Bilingual Curriculum Dataset: English & Spanish with Deep Dive & Gaddis Book References
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
        "pitfall_es": "¡Olvidar que las variables en Python distinguen mayúsculas y minúsculas: `Score` y `score` son dos ranuras de memoria completamente diferentes!",
        "book_ref": {
          "gaddis_chapter": 2,
          "gaddis_section": "Section 2.7",
          "title": "Variables and Assignment Statements",
          "explanation": "Gaddis explains that in Python, a variable is not a physical container—it is a name that references an object created in computer memory (RAM). When an assignment statement executes, Python evaluates the expression on the right-hand side first, allocates memory for the value, and binds the variable name on the left to that address.",
          "explanation_es": "Gaddis explica que en Python una variable no es un contenedor físico, sino un nombre que hace referencia a un objeto creado en la memoria RAM. Al ejecutarse una asignación, Python primero evalúa la expresión del lado derecho, reserva memoria para el valor y vincula el nombre de la variable de la izquierda a esa dirección."
        },
        "breakdown": {
          "analogy": "Think of RAM as a vast warehouse of numbered storage boxes. You do not write 'score' on the box; instead, '95' is placed inside a box, and you attach a luggage tag labeled 'score' with a string pointing directly to that box.",
          "analogy_es": "Imagina la memoria RAM como un almacén gigante con casilleros numerados. No escribes 'score' en el casillero; en su lugar, colocas '95' adentro y le atas una etiqueta con el nombre 'score' que apunta directamente a ese casillero.",
          "steps": [
            "1. Evaluation: The CPU reads 95 and builds an integer object in RAM (e.g. at memory address 0x104A).",
            "2. Tagging: Python writes the name 'score' in its internal variable table and points it to address 0x104A.",
            "3. Reassignment: If you later write score = 96, Python creates a brand-new object '96' elsewhere and moves the tag."
          ],
          "steps_es": [
            "1. Evaluación: La CPU lee 95 y construye un objeto entero en RAM (ej. dirección de memoria 0x104A).",
            "2. Etiquetado: Python registra el nombre 'score' en su tabla interna y lo vincula a la dirección 0x104A.",
            "3. Reasignación: Si luego ejecutas score = 96, Python crea un nuevo objeto '96' en otra dirección y traslada la etiqueta."
          ]
        },
        "deep_dive": {
          "concept": "Object References & Integer Interning",
          "detail": "In Python, everything is a first-class object. Unlike languages where variables hold raw binary in fixed memory slots, Python variables are pointer references. You can inspect an object's memory address using id(score). Furthermore, CPython pre-allocates and caches small integers from -5 to 256 ('interning'); any variable assigned to 95 shares the exact same memory address to conserve RAM.",
          "detail_es": "En Python, todo es un objeto de primera clase. A diferencia de lenguajes donde las variables guardan binario directo en ranuras fijas, en Python son punteros de referencia. Puedes ver la dirección de memoria usando id(score). Además, CPython precarga en caché los enteros pequeños de -5 a 256 ('interning'), compartiendo la misma dirección de memoria para ahorrar RAM."
        }
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
        "pitfall_es": "¡Las cadenas en Python son inmutables! Llamar a `name.strip()` NO modifica `name` a menos que lo reasignes: `name = name.strip()`.",
        "book_ref": {
          "gaddis_chapter": 2,
          "gaddis_section": "Sections 2.4 & 2.8",
          "title": "String Literals, Formatting & Immutability",
          "explanation": "Gaddis emphasizes that strings are immutable sequences of characters. Methods like .strip(), .lower(), or .title() never alter the original string in place—they construct and return a brand-new string in memory. If you do not assign the returned string back to a variable, the cleaned version is immediately garbage-collected.",
          "explanation_es": "Gaddis enfatiza que las cadenas de texto son secuencias inmutables de caracteres. Métodos como .strip(), .lower() o .title() nunca modifican la cadena original; crean y devuelven una cadena totalmente nueva en RAM. Si no reasignas el resultado a una variable, la versión limpia se descarta inmediatamente."
        },
        "breakdown": {
          "analogy": "Imagine writing a sentence on a stone tablet with a chisel. You cannot erase spaces or fix capitalization on that tablet. To clean it, you must copy the polished letters onto a fresh tablet and hand that one to the reader.",
          "analogy_es": "Imagina escribir una frase en una lápida de piedra con cincel. No puedes borrar espacios ni corregir mayúsculas en esa piedra. Para corregirla, debes tallar las letras limpias en una piedra nueva y entregar esa nueva piedra.",
          "steps": [
            "1. Raw Input: raw_name = '  maya  ' stores the spaces and characters at memory address A.",
            "2. Method Call: raw_name.strip() calculates 'maya' and places it at new memory address B.",
            "3. Crucial Assignment: Writing name = raw_name.strip() moves the 'name' tag to address B. Without reassignment, address B is lost."
          ],
          "steps_es": [
            "1. Entrada Original: raw_name = '  maya  ' almacena los espacios y caracteres en la dirección A.",
            "2. Llamada al Método: raw_name.strip() calcula 'maya' y lo coloca en una nueva dirección B.",
            "3. Asignación Clave: Escribir name = raw_name.strip() mueve la etiqueta 'name' a la dirección B. Sin reasignar, la dirección B se pierde."
          ]
        },
        "deep_dive": {
          "concept": "String Immutability & f-String Bytecode",
          "detail": "Why are strings immutable in Python? Thread-safety and hashability! Because strings cannot change, Python can safely use them as dictionary keys and hash them once. When using f-strings (f'Hello {name}'), Python converts this directly into the BUILD_STRING bytecode instruction, which executes faster than the older % or .format() methods.",
          "detail_es": "¿Por qué las cadenas son inmutables en Python? ¡Por seguridad en hilos y capacidad de hash! Al no poder cambiar, Python las usa de forma segura como claves de diccionarios. Las f-strings (f'Hola {nombre}') se compilan directamente en la instrucción de bytecode BUILD_STRING, siendo mucho más rápidas que % o .format()."
        }
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
        "pitfall_es": "IndexError: intentar acceder a un índice igual a len(lista). Para una lista de 3 elementos, los índices válidos son 0, 1, 2. ¡El índice 3 provoca un error fatal!",
        "book_ref": {
          "gaddis_chapter": 7,
          "gaddis_section": "Sections 7.1 & 7.2",
          "title": "Introduction to Lists & Indexing",
          "explanation": "Gaddis introduces lists as mutable, dynamic sequences. Unlike static arrays in other languages, Python lists automatically resize in RAM. Gaddis details zero-based indexing (0 to len-1) and negative indexing (-1 to -len), showing how Python computes the target element's memory offset.",
          "explanation_es": "Gaddis presenta las listas como secuencias dinámicas y mutables. A diferencia de los arreglos estáticos en otros lenguajes, las listas en Python se redimensionan automáticamente en la RAM. Detalla la indexación desde cero (0 a len-1) y la negativa (-1 a -len), mostrando cómo calcula el desplazamiento en memoria."
        },
        "breakdown": {
          "analogy": "Picture a train with linked freight cars. Index 0 is the engine cab, index 1 is the next car, and index -1 is the caboose at the very end. Calling .append() couples a new car to the back, while .insert(0) decouples the engine and pushes every existing car back by one slot.",
          "analogy_es": "Imagina un tren con vagones enlazados. El índice 0 es la locomotora, el 1 es el siguiente vagón y el -1 es el furgón de cola. Usar .append() engancha un vagón al final, mientras que .insert(0) desacopla la locomotora y empuja todos los vagones un espacio hacia atrás.",
          "steps": [
            "1. Zero-Based Indexing: The index represents the offset (distance) from the start. Offset 0 means 'right at the beginning'.",
            "2. Memory Overhead: .append() is blazing fast (O(1)) because it adds to the tail. .insert(0) is expensive (O(n)) because Python must shift every item one index right.",
            "3. Bounds Check: Attempting to read list[len(list)] triggers IndexError because indexing stops at length - 1."
          ],
          "steps_es": [
            "1. Indexación en Base 0: El índice representa el desplazamiento (distancia) desde el inicio. El desplazamiento 0 significa 'justo al comienzo'.",
            "2. Costo de Memoria: .append() es ultra rápido (O(1)) porque agrega al final. .insert(0) es costoso (O(n)) porque Python debe desplazar todos los elementos un lugar a la derecha.",
            "3. Límite de Rango: Intentar leer list[len(list)] genera IndexError porque la indexación termina en longitud - 1."
          ]
        },
        "deep_dive": {
          "concept": "Dynamic Array Over-Allocation",
          "detail": "Under the hood, a Python list is a C array of pointers. When a list runs out of room, CPython doesn't allocate just 1 extra slot—it over-allocates proportional extra capacity (approximately 1.125x + 3 slots). This over-allocation guarantees that .append() achieves amortized O(1) constant time performance in high-throughput applications.",
          "detail_es": "Internamente, una lista de Python es un arreglo en C de punteros. Cuando se queda sin espacio, CPython no asigna solo 1 espacio extra, sino que reserva capacidad proporcional adicional (aprox. 1.125x + 3 espacios). Esta sobreasignación garantiza que .append() logre un tiempo constante O(1) amortizado en sistemas de alto rendimiento."
        }
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
        "pitfall_es": "Escribir `mi_lista = mi_lista.sort()`. `sort()` modifica la lista directamente y retorna `None`, ¡por lo que `mi_lista` se convierte en `None`!",
        "book_ref": {
          "gaddis_chapter": 7,
          "gaddis_section": "Sections 7.3 & 7.4",
          "title": "List Methods: del, pop, remove, and In-Place Sorting",
          "explanation": "Gaddis outlines the vital behavioral differences between removal operations: 'del list[i]' removes an element by index without returning it; 'list.pop(i)' removes and hands the value back to your program; 'list.remove(val)' searches for the first occurrence of a value. Furthermore, .sort() modifies the list in place and returns None.",
          "explanation_es": "Gaddis detalla las diferencias cruciales entre las operaciones de eliminación: 'del lista[i]' elimina por índice sin devolver nada; 'lista.pop(i)' extrae el elemento y te lo entrega; 'lista.remove(valor)' busca la primera coincidencia. Además, .sort() ordena la lista directamente y retorna None."
        },
        "breakdown": {
          "analogy": "Imagine an office inbox tray. 'del' is like shredding folder #2 without looking. 'pop()' is picking up folder #2 and placing it on your desk to read. 'remove()' is searching the stack for the folder titled 'Invoices' and discarding it.",
          "analogy_es": "Imagina una bandeja de oficina con carpetas. 'del' es como triturar la carpeta #2 sin mirarla. 'pop()' es tomar la carpeta #2 y ponerla en tu escritorio para trabajar con ella. 'remove()' es buscar en la pila la carpeta que dice 'Facturas' y tirarla.",
          "steps": [
            "1. Choose the Tool: Use .pop() when your program still needs the item (e.g. processing a queue). Use del when discarding by index.",
            "2. Searching by Value: .remove('item') scans from left to right. If the item isn't in the list, it raises a fatal ValueError.",
            "3. The None Trap: Writing my_list = my_list.sort() wipes your data because .sort() returns None to signify it worked in-place."
          ],
          "steps_es": [
            "1. Elige la Herramienta: Usa .pop() cuando el programa necesite procesar el elemento (ej. una cola). Usa del cuando solo quieras descartar por índice.",
            "2. Búsqueda por Valor: .remove('item') busca de izquierda a derecha. Si el valor no existe, produce un error fatal ValueError.",
            "3. La Trampa de None: Escribir mi_lista = mi_lista.sort() destruye tus datos porque .sort() retorna None para avisar que modificó la lista original."
          ]
        },
        "deep_dive": {
          "concept": "Timsort & The In-Place Mutation Contract",
          "detail": "Python's .sort() implements Timsort (developed by Tim Peters in 2002), an adaptive hybrid of merge sort and insertion sort that runs in O(n log n) time. Why does .sort() return None? It is a core Python API design principle: any method that modifies an existing object in-place returns None to prevent programmers from mistaking it for a function that created a new copy.",
          "detail_es": "El método .sort() implementa Timsort (creado por Tim Peters en 2002), un algoritmo híbrido de ordenamiento por fusión e inserción que corre en O(n log n). ¿Por qué retorna None? Es una regla de diseño central de Python: cualquier método que modifique un objeto existente in-situ devuelve None para evitar que el programador crea que generó una copia nueva."
        }
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
        "pitfall_es": "Errores de indentación: Python utiliza los espacios en blanco para saber qué líneas están dentro del bucle y cuál se ejecuta al terminar.",
        "book_ref": {
          "gaddis_chapter": 4,
          "gaddis_section": "Sections 4.2 & 4.3",
          "title": "The for Loop: A Count-Controlled Loop",
          "explanation": "Gaddis teaches the for loop as an iterative mechanism designed to traverse sequences. The range(start, stop, step) function generates a series of integer values on demand, stopping strictly *before* reaching the stop value.",
          "explanation_es": "Gaddis enseña el bucle for como un mecanismo de iteración diseñado para recorrer secuencias. La función range(inicio, fin, paso) genera una serie de enteros bajo demanda, deteniéndose estrictamente *antes* de alcanzar el valor final."
        },
        "breakdown": {
          "analogy": "Think of a factory assembly line. The 'for' loop is the robot arm. The collection is the conveyor belt. The loop reaches out, grabs the first item, runs your instructions, and automatically advances to the next item until the belt is empty.",
          "analogy_es": "Imagina la línea de ensamblaje de una fábrica. El bucle 'for' es el brazo robótico y la colección es la cinta transportadora. El bucle toma el primer producto, ejecuta tus instrucciones y avanza automáticamente al siguiente hasta terminar la cinta.",
          "steps": [
            "1. Target Variable: In 'for item in items:', Python assigns the current value to 'item' on each pass.",
            "2. Automatic Stepping: No manual index counter (i = i + 1) is needed. Python advances the iterator automatically.",
            "3. Range Boundary: range(1, 5) produces 1, 2, 3, 4. The stop value (5) acts as a wall that stops iteration."
          ],
          "steps_es": [
            "1. Variable de Control: En 'for item in items:', Python asigna el elemento actual a 'item' en cada ciclo.",
            "2. Avance Automático: No necesitas contadores manuales (i = i + 1). Python avanza el iterador por sí mismo.",
            "3. Límite de Range: range(1, 5) genera 1, 2, 3, 4. El valor final (5) actúa como un muro que detiene la repetición."
          ]
        },
        "deep_dive": {
          "concept": "The Python Iterator Protocol (iter & next)",
          "detail": "Under the hood, a for loop does not use indexing at all. It calls iter(collection) to obtain an iterator object, and then repeatedly calls next(iterator) inside a C-level loop. When the sequence is exhausted, the iterator raises a StopIteration exception, which the for loop catches internally to exit cleanly.",
          "detail_es": "Bajo el capó, un bucle for no usa índices en absoluto. Llama a iter(coleccion) para obtener un objeto iterador y luego invoca repetidamente next(iterador) a nivel de C. Al agotarse los datos, se genera la excepción StopIteration, que el bucle for captura en silencio para terminar limpiamente."
        }
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
        "pitfall_es": "Escribir `b = a` y modificar `b`, lo cual altera en secreto a `a` porque ambos apuntan a la misma dirección de memoria.",
        "book_ref": {
          "gaddis_chapter": 7,
          "gaddis_section": "Sections 7.5, 7.7, & 7.10",
          "title": "Slices, Copying Lists, and Tuples",
          "explanation": "Gaddis demonstrates that writing 'b = a' does not create a new list—it creates a second reference to the same list. Mutating 'b' alters 'a'. To make an independent copy, you must use a slice 'a[:]' or 'a.copy()'. Gaddis also introduces Tuples as immutable lists wrapped in parentheses.",
          "explanation_es": "Gaddis demuestra que escribir 'b = a' no crea una lista nueva, sino un segundo puntero a la misma lista. Modificar 'b' altera 'a'. Para una copia independiente, debes usar una rebanada 'a[:]' o 'a.copy()'. También presenta las Tuplas como listas inmutables entre paréntesis."
        },
        "breakdown": {
          "analogy": "Imagine giving two keys to the same front door. 'a' is key 1 and 'b' is key 2. If 'b' enters the house and repaints the walls blue, 'a' will see blue walls too! To have separate houses, you must make a clone of the house with .copy().",
          "analogy_es": "Imagina darle dos llaves a la misma casa. 'a' tiene la llave 1 y 'b' la llave 2. Si 'b' entra y pinta las paredes de azul, ¡'a' también las verá azules! Para tener casas independientes, debes construir un clon con .copy().",
          "steps": [
            "1. The Alias Trap: b = a copies only the memory pointer, not the data.",
            "2. Shallow Copy: b = a.copy() or b = a[:] creates a new list structure in RAM with independent element slots.",
            "3. Tuples for Safety: When data should never be modified (screen resolution, coordinates, database primary keys), use Tuples to prevent bugs."
          ],
          "steps_es": [
            "1. La Trampa del Alias: b = a solo copia el puntero de memoria, no los datos.",
            "2. Copia Superficial: b = a.copy() o b = a[:] crea una nueva estructura en RAM con casilleros independientes.",
            "3. Tuplas para Seguridad: Cuando los datos nunca deben alterarse (resolución de pantalla, coordenadas, claves primarias), usa Tuplas para blindar tu código."
          ]
        },
        "deep_dive": {
          "concept": "Memory Aliasing & Shallow vs Deep Copy",
          "detail": "Why do tuples exist if lists do the same job? Memory efficiency and hashability! Tuples have a fixed memory footprint with zero resizing overhead. Furthermore, slicing creates a 'shallow copy'—if a list contains nested lists, the inner lists are still shared! For full independence of nested data, civilian production code uses copy.deepcopy().",
          "detail_es": "¿Por qué existen las tuplas si las listas hacen lo mismo? ¡Por optimización de memoria y seguridad! Las tuplas tienen un tamaño fijo sin costo de redimensionamiento. Además, el rebanado hace una 'copia superficial': ¡si contiene listas anidadas, las internas aún se comparten! En producción se usa copy.deepcopy() para una copia total."
        }
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
        "pitfall_es": "Usar por accidente un solo `=` dentro del encabezado de un `if` en lugar del comparador `==`.",
        "book_ref": {
          "gaddis_chapter": 3,
          "gaddis_section": "Sections 3.1 & 3.5",
          "title": "Boolean Expressions, Relational Operators & Logical Operators",
          "explanation": "Gaddis explains that decision structures rely on boolean expressions that evaluate to either True or False. He warns students against confusing the assignment operator (=) with the equality comparison operator (==), and demonstrates how 'and', 'or', and 'not' combine conditions.",
          "explanation_es": "Gaddis explica que las estructuras de decisión se basan en expresiones booleanas que resultan en True o False. Advierte contra la confusión entre el operador de asignación (=) y el comparador de igualdad (==), y muestra cómo 'and', 'or' y 'not' combinan condiciones."
        },
        "breakdown": {
          "analogy": "Think of a security guard checking IDs at a door. The guard asks: 'Is your name on the guest list?' (`name in guest_list`). If True, the door opens. If False, you are directed to the fallback exit.",
          "analogy_es": "Imagina un guardia de seguridad revisando credenciales. Pregunta: '¿Está tu nombre en la lista?' (`name in lista_invitados`). Si es True, abre la puerta. Si es False, te envía a la salida secundaria.",
          "steps": [
            "1. Comparison: Expressions like score >= 70 evaluate to a Boolean True/False value in the CPU.",
            "2. Case Sensitivity: 'Apple' == 'apple' is False. Always sanitize with .lower() before comparing user input.",
            "3. Membership Check: 'val in list' scans the sequence and returns True without needing a manual loop."
          ],
          "steps_es": [
            "1. Comparación: Expresiones como score >= 70 se evalúan a un valor booleano True o False en la CPU.",
            "2. Sensibilidad a Mayúsculas: 'Manzana' == 'manzana' es False. Limpia siempre con .lower() antes de comparar.",
            "3. Pertenencia: 'val in lista' recorre la colección y devuelve True de inmediato sin requerir un bucle manual."
          ]
        },
        "deep_dive": {
          "concept": "Short-Circuit Evaluation & Bytecode Jumping",
          "detail": "Python optimizes compound conditions using 'short-circuit evaluation'. In an 'and' expression, if the first condition is False, Python never evaluates the second condition because the outcome is guaranteed to be False. In an 'or' expression, if the first condition is True, the rest is skipped. This is critical for preventing crashes, e.g., 'if len(items) > 0 and items[0] == 5:' avoids IndexError.",
          "detail_es": "Python optimiza las condiciones compuestas mediante 'evaluación de cortocircuito'. En una expresión 'and', si la primera condición es False, nunca evalúa la segunda porque el resultado final será False. En un 'or', si la primera es True, el resto se ignora. Esto evita caídas: 'if len(items) > 0 and items[0] == 5:' previene un IndexError."
        }
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
        "pitfall_es": "Usar múltiples sentencias `if` independientes en lugar de `elif`, provocando que varias ramas se ejecuten sin desearlo.",
        "book_ref": {
          "gaddis_chapter": 3,
          "gaddis_section": "Section 3.3",
          "title": "The if-elif-else Statement",
          "explanation": "Gaddis details the if-elif-else ladder as a chain of mutually exclusive tests. The conditions are evaluated sequentially from top to bottom. As soon as one condition evaluates to True, its block runs, and Python immediately jumps past the end of the entire structure.",
          "explanation_es": "Gaddis detalla la estructura if-elif-else como una cadena de pruebas mutuamente excluyentes. Las condiciones se evalúan de arriba a abajo. Tan pronto como una resulta True, se ejecuta su bloque y Python salta inmediatamente al final de toda la estructura."
        },
        "breakdown": {
          "analogy": "Picture a sorting chute in a post office. A package rolls down a ramp. If it weighs under 1 lb, it drops into Chute A. If between 1 and 5 lbs, it drops into Chute B. Once it falls into a chute, it cannot drop into any other chutes below it.",
          "analogy_es": "Imagina una rampa de clasificación postal. El paquete rueda por la rampa. Si pesa menos de 1 lb, cae en el Canal A. Si pesa de 1 a 5 lbs, cae en el Canal B. Una vez que cae en un canal, no puede caer en los demás que están más abajo.",
          "steps": [
            "1. Top-Down Evaluation: Python evaluates the 'if' condition first.",
            "2. Mutually Exclusive: An 'elif' is only tested if every condition above it evaluated to False.",
            "3. The Safety Net: The 'else' block has no condition; it catches anything that didn't match above."
          ],
          "steps_es": [
            "1. Evaluación Descendente: Python evalúa primero la condición 'if'.",
            "2. Exclusión Mutua: Un 'elif' solo se prueba si todas las condiciones superiores resultaron False.",
            "3. Red de Seguridad: El bloque 'else' no tiene condición; captura todo lo que no coincidió antes."
          ]
        },
        "deep_dive": {
          "concept": "Jump Instructions & Guard Clauses",
          "detail": "In Python bytecode, an if-elif ladder translates into POP_JUMP_FORWARD_IF_FALSE and JUMP_FORWARD instructions. In professional software architecture, deeply nested if-else statements are considered an anti-pattern. Senior engineers replace deep nesting with 'Guard Clauses' (early returns) or dictionary dispatch tables to keep cyclomatic complexity low.",
          "detail_es": "En el bytecode de Python, una cadena if-elif se compila en instrucciones POP_JUMP_FORWARD_IF_FALSE y JUMP_FORWARD. En la ingeniería de software profesional, anidar muchos if-else se considera una mala práctica. Los ingenieros usan 'Cláusulas de Guarda' (retornos tempranos) o diccionarios de funciones para mantener el código limpio y mantenible."
        }
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
        "pitfall_es": "Acceder directamente a `curso['prereq']` cuando la clave no existe genera un error fatal KeyError. ¡Usa siempre `.get()` para campos opcionales!",
        "book_ref": {
          "gaddis_chapter": 9,
          "gaddis_section": "Section 9.1",
          "title": "Dictionaries: Key-Value Pairs and .get()",
          "explanation": "Gaddis introduces Dictionaries as mappings where keys serve as indexes to retrieve associated values. He highlights that accessing a non-existent key with square brackets raises a fatal KeyError, and presents .get(key, default) as the defensive programming standard.",
          "explanation_es": "Gaddis presenta los Diccionarios como estructuras donde las claves sirven de índice para recuperar valores asociados. Destaca que acceder a una clave inexistente con corchetes genera un error fatal KeyError, y enseña .get(clave, por_defecto) como el estándar de programación defensiva."
        },
        "breakdown": {
          "analogy": "Think of a coat check or post office mailbox. You don't say 'give me box #3'—you hand them a ticket with your name on it ('Maya'), and they hand back your specific winter coat. The ticket is the key; the coat is the value.",
          "analogy_es": "Imagina la taquilla de un guardarropa. No pides 'el casillero #3'; entregas un boleto con tu nombre ('Maya') y te entregan tu abrigo específico. El boleto es la clave; el abrigo es el valor.",
          "steps": [
            "1. Key-Value Syntax: dict = {'key': 'value'}. Keys must be immutable (strings, numbers, tuples).",
            "2. Bracket Lookup: student['gpa'] crashes with KeyError if 'gpa' wasn't recorded.",
            "3. Safe Lookup: student.get('gpa', 0.0) safely returns 0.0 without crashing your program."
          ],
          "steps_es": [
            "1. Sintaxis Clave-Valor: dict = {'clave': 'valor'}. Las claves deben ser inmutables (cadenas, números, tuplas).",
            "2. Búsqueda con Corchetes: estudiante['gpa'] falla con KeyError si 'gpa' no fue registrado.",
            "3. Búsqueda Segura: estudiante.get('gpa', 0.0) devuelve 0.0 de forma segura sin detener el programa."
          ]
        },
        "deep_dive": {
          "concept": "Hash Tables & O(1) Lookup Performance",
          "detail": "How can Python find a value among 1,000,000 dictionary keys in a fraction of a microsecond? Hash Tables! When you query dict[key], Python executes hash(key) to compute an integer hash value, which maps directly to an index in memory. This provides O(1) constant-time lookups regardless of dictionary size.",
          "detail_es": "¿Cómo encuentra Python un valor entre 1,000,000 de claves en microsegundos? ¡Tablas Hash! Al consultar dict[clave], Python ejecuta hash(clave) para obtener un valor numérico que apunta directo a la posición en memoria. Esto permite búsquedas en tiempo constante O(1) sin importar el tamaño del diccionario."
        }
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
        "pitfall_es": "Hacer un bucle directo con `for item in mi_dict:` solo itera sobre las claves, no los pares clave-valor. ¡Usa `.items()` para desempaquetar ambos!",
        "book_ref": {
          "gaddis_chapter": 9,
          "gaddis_section": "Section 9.1",
          "title": "Iterating Over Dictionaries (.keys, .values, .items)",
          "explanation": "Gaddis demonstrates that a simple for loop over a dictionary only yields its keys. To iterate over both keys and values simultaneously, you must use the .items() method with tuple unpacking.",
          "explanation_es": "Gaddis demuestra que un bucle for simple sobre un diccionario solo recorre sus claves. Para iterar sobre claves y valores simultáneamente, debes usar el método .items() con desempaquetado de tuplas."
        },
        "breakdown": {
          "analogy": "Think of a receipt roll. If you only look at the product names, you can't calculate your budget. Calling .items() hands you both the product name and the price tag side-by-side on each step of the conveyor belt.",
          "analogy_es": "Imagina un ticket de compras. Si solo lees los nombres de productos, no puedes calcular tu gasto. Invocar .items() te entrega el nombre y el precio juntos en cada línea de la factura.",
          "steps": [
            "1. Default Loop: 'for k in d:' only gives keys.",
            "2. Pair Unpacking: 'for key, val in d.items():' unpacks the 2-tuple (key, value) cleanly.",
            "3. Aggregation: Use sum(d.values()) to total numbers across categories in a single line."
          ],
          "steps_es": [
            "1. Bucle por Defecto: 'for k in d:' solo entrega las claves.",
            "2. Desempaquetado de Pares: 'for clave, valor in d.items():' desempaqueta la tupla de 2 elementos limpiamente.",
            "3. Agregación: Usa sum(d.values()) para sumar los números de todas las categorías en una sola línea."
          ]
        },
        "deep_dive": {
          "concept": "Dictionary Views & Insertion Order Preservation",
          "detail": "In modern Python (since 3.7+), dictionaries officially preserve insertion order as a language guarantee. Furthermore, .keys(), .values(), and .items() return dynamic 'view objects'. They do not copy memory; if the underlying dictionary changes, the view updates automatically in real time.",
          "detail_es": "En Python moderno (desde 3.7+), los diccionarios conservan el orden de inserción por estándar. Además, .keys(), .values() e .items() devuelven 'objetos de vista' dinámicos. No duplican memoria; si el diccionario cambia, la vista se actualiza automáticamente en tiempo real."
        }
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
        "pitfall_es": "Olvidar actualizar la condición del bucle, creando un bucle infinito que congela el procesador.",
        "book_ref": {
          "gaddis_chapter": 4,
          "gaddis_section": "Sections 4.1 & 4.4",
          "title": "The while Loop, Sentinels & User Input Validation",
          "explanation": "Gaddis teaches the while loop as a condition-controlled pretest loop: the condition is tested *before* every iteration. If initially False, the body never executes. Gaddis details sentinel values (special values like 'quit' or -1 that signal end-of-data).",
          "explanation_es": "Gaddis enseña el bucle while como un ciclo de prueba previa controlado por condición: la condición se evalúa *antes* de cada ciclo. Si es False de entrada, nunca se ejecuta. Detalla los valores centinela (valores especiales como 'quit' o -1 que señalan el fin de la captura)."
        },
        "breakdown": {
          "analogy": "Think of a security barrier at an airport gate. As long as passengers remain in line (`while passengers:`), the gate agent scans the next boarding pass. When the line is empty, the gate closes.",
          "analogy_es": "Imagina la puerta de embarque de un aeropuerto. Mientras haya pasajeros en la fila (`while pasajeros:`), el agente escanea el siguiente boleto. Cuando la fila queda vacía, la puerta se cierra.",
          "steps": [
            "1. Pretest Gate: Python tests the condition at the top. If False, the loop terminates immediately.",
            "2. State Modification: Something inside the loop body MUST change the condition, or it runs forever.",
            "3. Break & Continue: 'break' jumps completely out of the loop; 'continue' skips to the next check."
          ],
          "steps_es": [
            "1. Puerta de Prueba Previa: Python comprueba la condición al inicio. Si es False, el bucle termina de inmediato.",
            "2. Modificación de Estado: Algo dentro del bucle DEBE alterar la condición, o caerás en un bucle infinito.",
            "3. Break y Continue: 'break' sale del bucle por completo; 'continue' salta directo a la siguiente comprobación."
          ]
        },
        "deep_dive": {
          "concept": "Pretest Loops vs Do-While & The Walrus Operator",
          "detail": "Python does not have a 'do-while' loop. Why? Pretest while loops guarantee you never process unvalidated data. In modern Python 3.8+, you can combine input prompts directly inside the loop condition using the Walrus Operator (:=), e.g. 'while (entry := input()) != 'quit':'.",
          "detail_es": "Python no tiene bucle 'do-while'. ¿Por qué? Los bucles de prueba previa garantizan que nunca proceses datos no validados. En Python 3.8+, puedes capturar la entrada directamente dentro de la condición usando el Operador Morsa (:=): 'while (entrada := input()) != 'quit':'."
        }
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
        "pitfall_es": "Intentar sumar diccionarios directamente: `sum(carrito)` genera TypeError porque Python no puede sumar diccionarios. ¡Extrae el campo numérico!",
        "book_ref": {
          "gaddis_chapter": 4,
          "gaddis_section": "Section 4.3 & Chapter 7 Workshop",
          "title": "Accumulators, Running Totals & Nested Structures",
          "explanation": "Gaddis details the Accumulator pattern: a variable initialized outside a loop that accumulates values across each iteration. Combining lists with dictionaries forms real-world data records.",
          "explanation_es": "Gaddis detalla el patrón de Acumulador: una variable inicializada fuera del bucle que va sumando valores en cada pasada. Combinar listas con diccionarios forma registros de datos profesionales."
        },
        "breakdown": {
          "analogy": "Think of a grocery store cash register. The register starts at $0.00 (the accumulator). As the cashier scans each item from your shopping cart (list of dicts), the price is added to the subtotal.",
          "analogy_es": "Imagina la caja registradora de un supermercado. La caja empieza en $0.00 (el acumulador). A medida que el cajero escanea cada producto del carrito (lista de diccionarios), el precio se suma al subtotal.",
          "steps": [
            "1. Initialize Outside: Set total = 0.0 *before* the loop starts. Never reset it inside the loop!",
            "2. Extract Fields: Inside the loop, extract record['price'] to access the numeric value.",
            "3. Accumulate: Add with total += record['price']."
          ],
          "steps_es": [
            "1. Inicializar Fuera: Asigna total = 0.0 *antes* de que inicie el bucle. ¡Nunca lo reinicies dentro!",
            "2. Extraer Campos: Dentro del bucle, lee registro['precio'] para obtener el valor numérico.",
            "3. Acumular: Suma con total += registro['precio']."
          ]
        },
        "deep_dive": {
          "concept": "Generator Expressions vs Memory-Heavy Lists",
          "detail": "Instead of building intermediate lists to sum totals, Python provides generator expressions: 'sum(i['price'] for i in cart)'. This streams each value one-by-one into the accumulator without allocating memory for an extra list, making it scalable for millions of records.",
          "detail_es": "En vez de crear listas intermedias para sumar totales, Python ofrece expresiones generadoras: 'sum(i['precio'] for i in carrito)'. Esto envía cada valor uno a uno al acumulador sin gastar memoria en una lista extra, siendo escalable para millones de registros."
        }
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
        "pitfall_es": "Usar `print()` dentro de una función en vez de `return`. `print()` solo muestra texto en pantalla; ¡`return` entrega el valor para que el programa pueda utilizarlo!",
        "book_ref": {
          "gaddis_chapter": 5,
          "gaddis_section": "Sections 5.1, 5.2, & 5.5",
          "title": "Defining Functions, Parameters, and Returning Values",
          "explanation": "Gaddis breaks down modular design: dividing a program into small, manageable functions (divide-and-conquer). He explains the crucial difference between void functions (which perform an action like print) and value-returning functions (which compute and return data to the caller).",
          "explanation_es": "Gaddis analiza el diseño modular: dividir un programa en funciones pequeñas y manejables (divide y vencerás). Explica la diferencia crucial entre funciones vacías (que solo muestran cosas con print) y funciones que retornan valores a quien las invocó."
        },
        "breakdown": {
          "analogy": "Think of a function like an accountant. If you ask the accountant to calculate your taxes, you don't want them to whisper the number to the wall (`print`). You want them to write the refund check and hand it to you (`return`) so you can deposit it in your bank account.",
          "analogy_es": "Imagina una función como tu contador. Si le pides calcular tus impuestos, no quieres que le hable a la pared (`print`). Quieres que te entregue el cheque de reembolso (`return`) para que puedas depositarlo en tu cuenta.",
          "steps": [
            "1. Parameter: The variable in the def header that accepts input: def calc(price):",
            "2. Argument: The actual value passed when calling the function: calc(50.0)",
            "3. Return Value: 'return val' sends the computed data back so it can be stored in a variable."
          ],
          "steps_es": [
            "1. Parámetro: La variable en la cabecera def que recibe la entrada: def calc(precio):",
            "2. Argumento: El valor real que envías al llamar a la función: calc(50.0)",
            "3. Retorno: 'return val' devuelve el valor calculado para que pueda guardarse en una variable."
          ]
        },
        "deep_dive": {
          "concept": "Stack Frames & Pure Functional Design",
          "detail": "When a function is called, the CPU creates a new 'Stack Frame' in RAM for its local variables. When the function returns, that stack frame is destroyed. Professional software engineering prizes 'Pure Functions': functions that produce results solely based on their inputs without mutating global variables.",
          "detail_es": "Al llamar a una función, la CPU crea un 'Marco de Pila' (Stack Frame) en RAM para sus variables locales. Al retornar, ese marco se destruye. En el software profesional se priorizan las 'Funciones Puras': funciones que producen resultados solo a partir de sus parámetros sin alterar variables globales."
        }
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
        "pitfall_es": "Modificar una lista recibida dentro de una función altera involuntariamente los datos originales. Pasa `lista[:]` si necesitas protegerla.",
        "book_ref": {
          "gaddis_chapter": 5,
          "gaddis_section": "Sections 5.7 & 5.8",
          "title": "Default Arguments and Passing Arguments by Object Reference",
          "explanation": "Gaddis explains default argument values and positional vs keyword matching. He warns students about passing mutable objects (like lists) into functions, showing how functions can accidentally alter the caller's list in memory.",
          "explanation_es": "Gaddis explica los argumentos por defecto y la coincidencia posicional frente a la de palabra clave. Advierte sobre pasar objetos mutables (como listas) a funciones, demostrando cómo una función puede alterar accidentalmente la lista original del llamador."
        },
        "breakdown": {
          "analogy": "If you hand a colleague your original notebook and they write on page 3, your notebook is permanently marked! If you want to protect your original notes, you photocopy the notebook first (`my_list[:]`) and hand them the copy.",
          "analogy_es": "Si le prestas tu cuaderno original a un colega y escribe en la página 3, ¡tu cuaderno queda rayado para siempre! Si quieres proteger tus notas, sácale una fotocopia (`mi_lista[:]`) y dale la copia.",
          "steps": [
            "1. Optional Params: Using default values (e.g. title=None) allows functions to accept flexible arguments.",
            "2. Pass-by-Assignment: Python passes the memory reference of lists into functions.",
            "3. Slice Copy Protection: Pass list_copy = my_list[:] to prevent accidental side-effects."
          ],
          "steps_es": [
            "1. Parámetros Opcionales: Usar valores por defecto (ej. titulo=None) permite llamadas flexibles.",
            "2. Paso por Asignación: Python envía la referencia de memoria de la lista a la función.",
            "3. Protección por Copia: Pasa copia = mi_lista[:] si necesitas evitar alteraciones accidentales."
          ]
        },
        "deep_dive": {
          "concept": "The Mutable Default Argument Trap",
          "detail": "Never write 'def append_to(item, target=[])'! In Python, default arguments are evaluated ONCE when the function definition is executed, not each time it is called. That empty list [] is shared across every subsequent invocation of the function! Always use 'target=None' and initialize 'if target is None: target = []'.",
          "detail_es": "¡Nunca escribas 'def agregar(item, lista=[])'! En Python, los argumentos por defecto se evalúan UNA SOLA VEZ al compilar la función, no en cada llamada. ¡Esa lista [] se compartirá entre todas las llamadas futuras! La regla profesional es usar 'lista=None' e inicializarla adentro: 'if lista is None: lista = []'."
        }
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
        "pitfall_es": "Abrir un archivo existente en modo 'w' por error. ¡El modo 'w' borra instantáneamente todo el contenido previo! Usa 'a' para agregar al final.",
        "book_ref": {
          "gaddis_chapter": 6,
          "gaddis_section": "Sections 6.1 & 6.2",
          "title": "Introduction to File Input and Output",
          "explanation": "Gaddis teaches disk persistence: writing ('w'), appending ('a'), and reading ('r'). He explains buffer flushing, file pointers, and why leaving files open leads to data corruption.",
          "explanation_es": "Gaddis enseña la persistencia en disco: escritura ('w'), anexado ('a') y lectura ('r'). Explica los búferes de memoria, punteros de archivo y por qué dejar archivos abiertos provoca corrupción de datos."
        },
        "breakdown": {
          "analogy": "RAM is a whiteboard; when power turns off, everything is erased. Hard drives and SSDs are filing cabinets with folders. Opening a file takes a folder out of the cabinet; the 'with' statement guarantees the folder is returned and locked even if the building loses power.",
          "analogy_es": "La memoria RAM es una pizarra: al apagar el equipo, se borra todo. Los discos duros son archivadores de metal. Abrir un archivo es sacar una carpeta; la sentencia 'with' garantiza que la carpeta se guarde y cierre bajo llave incluso si se corta la luz.",
          "steps": [
            "1. File Modes: 'w' wipes existing data; 'a' appends to the end; 'r' reads only.",
            "2. Strip Newlines: Text lines read from disk include '\\n' at the end; clean them with .rstrip('\\n').",
            "3. Context Manager: Always use 'with open(...) as f:' so Python closes the file automatically."
          ],
          "steps_es": [
            "1. Modos de Archivo: 'w' borra todo lo previo; 'a' escribe al final; 'r' es solo lectura.",
            "2. Limpiar Saltos: Las líneas leídas del disco traen '\\n' al final; límpialas con .rstrip('\\n').",
            "3. Administrador de Contexto: Usa siempre 'with open(...) as f:' para que Python cierre el archivo en automático."
          ]
        },
        "deep_dive": {
          "concept": "OS File Descriptors & Buffer Flushing",
          "detail": "When you call f.write(), data is not immediately written to physical disk platters—it sits in an operating system write buffer. If a program crashes before the buffer flushes, data is lost! The 'with' statement implements the Context Management protocol (__enter__ and __exit__), ensuring f.flush() and f.close() execute under all circumstances.",
          "detail_es": "Cuando ejecutas f.write(), los datos no van directo al disco físico: se quedan en un búfer del sistema operativo. Si el programa falla antes de vaciar el búfer, ¡los datos se pierden! La sentencia 'with' implementa los métodos __enter__ y __exit__, garantizando que f.flush() y f.close() se ejecuten pase lo que pase."
        }
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
        "pitfall_es": "Capturar con un `except:` general sin especificar el tipo de error, lo cual oculta errores tipográficos de sintaxis o NameErrors.",
        "book_ref": {
          "gaddis_chapter": 6,
          "gaddis_section": "Section 6.4",
          "title": "Exception Handling: try, except, else, finally",
          "explanation": "Gaddis teaches defensive programming through structured exception handling. Unhandled exceptions trigger traceback crashes. A try-except block intercepts the crash, allowing the program to display friendly feedback or recover gracefully.",
          "explanation_es": "Gaddis enseña programación defensiva mediante el manejo de excepciones. Las excepciones no controladas provocan la caída del programa. Un bloque try-except intercepta el error, permitiendo informar al usuario o recuperarse limpiamente."
        },
        "breakdown": {
          "analogy": "Think of a trapeze acrobat. The 'try' block is the high-wire act. The 'except' block is the safety net below. If the acrobat slips, the safety net catches them so the circus performance doesn't end in tragedy.",
          "analogy_es": "Imagina un acróbata en el trapecio. El bloque 'try' es la maniobra en el aire. El bloque 'except' es la red de seguridad abajo. Si el acróbata resbala, la red lo atrapa para que el espectáculo continúe sin tragedias.",
          "steps": [
            "1. try: Put code that might fail (converting user input, reading files) inside the try block.",
            "2. except SpecificError: Intercept specific errors (like ValueError, FileNotFoundError).",
            "3. finally: Executes no matter what—perfect for closing database connections or cleaning up resources."
          ],
          "steps_es": [
            "1. try: Coloca dentro el código que podría fallar (convertir entrada de usuario, abrir archivos).",
            "2. except ErrorEspecifico: Captura errores puntuales (como ValueError, FileNotFoundError).",
            "3. finally: Se ejecuta siempre, haya o no error; ideal para cerrar conexiones a bases de datos."
          ]
        },
        "deep_dive": {
          "concept": "EAFP vs LBYL in Python Architecture",
          "detail": "Python embraces the EAFP philosophy ('Easier to Ask for Forgiveness than Permission') over LBYL ('Look Before You Leap'). Instead of writing complex if-checks before every operation, Pythonic architecture attempts the operation inside a try block and handles exceptions if they arise. This avoids race conditions in multi-threaded code.",
          "detail_es": "Python adopta la filosofía EAFP ('Es Más Fácil Pedir Perdón Que Permiso') en lugar de LBYL ('Mira Antes De Saltar'). En vez de llenar el código con comprobaciones if previas, la arquitectura pythónica intenta la acción dentro de un try y captura las excepciones si ocurren, evitando condiciones de carrera."
        }
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
        "pitfall_es": "Olvidar `self` como primer parámetro en métodos de clase, lo que provoca TypeError al invocar `instancia.metodo()`.",
        "book_ref": {
          "gaddis_chapter": 10,
          "gaddis_section": "Sections 10.1 & 10.2",
          "title": "Procedural vs Object-Oriented Programming & Classes",
          "explanation": "Gaddis introduces Object-Oriented Programming (OOP): binding data attributes and procedures (methods) into cohesive objects. He details the class blueprint, __init__ initializer, the self parameter, and data hiding (encapsulation) using double underscores (__).",
          "explanation_es": "Gaddis presenta la Programación Orientada a Objetos (POO): unir atributos de datos y métodos en objetos coherentes. Detalla el plano de clase, el constructor __init__, el parámetro self y el ocultamiento de datos (encapsulación) con doble guion bajo (__)."
        },
        "breakdown": {
          "analogy": "Think of a blueprint for an automobile. The blueprint defines what a car has (color, engine) and what it does (accelerate, brake). When the factory builds 5 cars from that blueprint, each car is an independent instance with its own paint color and fuel level.",
          "analogy_es": "Imagina los planos de un automóvil. El plano define qué tiene el auto (color, motor) y qué hace (acelerar, frenar). Cuando la fábrica construye 5 autos a partir de ese plano, cada vehículo es una instancia independiente con su propio color y combustible.",
          "steps": [
            "1. Class: The blueprint: class BankAccount:",
            "2. __init__ & self: The constructor that initializes this specific instance's attributes in RAM.",
            "3. Encapsulation: Prefixing self.__balance protects attributes from being tampered with directly by outside code."
          ],
          "steps_es": [
            "1. Clase: El plano de diseño: class CuentaBancaria:",
            "2. __init__ y self: El inicializador que crea los atributos de esta instancia específica en RAM.",
            "3. Encapsulación: Anteponer self.__saldo protege los atributos para que el código externo no los altere sin autorización."
          ]
        },
        "deep_dive": {
          "concept": "Instance Dictionaries (__dict__) & Name Mangling",
          "detail": "How does Python store an object's state? Each instance maintains a hidden internal dictionary called __dict__ mapping attribute names to values! When you prefix an attribute with double underscores (__balance), Python performs 'name mangling', internally renaming it to _BankAccount__balance to prevent accidental collision in subclass hierarchies.",
          "detail_es": "¿Cómo guarda Python el estado de un objeto? Cada instancia tiene un diccionario interno oculto llamado __dict__ que asocia atributos con valores. Cuando antepones doble guion bajo (__saldo), Python realiza 'name mangling', renombrándolo internamente como _CuentaBancaria__saldo para evitar colisiones en clases hijas."
        }
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
        "pitfall_es": "¡Usar f-strings (f'INSERT INTO ... {val}') para construir consultas SQL deja tu aplicación completamente vulnerable a ataques de inyección SQL!",
        "book_ref": {
          "gaddis_chapter": 14,
          "gaddis_section": "Sections 14.1, 14.2 & 14.4",
          "title": "Database Programming with SQLite",
          "explanation": "Gaddis introduces relational databases: tables, rows, and columns. He demonstrates establishing a connection with sqlite3, obtaining a cursor, executing SQL queries, committing transactions, and parameterizing queries with '?' to protect data integrity.",
          "explanation_es": "Gaddis presenta las bases de datos relacionales: tablas, filas y columnas. Muestra cómo conectarse con sqlite3, obtener un cursor, ejecutar consultas SQL, confirmar transacciones con commit y parametrizar consultas con '?' para proteger la integridad de los datos."
        },
        "breakdown": {
          "analogy": "Think of a bank vault with safety deposit boxes. The database connection is your security badge to enter the vault. The cursor is the bank teller who walks to the vault, executes your request, and brings back the exact box you requested.",
          "analogy_es": "Imagina la bóveda de un banco con cajas de seguridad. La conexión a la base de datos es tu credencial para entrar a la bóveda. El cursor es el empleado bancario que busca la caja solicitada, realiza la operación y te entrega el resultado.",
          "steps": [
            "1. Connection & Cursor: conn = sqlite3.connect(...) connects; cur = conn.cursor() creates the command runner.",
            "2. Parameterized Queries: Always write cur.execute('... WHERE id = ?', (val,)).",
            "3. Commit: Changes (INSERT, UPDATE, DELETE) are not permanent on disk until you call conn.commit()."
          ],
          "steps_es": [
            "1. Conexión y Cursor: conn = sqlite3.connect(...) conecta; cur = conn.cursor() crea el ejecutor de comandos.",
            "2. Consultas Parametrizadas: Escribe siempre cur.execute('... WHERE id = ?', (val,)).",
            "3. Confirmación: Las modificaciones (INSERT, UPDATE, DELETE) no quedan grabadas en disco hasta llamar a conn.commit()."
          ]
        },
        "deep_dive": {
          "concept": "SQL Injection & Prepared Statements",
          "detail": "Why must you NEVER use f-strings to format SQL queries? If a user enters \"' OR '1'='1\", an f-string injects malicious executable code directly into your query string, compromising the entire database! Using '?' sends the SQL structure and the user parameters to the SQLite engine separately, ensuring inputs are strictly treated as inert data values.",
          "detail_es": "¿Por qué NUNCA debes usar f-strings en consultas SQL? Si un usuario malicioso ingresa \"' OR '1'='1\", una f-string inyecta código ejecutable en la consulta, hackeando toda la base de datos. Al usar '?', SQLite recibe la estructura y los datos por separado, tratando la entrada estrictamente como texto inerte."
        }
      }
    ],
    "title_es": "Programación de Bases de Datos con SQLite",
    "desc_es": "Conexión a bases de datos SQLite, creación de tablas, consultas CRUD parametrizadas y prevención de ataques de inyección SQL."
  }
];

/**
 * Dynamically returns localized chapters based on active language.
 * When lang === 'es', swaps in Spanish titles, descriptions, why explanations,
 * book references, analogies, pitfalls, and quiz questions.
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
      book_ref: sec.book_ref ? {
        ...sec.book_ref,
        explanation: sec.book_ref.explanation_es || sec.book_ref.explanation
      } : null,
      breakdown: sec.breakdown ? {
        ...sec.breakdown,
        analogy: sec.breakdown.analogy_es || sec.breakdown.analogy,
        steps: sec.breakdown.steps_es || sec.breakdown.steps
      } : null,
      deep_dive: sec.deep_dive ? {
        ...sec.deep_dive,
        detail: sec.deep_dive.detail_es || sec.deep_dive.detail
      } : null,
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
