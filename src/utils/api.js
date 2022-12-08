class Api {
    constructor({ baseUrl, headers }) {
      this._baseUrl = baseUrl;
      this._headers = headers;
    }
  
    _checkResponse(res) {
      if (res.ok) {
        return res.json();
      }
      return Promise.reject(`Ошибка: ${res.status}`);
    }

    getInitialCards() {
      return fetch(this._baseUrl + '/cards', {
        headers: this._headers
      })
        .then(res => this._checkResponse(res));
    }

    getUserInfo() {
      return fetch(this._baseUrl + '/users/me', {
        headers: this._headers
      })
        .then(res => this._checkResponse(res));
    }
  
    setUserInfo(data) {
        return fetch(this._baseUrl + '/users/me', {
          method: 'PATCH',
          headers: this._headers,
          body: JSON.stringify({
            name: data.name,
            about: data.about
          })
        })
          .then(res => this._checkResponse(res));
      }

    setUserAvatar(data) {
      return fetch(this._baseUrl + '/users/me/avatar', {
        method: 'PATCH',
        headers: this._headers,
        body: JSON.stringify({
          avatar: data.url
        })
      })
        .then(res => this._checkResponse(res));
    }
  
    likeCard(cardId) {
      return fetch(this._baseUrl + '/cards/' + cardId + '/likes ', {
        method: 'PUT',
        headers: this._headers
      })
        .then(res => this._checkResponse(res));
    }
  
    dislikeCard(cardId) {
      return fetch(this._baseUrl + '/cards/' + cardId + '/likes ', {
        method: 'DELETE',
        headers: this._headers
      })
        .then(res => this._checkResponse(res));
    }
  
    addNewCard(data) {
      const requestUrl = this._baseUrl + '/cards';
      return fetch(requestUrl, {
        method: 'POST',
        headers: this._headers,
        body: JSON.stringify({
          name: data.name,
          link: data.link
        })
      }).then(this._checkResponse);
    }
  
  
    removeCard(cardId) {
      return fetch(this._baseUrl + '/cards/' + cardId, {
        method: 'DELETE',
        headers: this._headers
      })
        .then(res => this._checkResponse(res));
    }
}

const api = new Api({
  baseUrl: 'https://mesto.nomoreparties.co/v1/cohort-52',
  headers: {
    authorization: '7dd14fa6-e13e-40d2-87d8-f2c7b5a18afc',
    'Content-Type': 'application/json'
  }
});

export default api;
