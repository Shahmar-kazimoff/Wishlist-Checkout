let openShopping = document.querySelector('.shopping');
let closeShopping = document.querySelector('.closeShopping');
let list = document.querySelector('.list');
let listCard = document.querySelector('.listCard');
let body = document.querySelector('body');
let total = document.querySelector('.total');
let quantity = document.querySelector('.quantity');
let removeAllButton = document.querySelector('.removeAllButton');

openShopping.addEventListener('click', () => {
    body.classList.add("active");
});

closeShopping.addEventListener('click', () => {
    body.classList.remove('active');
});

let products = [
    {
        id: 1,
        name: 'IPHONE',
        image: 'https://suprememobiles.in/cdn/shop/files/2_77f2d95b-9505-4bdb-9c36-68dae0d18ca2.jpg?v=1694774793',
        price: 3000
    },
    {
        id: 2,
        name: 'XIAOMI',
        image: 'https://itouchcommunications.com/wp-content/uploads/2023/03/Xiaomi-Redmi-12C.jpg',
        price: 1000
    },
    {
        id: 3,
        name: 'SAMSUNG',
        image: 'https://suprememobiles.in/cdn/shop/files/1_0e33ac91-83c7-4b73-b1b3-d70e99f6e37c.png?v=1701496647',
        price: 2500
    }
];

let listCards = [];

function initScript() {
    let list = document.querySelector('.list');
    products.forEach((value, key) => {
        let productDiv = document.createElement('div');
        productDiv.classList.add('product');
        productDiv.innerHTML = `
            <img src="${value.image}"/>
            <div class="title">${value.name}</div>
            <div class="price">${value.price.toLocaleString()} Azn</div>
            <button onclick="addToCard(${key})">Add To Cart</button>
        `;
        list.appendChild(productDiv);
    });

    removeAllButton.addEventListener('click', removeAllFromCard);
}

initScript();

function addToCard(key) {
    if (listCards[key] == null) {
        listCards[key] = { ...products[key], quantity: 1, clickCount: 1 };
    } else {
        listCards[key].quantity++;
    }
    listCards[key].price = listCards[key].quantity * products[key].price * listCards[key].clickCount;

    reloadCard();
}

function changeQuantityInCard(key, newQuantity) {
    if (listCards[key] != null) {
        newQuantity = Math.max(0, newQuantity);
        listCards[key].quantity = newQuantity;
        listCards[key].price = newQuantity * products[key].price * listCards[key].clickCount;
    }
    reloadCard();
}

function removeFromCard(key) {
    listCards.splice(key, 1);
    reloadCard();
}

function removeAllFromCard() {
    listCards = [];
    reloadCard();
}

function reloadCard() {
    listCard.innerHTML = '';
    let count = 0;
    let totalprice = 0;

    listCards.forEach((value, key) => {
        if (value != null) {
            totalprice += value.price;
            count += value.quantity;
            let productDiv = document.createElement('li');
            productDiv.innerHTML = `
                <img src="${value.image}"/>
                <div class="title">${value.name}</div>
                <div class="price">${value.price.toLocaleString()} Azn</div>
                <div class="quantity">${value.quantity}</div>
                <div class="button-container">
                    <button onclick="changeQuantityInCard(${key}, ${value.quantity - 1})">-</button>
                    <div class="count">${value.quantity}</div>
                    <button onclick="changeQuantityInCard(${key}, ${value.quantity + 1})">+</button>
                    <button class="remove-button" onclick="removeFromCard(${key})">Remove</button>
                </div>
            `;
            listCard.appendChild(productDiv);
        }
    });

    total.innerText = totalprice.toLocaleString();
    quantity.innerText = count;
}
