import { getUserCart } from "./getCartProducts";

export const fetchQuantityFromLSCart = (productID, price) => {
  // let userCartProducts = getCartProductFromLS();
  const userCartProducts = getUserCart();
  let existingProduct = userCartProducts.find(
    (prod) => prod.productID === productID
  );
  let quantity = 1;

  if (existingProduct) {
    quantity = existingProduct.quantity;
    price = existingProduct.price;
  }

  return { quantity, price };
};
