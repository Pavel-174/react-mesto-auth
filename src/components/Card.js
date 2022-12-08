import React from "react";
import { CurrentUserContext } from "../contexts/CurrentUserContext";

function Card(props) {
    const currentUser = React.useContext(CurrentUserContext);
    const isOwn = props.card.owner._id === currentUser._id;
    const isLiked = props.card.likes.some(i => i._id === currentUser._id);
  
    const cardDeleteButtonClassName = (
      `photo__delete ${isOwn ? 'photo__delete_visible' : ''}`
    );
  
    const cardLikeButtonClassName = (
      `photo__like ${isLiked ? 'photo__like_active' : ''}`
    );
  
    function handleClick() {
      props.onCardClick(props.card);
    }
  
    function handleLikeClick() {
      props.onCardLike(props.card);
    }
  
    function handleDeleteClick() {
      props.onCardDelete(props.card);
    }

    return(
            <li className="photo__box" id="element-li">
                <img className="photo__image" id="photo__image" src={props.link} alt={props.name} onClick={handleClick}></img>
                <button className={cardDeleteButtonClassName} type="button" aria-label="кнопка удалить" onClick={handleDeleteClick}></button>
                <div className="photo__text-box">
                    <h2 className="photo__text" id="photo__text">{props.name}</h2>
                    <div className="photo__like-box">
                        <button className={cardLikeButtonClassName} type="button" aria-label="кнопка лайк" onClick={handleLikeClick}></button>
                        <p className="photo__like-count">{props.likes}</p>
                    </div>
                </div>
            </li> 
    )
}

export default Card;