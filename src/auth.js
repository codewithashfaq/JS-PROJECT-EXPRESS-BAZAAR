import { getUserCart } from "./getCartProducts.js";
import { showToast } from "./showToast.js";
import { updateCartValue } from "./updateCartValue.js";

/* ===========================
   HELPER FUNCTIONS
=========================== */

// Get users from localStorage safely
function getUsers() {
  return JSON.parse(localStorage.getItem("users")) || [];
}

// Save users to localStorage
function saveUsers(users) {
  localStorage.setItem("users", JSON.stringify(users));
}

// Get current logged-in user
export function getCurrentUser() {
  return JSON.parse(localStorage.getItem("currentUser")) || null;
}

// Save current user session
function setCurrentUser(user) {
  localStorage.setItem("currentUser", JSON.stringify(user));
}

// Remove current user session
function removeCurrentUser() {
  localStorage.removeItem("currentUser");
}

/* ===========================
   SIGNUP LOGIC
=========================== */
export function handleSignup() {
  const signupForm = document.getElementById("signupForm");
  if (!signupForm) return;

  signupForm.addEventListener("submit", (e) => {
    e.preventDefault();

    const username = document.getElementById("username").value.trim();
    const email = document.getElementById("email").value.trim();
    const password = document.getElementById("password").value;

    let users = getUsers();

    // Prevent duplicate email registration
    if (users.find((user) => user.email === email)) {
      showToast("error", null, "Email already registered!");
      return;
    }

    users.push({ username, email, password });
    saveUsers(users);

    showToast("success", null, "Signup successful! Please login.");
    signupForm.reset();

    // Redirect to login page after signup
    setTimeout(() => {
      window.location.href = "signIn.html";
    }, 2000);
  });
}

/* ===========================
   LOGIN LOGIC
=========================== */
export function handleLogin() {
  const loginForm = document.getElementById("loginForm");
  if (!loginForm) return;

  loginForm.addEventListener("submit", (e) => {
    e.preventDefault();

    const email = document.getElementById("loginEmail").value.trim();
    const password = document.getElementById("loginPassword").value;

    let users = getUsers();
    const user = users.find(
      (u) => u.email === email && u.password === password
    );

    if (user) {
      setCurrentUser(user);
      localStorage.setItem(
        "loginToast",
        `Hi ${user.username}, Welcome to Express Bazaar!`
      );
      loginForm.reset();
      updateCartValue(getUserCart());

      // Redirect to home page after successful login
      window.location.href = "index.html";
    } else {
      showToast("error", null, "Invalid email or password!");
    }
  });
}

/* ===========================
   SESSION MANAGEMENT
=========================== */
export function handleSession() {
  const currentUser = getCurrentUser();
  const welcomeUser = document.getElementById("welcomeUser");
  const logoutBtn = document.getElementById("logoutBtn");
  const signInLink = document.getElementById("signInLink");
  const signUpLink = document.getElementById("signUpLink");

  if (currentUser) {
    if (welcomeUser) {
      welcomeUser.textContent = `${currentUser.username}`;
      welcomeUser.style.display = "inline";
    }
    if (logoutBtn) logoutBtn.style.display = "inline-block";
    if (signInLink) signInLink.style.display = "none";
    if (signUpLink) signUpLink.style.display = "none";
  } else {
    if (welcomeUser) welcomeUser.style.display = "none";
    if (logoutBtn) logoutBtn.style.display = "none";
    if (signInLink) signInLink.style.display = "inline";
    if (signUpLink) signUpLink.style.display = "inline";
  }

  // Attach logout click
  if (logoutBtn) {
    logoutBtn.addEventListener("click", () => {
      localStorage.setItem("logoutToast", "You have been logged out.");

      updateCartValue([]);
      removeCurrentUser();

      // redirect immediately
      window.location.href = "signIn.html";
    });
  }
}

/* ===========================
   AUTO PAGE DETECTION
=========================== */
document.addEventListener("DOMContentLoaded", () => {
  if (window.location.pathname.endsWith("signIn.html")) {
    const msg = localStorage.getItem("logoutToast");
    if (msg) {
      showToast("info", null, msg);
      setTimeout(() => localStorage.removeItem("logoutToast"), 700);
    }
  }

  if (window.location.pathname.endsWith("index.html")) {
    const msg = localStorage.getItem("loginToast");
    if (msg) {
      showToast("success", null, msg);
      setTimeout(() => localStorage.removeItem("loginToast"), 700);
    }
  }

  if (document.getElementById("signupForm")) {
    handleSignup();
  } else if (document.getElementById("loginForm")) {
    handleLogin();
  } else {
    handleSession();
  }
});
