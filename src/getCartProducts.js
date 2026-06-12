/* ============================================
   EXPRESS BAZAAR — getCartProducts.js
   PURPOSE: Read and write cart data for the
            CURRENTLY LOGGED-IN user from localStorage.
   
   WHY PER-USER CARTS?
   ────────────────────────────────────────────
   Instead of one shared cart for everyone,
   each user gets their OWN cart stored under
   a unique key like "cart_user@email.com".
   
   This means:
   - User A logs in → sees their own cart.
   - User B logs in → sees their own cart.
   - No cart data leaks between users!
============================================ */

/* ─── HELPER: Build a unique cart key ──────────
   PURPOSE: Create a localStorage key that is
   unique to each user based on their email.
   
   EXAMPLE:
     Email: "ashfaq@gmail.com"
     Key:   "cart_ashfaq@gmail.com"
   
   WHY: If we used the same key "cart" for
   everyone, User A's cart would overwrite
   User B's cart when they switch accounts.
─────────────────────────────────────────────── */
function getCartKey(userEmail) {
  // Template literals (backticks + ${}) let us embed variables in strings.
  // Result looks like: "cart_ashfaq@gmail.com"
  return `cart_${userEmail}`;
}

/* ─── getUserCart() ─────────────────────────────
   PURPOSE: Get the current user's cart items
            from localStorage.
   
   RETURNS: An array of cart item objects.
            Returns [] (empty array) if:
            - Nobody is logged in, OR
            - The user has no saved cart yet.
   
   WHY RETURN []: Returning an empty array instead
   of null prevents crashes in other code that
   expects to call .length or .forEach() on the result.
─────────────────────────────────────────────── */
export const getUserCart = () => {
  // Step 1: Check who is currently logged in.
  const currentUser = JSON.parse(localStorage.getItem("currentUser"));

  // GUARD CLAUSE: If nobody is logged in, return an empty cart.
  if (!currentUser) return [];

  // Step 2: Build this user's unique cart key using their email.
  // Step 3: Read and parse their cart from localStorage.
  //         If nothing is stored yet, || [] gives us an empty array.
  return JSON.parse(localStorage.getItem(getCartKey(currentUser.email))) || [];
};

/* ─── saveUserCart() ────────────────────────────
   PURPOSE: Save the updated cart items back to
            localStorage for the current user.
   
   PARAMETER: userCart — the array of cart items to save.
   
   WHY GUARD CLAUSE: If nobody is logged in,
   we should not try to save — there's no user
   key to save under. We exit silently.
─────────────────────────────────────────────── */
export const saveUserCart = (userCart) => {
  // Step 1: Check who is currently logged in.
  const currentUser = JSON.parse(localStorage.getItem("currentUser"));

  // GUARD CLAUSE: If nobody is logged in, do nothing and exit.
  if (!currentUser) return;

  // Step 2: Save the cart array as a JSON string under this user's unique key.
  // JSON.stringify() converts the array → plain text (localStorage requirement).
  localStorage.setItem(getCartKey(currentUser.email), JSON.stringify(userCart));
};
