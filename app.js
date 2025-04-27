const API_URL = 'http://13.239.26.89:3000/api/products'; // Ganti dengan IP EC2 backend kamu

async function fetchProducts() {
  try {
    const response = await fetch(API_URL);
    const products = await response.json();
    const container = document.getElementById('product-container');

    products.forEach(product => {
      const card = document.createElement('div');
      card.className = 'card';

      card.innerHTML = `
        <img src="${product.image_url}" alt="${product.name}">
        <div class="card-body">
          <h2 class="card-title">${product.name}</h2>
          <p class="card-price">Rp ${parseFloat(product.price).toLocaleString('id-ID')}</p>
        </div>
      `;

      container.appendChild(card);
    });
  } catch (error) {
    console.error('Error fetching products:', error);
  }
}

fetchProducts();
