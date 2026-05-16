/* ============================================================
   EXPRESS BAZAAR — updateCartValue.js
   PURPOSE: Update the cart badge in the navbar with correct
            item count. Cart icon is ALWAYS visible.
   
   DESIGN PHILOSOPHY — "Always Visible, Never Flash":
   ──────────────────────────────────────────────────────────
   The cart icon NEVER hides. It always shows:
   → "0"  when cart is empty
   → "N"  when cart has N items
============================================================ */

/* ─── CACHE VARIABLE ─────────────────────────────────────────
   Stores the last known cart count.
   
   PURPOSE: If updateCartValue() is called multiple times
   with the same count (e.g., every nav click), we skip
   all DOM operations. Zero DOM writes = zero micro-flash.
   
   null  = function has never run yet
   0     = function ran, cart was empty
   N     = function ran, cart had N items
─────────────────────────────────────────────────────────────── */
let lastKnownCartCount = null;

/**
 * updateCartValue(cartProducts)
 *
 * PURPOSE : Read cart array → calculate total → update badge.
 * PARAM   : cartProducts — Array of { productID, quantity, price }
 *           Pass [] (empty array) to show "0".
 * RETURNS : Total quantity number (0 or more).
 */
export const updateCartValue = (cartProducts) => {
  /* ── GUARD: Exit if cart badge element doesn't exist ─────────
     Some pages (signIn.html, signUp.html) don't have a navbar
     with #cartValue. If the element isn't found, return 0
     immediately to avoid a crash. ──────────────────────────── */
  const cartValueEl = document.querySelector("#cartValue");
  if (!cartValueEl) return 0;

  /* ── CALCULATE TOTAL QUANTITY ─────────────────────────────────
     .reduce() iterates over every cart item and sums up
     the "quantity" property of each.
     
     Example:
     cart = [{quantity: 2, price: 500}, {quantity: 3, price: 300}]
     reduce → 0 + 2 + 3 = 5
     
     The ?. (optional chaining) prevents crash if cartProducts
     is accidentally null or undefined.
     
     The || 0 at the end gives 0 if the array is empty. ───────── */
  const cartTotalQty =
    cartProducts?.reduce((sum, item) => sum + (item.quantity || 1), 0) || 0;

  if (cartTotalQty === lastKnownCartCount) {
    return cartTotalQty;
  }

  /* Store new count in our cache memory */
  lastKnownCartCount = cartTotalQty;
  const countEl = cartValueEl.querySelector(".cart-count");
  if (countEl) {
    countEl.textContent = cartTotalQty;
    /* cartTotalQty is 0 → shows "0"
       cartTotalQty is 4 → shows "4"   */
  }
  cartValueEl.style.visibility = "visible";

  return cartTotalQty;
};
