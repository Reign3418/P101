# ==============================================================================
# Starting Out with Python (6th Edition) - Tony Gaddis
# THE "WHY" WORKBENCH (Chapters 1 through 3.2)
# ==============================================================================
# Open this file in IDLE and press F5 to run!
# ==============================================================================

print("=" * 60)
print("WELCOME TO THE PYTHON 'WHY' WORKBENCH")
print("Exploring Chapters 1, 2, and 3.1-3.2")
print("=" * 60)

# ------------------------------------------------------------------------------
# 1. WHY DATA TYPES MATTER (Section 2.5 & 2.6)
# ------------------------------------------------------------------------------
print("\n--- EXPERIMENT 1: WHY DATA TYPES MATTER ---")
print("The input() function ALWAYS returns text (a string).")
print("Watch what happens when we add text vs. adding numbers:")

val1 = input("Enter first number (e.g. 5): ")
val2 = input("Enter second number (e.g. 5): ")

# Without conversion: String Concatenation (+)
text_result = val1 + val2
print(f"\n1. Without int():  '{val1}' + '{val2}' = '{text_result}' (Text glued together)")

# With conversion: Mathematical Addition (+)
num1 = int(val1)
num2 = int(val2)
math_result = num1 + num2
print(f"2. With int():     {num1} + {num2} = {math_result} (Math calculation)")


# ------------------------------------------------------------------------------
# 2. WHY WE HAVE // AND % (Section 2.7)
# ------------------------------------------------------------------------------
print("\n" + "=" * 60)
print("--- EXPERIMENT 2: WHY WE NEED // (INTEGER DIVISION) AND % (REMAINDER) ---")
print("Problem: Convert a large number of seconds into minutes and leftover seconds.")

total_seconds = int(input("Enter total seconds to convert (e.g. 135): "))

# Regular float division:
decimal_minutes = total_seconds / 60
print(f"\n1. Float Division (total_seconds / 60):  {decimal_minutes:.2f} minutes")
print("   -> Why not just use this? Because nobody says 'meet in 2.25 minutes'!")

# Integer division and modulus:
whole_minutes = total_seconds // 60
leftover_seconds = total_seconds % 60
print(f"2. Integer Division (total_seconds // 60): {whole_minutes} whole minutes")
print(f"3. Modulus / Remainder (total_seconds % 60): {leftover_seconds} leftover seconds")
print(f"-> Human Result: {whole_minutes} minute(s) and {leftover_seconds} second(s)")

# Even vs Odd Check:
print(f"\nEven/Odd Test: {total_seconds} % 2 is {total_seconds % 2}")
if total_seconds % 2 == 0:
    print(f"-> {total_seconds} is EVEN (divided by 2 with 0 remainder).")
else:
    print(f"-> {total_seconds} is ODD (divided by 2 with 1 leftover).")


# ------------------------------------------------------------------------------
# 3. WHY '=' IS DIFFERENT FROM '==' (Section 2.5 & 3.1)
# ------------------------------------------------------------------------------
print("\n" + "=" * 60)
print("--- EXPERIMENT 3: WHY '=' (ASSIGNMENT) != '==' (EQUALITY) ---")

secret_number = 7
print(f"We stored 7 in memory: secret_number = {secret_number}")

guess = int(input("Guess the secret number: "))

# == checks equality and gives a Boolean value (True or False)
is_correct = (guess == secret_number)
print(f"Expression (guess == {secret_number}) evaluates to: {is_correct}")


# ------------------------------------------------------------------------------
# 4. WHY IF-ELSE FORKS THE CODE (Section 3.1 & 3.2)
# ------------------------------------------------------------------------------
print("\n" + "=" * 60)
print("--- EXPERIMENT 4: WHY IF-ELSE DECISION STRUCTURES WORK ---")
print("Without decision structures, computers could only follow one straight line.")
print("With if-else, the CPU picks exactly one path based on True or False.")

# Overtime Pay Calculator (Spotlight 3.2)
BASE_HOURS = 40.0
OT_MULTIPLIER = 1.5

hours = float(input("\nEnter hours worked this week (e.g. 45): "))
rate = float(input("Enter hourly pay rate (e.g. 20.00): "))

if hours > BASE_HOURS:
    print("\n[CPU took the TRUE branch: Overtime applies]")
    overtime_hours = hours - BASE_HOURS
    overtime_pay = overtime_hours * rate * OT_MULTIPLIER
    gross_pay = (BASE_HOURS * rate) + overtime_pay
    print(f"Regular pay:  ${BASE_HOURS * rate:,.2f}")
    print(f"Overtime pay: ${overtime_pay:,.2f} ({overtime_hours} hrs @ 1.5x)")
else:
    print("\n[CPU took the FALSE branch: Standard pay only]")
    gross_pay = hours * rate

print(f"Total Gross Pay: ${gross_pay:,.2f}")
print("\n" + "=" * 60)
print("Done! You have completed the 'Why' workbench!")
