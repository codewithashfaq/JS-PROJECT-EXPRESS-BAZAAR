import { getUserCart } from "./getCartProducts";

export const toggleCartView = () => {
  // const userCartProducts = getCartProductFromLS();
  const userCartProducts = getUserCart();

  const emptyCartMessage = document.getElementById("emptyCartMessage");
  const cartPage = document.querySelector(".cart-page");

  const cartSummary = document.querySelector(".cart-summary");
  const cartItems = document.querySelector(".cart-items");

  if (!emptyCartMessage || !cartSummary || !cartItems) return;

  if (userCartProducts.length === 0) {
    emptyCartMessage.classList.remove("hidden");
    cartPage.classList.add("hidden");
  } else {
    emptyCartMessage.classList.add("hidden");
    cartPage.classList.remove("hidden");
  }
};
