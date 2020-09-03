export class Popup {

    constructor(popupSelector) {
        this._popup = document.querySelector(popupSelector);
        this._submitButton = this._popup.querySelector(".popup__save-button");
        this._handleEscClose = this._handleEscClose.bind(this);

    }
    popupOpen() {
        this._popup.classList.add("popup_opened");
        document.addEventListener("keydown", (evt) => this._handleEscClose(evt));

    }
    popupClose() {
        this._popup.classList.remove("popup_opened");
        document.removeEventListener("keydown", (evt) => this._handleEscClose(evt));
    }
    _handleEscClose(evt) {
        if (evt.key === "Escape") {
            this.popupClose();
        }
    }

    _handleOverlayClose(evt) {
        if (evt.target === evt.currentTarget) {
            this.popupClose();
        }
    }

    setEventListeners() {

        this._popup.querySelector('popup__big-picture')
        this._popup.addEventListener('click', (evt) => {
            this._handleOverlayClose(evt)
        });
        const closeButton =
            this._popup
            .querySelector(".popup__close-button");
        closeButton.addEventListener("click", () => this.popupClose());
    }
    activatePreload() {
        this._submitButton.textContent = "Сохранение..."
    }

    disablePreload() {
        this._submitButton.textContent = "Создать"
    }

}