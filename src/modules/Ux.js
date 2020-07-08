export default class Ux {
    constructor(isLoading, button){
        this.isLoading = isLoading;
        this.button = button;
    }
    improveLoadingNewPlace = () => {
        if (this.isLoading === true){
            this.button.textContent = 'Загрузка...';
            this.button.classList.add('popup__button_edit');
        }
        else {
            this.button.textContent = '+';
            this.button.classList.remove('popup__button_edit');
        }
    }
    improveLoadingEditPopup = () => {
        if (this.isLoading === true){
            this.button.textContent = 'Загрузка...';
        }
        else {
            this.button.textContent = 'Сохранить';
        }
    }
}