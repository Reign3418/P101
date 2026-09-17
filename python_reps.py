"""
================================================================================
                    PYTHON DELIBERATE PRACTICE REPS GYM
       Mastering Python Through Infinite Randomized Coding Workouts
   Curriculum Aligned with Prof. Jade Cao (CCCC) & Tony Gaddis (6th Ed)
================================================================================
"""

import sys
import os
import random
import math
import time
import traceback

# Force UTF-8 encoding on Windows console
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
    return f"{code}{text}{Colors.END}"

def banner(title):
    width = 74
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
    print("=" * 74)
    input("\nPress [Enter] to return to menu...")

def get_user_code(starter_template, function_name=None):
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
    banner(f"EVALUATING REP: {function_name}()")
    
    try:
        compiled = compile(code, "current_rep.py", "exec")
    except SyntaxError as e:
        print(color(f"[X] SYNTAX ERROR on line {e.lineno}:", Colors.RED))
        print(f"   {e.text.strip() if e.text else ''}")
        print(f"   {' ' * ((e.offset or 1) - 1)}^")
        print(f"   {color(str(e.msg), Colors.YELLOW)}")
        print(f"\n{color('[WHY] WHY THIS HAPPENED:', Colors.CYAN)}")
        print("   Python could not parse your code. Check for missing colons (:),")
        print("   unclosed quotes, unmatched parentheses (), or improper indentation.")
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
            if isinstance(args, tuple):
                result = func(*args)
            else:
                result = func(args)
            
            is_match = False
            if isinstance(expected, float) and isinstance(result, (int, float)):
                is_match = abs(result - expected) < 0.01
            else:
                is_match = (result == expected)
            
            if is_match:
                print(f"  [Test {idx}/{total_tests}] {color('[PASS]', Colors.GREEN)} : {test_desc}")
                passed_count += 1
            else:
                print(f"  [Test {idx}/{total_tests}] {color('[FAIL]', Colors.RED)} : {test_desc}")
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
            print(f"  [Test {idx}/{total_tests}] {color('[CRASH]', Colors.RED)} : {test_desc}")
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
# DRILLS ALIGNED WITH PROF. JADE CAO (CCCC) & GADDIS
# ==============================================================================

def rep_mod1_clean_name():
    """Module 1: Strings, Transformations & f-strings"""
    first_names = ["alex", "jordan", "maya", "taylor", "sam", "chris"]
    last_names = ["smith", "johnson", "williams", "brown", "davis"]
    fn = random.choice(first_names)
    ln = random.choice(last_names)
    raw = f"   {fn}   {ln}   "
    expected = f"{fn.title()} {ln.title()}"

    starter = f