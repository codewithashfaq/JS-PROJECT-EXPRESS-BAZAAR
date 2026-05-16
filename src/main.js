import products from "../api/products.json";
import { showProductContainer } from "./homeProductCards";

// console.log(products);
//Define a function named 'showProductContainer' that takes an array of products as input.
document.addEventListener("DOMContentLoaded", () => {
  showProductContainer(products);
});
