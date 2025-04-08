const cardTemplate = document.querySelector('#card-template').content;
const placesList = document.querySelector('.places__list');

initialCards.forEach(element => {
  placesList.append(createCard(element.name, element.link));
});

function createCard (name, imgLink) {
  const cardElement = cardTemplate.querySelector('.places__item').cloneNode(true);
  cardElement.querySelector('.card__image').src = imgLink;
  cardElement.querySelector('.card__description .card__title').textContent = name;

  const deleteButton = cardElement.querySelector('.card__delete-button');
  deleteButton.addEventListener('click', evt => removeCard(evt));
  return cardElement;
}

function removeCard(evt) {
  evt.target.parentElement.remove();
}