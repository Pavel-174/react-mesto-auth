function InfoTooltip(props) {
    return (
      <div className={`popup ${props.isOpen ? 'popup_opened' : ''}`} onClick={props.onCloseClick}>
        <div className="popup__login">
          <img className="popup__picture" src={props.image} alt={props.title}/>
          <h2 className="popup__info">{props.title}</h2>
          <button className="popup__close button-close" type="button" aria-label="кнопка закрытия" onClick={props.onClose}></button>
        </div>
      </div>
    );
  }
  
  export default InfoTooltip;