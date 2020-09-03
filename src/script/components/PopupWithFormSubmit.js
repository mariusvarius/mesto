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
        });
        super.setEventListeners()

    }

    activatePreload() {
        this._submitButton.textContent = "Удаление..."
    }

    disablePreload() {
        this._submitButton.textContent = "Да"
    }
}