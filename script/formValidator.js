export const config = {
    inputSelector: '.popup__input',
    submitButtonSelector: '.popup__save-button',
    inactiveButtonClass: 'popup__save-button_disabled',
    inputErrorClass: 'popup__input_type_error',
    errorClass: 'popup__input-error_mode_active'
};

export class FormValidator {
    constructor({
        inputSelector,
        submitButtonSelector,
        inactiveButtonClass,
        inputErrorClass,
        errorClass
    }, currentForm) {
        this._inputSelector = inputSelector;
        this._submitButtonSelector = submitButtonSelector;
        this._inactiveButtonClass = inactiveButtonClass;
        this._inputErrorClass = inputErrorClass;
        this._errorClass = errorClass;
        this.currentForm = currentForm;
    }


    _showInputError(inputElement, errorMessage) {
        const errorElement = this.currentForm.querySelector(`#${inputElement.id}-error`);
        inputElement.classList.add(this._inputErrorClass);
        errorElement.textContent = errorMessage;
        errorElement.classList.add(this._errorClass);
        console.log(errorElement, 'здесь сообщение об ошибке');
    }

    _hideInputError(inputElement) {
        const errorElement = this.currentForm.querySelector(`#${inputElement.id}-error`);
        inputElement.classList.remove(this._inputErrorClass);
        errorElement.classList.remove(this._errorClass);
        errorElement.textContent = '';
    }

    _isValid(inputElement) {
        console.log(this);
        if (!inputElement.validity.valid) {
            this._showInputError(inputElement, inputElement.validationMessage);
        } else {
            this._hideInputError(inputElement);
        }
    }

    _setEventListeners(currentForm) {
        const inputList = Array.from(this.currentForm.querySelectorAll(this._inputSelector));
        console.log(inputList);
        inputList.forEach((inputElement) => {
            console.log(inputElement);
            inputElement.addEventListener('input', () => {
                this._isValid(inputElement);
                this._toggleButtonState();
            });
        });
    }

    enableValidation() {
        this.currentForm.addEventListener('submit', (evt) => {
            evt.preventDefault();
        });
        console.log(this.currentForm);
        this._setEventListeners();

    }


    _hasInvalidInput() {
        const inputList = Array.from(this.currentForm.querySelectorAll(this._inputSelector));
        return inputList.some((inputElement) => {
            return !inputElement.validity.valid;
        });
    }

    _toggleButtonState() {
        const buttonElement = this.currentForm.querySelector(this._submitButtonSelector);
        const inputList = Array.from(this.currentForm.querySelectorAll(this._inputSelector));
        if (this._hasInvalidInput(inputList)) {
            if (!buttonElement.hasAttribute('disabled')) {
                buttonElement.setAttribute('disabled', false);
            }
            buttonElement.classList.add(this._inactiveButtonClass);
        } else {
            buttonElement.classList.remove(this._inactiveButtonClass);
            buttonElement.removeAttribute('disabled');
        }
    }
}