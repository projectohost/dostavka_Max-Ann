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

        cart.push({
            name: name,
            price: price
        });

        updateCart();

        cartModal.classList.add("active");

    });

});


// Оновлення кошика
function updateCart() {

    cartCount.textContent = cart.length;

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

        total += item.price;


        const cartItem = document.createElement("div");

        cartItem.classList.add("cart-item");


        cartItem.innerHTML = `
            <div>
                <h4>${item.name}</h4>
                <p>${item.price} грн</p>
            </div>

            <button
                class="remove-item"
                onclick="removeFromCart(${index})">
                Видалити
            </button>
        `;


        cartItems.appendChild(cartItem);

    });


    cartTotal.textContent = `${total} грн`;
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
document
    .getElementById("checkoutButton")
    .addEventListener("click", function() {

        if (cart.length === 0) {

            alert("Ваш кошик порожній!");

            return;
        }

        alert("Дякуємо за замовлення! 🍔");

        cart = [];

        updateCart();

        cartModal.classList.remove("active");

    });