// User Cart
const iconCart = document.querySelector('#icon-cart');
const userCart = document.querySelector('.user-cart');
const closeCart = document.querySelector('#cart-close');

if (document.readyState == 'loading') {
    document.addEventListener('DOMContentLoaded', ready)
} else {
    ready();
}

// Function to make work remove button from cart, change items quantity, add items to cart
function ready() {
    let removeBtns = document.getElementsByClassName('remove-cart');
    console.log(removeBtns);
    for (let i = 0; i < removeBtns.length; i++) {
        const buttonRev = removeBtns[i];
        buttonRev.addEventListener("click", removeCartItem);
    }
    let quantityInputs = document.getElementsByClassName('quantity-cart');
    for (let i = 0; i < quantityInputs.length; i++) {
        const input = quantityInputs[i];
        input.addEventListener("change", quantityChanged);
    }
    let addToCart = document.getElementsByClassName('add-cart');
    for (let i = 0; i < addToCart.length; i++) {
        const button = addToCart[i];
        button.addEventListener("click", addCartClick);
    }
}


// Fuction to add items to cart
function addCartClick(e) {
    let button = e.target;
    let shopProducts = button.parentElement;
    let title = shopProducts.getElementsByClassName('title-product')[0].innerText;
    let price = shopProducts.getElementsByClassName('price')[0].innerText;
    let prodImg = shopProducts.getElementsByClassName('img-product')[0].src;
    console.log(title, price, prodImg);
}

// Function for changes in quantity
function quantityChanged(e) {
    let input = e.target;
    if (isNaN(input.value) || input.value <= 0){
        input.value = 1;
    }
    totalRefresh();
}


// Function to remove items from cart
function removeCartItem(e) {
    let buttonClicked = e.target
    buttonClicked.parentElement.remove();
    totalRefresh();
}


// Open Cart event
iconCart.onclick = () => {
    userCart.classList.add("active");
};

// Close Cart Event
closeCart.onclick = () => {
    userCart.classList.remove("active");
}

// Total Refresh
function totalRefresh() {
    let cartCont = document.getElementsByClassName('cart-content')[0];
    let cartBxs = document.getElementsByClassName('cart-box'); 
    let total = 0;
    for (let i = 0; i < cartBxs.length; i++) {
        const cartBox = cartBxs[i];
        const priceItem = cartBox.getElementsByClassName("cart-pprice")[0];
        const quantityItem = cartBox.getElementsByClassName('quantity-cart')[0];
        const price = parseFloat(priceItem.innerText.replace("$", ""));
        const quanty = quantityItem.value;
        total = total + price * quanty;
        total = Math.round(total * 100) / 100; //if the price comes with cents

        document.getElementsByClassName('total-price')[0].innerText = '$' + total;
    }
}