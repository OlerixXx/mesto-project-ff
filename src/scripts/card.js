import { addLikeCard, deleteLikeCard } from "./api";

function createCard (element, profile, cardTemplate, openDeleteModalHandler, toggleLike, openCardImageHandler) {
  const cardElement = cardTemplate.querySelector('.places__item').cloneNode(true);
  const cardImage = cardElement.querySelector('.card__image');
  const cardTitle = cardElement.querySelector('.card__title');
  const cardDeleteButton = cardElement.querySelector('.card__delete-button');
  const cardLikeButton = cardElement.querySelector('.card__like-button');
  const cardLikeCounter = cardElement.querySelector('.card__like-counter');
  const likeActiveClass = 'card__like-button_is-active';

  cardImage.src = element.link;
  cardImage.alt = element.name;
  cardTitle.textContent = element.name;
  cardLikeCounter.textContent = element.likes.length;
  cardLikeButton.addEventListener('click', () => toggleLike(cardLikeButton, likeActiveClass, cardLikeCounter, element._id));
  cardImage.addEventListener('click', evt => openCardImageHandler(evt));

  if (isAlreadyToggled(element, profile)) {
    cardLikeButton.classList.toggle(likeActiveClass);
  }

  if (!isCardOwner(element, profile)) {
    cardDeleteButton.remove();
  } else {
    cardDeleteButton.addEventListener('click', () => openDeleteModalHandler(cardElement, element._id));
  }

  return cardElement;
}

function toggleLike(cardLikeButton, likeActiveClass, cardLikeCounter, cardId) {
  if (cardLikeButton.classList.toggle(likeActiveClass)) {
    addLikeCard(cardId)
      .then((result) => {
        setLikeCounter(result, cardLikeCounter);
      })
      .catch((err) => {
        cardLikeButton.classList.toggle(likeActiveClass);
        console.log(err);
    })
  } else {
    deleteLikeCard(cardId)
      .then((result) => {
        setLikeCounter(result, cardLikeCounter);
      })
      .catch((err) => {
        cardLikeButton.classList.toggle(likeActiveClass);
        console.log(err);
    });
  }
}

function isCardOwner(element, profile) {
  return profile._id === element.owner._id;
}

function isAlreadyToggled(element, profile) {
  return element.likes.map(like => like._id)
    .some(likeId => likeId === profile._id);
}

function setLikeCounter(element, cardLikeCounter) {
  cardLikeCounter.textContent = element.likes.length;
}

export {createCard, toggleLike};