class PopupZoom {
    constructor(buttonClose,popup,popupImage){
        this.buttonClose = buttonClose;
        this.popup = popup;
        this.popupImage = popupImage;
    }

    setEventListeners(){
        this.buttonClose.addEventListener("click", ()=> this.openAndCloseSomeForm());
    }
    openAndCloseSomeForm() {
        this.popup.classList.toggle('popup_is-opened');
    }
    openImagePopup = (e) => {
        if (e.target.classList.contains('place-card__image')) {
            this.openAndCloseSomeForm();
            this.popupImage.setAttribute('src', e.target.dataset.about);
        }
    }
}
