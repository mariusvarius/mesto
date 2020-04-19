const editButton = document.querySelector(".edit-button");
const closeButton = document.querySelector(".close-button");
const popup = document.querySelector(".popup");
const title = document.querySelector(".profile__title");
const subtitle = document.querySelector(".profile__subtitle");
const saveButton = document.querySelector(".save-button");

let newTitle = document.querySelector(".popup__input_data_name");
let newSubtitle = document.querySelector(".popup__input_data_job");

function popupActivate() {
    popup.classList.add("popup_opened");
    newTitle.value = title.innerText;
    newSubtitle.value = subtitle.innerText;
}
editButton.addEventListener("click", popupActivate);

function popupDisable() {
    popup.classList.remove("popup_opened");
}
closeButton.addEventListener("click", popupDisable);

function renameForm() {
    title.innerText = newTitle.value;
    subtitle.innerText = newSubtitle.value;
    popupDisable();
}

saveButton.addEventListener("click", renameForm);