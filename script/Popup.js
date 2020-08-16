export class Popup {

    constructor(popupSelector) {
        this._popup = document.querySelector(popupSelector);
    }
    popupOpen() {
        this._popup.classList.add("popup_opened");
    }
    popupClose() {
        this._popup.classList.remove("popup_opened");
        document.removeEventListener("keydown", () => this._handleEscClose());
    }
    _handleEscClose(evt) {
        if (evt.key === "Escape") {
            this._popup._popupClose();
        }
    }
    setEventListeners() {
        this._popup.addEventListener("click", clickByOverlay);
        const closeButton =
            this._popup
            .querySelector(".popup__close-button");
        closeButton.addEventListener("click", () => this._popupClose());
    };

    clickByOverlay() {

    }
}