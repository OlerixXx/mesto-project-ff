function setProfile(evt, name, description) {
  name.textContent = evt.currentTarget.elements.name.value;
  description.textContent = evt.currentTarget.elements.description.value;
}

function setFormInputsPopup(profileName, profileDescription, profileEditFormName, profileEditFormDescription) {
  const formName = profileEditFormName;
  const formDescription = profileEditFormDescription;
  formName.value = profileName.textContent;
  formDescription.value = profileDescription.textContent;
}

function flushForm(form) {
  form.reset();
}

export {setProfile, setFormInputsPopup, flushForm};