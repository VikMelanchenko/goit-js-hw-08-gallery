// импорт элементов галлереи

import galleryItems from "./gallery-items.js";

// Создание и рендер разметки по массиву данных и предоставленному шаблону.
const galleryElements = document.querySelector("ul.js-gallery");
const modalWindow = document.querySelector("div.lightbox");
const imgEl = document.querySelector(".lightbox__image");
const ovrlEl = document.querySelector(".lightbox__overlay ");
const btnCloseEl = document.querySelector(".lightbox__button");

const galleryCollection = createImageGalery(galleryItems);

// создание шаблона элемента
galleryElements.insertAdjacentHTML("beforeend", galleryCollection);

// Слушатели событий
galleryElements.addEventListener("click", onModalOpen);
ovrlEl.addEventListener("click", onCloseModalClick);
btnCloseEl.addEventListener("click", onModalClose);
ovrlEl.addEventListener("click", onBackDropClick);

// шаблонная строка
function createImageGalery(galleryItems) {
  return galleryItems
    .map(({ preview, original, description }) => {
      return `<li class="gallery__item">
  <a
    class="gallery__link"
    href="${original}"
  >
    <img
      class="gallery__image"
      src="${preview}"
      data-source="${original}"
      alt="${description}"
    />
  </a>
</li>`;
    })
    .join("");
}

// открытие модального окна, делегирование и доступ к изображению
function onModalOpen(event) {
  event.preventDefault();

  const targetClick = event.target;
  console.log("event target: ", targetClick);

  if (targetClick.nodeName !== "IMG") {
    return;
  }

  document.addEventListener("click", onCloseModalClick);
  modalWindow.classList.add("is-open");
  window.addEventListener("keydown", onEscapePress);

  imgEl.src = event.target.dataset.source;
  imgEl.alt = event.target.alt;
}

// закрытие модального окна по клику и удаление класса is-open, очистка значения атрибута src
function onModalClose() {
  document.removeEventListener("click", onCloseModalClick);
  window.removeEventListener("keydown", onEscapePress);

  modalWindow.classList.remove("is-open");
  imgEl.src = "";
}

// Закрытие модального окна по кнопке
function onCloseModalClick(event) {
  if (event.code === "Click") {
    onModalClose();
  }
}

// закрытие модалки по клику на бэкдроп

function onBackDropClick(event) {
  // сравниваем событие и проверяем кликаем ли мы в backdrop
  if (event.currentTarget === event.target) {
    console.log("click on backdrop");
  }
  // вызываем функцию закрытия модального окна
  onModalClose();
}

// функция закрытия модального окна через Escape
function onEscapePress(event) {
  // без code окно закрывается при любом нажатии
  if (event.code === "Escape") {
    onModalClose();
  }
}
