const editButton = document.querySelector(".edit-button");
const closeButton = document.querySelector(".close-button");
const popup = document.querySelector(".popup");

function popupActivate() {
    popup.classList.add("popup_opened");
}
editButton.addEventListener("click", popupActivate);

function popupDisable() {
    popup.classList.remove("popup_opened");
}
closeButton.addEventListener("click", popupDisable);

const title = document.querySelector(".profile__title");
const subtitle = document.querySelector(".profile__subtitle");
const button = document.querySelector(".button");

let newTitle = document.querySelector(".popup__name");
let newSubtitle = document.querySelector(".popup__job");

function renameForm() {
    title.innerText = newTitle.value;
    subtitle.innerText = newSubtitle.value;
    popupDisable();
}

button.addEventListener("click", renameForm);