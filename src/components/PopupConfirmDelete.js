import PopupWithForm from "./PopupWithForm";

function PopupConfirmDelete(props){
    return(
        <PopupWithForm
          isOpen={props.isOpen}
          name={'delete'}
          title='Вы уверены?'
          form={'form-delete'}
          buttonTitle='Да'
          onClose={props.onClose}
        >
            <input id="deleted" name="confirm-delete" type="hidden" required className="popup__text"></input>
        </PopupWithForm>
    )    
}

export default PopupConfirmDelete;