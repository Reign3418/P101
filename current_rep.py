def calculate_bill(subtotal, tax_rate_pct, tip_rate_pct):
    tax = subtotal * (tax_rate_pct / 100.0)
    tip = subtotal * (tip_rate_pct / 100.0)
    return round(subtotal + tax + tip, 2)