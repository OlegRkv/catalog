"use strict";
class Products {
  constructor() {
    this.classNameActive = 'product__button_active';
    this.labelAdd = 'добавить в корзину';
    this.labelRemove = 'в корзине';
  }

  handlerSetLocatStorage(element, id) {
    const {pushProduct, products} = localStorageUtil.putProducts(id);

    if (pushProduct) {
      element.classList.add(this.classNameActive);
      element.innerText = this.labelRemove;
    } else {
      element.classList.remove(this.classNameActive);
      element.innerText = this.labelAdd;
    }
  }

  render() {
    const productsStore = localStorageUtil.getProducts();
    let htmlCatalog = '';
    

    catalog.forEach(({id, name, img, price}) => {
      let activeClass = '';
      let activeText = '';

      if (productsStore.indexOf(id) === -1) {
        activeText = this.labelAdd;
      } else {
        activeClass = ' ' + this.classNameActive;
        activeText = this.labelRemove;
      }

      htmlCatalog += `
      <li class="catalog__item">
        <div class="product" id="${id}">
          <img class="product__img" src="${img}"/>
          <span class="product__descr">${name}</span>
          <span class="product__price">${price} ₽</span>
          <button class="button product__button${activeClass}" onclick="productsPage.handlerSetLocatStorage(this, '${id}');">${activeText}</button>
        </div>
      </li>
    `;
    });

    document.querySelector('.catalog__list').innerHTML = `${htmlCatalog}`;

  }
}

const productsPage = new Products();

productsPage.render();

class Cart {
  render() {

  }
}

const cart = new Cart();



function getValue() {
  const cartStore = localStorageUtil.getProducts();
  const cartValue = document.querySelector('.cart__count');

  if (cartStore.length >= 1) {
    cartValue.classList.add('cart__count_active');
  } else {
    document.querySelector('.cart__count').classList.remove('cart__count_active');
  }

  cartValue.innerText = `${cartStore.length}`;
}

getValue();

const productBtn = document.querySelectorAll('.product__button');

productBtn.forEach((item) => {
  item.addEventListener("click", () => getValue());
});



console.log(localStorageUtil.getProducts());