const API_URL = 'http://10.0.2.153:3000/api/products'; // Ganti dengan IP backend kamu

// Fungsi untuk fetch dan tampilkan produk (buat index.html)
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
          <button class="delete-button" onclick="deleteProduct(${product.id})">Hapus</button>
        </div>
      `;

      container.appendChild(card);
    });
  } catch (error) {
    console.error('Error fetching products:', error);
  }
}

// Fungsi untuk menghapus produk (API DELETE)
async function deleteProduct(productId) {
  try {
    const response = await fetch(`${API_URL}/${productId}`, {
      method: 'DELETE',
    });

    if (response.ok) {
      alert('Produk berhasil dihapus!');
      fetchProducts(); // Reload produk setelah penghapusan
    } else {
      const errorData = await response.json();
      alert('Gagal hapus produk: ' + errorData.message);
    }
  } catch (error) {
    console.error('Error deleting product:', error);
    alert('Terjadi kesalahan saat menghapus produk.');
  }
}

// Fungsi untuk handle submit form tambah produk (buat add.html)
async function handleAddProductForm() {
  const form = document.getElementById('product-form');

  form.addEventListener('submit', async (e) => {
    e.preventDefault();

    const name = document.getElementById('name').value;
    const price = document.getElementById('price').value;
    const imageUrl = document.getElementById('imageUrl').value;

    try {
      const response = await fetch(API_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, price, imageUrl })
      });

      if (response.ok) {
        alert('Produk berhasil ditambahkan!');
        window.location.href = 'index.html'; // Redirect ke daftar
      } else {
        const errorData = await response.json();
        alert('Gagal tambah produk: ' + errorData.message);
      }
    } catch (error) {
      console.error('Error adding product:', error);
      alert('Terjadi kesalahan saat menambahkan produk.');
    }
  });
}

// --- INISIALISASI ---
// Cek halaman berdasarkan ada tidaknya elemen
document.addEventListener('DOMContentLoaded', () => {
  if (document.getElementById('product-container')) {
    // Kalau ada container produk, berarti ini halaman index.html
    fetchProducts();
  }

  if (document.getElementById('product-form')) {
    // Kalau ada form produk, berarti ini halaman add.html
    handleAddProductForm();
  }
});
