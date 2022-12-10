import React, { useEffect, useState } from "react";
import Header from './Header';
import Main from './Main';
import Footer from './Footer';
import PopupWithForm from './PopupWithForm';
import ImagePopup from './ImagePopup';
import EditAvatarPopup from './EditAvatarPopup';
import AddPlacePopup from './AddPlacePopup';
import PopupConfirmDelete from './PopupConfirmDelete';
import EditProfilePopup from './EditProfilePopup';
import api from '../utils/api.js';
import { CurrentUserContext } from "../contexts/CurrentUserContext";
import { Route, Routes, Navigate, useNavigate } from "react-router-dom";
import Login from "./LogIn";
import Register from "./Register";
import * as auth from "../utils/auth";
import ProtectedRoute from "./ProtectedRoute";
import InfoTooltip from "./InfoTooltip";
import registered from "../images/reg-ok.svg";
import mistake from "../images/mistake.svg";

function App() {
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = React.useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = React.useState(false);
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = React.useState(false);
  const [selectedCard, setSelectedCard] = React.useState(null);
  const [isProfilePopupOpened, setIsProfilePopupOpened] = React.useState(false)
  
  const [currentUser, setCurrentUser] = React.useState({});

  const [cards, setCards] = React.useState([]);

  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [emailName, setEmailName] = useState(null);
  const [popupImage, setPopupImage] = useState("");
  const [popupTitle, setPopupTitle] = useState("");
  const [infoTooltip, setInfoTooltip] = useState(false);
  const navigate = useNavigate();


  function onRegister(email, password) {
    auth.newUser(email, password).then(() => {
      setPopupImage(registered);
      setPopupTitle("Вы успешно зарегистрировались!");
      navigate("/signin");
    }).catch(() => {
      setPopupImage(mistake);
      setPopupTitle("Что-то пошло не так! Попробуйте ещё раз.");
    }).finally(handleInfoTooltip);
  }

  function onLogin(email, password) {
    auth.loginUser(email, password).then((res) => {
      localStorage.setItem("jwt", res.token);
      setIsLoggedIn(true);
      setEmailName(email);
      navigate("/");
    })
    .catch(() => {
      setPopupImage(mistake);
      setPopupTitle("Что-то пошло не так! Попробуйте ещё раз.");
      handleInfoTooltip();
    });
  }

  useEffect(() => {
    const jwt = localStorage.getItem("jwt");
    if (jwt) {
      auth.getToken(jwt).then((res) => {
        if (res) {
          setIsLoggedIn(true);
          setEmailName(res.data.email);
        }
      }).catch((err) => {
        console.error(err);
      });
    }
  }, []);

  useEffect(() => {
    if (isLoggedIn === true) {
      navigate("/");
    }
  }, [isLoggedIn, navigate]);

  function onSignOut() {
    setIsLoggedIn(false);
    setEmailName(null);
    navigate("/signin");
    localStorage.removeItem("jwt");
  }

  useEffect(() => {
    if (isLoggedIn) {
      Promise.all([api.getUserInfo(), api.getInitialCards()])
        .then(([user, cards]) => {
          setCurrentUser(user);
          setCards(cards);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }, [isLoggedIn]);

  function handleUpdateUser(data) {
    api.setUserInfo(data).then((newUser) => {
      setCurrentUser(newUser);
      closeAllPopups();
    }).catch((err) => {
      console.error(err);
    });
  }

  function handleCardLike(card) {
    const isLiked = card.likes.some((i) => i._id === currentUser._id);
  
    if (!isLiked) {
      api.likeCard(card._id).then((newCard) => {
        setCards((state) => state.map((c) => (c._id === card._id ? newCard : c)));
      }).catch((err) => {
        console.error(err);
      });
    } else {
      api.dislikeCard(card._id).then((newCard) => {
        setCards((state) => state.map((c) => (c._id === card._id ? newCard : c)));
      }).catch((err) => {
        console.error(err);
      });
    }
  }

  function handleCardDelete(card) {
    api.removeCard(card._id).then(() => {
      setCards((items) => items.filter((c) => c._id !== card._id && c));
    }).catch((err) => {
      console.error(err);
    });
  }
  
  function handleAddPlaceSubmit(data) {
    api.addNewCard(data).then((newCard) => {
      setCards([newCard, ...cards]);
      closeAllPopups();
    }).catch((err) => {
      console.error(err);
    });
  }
  
  function handleUpdateAvatar(data) {
    api.setUserAvatar(data).then((newAvatar) => {
      setCurrentUser(newAvatar);
      closeAllPopups();
    }).catch((err) => {
      console.error(err);
    });
  }

  function handleEditAvatarClick() {
    setIsEditAvatarPopupOpen(true);
  }

  function handleEditProfileClick() {
    setIsEditProfilePopupOpen(true);
  }

  function handleAddPlaceClick() {
    setIsAddPlacePopupOpen(true);
  }

  function handleCardClick(card) {
    setSelectedCard(card);
  }

  function handleInfoTooltip() {
    setInfoTooltip(true);
  }

  function handlePopupCloseClick(evt) {
    if (evt.target.classList.contains('popup')) {
      closeAllPopups();
    }
  }

  function closeAllPopups() {
    setIsProfilePopupOpened(false);
    setIsEditAvatarPopupOpen(false);
    setIsEditProfilePopupOpen(false);
    setIsAddPlacePopupOpen(false);
    setSelectedCard(null);
    setInfoTooltip(false);
  }

  useEffect(() => {
    if (isProfilePopupOpened || isEditAvatarPopupOpen || isEditProfilePopupOpen || isAddPlacePopupOpen || selectedCard || infoTooltip) {
      function handleEsc(evt) {
        if (evt.key === 'Escape') {
          closeAllPopups();
        }
      }

      document.addEventListener('keydown', handleEsc);

      return () => {
        document.removeEventListener('keydown', handleEsc);
      }
    }
  }, [isProfilePopupOpened, isEditAvatarPopupOpen, isEditProfilePopupOpen, isAddPlacePopupOpen, selectedCard, infoTooltip]);

  return (
  <CurrentUserContext.Provider value={currentUser}>
    <div className="page">
      <Routes>
        <Route path="/signin" element={
          <>
            <Header title="Регистрация" route="/signup"/>
            <Login onLogin={onLogin} />
          </>
        } />
        <Route path="/signup" element={
          <>
            <Header title="Войти" route="/signin"/>
            <Register onRegister={onRegister} />
          </>
        } />
        <Route exact path="/" element={
          <>
            <Header title="Выйти" mail={emailName} onClick={onSignOut} route="" />
            <ProtectedRoute
              component={Main}
              onEditAvatar={handleEditAvatarClick}
              onEditProfile={handleEditProfileClick}
              onAddPlace={handleAddPlaceClick}
              onCardClick={handleCardClick}
              cards={cards}
              onCardLike={handleCardLike}
              onCardDelete={handleCardDelete}
              isLogged={isLoggedIn}/>
            <Footer />
          </>
        } />
        <Route path="*" element={<Navigate to={isLoggedIn ? "/" : "/signin"}/>} />
      </Routes>
      <PopupWithForm />
      <ImagePopup 
        card={selectedCard}
        onClose={closeAllPopups}
       />
      <EditAvatarPopup 
        isOpen={isEditAvatarPopupOpen}
        onClose={closeAllPopups}
        onCloseClick={handlePopupCloseClick}
        onSubmit={handleUpdateAvatar}
      />
      <AddPlacePopup 
        isOpen={isAddPlacePopupOpen}
        onClose={closeAllPopups}
        onCloseClick={handlePopupCloseClick}
        onSubmit={handleAddPlaceSubmit}
      />
      <PopupConfirmDelete 
      // isOpen={}
        onCloseClick={handlePopupCloseClick} 
      />
      <EditProfilePopup 
        isOpen={isEditProfilePopupOpen}
        onClose={closeAllPopups}
        onCloseClick={handlePopupCloseClick}
        onSubmit={handleUpdateUser}
      />
      <InfoTooltip
        image={popupImage} 
        title={popupTitle} 
        isOpen={infoTooltip} 
        onCloseClick={handlePopupCloseClick}
        onClose={closeAllPopups} 
      />
    </div>
  </CurrentUserContext.Provider>
  );
}

export default App;