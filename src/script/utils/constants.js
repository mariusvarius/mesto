export const editButton = document.querySelector(".profile__edit-button");
export const editButtonAvatar = document.querySelector(".profile__avatar");
export const closeButtonPicture = document.querySelector("#close-button-picture");
export const addButton = document.querySelector(".profile__add-button");
export const profilePopup = document.querySelector(".popup_type_profile");
export const placePopup = document.querySelector(".popup_type_place");
export const avatarPopup = document.querySelector(".popup_type_avatar");
export const title = document.querySelector(".profile__title");
export const subtitle = document.querySelector(".profile__subtitle");
export const cardsContainer = document.querySelector(".cards");
export const popupImage = document.querySelector(".popup_type_picture");
export const imageFromPopup = document.querySelector(".popup__big-picture");
export const profileNameInput = document.querySelector(".popup__input_data_name");
export const profileJobInput = document.querySelector(".popup__input_data_about");
export const placeNameInput = document.querySelector(".popup__input_data_place");
export const placeLinkInput = document.querySelector(".popup__input_data_link");
export const placeForm = document.querySelector("#popup-place");
export const profileForm = document.querySelector("#popup-profile");
export const avatarForm = document.querySelector("#popup-avatar");
export const initialCards = [{
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
//Изначальный объект растроек
export const config = {
    inputSelector: '.popup__input',
    submitButtonSelector: '.popup__save-button',
    inactiveButtonClass: 'popup__save-button_disabled',
    inputErrorClass: 'popup__input_type_error',
    errorClass: 'popup__input-error_mode_active'
};