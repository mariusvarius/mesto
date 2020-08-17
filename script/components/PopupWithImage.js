import {
    Popup
} from '../components/Popup.js';

export class PopupWithImage extends Popup {
    constructor(popupSelector) {
        super(popupSelector);
    }
    popupOpen(data) {
        console.log(data);
        this._src = data.link;
        this._alt = data.name;
        this._name = data.name;
        const img = this._popup.querySelector('.popup__big-picture');
        img.src = this._src;
        img.alt = this._alt;
        this._popup.querySelector(".popup__capture").textContent = this._name;
        super.popupOpen();

    }
}