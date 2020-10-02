// импорт элементов галлереи

import galleryItems from "./gallery-items.js";

// Создание и рендер разметки по массиву данных и предоставленному шаблону.
const galleryElements = document.querySelector("ul.js-gallery");
const modalWindow = document.querySelector("div.lightbox");
const imgEl = document.querySelector(".lightbox__image");
const ovrlEl = document.querySelector(".lightbox__overlay ");
const btnCloseEl = document.querySelector(".lightbox__button");
const btnCountEl = document.querySelector(".lightbox__content");

// создание шаблона элемента
const galleryCollection = createImageGalery(galleryItems);

galleryElements.insertAdjacentHTML("beforeend", galleryCollection);

// Слушатели событий
galleryElements.addEventListener("click", onModalOpen);
ovrlEl.addEventListener("click", onCloseModalClick);
btnCloseEl.addEventListener("click", onModalClose);
ovrlEl.addEventListener("click", onBackDropClick);
window.addEventListener("keydown", onEscapePress);
document.addEventListener("keydown", onSliderClick);

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

  modalWindow.classList.add("is-open");

  imgEl.src = event.target.dataset.source;
  imgEl.alt = event.target.alt;
}

// закрытие модального окна по клику и удаление класса is-open, очистка значения атрибута src
function onModalClose() {
  modalWindow.classList.remove("is-open");
  imgEl.src = "";
}

// Закрытие модального окна по кнопке
function onCloseModalClick(event) {
  if (event.code === "Click") {
    onModalClose();
  }
}

// закрытие модального окна по бэкдропу
function onBackDropClick(event) {
  onModalClose();
}

// функция закрытия модального окна через Escape
function onEscapePress(event) {
  // без code окно закрывается при любом нажатии
  if (event.code === "Escape") {
    onModalClose();
  }
}

// функция перелистывания картинок влево и вправо
function onSliderClick(event) {
  let imgInx = galleryItems.findIndex((image) => image.original === imgEl.src);
  if (event.code === "ArrowLeft") {
    if (imgInx === 0) {
      imgInx += galleryItems.length;
    }
    imgInx -= 1;
  }

  if (event.code === "ArrowRight") {
    if (imgInx === galleryItems.length - 1) {
      imgInx = -1;
    }
    imgInx += 1;
  }

  imgEl.src = galleryItems[imgInx].original;
  imgEl.alt = galleryItems[imgInx].description;
}
