// Affichage du numéro de commande sur la page
function displayOrderId() {
  const orderId = JSON.parse(localStorage.getItem("orderId"));

  const displayId = document.querySelector("#orderId");
  const errMsg = document.querySelector(".confirmation p");


  if (orderId) {
    displayId.textContent = String(orderId);
  } else {
    errMsg.textContent = "Votre commande est vide !";
  }
}

displayOrderId();


// Suppression du Local Storage
function clearStorage() {
  localStorage.removeItem("orderId");
}
clearStorage();

