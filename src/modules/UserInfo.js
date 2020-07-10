export default class UserInfo {
    constructor(editInputName,editInputJob,profileName,job,popup,userInfoPhoto,api,userId){
        this.editInputName = editInputName;
        this.editInputJob = editInputJob;
        this.profileName = profileName;
        this.job = job;
        this.popup = popup;
        this.userInfoPhoto = userInfoPhoto;
        this.api = api;
        this.userId = userId;
    }
    addInitialText = () =>{
        this.editInputName.value = this.profileName.textContent;
        this.editInputJob.value = this.job.textContent;
        
        this.popup.querySelector('.button').removeAttribute('disabled');
        this.popup.querySelector('.button').classList.add('popup__button_dark');
    }
    textRender = () => {
        this.api.getUserInformation()
            .then((res) => {
                this.profileName.textContent = res.name;
                this.job.textContent = res.about;
                this.userInfoPhoto.style.backgroundImage = `url(${res.avatar})`;
                this.userId.setAttribute('data-about', res._id);
            })
            .catch(err => console.log(err));
    }
}