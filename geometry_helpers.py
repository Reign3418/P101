# ==============================================================================
# Starting Out with Python (6th Edition) - Tony Gaddis
# Section 5.10: Storing Functions in Custom Modules
# Module Name: geometry_helpers.py
# ==============================================================================
# This is a custom module containing reusable math and geometry functions.
# It is imported by module5_functions_mastery.py using:
#     import geometry_helpers
# ==============================================================================

import math

# Global Constant
PI = math.pi

def circle_area(radius):
    """Calculates and returns the area of a circle: A = pi * r^2"""
    return PI * (radius ** 2)

def circle_circumference(radius):
    """Calculates and returns the circumference of a circle: C = 2 * pi * r"""
    return 2 * PI * radius

def rectangle_area(width, length):
    """Calculates and returns the area of a rectangle: A = w * l"""
    return width * length

def rectangle_perimeter(width, length):
    """Calculates and returns the perimeter of a rectangle: P = 2 * (w + l)"""
    return 2 * (width + length)
