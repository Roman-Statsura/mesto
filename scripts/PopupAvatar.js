class PopupAvatar {
    constructor(userInfoPhoto, popup, form, api){
        this.userInfoPhoto = userInfoPhoto;
        this.popup = popup;
        this.form = form;
        this.api = api;
    }
    openAndCloseSomeForm() {
        this.popup.classList.toggle('popup_is-opened');
    }
    setEventListeners(){
        this.userInfoPhoto.addEventListener("click", ()=> this.openAndCloseSomeForm());
        this.popup.querySelector('.popup__close').addEventListener("click", ()=> this.openAndCloseSomeForm());
        this.form.addEventListener("submit", this.varyAvatar);
    }
    varyAvatar = (event) => {
        event.preventDefault();
        const link = this.form.elements.link;
        this.api.changeAvatar(link.value)
            .then ((res) =>{
                this.userInfoPhoto.style.backgroundImage = `url(${res.avatar})`;
            })
            .catch(err => console.log(err));

        this.openAndCloseSomeForm();
        this.popup.querySelector('.button').classList.remove('popup__button_dark');
        this.popup.querySelector('.button').setAttribute('disabled', true);
        this.form.reset();
    }
}