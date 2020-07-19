const editButton = document.querySelector(".profile__edit-button");
const closeButtonProfile = document.querySelector("#close-button-profile");
const closeButtonPlace = document.querySelector("#close-button-place");
const closeButtonPicture = document.querySelector("#close-button-picture");
const addButton = document.querySelector(".profile__add-button");
const profilePopup = document.querySelector(".popup_type_profile");
const placePopup = document.querySelector(".popup_type_place");
const title = document.querySelector(".profile__title");
const subtitle = document.querySelector(".profile__subtitle");
const cardsContainer = document.querySelector(".cards");
const popupImage = document.querySelector(".popup_type_picture");
const cardTemplate = document.querySelector("#card-template").content;
const profileNameInput = document.querySelector(".popup__input_data_name");
const profileJobInput = document.querySelector(".popup__input_data_job");
const placeNameInput = document.querySelector(".popup__input_data_place");
const placeLinkInput = document.querySelector(".popup__input_data_link");
const bigImagePlace = document.querySelector(".popup__big-picture");
const bigImageCapture = document.querySelector(".popup__capture");
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

// Лайк карточки
function likeCard(evt) {
  evt.target.classList.toggle("card__like-button_mode_active");
}

//Закрытие попапа по нажатию "Esc"
function closeByEsc(evt) {
  if (evt.key === "Escape") {
    const popupElement = document.querySelector(".popup_opened");
    popupDisable(popupElement);
  }
}
// Открытие попапа
function popupActivate(popupElement) {
  popupElement.classList.add("popup_opened");
}

// Закрытие попапа
function popupDisable(popupElement) {
  popupElement.classList.remove("popup_opened");
  document.removeEventListener("keydown", closeByEsc);
}

//Изначальная инактивация кнопки сабмита
function inactivateSubmitButton(popupElement) {
  const submitButton = popupElement.querySelector('.popup__save-button');
  submitButton.setAttribute('disabled', false);
  submitButton.classList.add('popup__save-button_disabled');
}

//Изначальная активация кнопки сабмита
function activateSubmitButton(popupElement) {
  const submitButton = popupElement.querySelector('.popup__save-button');
  submitButton.removeAttribute('disabled');
  submitButton.classList.remove('popup__save-button_disabled');
}

//Обработчик попапа
function popupHandler(popupElement) {
  // Определение попапа для профиля, проверка на скрытое состояние
  if (
    popupElement.classList.contains("popup_type_profile") &&
    !popupElement.classList.contains("popup_opened")
  ) {
    // Обновление информации из профиля
    profileNameInput.value = title.textContent;
    profileJobInput.value = subtitle.textContent;
    activateSubmitButton(popupElement);
  }
  // Определение попапа для карточки, проверка на скрытое состояние
  if (
    popupElement.classList.contains("popup_type_place") &&
    !popupElement.classList.contains("popup_opened")
  ) {
    // Удаление ранее введенных данных
    placeNameInput.value = "";
    placeLinkInput.value = "";
    inactivateSubmitButton(popupElement);
  }
  popupElement
    .querySelector(".popup__close-button")
    .addEventListener("click", () => popupDisable(popupElement));
  document.addEventListener("keydown", closeByEsc);
  popupActivate(popupElement);
}

// Увеличение изображения
function zoomImage(evt) {
  bigImagePlace.src = evt.target.src;
  bigImagePlace.alt = evt.target.alt;
  bigImageCapture.textContent = evt.target.alt;
  document.addEventListener("keydown", closeByEsc);
  popupActivate(popupImage);
}

// Обработчик удаления карточки
function handleDeleteCard(evt) {
  const deleteCard = evt.target.closest(".card");
  // Снятие слушателей
  deleteCard
    .querySelector(".card__like-button")
    .removeEventListener("click", likeCard);
  deleteCard
    .querySelector(".card__remove-button")
    .removeEventListener("click", handleDeleteCard);
  deleteCard
    .querySelector(".card__picture")
    .removeEventListener("click", zoomImage);
  deleteCard.remove();
}

// Создание шаблона карточки
function makeCard(item) {
  const cardItem = cardTemplate.cloneNode(true);
  cardItem.querySelector(".card__name").textContent = item.name;
  const imageItem = cardItem.querySelector(".card__picture");
  imageItem.src = item.link;
  imageItem.alt = item.name;
  const removeButton = cardItem.querySelector(".card__remove-button");
  removeButton.addEventListener("click", handleDeleteCard);
  const likeButton = cardItem.querySelector(".card__like-button");
  likeButton.addEventListener("click", likeCard);
  imageItem.addEventListener("click", zoomImage);
  return cardItem;
}

// Превращение массива в массив шаблонов
function renderCards(cardsArr) {
  return cardsArr.map((cardItem) => makeCard(cardItem));
}

// Добавление элементов в разметку
function addCards(cardsArr) {
  cardsContainer.prepend(...cardsArr);
}

// Обработчик добавления новой карточки
function addCardSubmitHandler(evt) {
  evt.preventDefault();
  const newCard = makeCard({
    name: placeNameInput.value,
    link: placeLinkInput.value,
  });
  addCards([newCard]);
  popupDisable(placePopup);
}

// Обработчик изменения данных профиля
function renameFormSubmitHandler(evt) {
  evt.preventDefault();
  title.textContent = profileNameInput.value;
  subtitle.textContent = profileJobInput.value;
  popupDisable(profilePopup);
}

//Функция закрытия попапа по клику на оверлей
function clickByOverlay(evt) {
  if (evt.target === evt.currentTarget) {
    popupDisable(evt.currentTarget);
  }
}

//Функция установки обработчиков для попапов
function setPopupEventListeners() {
  const popups = Array.from(document.querySelectorAll(".popup"));
  popups.forEach((popup) => {
    popup.addEventListener("click", clickByOverlay);
  });
}

// Слушатель для закрытия увеличенного изображения
closeButtonPicture.addEventListener("click", () => popupDisable(popupImage));

// Слушатель для открытия попапа места (карточки)
addButton.addEventListener("click", () => popupHandler(placePopup));

// Слушатель на форму добавления карточки
placeForm.addEventListener("submit", addCardSubmitHandler);

// Слушатель на форму изменения данных профиля
profileForm.addEventListener("submit", renameFormSubmitHandler);

// Слушатель для открытия попапа профиля
editButton.addEventListener("click", () => popupHandler(profilePopup));

// Добавление начальных карточек
addCards(renderCards(initialCards));
setPopupEventListeners();