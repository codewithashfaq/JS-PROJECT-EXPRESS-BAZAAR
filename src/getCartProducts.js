// import { updateCartValue } from "./updateCartValue";

// export const getCartProductFromLS = () => {
//   let cartProducts = localStorage.getItem("cartProductLS");

//   if (!cartProducts) {
//     console.log("[getCartProducts] No cart found → Returning []");
//     updateCartValue([]); // cart empty → show 0
//     return [];
//   }

//   const parsedCartProducts = JSON.parse(cartProducts);
//   console.log("[getCartProducts] Loaded:", parsedCartProducts);
//   updateCartValue(parsedCartProducts);
//   return parsedCartProducts;
// };

// User ke email se ek unique cart key banayenge
function getCartKey(userEmail) {
  return `cart_${userEmail}`;
}

// Current user ka cart fetch karo
export const getUserCart = () => {
  const currentUser = JSON.parse(localStorage.getItem("currentUser"));
  if (!currentUser) return [];
  return JSON.parse(localStorage.getItem(getCartKey(currentUser.email))) || [];
};

// Current user ka cart save karo
export const saveUserCart = (userCart) => {
  const currentUser = JSON.parse(localStorage.getItem("currentUser"));
  if (!currentUser) return;
  localStorage.setItem(getCartKey(currentUser.email), JSON.stringify(userCart));
};
