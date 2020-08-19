export class Popup {

    constructor(popupSelector) {
        this._popup = document.querySelector(popupSelector);
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
        this._popup.addEventListener("keydown", () => {
            this._handleEscClose()
        });
        this._popup.querySelector('popup__big-picture')
        this._popup.addEventListener('click', (evt) => {
            this._handleOverlayClose(evt)
        });
        const closeButton =
            this._popup
            .querySelector(".popup__close-button");
        closeButton.addEventListener("click", () => this.popupClose());
    };


}