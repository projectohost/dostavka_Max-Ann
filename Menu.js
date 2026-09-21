let cart = [];

const cartButton = document.getElementById("cartButton");
const cartModal = document.getElementById("cartModal");
const closeCart = document.getElementById("closeCart");

const cartItems = document.getElementById("cartItems");
const cartCount = document.getElementById("cartCount");
const cartTotal = document.getElementById("cartTotal");

const addButtons = document.querySelectorAll(".add-button");

// Додавання товару в кошик
addButtons.forEach(function(button) {
    button.addEventListener("click", function() {
        const name = button.dataset.name;
        const price = Number(button.dataset.price);

        // Перевірка чи є вже такий товар
        const existingItem = cart.find(item => item.name === name);

        if (existingItem) {
            existingItem.quantity += 1;
        } else {
            cart.push({
                name: name,
                price: price,
                quantity: 1
            });
        }

        updateCart();
        cartModal.classList.add("active");
    });
});

// Оновлення кошика
function updateCart() {
    // Рахуємо загальну кількість одиниць товарів
    const totalCount = cart.reduce((sum, item) => sum + item.quantity, 0);
    cartCount.textContent = totalCount;

    if (cart.length === 0) {
        cartItems.innerHTML = `
            <p class="empty-cart">
                Кошик поки порожній
            </p>
        `;
        cartTotal.textContent = "0 грн";
        return;
    }

    cartItems.innerHTML = "";
    let total = 0;

    cart.forEach(function(item, index) {
        total += item.price * item.quantity;

        const cartItem = document.createElement("div");
        cartItem.classList.add("cart-item");

        cartItem.innerHTML = `
            <div class="cart-item-details">
                <h4>${item.name}</h4>
                <p>${item.price} грн</p>
            </div>
            <div class="cart-item-controls">
                <button onclick="changeQuantity(${index}, -1)">-</button>
                <span>${item.quantity}</span>
                <button onclick="changeQuantity(${index}, 1)">+</button>
                <button class="remove-item" onclick="removeFromCart(${index})">🗑️</button>
            </div>
        `;

        cartItems.appendChild(cartItem);
    });

    cartTotal.textContent = `${total} грн`;
}

// Зміна кількості товару (+ / -)
function changeQuantity(index, delta) {
    cart[index].quantity += delta;
    if (cart[index].quantity <= 0) {
        cart.splice(index, 1);
    }
    updateCart();
}

// Видалення товару
function removeFromCart(index) {
    cart.splice(index, 1);
    updateCart();
}

// Відкрити кошик
cartButton.addEventListener("click", function() {
    cartModal.classList.add("active");
});

// Закрити кошик
closeCart.addEventListener("click", function() {
    cartModal.classList.remove("active");
});

// Закриття при натисканні за межами кошика
cartModal.addEventListener("click", function(event) {
    if (event.target === cartModal) {
        cartModal.classList.remove("active");
    }
});

// Оформлення замовлення
document.getElementById("checkoutButton").addEventListener("click", function() {
    if (cart.length === 0) {
        alert("Ваш кошик порожній!");
        return;
    }

    alert("Дякуємо за замовлення! 🍔");
    cart = [];
    updateCart();
    cartModal.classList.remove("active");
});