import "./pages/index.css";

import Api from "./modules/Api";
import Card from "./modules/Card";
import CardList from "./modules/CardList";
import FormValidator from "./modules/FormValidator";
import Popup from "./modules/Popup";
import PopupAvatar from "./modules/PopupAvatar";
import PopupZoom from "./modules/PopupZoom";
import UserInfo from "./modules/UserInfo";
import UserInfoPopup from "./modules/UserInfoPopup";
import Ux from "./modules/Ux";
import UxLoading from "./modules/UxLoading";

(function () {

const userId = document.querySelector('.user-info');
const placesList = document.querySelector('.places-list')
const popup = document.querySelector('.popup_form');
const popupEdit = document.querySelector('.popup_edit');
const popupAvatarPhoto = document.querySelector('.popup_avatar');
const form = document.forms.new;
const formEdit = document.forms.edit;
const formAvatar = document.forms.avatar;
const profileName = document.querySelector('.user-info__name');
const job = document.querySelector('.user-info__job');
const popupCard = document.querySelector('.popup-card');
const buttonOpenEdit = document.querySelector('.user-info__edit-button');
const buttonOpenForm = document.querySelector('.user-info__button');
const buttonCloseForm = document.querySelector('.popup__close_form');
const buttonCloseEdit = document.querySelector('.popup__close_edit');
const buttonCloseCard = document.querySelector('.popup__close_card');
const buttonCloseAvatar = document.querySelector('.popup__close_avatar');
const editInputName = document.getElementById('name');
const editInputJob = document.getElementById('job');
const popupCardImage = document.querySelector('.popup-card__image');
const userInfoPhoto = document.querySelector('.user-info__photo');
const spinner = document.querySelector('.spinner');

const config = {
  url:  (NODE_ENV === 'production' ? 'https://praktikum.tk/cohort11/':'http://praktikum.tk/cohort11/'),
  headers: {
      authorization: 'f7e35f4c-8632-47a0-8555-47e76426a1c2',
      'Content-Type': 'application/json'
    }
};
const api = new Api(config);

// Откртие Popap'а с картинкой
const popupZoom = new PopupZoom(buttonCloseCard,popupCard,popupCardImage);
popupZoom.setEventListeners();

//
const createNewCard = (...args) => new Card(...args).createCard();

// UX 
const createUx = (...args) => new Ux(...args);

// UX Loading
const uxLoading = (...args) => new UxLoading(...args).renderLoading();

// Добавление начальных карточек
const cardList = new CardList(placesList,popupZoom,createNewCard,api,userId,uxLoading,spinner);
cardList.render();


// Добавление новой карточки
const popupForm = new Popup(buttonOpenForm,buttonCloseForm,popup,popupZoom,form,cardList,createNewCard,api,createUx,userId)
popupForm.setEventListeners();


// Изменение автара
const popupAvatar = new PopupAvatar(userInfoPhoto,popupAvatarPhoto,formAvatar,api);
popupAvatar.setEventListeners();


// Редактирование профиля
const userInfo = new UserInfo(editInputName,editInputJob,profileName,job,popupEdit,userInfoPhoto,api,userId);
userInfo.textRender();
const userInfoPopup = new UserInfoPopup(buttonOpenEdit,buttonCloseEdit,popupEdit,userInfo,formEdit,profileName,job,api,createUx);
userInfoPopup.setEventListeners();


// Валидация
const formValidatorNewPlace = new FormValidator(form);
formValidatorNewPlace.setEventListeners(buttonCloseForm);

const formValidatorUserInfo = new FormValidator(formEdit);
formValidatorUserInfo.setEventListeners(buttonCloseEdit);

const formValidatorAvatar = new FormValidator(formAvatar);
formValidatorAvatar.setEventListeners(buttonCloseAvatar);

})();
