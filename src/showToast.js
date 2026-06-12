export const showToast = (operation, productID = null, message = null) => {
  const toast = document.createElement("div");
  toast.classList.add("toast");

  /* Set dynamic class and message based on operation */
  if (operation === "success") {
    toast.classList.add("toast-success");
    toast.textContent = message || `Action completed successfully`;
  } else if (operation === "error") {
    toast.classList.add("toast-error");
    toast.textContent = message || `Something went wrong!`;
  } else if (operation === "info") {
    toast.classList.add("toast-info");
    toast.textContent = message || `Information`;
  } else if (operation === "add") {
    toast.classList.add("toast-success");
    toast.textContent = `Product #${productID} added to your cart`;
  } else if (operation === "delete") {
    toast.classList.add("toast-error");
    toast.textContent = `Product #${productID} removed from your cart`;
  } else if (operation === "checkout") {
    toast.classList.add("toast-success");
    toast.textContent = `Order placed successfully! 🎉`;
  } else {
    // fallback case
    toast.textContent = message || `Action completed`;
  }

  // Append toast to body
  document.body.appendChild(toast);

  console.log("[Toast]", toast.textContent);

  // Small delay to trigger fade-in animation
  setTimeout(() => {
    toast.classList.add("show");
  }, 100);

  // Auto-remove toast after 2.5 seconds with fade-out
  setTimeout(() => {
    toast.classList.remove("show");
    setTimeout(() => toast.remove(), 700);
  }, 2500);
};
