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

const catalogButton = document.querySelectorAll('.product-card__to-basket');
const orderButton = document.querySelector('.card__button');
const modalButton = document.querySelector('.modal__button');
const orderPopup = document.querySelector('.modal');

for (var i = 0; i < catalogButton.length; i++) {
  catalogButton[i].addEventListener('click', function (evt) {
    evt.preventDefault();
    orderPopup.classList.add('modal--open');
    console.log('клик')
  });
}

orderPopup.addEventListener('click', (evt) => {
  if (evt.target.classList.contains('modal')) {
    orderPopup.classList.remove('modal--open');
    orderPopup.classList.add('modal--close');
  }
});

modalButton.addEventListener('click', function (evt) {
  evt.preventDefault();
  orderPopup.classList.remove('modal--open');
  orderPopup.classList.add('modal--close');
});

// index modal

orderButton.addEventListener('click', function (evt) {
  evt.preventDefault();
  orderPopup.classList.remove('modal--close');
  orderPopup.classList.add('modal--open');
  modalItem.focus();
});

modalButton.addEventListener('click', function (evt) {
  evt.preventDefault();
  orderPopup.classList.remove('modal--open');
  orderPopup.classList.add('modal--close');
});

