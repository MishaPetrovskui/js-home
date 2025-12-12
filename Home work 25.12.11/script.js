document.addEventListener('DOMContentLoaded', () => {
    const products = [
        { id: 1, name: 'Кавомолка', price: 45, image: 'https://content.rozetka.com.ua/goods/images/big/10999181.jpg' },
        { id: 2, name: 'Електричний чайник', price: 30, image: 'https://png.pngtree.com/png-clipart/20210502/original/pngtree-heating-electronic-electric-kettle-png-image_6267394.png' },
        { id: 3, name: 'Сковорода', price: 25, image: 'https://img.icons8.com/emoji/512w/cooking-pot-emoji.png' },
        { id: 4, name: 'Тостер', price: 28, image: 'https://cdn-icons-png.flaticon.com/512/5771/5771645.png' },
        { id: 5, name: 'Блендер', price: 55, image: 'https://cdn-icons-png.flaticon.com/512/8866/8866936.png' },
        { id: 6, name: 'Мікрохвильовка', price: 120, image: 'https://cdn-icons-png.flaticon.com/512/10550/10550282.png' },
        { id: 7, name: 'Рисоварка', price: 42, image: 'https://cdn-icons-png.flaticon.com/512/4226/4226803.png' },
        { id: 8, name: 'Кухонний комбайн', price: 85, image: 'https://png.pngtree.com/png-vector/20240425/ourmid/pngtree-multifunctional-food-processor-png-image_12317084.png' }
    ];

    let cart = [];

    function getCookie(name) {
        let value = `; ${document.cookie}`;
        let parts = value.split(`; ${name}=`);
        if (parts.length === 2) {
            return decodeURIComponent(parts.pop().split(';').shift());
        }
        return null;
    }

    function setCookie(name, value, days = 30) {
        let date = new Date();
        date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
        let expires = `expires=${date.toUTCString()}`;
        document.cookie = `${name}=${encodeURIComponent(value)};${expires};path=/`;
    }

    function loadCart() {
        let cartData = getCookie('cart');
        if (cartData) {
            try {
                cart = JSON.parse(cartData);
            } catch (e) {
                cart = [];
            }
        }
        updateCartBadge();
    }

    function saveCart() {
        setCookie('cart', JSON.stringify(cart));
        updateCartBadge();
    }

    function updateCartBadge() {
        let totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
        document.getElementById('cartBadge').textContent = totalItems;
    }

    function renderProducts() {
        let grid = document.getElementById('productsGrid');
        grid.innerHTML = products.map(product => `
            <div class="product-card">
                <div class="product-image">
                    <img src="${product.image}" alt="${product.name}" style="width: 100%; height: 200px; object-fit: cover; border-radius: 8px;">
                </div>
                <div class="product-name">${product.name}</div>
                <div class="product-price">${product.price}</div>
                <button class="btn-buy" onclick="Shop.addToCart(${product.id})">
                    Купити
                </button>
            </div>
        `).join('');
    }

    function addToCart(productId) {
        let product = products.find(p => p.id === productId);
        let existingItem = cart.find(item => item.id === productId);
        
        if (existingItem) {
            existingItem.quantity++;
        } else {
            cart.push({ ...product, quantity: 1 });
        }
        
        saveCart();
        showPage('cart');
    }


    function updateQuantity(productId, change) {
        let item = cart.find(item => item.id === productId);
        if (item) {
            item.quantity += change;
            if (item.quantity <= 0) {
                removeFromCart(productId);
            } else {
                saveCart();
                renderCart();
            }
        }
    }

    function removeFromCart(productId) {
        cart = cart.filter(item => item.id !== productId);
        saveCart();
        renderCart();
    }

    function renderCart() {
        let cartContent = document.getElementById('cartContent');
        
        if (cart.length === 0) {
            cartContent.innerHTML = `
                <div class="cart-empty">
                    <div class="cart-empty-icon">🛒</div>
                    <h2>Кошик порожній</h2>
                    <p>Додайте товари з магазину</p>
                    <button class="btn btn-primary" onclick="showPage('shop')" style="margin-top: 20px;">
                        Перейти до магазину
                    </button>
                </div>
            `;
            return;
        }

        let totalPrice = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
        let totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);

        cartContent.innerHTML = `
            <div class="cart-items">
                ${cart.map(item => `
                    <div class="cart-item">
                        <div class="cart-item-image"><img src="${item.image}" alt="${item.name}" style="width:80px;height:80px;object-fit:cover;border-radius:8px;"></div>
                        <div class="cart-item-details">
                            <div class="cart-item-name">${item.name}</div>
                            <div class="cart-item-price">$${item.price} × ${item.quantity}</div>
                        </div>
                        <div class="quantity-controls">
                            <button class="btn-quantity" onclick="updateQuantity(${item.id}, -1)">−</button>
                            <span class="quantity">${item.quantity}</span>
                            <button class="btn-quantity" onclick="updateQuantity(${item.id}, 1)">+</button>
                        </div>
                        <button class="btn-remove" onclick="removeFromCart(${item.id})">
                            🗑️ Видалити
                        </button>
                    </div>
                `).join('')}
            </div>
            <div class="cart-summary">
                <div class="summary-row">
                    <span>Товарів:</span>
                    <span>${totalItems}</span>
                </div>
                <div class="summary-row summary-total">
                    <span>Всього:</span>
                    <span>$${totalPrice}</span>
                </div>
                <button class="btn-checkout" onclick="checkout()">
                    Оформити замовлення
                </button>
            </div>
        `;
    }

    function showPage(pageName) {
        document.querySelectorAll('.page').forEach(page => {
            page.classList.remove('active');
        });
        
        if (pageName === 'shop') {
            document.getElementById('shopPage').classList.add('active');
        } else if (pageName === 'cart') {
            document.getElementById('cartPage').classList.add('active');
            renderCart();
        }
    }

    function checkout() {
        alert('Дякуємо за замовлення! Загальна сума: $' + cart.reduce((sum, item) => sum + (item.price * item.quantity), 0));
        cart = [];
        saveCart();
        showPage('shop');
    }
    window.Shop = { addToCart };
    window.showPage = showPage;
    window.updateQuantity = updateQuantity;
    window.removeFromCart = removeFromCart;
    window.checkout = checkout;

    loadCart();
    renderProducts();
});