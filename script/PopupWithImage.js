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
} from '../script/constants.js';

export class PopupWithImage extends Popup {
    constructor(data, popupSelector) {
        this._src = data.link;
        this._alt = data.name;
        this._name = data.name;
        super(popupSelector);
    }
    popupOpen() {
        this.imageFromPopup.src = this._src;
        this.imageFromPopup.alt = this._alt;
        this._popup.querySelector(".popup__capture").textContent = this._name;
        super._popupOpen();
        document.addEventListener("keydown", super._handleEscClose());
    }
}