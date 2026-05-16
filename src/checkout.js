import { saveUserCart } from "./getCartProducts";
import { showToast } from "./showToast";
import { updateCartValue } from "./updateCartValue";

export const handleCheckout = () => {
  const checkoutBtn = document.querySelector(".checkout-btn");
  if (!checkoutBtn) return;

  checkoutBtn.addEventListener("click", () => {
    saveUserCart([]);
    updateCartValue([]);

    showToast("checkout");

    setTimeout(() => {
      window.location.href = "/";
    }, 2500);
  });
};
