import { addToCart } from "./addToCart";
import { homeQuantityToggle } from "./homeQuantityToggle";

const productTemplate = document.querySelector("#productTemplate");
const productContainer = document.querySelector("#productContainer");

export const showProductContainer = (products) => {
  if (!products) return false;

  products.forEach((product) => {
    const {
      brand,
      category,
      description,
      id: productID,
      image,
      name,
      price,
      stock,
    } = product;
    const productClone = document.importNode(productTemplate.content, true);

    productClone
      .querySelector("#cardValue")
      .setAttribute("id", `card${productID}`);
    productClone.querySelector(".category").textContent = category;
    productClone.querySelector(".productName").textContent = name;
    productClone.querySelector(".productImage").src = image;
    productClone.querySelector(".productImage").alt = name;
    productClone.querySelector(".productStock").textContent = stock;
    productClone.querySelector(".productDescription").textContent = description;
    productClone.querySelector(".productPrice").textContent = `₹${price}`;
    productClone.querySelector(".productActualPrice").textContent = `₹${
      price * 4
    }`;

    productClone
      .querySelector(".stockElement")
      .addEventListener("click", (event) => {
        homeQuantityToggle(event, productID, stock);
      });

    productClone
      .querySelector(".add-to-cart-button")
      .addEventListener("click", (event) => {
        addToCart(productID);
      });
    productContainer.appendChild(productClone);
  });
};
