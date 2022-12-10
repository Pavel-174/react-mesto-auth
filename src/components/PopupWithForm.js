function PopupWithForm(props){
    return (
      <div>
        <div className={`popup popup_${props.name} ${props.isOpen ? `popup_opened`: ""}`}>
        <div className="popup__container">
            <h2 className="popup__header">{props.title}</h2>
            <form className={'popup__form popup__form-${props.name}'} name={props.form} onSubmit={props.onSubmit} method="post" noValidate>
                {props.children}
                <button className={`popup__save button-hide ${!props.buttonSubmitState ? 'popup__save_invalid' :'popup__save_valid'}`} disabled={!props.buttonSubmitState ? true :''} type="submit">{props.buttonTitle}</button>
            </form>
            <button className="popup__close button-close" type="button" aria-label="кнопка закрытия" onClick={props.onClose}></button>
        </div>
        </div>
      </div>    
    )
}

export default PopupWithForm;

// 
// className="popup__save popup__save_invalid button-hide"