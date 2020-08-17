//Импорт функций
// import {
//     closeByEsc,
//     activatePopup,
//     disablePopup
// } from './index.js';

import {
    PopupWithImage
} from '../script/PopupWithImage.js';

//Класс карточки
export class Card {
    constructor({
        data,
        handleCardClick
    }, cardSelector) {
        this._name = data.name;
        this._link = data.link;
        this._handleCardClick = handleCardClick;
        this._cardSelector = cardSelector;
    }

    //Получение шаблона из разметки
    _getTemplate() {
        const cardElement = document
            .querySelector(this._cardSelector)
            .content
            .querySelector('.card')
            .cloneNode(true);
        return cardElement;
    }

    //Создание карточки
    generateCard() {
        this._element = this._getTemplate();
        console.log(this._element);
        this._setEventListeners();
        this._element.querySelector(".card__name").textContent = this._name;
        const cardPic = this._element.querySelector(".card__picture");
        cardPic.src = this._link;
        cardPic.alt = this._name;
        return this._element;
    }

    //Установка слушателей
    _setEventListeners() {
        this._element.querySelector(".card__remove-button").addEventListener("click", () => {
            this._handleDeleteCard()
        });
        this._element.querySelector(".card__like-button").addEventListener("click", () => {
            this._likeCard()
        });
        this._element.querySelector(".card__picture").addEventListener("click", () => {
            this._zoomImage()
        });
    }

    //Обработчик удаления карточки
    _handleDeleteCard() {
        this._element
            .querySelector(".card__like-button")
            .removeEventListener("click", () => {
                this._likeCard()
            });
        this._element
            .querySelector(".card__remove-button")
            .removeEventListener("click", () => {
                this._handleDeleteCard()
            });
        this._element
            .querySelector(".card__picture")
            .removeEventListener("click", () => {
                this._zoomImage()
            });
        this._element.remove();
        this._element = null;
    }
    //Лайк карточки
    _likeCard() {
        this._element.querySelector(".card__like-button").classList.toggle("card__like-button_mode_active");
    }

}