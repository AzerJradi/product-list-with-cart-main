document.addEventListener("DOMContentLoaded", () => {
  let cart = [];
  const cartCountElement = document.querySelector(".YourCartPart");
  const cartContentElement = document.querySelector(".YourCartPart2");
  const cartImageElement = document.querySelector(".imgCart");
  const orderSummaryElement = document.querySelector(".orderSummary");
  const addButtons = document.querySelectorAll(".addTocartPart2");
  const carbonImage = "./assets/images/icon-carbon-neutral.svg";
  const doneMark = "./assets/images/icon-order-confirmed.svg";

  addButtons.forEach((button) => {
    button.addEventListener("click", (event) => {
      const menuPart = event.target.closest(".menuPart");
      const productName = menuPart.querySelector(
        ".detailedNameProdect"
      ).textContent;
      const productPrice = parseFloat(
        menuPart.querySelector(".pirceProduct").textContent.replace("$", "")
      );
      const productImageSrc = menuPart.querySelector(".ProdectImg").src;
      const existingProduct = cart.find((item) => item.name === productName);

      if (existingProduct) {
        existingProduct.quantity += 1;
      } else {
        const product = {
          name: productName,
          price: productPrice,
          image: productImageSrc,
          quantity: 1,
        };
        cart.push(product);
      }

      updateCart();
    });
  });

  function updateCart() {
    const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
    const totalPrice = cart
      .reduce((sum, item) => sum + item.quantity * item.price, 0)
      .toFixed(2);
    cartCountElement.textContent = `Your Cart (${totalItems})`;

    if (totalItems === 0) {
      cartContentElement.textContent = "Your added items will appear here";
      cartImageElement.style.display = "block";
    } else {
      const cartItemsHTML = cart
        .map(
          (item) => `
        <div class="cartItem">
          <div class="cartItemDetails">
            <p class="cartItemName">${item.name}</p>
            <p class="cartItemQuantity">${item.quantity}x</p>
            <p class="cartItemPrice">@ $${item.price.toFixed(2)}</p>
            <p class="totalPrice">$${(item.quantity * item.price).toFixed(
              2
            )}</p>
          </div>
        </div>
      `
        )
        .join("");

      const carbonImageHTML = `
        <div class="carbonpart">
          <img src="${carbonImage}" class="carbon" width="8%" alt="Carbon Neutral Icon">
          <p class='someTalk'>This is a carbon-neutral delivery</p>
        </div>
      `;
      const confirmButton = `
        <div class="confirmPart">
          <button class='confirmBtn'>Confirm Order</button>
        </div>
      `;
      cartContentElement.innerHTML = `
        <div class="cartItemsContainer">
          ${cartItemsHTML}
          <div class="cartTotal">
            <p class="tot1">Total</p>
            <p class="tot2">$${totalPrice}</p>
          </div>
          ${carbonImageHTML}
          ${confirmButton}
        </div>
      `;
      cartImageElement.style.display = "none";

      document.querySelector(".confirmBtn").addEventListener("click", () => {
        displayOrderSummary();
      });
    }
  }

  function displayOrderSummary() {
    const orderTotalPrice = cart
      .reduce((sum, item) => sum + item.quantity * item.price, 0)
      .toFixed(2);

    const orderItemsHTML = cart
      .map(
        (item) => `
      <div class="orderItem">
        <img src="${item.image}" alt="${item.name}" class="orderItemImage">
        <div class="orderItemPart2">
          <p class="orderItemName">${item.name}</p>
          <p class="orderItemQuantity">${item.quantity}x</p>
          <p class="orderItemPrice">@ $${item.price.toFixed(2)}</p>
          <p class="orderTotalPrice">$${(item.quantity * item.price).toFixed(
            2
          )}</p>
        </div>
      </div>
    `
      )
      .join("");

    const startButton = `
      <div class="confirmPart2">
        <button class='confirmBtn startNewOrderBtn'>Start New Order</button>
      </div>
    `;
    orderSummaryElement.innerHTML = `
      <div class="orderSummaryContainer">
        <img class="doneMark" src="${doneMark}" alt="Order Confirmed">
        <h2>Order Summary</h2>
        <p class="someTalkOder">We hope you enjoy your food!</p>
        ${orderItemsHTML}
        <div class="orderTotal">
          <p class="orderTotalLabel">Total</p>
          <p class="orderTotalValue">$${orderTotalPrice}</p>
        </div>
        ${startButton}
      </div>
    `;
    orderSummaryElement.style.display = "block";

    document
      .querySelector(".startNewOrderBtn")
      .addEventListener("click", startNewOrder);
  }

  function startNewOrder() {
    cart = [];
    updateCart();
    orderSummaryElement.style.display = "none";
  }

  updateCart();
});
