import './pages/index.css';
import { initialCards } from './scripts/cards.js';
import { createCard, toggleLike } from './scripts/card.js';
import { setProfile, setFormInputsPopup, flushForm } from './scripts/forms.js';
import { openModal, closeModal, createCloseModalListener } from './scripts/modal.js';
import { enableValidation, clearValidation } from './scripts/validation.js';
import { getInitialUserInfo, getInitialCards, updateProfile, createNewCard, deleteCard, updateAvatarImage } from './scripts/api.js';

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

let cardIdOnDelete;
let cardElementOnDelete;
const cardDeletePopup = document.querySelector('.popup_type_delete');
const cardDeleteSubmitButton = cardDeletePopup.querySelector('.popup__button');

const avatarEditButton = document.querySelector('.profile__image-edit-button')
const avatarEditPopup = document.querySelector('.popup_type_avatar');
const avatarEditForm = document.querySelector('.popup__form');

const profileEditButton = document.querySelector('.profile__edit-button');
const profileImage = document.querySelector('.profile__image');
const profileName = document.querySelector('.profile__title');
const profileDescription = document.querySelector('.profile__description');
const profileEditForm = document.forms['edit-profile'];
const profileEditFormName = profileEditForm.elements.name;
const profileEditFormDescription = profileEditForm.elements.description;
const profileEditPopup = document.querySelector('.popup_type_edit');

const likeActiveClass = 'card__like-button_is-active';
const buttonInactiveClass = 'popup__button_inactive';

// Инициализиция профиля
getInitialUserInfo()
  .then((result) => {
    profileImage.style.backgroundImage = `url(\'${result.avatar}\')`;
    profileName.textContent = result.name;
    profileDescription.textContent = result.about;
  })
  .catch((err) => {
    console.log(err);
});

// Инициализиция карточек
getInitialCards()
  .then((results) => {
    console.log(results[0]);
    results[0].forEach(element => {
      cardsContainer.append(createCard(
      element,
      results[1],
      cardTemplate,
      openDeleteModalHandler,
      toggleLike,
      likeActiveClass,
      openCardImageHandler
    ))})
  })
  .catch((err) => {
    console.log(err);
})

// Открыть окно редактирования картинки профиля
avatarEditButton.addEventListener('click', () => {
  openModal(avatarEditPopup, closeModal);
})

// Редактировать картинку профиля
avatarEditForm.addEventListener('submit', evt => {
  evt.preventDefault();
  const newLink = evt.currentTarget.elements.link.value;
  renderLoading(true, avatarEditForm);
  updateAvatarImage(newLink)
    .then((result) => {
      profileImage.style.backgroundImage = `url(\'${result.avatar}\')`;;
    })
    .catch((err) => {
      console.log(err);
    })
    .finally(() => renderLoading(false, avatarEditForm));
  closeModal(avatarEditPopup);
  flushForm(avatarEditForm, buttonInactiveClass);
})

// Закрыть окно с картинкой профиля
createCloseModalListener(avatarEditPopup);

// Открыть окно редактирования профиля
profileEditButton.addEventListener('click', () => {
  setFormInputsPopup(profileName, profileDescription, 
    profileEditFormName, profileEditFormDescription);
  openModal(profileEditPopup, closeModal);
  clearValidation(profileEditPopup);
});

// Редактировать профиль
profileEditForm.addEventListener('submit', evt => {
  evt.preventDefault();
  const newProfileName = evt.currentTarget.elements.name.value;
  const newProfileDescription = evt.currentTarget.elements.description.value;
  renderLoading(true, profileEditForm)
  updateProfile(newProfileName, newProfileDescription)
    .then((result) => {
      setProfile(result.name, result.about, profileName, profileDescription);
    })
    .catch((err) => {
      console.log(err);
    })
    .finally(() => renderLoading(false, profileEditForm));
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
  renderLoading(true, profileEditForm)
  createNewCard(cardAddFormInputName.value, cardAddFormInputUrl.value)
    .then((results) => {
      cardsContainer.prepend(createCard(
        results[0],
        results[1],
        cardTemplate,
        openDeleteModalHandler,
        toggleLike,
        likeActiveClass,
        openCardImageHandler)
      );
    })
    .catch((err) => {
      console.log(err);
    })
    .finally(() => renderLoading(false, profileEditForm));
  closeModal(cardAddPopup);
  flushForm(cardAddForm, buttonInactiveClass);
})

// Закрыть окно с добавлением карточки
createCloseModalListener(cardAddPopup);

// Открыть окно подтверждения удаления карточки
function openDeleteModalHandler(cardElement, cardId) {
  cardIdOnDelete = cardId;
  cardElementOnDelete = cardElement;
  openModal(cardDeletePopup, closeModal);
}

// Удалить карточку
cardDeleteSubmitButton.addEventListener('click', evt => {
  evt.preventDefault();
  deleteCard(cardIdOnDelete)
    .then((result) => {
      cardElementOnDelete.remove();
    })
    .catch((err) => {
      console.log(err);
  })
  closeModal(cardDeletePopup);
});

// Закрыть окно с подтверждением удаления карточки
createCloseModalListener(cardDeletePopup);

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

function renderLoading(bool, form) {
  const button = form.querySelector('.popup__button');
  bool ? button.textContent = 'Сохранение...' : button.textContent = 'Сохранить';
}

// Включить валидацию форм
enableValidation({
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__button',
  inactiveButtonClass: 'popup__button_inactive',
  inputErrorClass: 'popup__input_type_error'
});