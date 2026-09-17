# ==============================================================================
# Starting Out with Python (6th Edition) - Tony Gaddis
# MODULE 3 (Part 2): Advanced Decision Structures (Sections 3.3 - 3.8)
# ==============================================================================
# Open this file in IDLE and press F5 to run!
# ==============================================================================

print("=" * 65)
print("MODULE 3 (Part 2): ADVANCED DECISION STRUCTURES & BOOLEAN LOGIC")
print("=" * 65)

# ------------------------------------------------------------------------------
# 3.3: COMPARING STRINGS
# ------------------------------------------------------------------------------
print("\n--- 3.3: COMPARING STRINGS (ASCII / Alphabetical Order) ---")
name1 = "Mary"
name2 = "Mark"

print(f"Comparing '{name1}' and '{name2}':")
if name1 > name2:
    print(f"-> '{name1}' comes AFTER '{name2}' alphabetically because 'y' > 'k'.")
else:
    print(f"-> '{name1}' comes BEFORE '{name2}' alphabetically.")

# Case-sensitivity note:
print("\nCase Sensitivity in Python (Uppercase comes before lowercase in ASCII):")
print(f"'apple' == 'Apple' is {'apple' == 'Apple'}")
print(f"'Zebra' < 'apple' is {'Zebra' < 'apple'} (ASCII 'Z' is 90, 'a' is 97)")


# ------------------------------------------------------------------------------
# 3.4: NESTED DECISIONS & THE if-elif-else STATEMENT
# ------------------------------------------------------------------------------
print("\n" + "=" * 65)
print("--- 3.4: NESTED DECISIONS & if-elif-else (Grade Classifier) ---")

score = int(input("Enter a test score (0-100): "))

# Grade assignment using if-elif-else
if score >= 90:
    grade = 'A'
elif score >= 80:
    grade = 'B'
elif score >= 70:
    grade = 'C'
elif score >= 60:
    grade = 'D'
else:
    grade = 'F'

print(f"Your grade is: {grade}")


# ------------------------------------------------------------------------------
# 3.5: LOGICAL OPERATORS (and, or, not)
# ------------------------------------------------------------------------------
print("\n" + "=" * 65)
print("--- 3.5: LOGICAL OPERATORS (and, or, not) ---")

salary = float(input("Enter your annual salary (e.g. 45000): "))
years_on_job = int(input("Enter years on current job (e.g. 3): "))

# Using 'and' (Both conditions must be True)
if salary >= 30000.0 and years_on_job >= 2:
    print("-> LOAN APPROVED: You meet both salary and employment criteria!")
else:
    print("-> LOAN DENIED: You must earn at least $30k AND have 2+ years on the job.")

# Range checking with 'and'
temp = float(input("\nEnter current temperature in Fahrenheit: "))
if temp >= 65.0 and temp <= 75.0:
    print("-> The temperature is in the comfortable ideal range (65-75 F).")
else:
    print("-> The temperature is outside the ideal range.")


# ------------------------------------------------------------------------------
# 3.6: BOOLEAN VARIABLES (Flags)
# ------------------------------------------------------------------------------
print("\n" + "=" * 65)
print("--- 3.6: BOOLEAN VARIABLES (Flags) ---")

sales = float(input("Enter monthly sales: "))
sales_quota_met = False  # Initialize flag to False

if sales >= 50000.0:
    sales_quota_met = True

if sales_quota_met:
    print("-> Congratulations! Bonus has been unlocked.")
else:
    print("-> Keep pushing, quota not reached yet.")


# ------------------------------------------------------------------------------
# 3.7: CONDITIONAL EXPRESSIONS (Ternary Operator)
# ------------------------------------------------------------------------------
print("\n" + "=" * 65)
print("--- 3.7: CONDITIONAL EXPRESSIONS (x if condition else y) ---")

a = int(input("Enter number A: "))
b = int(input("Enter number B: "))

# One-line conditional expression to determine maximum
max_val = a if a > b else b
print(f"The larger number is: {max_val}")


# ------------------------------------------------------------------------------
# 3.8: ASSIGNMENT EXPRESSIONS (The Walrus Operator :=)
# ------------------------------------------------------------------------------
print("\n" + "=" * 65)
print("--- 3.8: WALRUS OPERATOR (:=) ---")
print("Assigns a value to a variable AS PART of an expression.")

# Assign length and test condition in a single statement
if (length := len(input("Enter a secret password: "))) < 8:
    print(f"-> Warning: Password is too short! Only {length} characters.")
else:
    print(f"-> Great! Password has {length} characters.")

print("\n" + "=" * 65)
print("Module 3 (Part 2) Complete!")
