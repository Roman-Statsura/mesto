import Popup from "./Popup";

export default class UserInfoPopup extends Popup{
    constructor(buttonOpen,buttonClose,popup,userInfo,form,profileName,job,api,improveUx){
        super(buttonOpen,buttonClose,popup);
        this.userInfo = userInfo;
        this.form = form;
        this.profileName = profileName;
        this.job = job;
        this.api = api;
        this.improveUx = improveUx;
    }
    setEventListeners(){
        this.buttonOpen.addEventListener("click", ()=> this.openAndCloseSomeForm());
        this.buttonOpen.addEventListener("click",  this.userInfo.addInitialText);
        this.buttonClose.addEventListener("click", ()=> this.openAndCloseSomeForm());
        this.form.addEventListener("submit", this.editProfile);
    }
    editProfile = (event) => {
        event.preventDefault();

        this.improveUx(true, this.popup.querySelector('.button')).improveLoadingEditPopup();
        const { name, link } = this.form.elements;
        this.api.editUserInformation(name.value,link.value)
            .then(() => {
                this.userInfo.textRender();
                this.openAndCloseSomeForm();
            })
            .catch(err => console.log(err))
            .finally ( ()=> this.improveUx(false, this.popup.querySelector('.button')).improveLoadingEditPopup());
      }
}



