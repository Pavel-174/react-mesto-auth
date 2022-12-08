import React from "react";
import PopupWithForm from "./PopupWithForm";
import { CurrentUserContext } from "../contexts/CurrentUserContext";

function EditProfilePopup(props){
    
  const [name, setName] = React.useState('');
  const [description, setDescription] = React.useState('');
  const currentUser = React.useContext(CurrentUserContext);

  function handleNameChange(evt) {
    setName(evt.target.value);
  }

  function handleDescriptionChange(evt) {
    setDescription(evt.target.value);
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

    return(
        <PopupWithForm
          isOpen={props.isOpen}
          name={'profile'}
          title='Редактировать профиль'
          form={'name-profession'}
          buttonTitle='Сохранить'
          onClose={props.onClose}
          onSubmit ={handleSubmit}
        >
            <input 
            required 
            className="popup__text" 
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
            <span className="popup__text-error popup__text-error_name" id="popup__name-error"></span>
            <input 
            required 
            className="popup__text" 
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
            <span className="popup__text-error popup__text-error_profession" id="popup__profession-error"> </span>     
        </PopupWithForm>   
    )    
}

export default EditProfilePopup;