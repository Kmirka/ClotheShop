let cart = [];

function addToCart(button) {
  const product = button.closest(".product");
  const name = product.querySelector("h3").innerText;
  const price = parseFloat(product.dataset.price);

  // чи вже є в корзині?
  const existing = cart.find((item) => item.name === name);

  if (existing) {
    existing.quantity += 1;
  } else {
    cart.push({ name, price, quantity: 1 });
  }
console.log(cart);

  renderCart();
}

function renderCart() {
  const cartContainer = document.querySelector(".cart-items");
  const totalEl = document.querySelector(".cart .total");

  cartContainer.innerHTML = "";

  let total = 0;

  cart.forEach((item) => {
    total += item.price * item.quantity;

    const div = document.createElement("div");
    div.classList.add("cart-item");

    div.innerHTML = `
        <span class="item-name">${item.name}</span>
        <span class="item-qty">x${item.quantity}</span>
        <span class="item-price">${item.price * item.quantity} грн</span>
      `;

    cartContainer.appendChild(div);
  });

  totalEl.textContent = `Всього: ${total} грн`;
}



function filterByPrice(range) {
  const products = document.querySelectorAll('.product');

  products.forEach(product => {
    const price = parseInt(product.getAttribute('data-price'));

    let show = false;

    if (range === 'all') show = true;
    else if (range === 'under500' && price <= 500) show = true;
    else if (range === '500-1000' && price > 500 && price <= 1000) show = true;
    else if (range === 'over1000' && price > 1000) show = true;

    product.style.display = show ? 'inline-block' : 'none';
  });
}
