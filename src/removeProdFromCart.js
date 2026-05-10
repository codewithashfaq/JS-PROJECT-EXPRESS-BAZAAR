import { getUserCart, saveUserCart } from "./getCartProducts";
import { showToast } from "./showToast";
import { toggleCartView } from "./toggleCartView";
import { updateCartTotalPrice } from "./updateCartTotalPrice";
import { updateCartValue } from "./updateCartValue";
import { updateHRs } from "./updateHorizontalBreak";

export const removeProdFromCart = (productID) => {
  // Step 1: Get all products from LocalStorage
  // let userCartProducts = getCartProductFromLS();
  const userCartProducts = getUserCart();
  console.log(`🛒 Current cart count: ${userCartProducts.length}`);

  // Step 2: Remove the product with given productID
  let remainingCartProd = userCartProducts.filter(
    (prod) => prod.productID !== productID
  );

  console.log("Remaining: ", remainingCartProd);

  // Step 3: Update LocalStorage with new product list
  // localStorage.setItem("cartProductLS", JSON.stringify(remainingCartProd));
  saveUserCart(remainingCartProd);
  console.log(
    `Removed product with productID: ${productID}, New cart count: ${remainingCartProd.length}`
  );

  // Step 4: Remove product card from DOM if exists
  let removeDiv = document.getElementById(`card${productID}`);
  const cartContainer = document.querySelector("#productCartContainer");
  if (removeDiv) {
    removeDiv.remove();

    //HR refresh
    updateHRs(cartContainer);
    // Toast: Now show a professional toast
    showToast("delete", productID);
  }

  // Step 5: Update cart value in navbar
  updateCartValue(remainingCartProd);

  // Step 6: Update cart total price in cart
  updateCartTotalPrice();
  toggleCartView();
};
