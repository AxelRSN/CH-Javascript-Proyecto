// User Cart
const iconCart = document.querySelector('#icon-cart');
const userCart = document.querySelector('.user-cart');
const closeCart = document.querySelector('#cart-close');

if (document.readyState == 'loading') {
    document.addEventListener('DOMContentLoaded', ready)
} else {
    ready();
}

// Function to make work remove button from cart, change items quantity, add items to cart, button buy work
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
    document.getElementsByClassName('btn-buy')[0].addEventListener("click", btnBuyClick);
}


// Fuction to add items to cart
function addCartClick(e) {
    let button = e.target;
    let shopProducts = button.parentElement;
    let title = shopProducts.getElementsByClassName('title-product')[0].innerText;
    let price = shopProducts.getElementsByClassName('price')[0].innerText;
    let prodImg = shopProducts.getElementsByClassName('img-product')[0].src;
    addProductCart(title, price, prodImg);
    totalRefresh();
}

function addProductCart(title, price, prodImg) {
    let cartBoxShop = document.createElement("div");
    cartBoxShop.classList.add('cart-box')
    let cartItems = document.getElementsByClassName('cart-content')[0];
    let cartItemsNames = cartItems.getElementsByClassName('cart-ptitle');
    for (let i = 0; i < cartItemsNames.length; i++) {
        if (cartItemsNames[i].innerText == title){
            alert('Add more from the cart');
        return;
        }
    }
    let cartBoxContent = `
                    <img src='${prodImg}' alt="" class="cart-img">
                    <div class="detail-box">
                        <h3 class="cart-ptitle">${title}</h3>
                        <h3 class="cart-pprice">${price} MXN</h3>
                        <input type="number" value="1" class="quantity-cart">
                    </div>
                    <i class='bx bx-trash remove-cart' ></i>`;

cartBoxShop.innerHTML = cartBoxContent;
cartItems.append(cartBoxShop);
cartBoxShop.getElementsByClassName('remove-cart')[0].addEventListener("click", removeCartItem);
cartBoxShop.getElementsByClassName('quantity-cart')[0].addEventListener("change", quantityChanged);
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
    }
        total = Math.round(total * 100) / 100; //if the price comes with cents

        document.getElementsByClassName('total-price')[0].innerText = '$' + total;
    
}

// Button Buy

function btnBuyClick() {
    alert('Thank you for making your order')
    const contentCart = document.getElementsByClassName('cart-content')[0];
    while (contentCart.hasChildNodes()){
        contentCart.removeChild(contentCart.firstChild)
    }
    totalRefresh();
}