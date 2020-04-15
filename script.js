const editButton = document.querySelector('.edit-button');
const popupActive = document.querySelector('.popup');

function popupActivate() {
    popupActive.classList.add.('popup__is_active');
}
editButton.addEventListener('click', popupActivate);

let title = document.querySelector('.profile__title');
let subtitle = document.querySelector('.profile__subtitle');
let button = document.querySelector('.button');

let newTitle = document.querySelector('.popup-name');
let newSubtitle = document.querySelector('.popup-job');

function renameForm() {
    title = newTitle.nodeValue;
    title = newSubtitle.nodeValue;
}

button.addEventListener('click', renameForm);