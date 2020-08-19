import {
    Popup
} from './Popup.js';

export class PopupWithImage extends Popup {
    constructor(popupSelector) {
        super(popupSelector);
    }

    popupOpen(data) {
        const img = this._popup.querySelector('.popup__big-picture');
        img.src = data.link;
        img.alt = data.name;
        this._popup.querySelector(".popup__capture").textContent = data.name;
        super.popupOpen();

    }
}