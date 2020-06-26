if (document.readyState == "loading") {
  document.addEventListener("DOMContentLoaded", ready);
} else {
  ready();
}
function ready() {
  //add click listeners to all Add To Cart Buttons
  var addToCartButtons = document.getElementsByClassName("shop-item-button");
  for (var index = 0; index < addToCartButtons.length; index++) {
    var button = addToCartButtons[index];
    button.addEventListener("click", addToCartClicked);
  }

  function addToCartClicked(event) {
    var button = event.target;
    var shopItem = button.parentElement.parentElement;
    //grab all Item Details
    var clickedItemTitle = shopItem.getElementsByClassName("shop-item-title")[0]
      .innerText;
    var clickedItemPrice = shopItem.getElementsByClassName("shop-item-price")[0]
      .innerText;
    var clickedItemSrc = shopItem.getElementsByClassName("shop-item-img")[0]
      .src;
    //using details add item to cart
    addItemToCart(clickedItemTitle, clickedItemPrice, clickedItemSrc);
    updateCartTotal();
  }

  function addItemToCart(shopItemTitle, shopItemPrice, shopItemImgSrc) {
    var cartItems = document.getElementsByClassName("cart-items")[0];
    var cartItemTitles = cartItems.getElementsByClassName("cart-item-title");
    //check if cart is empty
    if (cartItemTitles.length == 0) {
      updateEmptyCart();
      cartItems = document.getElementsByClassName("cart-items")[0];
    } else {
      //if not empty check if itme is already in the cart
      for (index = 0; index < cartItemTitles.length; index++) {
        if (cartItemTitles[index].innerText == shopItemTitle) {
          //incremement input value
          incrementInputValue("cart-quantity-input");
          //updateTotal
          updateCartTotal();
          return;
        }
      }
    }
    //create new item in cart
    var cartRow = document.createElement("div");
    cartRow.classList.add("cart-row");
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
    //add new listeners
    cartRow
      .getElementsByClassName("button-danger")[0]
      .addEventListener("click", removeCartItem);
    cartRow
      .getElementsByClassName("cart-quantity-input")[0]
      .addEventListener("change", quantityChanged);
  }

  function quantityChanged() {
    var input = event.target;
    //when negative or empty set to 1
    if (input.value < 0 || input.value.length == 0) {
      input.value = 1;
    } else if (input.value == 0) {
      //if set to 0 remove from cart
      removeCartItem(event);
    }
    updateCartTotal();
  }

  function removeCartItem(event) {
    var buttonClicked = event.target;
    buttonClicked.parentElement.parentElement.remove();
    //check if cart is now empty
    var cartItems = document.getElementsByClassName("cart-items")[0];
    var cartItemTitles = cartItems.getElementsByClassName("cart-item-title");
    console.log(cartItemTitles.length);
    if (cartItemTitles.length == 0) {
      //set empty cart
      emptyCartContent = '<span class = "empty-cart">Your Cart Is Empty</span>';
      var cartRow = document.createElement("div");
      cartRow.classList.add("cart-row");
      cartRow.innerHTML = emptyCartContent;
      cartItems.append(cartRow);
      removeElementsByClass("cart-header");
      removeElementsByClass("cart-total");
      removeElementsByClass("button-purchase");
    }
    else{
      updateCartTotal();
    }

  }

  function updateCartTotal() {
    var cartTotal = 0;
    var cartItemContainer = document.getElementsByClassName("cart-items")[0];
    var cartRows = cartItemContainer.getElementsByClassName("cart-row");
    //increment through each item in the cart
    for (var index = 0; index < cartRows.length; index++) {
      var cartRow = cartRows[index];
      var priceElement = cartRow.getElementsByClassName("cart-price-value")[0];
      var quantityElement = cartRow.getElementsByClassName(
        "cart-quantity-input"
      )[0];
      var price = parseFloat(priceElement.innerText.replace("$", ""));
      var quantity = parseInt(quantityElement.value);
      //calculate new total
      cartTotal = cartTotal + price * quantity;
    }
    //round cart total to USD currency format of $###.00
    cartTotal = Math.round(cartTotal * 100) / 100;
    document.getElementsByClassName("cart-total-price")[0].innerText =
      "$" + cartTotal;
  }

  function updateEmptyCart() {
    removeElementsByClass("empty-cart");
    var cartSection = document.getElementsByClassName("cart-section")[0];
    //Initiate cart headers
    var cartHeader = document.createElement("div");
    cartHeader.classList.add("cart-row", "cart-header");
    var cartHeaderContent = `
      <span class = "cart-item cart-header cart-column">ITEM</span>
      <span class = "cart-price cart-header cart-column">PRICE</span>
      <span class = "cart-quantity cart-header cart-column">QUANTITY</span>`;
    cartHeader.innerHTML = cartHeaderContent;
    cartSection.insertBefore(
      cartHeader,
      document.getElementsByClassName("cart-items")[0]
    );

    //Initiate Total and Purchase Button
    var cartTotal = document.createElement("div");
    cartTotal.classList.add("cart-total");
    var cartTotalContent = `
      <span class = "cart-total-title">Total</strong>
      <span class = "cart-total-price">$0</span>
      <button class= "button button-primary button-purchase" role="button">PURCHASE</button>`;
    cartTotal.innerHTML = cartTotalContent;
    cartSection.append(cartTotal);
    document
      .getElementsByClassName("button-purchase")[0]
      .addEventListener("click", purchaseClicked);
  }

  function purchaseClicked() {
    alert("Thank you for your purchase");
    //clear cart
    removeElementsByClass("cart-header");
    DeleteAllCartItems();
    removeElementsByClass("cart-total");
    removeElementsByClass("button-purchase");
  }

  function DeleteAllCartItems() {
    var cartItems = document.getElementsByClassName("cart-items")[0];
    while (cartItems.hasChildNodes()) {
      cartItems.removeChild(cartItems.firstChild);
    }
    updateCartTotal();
  }

  function removeElementsByClass(className) {
    var elements = document.getElementsByClassName(className);
    while (elements.length > 0) {
      elements[0].parentNode.removeChild(elements[0]);
    }
  }

  function incrementInputValue(className, index = 0) {
    var value = parseInt(
      document.getElementsByClassName(className)[index].value,
      10
    );
    value = isNaN(value) ? 0 : value; //input validation
    document.getElementsByClassName(className)[index].value = ++value;
  }
}
