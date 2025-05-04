function openModal(popup) {
  popup.classList.add('popup_is-opened');
  document.addEventListener('keydown', closeModalByEsc);
}

function closeModal(popup) {
  popup.classList.remove('popup_is-opened');
}

function createCloseModalListener(popup) {
  popup.addEventListener('click', evt => {
    if (evt.target.classList.contains('popup__close') || 
    evt.target.classList.contains('popup')) {
      closeModal(popup)
    }
  });
}

function closeModalByEsc(evt) {
  if (evt.key === 'Escape') {
    const popup = document.querySelector('.popup_is-opened');    
    closeModal(popup);
    document.removeEventListener('keydown', closeModalByEsc);
  }
}

export {openModal, closeModal, createCloseModalListener}