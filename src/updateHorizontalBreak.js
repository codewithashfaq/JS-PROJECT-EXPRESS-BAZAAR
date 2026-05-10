export const updateHRs = (cartContainer) => {
  //remove old one
  cartContainer.querySelectorAll("hr").forEach((hr) => hr.remove());

  //add new hr between cards
  const cards = cartContainer.querySelectorAll(".cards");
  cards.forEach((card, index) => {
    if (index !== cards.length - 1) {
      card.insertAdjacentHTML("afterend", "<hr>");
    }
  });
};
