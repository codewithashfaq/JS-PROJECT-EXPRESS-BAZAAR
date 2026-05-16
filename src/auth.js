/* ============================================
   EXPRESS BAZAAR — auth.js
   Purpose: User signup, login, logout, and
            session management (who is logged in?)
   
   HOW THE NO-FLICKER TRICK WORKS:
   ─────────────────────────────────────────────
   The browser loads HTML top-to-bottom.
   If we wait for DOMContentLoaded to add the
   "logged-in" class to <html>, there is a brief
   moment where the page shows the LOGGED-OUT
   state (Sign In / Sign Up buttons visible),
   and then it flips to the LOGGED-IN state.
   That brief flip = the "flicker".
   
   The FIX: We put a tiny <script> tag in the
   <head> of EVERY HTML file that runs BEFORE
   the page renders. It checks localStorage
   instantly and adds the "logged-in" class
   right away. CSS then hides/shows buttons
   based on that class — no flip, no flicker!
   
   This file handles the REST of session logic
   (setting the username text, logout button).
============================================ */

/* ─── IMPORTS ─────────────────────────────────
   We pull in helper functions from other files.
   The "import" keyword brings in code that was
   "export"ed from another JS module file.
   Think of it like borrowing a tool from a
   toolbox kept in another room.
─────────────────────────────────────────────── */
import { getUserCart } from "./getCartProducts.js";
import { showToast } from "./showToast.js";
import { updateCartValue } from "./updateCartValue.js";

/* ============================================
   SECTION 1: HELPER FUNCTIONS
   These are small reusable utility functions
   that handle reading/writing data to
   localStorage. localStorage is like a small
   notepad the browser keeps per website —
   data stays even after refreshing the page.
============================================ */

/**
 * getUsers()
 * PURPOSE: Fetch the list of ALL registered users from localStorage.
 * LOGIC:   localStorage only stores plain text (strings), so JSON.parse()
 *          converts the saved text back into a JavaScript array.
 *          If nothing is saved yet, we return an empty array [] instead
 *          of null/undefined — this prevents crashes later.
 */
function getUsers() {
  return JSON.parse(localStorage.getItem("users")) || [];
  //                                                   ↑
  //          The "|| []" means: "if the result is null or empty, use [] instead"
}

/**
 * saveUsers()
 * PURPOSE: Save the updated list of users back to localStorage.
 * LOGIC:   JSON.stringify() converts our JavaScript array into a plain text
 *          string because localStorage can ONLY store strings, not objects.
 */
function saveUsers(users) {
  localStorage.setItem("users", JSON.stringify(users));
}

/**
 * getCurrentUser()
 * PURPOSE: Get the currently logged-in user's data.
 * WHY EXPORT: Other files (like addToCart.js) need to know who is logged in,
 *             so we "export" this function to make it available project-wide.
 * LOGIC:  Same pattern — parse the stored string back into an object.
 *         Returns null if nobody is logged in.
 */
export function getCurrentUser() {
  return JSON.parse(localStorage.getItem("currentUser")) || null;
}

/**
 * setCurrentUser()
 * PURPOSE: Save the logged-in user's data to localStorage (starts a session).
 * LOGIC:   We store the whole user object so we can read their name, email, etc.
 *          later from any page.
 */
function setCurrentUser(user) {
  localStorage.setItem("currentUser", JSON.stringify(user));
}

/**
 * removeCurrentUser()
 * PURPOSE: Delete the current user's session data (used on logout).
 * LOGIC:   removeItem() completely deletes the key from localStorage.
 *          After this, getCurrentUser() will return null.
 */
function removeCurrentUser() {
  localStorage.removeItem("currentUser");
}

/* ============================================
   SECTION 2: SIGNUP LOGIC
   Handles the Sign Up form on signUp.html
============================================ */

/**
 * handleSignup()
 * PURPOSE: Listen for the signup form submission and register a new user.
 * LOGIC:
 *   1. Find the form element on the page.
 *   2. If it doesn't exist (we're not on signUp.html), stop immediately.
 *   3. When the form is submitted, prevent the default browser behavior
 *      (which would reload the page — we want to handle it ourselves).
 *   4. Check if the email is already registered.
 *   5. If not, save the new user and redirect to Sign In.
 */
export function handleSignup() {
  // Look for the signup form. If we're not on signUp.html, this will be null.
  const signupForm = document.getElementById("signupForm");

  // GUARD CLAUSE: If the form doesn't exist on this page, exit the function.
  // This prevents errors when this function runs on other pages (like index.html).
  if (!signupForm) return;

  // Listen for the "submit" event — fires when user clicks the Sign Up button.
  signupForm.addEventListener("submit", (e) => {
    // Prevent the browser from doing its default action (page reload/redirect).
    e.preventDefault();

    // Read what the user typed in each input field.
    // .trim() removes any accidental spaces from the beginning or end.
    const username = document.getElementById("username").value.trim();
    const email = document.getElementById("email").value.trim();
    const password = document.getElementById("password").value;
    // Note: We do NOT trim password — spaces in passwords should be allowed.

    // Get the current list of all registered users from localStorage.
    let users = getUsers();

    // CHECK: Has someone already signed up with this email?
    // .find() searches the array and returns the first match, or undefined.
    if (users.find((user) => user.email === email)) {
      // Show a red error toast message — email is already taken.
      showToast("error", null, "Email already registered!");
      return; // Stop here, do not register again.
    }

    // Email is unique — add the new user to our users list.
    users.push({ username, email, password });

    // Save the updated users list back to localStorage.
    saveUsers(users);

    // Show a green success toast message.
    showToast("success", null, "Signup successful! Please login.");

    // Clear the form fields so they're empty again.
    signupForm.reset();

    // Wait 2 seconds (2000 milliseconds) so the user can read the toast,
    // then redirect them to the Sign In page.
    setTimeout(() => {
      window.location.href = "signIn.html";
    }, 2000);
  });
}

/* ============================================
   SECTION 3: LOGIN LOGIC
   Handles the Sign In form on signIn.html
============================================ */

/**
 * handleLogin()
 * PURPOSE: Listen for the login form submission and authenticate the user.
 * LOGIC:
 *   1. Find the login form on the page.
 *   2. If it doesn't exist, stop immediately (guard clause).
 *   3. On submit, check if the email + password match a stored user.
 *   4. If yes, save the session and redirect home.
 *   5. If no, show an error toast.
 */
export function handleLogin() {
  const loginForm = document.getElementById("loginForm");

  // GUARD CLAUSE: Only run this on the sign-in page.
  if (!loginForm) return;

  loginForm.addEventListener("submit", (e) => {
    e.preventDefault();

    // Read the email and password the user typed.
    const email = document.getElementById("loginEmail").value.trim();
    const password = document.getElementById("loginPassword").value;

    // Get all registered users.
    let users = getUsers();

    // Try to find a user whose email AND password both match.
    // .find() returns the matching user object, or undefined if not found.
    const user = users.find(
      (u) => u.email === email && u.password === password,
    );

    if (user) {
      // ✅ Login successful!

      // Save this user as the "currently logged in" user.
      setCurrentUser(user);

      // Store a welcome message in localStorage.
      // We'll display this toast on the home page AFTER the redirect.
      // (We can't show it here because we're about to leave this page.)
      localStorage.setItem(
        "loginToast",
        `Hi ${user.username}, Welcome to Express Bazaar!`,
      );

      // Clear the form.
      loginForm.reset();

      // ✅ FIX: Update the cart badge BEFORE navigating away.
      // This ensures the cart count is correct on the landing page.
      updateCartValue(getUserCart());

      // Redirect to the home page.
      window.location.href = "index.html";
    } else {
      // ❌ Login failed — show an error toast.
      showToast("error", null, "Invalid email or password!");
    }
  });
}

/* ============================================
   SECTION 4: SESSION MANAGEMENT
   Runs on every page that has a navbar.
   PURPOSE: Set the welcome username text and
            wire up the logout button.
   
   IMPORTANT: This function does NOT control
   which buttons are VISIBLE. That is handled
   by the CSS + the inline <script> in <head>.
   This function ONLY sets the username text
   and attaches the logout click handler.
============================================ */

export function handleSession() {
  // Get the current logged-in user from localStorage.
  const currentUser = getCurrentUser();

  // Find the element that shows "Welcome, [Name]" in the top bar.
  const welcomeUser = document.querySelector(".welcomeUser");

  // Find the logout button.
  const logoutBtn = document.getElementById("logoutBtn");

  // ─── SET USERNAME TEXT ───────────────────────────────────────────────────
  // If someone is logged in AND the welcomeUser element exists on this page,
  // set its text to the user's name (with first letter capitalized).
  if (currentUser && welcomeUser) {
    // .charAt(0).toUpperCase() gets the first letter and makes it uppercase.
    // .slice(1) gets the rest of the username (from the 2nd character onward).
    // Combined: "ashfaq" → "Ashfaq"
    welcomeUser.textContent =
      currentUser.username.charAt(0).toUpperCase() +
      currentUser.username.slice(1);
  }

  // ─── LOGOUT BUTTON ───────────────────────────────────────────────────────
  // If the logout button exists on this page, attach a click handler.
  if (logoutBtn) {
    // We use .onclick instead of .addEventListener to avoid stacking up
    // multiple identical listeners if this function runs more than once.
    // .onclick replaces any existing handler — addEventListener would ADD to them.
    logoutBtn.onclick = () => {
      // Store a goodbye message to display on the sign-in page AFTER redirect.
      localStorage.setItem("logoutToast", "You have been logged out.");

      // ✅ FIX: Clear the cart display immediately on logout.
      // Passing an empty array [] makes the cart badge show 0 and hide itself.
      updateCartValue([]);

      // Delete the current user session from localStorage.
      removeCurrentUser();

      // Redirect to the sign-in page.
      window.location.href = "signIn.html";
    };
  }
}

/* ============================================
   SECTION 5: AUTO PAGE DETECTION
   This runs automatically when the page is
   fully loaded. It figures out which page
   we're on and calls the right function.
============================================ */

document.addEventListener("DOMContentLoaded", () => {
  // ─── TOAST ON SIGN-IN PAGE ───────────────────────────────────────────────
  // When user logs out, they land on signIn.html.
  // We stored a logout message in localStorage — display it now and clear it.
  if (window.location.pathname.endsWith("signIn.html")) {
    const msg = localStorage.getItem("logoutToast");
    if (msg) {
      showToast("info", null, msg);
      // Remove the stored message after a short delay so it only shows once.
      setTimeout(() => localStorage.removeItem("logoutToast"), 700);
    }
  }

  // ─── TOAST ON HOME PAGE ──────────────────────────────────────────────────
  // When user logs in, they land on index.html.
  // We stored a login welcome message — display it now and clear it.
  if (
    window.location.pathname.endsWith("index.html") ||
    window.location.pathname === "/" ||
    window.location.pathname.endsWith("/")
  ) {
    // ✅ FIX: Also handle root "/" path for when index.html is the default page.
    const msg = localStorage.getItem("loginToast");
    if (msg) {
      showToast("success", null, msg);
      setTimeout(() => localStorage.removeItem("loginToast"), 700);
    }
  }

  // ─── DETECT WHICH PAGE WE'RE ON & CALL THE RIGHT FUNCTION ───────────────
  // We check for the presence of specific form elements to know which page
  // we're on. This is a simple, effective approach for a project this size.

  if (document.getElementById("signupForm")) {
    // We found the signup form → we're on signUp.html
    handleSignup();
  } else if (document.getElementById("loginForm")) {
    // We found the login form → we're on signIn.html
    handleLogin();
  } else {
    // No form found → we're on a regular page (index, products, about, etc.)
    // Run session management to set the username and logout button.
    handleSession();
  }
});
