## Express Bazaar 🛒 | E-commerce Website (Vanilla JavaScript)

---

## Overview

Express Bazaar is a **fully functional E-commerce Website** built with **Vanilla JavaScript, HTML5, and CSS3**.  
The project demonstrates **core front-end development concepts** such as DOM manipulation, event handling, modular JavaScript, and localStorage for cart persistence — all without frameworks.

---

## Features

- Dynamic product rendering from templates
- Interactive add-to-cart functionality
- Quantity increment / decrement with stock validation
- Persistent cart using localStorage
- Cart total & subtotal calculation
- Removal of products from cart
- Responsive, mobile-friendly layout
- Built using **Vite** for bundling and dev
  server

---

## How to Use Express Bazaar

1️ **Homepage (index.html)**

- Shows all available products dynamically rendered from JS.
- Each product card displays **name, brand, category, image, price, stock info**.
- Quantity increment/decrement buttons available.
- "Add to Cart" button saves product details into localStorage.

2️ **Quantity Control**

- Use ➕ / ➖ buttons on product cards.
- Quantity cannot exceed available stock or go below 1.
- Updates happen in real-time before adding to cart.

3️ **Cart Value (Header Icon)**

- Cart icon on the navbar always shows the **current total number of items** in cart.
- Updates automatically whenever cart changes.

4️ **Cart Page (addToCart.html)**

- Displays all items added to cart with **image, category, quantity, price**.
- Allows increment/decrement directly from the cart page.
- “Remove” button deletes the product from cart and updates localStorage.

5️ **Price Calculation**

- Subtotal and Final Total update dynamically using `reduce()`.
- Prices are stored & updated in sessionStorage/localStorage so that **refresh karne par bhi values lost nahi hoti**.

6️ **Checkout Simulation**

- Final total shown at the bottom of cart page.
- (This can later be integrated with Payment Gateway APIs if needed).

---

## Author

**Ashfaq Khan** — Frontend Developer
# trigger rebuild
