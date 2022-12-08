function ImagePopup(props){
    return(
    <div className={`popup popup_type_image ${props.card ? 'popup_opened' : ''}`}>
        <div className="popup__image-box">
            <img className="popup__image" src={props.card ? props.card.link : ''} alt={props.card ? props.card.name : ''}></img>
            <p className="popup__caption">{props.card ? props.card.name : ''}</p>
            <button className="popup__close button-image-close" type="button" aria-label="кнопка закрытия" onClick={props.onClose}></button>
        </div>      
    </div>
    )
}

export default ImagePopup;