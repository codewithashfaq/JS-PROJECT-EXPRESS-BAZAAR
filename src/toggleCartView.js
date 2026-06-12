/* ============================================
   EXPRESS BAZAAR — toggleCartView.js
   PURPOSE: Show or hide the correct view on
            the Cart page (addToCart.html).
   
   TWO POSSIBLE VIEWS:
   ─────────────────────────────────────────
   1. EMPTY CART VIEW: Shown when cart has 0 items.
      Displays a friendly "Your cart is empty" message.
   
   2. CART ITEMS VIEW: Shown when cart has items.
      Displays the list of products + order summary.
   
   We toggle between these two using the CSS
   class "hidden" which sets display: none !important.
============================================ */

import { getUserCart } from "./getCartProducts";

/**
 * toggleCartView()
 * PURPOSE: Check how many items are in the cart and
 *          show the appropriate view on the cart page.
 *
 * HOW IT WORKS:
 *   - Get the cart items from localStorage.
 *   - If cart is EMPTY  → show empty message, hide cart layout.
 *   - If cart has ITEMS → hide empty message, show cart layout.
 */
export const toggleCartView = () => {
  // ─── STEP 1: Get this user's current cart ─────────────────────────────
  const userCartProducts = getUserCart();

  // ─── STEP 2: Find the DOM elements we need to toggle ──────────────────

  // The "empty cart" message block (shown when nothing is in the cart).
  const emptyCartMessage = document.getElementById("emptyCartMessage");

  // The main cart layout (the grid with items + order summary).
  const cartPage = document.querySelector(".cart-page");

  // The order summary panel (right side of the cart page).
  const cartSummary = document.querySelector(".cart-summary");

  // The list of cart items (left side of the cart page).
  const cartItems = document.querySelector(".cart-items");

  // ─── GUARD CLAUSE ──────────────────────────────────────────────────────
  // If any of these critical elements don't exist, we're probably NOT on
  // the cart page. Exit safely without causing errors.
  if (!emptyCartMessage || !cartPage || !cartSummary || !cartItems) return;

  // ─── STEP 3: Show/hide views based on cart contents ───────────────────
  if (userCartProducts.length === 0) {
    // Cart is EMPTY:
    // - Remove "hidden" from the empty message so it becomes visible.
    // - Add "hidden" to the cart layout so it disappears.
    emptyCartMessage.classList.remove("hidden");
    cartPage.classList.add("hidden");
  } else {
    // Cart has ITEMS:
    // - Hide the empty message.
    // - Show the cart layout with items.
    emptyCartMessage.classList.add("hidden");
    cartPage.classList.remove("hidden");
  }
};
