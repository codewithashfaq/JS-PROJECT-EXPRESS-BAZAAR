import { getUserCart, saveUserCart } from "./getCartProducts";
import { showToast } from "./showToast";
import { updateCartValue } from "./updateCartValue";
import { getCurrentUser } from "./auth.js";

//getCartProductFromLS
updateCartValue(getUserCart());
export const addToCart = (productID) => {
  const currentUser = getCurrentUser();
  if (currentUser) {
    // Step 1: Fetch cart data
    // const userCartProducts = getCartProductFromLS()
    const userCartProducts = getUserCart();

    console.log(productID);

    const currentCardElement = document.querySelector(`#card${productID}`);

    console.log(currentCardElement);

    let quantity = Number(
      currentCardElement.querySelector(".productQuantity").innerText
    );

    let unitPrice = Number(
      currentCardElement
        .querySelector(".productPrice")
        .innerText.replace("₹", "")
    );

    // final price for this add operation
    let price = unitPrice * quantity;

    // Step 2: Check product existence in the local storage
    let existingProduct = userCartProducts.find(
      (prod) => prod.productID === productID
    );
    console.log("[AddToCart] Requested ID:", productID, "Qty:", quantity);

    if (existingProduct) {
      console.log(
        "[AddToCart] Updating existing product:",
        existingProduct.productID
      );
      existingProduct.quantity += quantity;
      existingProduct.price += price;
    } else {
      console.log("[AddToCart] Adding NEW product:", productID);
      let newProduct = { productID, quantity, price };
      userCartProducts.push(newProduct);
    }

    // Step 3: Save LS
    saveUserCart(userCartProducts);
    // localStorage.setItem("cartProductLS", JSON.stringify(userCartProducts));
    console.log("[AddToCart] Cart updated:", userCartProducts);

    // Step 4: Update cart badge
    updateCartValue(userCartProducts);

    showToast("add", productID);
  } else {
    setTimeout(() => {
      window.location.href = "signIn.html";
    }, 100);
  }
};
