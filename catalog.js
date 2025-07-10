function addToCart() {
  alert("Товар додано в кошик!");
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
