class Card {
    constructor(name, link, likes, cardId, cardOwnerId, popupZoom,api,userId){
        this.name = name;
        this.link = link;
        this.likes = likes;
        this.cardId= cardId;
        this.cardOwnerId = cardOwnerId;
        this.popupZoom = popupZoom;
        this.api = api;
        this.userId = userId;
    }
    createCard(){
        const placeCard = document.createElement('div');
        const image = document.createElement('div');
        const deleteButton = document.createElement('button');
        const description = document.createElement('div');
        const cardName = document.createElement('h3');
        const likeContainer = document.createElement('div');
        const likeButton = document.createElement('button');
        const numberOfLikes = document.createElement('p');
      
        placeCard.classList.add('place-card');
        image.classList.add('place-card__image');
        deleteButton.classList.add('place-card__delete-icon');
        description.classList.add('place-card__description');
        cardName.classList.add('place-card__name');
        likeContainer.classList.add('place-card__like-container');
        likeButton.classList.add('place-card__like-icon');
        numberOfLikes.classList.add('place-card__likes');
      
        image.appendChild(deleteButton);
        placeCard.appendChild(image);
        description.appendChild(cardName);
        likeContainer.appendChild(likeButton);
        likeContainer.appendChild(numberOfLikes);
        description.appendChild(likeContainer);
        placeCard.appendChild(description);
        this.cardElement = placeCard;
        
        image.style.backgroundImage = `url(${this.link})`;
        cardName.textContent = this.name;
        numberOfLikes.textContent = this.likes.length;
        image.setAttribute('data-about', this.link);
        placeCard.setAttribute('data-id', this.cardId);
        
        this.likeRelevanceCheck(likeButton);
        this.showDeleteButton(deleteButton);
        this.setEventListeners();
        return placeCard;
    }
    setEventListeners(){
        this.cardElement.querySelector('.place-card__like-icon').addEventListener('click', this.like);
        this.cardElement.querySelector('.place-card__delete-icon').addEventListener('click', this.deleteCard);
        this.cardElement.querySelector('.place-card__image').addEventListener('click', this.popupZoom.openImagePopup);
      }
    like = (event) => {
        event.target.classList.toggle('place-card__like-icon_liked');
            if (event.target.classList.contains('place-card__like-icon_liked')){
                this.api.likeCard(this.cardId)
                    .then((res) => {
                        event.target.closest('.place-card__like-container').querySelector('.place-card__likes').textContent = res.likes.length;
                    })
                    .catch(err => console.log(err))
            }
            else {
                this.api.removeLikeFromCard(this.cardId)
                .then((res) => {
                    event.target.closest('.place-card__like-container').querySelector('.place-card__likes').textContent = res.likes.length; 
                })
                .catch(err => console.log(err))
            }
    }
    likeRelevanceCheck = (likeButton) => {
        for (const elem of this.likes){
            if (elem._id === this.userId){
                likeButton.classList.add('place-card__like-icon_liked');
            }
        }
    }
    showDeleteButton = (deleteButton) => {
        if (this.cardOwnerId === this.userId){
            deleteButton.classList.add('place-card__delete-icon_activate');
        }
    }
    deleteCard = (event) => {
        const target = event.target;
        if (target.classList.contains('place-card__delete-icon')) {
            if (confirm("Вы действительно хотите удалить эту карточку?")){
            this.api.deleteCard(this.cardId)
                .then(()=>{
                    const parent = target.closest('.place-card');
                    this.removeListener(this.cardElement.querySelector('.place-card__delete-icon'), this.deleteCard);
                    this.removeListener(this.cardElement.querySelector('.place-card__like-icon'), this.like);
                    this.removeListener(this.cardElement.querySelector('.place-card__image'), this.popupZoom.openImagePopup);
                    parent.remove();
                })
                .catch(err => console.log(err));
        }
        } 
    }
    removeListener = (target, func) => {
        target.removeEventListener('click', func);
    }
}
