const btnCart = document.querySelector("#cart-icon");
const cart = document.querySelector(".cart");
const removeCart = document.querySelector("#cart-close");

// To open a cart or active the cart
btnCart.addEventListener("click", () => {
  cart.classList.add("cart-active");
});

// To close a cart
removeCart.addEventListener("click", () => {
  cart.classList.remove("cart-active");
});

// on click add to cart

document.addEventListener("DOMContentLoaded", loadfood);

function loadfood() {
  loadContent();
}

// loadcontent
function loadContent() {
  //Remove Food Items  From Cart
  let btnRemove = document.querySelectorAll(".cart-remove");
  btnRemove.forEach((btn) => {
    btn.addEventListener("click", removeItem);
  });

  // change the quantity

  let qtyElements = document.querySelectorAll(".cart-quantity");
  qtyElements.forEach((input) => {
    input.addEventListener("change", changeQty);
  });

  // add the products to cart
  let cartBtns = document.querySelectorAll(".add-cart");

  cartBtns.forEach((btn) => {
    btn.addEventListener("click", addcart);
  });
  updateAll();
}

// it to add-cart

let itemList = [];

function addcart() {
  let food = this.parentElement;

  let title = food.querySelector(".food-title").innerHTML;

  let price = food.querySelector(".food-price").innerHTML;

  let imgSrc = food.querySelector(".food-img").src;

  let newProduct = { title, price, imgSrc };

  if (itemList.find((el) => el.title == newProduct.title)) {
    alert("already it is in your cart");
    return;
  } else {
    itemList.push(newProduct);
  }

  let newProductElement = createCartProduct(title, price, imgSrc);
  let element = document.createElement("div");
  element.innerHTML = newProductElement;
  let cartBasket = document.querySelector(".cart-content");
  cartBasket.append(element);
  loadContent();
}
// console.log(itemList);

// create cart product;

function createCartProduct(title, price, imgSrc) {
  return `<div class="cart-box">
    <img src="${imgSrc}" class="cart-img">
   <div class="detail-box">
     <div class="cart-food-title">${title}</div>
      <div class="price-box">
        <div class="cart-price">${price}</div>
         <div class="cart-amt">${price}</div>
     </div>
      <input type="number" value="1" class="cart-quantity">
    </div>
    <ion-icon name="trash" class="cart-remove"></ion-icon>
  </div>`;
}

// change cart

function changeQty() {
  if (isNaN(this.value) || this.value < 1) {
    this.value = 1;
  }

  loadContent();
}

//Remove Item
function removeItem() {
  if (confirm("Are Your Sure to Remove")) {
    let title = this.parentElement.querySelector(".cart-food-title").innerHTML;
    itemList = itemList.filter((el) => el.title != title);
    this.parentElement.remove();
    loadContent();
  }
}
function updateAll() {
  const cartItems = document.querySelectorAll(".cart-box");
  const totalValue = document.querySelector(".total-price");

  let total = 0;
  cartItems.forEach((product) => {
    let priceElement = product.querySelector(".cart-price");

    let price = parseFloat(priceElement.innerHTML.replace("Rs.", ""));
    let qty = document.querySelector(".cart-quantity").value;

    total += price * qty;
    product.querySelector(".cart-amt").innerText = "Rs." + price * qty;
  });

  totalValue.innerHTML = "Rs." + total;

  // Add Product Count in Cart Icon

  // console.log(itemList.length);

  const cartCount = document.querySelector(".cart-count");
  let count = itemList.length;
  cartCount.innerHTML = count;

  if (count == 0) {
    cartCount.style.display = "none";
  } else {
    cartCount.style.display = "block";
  }
}

//----------------------  add payment ---------------------
const place_order = document.querySelector(".btn-buy");

place_order.addEventListener("click", getData);

function getData() {
  if (itemList != 0) {
    const totalPrice = itemList.reduce((sum, currentElement) => {
      const currentPrice = +currentElement.price.replace(/[a-z.]/gi, "");
      sum += currentPrice;
      return sum;
    }, 0);
    window.location.href = `./html/gateway.html?total-price=${totalPrice}`;

    //  window.location.href = "../../project-1/payment/index.html"
  } else {
    alert("cart is empty");
  }
}
