import React from "react";
import PopupWithForm from "./PopupWithForm";

function AddPlacePopup(props) {
    const [name, setName] = React.useState('');
    const [link, setLink] = React.useState('');
  
    function handleNameChange(evt) {
      setName(evt.target.value);
    }
  
    function handleLinkChange(evt) {
      setLink(evt.target.value);
    }
  
    function handleSubmit(evt) {
      evt.preventDefault();
  
      props.onSubmit({
        name: name,
        link: link
      });
    }
  
    React.useEffect(() => {
      if (props.isOpen) {
        setName('');
        setLink('');
      }
    }, [props.isOpen]);

    return(
        <PopupWithForm
          isOpen={props.isOpen}
          name={'type_photo'}
          title='Новое место'
          form={'photo-add'}
          buttonTitle='Сохранить'
          onClose={props.onClose}
          onSubmit={handleSubmit}
        >
            <input 
            required 
            className="popup__text" 
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
            <span className="popup__text-error popup__text-error_place" id="popup__place-error"> </span>
            <input
            required 
            className="popup__text" 
            id="popup__link" 
            type="url" 
            placeholder="Ссылка на картинку" 
            name="card-image" 
            onChange={handleLinkChange}
            value={link}
            >
            </input>
            <span className="popup__text-error popup__text-error_link" id="popup__link-error"> </span>
        </PopupWithForm>
    )    
}

export default AddPlacePopup;