if (document.readyState == "loading") {
  document.addEventListener("DOMContentLoaded", ready);
} else {
  ready();
}
function ready() {
  var removeCartItemButtons = document.getElementsByClassName("button-danger");
  for (var index = 0; index < removeCartItemButtons.length; index++) {
    var button = removeCartItemButtons[index];
    button.addEventListener("click", removeCartItem);
  }

  var quantityInputs = document.getElementsByClassName("cart-quantity-input");
  for (var index = 0; index < quantityInputs.length; index++) {
    var input = quantityInputs[index];
    input.addEventListener("change", quantityChanged);
  }

  var addToCartButtons = document.getElementsByClassName("shop-item-button");
  for (var index = 0; index < addToCartButtons.length; index++) {
    var button = addToCartButtons[index];
    button.addEventListener("click", addToCartClicked);
  }

  document
    .getElementsByClassName("button-purchase")[0]
    .addEventListener("click", purchaseClicked);

  function addToCartClicked(event) {
    var button = event.target;
    var shopItem = button.parentElement.parentElement;
    var shopItemTitle = shopItem.getElementsByClassName("shop-item-title")[0]
      .innerText;
    var shopItemPrice = shopItem.getElementsByClassName("shop-item-price")[0]
      .innerText;
    var shopItemImgSrc = shopItem.getElementsByClassName("shop-item-img")[0]
      .src;
    addItemToCart(shopItemTitle, shopItemPrice, shopItemImgSrc);
    updateCartTotal();
  }

  function addItemToCart(shopItemTitle, shopItemPrice, shopItemImgSrc) {
    var cartRow = document.createElement("div");
    cartRow.classList.add("cart-row");
    var cartItems = document.getElementsByClassName("cart-items")[0];
    var cartNames = cartItems.getElementsByClassName("cart-item-title");
    for (index = 0; index < cartNames.length; index++) {
      if (cartNames[index].innerText == shopItemTitle) {
        alert("This item is already added to the cart");
        return;
      }
    }
    var cartRowContents = `
      <div class = "cart-item cart-column">
        <img class ="cart-item-img" src="${shopItemImgSrc}" width="100" height="100" />
        <span class = "cart-item-title">${shopItemTitle}</span>
      </div>
      <span class = "cart-price cart-price-value cart-column">${shopItemPrice}</span>
      <div class = "cart-quantity cart-column">
        <input class = "cart-quantity-input" type="number" value="1" />
        <button class = "button button-danger" role="button">REMOVE</button>
      </div>`;
    cartRow.innerHTML = cartRowContents;
    cartItems.append(cartRow);
    cartRow
      .getElementsByClassName("button-danger")[0]
      .addEventListener("click", removeCartItem);
    cartRow
      .getElementsByClassName("cart-quantity-input")[0]
      .addEventListener("change", quantityChanged);
  }

  function quantityChanged() {
    var input = event.target;

    if (input.value < 0 || input.value.length == 0) {
      input.value = 1;
    } else if (input.value == 0) {
      removeCartItem(event);
    }
    updateCartTotal();
  }

  function removeCartItem(event) {
    var buttonClicked = event.target;
    buttonClicked.parentElement.parentElement.remove();
    updateCartTotal();
  }

  function updateCartTotal() {
    var cartTotal = 0;
    var cartItemContainer = document.getElementsByClassName("cart-items")[0];
    var cartRows = cartItemContainer.getElementsByClassName("cart-row");
    for (var index = 0; index < cartRows.length; index++) {
      var cartRow = cartRows[index];
      var priceElement = cartRow.getElementsByClassName("cart-price-value")[0];
      var quantityElement = cartRow.getElementsByClassName(
        "cart-quantity-input"
      )[0];
      var price = parseFloat(priceElement.innerText.replace("$", ""));
      var quantity = parseInt(quantityElement.value);
      cartTotal = cartTotal + price * quantity;
    }
    cartTotal = Math.round(cartTotal * 100) / 100;
    document.getElementsByClassName("cart-total-price")[0].innerText =
      "$" + cartTotal;
  }

  function purchaseClicked() {
    alert("Thank you for your purchase");
    DeleteAllCartItems();
  }

  function DeleteAllCartItems() {
    var cartItems = document.getElementsByClassName("cart-items")[0];
    while (cartItems.hasChildNodes()) {
      cartItems.removeChild(cartItems.firstChild);
    }
    updateCartTotal();
  }
}
