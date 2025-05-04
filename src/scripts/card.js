function createCard (element, cardTemplate, deleteCard, toggleLike, openCardImageHandler) {
  const cardElement = cardTemplate.querySelector('.places__item').cloneNode(true);
  const cardImage = cardElement.querySelector('.card__image');
  const cardTitle = cardElement.querySelector('.card__title');
  const cardDeleteButton = cardElement.querySelector('.card__delete-button');
  const cardLikeButton = cardElement.querySelector('.card__like-button');
  cardImage.src = element.link;
  cardImage.alt = element.name;
  cardTitle.textContent = element.name;
  cardDeleteButton.addEventListener('click', () => deleteCard(cardElement));
  cardLikeButton.addEventListener('click', () => toggleLike(cardLikeButton));
  cardImage.addEventListener('click', evt => openCardImageHandler(evt));
  return cardElement;
}

function toggleLike(cardLikeButton) {
  cardLikeButton.classList.toggle('card__like-button_is-active');
}

function deleteCard(cardElement) {
  cardElement.remove();
}

export {createCard, deleteCard, toggleLike};