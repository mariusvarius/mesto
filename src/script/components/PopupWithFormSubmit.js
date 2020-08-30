import {
    Popup
} from './Popup.js';

export class PopupWithFormSubmit extends Popup {
    constructor(popupSelector) {
        super(popupSelector);
        this._popupForm = this._popup.querySelector('.form');

    }


    setSubmitAction(submitAction) {
        this._handleSubmitCallback = submitAction;
    }

    setEventListeners() {
        this._popupForm.addEventListener('submit', (evt) => {
            evt.preventDefault();
            this._handleSubmitCallback();
            super.popupClose();

        });
        this._popup.addEventListener('click', (evt) => {
            this._handleOverlayClose(evt)
        });
        const closeButton =
            this._popup
            .querySelector(".popup__close-button");
        closeButton.addEventListener("click", () => {
            super.popupClose();

        })
    }
}