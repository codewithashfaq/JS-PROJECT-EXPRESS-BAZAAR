/* ============================================
   EXPRESS BAZAAR — addToCart.js
   PURPOSE: Handle the "Add to Cart" button
            click on the Products page.
   
   FLOW:
   1. Check if user is logged in.
   2. If NOT logged in → redirect to sign-in.
   3. If logged in:
      a. Read current cart from localStorage.
      b. Check if this product is already in cart.
      c. If yes → increase its quantity.
      d. If no  → add it as a new cart item.
      e. Save the updated cart.
      f. Update the cart badge in the navbar.
      g. Show a success toast notification.
============================================ */

import { getUserCart, saveUserCart } from "./getCartProducts";
import { showToast } from "./showToast";
import { updateCartValue } from "./updateCartValue";
import { getCurrentUser } from "./auth.js";

/* ─── INIT: Update cart badge on page load ──────
   PURPOSE: When the Products page loads, immediately
   show the correct cart count in the navbar badge.
   We do this in DOMContentLoaded to ensure the
   #cartValue element exists in the DOM before
   we try to update it.
─────────────────────────────────────────────── */
document.addEventListener("DOMContentLoaded", () => {
  // Read this user's current cart and update the navbar badge immediately.
  // This ensures the cart icon shows the right count from the moment
  // the page is ready — no waiting, no flicker.
  updateCartValue(getUserCart());
});

/* ─── addToCart() ───────────────────────────────
   PURPOSE: Add a product to the current user's
            cart (or increase its quantity if
            it's already there).
   
   PARAMETER: productID — the unique ID of the
              product the user wants to add.
              We use this to find the product
              card element in the DOM.
─────────────────────────────────────────────── */
export const addToCart = (productID) => {
  // ─── STEP 1: Check if a user is logged in ─────────────────────────────
  const currentUser = getCurrentUser();

  if (!currentUser) {
    // Nobody is logged in → redirect to sign-in.
    // We use a tiny timeout (100ms) so the redirect feels intentional,
    // not like an instant crash. The user barely notices the delay.
    setTimeout(() => {
      window.location.href = "signIn.html";
    }, 100);
    return; // Stop the rest of this function from running.
  }

  // ─── STEP 2: Get the current cart ─────────────────────────────────────
  // getUserCart() reads this user's cart array from localStorage.
  const userCartProducts = getUserCart();

  // ─── STEP 3: Find the product card element on the page ────────────────
  // Each product card in the DOM has a unique id like "card5" or "card12".
  // The productID matches the number. We use a template literal to build
  // the selector string dynamically.
  // Example: productID = 3 → looks for element with id="card3"
  const currentCardElement = document.querySelector(`#card${productID}`);

  // GUARD CLAUSE: If the card element doesn't exist, stop to avoid a crash.
  if (!currentCardElement) return;

  // ─── STEP 4: Read the quantity the user selected ──────────────────────
  // The user can choose quantity using +/- buttons before clicking "Add to Cart".
  // We read the quantity text from the DOM and convert it to a Number.
  // (DOM text is always a string — Number() converts "2" → 2)
  let quantity = Number(
    currentCardElement.querySelector(".productQuantity").innerText,
  );

  // ─── STEP 5: Read the unit price of this product ──────────────────────
  // The price is shown as "₹1299" — we strip the "₹" symbol and convert to Number.
  // .replace("₹", "") removes the rupee symbol to get "1299"
  // Number("1299") converts the string to the number 1299
  let unitPrice = Number(
    currentCardElement
      .querySelector(".productPrice")
      .innerText.replace("₹", ""),
  );

  // ─── STEP 6: Calculate the total price for this add operation ─────────
  // If user selected quantity 3 and unit price is ₹500, total = ₹1500.
  let price = unitPrice * quantity;

  // ─── STEP 7: Check if this product is already in the cart ─────────────
  // .find() searches the cart array for an item with a matching productID.
  // Returns the found object, or undefined if not found.
  let existingProduct = userCartProducts.find(
    (prod) => prod.productID === productID,
  );

  if (existingProduct) {
    // ✅ Product already in cart — ADD to its existing quantity and price.
    // We don't replace; we add on top of what's already there.
    existingProduct.quantity += quantity;
    existingProduct.price += price;
  } else {
    // ✅ Product is NOT in cart — create a new entry and push to the array.
    // We create a new object with the three required properties.
    let newProduct = { productID, quantity, price };
    // "productID" is shorthand for "productID: productID" — modern JS feature.
    userCartProducts.push(newProduct);
  }

  // ─── STEP 8: Save the updated cart back to localStorage ───────────────
  saveUserCart(userCartProducts);

  // ─── STEP 9: Update the cart badge in the navbar ──────────────────────
  // Pass the updated cart array so the badge shows the new total quantity.
  updateCartValue(userCartProducts);

  // ─── STEP 10: Show a success toast notification ───────────────────────
  // "add" tells showToast what type of message to show.
  // productID is passed so the toast can mention the specific product (if needed).
  showToast("add", productID);
};
