import './pages/index.css';
import { initialCards } from './scripts/cards.js';
import { createCard, deleteCard, toggleLike } from './scripts/card.js';
import { setProfile, setFormInputsPopup, flushForm } from './scripts/forms.js';
import { openModal, closeModal, createCloseModalListener } from './scripts/modal.js';

const cardTemplate = document.querySelector('#card-template').content;
const cardsContainer = document.querySelector('.places__list');
const cardAddButton = document.querySelector('.profile__add-button');
const cardAddForm = document.forms['new-place'];
const cardAddFormInputName = cardAddForm.elements['place-name'];
const cardAddFormInputUrl = cardAddForm.elements.link;
const cardAddPopup = document.querySelector('.popup_type_new-card');
const cardImagePopup = document.querySelector('.popup_type_image');
const cardImagePopupImg = cardImagePopup.querySelector('.popup__image');
const cardImagePopupCaption = cardImagePopup.querySelector('.popup__caption');

const profileEditButton = document.querySelector('.profile__edit-button');
const profileName = document.querySelector('.profile__title');
const profileDescription = document.querySelector('.profile__description');
const profileEditForm = document.forms['edit-profile'];
const profileEditFormName = profileEditForm.elements.name;
const profileEditFormDescription = profileEditForm.elements.description;
const profileEditPopup = document.querySelector('.popup_type_edit');

// Инициализируем все карточки из базы данных
initialCards.forEach(element => {
  cardsContainer.append(createCard(
    element, 
    cardTemplate, 
    deleteCard, 
    toggleLike, 
    openCardImageHandler)
  );
});

// Открыть окно редактирования профиля
profileEditButton.addEventListener('click', () => {
  setFormInputsPopup(profileName, profileDescription, 
    profileEditFormName, profileEditFormDescription);
  openModal(profileEditPopup, closeModal);
});

// Редактировать профиль
profileEditForm.addEventListener('submit', evt => {
  evt.preventDefault();
  setProfile(evt, profileName, profileDescription);
  closeModal(profileEditPopup);
});

// Закрыть окно с профилем
createCloseModalListener(profileEditPopup);

// Открыть окно добавления новой карточки
cardAddButton.addEventListener('click', () => {
  openModal(cardAddPopup, closeModal);
});

// Добавить новую карточку
cardAddForm.addEventListener('submit', evt => {
  evt.preventDefault();
  cardsContainer.prepend(createCard(
    {name: cardAddFormInputName.value, link: cardAddFormInputUrl.value},
    cardTemplate,
    deleteCard,
    toggleLike,
    openCardImageHandler)
  );
  closeModal(cardAddPopup);
  flushForm(cardAddForm);
})

// Закрыть окно с добавлением карточки
createCloseModalListener(cardAddPopup);

// Открыть картинку на карточке
function openCardImageHandler(evt) {
  setImagePopup(evt.target);
  openModal(cardImagePopup, closeModal);
}

// Закрыть окно с картинкой карточки
createCloseModalListener(cardImagePopup);

function setImagePopup(target) {
  cardImagePopupImg.src = target.src;
  cardImagePopupImg.alt = target.alt;
  cardImagePopupCaption.textContent = target.parentElement.querySelector('.card__title').textContent;
}