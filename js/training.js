// второй вариант

// const makeGalleryContainer = ({ preview, original, description }) => {
//   const galleryEl = document.createElement("li");
//   galleryEl.classList.add("gallery__item");

//   const imageLinkEl = document.createElement("a");
//   imageLinkEl.classList.add("gallery__link");

//   const imageEl = document.createElement("img");
//   imageEl.classList.add("gallery__image");
//   imageEl.src = preview;
//   imageEl.dataset.source = original;
//   imageEl.alt = description;

//   imageLinkEl.appendChild(imageEl);
//   galleryEl.append(imageLinkEl);

//   return galleryEl;
// };

// const galleryContainer = galleryItems.map(makeGalleryContainer);

// galleryElements.append(...galleryContainer);

// function onGalleryElementsClick(event) {
//   const isImageEl = event.target.classList.contains("gallery__item");

//   if (!isImageEl) {
//     return;
//   }
// }
