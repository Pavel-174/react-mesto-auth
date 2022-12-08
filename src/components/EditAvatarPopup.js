import React from "react";
import PopupWithForm from "./PopupWithForm";

function EditAvatarPopup(props) {
  const ref = React.useRef();

  function handleSubmit(evt) {
    evt.preventDefault();

    props.onSubmit({
      url: ref.current.value
    });
  }

  React.useEffect(() => {
    ref.current.value = '';
  }, [props.isOpen]);


    return(
        <PopupWithForm
          isOpen={props.isOpen}
          name={'avatar'}
          title='Обновить аватар'
          form={'form-avatar'}
          buttonTitle='Сохранить'
          onClose={props.onClose}
          onSubmit={handleSubmit}
        >
            <input 
            ref={ref} 
            id="avatar" 
            name="user-avatar" 
            type="url" 
            required 
            placeholder="Ссылка на аватар" 
            minLength="5" 
            className="popup__text"
            >
            </input>
            <span className="popup__text-error popup__text-error_avatar" id="avatar-error">Вы пропустили это поле.</span>
        </PopupWithForm>
    )
}

export default EditAvatarPopup;
