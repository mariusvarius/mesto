//Импорт класса карточки
import {
  Card
} from '../script/card.js';

//Импорт класса валидации
import {
  config,
  FormValidator
} from '../script/formValidator.js';

const editButton = document.querySelector(".profile__edit-button");
const closeButtonPicture = document.querySelector("#close-button-picture");
const addButton = document.querySelector(".profile__add-button");
const profilePopup = document.querySelector(".popup_type_profile");
const placePopup = document.querySelector(".popup_type_place");
const title = document.querySelector(".profile__title");
const subtitle = document.querySelector(".profile__subtitle");
const cardsContainer = document.querySelector(".cards");
const popupImage = document.querySelector(".popup_type_picture");
const profileNameInput = document.querySelector(".popup__input_data_name");
const profileJobInput = document.querySelector(".popup__input_data_job");
const placeNameInput = document.querySelector(".popup__input_data_place");
const placeLinkInput = document.querySelector(".popup__input_data_link");
const placeForm = document.querySelector("#popup-place");
const profileForm = document.querySelector("#popup-profile");
const initialCards = [{
    name: "Архыз",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg",
  },
  {
    name: "Челябинская область",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg",
  },
  {
    name: "Иваново",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg",
  },
  {
    name: "Камчатка",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg",
  },
  {
    name: "Холмогорский район",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg",
  },
  {
    name: "Байкал",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg",
  },
];

//Запуск "отрисовки" карточек
initialCards.forEach((item) => {
  // Создадим экземпляр карточки
  const card = new Card(item.name, item.link, '.card-template');
  // Создаём карточку и возвращаем наружу
  const cardElement = card.generateCard();

  // Добавляем в DOM
  cardsContainer.append(cardElement);
});

//Запуск валидации для каждого попапа
const newValidationPlace = new FormValidator(config, placeForm);
newValidationPlace.enableValidation();

const newValidationProfile = new FormValidator(config, profileForm);
newValidationProfile.enableValidation();


//Закрытие попапа по нажатию "Esc"
export function closeByEsc(evt) {
  if (evt.key === "Escape") {
    const popupElement = document.querySelector(".popup_opened");
    disablePopup(popupElement);
  }
}
// Открытие попапа
export function activatePopup(popupElement) {
  popupElement.classList.add("popup_opened");
}

// Закрытие попапа
export function disablePopup(popupElement) {
  popupElement.classList.remove("popup_opened");
  document.removeEventListener("keydown", closeByEsc);
}

//Обработчик попапа профиля
function handleProfilePopup() {
  profileNameInput.value = title.textContent;
  profileJobInput.value = subtitle.textContent;
  newValidationProfile.resetForm();
}

//Обработчик попапа места
function handlePlacePopup() {
  newValidationPlace.resetForm();
  placeNameInput.value = "";
  placeLinkInput.value = "";
}

//Уставнока слушаталей на попапы
function setPopupEventListenersForOpening(popupElement) {
  document.addEventListener("keydown", closeByEsc);
}

//Функция открытия попапа профиля
function openProfilePopup() {
  handleProfilePopup();
  setPopupEventListenersForOpening(profilePopup);
  activatePopup(profilePopup);
}

//Функция открытия попапа места
function openPlacePopup() {
  handlePlacePopup();
  setPopupEventListenersForOpening(placePopup);
  activatePopup(placePopup);
}

// Обработчик добавления новой карточки
function addCardSubmitHandler(evt) {
  evt.preventDefault();
  const card = new Card(placeNameInput.value, placeLinkInput.value, '.card-template');
  // Создаём карточку и возвращаем наружу
  const cardElement = card.generateCard();
  // Добавляем в DOM
  cardsContainer.prepend(cardElement);
  disablePopup(placePopup);
}

// Обработчик изменения данных профиля
function renameFormSubmitHandler(evt) {
  evt.preventDefault();
  title.textContent = profileNameInput.value;
  subtitle.textContent = profileJobInput.value;
  disablePopup(profilePopup);
}

//Функция закрытия попапа по клику на оверлей
function clickByOverlay(evt) {
  if (evt.target === evt.currentTarget) {
    disablePopup(evt.currentTarget);
  }
}

//Функция установки обработчика клика по оверлею и закрытия по клику на "крестик" для попапов
function setPopupEventListeners() {
  const popups = Array.from(document.querySelectorAll(".popup"));
  popups.forEach((popup) => {
    popup.addEventListener("click", clickByOverlay);
    const closeButton =
      popup
      .querySelector(".popup__close-button");
    closeButton.addEventListener("click", () => disablePopup(popup));
  });
}

// Слушатель для закрытия увеличенного изображения
closeButtonPicture.addEventListener("click", () => disablePopup(popupImage));

// Слушатель для открытия попапа места (карточки)
addButton.addEventListener("click", () => openPlacePopup());

// Слушатель на форму добавления карточки
placeForm.addEventListener("submit", addCardSubmitHandler);

// Слушатель на форму изменения данных профиля
profileForm.addEventListener("submit", renameFormSubmitHandler);

// Слушатель для открытия попапа профиля
editButton.addEventListener("click", () => openProfilePopup());

//Запуск функции установки обработчиков
setPopupEventListeners();