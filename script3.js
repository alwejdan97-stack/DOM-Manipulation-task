
const nameInput = document.getElementById("nameInput");
const priceInput = document.getElementById("priceInput");
const quantityInput = document.getElementById("quantityInput");
const addBtn = document.getElementById("addBtn");
const cartContainer = document.getElementById("cartContainer");
const totalDisplay = document.getElementById("totalDisplay");
const clearBtn = document.getElementById("clearBtn");

function addItem() {
    const nameValue = nameInput.value.trim();
    const priceValue = parseFloat(priceInput.value);
    const quantityValue = parseInt(quantityInput.value, 10);

    if (nameValue === "") {
        alert("Please enter a valid product name.");
        return;
    }
    if (isNaN(priceValue) || priceValue <= 0) {
        alert("Please enter a valid positive number for the price.");
        return;
    }
    if (isNaN(quantityValue) || quantityValue <= 0) {
        alert("Please enter a valid positive whole number for quantity.");
        return;
    }

    const cartItem = document.createElement("div");
    cartItem.className = "cart-item";
    
    cartItem.setAttribute("data-price", priceValue);

    cartItem.innerHTML = `
        <div class="item-details">
            <span class="item-name">${nameValue}</span>
            <span class="item-price-unit">$${priceValue.toFixed(2)} each</span>
        </div>
        <div class="quantity-controls">
            <button class="qty-btn minus-btn">−</button>
            <span class="item-quantity">${quantityValue}</span>
            <button class="qty-btn plus-btn">+</button>
        </div>
        <button class="remove-btn">Remove</button>
    `;

    cartContainer.appendChild(cartItem);

    calculateTotal();

    nameInput.value = "";
    priceInput.value = "";
    quantityInput.value = "";
}
function updateQuantity(itemElement, change) {
    const qtyDisplay = itemElement.querySelector(".item-quantity");
    let currentQty = parseInt(qtyDisplay.textContent, 10);
    
    currentQty += change;

    if (currentQty <= 0) {
        removeItem(itemElement);
    } else {
        qtyDisplay.textContent = currentQty;
        calculateTotal();
    }
}

function removeItem(itemElement) {
    itemElement.remove();
    calculateTotal();
}

function calculateTotal() {
    const allCartRows = cartContainer.querySelectorAll(".cart-item");
    let calculatedTotal = 0;

    allCartRows.forEach(row => {
        const unitPrice = parseFloat(row.getAttribute("data-price"));
        const currentQty = parseInt(row.querySelector(".item-quantity").textContent, 10);
        
        calculatedTotal += unitPrice * currentQty;
    });

    totalDisplay.textContent = `$${calculatedTotal.toFixed(2)}`;
}

function clearCart() {
    cartContainer.innerHTML = "";
    calculateTotal();
}

cartContainer.addEventListener("click", function(event) {
    const targetElement = event.target;
    const itemRow = targetElement.closest(".cart-item");

    if (!itemRow) return;

    if (targetElement.classList.contains("plus-btn")) {
        updateQuantity(itemRow, 1);
    } else if (targetElement.classList.contains("minus-btn")) {
        updateQuantity(itemRow, -1);
    } else if (targetElement.classList.contains("remove-btn")) {
        removeItem(itemRow);
    }
});
