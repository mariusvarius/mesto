//Импорт констант
import {
  editButton,
  closeButtonPicture,
  addButton,
  profilePopup,
  placePopup,
  title,
  subtitle,
  popupImage,
  profileNameInput,
  profileJobInput,
  placeNameInput,
  placeLinkInput,
  placeForm,
  profileForm,
  initialCards
} from '../script/constants.js';

//Импорт классов
import {
  Card
} from './Сard.js';
import {
  Popup
} from './Popup.js';
import {
  PopupWithForm
} from './PopupWithForm.js';
import {
  PopupWithImage
} from './PopupWithImage.js';
import {
  UserInfo
} from './UserInfo.js';
import {
  Section
} from './Section.js';

//Импорт класса валидации
import {
  config,
  FormValidator
} from './FormValidator.js';

// //Запуск "отрисовки" карточек
// initialCards.forEach((item) => {
//   // Создадим экземпляр карточки
//   const card = new Card(item.name, item.link, '.card-template');
//   // Создаём карточку и возвращаем наружу
//   const cardElement = card.generateCard();

//   // Добавляем в DOM
//   cardsContainer.append(cardElement);
// });

//Новый экземпляр класса Section
const cardList = new Section({
  items: initialCards,
  renderer: (data) => {
    const card = new Card({
      data,
      handleCardClick: () => {
        popupImage.popupOpen(data, ".popup_type_picture");
      }
    }, '.card-template');
    const cardElement = card.generateCard();
    cardList.addItem(cardElement);
    console.log('я загрузка карточек');
  }
}, ".cards");
cardList.renderItems();


//Запуск валидации для каждого попапа
const newValidationPlace = new FormValidator(config, placeForm);
newValidationPlace.enableValidation();

const newValidationProfile = new FormValidator(config, profileForm);
newValidationProfile.enableValidation();

const newUserInfo = new UserInfo({
  profileNameSelector: '.profile__title',
  profileJobSelector: '.profile__subtitle'
});

const newPopupWithFormProfile = new PopupWithForm({
  popupSelector: '.popup_type_profile',
  handleFormSubmit: (data) => {
    newUserInfo.setUserInfo(data);
    newPopupWithFormProfile.popupClose();
  }
});
newPopupWithFormProfile.setEventListeners();

function handleOpenProfilePopup() {
  profileNameInput.value = title.textContent;
  profileJobInput.value = subtitle.textContent;
  newValidationProfile.resetForm();
  newPopupWithFormProfile.popupOpen();
}
const newPopupWithFormPlace = new PopupWithForm({
  popupSelector: '.popup_type_place',
  handleFormSubmit: (data) => {
    const card = new Card({
      data,
      handleCardClick: () => {
        popupImage.popupOpen(data, ".popup_type_picture");
      }
    }, '.card-template');
    const cardElement = card.generateCard();
    console.log(cardElement);
    cardList.addNewItem(cardElement);
    console.log('я загрузка новой карточки');
    newPopupWithFormPlace.popupClose();
  }
});
newPopupWithFormPlace.setEventListeners();

function handleOpenPlacePopup() {
  newValidationPlace.resetForm();
  placeNameInput.value = "";
  placeLinkInput.value = "";
  newPopupWithFormPlace.popupOpen();
}
// const newPopupWithImage = new PopupWithImage({});
// //Закрытие попапа по нажатию "Esc"
// export function closeByEsc(evt) {
//   if (evt.key === "Escape") {
//     const popupElement = document.querySelector(".popup_opened");
//     disablePopup(popupElement);
//   }
// }
// // Открытие попапа
// export function activatePopup(popupElement) {
//   popupElement.classList.add("popup_opened");
// }

// // Закрытие попапа
// export function disablePopup(popupElement) {
//   popupElement.classList.remove("popup_opened");
//   document.removeEventListener("keydown", closeByEsc);
// }

// //Обработчик попапа профиля
// function handleProfilePopup() {
//   profileNameInput.value = title.textContent;
//   profileJobInput.value = subtitle.textContent;
//   newValidationProfile.resetForm();
// }

// //Обработчик попапа места
// function handlePlacePopup() {
//   newValidationPlace.resetForm();
//   placeNameInput.value = "";
//   placeLinkInput.value = "";
// }

// //Уставнока слушаталей на попапы
// function setPopupEventListenersForOpening(popupElement) {
//   document.addEventListener("keydown", closeByEsc);
// }

// //Функция открытия попапа профиля
// function openProfilePopup() {
//   handleProfilePopup();
//   setPopupEventListenersForOpening(profilePopup);
//   activatePopup(profilePopup);
// }

// //Функция открытия попапа места
// function openPlacePopup() {
//   handlePlacePopup();
//   setPopupEventListenersForOpening(placePopup);
//   activatePopup(placePopup);
// }

// // Обработчик добавления новой карточки
// function addCardSubmitHandler(evt) {
//   evt.preventDefault();
//   const card = new Card(placeNameInput.value, placeLinkInput.value, '.card-template');
//   // Создаём карточку и возвращаем наружу
//   const cardElement = card.generateCard();
//   // Добавляем в DOM
//   cardsContainer.prepend(cardElement);
//   disablePopup(placePopup);
// }

// // Обработчик изменения данных профиля
// function renameFormSubmitHandler(evt) {
//   evt.preventDefault();
//   title.textContent = profileNameInput.value;
//   subtitle.textContent = profileJobInput.value;
//   disablePopup(profilePopup);
// }

// //Функция закрытия попапа по клику на оверлей
// function clickByOverlay(evt) {
//   if (evt.target === evt.currentTarget) {
//     disablePopup(evt.currentTarget);
//   }
// }

//Функция установки обработчика клика по оверлею и закрытия по клику на "крестик" для попапов
// function setPopupEventListeners() {
//   const popups = Array.from(document.querySelectorAll(".popup"));
//   popups.forEach((popup) => {
//     popup.addEventListener("click", clickByOverlay);
//     const closeButton =
//       popup
//       .querySelector(".popup__close-button");
//     closeButton.addEventListener("click", () => disablePopup(popup));
//   });
// }

// // Слушатель для закрытия увеличенного изображения
// closeButtonPicture.addEventListener("click", () => disablePopup(popupImage));

// // Слушатель для открытия попапа места (карточки)
addButton.addEventListener("click", () => handleOpenPlacePopup());

// // Слушатель на форму добавления карточки
// placeForm.addEventListener("submit", addCardSubmitHandler);

// // Слушатель на форму изменения данных профиля
// profileForm.addEventListener("submit", renameFormSubmitHandler);

// Слушатель для открытия попапа профиля
editButton.addEventListener("click", () => handleOpenProfilePopup());

// //Запуск функции установки обработчиков
// setPopupEventListeners();