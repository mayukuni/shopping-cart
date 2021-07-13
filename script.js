// const { add } = require("cypress/types/lodash");
// const url = 'https://api.mercadolibre.com/sites/MLB';
const cartItems = document.querySelector('.cart__items');
const items = document.querySelector('.items');
// const addButton = document.querySelector('.item__add');
const cart = document.querySelector('.cart');

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

function cartItemClickListener(event) {
  // coloque seu código aqui
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
    // alert('Funcionou!')
};
// addToCart('MLB1341706310');

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

const fetchProduct = () => {
  fetch('https://api.mercadolibre.com/sites/MLB/search?q=computador')
    .then((response) => response.json())
      .then((data) => {
        data.results.forEach(({ id: sku, title: name, thumbnail: image }) => {
          const product = createProductItemElement({ id: sku, title: name, thumbnail: image });
          items.appendChild(product);
        });
      });
  // const response = await fetch(`${url}/search?q=computador`);
  // const product = await response.json();
  // return product;
};

window.onload = () => {
  fetchProduct();
  // const product = fetchProduct();
  // product.results.forEach((products) => {
  //   const element = createProductItemElement(products);
  //   items.appendChild(element);
  // });

  // const element = createCartItemElement();
  // const items = document.querySelector('.cart__items');
  // items.appendChild(element);
};
