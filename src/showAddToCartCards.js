import { getUserCart } from "./getCartProducts";
import products from "../api/products.json";
import { fetchQuantityFromLSCart } from "./fetchQuantityFromLSCart";
import { removeProdFromCart } from "./removeProdFromCart";
import { cartQuantityToggle } from "./cartQuantityToggle";
import { updateCartTotalPrice } from "./updateCartTotalPrice";
import { updateHRs } from "./updateHorizontalBreak";
import { updateCartValue } from "./updateCartValue";

// let userCartProducts = getCartProductFromLS();
const userCartProducts = getUserCart();
console.log("User Cart: ", userCartProducts);

let filterProducts = products.filter((prod) => {
  return userCartProducts.some((localProd) => prod.id === localProd.productID);
});

console.log("Filter Products: ", filterProducts);

const cartContainer = document.querySelector("#productCartContainer");
const templateContainer = document.querySelector("#productCartTemplate");

const showProducts = () => {
  filterProducts.forEach((prod) => {
    const { category, id: productID, name, stock, price, image } = prod;

    let actualDataFromLS = fetchQuantityFromLSCart(productID, price);
    let productClone = document.importNode(templateContainer.content, true);

    productClone
      .querySelector("#cardValue")
      .setAttribute("id", `card${productID}`);
    productClone.querySelector(".category").textContent = category;
    productClone.querySelector(".productName").textContent = name;
    productClone.querySelector(".productImage").src = image;
    productClone.querySelector(".productQuantity").textContent =
      actualDataFromLS.quantity;
    productClone.querySelector(".productPrice").textContent = `₹${Number(
      actualDataFromLS.price.toFixed(2)
    )}`;

    productClone
      .querySelector(".stockElement")
      .addEventListener("click", (event) => {
        cartQuantityToggle(event, productID, stock, price);
      });

    productClone
      .querySelector(".remove-to-cart-button")
      .addEventListener("click", () => removeProdFromCart(productID));

    cartContainer.appendChild(productClone);
    updateHRs(cartContainer);
    updateCartValue(getUserCart());
  });
};

showProducts();
updateCartTotalPrice();
