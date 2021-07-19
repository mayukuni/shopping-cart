// const { add } = require("cypress/types/lodash");
// const url = 'https://api.mercadolibre.com/sites/MLB';
const cartItems = document.querySelector('.cart__items');
const items = document.querySelector('.items');
const cart = document.querySelector('.cart');

// Requisitos 1, 2 e 5 feitos com a ajuda do Jonathan Morais.
// Requisito 4 feito com a ajuda da Mayu.

// requisito 5
let itemPrices = 0;
// const totalPricee = document.createElement('div');
// totalPricee.className = 'total-price';
const totalPrice = document.querySelector('.total-price');
// // /requisito 5

function createProductImageElement(imageSource) {
  const img = document.createElement('img');
  img.className = 'item__image';
  img.src = imageSource;
  return img;
}

function createCustomElement(element, className, innerText) {
  const e = document.createElement(element);
  e.className = className;
  e.innerText = innerText;
  return e;
}

// requisito 5
const sumTotalValue = (prices) => {
    itemPrices += prices;
    const teste = parseFloat(itemPrices);
    // totalPrice.innerText = teste;
    totalPrice.innerHTML = `Total: ${teste}`;
  };
// /requisito 5

const saveOnLocalStorage = () => {
  const savedItems = cartItems.innerHTML;
  localStorage.setItem('savedItems', savedItems);
  const totalPriceItens = totalPrice.innerHTML;
  localStorage.setItem('totalPrice', totalPriceItens);
};

function cartItemClickListener(event) {
  event.target.remove();
  saveOnLocalStorage();
}

function createCartItemElement({ sku, name, salePrice }) {
  const li = document.createElement('li');
  li.className = 'cart__item';
  li.innerText = `SKU: ${sku} | NAME: ${name} | PRICE: $${salePrice}`;
  li.addEventListener('click', cartItemClickListener);
  console.log(cart);
  console.log(li);
  cart.appendChild(cartItems);
  cartItems.appendChild(li);
  saveOnLocalStorage();
  sumTotalValue(salePrice);
  return li;
}

function getSkuFromProductItem(item) {
  return item.querySelector('span.item__sku').innerText;
}

const addToCart = (event) => {
  // const response = fetch(`https://api.mercadolibre.com/items/${event}`);
  // const product = response.json;
  // // return product;
  const idItem = getSkuFromProductItem(event.target.parentNode);
    fetch(`https://api.mercadolibre.com/items/${idItem}`)
    .then((response) => {
        response.json()
          .then(({ id: sku, title: name, price: salePrice }) => {
              // const {id: sku, title: name, price: salePrice} = object;
              // console.log(({ id: sku, title: name, price: salePrice }));
              createCartItemElement({ sku, name, salePrice });
            })
            .catch((error) => alert(`${error}`));
      });
};

function createProductItemElement({ id: sku, title: name, thumbnail: image }) {
  const section = document.createElement('section');
  section.className = 'item';
  section.appendChild(createCustomElement('span', 'item__sku', sku));
  section.appendChild(createCustomElement('span', 'item__title', name));
  section.appendChild(createProductImageElement(image));
  section.appendChild(createCustomElement('button', 'item__add', 'Adicionar ao carrinho!'))
    .addEventListener('click', addToCart);
  return section;
}

// requisito 7
const addLoadingText = () => {
  const loadingText = document.createElement('p');
  loadingText.className = 'loading';
  loadingText.innerHTML = 'loading';
  return loadingText;
};

const fetchProduct = () => {
  const loadingText = addLoadingText();
  items.appendChild(loadingText);

  fetch('https://api.mercadolibre.com/sites/MLB/search?q=computador')
    .then((response) => response.json())
      .then((data) => {
        data.results.forEach(({ id: sku, title: name, thumbnail: image }) => {
          const product = createProductItemElement({ id: sku, title: name, thumbnail: image });
          items.appendChild(product);
        });
        loadingText.remove();
      });
  // const response = await fetch(`${url}/search?q=computador`);
  // const product = await response.json();
  // return product;
};

const loadLocalStorage = () => {
  const savedItems = localStorage.getItem('savedItems');
  cartItems.innerHTML = savedItems;
  const totalPriceItens = localStorage.getItem('totalPrice');
  totalPrice.innerText = totalPriceItens;
};

// requisito 6
const clearCart = () => {
  cartItems.innerHTML = '';
  totalPrice.innerHTML = '';
  itemPrices = 0;
  saveOnLocalStorage();
};

const clearButton = document.querySelector('.empty-cart');
clearButton.addEventListener('click', clearCart);

window.onload = () => {
  fetchProduct();
  loadLocalStorage();
  // const product = fetchProduct();
  // product.results.forEach((products) => {
  //   const element = createProductItemElement(products);
  //   items.appendChild(element);
  // });

  // const element = createCartItemElement();
  // const items = document.querySelector('.cart__items');
  // items.appendChild(element);
};
