class Api {
    constructor(config){
        this.url = config.url;
        this.token = config.headers.authorization
        this.headers = config.headers
    }
    getUserInformation = () => {
        return fetch(`${this.url}users/me`, {
            headers:  {
                authorization: this.token
            }
        })
        .then( res => {
            if (res.ok){
                return res.json();
            } 
            return Promise.reject;
        })
    }
    getCards = () => {
        return fetch(`${this.url}cards`, {
            headers:  {
                authorization: this.token
            }
        })
        .then( res => {
            if (res.ok){
                return res.json();
            }  
            return Promise.reject;
        })
    }
    editUserInformation = (name,about) => {
        return fetch(`${this.url}users/me`, {
            method: 'PATCH',
            headers: this.headers,
            body: JSON.stringify({
                name: name,
                about: about
              })
        })
        .then((res) => {
            if (res.ok){
            return res.json();
            }  
            return Promise.reject;
        })
    }
    addNewCardToTheServer = (name, link) => {
        return fetch(`${this.url}cards`, {
            method: 'POST',
            headers: this.headers,
            body: JSON.stringify({
                name: name,
                link: link
              })
        })
        .then((res) => {
            if (res.ok){
            return res.json();
            }  
            return Promise.reject;
        })
    }
    deleteCard = (id) => {
        return fetch(`${this.url}cards/${id}`, {
            method : 'DELETE',
            headers: {
                authorization: this.token
            }
        })
        .then (res => {
            if (res.ok){
                return res.json();
            }  
            return Promise.reject;
        })
    }
    likeCard = (cardId) => {
        return fetch(`${this.url}cards/like/${cardId}`, {
            method : 'PUT',
            headers: {
                authorization: this.token
            }
        })
        .then (res => {
            if (res.ok){
                return res.json();
            }  
            return Promise.reject;
        })
    }
    removeLikeFromCard = (cardId) => {
        return fetch(`${this.url}cards/like/${cardId}`, {
            method : 'DELETE',
            headers: {
                authorization: this.token
            }
        })
        .then (res => {
            if (res.ok){
                return res.json();
            }  
            return Promise.reject;
        })
    }
    changeAvatar = (avatarUrl) => {
        return fetch(`${this.url}users/me/avatar`, {
            method : 'PATCH',
            headers: this.headers,
            body: JSON.stringify({
                avatar: avatarUrl
              })
        })
        .then (res => {
            if (res.ok){
                return res.json();
            } 
            return Promise.reject;
        })
    }
}