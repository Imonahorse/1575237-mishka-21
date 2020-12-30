// menu

const navMain = document.querySelector('.main-nav');
const navToggle = document.querySelector('.main-nav__toggle');

navMain.classList.remove('main-nav--nojs');

navToggle.addEventListener('click', function () {
  if (navMain.classList.contains('main-nav--closed')) {
    navMain.classList.remove('main-nav--closed');
    navMain.classList.add('main-nav--opened');
  } else {
    navMain.classList.add('main-nav--closed');
    navMain.classList.remove('main-nav--opened');
  }
});

// catalog modal

const catalogButtons = document.querySelectorAll('.product-card__to-basket');
const orderButton = document.querySelector('.card__button');
const orderPopup = document.querySelector('.modal');
const modalInput = document.querySelector('.modal__input');

const openPopup = (evt) => {
  evt.preventDefault();
  orderPopup.classList.add('modal--close');
  orderPopup.classList.add('modal--open');
  modalInput.focus();
}

if (catalogButtons) {
  for (let i = 0; i < catalogButtons.length; i++) {
    catalogButtons[i].addEventListener('click', (evt) => openPopup(evt));
  }
}

orderPopup.addEventListener('click', function (evt) {
  if (evt.target.classList.contains('modal')) {
    orderPopup.classList.remove('modal--open');
    orderPopup.classList.add('modal--close');
  }
});

// index modal

orderButton.addEventListener('click', (evt) => openPopup(evt));



