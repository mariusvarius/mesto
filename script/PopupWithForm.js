import {
    Popup
<<<<<<< HEAD
} from './Popup.js';
=======
} from '../script/Popup.js';
>>>>>>> master

import {
    popupImage,
    imageFromPopup
<<<<<<< HEAD
} from './constants.js';
=======
} from '../script/constants.js';
>>>>>>> master

export class PopupWithForm extends Popup {
    constructor({
        popupSelector,
        handleFormSubmit
    }) {
        super(popupSelector);
        this._popupForm = this._popup.querySelector('.form');
        this._handleFormSubmit = handleFormSubmit;
    }
    _getInputValues() {
        this._inputList = Array.from(this._popup.querySelectorAll('.popup__input'));
        this._formValues = {};
        this._inputList.forEach(input => this._formValues[input.name] = input.value);
        return this._formValues;
    }

    setEventListeners() {
        this._popupForm.addEventListener('submit', (evt) => {
            evt.preventDefault();
            const data = this._getInputValues();
            console.log(data);
            this._handleFormSubmit(data);
            super.popupClose();
            this._popupForm.reset();
        })
        const closeButton =
            this._popup
            .querySelector(".popup__close-button");
        closeButton.addEventListener("click", () => {
            super.popupClose();
            this._popupForm.reset();
        });
    };

}