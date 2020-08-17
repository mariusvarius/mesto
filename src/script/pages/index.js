//Импорт CSS
import "../../index/index.css";
//Импорт констант
import {
  editButton,
  addButton,
  title,
  subtitle,
  profileNameInput,
  profileJobInput,
  placeNameInput,
  placeLinkInput,
  placeForm,
  profileForm,
  initialCards,
} from "../utils/constants.js";

//Импорт классов
import { Card } from "../components/Сard.js";
import { PopupWithForm } from "../components/PopupWithForm.js";
import { PopupWithImage } from "../components/PopupWithImage.js";
import { UserInfo } from "../components/UserInfo.js";
import { Section } from "../components/Section.js";

//Импорт класса валидации
import { config, FormValidator } from "../components/FormValidator.js";

//Новый экземпляр класса Section (изначальная загрузка карточек)
const cardList = new Section(
  {
    items: initialCards,
    renderer: (data) => {
      const card = new Card(
        {
          data,
          handleCardClick: () => {
            newPopupWithImage.popupOpen(data);
          },
        },
        ".card-template"
      );
      const cardElement = card.generateCard();
      cardList.addItem(cardElement);
    },
  },
  ".cards"
);
cardList.renderItems();

//Запуск валидации для каждого попапа
const newValidationPlace = new FormValidator(config, placeForm);
newValidationPlace.enableValidation();

const newValidationProfile = new FormValidator(config, profileForm);
newValidationProfile.enableValidation();

//Новый экземпляр класса с информацией о пользователе
const newUserInfo = new UserInfo({
  profileNameSelector: ".profile__title",
  profileJobSelector: ".profile__subtitle",
});

//Новый экземпляр класса попапа профиля
const newPopupWithFormProfile = new PopupWithForm({
  popupSelector: ".popup_type_profile",
  handleFormSubmit: (data) => {
    newUserInfo.setUserInfo(data);
    newPopupWithFormProfile.popupClose();
  },
});
newPopupWithFormProfile.setEventListeners();

//Обработчик для открытия попапа профиля
function handleOpenProfilePopup() {
  profileNameInput.value = title.textContent;
  profileJobInput.value = subtitle.textContent;
  newValidationProfile.resetForm();
  newPopupWithFormProfile.popupOpen();
}

//Экземпляр класса попапа места
const newPopupWithFormPlace = new PopupWithForm({
  popupSelector: ".popup_type_place",
  handleFormSubmit: (data) => {
    const card = new Card(
      {
        data,
        handleCardClick: () => {
          newPopupWithImage.popupOpen(data, ".popup_type_picture");
        },
      },
      ".card-template"
    );
    const cardElement = card.generateCard();
    cardList.addNewItem(cardElement);
    newPopupWithFormPlace.popupClose();
  },
});
newPopupWithFormPlace.setEventListeners();

//Обработчик для открытия попапа места
function handleOpenPlacePopup() {
  newValidationPlace.resetForm();
  placeNameInput.value = "";
  placeLinkInput.value = "";
  newPopupWithFormPlace.popupOpen();
}

//Новый экземпляр попапа с картинкой
const newPopupWithImage = new PopupWithImage(".popup_type_picture");
newPopupWithImage.setEventListeners();

// // Слушатель для открытия попапа места (карточки)
addButton.addEventListener("click", () => handleOpenPlacePopup());

// Слушатель для открытия попапа профиля
editButton.addEventListener("click", () => handleOpenProfilePopup());
