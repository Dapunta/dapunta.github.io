let pesanan = {}; // Objek untuk menyimpan pesanan

// Menambahkan event listener pada tombol "Add"
document.querySelectorAll('.add-button').forEach(button => {
    button.addEventListener('click', function () {
        const parentElement = this.closest('.produk-menu-reguler');
        const idMenu = parentElement.id; // ID menu
        const addButtonContainer = parentElement.querySelector('.add-button-container');
        const priceElement = parentElement.querySelector('.price');
        const price = parseInt(priceElement.textContent.replace(/[^\d]/g, ''), 10);

        // Jika item belum ada di pesanan, tambahkan
        if (!pesanan[idMenu] || pesanan[idMenu].count === 0) {
            pesanan[idMenu] = { count: 1, price: price };
            updateCounter(addButtonContainer, idMenu);  // Update counter
        }

        updateFooter(); // Perbarui footer
        console.log(pesanan);
    });
});

// Memperbarui tampilan counter untuk setiap menu
function updateCounter(container, idMenu) {
    container.innerHTML = `
        <button type="button" class="decrement-button">-</button>
        <span class="count">${pesanan[idMenu].count}</span>
        <button type="button" class="increment-button">+</button>
    `;

    // Tambahkan event listener untuk tombol decrement
    container.querySelector('.decrement-button').addEventListener('click', function () {
        decrementItem(idMenu, container); // Memanggil fungsi untuk mengurangi jumlah
    });

    // Tambahkan event listener untuk tombol increment
    container.querySelector('.increment-button').addEventListener('click', function () {
        incrementItem(idMenu, container); // Memanggil fungsi untuk menambah jumlah
    });
}

// Fungsi untuk mengurangi jumlah item
function decrementItem(idMenu, container) {
    if (pesanan[idMenu].count > 1) {
        pesanan[idMenu].count--;
        container.querySelector('.count').textContent = pesanan[idMenu].count;
    }
    else {
        delete pesanan[idMenu]; // Hapus item jika jumlahnya 0
        container.innerHTML = `<button type="button" class="add-button">Add</button>`;
        // Menambahkan event listener untuk tombol "Add" setelah dihapus
        container.querySelector('.add-button').addEventListener('click', function () {
            const priceElement = container.closest('.produk-menu-reguler').querySelector('.price');
            const price = parseInt(priceElement.textContent.replace(/[^\d]/g, ''), 10);
            pesanan[idMenu] = { count: 1, price: price };
            updateCounter(container, idMenu); // Update counter
            updateFooter();  // Perbarui footer ketika item ditambahkan kembali
        });
    }

    updateFooter(); // Perbarui footer
    console.log(pesanan);
}

// Fungsi untuk menambah jumlah item
function incrementItem(idMenu, container) {
    pesanan[idMenu].count++;
    container.querySelector('.count').textContent = pesanan[idMenu].count;

    updateFooter(); // Perbarui footer
    console.log(pesanan);
}

// Fungsi untuk memperbarui footer dengan total item dan harga
function updateFooter() {
    const totalItem = Object.values(pesanan).reduce((sum, item) => sum + item.count, 0);
    const totalPrice = Object.values(pesanan).reduce((sum, item) => sum + (item.count * item.price), 0);

    const footerContainer = document.querySelector('.footer-container');
    const totalItemText = footerContainer.querySelector('.total-item');
    const totalPriceText = footerContainer.querySelector('.total-price');

    // Update teks total item dan harga
    totalItemText.textContent = `Lihat ${totalItem} Item`;
    totalPriceText.textContent = `Rp ${totalPrice.toLocaleString('id-ID')}`;

    // Menambahkan atau menghapus kelas 'active' pada footer-container
    if (totalItem > 0) {
        footerContainer.className = 'footer-container active'; // Menambahkan kelas 'active'
    }
    else {
        footerContainer.className = 'footer-container inactive'; // Menambahkan kelas 'inactive'
    }
}