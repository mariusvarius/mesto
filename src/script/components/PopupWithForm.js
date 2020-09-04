import {
    Popup
} from './Popup.js';


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
        super.setEventListeners();

        this._popupForm.addEventListener('submit', (evt) => {
            evt.preventDefault();
            const data = this._getInputValues();
            this._handleFormSubmit(data);
        });
    }

    popupClose() {
        super.popupClose();
        this._popupForm.reset();
    }




}