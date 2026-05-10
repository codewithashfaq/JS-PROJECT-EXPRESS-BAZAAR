export const updateCartValue = (cartProducts) => {
  console.log("From Update Cart UI: ", cartProducts);

  const cartValue = document.querySelector("#cartValue");

  console.log(cartValue);

  const cartTotalQty = cartProducts?.length || 0;

  console.log(`Cart updated → ${cartTotalQty} item(s)`);

  cartValue.innerHTML = `<i class="fa-solid fa-cart-shopping"> &nbsp;${cartTotalQty}</i>`;

  return cartTotalQty;
};
