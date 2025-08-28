let cart = [];

function toggleCart() {
  const cart = document.querySelector(".cart-button");
  const items = document.querySelector(".cart");
  cart.addEventListener("click", () => {
    items.classList.toggle("hidden");
  });
}

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

  cart.forEach((item, index) => {
    total += item.price * item.quantity;

    const div = document.createElement("div");
    div.classList.add("cart-item");

    div.innerHTML = `
      <button class="decrease-btn" data-index="${index}">−</button>
      <button class="increase-btn" data-index="${index}">+</button>
      <span class="item-name">${item.name}</span>
      <span class="item-qty">x${item.quantity}</span>
      <span class="item-price">${item.price * item.quantity} грн</span>
    `;

    cartContainer.appendChild(div);
  });

  totalEl.textContent = `Всього: ${total} грн`;

  // Додаємо обробники на кнопки "-"
  document.querySelectorAll('.decrease-btn').forEach(button => {
    button.addEventListener('click', function() {
      const index = this.getAttribute('data-index');
      if (cart[index].quantity > 1) {
        cart[index].quantity -= 1;
      } else {
        cart.splice(index, 1);
      }
      renderCart();
    });
  });
  document.querySelectorAll('.increase-btn').forEach(button => {
    button.addEventListener('click', function() {
      const index = this.getAttribute('data-index');
      if (cart[index].quantity > 1) {
        cart[index].quantity += 1;
      }
      renderCart();
    });
  });
}

function checkout() {
  if (cart.length === 0) {
    alert("Ваш кошик порожній");
    return;
  }
  console.log(cart);
  // Тут можна реалізувати логіку оформлення замовлення
  alert("Оформлення замовлення...");
  cart = [];
  renderCart();
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
