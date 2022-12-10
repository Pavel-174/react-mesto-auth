import React from "react";
import PopupWithForm from "./PopupWithForm";

function EditAvatarPopup(props) {
  const ref = React.useRef();

  const [link, setLink] = React.useState('');
  const [isLinkInputValid, setLinkInputValid] = React.useState(true);
  const [linkValidationMessage, setLinkValidationMessage] = React.useState('');
  const [buttonSubmitState, setButtonSubmitState] = React.useState(false);
  const [isLinkInputInitial, setLinkInputInitial] = React.useState(true);

  function handleSubmit(evt) {
    evt.preventDefault();

    props.onSubmit({
      url: ref.current.value
    });
  }

  React.useEffect(() => {
    ref.current.value = '';
  }, [props.isOpen]);

  //Валидация формы
  function handleChange(evt) {
    setLink(evt.target.value);
    if (!evt.target.validity.valid) {
      setLinkInputInitial(false);
      setLinkInputValid(false);
      setLinkValidationMessage(evt.target.validationMessage);
    } else {
      setLinkInputInitial(false);
      setLinkInputValid(true);
    }
  }

  React.useEffect(() => {
    setLinkInputValid(true);
    setButtonSubmitState(false);
    setLinkInputInitial(true);
    setLink('');
  }, [props.isOpen]);

  React.useEffect(()=> {
    if (isLinkInputValid && !isLinkInputInitial) {
      setButtonSubmitState(true);
    } else {
      setButtonSubmitState(false);
    }
  }, [isLinkInputValid, isLinkInputInitial]);



    return(
        <PopupWithForm
          isOpen={props.isOpen}
          name={'avatar'}
          title='Обновить аватар'
          form={'form-avatar'}
          buttonTitle='Сохранить'
          onClose={props.onClose}
          onSubmit={handleSubmit}
          buttonSubmitState={buttonSubmitState}
        >
            <input 
            ref={ref} 
            id="avatar" 
            name="user-avatar" 
            type="url" 
            required 
            placeholder="Ссылка на аватар" 
            minLength="5"
            className={`popup__text ${!isLinkInputValid ? 'popup__text_type_error' : 'popup__text_type_ok'}`}
            onChange={handleChange}
            >
            </input>
            <span className={`popup__text-error ${!isLinkInputValid ? 'popup__text-error_active' : 'popup__text-error_inactive'}`} id="avatar-error">{linkValidationMessage}</span>
        </PopupWithForm>
    )
}

export default EditAvatarPopup;
