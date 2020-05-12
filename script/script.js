const editButton = document.querySelector(".edit-button");
const closeButtonProfile = document.querySelector("#close-button-profile");
const closeButtonPlace = document.querySelector("#close-button-place");
const closeButtonPicture = document.querySelector("#close-button-picture");
const addButton = document.querySelector(".add-button");
const popup = document.querySelector(".popup");
const profilePopup = document.querySelector("#profile-popup");
const placePopup = document.querySelector("#place-popup");
const picturePopup = document.querySelector("#picture-popup");
const title = document.querySelector(".profile__title");
const subtitle = document.querySelector(".profile__subtitle");
const saveButtonProfile = document.querySelector("#save-button-profile");
const saveButtonPlace = document.querySelector("#save-button-place");
const cardsContainer = document.querySelector(".cards");
const deleteButton = document.querySelector(".remove-button");
const likeButton = document.querySelector(".like-button");
const popupImage = document.querySelector(".picture-popup__image");
const popupText = document.querySelector(".picture-popup__text");

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
let newTitle = document.querySelector(".popup__input_data_name");
let newSubtitle = document.querySelector(".popup__input_data_job");
let newPlace = document.querySelector(".popup__input_data_place");
let newLink = document.querySelector(".popup__input_data_link");

// Функция изначального добавления карточек

function initialAddCards(item, index) {
    const cardTemplate = document.querySelector("#card-template").content;
    const cardItem = cardTemplate.cloneNode(true);
    cardItem.querySelector(".card__name").textContent = item.name;
    cardItem.querySelector(".card__picture").src = item.link;
    cardItem.querySelector(".card__picture").alt = item.name;
    const imageItem = cardItem.querySelector(".card__picture");
    imageItem.addEventListener("click", function zoomImage() {
        picturePopup.classList.add("popup_opened");
        popupImage.src = item.link;
        popupImage.alt = item.name;
        popupText.textContent = item.name;
    });
    cardItem.querySelector(".card").setAttribute("id", index);
    cardItem
        .querySelector(".like-button")
        .addEventListener("click", function(evt) {
            evt.target.classList.toggle("like-button_mode_active");
            evt.target.classList.toggle("like-button_mode_disable");
        });

    cardsContainer.append(cardItem);
}
// Обработчик удаления на каждую карточку

function renderCards() {
    initialCards.forEach(initialAddCards);

    document.querySelectorAll(".remove-button").forEach(function(deleteButton) {
        deleteButton.addEventListener("click", handleDelete);
    });
}
renderCards();

// Удаление карточки

function handleDelete(event) {
    const index = event.target.parentNode.getAttribute("id");
    initialCards.splice(index, 1);
    cardsContainer.innerHTML = "";
    renderCards();
}

// Добавление новой карточки на страницу через массив

function addItem() {
    let newItem = {
        name: newPlace.value,
        link: newLink.value,
    };
    newPlace.value = "";
    newLink.value = "";
    initialCards.unshift(newItem);
    cardsContainer.innerHTML = "";
    renderCards();
    placePopupDisable();
}

saveButtonPlace.addEventListener("click", addItem);

// Активация попапа для профайла

function profilePopupActivate() {
    profilePopup.classList.add("popup_opened");
    newTitle.value = title.innerText;
    newSubtitle.value = subtitle.innerText;
}
editButton.addEventListener("click", profilePopupActivate);

// Активация попапа для карточки

function placePopupActivate() {
    placePopup.classList.add("popup_opened");
}
addButton.addEventListener("click", placePopupActivate);

// Закрытие попапа для профайла

function profilePopupDisable() {
    profilePopup.classList.remove("popup_opened");
}
closeButtonProfile.addEventListener("click", profilePopupDisable);

// Закрытие попапа для карточки

function placePopupDisable() {
    placePopup.classList.remove("popup_opened");
}
closeButtonPlace.addEventListener("click", placePopupDisable);

// Сохранение информации профайла на странице, закрытие попапа

function renameForm() {
    title.innerText = newTitle.value;
    subtitle.innerText = newSubtitle.value;
    profilePopupDisable();
}

saveButtonProfile.addEventListener("click", renameForm);

// Закрытие попапа с карточкой

function closePicPopup() {
    picturePopup.classList.remove("popup_opened");
}

closeButtonPicture.addEventListener("click", closePicPopup);