function setProfile(newName, newDescription, name, description) {
  name.textContent = newName;
  description.textContent = newDescription;
}

function setFormInputsPopup(profileName, profileDescription, profileEditFormName, profileEditFormDescription) {
  const formName = profileEditFormName;
  const formDescription = profileEditFormDescription;
  formName.value = profileName.textContent;
  formDescription.value = profileDescription.textContent;
}

function setImageFormInputsPopup() {
  
}

function flushForm(form, buttonInactiveClass) {
  const button = form.querySelector('.popup__button');
  form.reset();
  button.classList.add(buttonInactiveClass);
  button.disabled = true;
}

export {setProfile, setFormInputsPopup, flushForm};