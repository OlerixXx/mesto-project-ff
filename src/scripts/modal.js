function openModal(popup) {
  popup.classList.add('popup_is-opened');
  popup.addEventListener('click', evt => {
    if (evt.target.classList.contains('popup__close') || 
    evt.target.classList.contains('popup')) {
      closeModal(popup)
    }
  });
  document.addEventListener('keydown', evt => keydownHandler(evt, popup));
}

function closeModal(popup) {
  popup.classList.remove('popup_is-opened');
}

function keydownHandler(evt, popup) {
  if (evt.key === 'Escape') {
    closeModal(popup);
    document.removeEventListener('keydown', evt => keydownHandler(evt, popup));
  }
}

export {openModal, closeModal}