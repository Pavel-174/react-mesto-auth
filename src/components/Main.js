import React from 'react';
import addCardButton from '../images/Vector2.svg';
import Card from './Card';
import { CurrentUserContext } from "../contexts/CurrentUserContext";

function Main(props) {
    const currentUser = React.useContext(CurrentUserContext);

    return(
        <main>
            <section className="profile">
                <div className="profile__content">
                    <div className="profile__avatar">
                        <button className="profile__editpic" onClick={props.onEditAvatar}></button>
                        <img className="profile__image" src={currentUser.avatar} alt={currentUser.name}></img>
                    </div>
                    <div className="profile__name-box">
                        <h1 className="profile__name">{currentUser.name}</h1>
                        <button className="profile__button button-show" type="button" aria-label="кнопка редактирования профиля" onClick={props.onEditProfile}></button>
                        <p className="profile__profession">{currentUser.about}</p>
                    </div>
                    <button className="profile__button-photo button-show" type="button" aria-label="кнопка добавления фото" onClick={props.onAddPlace}>
                        <img src={addCardButton} alt="кнопка добавления фото"></img>
                    </button>
                </div>
            </section>
            <section className="photos">
                <ul className="photos__container" id="element-ul">
                    {props.cards.map((card, id) => (
                        <Card
                         key={id}
                         card={card}
                         link={card.link}
                         name={card.name}
                         onCardClick={props.onCardClick}
                         likes={card.likes.length}
                         onCardLike={props.onCardLike}
                         onCardDelete={props.onCardDelete}
                        />
                    ))}
                </ul>
            </section>
        </main>
    )

}

export default Main;