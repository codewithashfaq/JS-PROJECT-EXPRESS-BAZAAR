import { getUserCart, saveUserCart } from "./getCartProducts";
import { updateCartTotalPrice } from "./updateCartTotalPrice";

export const cartQuantityToggle = (event, productID, stock, price) => {
  const currentCardElement = document.querySelector(`#card${productID}`);
  let productQuantity = currentCardElement.querySelector(".productQuantity");
  let productPrice = currentCardElement.querySelector(".productPrice");
  //   console.log(currentCardElement);

  let unitPrice = price;

  // let localStorageProducts = getCartProductFromLS();
  const userCartProducts = getUserCart();

  let existingProduct = userCartProducts.find(
    (prod) => prod.productID === productID
  );

  let quantity = existingProduct.quantity;

  if (event.target.className === "cartIncrement") {
    if (quantity < stock) {
      existingProduct.quantity += 1;
      existingProduct.price = Number(
        (unitPrice * existingProduct.quantity).toFixed(2)
      );
    } else if (quantity === stock) {
      existingProduct.quantity = stock;
      existingProduct.price = Number(
        (unitPrice * existingProduct.quantity).toFixed(2)
      );
    }
  }

  if (event.target.className === "cartDecrement") {
    if (quantity > 1) {
      existingProduct.quantity -= 1;
      existingProduct.price = Number(
        (unitPrice * existingProduct.quantity).toFixed(2)
      );
    }
  }

  productQuantity.innerText = existingProduct.quantity;
  productPrice.innerText = `₹${existingProduct.price.toFixed(2)}`;
  // localStorage.setItem("cartProductLS", JSON.stringify(userCartProducts));
  saveUserCart(userCartProducts);
  updateCartTotalPrice();
};
