import './pages/index.css';
import { initialCards, createCard, deleteCard } from './scripts/cards.js';
import { setProfile, setImagePopup, setFormInputsPopup, flushForm } from './scripts/forms.js';
import { openModal, closeModal } from './scripts/modal.js';

const cardTemplate = document.querySelector('#card-template').content;
const cardsContainer = document.querySelector('.places__list');
initialCards.forEach(element => {
  cardsContainer.append(createCard(element, deleteCard, cardTemplate));
});

const profileEditButton = document.querySelector('.profile__edit-button');
const profileEditPopup = document.querySelector('.popup_type_edit');
const profileName = document.querySelector('.profile__title');
const profileDescription = document.querySelector('.profile__description');
const profileEditForm = document.forms['edit-profile'];
profileEditButton.addEventListener('click', () => {
  // Открыть окно редактирования профиля
  setFormInputsPopup(profileName, profileDescription, profileEditForm);
  openModal(profileEditPopup, closeModal);
});

profileEditForm.addEventListener('submit', evt => {
  // Редактировать профиль
  evt.preventDefault();
  setProfile(evt, profileName, profileDescription);
  closeModal(profileEditPopup);
});

const cardAddButton = document.querySelector('.profile__add-button');
const cardAddPopup = document.querySelector('.popup_type_new-card');
cardAddButton.addEventListener('click', () => {
  // Открыть окно добавления новой карточки
  openModal(cardAddPopup, closeModal);
});

const cardAddForm = document.forms['new-place'];
cardAddForm.addEventListener('submit', evt => {
  // Добавить новую карточку
  evt.preventDefault();
  const inputName = cardAddForm.elements['place-name'].value;
  const inputUrl = cardAddForm.elements.link.value;
  cardsContainer.prepend(createCard(
    {name: inputName, link: inputUrl}, 
    deleteCard,
    cardTemplate)
  );
  closeModal(cardAddPopup);
  flushForm(cardAddForm);
})

const cardImagePopup = document.querySelector('.popup_type_image');
cardsContainer.addEventListener('click', evt => {
  if (evt.target.classList.contains('card__image')) {
    // Если был клик по картинке карточки, открыть картинку в полном размере
    setImagePopup(evt.target, cardImagePopup);
    openModal(cardImagePopup, closeModal);
  } else if (evt.target.classList.contains('card__like-button')) {
    // Если был клик по лайку на карточке, переключить состояние лайка
    evt.target.classList.toggle('card__like-button_is-active');
  }
});