import { getUserCart } from "./getCartProducts";

export const updateCartTotalPrice = () => {
  let cartSubTotal = document.querySelector(".productSubTotal");
  let cartFinalTotal = document.querySelector(".productFinalTotal");

  // Get cart products from localStorage
  // let userCartProducts = getCartProductFromLS();
  const userCartProducts = getUserCart();

  // Calculate subtotal (sum of product prices)
  let cartTotalPrice = userCartProducts.reduce(
    (acc, prod) => acc + prod.price,
    0
  );

  // Apply tax only if subtotal > 0
  let tax = cartTotalPrice > 0 ? 50 : 0;
  let finalTotal = cartTotalPrice + tax;

  // Logs (important values only)
  console.log(
    `Subtotal: ₹${cartTotalPrice.toFixed(
      2
    )}, Tax: ₹${tax}, Final: ₹${finalTotal.toFixed(2)}`
  );

  // Update DOM with values
  if (cartSubTotal) cartSubTotal.textContent = `₹${cartTotalPrice.toFixed(2)}`;
  if (cartFinalTotal) cartFinalTotal.textContent = `₹${finalTotal.toFixed(2)}`;
};
