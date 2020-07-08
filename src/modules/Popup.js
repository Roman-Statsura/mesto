export default class Popup {
    constructor(buttonOpen,buttonClose,popup,popupZoom,form,container,createNewCard,api,improveUx,userId){
        this.buttonOpen = buttonOpen;
        this.buttonClose = buttonClose;
        this.popup = popup;
        this.popupZoom = popupZoom;
        this.form = form;
        this.container = container;
        this.createNewCard = createNewCard;
        this.api = api;
        this.improveUx = improveUx;
        this.userId = userId;
    }
    openAndCloseSomeForm() {
        this.popup.classList.toggle('popup_is-opened');
      }
    setEventListeners(){
        this.buttonOpen.addEventListener("click", ()=> this.openAndCloseSomeForm());
        this.buttonClose.addEventListener("click", ()=> this.openAndCloseSomeForm());
        this.form.addEventListener("submit", this.appendNewCard);
    }
    appendNewCard = (event) => {
        event.preventDefault();
        this.improveUx(true, this.popup.querySelector('.button')).improveLoadingNewPlace();
        const { name, link } = this.form.elements;
        this.api.addNewCardToTheServer(name.value, link.value)
            .then((res) => {
                this.container.addCard(this.createNewCard(res.name, res.link, res.likes, res._id, res.owner._id, this.popupZoom, this.api, this.userId.dataset.about));
                this.openAndCloseSomeForm();
                this.popup.querySelector('.button').classList.remove('popup__button_dark');
                this.popup.querySelector('.button').setAttribute('disabled', true);
                this.form.reset();
            })
            .catch(err => console.log(err))
            .finally ( ()=> this.improveUx(false, this.popup.querySelector('.button')).improveLoadingNewPlace());
      }
}
