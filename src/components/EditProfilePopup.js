import React, { useEffect, useState } from "react";
import PopupWithForm from "./PopupWithForm";
import { CurrentUserContext } from "../contexts/CurrentUserContext";

function EditProfilePopup(props){
    
  const [name, setName] = React.useState('');
  const [description, setDescription] = React.useState('');
  const currentUser = React.useContext(CurrentUserContext);

  const [isNameInputValid, setNameInputValid] = React.useState(true);
  const [isAboutInputValid, setAboutInputValid] = React.useState(true);
  const [nameValidationMessage, setNameValidationMessage] = React.useState('');
  const [aboutValidationMessage, setAboutValidationMessage] = React.useState('');
  const [buttonSubmitState, setButtonSubmitState] = React.useState(false);

  function handleNameChange(evt) {
    setName(evt.target.value);
    checkNameValidation(evt.target);
  }

  function handleDescriptionChange(evt) {
    setDescription(evt.target.value);
    checkAboutValidation(evt.target);
  }

  function handleSubmit(evt) {
    evt.preventDefault();
  
    props.onSubmit({
      name,
      about: description,
    });
  } 

  React.useEffect(() => {
    if (props.isOpen) {
      setName(currentUser.name);
      setDescription(currentUser.about);
    }
  }, [props.isOpen, currentUser]);

  //Валидация формы
  React.useEffect(()=> {
    if (isNameInputValid && isAboutInputValid) {
      setButtonSubmitState(true);
    } else {
      setButtonSubmitState(false);
    }
  }, [isNameInputValid, isAboutInputValid]);

  function checkNameValidation(inputElement) {
    if (!inputElement.validity.valid) {
      setNameInputValid(false);
      setNameValidationMessage(inputElement.validationMessage);
    } else {
      setNameInputValid(true);
    }
  }

  function checkAboutValidation(inputElement) {
    if (!inputElement.validity.valid) {
      setAboutInputValid(false);
      setAboutValidationMessage(inputElement.validationMessage);
    } else {
      setAboutInputValid(true);
    }
  }

    return(
        <PopupWithForm
          isOpen={props.isOpen}
          name={'profile'}
          title='Редактировать профиль'
          form={'name-profession'}
          buttonTitle='Сохранить'
          onClose={props.onClose}
          onSubmit ={handleSubmit}
          buttonSubmitState={buttonSubmitState}
        >
            <input 
            required 
            className={`popup__text ${!isNameInputValid ? 'popup__text_type_error' : 'popup__text_type_ok'}`}
            id="popup__name" 
            type="text" 
            placeholder="Имя" 
            name="name" 
            minLength="2" 
            maxLength="40" 
            onChange={handleNameChange}
            value={name}
            >
            </input>
            <span className={`popup__text-error ${!isNameInputValid ? 'popup__text-error_active' : 'popup__text-error_inactive'}`} id="popup__name-error">{nameValidationMessage}</span>
            <input 
            required 
            className={`popup__text ${!isAboutInputValid ? 'popup__text_type_error' : 'popup__text_type_ok'}`}
            id="popup__profession" 
            type="text" 
            placeholder="О себе" 
            name="profession" 
            minLength="2" 
            maxLength="200" 
            onChange={handleDescriptionChange}
            value={description}
            >
            </input>
            <span className={`popup__text-error ${!isAboutInputValid ? 'popup__text-error_active' : 'popup__text-error_inactive'}`} id="popup__profession-error">{aboutValidationMessage}</span>     
        </PopupWithForm>   
    )    
}

export default EditProfilePopup;