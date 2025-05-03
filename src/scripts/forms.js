function setProfile(evt, name, description) {
  name.textContent = evt.currentTarget.elements.name.value;
  description.textContent = evt.currentTarget.elements.description.value;
}

function setImagePopup(target, cardImagePopup) {
  const img = cardImagePopup.querySelector('.popup__image');
  const caption = cardImagePopup.querySelector('.popup__caption');
  img.src = target.src;
  img.alt = target.alt;
  caption.textContent = target.parentElement.querySelector('.card__title').textContent;
  
}

function setFormInputsPopup(profileName, profileDescription, form) {
  const formName = form.elements.name;
  const formDescription = form.elements.description;
  formName.value = profileName.textContent;
  formDescription.value = profileDescription.textContent;
}

function flushForm(form) {
  form.reset();
}

export {setProfile, setImagePopup, setFormInputsPopup, flushForm};