"""
================================================================================
                    PYTHON DELIBERATE PRACTICE REPS GYM
       Mastering Python Through Infinite Randomized Coding Workouts
             Based on Tony Gaddis: Starting Out with Python (6th Ed)
================================================================================
"""

import sys
import os
import random
import math
import time
import traceback

# Force UTF-8 encoding on Windows console to support symbols cleanly
if sys.platform == "win32":
    try:
        sys.stdout.reconfigure(encoding="utf-8", errors="replace")
        sys.stderr.reconfigure(encoding="utf-8", errors="replace")
    except Exception:
        pass

CURRENT_REP_FILE = os.path.join(os.path.dirname(os.path.abspath(__file__)), "current_rep.py")

# ANSI color styling for Windows / Terminal
class Colors:
    HEADER = '\033[95m'
    BLUE = '\033[94m'
    CYAN = '\033[96m'
    GREEN = '\033[92m'
    YELLOW = '\033[93m'
    RED = '\033[91m'
    BOLD = '\033[1m'
    UNDERLINE = '\033[4m'
    END = '\033[0m'

def color(text, code):
    if os.name == 'nt':
        os.system('') # enables ANSI escape sequences on Windows 10/11
    return f"{code}{text}{Colors.END}"

def banner(title):
    width = 72
    print("\n" + "=" * width)
    print(f" {title} ".center(width, " "))
    print("=" * width)

# Global stats
stats = {
    "total_reps": 0,
    "passed_reps": 0,
    "current_streak": 0,
    "best_streak": 0
}

def record_rep(passed):
    stats["total_reps"] += 1
    if passed:
        stats["passed_reps"] += 1
        stats["current_streak"] += 1
        if stats["current_streak"] > stats["best_streak"]:
            stats["best_streak"] = stats["current_streak"]
    else:
        stats["current_streak"] = 0

def print_stats():
    banner("YOUR REPS DASHBOARD & STATS")
    cur_streak = stats["current_streak"]
    best_streak = stats["best_streak"]
    print(f" Total Reps Attempted: {color(str(stats['total_reps']), Colors.CYAN)}")
    print(f" Reps Mastered (Pass): {color(str(stats['passed_reps']), Colors.GREEN)}")
    acc = round((stats['passed_reps'] / stats['total_reps'] * 100)) if stats['total_reps'] > 0 else 0
    print(f" Accuracy Rate:        {color(f'{acc}%', Colors.YELLOW)}")
    print(f" Current Streak:       {color(f'{cur_streak} [HOT]', Colors.GREEN if cur_streak > 0 else Colors.RED)}")
    print(f" All-Time Best Streak: {color(f'{best_streak} [TROPHY]', Colors.HEADER)}")
    print("=" * 72)
    input("\nPress [Enter] to return to menu...")

def get_user_code(starter_template, function_name=None):
    """
    Writes starter code to current_rep.py so student can open it in IDLE or VS Code,
    or allows direct terminal paste.
    """
    with open(CURRENT_REP_FILE, "w", encoding="utf-8") as f:
        f.write(starter_template)
    
    print(f"\n{color('[NOTE] HOW TO SUBMIT YOUR CODE:', Colors.BOLD)}")
    print(f" 1. Open {color('current_rep.py', Colors.CYAN)} in IDLE or your editor.")
    print(" 2. Write your solution and save the file (Ctrl + S).")
    print(f" 3. Press {color('[ENTER]', Colors.GREEN)} right here to run your automated test suite.")
    print("    (Or type 'paste' to paste code directly into this terminal)\n")
    
    choice = input("Ready to test? Press [Enter] (or type 'paste'): ").strip().lower()
    
    if choice == 'paste':
        print("\nPaste your code below. Type 'DONE' on a new line and press Enter when finished:\n")
        lines = []
        while True:
            try:
                line = input()
                if line.strip() == "DONE":
                    break
                lines.append(line)
            except EOFError:
                break
        code = "\n".join(lines)
        with open(CURRENT_REP_FILE, "w", encoding="utf-8") as f:
            f.write(code)
        return code
    else:
        if not os.path.exists(CURRENT_REP_FILE):
            print(color("Error: current_rep.py not found!", Colors.RED))
            return ""
        with open(CURRENT_REP_FILE, "r", encoding="utf-8") as f:
            return f.read()

def run_test_suite(code, function_name, test_cases, why_explanation, pro_tip):
    """
    Executes student code in a sandbox and runs randomized test cases.
    """
    banner(f"EVALUATING REP: {function_name}()")
    
    # Check syntax first
    try:
        compiled = compile(code, "current_rep.py", "exec")
    except SyntaxError as e:
        print(color(f"[X] SYNTAX ERROR on line {e.lineno}:", Colors.RED))
        print(f"   {e.text.strip() if e.text else ''}")
        print(f"   {' ' * ((e.offset or 1) - 1)}^")
        print(f"   {color(str(e.msg), Colors.YELLOW)}")
        print(f"\n{color('[WHY] WHY THIS HAPPENED:', Colors.CYAN)}")
        print("   Python could not parse your code. Check for missing colons (:),")
        print("   unclosed quotes (' or \"), unmatched parentheses (), or improper indentation.")
        record_rep(False)
        return False

    namespace = {}
    start_t = time.time()
    try:
        exec(compiled, namespace)
    except Exception as e:
        print(color(f"[X] RUNTIME ERROR during script loading: {type(e).__name__}", Colors.RED))
        print(f"   {e}")
        print(f"\n{color('[WHY] WHY THIS HAPPENED:', Colors.CYAN)}")
        print("   Your code crashed while running top-level statements.")
        traceback.print_exc(limit=2)
        record_rep(False)
        return False

    if function_name not in namespace or not callable(namespace[function_name]):
        print(color(f"[X] MISSING FUNCTION: '{function_name}' was not defined!", Colors.RED))
        print(f"   Make sure you defined: def {function_name}(...):")
        record_rep(False)
        return False

    func = namespace[function_name]
    
    passed_count = 0
    total_tests = len(test_cases)
    
    for idx, (args, expected, test_desc) in enumerate(test_cases, 1):
        try:
            # Call function
            if isinstance(args, tuple):
                result = func(*args)
            else:
                result = func(args)
            
            # Check float equality or standard equality
            is_match = False
            if isinstance(expected, float) and isinstance(result, (int, float)):
                is_match = abs(result - expected) < 0.01
            else:
                is_match = (result == expected)
            
            if is_match:
                print(f"  [Test {idx}/{total_tests}] {color('PASS [PASS]', Colors.GREEN)} : {test_desc}")
                passed_count += 1
            else:
                print(f"  [Test {idx}/{total_tests}] {color('FAIL [FAIL]', Colors.RED)} : {test_desc}")
                print(f"     Inputs:        {args}")
                print(f"     Expected:      {color(str(expected), Colors.GREEN)}")
                print(f"     Your Function: {color(str(result), Colors.RED)}")
                print(f"\n{color('[WHY] DIAGNOSTIC & WHY:', Colors.CYAN)}")
                print(f"   {why_explanation}")
                print(f"\n{color('[PRO-TIP] PRO TIP ON EFFICIENCY:', Colors.YELLOW)}")
                print(f"   {pro_tip}")
                record_rep(False)
                return False
                
        except Exception as e:
            print(f"  [Test {idx}/{total_tests}] {color('CRASH [FAIL]', Colors.RED)} : {test_desc}")
            print(f"     Inputs: {args}")
            print(f"     Exception: {type(e).__name__}: {e}")
            print(f"\n{color('[WHY] DIAGNOSTIC & WHY:', Colors.CYAN)}")
            print(f"   {why_explanation}")
            record_rep(False)
            return False

    elapsed = (time.time() - start_t) * 1000
    print("\n" + color(f"[SUCCESS] ALL {total_tests}/{total_tests} TESTS PASSED! Muscle memory rep logged! ({elapsed:.1f}ms)", Colors.GREEN))
    print(f"\n{color('[INSIGHT] THE WHY BEHIND THIS:', Colors.CYAN)}")
    print(f"   {why_explanation}")
    print(f"\n{color('[TIP] EFFICIENCY & CLEAN CODE INSIGHT:', Colors.YELLOW)}")
    print(f"   {pro_tip}")
    record_rep(True)
    return True


# ==============================================================================
# DRILL BUILDERS (CHAPTER BY CHAPTER WITH RANDOMIZATION)
# ==============================================================================

def rep_chapter2_math_ipo():
    """Chapter 2: Variables, Arithmetic, Floats, and Formatting"""
    bill = round(random.uniform(25.0, 180.0), 2)
    tax_pct = random.choice([6.0, 7.5, 8.25, 9.0])
    tip_pct = random.choice([15.0, 18.0, 20.0])
    
    expected_tax = bill * (tax_pct / 100.0)
    expected_tip = bill * (tip_pct / 100.0)
    expected_total = round(bill + expected_tax + expected_tip, 2)
    
    starter = f'''# CHAPTER 2 REP: Total Restaurant Bill Calculator
# Complete the function calculate_bill(subtotal, tax_rate_pct, tip_rate_pct)
# It should return the total amount rounded to 2 decimal places.
# Example: calculate_bill(100.0, 8.0, 20.0) should return 128.0

def calculate_bill(subtotal, tax_rate_pct, tip_rate_pct):
    # Write your logic below and return the final total
    pass
'''
    banner("CHAPTER 2 DRILL: Financial Math & IPO Model")
    print(f"Objective: Write a function {color('calculate_bill(subtotal, tax_rate_pct, tip_rate_pct)', Colors.BOLD)}")
    print("Given subtotal, tax percent, and tip percent, calculate the total bill.")
    print(f"Random Test Scenario: bill=${bill}, tax={tax_pct}%, tip={tip_pct}% -> Expected: ${expected_total}")
    
    code = get_user_code(starter, "calculate_bill")
    if not code: return
    
    tests = [
        ((bill, tax_pct, tip_pct), expected_total, f"Random generated case: ${bill}"),
        ((100.0, 8.0, 20.0), 128.0, "Standard 100 base"),
        ((50.0, 10.0, 15.0), 62.5, "Clean whole percentages"),
        ((0.0, 8.0, 20.0), 0.0, "Zero subtotal edge case"),
        ((234.56, 7.25, 18.0), round(234.56 + (234.56 * 0.0725) + (234.56 * 0.18), 2), "Complex decimals")
    ]
    
    why = ("Every business calculation follows Input -> Processing -> Output. "
           "Percentages must be divided by 100.0 before multiplying with dollar amounts. "
           "In Python, float arithmetic can produce binary representation artifacts (e.g. 128.00000000000003), "
           "so round(value, 2) ensures clean currency results.")
    
    pro_tip = ("Clean Python idiom: you can compute total in one clean expression: "
               "round(subtotal * (1 + (tax_rate_pct + tip_rate_pct) / 100.0), 2) "
               "which avoids creating 3 intermediate variables and reduces arithmetic rounding drift!")
    
    run_test_suite(code, "calculate_bill", tests, why, pro_tip)


def rep_chapter2_modulus_time():
    """Chapter 2: Modulus and Integer Division"""
    rand_sec = random.randint(3600, 18000)
    exp_h = rand_sec // 3600
    rem = rand_sec % 3600
    exp_m = rem // 60
    exp_s = rem % 60
    exp_tuple = (exp_h, exp_m, exp_s)
    
    starter = f'''# CHAPTER 2 REP: Time Splitter (// and %)
# Write a function split_seconds(total_seconds)
# It should return a tuple of (hours, minutes, seconds)
# Example: split_seconds(3665) -> (1, 1, 5)

def split_seconds(total_seconds):
    # Calculate hours using //
    # Calculate leftovers using %
    pass
'''
    banner("CHAPTER 2 DRILL: Integer Division (//) & Modulus (%)")
    print(f"Objective: Write a function {color('split_seconds(total_seconds)', Colors.BOLD)}")
    print("Return a tuple of (hours, minutes, seconds).")
    print(f"Random Test Scenario: {rand_sec} seconds -> Expected: {exp_tuple}")
    
    code = get_user_code(starter, "split_seconds")
    if not code: return
    
    tests = [
        (rand_sec, exp_tuple, f"Random time: {rand_sec}s"),
        (3600, (1, 0, 0), "Exact 1 hour"),
        (3661, (1, 1, 1), "1 hr 1 min 1 sec"),
        (59, (0, 0, 59), "Under 1 minute"),
        (0, (0, 0, 0), "Zero seconds boundary")
    ]
    
    why = ("Standard division (/) always returns a float (e.g. 7 / 2 = 3.5). "
           "Integer division (//) chops off the fraction to give whole chunks (7 // 2 = 3). "
           "Modulus (%) captures the leftover remainder (7 % 2 = 1). "
           "Together, // and % allow you to break flat units into hierarchical units (hours/mins/secs, dollars/cents, feet/inches).")
    
    pro_tip = ("Python built-in shortcut: Python has a built-in function `divmod(a, b)` that computes "
               "both quotient and remainder at the same time: hours, rem = divmod(total_seconds, 3600)!")
    
    run_test_suite(code, "split_seconds", tests, why, pro_tip)


def rep_chapter3_shipping_tiers():
    """Chapter 3: Decision Structures (if-elif-else)"""
    rand_weight = round(random.uniform(0.5, 25.0), 1)
    
    starter = '''# CHAPTER 3 REP: Tiered Shipping Rate Calculator
# Write a function calc_shipping(weight) that returns the shipping cost:
# - Up to 2.0 lbs: $3.50 flat
# - Over 2.0 lbs up to 6.0 lbs: $3.50 + $2.00 per pound over 2.0
# - Over 6.0 lbs up to 10.0 lbs: $11.50 + $3.00 per pound over 6.0
# - Over 10.0 lbs: $23.50 + $4.50 per pound over 10.0
# - If weight <= 0: return 0.0

def calc_shipping(weight):
    pass
'''
    banner("CHAPTER 3 DRILL: Tiered Decision Structures (if-elif-else)")
    print(f"Objective: Write {color('calc_shipping(weight)', Colors.BOLD)} using tiered if-elif-else logic.")
    
    def ref_shipping(w):
        if w <= 0: return 0.0
        elif w <= 2.0: return 3.50
        elif w <= 6.0: return round(3.50 + (w - 2.0) * 2.00, 2)
        elif w <= 10.0: return round(11.50 + (w - 6.0) * 3.00, 2)
        else: return round(23.50 + (w - 10.0) * 4.50, 2)
        
    code = get_user_code(starter, "calc_shipping")
    if not code: return
    
    tests = [
        (rand_weight, ref_shipping(rand_weight), f"Random weight {rand_weight} lbs"),
        (1.5, 3.50, "Tier 1: Under 2 lbs"),
        (2.0, 3.50, "Tier 1 boundary: Exact 2.0 lbs"),
        (4.0, 7.50, "Tier 2: 4 lbs (3.50 + 2*2)"),
        (6.0, 11.50, "Tier 2 boundary: 6 lbs"),
        (8.0, 17.50, "Tier 3: 8 lbs (11.50 + 2*3)"),
        (12.0, 32.50, "Tier 4: 12 lbs (23.50 + 2*4.50)"),
        (0.0, 0.0, "Zero weight edge case"),
        (-5.0, 0.0, "Negative weight edge case")
    ]
    
    why = ("Tiered logic requires mutually exclusive branches. When evaluating if-elif-else from top to bottom, "
           "once Python finds a True condition, it executes that block and skips ALL remaining elif/else blocks. "
           "This eliminates redundant range checks like (w > 2 and w <= 6)!")
    
    pro_tip = ("Write 'guard clauses' first. Checking invalid input (w <= 0) at the very top and returning early "
               "simplifies the rest of the function and avoids deep nesting.")
    
    run_test_suite(code, "calc_shipping", tests, why, pro_tip)


def rep_chapter4_accumulator_loop():
    """Chapter 4: Repetition Structures & Accumulators"""
    nums = [random.randint(10, 100) for _ in range(random.randint(5, 10))]
    cutoff = random.randint(30, 60)
    exp_sum = sum(x for x in nums if x > cutoff)
    
    starter = '''# CHAPTER 4 REP: Filtered Running Total Accumulator
# Write a function sum_above_threshold(numbers_list, threshold)
# It should loop through the list and return the sum of all numbers
# that are strictly GREATER than the threshold.
# Example: sum_above_threshold([10, 50, 20, 80], 30) -> 130 (50 + 80)

def sum_above_threshold(numbers_list, threshold):
    # 1. Initialize accumulator variable to 0 OUTSIDE loop
    # 2. Loop through each number in numbers_list
    # 3. If number > threshold, add to accumulator
    # 4. Return accumulator
    pass
'''
    banner("CHAPTER 4 DRILL: The Accumulator Pattern & Loop Logic")
    print(f"Objective: Write {color('sum_above_threshold(numbers_list, threshold)', Colors.BOLD)}")
    print(f"Random Test Scenario: {nums} with threshold {cutoff} -> Expected: {exp_sum}")
    
    code = get_user_code(starter, "sum_above_threshold")
    if not code: return
    
    tests = [
        ((nums, cutoff), exp_sum, f"Random list with threshold {cutoff}"),
        (([10, 50, 20, 80], 30), 130, "Standard sample list"),
        (([5, 10, 15], 100), 0, "No numbers above threshold"),
        (([100, 200, 300], 50), 600, "All numbers above threshold"),
        (([], 10), 0, "Empty list boundary case")
    ]
    
    why = ("The accumulator pattern is one of computer science's fundamental building blocks. "
           "The running total MUST be initialized to 0 BEFORE the loop starts. "
           "If you accidentally place 'total = 0' inside the loop, the variable resets on every pass!")
    
    pro_tip = ("Pythonic mastery: In production Python, this entire accumulator loop can be expressed "
               "in one clean line using generator expressions: return sum(x for x in numbers_list if x > threshold). "
               "It is faster and less prone to off-by-one errors!")
    
    run_test_suite(code, "sum_above_threshold", tests, why, pro_tip)


def rep_chapter5_functions_validation():
    """Chapter 5: Functions, Return Values, and Validation"""
    starter = '''# CHAPTER 5 REP: Password Policy Validator Function
# Write a function validate_password(password) that returns True if:
# 1. Length is at least 8 characters
# 2. Contains at least one digit (0-9)
# 3. Contains at least one uppercase letter (A-Z)
# 4. Contains at least one lowercase letter (a-z)
# Otherwise returns False.

def validate_password(password):
    pass
'''
    banner("CHAPTER 5 DRILL: Functions, Decomposition & Return Values")
    print(f"Objective: Write {color('validate_password(password)', Colors.BOLD)}")
    print("Return True if password meets all 4 rules, otherwise False.")
    
    def ref_pw(pw):
        if len(pw) < 8: return False
        has_digit = any(c.isdigit() for c in pw)
        has_upper = any(c.isupper() for c in pw)
        has_lower = any(c.islower() for c in pw)
        return has_digit and has_upper and has_lower

    code = get_user_code(starter, "validate_password")
    if not code: return
    
    tests = [
        ("Python123", True, "Valid: 9 chars, upper, lower, digits"),
        ("StrongP@ss99", True, "Valid: strong password"),
        ("short1A", False, "Invalid: only 7 characters (too short)"),
        ("nocaps1234", False, "Invalid: no uppercase letter"),
        ("NOLOWER1234", False, "Invalid: no lowercase letter"),
        ("NoDigitsHere", False, "Invalid: no digits"),
        ("", False, "Invalid: empty string")
    ]
    
    why = ("Functions allow modular code reuse and testability. Value-returning functions should "
           "compute a result and return it rather than printing it, so other parts of your program "
           "can use that decision in conditional statements (e.g. if validate_password(pw):).")
    
    pro_tip = ("Use string inspection methods (.isdigit(), .isupper(), .islower()) combined with "
               "the 'any()' built-in for expressive, readable boolean evaluations!")
    
    run_test_suite(code, "validate_password", tests, why, pro_tip)


def rep_chapter7_lists_stats():
    """Chapter 7: Lists and Processing"""
    rand_data = [round(random.uniform(10.0, 99.0), 1) for _ in range(random.randint(6, 12))]
    min_v = min(rand_data)
    max_v = max(rand_data)
    avg_v = round(sum(rand_data) / len(rand_data), 2)
    expected_dict = {"min": min_v, "max": max_v, "avg": avg_v}
    
    starter = '''# CHAPTER 7 REP: List Statistics Engine
# Write a function analyze_numbers(numbers)
# It should return a dictionary with keys: 'min', 'max', and 'avg' (rounded to 2 decimals)
# If the list is empty, return None.
# Example: analyze_numbers([10, 20, 30]) -> {'min': 10, 'max': 30, 'avg': 20.0}

def analyze_numbers(numbers):
    pass
'''
    banner("CHAPTER 7 DRILL: Lists, Aggregations & Edge Cases")
    print(f"Objective: Write {color('analyze_numbers(numbers)', Colors.BOLD)}")
    print(f"Random Test Scenario: {rand_data}")
    print(f"Expected: {expected_dict}")
    
    code = get_user_code(starter, "analyze_numbers")
    if not code: return
    
    tests = [
        (rand_data, expected_dict, "Randomly generated numbers list"),
        ([10, 20, 30], {"min": 10, "max": 30, "avg": 20.0}, "Standard 10, 20, 30"),
        ([5.5], {"min": 5.5, "max": 5.5, "avg": 5.5}, "Single-item list"),
        ([], None, "Empty list boundary case")
    ]
    
    why = ("When calculating averages, dividing by len(numbers) when the list is empty results in "
           "a ZeroDivisionError crash. Always guard against empty collections before aggregating.")
    
    pro_tip = ("Python lists come with built-in functions: min(numbers), max(numbers), and sum(numbers). "
               "Leveraging built-ins executes in optimized C speed rather than manual for loops!")
    
    run_test_suite(code, "analyze_numbers", tests, why, pro_tip)


def rep_chapter8_string_cleaner():
    """Chapter 8: Strings and Text Manipulation"""
    starter = '''# CHAPTER 8 REP: Clean and Format Phone Numbers
# Write a function clean_phone_number(raw_string)
# It extracts all digits from raw_string and returns formatted "(XXX) XXX-XXXX".
# If the extracted digits do not total exactly 10 digits, return None.
# Example: clean_phone_number("Call 555-123-4567 today!") -> "(555) 123-4567"

def clean_phone_number(raw_string):
    pass
'''
    banner("CHAPTER 8 DRILL: String Parsing & Formatting")
    print(f"Objective: Write {color('clean_phone_number(raw_string)', Colors.BOLD)}")
    print("Filter digits, validate length (10 digits), and return '(XXX) XXX-XXXX' or None.")
    
    def ref_clean(s):
        digits = "".join(c for c in s if c.isdigit())
        if len(digits) != 10:
            return None
        return f"({digits[:3]}) {digits[3:6]}-{digits[6:]}"

    code = get_user_code(starter, "clean_phone_number")
    if not code: return
    
    tests = [
        ("Call 555-123-4567 today!", "(555) 123-4567", "Text with hyphens"),
        ("(800) 555.0199", "(800) 555-0199", "Dots and parentheses"),
        ("1234567890", "(123) 456-7890", "Raw 10 digits"),
        ("555-1234", None, "Only 7 digits (too short)"),
        ("18005551234", None, "11 digits (too long)"),
        ("No numbers here", None, "Zero digits")
    ]
    
    why = ("Strings in Python are immutable sequences. You can slice substrings using [start:stop] notation. "
           "Extracting valid characters using a generator or loop and then formatting with an f-string is "
           "the standard industry pattern for data sanitization.")
    
    pro_tip = ("Slicing digits[:3], digits[3:6], and digits[6:] cleanly unpacks the phone components without "
               "messy indexing offsets or regex dependencies!")
    
    run_test_suite(code, "clean_phone_number", tests, why, pro_tip)


def rep_chapter9_word_counter():
    """Chapter 9: Dictionaries and Frequency Maps"""
    words = ["apple", "banana", "cherry", "date"]
    sampled = [random.choice(words) for _ in range(12)]
    text = " ".join(sampled)
    
    ref_dict = {}
    for w in sampled:
        ref_dict[w] = ref_dict.get(w, 0) + 1
        
    starter = '''# CHAPTER 9 REP: Word Frequency Counter Dictionary
# Write a function count_words(sentence)
# Convert sentence to lowercase, split into words, and return a dictionary
# mapping each word to the number of times it appears.
# Example: count_words("the cat saw the dog") -> {'the': 2, 'cat': 1, 'saw': 1, 'dog': 1}

def count_words(sentence):
    pass
'''
    banner("CHAPTER 9 DRILL: Dictionaries & Frequency Mapping")
    print(f"Objective: Write {color('count_words(sentence)', Colors.BOLD)}")
    print(f"Random Test Scenario: '{text}'")
    print(f"Expected: {ref_dict}")
    
    code = get_user_code(starter, "count_words")
    if not code: return
    
    tests = [
        (text, ref_dict, "Random generated word sequence"),
        ("The cat saw the dog", {"the": 2, "cat": 1, "saw": 1, "dog": 1}, "Case-insensitivity test"),
        ("Python python PYTHON", {"python": 3}, "All same word different casing"),
        ("", {}, "Empty string edge case")
    ]
    
    why = ("Dictionaries provide O(1) instant key lookup. When counting occurrences, attempting to access "
           "a key that doesn't exist yet throws a KeyError. The .get(key, default) method avoids the crash "
           "by defaulting to 0 for new words!")
    
    pro_tip = ("Instead of `if word in counts: counts[word] += 1 else: counts[word] = 1`, write: "
               "`counts[word] = counts.get(word, 0) + 1`. It reduces your code by 4 lines!")
    
    run_test_suite(code, "count_words", tests, why, pro_tip)


def rep_chapter10_classes_bank():
    """Chapter 10: Classes, Encapsulation, and Methods"""
    starter = '''# CHAPTER 10 REP: BankAccount Class Implementation
# Define a class BankAccount with:
# 1. __init__(self, owner, starting_balance=0.0)
# 2. deposit(self, amount) -> adds amount if amount > 0, returns new balance
# 3. withdraw(self, amount) -> subtracts amount if 0 < amount <= balance, returns True.
#    If insufficient funds or amount <= 0, makes no change and returns False.
# 4. get_balance(self) -> returns current balance

class BankAccount:
    def __init__(self, owner, starting_balance=0.0):
        pass
        
    def deposit(self, amount):
        pass
        
    def withdraw(self, amount):
        pass
        
    def get_balance(self):
        pass
'''
    banner("CHAPTER 10 DRILL: Object-Oriented Programming (Classes & Encapsulation)")
    print(f"Objective: Implement class {color('BankAccount', Colors.BOLD)}")
    print("Encapsulate balance, handle deposits and overdraft protection in withdraw().")
    
    code = get_user_code(starter, "BankAccount")
    if not code: return
    
    banner("EVALUATING CLASS: BankAccount")
    try:
        compiled = compile(code, "current_rep.py", "exec")
        ns = {}
        exec(compiled, ns)
    except Exception as e:
        print(color(f"[X] Execution Error: {e}", Colors.RED))
        record_rep(False)
        return
        
    if "BankAccount" not in ns:
        print(color("[X] Class 'BankAccount' not found in code!", Colors.RED))
        record_rep(False)
        return
        
    cls = ns["BankAccount"]
    try:
        acct = cls("Alice", 100.0)
        assert acct.get_balance() == 100.0, f"Expected initial balance 100.0, got {acct.get_balance()}"
        print(f"  [Test 1/4] {color('PASS [PASS]', Colors.GREEN)} : Initialization and get_balance()")
        
        acct.deposit(50.0)
        assert acct.get_balance() == 150.0, f"Expected 150.0 after deposit, got {acct.get_balance()}"
        print(f"  [Test 2/4] {color('PASS [PASS]', Colors.GREEN)} : Deposit handling")
        
        ok = acct.withdraw(70.0)
        assert ok is True and acct.get_balance() == 80.0, f"Expected withdraw True and 80.0 balance, got {ok}, {acct.get_balance()}"
        print(f"  [Test 3/4] {color('PASS [PASS]', Colors.GREEN)} : Valid withdrawal")
        
        bad = acct.withdraw(500.0)
        assert bad is False and acct.get_balance() == 80.0, f"Expected withdraw False on overdraft, got {bad}, {acct.get_balance()}"
        print(f"  [Test 4/4] {color('PASS [PASS]', Colors.GREEN)} : Overdraft protection & balance integrity")
        
        print("\n" + color("[SUCCESS] ALL 4/4 CLASS TESTS PASSED! OOP rep logged!", Colors.GREEN))
        print(f"\n{color('[INSIGHT] THE WHY BEHIND THIS:', Colors.CYAN)}")
        print("   Encapsulation protects object state from illegal modifications. Instead of allowing external code "
              "   to directly modify acct.balance = -9999, methods like deposit() and withdraw() enforce business rules!")
        record_rep(True)
        
    except AssertionError as e:
        print(color(f"[X] Logic Test Failed: {e}", Colors.RED))
        record_rep(False)
    except Exception as e:
        print(color(f"[X] Method Crash: {type(e).__name__}: {e}", Colors.RED))
        record_rep(False)


# ==============================================================================
# MAIN WORKOUT LOOP
# ==============================================================================

DRILLS = [
    ("Chapter 2: Variables, Math & Total Bill IPO", rep_chapter2_math_ipo),
    ("Chapter 2: Modulus (%) & Integer Division (//) Time Splitter", rep_chapter2_modulus_time),
    ("Chapter 3: Decision Structures (if-elif-else Shipping Tiers)", rep_chapter3_shipping_tiers),
    ("Chapter 4: Repetition Structures & Running Accumulator", rep_chapter4_accumulator_loop),
    ("Chapter 5: Functions, Scope & Password Validator", rep_chapter5_functions_validation),
    ("Chapter 7: Lists, Aggregations & Boundary Handling", rep_chapter7_lists_stats),
    ("Chapter 8: Strings & Data Sanitization", rep_chapter8_string_cleaner),
    ("Chapter 9: Dictionaries & Frequency Mapping", rep_chapter9_word_counter),
    ("Chapter 10: OOP, Classes & Encapsulation (BankAccount)", rep_chapter10_classes_bank)
]

def random_workout():
    """Runs a 3-drill randomized circuit"""
    banner("[HOT] 3-DRILL RANDOMIZED HIGH-INTENSITY CIRCUIT [HOT]")
    selected = random.sample(DRILLS, 3)
    for i, (name, func) in enumerate(selected, 1):
        print(f"\n>>> CIRCUIT ROUND {i}/3: {name} <<<")
        func()
        if i < 3:
            input("\nPress [Enter] for next drill in circuit...")
    banner("CIRCUIT COMPLETE! Check your dashboard.")

def main():
    while True:
        banner("PYTHON DELIBERATE PRACTICE REPS GYM")
        print(" Choose your workout topic:\n")
        for idx, (name, _) in enumerate(DRILLS, 1):
            print(f"  [{idx}] {name}")
        print("\n  [R] [RANDOM] Random 3-Drill Circuit (Ultimate Test)")
        print(f"  [S] [STATS] View Reps Dashboard & Streak ({stats['current_streak']} [HOT])")
        print("  [Q] Quit Gym\n")
        
        choice = input("Enter choice (1-9, R, S, Q): ").strip().upper()
        if choice == 'Q':
            print("\nKeep getting those reps in. Consistency builds mastery! Goodbye.\n")
            break
        elif choice == 'S':
            print_stats()
        elif choice == 'R':
            random_workout()
        elif choice.isdigit() and 1 <= int(choice) <= len(DRILLS):
            idx = int(choice) - 1
            drill_name, drill_func = DRILLS[idx]
            while True:
                drill_func()
                again = input(f"\nDo another randomized rep for '{drill_name}'? (Y/N): ").strip().upper()
                if again != 'Y':
                    break
        else:
            print(color("Invalid choice, please enter 1-9, R, S, or Q.", Colors.YELLOW))

if __name__ == "__main__":
    try:
        main()
    except KeyboardInterrupt:
        print("\nWorkout paused. See you next session!")
