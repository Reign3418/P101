# ==============================================================================
# Starting Out with Python (6th Edition) - Tony Gaddis
# MODULE 4: Repetition Structures / Loops (Chapter 4)
# ==============================================================================
# Open this file in IDLE and press F5 to run!
# ==============================================================================

print("=" * 65)
print("MODULE 4: REPETITION STRUCTURES (LOOPS)")
print("=" * 65)

# ------------------------------------------------------------------------------
# 4.2: THE while LOOP (Condition-Controlled Loop)
# ------------------------------------------------------------------------------
print("\n--- 4.2: THE while LOOP (Condition-Controlled) ---")
print("Countdown simulation:")

count = 5
while count > 0:
    print(f"  T-minus {count}...")
    count -= 1  # Decrement loop control variable
print("  Blastoff! 🚀")


# ------------------------------------------------------------------------------
# 4.3: THE for LOOP WITH range() (Count-Controlled Loop)
# ------------------------------------------------------------------------------
print("\n" + "=" * 65)
print("--- 4.3: THE for LOOP & range() FUNCTION ---")

print("1. range(5) -> 0, 1, 2, 3, 4:")
for i in range(5):
    print(i, end=" ")
print()

print("\n2. range(1, 6) -> 1, 2, 3, 4, 5 (start, stop):")
for num in range(1, 6):
    print(num, end=" ")
print()

print("\n3. range(0, 21, 5) -> Step by 5s:")
for num in range(0, 21, 5):
    print(num, end=" ")
print()

print("\n4. Counting Backwards: range(10, 0, -2):")
for num in range(10, 0, -2):
    print(num, end=" ")
print()


# ------------------------------------------------------------------------------
# 4.4: CALCULATING A RUNNING TOTAL (Accumulator Variable)
# ------------------------------------------------------------------------------
print("\n" + "=" * 65)
print("--- 4.4: RUNNING TOTAL (Accumulator with +=) ---")

DAYS = 5
total_sales = 0.0  # Accumulator initialized to 0.0

print(f"Enter sales for {DAYS} days:")
for day in range(1, DAYS + 1):
    daily = float(input(f"  Day {day} sales: $"))
    total_sales += daily  # Augmented assignment operator

print(f"Total Weekly Sales: ${total_sales:,.2f}")
average_sales = total_sales / DAYS
print(f"Average Daily Sales: ${average_sales:,.2f}")


# ------------------------------------------------------------------------------
# 4.5: SENTINEL-CONTROLLED LOOPS
# ------------------------------------------------------------------------------
print("\n" + "=" * 65)
print("--- 4.5: SENTINEL-CONTROLLED LOOP (Enter -1 to Stop) ---")
print("Enter test scores to sum. When finished, enter -1 as the sentinel.")

total_score = 0.0
count_scores = 0

score = float(input("Enter first score (-1 to end): "))  # Priming read
while score != -1:
    total_score += score
    count_scores += 1
    score = float(input("Enter next score (-1 to end): "))

if count_scores > 0:
    print(f"Total: {total_score:.1f}, Average Score: {total_score / count_scores:.2f}")
else:
    print("No scores were entered.")


# ------------------------------------------------------------------------------
# 4.6: INPUT VALIDATION LOOPS ("Garbage In, Garbage Out")
# ------------------------------------------------------------------------------
print("\n" + "=" * 65)
print("--- 4.6: INPUT VALIDATION LOOP ---")

# Priming read
model_year = int(input("Enter vehicle model year (1900 to 2026): "))

# Validation loop rejects invalid data
while model_year < 1900 or model_year > 2026:
    print("  [ERROR] Invalid year. Vehicle year must be between 1900 and 2026.")
    model_year = int(input("  Please re-enter model year: "))

print(f"-> Vehicle year {model_year} recorded successfully.")


# ------------------------------------------------------------------------------
# 4.7: NESTED LOOPS (Loops Inside Loops)
# ------------------------------------------------------------------------------
print("\n" + "=" * 65)
print("--- 4.7: NESTED LOOPS (Multiplication Table Grid) ---")

for row in range(1, 6):
    for col in range(1, 6):
        print(f"{row * col:4}", end="")
    print()  # New line at end of each row


# ------------------------------------------------------------------------------
# 4.8: break, continue, AND else WITH LOOPS
# ------------------------------------------------------------------------------
print("\n" + "=" * 65)
print("--- 4.8: break, continue, and loop else ---")

print("Demonstrating 'continue' (skips odd numbers):")
for n in range(1, 7):
    if n % 2 != 0:
        continue  # Skip rest of loop body for odd numbers
    print(f"  Even number processed: {n}")

print("\nDemonstrating 'break' and 'else':")
target = 4
for n in range(1, 6):
    if n == target:
        print(f"  Found target {target}! Breaking out of loop.")
        break
else:
    print("  Target was not found.")

print("\n" + "=" * 65)
print("Module 4 Complete!")
