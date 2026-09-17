# ==============================================================================
# Starting Out with Python (6th Edition) - Tony Gaddis
# MODULE 5: Functions & Modular Programming (Chapter 5)
# ==============================================================================
# Open this file in IDLE and press F5 to run!
# ==============================================================================

import random
import math
import geometry_helpers  # Our custom module from Section 5.10!

# ------------------------------------------------------------------------------
# 5.6: GLOBAL CONSTANTS (Safe to use everywhere)
# ------------------------------------------------------------------------------
STATE_TAX_RATE = 0.06
COMPANY_NAME = "Apex Solutions Inc."

# ------------------------------------------------------------------------------
# 5.2 & 5.5: VOID FUNCTIONS & PASSING ARGUMENTS
# ------------------------------------------------------------------------------
def show_banner(title):
    """Displays a formatted banner. 'title' is a parameter."""
    print("\n" + "=" * 65)
    print(f" {title.upper()} ")
    print("=" * 65)

def display_employee_card(name, hourly_rate, hours_worked=40):
    """
    Demonstrates parameters, local scope, and default keyword arguments.
    """
    # Local variable
    gross = hourly_rate * hours_worked
    tax = gross * STATE_TAX_RATE
    net = gross - tax
    
    print(f"Employee:     {name}")
    print(f"Hours Worked: {hours_worked} hrs @ ${hourly_rate:.2f}/hr")
    print(f"Gross Pay:    ${gross:,.2f}")
    print(f"State Tax:    ${tax:,.2f} ({STATE_TAX_RATE:.1%})")
    print(f"Net Pay:      ${net:,.2f}")


# ------------------------------------------------------------------------------
# 5.8: VALUE-RETURNING FUNCTIONS & RETURNING MULTIPLE VALUES
# ------------------------------------------------------------------------------
def calculate_cylinder_volume(radius, height):
    """Calculates and returns the volume of a cylinder: V = pi * r^2 * h"""
    base_area = geometry_helpers.circle_area(radius)
    volume = base_area * height
    return volume

def get_min_and_max(num1, num2, num3):
    """Returns two values simultaneously (tuple unpacking)."""
    smallest = min(num1, num2, num3)
    largest = max(num1, num2, num3)
    return smallest, largest


# ------------------------------------------------------------------------------
# 5.2: MAIN FUNCTION DESIGN PATTERN
# ------------------------------------------------------------------------------
def main():
    show_banner("Module 5: Functions, Scope & Modules")
    print(f"Welcome to {COMPANY_NAME}")
    
    # 1. Calling void functions with positional and keyword arguments
    print("\n--- 5.5: POSITIONAL VS. KEYWORD ARGUMENTS ---")
    display_employee_card("Alice Walker", 35.50, 42)  # Positional arguments
    print()
    display_employee_card(name="Bob Smith", hourly_rate=28.00)  # Keyword arguments & default

    # 2. Generating random numbers (5.7)
    print("\n--- 5.7: THE random MODULE ---")
    die1 = random.randint(1, 6)
    die2 = random.randint(1, 6)
    random_pct = random.random()  # Float between 0.0 and 1.0
    print(f"Rolling two 6-sided dice: [{die1}] and [{die2}] -> Total: {die1 + die2}")
    print(f"Random float probability: {random_pct:.4f}")

    # 3. Using the math module (5.9)
    print("\n--- 5.9: THE math MODULE ---")
    side_a = 3.0
    side_b = 4.0
    hypotenuse = math.sqrt(side_a**2 + side_b**2)
    print(f"Right triangle with legs {side_a} & {side_b} has hypotenuse: {hypotenuse}")
    print(f"Value of Pi: {math.pi:.6f}, Square root of 144: {math.sqrt(144)}")

    # 4. Using our custom module (5.10)
    print("\n--- 5.10: USING CUSTOM MODULE (geometry_helpers.py) ---")
    radius = 5.0
    area = geometry_helpers.circle_area(radius)
    circumference = geometry_helpers.circle_circumference(radius)
    print(f"Circle with radius {radius}:")
    print(f"  Area:          {area:.2f}")
    print(f"  Circumference: {circumference:.2f}")

    # 5. Returning multiple values (5.8)
    print("\n--- 5.8: RETURNING MULTIPLE VALUES ---")
    low, high = get_min_and_max(18, 42, 7)
    print(f"Numbers (18, 42, 7) -> Min: {low}, Max: {high}")

    show_banner("Module 5 Complete!")

# Call the main function to start program execution
if __name__ == "__main__":
    main()
