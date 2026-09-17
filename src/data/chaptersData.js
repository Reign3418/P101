export const CHAPTERS_DATA = [
  {
    "num": 1,
    "title": "Introduction to Computers & Programming",
    "icon": "\ud83d\udcbb",
    "desc": "Hardware architecture, binary data representation, how interpreters work, and using IDLE.",
    "sections": [
      {
        "id": "1-1",
        "num": "1.1 - 1.2",
        "title": "Hardware & Software Architecture",
        "why": "A CPU is just a calculator running the fetch-decode-execute cycle. Without RAM, it has nowhere to keep active data; without Secondary Storage, everything disappears when power is cut.",
        "concept": "The CPU fetches instructions from RAM, decodes, and executes. RAM is volatile; Secondary Storage (SSD/HDD) is non-volatile.",
        "code": "active_score = 100\nprint(f'Variable loaded in RAM: {active_score}')",
        "expected_output": "Variable loaded in RAM: 100",
        "pitfall": "Confusing RAM with Storage. Saving a file writes to disk; assigning a variable holds data in RAM until program ends.",
        "rep": {
          "title": "RAM Variable Rep",
          "prompt": "Create variable 'lives' = 3, decrement by 1 with -= 1, and print 'Lives: X'.",
          "starter": "# Your Rep Here:\nlives = 3\nlives -= 1\nprint(f'Lives: {lives}')",
          "test_var": "lives",
          "expected_val": "2"
        },
        "quiz": {
          "question": "What happens to the data stored in RAM when you power off your computer?",
          "options": [
            "It is permanently saved onto the CPU",
            "It is completely lost because RAM is volatile memory",
            "It automatically moves to a text file on your desktop",
            "It remains frozen in RAM until next boot"
          ],
          "answer": 1,
          "explanation": "RAM is volatile memory. Without continuous electrical power, all charges dissipate and contents are lost. Secondary storage (SSD/HDD) is required for permanence!"
        }
      },
      {
        "id": "1-2",
        "num": "1.3",
        "title": "How Computers Store Data (Bits, Bytes & Binary)",
        "why": "Transistors only have two physical states: ON (1) or OFF (0). All numbers, letters, and pixels must be encoded into binary bit patterns.",
        "concept": "1 Byte = 8 Bits. Integers use binary base-2. Characters use ASCII (e.g. 'A' = 65, space = 32) and Unicode. Real numbers use floating-point.",
        "code": "letter = 'A'\ncode = ord(letter)\nprint(f'Letter: {letter} | ASCII: {code} | Binary: {bin(code)}')",
        "expected_output": "Letter: A | ASCII: 65 | Binary: 0b1000001",
        "pitfall": "Thinking text is stored directly as letters. Everything in memory is pure numeric bit patterns.",
        "rep": {
          "title": "ASCII Lowercase Rep",
          "prompt": "Take uppercase 'C' (ord 67), add 32 to get lowercase 'c', convert with chr(), and store in 'low_c'.",
          "starter": "up_c = 'C'\nlow_c = chr(ord(up_c) + 32)\nprint(low_c)",
          "test_var": "low_c",
          "expected_val": "c"
        },
        "quiz": {
          "question": "In ASCII encoding, what numeric code represents the uppercase character 'A'?",
          "options": [
            "1",
            "32",
            "65",
            "97"
          ],
          "answer": 2,
          "explanation": "In standard ASCII, uppercase 'A' is 65 (and lowercase 'a' is 97). Spacebar is 32! You can verify this in Python anytime using ord('A')!"
        }
      },
      {
        "id": "1-3",
        "num": "1.4 - 1.5",
        "title": "How Programs Work: Interpreters & IDLE",
        "why": "CPUs only understand machine code (0s and 1s). High-level languages like Python let humans write readable logic, which the Interpreter translates line-by-line.",
        "concept": "Python uses an Interpreter. Interactive Mode (the >>> shell) executes statements immediately. Script Mode (.py files in IDLE) executes saved files top to bottom.",
        "code": "msg = 'Welcome to Python programming!'\nprint(msg.upper())",
        "expected_output": "WELCOME TO PYTHON PROGRAMMING!",
        "pitfall": "Trying to run multiple commands at once in interactive shell instead of saving a .py script.",
        "rep": {
          "title": "Multiply & Format Rep",
          "prompt": "Calculate 25 * 4 and store in 'total_cents'.",
          "starter": "total_cents = 25 * 4\nprint(total_cents)",
          "test_var": "total_cents",
          "expected_val": "100"
        },
        "quiz": {
          "question": "How does a Python interpreter differ from a traditional compiler?",
          "options": [
            "An interpreter converts and runs code line-by-line, while a compiler converts the entire program into machine code first",
            "An interpreter only works on mathematical formulas",
            "A compiler can only run code inside IDLE",
            "There is no difference"
          ],
          "answer": 0,
          "explanation": "Compilers translate an entire high-level program into machine language before execution. An interpreter translates and executes instructions immediately, line-by-line."
        }
      }
    ]
  },
  {
    "num": 2,
    "title": "Input, Processing, and Output",
    "icon": "\ud83d\udce5",
    "desc": "The IPO model, variables, keyboard input, arithmetic operators, and f-strings.",
    "sections": [
      {
        "id": "2-1",
        "num": "2.1 - 2.4",
        "title": "The IPO Model, print(), and Comments",
        "why": "Every useful program follows Input -> Processing -> Output. Without output, you'd never see the result of the computer's work.",
        "concept": "Pseudocode and Flowcharts plan logic before coding. print() displays text or values. Comments start with # and are ignored by Python.",
        "code": "name = 'Sarah'\ngreeting = f'Hello, {name}!'\nprint(greeting)",
        "expected_output": "Hello, Sarah!",
        "pitfall": "Mismatched quotes (e.g. 'Hello\") causing a SyntaxError.",
        "rep": {
          "title": "Full Name IPO Rep",
          "prompt": "Combine first='Ada' and last='Lovelace' into full_name='Ada Lovelace'.",
          "starter": "first = 'Ada'\nlast = 'Lovelace'\nfull_name = f'{first} {last}'\nprint(full_name)",
          "test_var": "full_name",
          "expected_val": "Ada Lovelace"
        },
        "quiz": {
          "question": "Which symbol starts a single-line comment that the Python interpreter ignores?",
          "options": [
            "//",
            "/*",
            "#",
            "--"
          ],
          "answer": 2,
          "explanation": "In Python, the hash symbol (#) designates notes for human readers. Everything following # on that line is ignored by the interpreter."
        }
      },
      {
        "id": "2-2",
        "num": "2.5 - 2.6",
        "title": "Variables, Data Types, and input()",
        "why": "Memory needs labels (variables) to find stored values. input() always gives you a string ('str') because keyboard keystrokes are characters, not numbers!",
        "concept": "Core data types: int (whole), float (decimal), str (text). To perform math on user input, wrap input() in int() or float().",
        "code": "raw_val = '25'\nage = int(raw_val)\nprint(f'Age: {age}, Next Year: {age + 1}')",
        "expected_output": "Age: 25, Next Year: 26",
        "pitfall": "Adding raw input: '5' + '5' = '55' (concatenation) instead of 10. Always convert numbers!",
        "rep": {
          "title": "String to Integer Math Rep",
          "prompt": "Given str_qty = '8' and price = 5.0, calculate total = int(str_qty) * price.",
          "starter": "str_qty = '8'\nprice = 5.0\ntotal = int(str_qty) * price\nprint(total)",
          "test_var": "total",
          "expected_val": "40.0"
        },
        "quiz": {
          "question": "What will print('5' + '5') display on screen?",
          "options": [
            "10",
            "'55'",
            "55",
            "TypeError"
          ],
          "answer": 2,
          "explanation": "Because both operands are strings ('str'), the + operator performs string concatenation (gluing text together), resulting in 55!"
        }
      },
      {
        "id": "2-3",
        "num": "2.7 - 2.11",
        "title": "Arithmetic Operators, F-Strings & Constants",
        "why": "Real-world problems require whole counts and leftovers (e.g., minutes and seconds). Floating division / gives decimals; integer division // gives whole chunks; % gives the remainder.",
        "concept": "+, -, *, / (float division), // (integer division), % (remainder), ** (power). F-strings (f'{val:.2f}') format decimals. Named constants use ALL_CAPS.",
        "code": "total_seconds = 135\nmins = total_seconds // 60\nsecs = total_seconds % 60\nprint(f'Result: {mins} minute(s) and {secs} second(s)')",
        "expected_output": "Result: 2 minute(s) and 15 second(s)",
        "pitfall": "Using single / when you needed integer division //, resulting in fractional decimals.",
        "rep": {
          "title": "Modulus Remainder Rep",
          "prompt": "Find remainder of 47 divided by 5 and store in 'rem'.",
          "starter": "rem = 47 % 5\nprint(rem)",
          "test_var": "rem",
          "expected_val": "2"
        },
        "quiz": {
          "question": "What is the result of 17 % 5 in Python?",
          "options": [
            "3.4",
            "3",
            "2",
            "1"
          ],
          "answer": 2,
          "explanation": "The modulus operator % calculates the remainder of division. 5 goes into 17 three whole times (15), leaving a remainder of 2!"
        }
      }
    ]
  },
  {
    "num": 3,
    "title": "Decision Structures & Boolean Logic",
    "icon": "\ud83d\udd00",
    "desc": "if, if-else, if-elif-else, relational operators, and compound boolean expressions.",
    "sections": [
      {
        "id": "3-1",
        "num": "3.1 - 3.2",
        "title": "The if and if-else Statements",
        "why": "Without decision structures, code can only run straight top-to-bottom. if and if-else allow the CPU to dynamically branch down different execution paths based on conditions.",
        "concept": "Relational operators (==, !=, <, >, <=, >=) evaluate to True or False. Indented blocks define the statements controlled by the if or else branch.",
        "code": "hours = 45\nif hours > 40:\n    ot_hours = hours - 40\n    print(f'Overtime applies: {ot_hours} extra hours!')\nelse:\n    print('Regular hours only.')",
        "expected_output": "Overtime applies: 5 extra hours!",
        "pitfall": "Confusing assignment (=) with equality comparison (==). = modifies memory; == asks a question.",
        "rep": {
          "title": "Overtime Pay Rep",
          "prompt": "Calculate gross_pay for hours=45, rate=20.0 (1.5x on hours over 40).",
          "starter": "hours = 45\nrate = 20.0\nif hours > 40:\n    gross_pay = (40 * rate) + ((hours - 40) * rate * 1.5)\nelse:\n    gross_pay = hours * rate\nprint(gross_pay)",
          "test_var": "gross_pay",
          "expected_val": "950.0"
        },
        "quiz": {
          "question": "What is the critical difference between '=' and '==' in Python?",
          "options": [
            "'=' compares two values, while '==' assigns a value",
            "'=' assigns a value to a variable, while '==' tests if two values are equal",
            "They are interchangeable in if statements",
            "'==' is only used for strings"
          ],
          "answer": 1,
          "explanation": "Single '=' is an action that modifies memory by storing a value. Double '==' is a question that evaluates to True or False without changing memory."
        }
      },
      {
        "id": "3-2",
        "num": "3.3 - 3.4",
        "title": "String Comparison & if-elif-else Ladders",
        "why": "Nested if statements cause deep 'runaway indentation'. The if-elif-else ladder flattens multiple sequential checks into a clean, single structure.",
        "concept": "Strings are compared by ASCII character codes ('A' < 'a'). In if-elif-else, Python stops evaluating as soon as the first True branch is found.",
        "code": "score = 88\nif score >= 90:\n    grade = 'A'\nelif score >= 80:\n    grade = 'B'\nelif score >= 70:\n    grade = 'C'\nelse:\n    grade = 'F'\nprint(f'Score {score} earns grade: {grade}')",
        "expected_output": "Score 88 earns grade: B",
        "pitfall": "Putting broader conditions before specific ones (e.g., checking score >= 60 before score >= 90).",
        "rep": {
          "title": "Grade Ladder Rep",
          "prompt": "Classify score=72 into 'C' using if-elif-else ladder.",
          "starter": "score = 72\nif score >= 90: grade = 'A'\nelif score >= 80: grade = 'B'\nelif score >= 70: grade = 'C'\nelse: grade = 'F'\nprint(grade)",
          "test_var": "grade",
          "expected_val": "C"
        },
        "quiz": {
          "question": "Why does the expression 'Zebra' < 'apple' evaluate to True in Python?",
          "options": [
            "'Zebra' has fewer letters than 'apple'",
            "Uppercase ASCII values (65-90) are smaller than lowercase ASCII values (97-122)",
            "Python checks words alphabetically ignoring case",
            "It actually evaluates to False"
          ],
          "answer": 1,
          "explanation": "In ASCII encoding, all uppercase letters ('A'-'Z' = 65-90) come before lowercase letters ('a'-'z' = 97-122). So 'Z' (90) is less than 'a' (97)!"
        }
      },
      {
        "id": "3-3",
        "num": "3.5 - 3.8",
        "title": "Logical Operators (and, or, not) & Walrus Operator",
        "why": "Complex business rules require multiple conditions. Logical operators combine checks. The walrus operator (:=) assigns and tests a value simultaneously.",
        "concept": "and: both True. or: at least one True. not: inverts boolean. Python uses short-circuit evaluation. Walrus (:=) assigns within an expression.",
        "code": "salary = 45000\nyears = 3\nif salary >= 30000 and years >= 2:\n    print('Loan Status: APPROVED')\nelse:\n    print('Loan Status: DENIED')",
        "expected_output": "Loan Status: APPROVED",
        "pitfall": "Writing `if 20 <= x <= 40` as `if x >= 20 and <= 40` (missing variable on right side).",
        "rep": {
          "title": "Compound Loan Rep",
          "prompt": "Set approved=True if credit>=700 and income>=50000 (credit=720, income=60000).",
          "starter": "credit = 720\nincome = 60000\napproved = (credit >= 700 and income >= 50000)\nprint(approved)",
          "test_var": "approved",
          "expected_val": "True"
        },
        "quiz": {
          "question": "In the expression `False and some_function()`, why is `some_function()` never executed?",
          "options": [
            "It is a syntax error in Python",
            "Python uses short-circuit evaluation: since the left side of 'and' is False, the whole result must be False",
            "The 'and' operator runs backwards",
            "Functions cannot be placed next to logical operators"
          ],
          "answer": 1,
          "explanation": "Short-circuit evaluation saves CPU time: for 'and', if the first operand is False, the compound expression can never be True, so Python skips the second operand entirely."
        }
      }
    ]
  },
  {
    "num": 4,
    "title": "Repetition Structures (Loops)",
    "icon": "\ud83d\udd01",
    "desc": "Condition-controlled while loops, count-controlled for loops, range(), accumulators, and sentinels.",
    "sections": [
      {
        "id": "4-1",
        "num": "4.1 - 4.2",
        "title": "The while Loop (Condition-Controlled)",
        "why": "When you don't know in advance how many times an action must repeat (e.g., waiting for valid input), a while loop runs until the condition becomes False.",
        "concept": "while is a pretest loop: it tests before each iteration. The loop control variable must be modified inside the loop to avoid infinite loops.",
        "code": "count = 3\nwhile count > 0:\n    print(f'Count: {count}')\n    count -= 1\nprint('Done!')",
        "expected_output": "Count: 3\nCount: 2\nCount: 1\nDone!",
        "pitfall": "Forgetting to update the loop control variable inside the loop body, causing an infinite freeze.",
        "rep": {
          "title": "While Loop Rep",
          "prompt": "Calculate product of 4 * 3 * 2 * 1 using while loop into 'fact'.",
          "starter": "n = 4\nfact = 1\nwhile n > 0:\n    fact *= n\n    n -= 1\nprint(fact)",
          "test_var": "fact",
          "expected_val": "24"
        },
        "quiz": {
          "question": "What type of loop is a while loop called in Tony Gaddis's textbook?",
          "options": [
            "Count-controlled loop",
            "Condition-controlled loop",
            "Posttest loop",
            "Infinite sequence loop"
          ],
          "answer": 1,
          "explanation": "A while loop is a condition-controlled loop because its repetition is controlled by a Boolean condition that evaluates to True or False."
        }
      },
      {
        "id": "4-2",
        "num": "4.3",
        "title": "The for Loop & range() Function",
        "why": "Count-controlled loops are best when the number of iterations is known ahead of time. range() generates sequences on demand without wasting RAM.",
        "concept": "range(stop), range(start, stop), range(start, stop, step). The stop value is always exclusive (does not include the stop number).",
        "code": "evens = []\nfor i in range(2, 11, 2):\n    evens.append(i)\nprint(f'Even numbers generated: {evens}')",
        "expected_output": "Even numbers generated: [2, 4, 6, 8, 10]",
        "pitfall": "Expecting range(1, 5) to include 5. Remember: stop is non-inclusive!",
        "rep": {
          "title": "Range Sum Rep",
          "prompt": "Sum odd numbers from 1 to 9 (range(1, 10, 2)) into 'odd_sum'.",
          "starter": "odd_sum = 0\nfor i in range(1, 10, 2):\n    odd_sum += i\nprint(odd_sum)",
          "test_var": "odd_sum",
          "expected_val": "25"
        },
        "quiz": {
          "question": "How many iterations will the loop `for i in range(1, 6):` execute?",
          "options": [
            "4",
            "5",
            "6",
            "7"
          ],
          "answer": 1,
          "explanation": "range(1, 6) generates values 1, 2, 3, 4, and 5 (stopping right before 6). That is exactly 5 iterations!"
        }
      },
      {
        "id": "4-3",
        "num": "4.4 - 4.8",
        "title": "Accumulators, Sentinels & Loop Control",
        "why": "Calculating totals requires an accumulator variable initialized to 0. Sentinels allow users to signal when data entry is complete without hardcoding a count.",
        "concept": "Accumulators use augmented assignment (total += val). Sentinels check for a stop value (e.g. -1). break exits immediately; continue jumps to next iteration.",
        "code": "prices = [12.50, 8.00, 19.99]\ntotal = 0.0\nfor p in prices:\n    total += p\nprint(f'Total Bill: ${total:.2f}')",
        "expected_output": "Total Bill: $40.49",
        "pitfall": "Initializing accumulator inside the loop body, which resets total back to 0 on every iteration.",
        "rep": {
          "title": "Accumulator Rep",
          "prompt": "Sum prices = [5, 10, 15] using += into 'cart_total'.",
          "starter": "prices = [5, 10, 15]\ncart_total = 0\nfor p in prices:\n    cart_total += p\nprint(cart_total)",
          "test_var": "cart_total",
          "expected_val": "30"
        },
        "quiz": {
          "question": "Where should the accumulator variable be initialized when calculating a running total?",
          "options": [
            "Inside the loop header",
            "Inside the loop block on line 1",
            "Before the loop begins",
            "After the loop finishes"
          ],
          "answer": 2,
          "explanation": "An accumulator must be initialized (usually to 0) BEFORE the loop begins. If you initialize it inside the loop, it wipes itself out on every pass!"
        }
      }
    ]
  },
  {
    "num": 5,
    "title": "Functions & Modular Programming",
    "icon": "\ud83d\udce6",
    "desc": "Void vs value-returning functions, local/global scope, arguments/parameters, and modules.",
    "sections": [
      {
        "id": "5-1",
        "num": "5.1 - 5.3",
        "title": "Void Functions & The main() Pattern",
        "why": "Monolithic code is impossible to test, debug, or maintain. Functions break programs into small, isolated 'divide-and-conquer' tasks.",
        "concept": "def keyword defines a function. Void functions execute statements and do not return a value. The main() function organizes execution flow.",
        "code": "def show_message(user):\n    print(f'Hello, {user}! Welcome back.')\n\nshow_message('Taylor')",
        "expected_output": "Hello, Taylor! Welcome back.",
        "pitfall": "Calling a function before it has been defined by def in the script.",
        "rep": {
          "title": "Function Rep",
          "prompt": "Write square(n) that returns n**2. Call square(7) into 'result'.",
          "starter": "def square(n):\n    return n ** 2\nresult = square(7)\nprint(result)",
          "test_var": "result",
          "expected_val": "49"
        },
        "quiz": {
          "question": "What is the primary benefit of the 'divide and conquer' approach in programming?",
          "options": [
            "It makes programs use less disk storage",
            "It divides a large, complex program into small, manageable, and reusable functions",
            "It forces code to run in parallel on multiple CPUs",
            "It automatically prevents all runtime errors"
          ],
          "answer": 1,
          "explanation": "Divide and conquer modularizes code into bite-sized functions that can be written, tested, and reused independently."
        }
      },
      {
        "id": "5-2",
        "num": "5.4 - 5.6",
        "title": "Local Variables, Parameters & Global Constants",
        "why": "Local scope prevents accidental side effects: one function cannot overwrite another function's variables. Global constants provide safe, readable configuration.",
        "concept": "Variables defined inside a function are local to it. Parameters receive argument values. Global variables make debugging hard; global constants (ALL_CAPS) are safe.",
        "code": "TAX_RATE = 0.08\ndef calculate_total(price):\n    tax = price * TAX_RATE\n    return price + tax\nprint(f'Total with tax: ${calculate_total(100):.2f}')",
        "expected_output": "Total with tax: $108.00",
        "pitfall": "Using the global keyword to modify global variables across functions instead of passing parameters and returning values.",
        "rep": {
          "title": "Scope Rep",
          "prompt": "Write calc_tip(bill, pct=0.20) returning bill * pct. Store calc_tip(50) in 'tip'.",
          "starter": "def calc_tip(bill, pct=0.20):\n    return bill * pct\ntip = calc_tip(50)\nprint(tip)",
          "test_var": "tip",
          "expected_val": "10.0"
        },
        "quiz": {
          "question": "Why are global constants considered good practice, while global variables are discouraged?",
          "options": [
            "Global constants can never be read by functions",
            "Global constants provide readable shared values without the risk of any function silently corrupting them",
            "Global constants run faster in machine code",
            "They are identical in behavior"
          ],
          "answer": 1,
          "explanation": "Global variables can be modified by any function, making bugs nearly impossible to trace. Global constants cannot be changed, providing safe reference values."
        }
      },
      {
        "id": "5-3",
        "num": "5.7 - 5.10",
        "title": "Value-Returning Functions, Modules & math",
        "why": "Value-returning functions compute a result and pass it back with return. Modules group related functions into reusable .py files.",
        "concept": "return value sends data back to caller. Modules (random, math) are imported. You can create custom modules by saving a .py file and importing it.",
        "code": "import math\ndef hypotenuse(a, b):\n    return math.sqrt(a**2 + b**2)\nresult = hypotenuse(3, 4)\nprint(f'Right triangle hypotenuse: {result}')",
        "expected_output": "Right triangle hypotenuse: 5.0",
        "pitfall": "Forgetting the return statement in a value-returning function, which causes the function to return None.",
        "rep": {
          "title": "Tuple Return Rep",
          "prompt": "Write min_max(a, b) that returns min(a, b), max(a, b). Store min_max(20, 10) in 'pair'.",
          "starter": "def min_max(a, b):\n    return min(a, b), max(a, b)\npair = min_max(20, 10)\nprint(pair)",
          "test_var": "pair",
          "expected_val": "(10, 20)"
        },
        "quiz": {
          "question": "What does a Python function return by default if you do not include a `return` statement?",
          "options": [
            "0",
            "False",
            "None",
            "An empty string ''"
          ],
          "answer": 2,
          "explanation": "In Python, any function that ends without an explicit return statement automatically evaluates to the special value `None`."
        }
      }
    ]
  },
  {
    "num": 6,
    "title": "Files and Exceptions",
    "icon": "\ud83d\udcc1",
    "desc": "Reading/writing text files, records, the with statement, and try-except error handling.",
    "sections": [
      {
        "id": "6-1",
        "num": "6.1 - 6.3",
        "title": "File I/O Basics & The with Statement",
        "why": "Variables in RAM disappear when a program terminates. Files persist data permanently on disk. The with statement guarantees files close even if errors occur.",
        "concept": "open(filename, mode) modes: 'r' (read), 'w' (overwrite), 'a' (append). Always close files or use with open(...) as f.",
        "code": "lines = ['Tony Gaddis', 'Python 6th Edition']\nfor line in lines:\n    print(f'File line: {line}')",
        "expected_output": "File line: Tony Gaddis\nFile line: Python 6th Edition",
        "pitfall": "Opening in 'w' mode accidentally wipes out an existing file. Use 'a' to append!",
        "rep": {
          "title": "File Strip Rep",
          "prompt": "Strip newline from 'line\\\\n' into 'clean'.",
          "starter": "raw = 'line\\n'\nclean = raw.rstrip('\\n')\nprint(clean)",
          "test_var": "clean",
          "expected_val": "line"
        },
        "quiz": {
          "question": "Which file open mode should you use if you want to add new data to the end of an existing file without deleting it?",
          "options": [
            "'r'",
            "'w'",
            "'a'",
            "'x'"
          ],
          "answer": 2,
          "explanation": "Mode 'a' stands for Append. It preserves existing file content and writes new data at the very end of the file."
        }
      },
      {
        "id": "6-2",
        "num": "6.4 - 6.5",
        "title": "Processing Records & Exception Handling (try-except)",
        "why": "Without exception handling, an invalid file path or bad user input crashes the entire program with an ugly traceback. Exceptions allow graceful recovery.",
        "concept": "try runs risky code. except catches specific exceptions (FileNotFoundError, ValueError). else runs if no exception occurred. finally runs no matter what.",
        "code": "user_input = 'forty-two'\ntry:\n    val = int(user_input)\n    print(f'Parsed: {val}')\nexcept ValueError:\n    print('Recovered: Could not convert non-numeric string to integer!')",
        "expected_output": "Recovered: Could not convert non-numeric string to integer!",
        "pitfall": "Using a bare `except:` without specifying the error type, which can mask bugs like NameError or typos.",
        "rep": {
          "title": "Try-Except Rep",
          "prompt": "Catch ValueError when int('abc') runs. Assign status='handled'.",
          "starter": "try:\n    x = int('abc')\nexcept ValueError:\n    status = 'handled'\nprint(status)",
          "test_var": "status",
          "expected_val": "handled"
        },
        "quiz": {
          "question": "Which block in a try-except statement executes ONLY when NO exceptions were raised?",
          "options": [
            "except",
            "finally",
            "else",
            "catch"
          ],
          "answer": 2,
          "explanation": "The 'else' block executes only if the 'try' suite completes successfully without raising any exceptions."
        }
      }
    ]
  },
  {
    "num": 7,
    "title": "Lists and Tuples",
    "icon": "\ud83d\udccb",
    "desc": "Sequences, slicing, list methods, copying vs referencing, 2D lists, and immutable tuples.",
    "sections": [
      {
        "id": "7-1",
        "num": "7.1 - 7.4",
        "title": "List Basics, Slicing & Membership",
        "why": "Variables hold only one piece of data at a time. Lists hold entire collections of related items in ordered, mutable sequences.",
        "concept": "Zero-based indexing (0 to len-1) and negative indexing (-1 is last). Slicing list[start:stop:step] returns a sublist. in checks membership.",
        "code": "fruits = ['apple', 'banana', 'cherry', 'date']\nprint(f'First: {fruits[0]}, Last: {fruits[-1]}')\nprint(f'Slice [1:3]: {fruits[1:3]}')",
        "expected_output": "First: apple, Last: date\nSlice [1:3]: ['banana', 'cherry']",
        "pitfall": "IndexError: attempting to access an index equal to or greater than len(list).",
        "rep": {
          "title": "Negative Slicing Rep",
          "prompt": "Slice last 2 elements of [10, 20, 30, 40] into 'tail'.",
          "starter": "nums = [10, 20, 30, 40]\ntail = nums[-2:]\nprint(tail)",
          "test_var": "tail",
          "expected_val": "[30, 40]"
        },
        "quiz": {
          "question": "Given `items = [10, 20, 30, 40]`, what does `items[-1]` return?",
          "options": [
            "10",
            "40",
            "Error",
            "None"
          ],
          "answer": 1,
          "explanation": "Negative indexing counts backwards from the end of the sequence. -1 always refers to the very last element."
        }
      },
      {
        "id": "7-2",
        "num": "7.5 - 7.10",
        "title": "List Methods, Copying, Comprehensions & Tuples",
        "why": "Writing list_b = list_a copies only the reference, not the elements! Comprehensions build lists in one line. Tuples provide immutable safety.",
        "concept": "append(), remove(), sort(). To copy safely: list.copy(). Comprehension: [x for x in seq if cond]. Tuples are immutable ().",
        "code": "numbers = [1, 2, 3, 4, 5]\nsquares = [n**2 for n in numbers if n % 2 != 0]\nprint(f'Odd squares: {squares}')",
        "expected_output": "Odd squares: [1, 9, 25]",
        "pitfall": "Trying to modify or append to a tuple. Tuples are read-only!",
        "rep": {
          "title": "Comprehension Rep",
          "prompt": "Double numbers in [1, 2, 3] with list comprehension into 'doubled'.",
          "starter": "doubled = [x * 2 for x in [1, 2, 3]]\nprint(doubled)",
          "test_var": "doubled",
          "expected_val": "[2, 4, 6]"
        },
        "quiz": {
          "question": "If `list_a = [1, 2, 3]` and you write `list_b = list_a`, what happens when you do `list_b.append(4)`?",
          "options": [
            "Only list_b has 4",
            "Both list_a and list_b now contain 4 because they reference the same list in memory",
            "Python raises a ReferenceError",
            "list_a is automatically deleted"
          ],
          "answer": 1,
          "explanation": "Assignment (=) between lists copies the memory reference, not the list data. Both variables point to the exact same list in RAM!"
        }
      }
    ]
  },
  {
    "num": 8,
    "title": "More About Strings",
    "icon": "\ud83d\udd24",
    "desc": "String indexing, immutability, character testing methods, searching, and split/join.",
    "sections": [
      {
        "id": "8-1",
        "num": "8.1 - 8.3",
        "title": "String Testing, Searching & Manipulating",
        "why": "Strings are immutable sequences. String methods allow you to inspect characters, sanitize user inputs, and split delimited records.",
        "concept": "Testing: isdigit(), isalpha(). Modification: lower(), upper(), replace(). Splitting/Joining: split(), join(). All return NEW strings.",
        "code": "csv_data = 'laptop,mouse,keyboard'\nitems = csv_data.split(',')\nformatted = ' -> '.join(items).upper()\nprint(formatted)",
        "expected_output": "LAPTOP -> MOUSE -> KEYBOARD",
        "pitfall": "Forgetting that string methods return a NEW string. Calling `text.upper()` without reassigning does not change `text`.",
        "rep": {
          "title": "String Split Rep",
          "prompt": "Split 'cat:dog:bird' by ':' into 'animals'.",
          "starter": "raw = 'cat:dog:bird'\nanimals = raw.split(':')\nprint(animals)",
          "test_var": "animals",
          "expected_val": "['cat', 'dog', 'bird']"
        },
        "quiz": {
          "question": "What will `msg = 'hello'; msg.upper(); print(msg)` output?",
          "options": [
            "'HELLO'",
            "'hello'",
            "None",
            "TypeError"
          ],
          "answer": 1,
          "explanation": "Strings in Python are immutable! `msg.upper()` returns a new string 'HELLO', but because it wasn't reassigned to `msg`, `msg` remains 'hello'."
        }
      }
    ]
  },
  {
    "num": 9,
    "title": "Dictionaries and Sets",
    "icon": "\ud83d\udcda",
    "desc": "Key-value hash maps, O(1) lookups, set math operations, and object serialization with pickle.",
    "sections": [
      {
        "id": "9-1",
        "num": "9.1 - 9.3",
        "title": "Dictionaries, Sets & Serialization (pickle)",
        "why": "Dictionaries use hash tables for instantaneous O(1) key lookups. Sets automatically eliminate duplicate values and compute Venn diagram intersections.",
        "concept": "dict = {key: val}. Lookups: dict.get(key, default). Sets: set([1,2,2]) = {1,2}. Operations: union (|), intersection (&). pickle serializes objects to bytes.",
        "code": "scores = {'Alice': 95, 'Bob': 88}\nscores['Charlie'] = 92\nprint(f'Alice score: {scores.get(\"Alice\")}')\ncolors = set(['red', 'blue', 'red', 'green'])\nprint(f'Unique colors: {sorted(list(colors))}')",
        "expected_output": "Alice score: 95\nUnique colors: ['blue', 'green', 'red']",
        "pitfall": "Accessing a non-existent key with `dict[key]` raises KeyError. Use `dict.get(key, default)` instead.",
        "rep": {
          "title": "Safe Dict Lookup Rep",
          "prompt": "Lookup 'mango' with default 0 in stock = {'apple': 5} into 'qty'.",
          "starter": "stock = {'apple': 5}\nqty = stock.get('mango', 0)\nprint(qty)",
          "test_var": "qty",
          "expected_val": "0"
        },
        "quiz": {
          "question": "What is the time complexity to search for a key in a Python dictionary containing 1,000,000 items?",
          "options": [
            "O(N) - Linear time (must check all items)",
            "O(1) - Constant time (instant hash calculation)",
            "O(N^2) - Quadratic time",
            "O(log N) - Logarithmic time"
          ],
          "answer": 1,
          "explanation": "Dictionaries are hash tables. Python hashes the key to jump directly to its memory slot in O(1) constant time, no matter how large the dictionary is!"
        }
      }
    ]
  },
  {
    "num": 10,
    "title": "Classes & Object-Oriented Programming",
    "icon": "\ud83c\udfd7\ufe0f",
    "desc": "Procedural vs OOP, classes, instances, __init__, private attributes, and encapsulation.",
    "sections": [
      {
        "id": "10-1",
        "num": "10.1 - 10.4",
        "title": "Classes, __init__, Encapsulation & __str__",
        "why": "Procedural programming separates data from functions. OOP binds data (attributes) and behavior (methods) together into a single cohesive blueprint.",
        "concept": "class defines the blueprint. __init__(self, ...) initializes object state. Prefixing with __ hides private attributes (encapsulation). __str__ controls printing.",
        "code": "class BankAccount:\n    def __init__(self, owner, balance):\n        self.owner = owner\n        self.__balance = balance\n    def deposit(self, amount):\n        self.__balance += amount\n    def __str__(self):\n        return f'{self.owner} Account: ${self.__balance:.2f}'\nacct = BankAccount('Maria', 250.0)\nacct.deposit(50.0)\nprint(acct)",
        "expected_output": "Maria Account: $300.00",
        "pitfall": "Forgetting `self` as the first parameter in class methods.",
        "rep": {
          "title": "OOP Class Rep",
          "prompt": "Create Dog class with name attribute in __init__. Create Dog('Buddy') in 'my_dog'.",
          "starter": "class Dog:\n    def __init__(self, name):\n        self.name = name\nmy_dog = Dog('Buddy')\nprint(my_dog.name)",
          "test_var": "my_dog.name",
          "expected_val": "Buddy"
        },
        "quiz": {
          "question": "What is the purpose of the `self` parameter in a Python class method?",
          "options": [
            "It refers to the class itself rather than an object",
            "It references the specific object instance that called the method",
            "It makes the method private",
            "It is an optional keyword for documentation"
          ],
          "answer": 1,
          "explanation": "`self` represents the specific instance of the class being operated on, allowing the method to access that particular object's attributes."
        }
      }
    ]
  },
  {
    "num": 11,
    "title": "Inheritance and Polymorphism",
    "icon": "\ud83e\uddec",
    "desc": "Is-A relationships, superclasses/subclasses, super().__init__(), and dynamic polymorphism.",
    "sections": [
      {
        "id": "11-1",
        "num": "11.1 - 11.2",
        "title": "Inheritance & Polymorphism",
        "why": "Inheritance eliminates duplicate code by letting specialized subclasses inherit attributes and methods from a superclass. Polymorphism allows uniform method calls across different object types.",
        "concept": "class SubClass(SuperClass):. Call super().__init__(...) to initialize parent. Polymorphism means same method name behaves differently per object.",
        "code": "class Animal:\n    def sound(self): return 'Some sound'\nclass Dog(Animal):\n    def sound(self): return 'Woof!'\nclass Cat(Animal):\n    def sound(self): return 'Meow!'\npets = [Cat(), Dog()]\nfor p in pets:\n    print(p.sound())",
        "expected_output": "Meow!\nWoof!",
        "pitfall": "Forgetting to call `super().__init__(...)` inside subclass initializer, leaving inherited attributes uninitialized.",
        "rep": {
          "title": "Inheritance Rep",
          "prompt": "Create Sub(Parent) where Parent has x=10. Instantiate Sub() into 'sub'.",
          "starter": "class Parent:\n    x = 10\nclass Sub(Parent):\n    pass\nsub = Sub()\nprint(sub.x)",
          "test_var": "sub.x",
          "expected_val": "10"
        },
        "quiz": {
          "question": "What relationship does inheritance represent in Object-Oriented Design?",
          "options": [
            "HAS-A relationship",
            "IS-A relationship",
            "USES-A relationship",
            "CREATES-A relationship"
          ],
          "answer": 1,
          "explanation": "Inheritance models an 'IS-A' relationship: an ElectricCar IS-A Vehicle; a Dog IS-A Animal."
        }
      }
    ]
  },
  {
    "num": 12,
    "title": "Recursion",
    "icon": "\ud83e\ude9e",
    "desc": "Recursive functions, base cases vs recursive cases, call stack mechanics, and classic algorithms.",
    "sections": [
      {
        "id": "12-1",
        "num": "12.1 - 12.3",
        "title": "Recursive Functions & Base Cases",
        "why": "Problems with hierarchical or self-repeating structures (like directory trees or fractals) are naturally solved by functions that call themselves on smaller sub-problems.",
        "concept": "Every recursive function MUST have: 1. A Base Case (stops recursion), 2. A Recursive Case (reduces problem toward base case). Without a base case: RecursionError.",
        "code": "def factorial(n):\n    if n <= 1: return 1\n    return n * factorial(n - 1)\nprint(f'5! = {factorial(5)}')",
        "expected_output": "5! = 120",
        "pitfall": "Missing or unreachable base case, causing infinite recursion and a RecursionError (maximum recursion depth exceeded).",
        "rep": {
          "title": "Factorial Recursion Rep",
          "prompt": "Write recursive factorial(n) (base case n<=1 return 1). Store factorial(4) in 'res'.",
          "starter": "def factorial(n):\n    if n <= 1: return 1\n    return n * factorial(n - 1)\nres = factorial(4)\nprint(res)",
          "test_var": "res",
          "expected_val": "24"
        },
        "quiz": {
          "question": "What happens if a recursive function does NOT have a working base case?",
          "options": [
            "It returns 0",
            "The program freezes forever without error",
            "Python raises a RecursionError (maximum recursion depth exceeded)",
            "The CPU switches to an iterative loop"
          ],
          "answer": 2,
          "explanation": "Without a base case, the function keeps adding frames to the Call Stack until it exceeds Python's memory limit, triggering a RecursionError."
        }
      }
    ]
  },
  {
    "num": 13,
    "title": "GUI Programming (tkinter)",
    "icon": "\ud83d\uddbc\ufe0f",
    "desc": "Event-driven programming, widgets, layout frames, buttons, input entries, and canvas drawing.",
    "sections": [
      {
        "id": "13-1",
        "num": "13.1 - 13.10",
        "title": "GUI Widgets, Events & Layouts",
        "why": "Command-line interfaces are difficult for non-technical users. GUIs use graphical windows, buttons, and event-driven loops that wait for user actions.",
        "concept": "root = tkinter.Tk() creates main window. Widgets: Label, Button, Entry, Frame. Event loop: root.mainloop(). Layout managers: pack(), grid().",
        "code": "print('Initializing GUI window...')\nprint('Widgets packed: Label, Entry, Button')\nprint('Event loop listening for clicks...')",
        "expected_output": "Initializing GUI window...\nWidgets packed: Label, Entry, Button\nEvent loop listening for clicks...",
        "pitfall": "Passing `command=on_click()` with parentheses instead of `command=on_click` (passing the function name without calling it immediately).",
        "rep": {
          "title": "GUI Callback Rep",
          "prompt": "Store the function reference of def greet(): pass into 'handler' (WITHOUT calling it).",
          "starter": "def greet(): return 'hello'\nhandler = greet\nprint(handler())",
          "test_var": "handler()",
          "expected_val": "hello"
        },
        "quiz": {
          "question": "Why should you pass `command=my_function` instead of `command=my_function()` when creating a Button?",
          "options": [
            "`my_function()` executes the function immediately when the button is created, rather than when clicked!",
            "It is just a stylistic choice",
            "`my_function()` deletes the function",
            "Parentheses are illegal in Python parameters"
          ],
          "answer": 0,
          "explanation": "Adding parentheses `()` invokes the function right away! Passing just the function name `my_function` provides a callback reference to be called later when clicked."
        }
      }
    ]
  },
  {
    "num": 14,
    "title": "Database Programming (SQLite)",
    "icon": "\ud83d\uddc4\ufe0f",
    "desc": "Relational databases, SQL queries, parameterized statements, CRUD operations, and joins.",
    "sections": [
      {
        "id": "14-1",
        "num": "14.1 - 14.11",
        "title": "SQLite, CRUD & Parameterized SQL",
        "why": "Plain text files cannot handle millions of rows, multi-user transactions, or complex queries. Relational databases provide structured, indexed, ACID-compliant storage.",
        "concept": "sqlite3 module connects to database. cursor.execute() runs SQL. Always use '?' placeholders to prevent SQL Injection! commit() persists transactions.",
        "code": "import sqlite3\nconn = sqlite3.connect(':memory:')\ncur = conn.cursor()\ncur.execute('CREATE TABLE Students (ID INT, Name TEXT)')\ncur.execute('INSERT INTO Students VALUES (?, ?)', (101, 'Elena'))\nconn.commit()\ncur.execute('SELECT * FROM Students')\nprint('DB Query Result:', cur.fetchall())\nconn.close()",
        "expected_output": "DB Query Result: [(101, 'Elena')]",
        "pitfall": "Using string formatting (f'INSERT INTO ... {val}') which opens your database to devastating SQL Injection attacks. Always use ? placeholders!",
        "rep": {
          "title": "Parameterized SQL Rep",
          "prompt": "Write SQL statement with ? placeholder for student ID into 'sql_stmt'.",
          "starter": "sql_stmt = 'SELECT * FROM Students WHERE ID = ?'\nprint(sql_stmt)",
          "test_var": "sql_stmt",
          "expected_val": "SELECT * FROM Students WHERE ID = ?"
        },
        "quiz": {
          "question": "Why must you always use '?' placeholders instead of f-strings when inserting values into SQL queries?",
          "options": [
            "F-strings are not supported in database files",
            "'?' placeholders automatically sanitize inputs to protect against SQL Injection attacks",
            "'?' makes queries run 100x faster",
            "SQL only understands question marks"
          ],
          "answer": 1,
          "explanation": "SQL Injection allows attackers to inject malicious SQL commands through input fields. Parameterized queries with '?' treat user input strictly as data, never executable SQL!"
        }
      }
    ]
  }
];
