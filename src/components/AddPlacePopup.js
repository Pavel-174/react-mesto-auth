import React from "react";
import PopupWithForm from "./PopupWithForm";

function AddPlacePopup(props) {
    const [name, setName] = React.useState('');
    const [link, setLink] = React.useState('');

    const [isNameInputValid, setNameInputValid] = React.useState(true);
    const [isLinkInputValid, setLinkInputValid] = React.useState(true);
    const [nameValidationMessage, setNameValidationMessage] = React.useState('');
    const [linkValidationMessage, setLinkValidationMessage] = React.useState('');
    const [buttonSubmitState, setButtonSubmitState] = React.useState(false);
    const [isNameInputInitial, setNameInputInitial] = React.useState(true);
    const [isLinkInputInitial, setLinkInputInitial] = React.useState(true);
  
    function handleNameChange(evt) {
      setName(evt.target.value);
      checkNameValidation(evt.target);
    }
  
    function handleLinkChange(evt) {
      setLink(evt.target.value);
      checkLinkValidation(evt.target);
    }
  
    function handleSubmit(evt) {
      evt.preventDefault();
  
      props.onSubmit({
        name: name,
        link: link
      });
    }
  
    // React.useEffect(() => {
    //   if (props.isOpen) {
    //     setName('');
    //     setLink('');
    //   }
    // }, [props.isOpen]);

    //Валидация формы
  React.useEffect(() => {
    setName('');
    setLink('');
    setNameInputValid(true);
    setLinkInputValid(true);
    setButtonSubmitState(false);
    setNameInputInitial(true);
    setLinkInputInitial(true);
  }, [props.isOpen]);

  React.useEffect(()=> {
    if (isNameInputValid && isLinkInputValid && !isNameInputInitial && !isLinkInputInitial) {
      setButtonSubmitState(true);
    } else {
      setButtonSubmitState(false);
    }
  }, [isNameInputValid, isLinkInputValid, isNameInputInitial, isLinkInputInitial ]);

  function checkNameValidation(inputElement) {
    if (!inputElement.validity.valid) {
      setNameInputInitial(false);
      setNameInputValid(false);
      setNameValidationMessage(inputElement.validationMessage);
    } else {
      setNameInputInitial(false);
      setNameInputValid(true);
    }
  }

  function checkLinkValidation(inputElement) {
    if (!inputElement.validity.valid) {
      setLinkInputInitial(false);
      setLinkInputValid(false);
      setLinkValidationMessage(inputElement.validationMessage);
    } else {
      setLinkInputInitial(false);
      setLinkInputValid(true);
    }
  }

    return(
        <PopupWithForm
          isOpen={props.isOpen}
          name={'type_photo'}
          title='Новое место'
          form={'photo-add'}
          buttonTitle='Сохранить'
          onClose={props.onClose}
          onSubmit={handleSubmit}
          buttonSubmitState={buttonSubmitState}
        >
            <input 
            required 
            className={`popup__text ${!isNameInputValid ? 'popup__text_type_error' : 'popup__text_type_ok'}`}
            id="popup__place" 
            type="text" 
            placeholder="Название" 
            name="card-name" 
            minLength="2" 
            maxLength="30" 
            onChange={handleNameChange}
            value={name}
            >
            </input>
            <span className={`popup__text-error ${!isNameInputValid ? 'popup__text-error_active' : 'popup__text-error_inactive'}`} id="popup__place-error">{nameValidationMessage}</span>
            <input
            required 
            className={`popup__text ${!isLinkInputValid ? 'popup__text_type_error' : 'popup__text_type_ok'}`} 
            id="popup__link" 
            type="url" 
            placeholder="Ссылка на картинку" 
            name="card-image" 
            onChange={handleLinkChange}
            value={link}
            >
            </input>
            <span className={`popup__text-error ${!isLinkInputValid ? 'popup__text-error_active' : 'popup__text-error_inactive'}`} id="popup__link-error">{linkValidationMessage}</span>
        </PopupWithForm>
    )    
}

export default AddPlacePopup;