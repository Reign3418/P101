export const CHAPTERS_DATA = [
  {
    "num": 1,
    "code_module": "Module 1",
    "title": "Variables, Data Types & Formatting",
    "icon": "\ud83d\udc0d",
    "prof_source": "Prof. Jade Cao (CCCC) \u2014 01_Variables_and_Data_Types.ipynb",
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
          "expected_val": "Alex is in Intro to Python (Room 204)"
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
          "explanation": "In Python, variable names cannot start with numbers, cannot contain spaces, and cannot contain hyphens. `total_score` uses valid snake_case!"
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
          "expected_val": "Ada Lovelace"
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
          "explanation": "Strings are immutable! Calling `user.strip()` returns a new clean string, but because we didn't reassign `user = user.strip()`, `user` still has its spaces!"
        }
      }
    ]
  },
  {
    "num": 2,
    "code_module": "Module 2.1",
    "title": "Introducing Lists (Store, Access, & Organize)",
    "icon": "\ud83d\udccb",
    "prof_source": "Prof. Jade Cao (CCCC) \u2014 Lecture_Module2.1_Intro_to_Lists.ipynb",
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
          "expected_val": "espresso"
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
          "explanation": "Negative indexing counts backwards from the right: -1 is 'Mars', -2 is 'Earth'!"
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
          "expected_val": "Arrival"
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
          "explanation": "In Python, in-place mutating methods like `.sort()` and `.reverse()` return `None` so you know they modified the existing list rather than creating a new one."
        }
      }
    ]
  },
  {
    "num": 3,
    "code_module": "Module 2.2",
    "title": "Working with Lists, Slices, & Tuples",
    "icon": "\ud83d\udd04",
    "prof_source": "Prof. Jade Cao (CCCC) \u2014 Lecture_Module2.2_Working_with_Lists.ipynb",
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
          "expected_val": "151.7"
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
          "explanation": "Start at 2, add step of 3: 2 + 3 = 5, 5 + 3 = 8. Adding 3 again reaches 11, which exceeds the stop limit of 10!"
        }
      },
      {
        "id": "3-2",
        "num": "3.2",
        "title": "Slicing, Copying (.copy() vs =), and Tuples",
        "why": "`list_b = list_a` does NOT copy the items\u2014it creates a second alias to the exact same list in RAM! To protect data, use `.copy()` or slices `[:]`.",
        "concept": "Slicing: `list[start:stop]`. Safe copy: `friend_route = my_route.copy()`. Tuples: defined with parentheses `(1920, 1080)` and are immutable (read-only).",
        "code": "my_route = ['Raleigh', 'Chicago', 'Denver']\nfriend_route = my_route.copy()\nfriend_route.append('Seattle')\nprint(f'My route: {my_route}')\nprint(f'Friend: {friend_route}')",
        "expected_output": "My route: ['Raleigh', 'Chicago', 'Denver']\nFriend: ['Raleigh', 'Chicago', 'Denver', 'Seattle']",
        "pitfall": "Writing `b = a` and modifying `b`, which secretly modifies `a` because both point to the same memory address.",
        "rep": {
          "title": "Route Preview Slice Rep",
          "prompt": "Given stops = ['Raleigh', 'Richmond', 'DC', 'Philly', 'NYC'], slice the first 3 stops into 'preview'.",
          "starter": "stops = ['Raleigh', 'Richmond', 'DC', 'Philly', 'NYC']\npreview = stops[:3]\nprint(preview)",
          "test_var": "preview",
          "expected_val": "['Raleigh', 'Richmond', 'DC']"
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
          "explanation": "Tuples provide data integrity. When data should remain fixed (like coordinate pairs or screen dimensions), immutability prevents bugs."
        }
      }
    ]
  },
  {
    "num": 4,
    "code_module": "Module 3.1",
    "title": "Decision Structures with if, elif, else",
    "icon": "\ud83d\udd00",
    "prof_source": "Prof. Jade Cao (CCCC) \u2014 Lecture_Module3.1_If_Statements.ipynb",
    "desc": "Boolean conditions, = vs ==, string case handling, multiple conditions (and, or, in), if-elif-else chains, Smart Caf\u00e9 Order Assistant.",
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
          "title": "Caf\u00e9 Order Availability Rep",
          "prompt": "Given menu = ['muffin', 'bagel', 'scone'] and item = 'bagel', check if item in menu and set available=True.",
          "starter": "menu = ['muffin', 'bagel', 'scone']\nitem = 'bagel'\navailable = item in menu\nprint(available)",
          "test_var": "available",
          "expected_val": "True"
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
          "explanation": "The `in` keyword checks if the item is an element of the collection. Since 'admin' is not in the list, it returns False."
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
          "expected_val": "4.0"
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
          "explanation": "In an if-elif-else chain, conditions are mutually exclusive. Once one branch evaluates to True, its block runs and the entire rest of the chain is skipped."
        }
      }
    ]
  },
  {
    "num": 5,
    "code_module": "Module 3.2",
    "title": "Dictionaries: Data with Labels",
    "icon": "\ud83d\udcd6",
    "prof_source": "Prof. Jade Cao (CCCC) \u2014 Lecture_Module3.2_Dictionaries.ipynb",
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
          "expected_val": "Jade Cao"
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
          "explanation": "Since 'font_size' is not in the dictionary, `.get()` safely returns the provided fallback default of 14!"
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
          "expected_val": "33"
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
          "explanation": "`dict.items()` yields key-value tuples, allowing clean unpacking like `for k, v in dict.items():`."
        }
      }
    ]
  },
  {
    "num": 6,
    "code_module": "Module 4.1 & 4.2",
    "title": "User Input, while Loops, & Workshops",
    "icon": "\ud83d\udd01",
    "prof_source": "Prof. Jade Cao (CCCC) \u2014 Lecture_Module4.1_While_Loops & Module4.2_workshop.ipynb",
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
          "expected_val": "19.75"
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
          "explanation": "A sentinel is a distinct value entered by a user or encountered in data that signals that data entry is finished and repetition should stop."
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
          "expected_val": "260"
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
          "explanation": "`trip` is a list, so `trip[1]` gets the second dictionary `{'stop': 'B', 'miles': 70}`. Then `['miles']` extracts the value 70!"
        }
      }
    ]
  },
  {
    "num": 7,
    "code_module": "Module 5.1 & 5.2",
    "title": "Functions: Modular Program Design",
    "icon": "\ud83d\udce6",
    "prof_source": "Prof. Jade Cao (CCCC) \u2014 Lecture_Module5.1_Function1 & Module5.2_Function2.ipynb",
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
          "title": "Caf\u00e9 Discount Function Rep",
          "prompt": "Write calc_bill(price, tip_pct=0.15) that returns round(price * (1 + tip_pct), 2). Store calc_bill(40.0) in 'bill'.",
          "starter": "def calc_bill(price, tip_pct=0.15):\n    return round(price * (1 + tip_pct), 2)\nbill = calc_bill(40.0)\nprint(bill)",
          "test_var": "bill",
          "expected_val": "46.0"
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
          "explanation": "`print()` is a display side-effect. `return` passes the computed result back to the caller so it can be assigned to a variable or used in an `if` condition."
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
          "expected_val": "Chris (Captain)"
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
          "explanation": "Passing `todo[:]` creates a slice copy of the list. The function can modify its copy freely without altering the caller's original list in memory."
        }
      }
    ]
  },
  {
    "num": 8,
    "code_module": "Extended Ch 6",
    "title": "Files, Exceptions, & Data Persistence",
    "icon": "\ud83d\udcc1",
    "prof_source": "Tony Gaddis (6th Ed.) \u2014 Chapter 6 Companion",
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
          "expected_val": "data_record"
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
          "explanation": "Mode 'a' (Append) preserves existing file contents and writes all new records to the end of the file."
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
          "expected_val": "recovered"
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
          "explanation": "`finally` always executes at the end, making it ideal for cleanup tasks like closing database connections or release file locks."
        }
      }
    ]
  },
  {
    "num": 9,
    "code_module": "Extended Ch 10 & 11",
    "title": "Classes, OOP & Encapsulation",
    "icon": "\ud83c\udfd7\ufe0f",
    "prof_source": "Tony Gaddis (6th Ed.) \u2014 Chapters 10 & 11 Companion",
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
          "expected_val": "Alex"
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
          "explanation": "`self` provides the method access to that particular object's unique attributes in RAM."
        }
      }
    ]
  },
  {
    "num": 10,
    "code_module": "Extended Ch 14",
    "title": "Database Programming with SQLite",
    "icon": "\ud83d\uddc4\ufe0f",
    "prof_source": "Tony Gaddis (6th Ed.) \u2014 Chapter 14 Companion",
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
          "expected_val": "SELECT * FROM Students WHERE major = ?"
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
          "explanation": "Parameterized queries treat inputs as literal data values, preventing attackers from injecting executable SQL commands into your database."
        }
      }
    ]
  }
];
