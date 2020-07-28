//Импорт функций
import {
    closeByEsc,
    popupActivate,
    popupDisable
} from '../script/index.js';

//Класс карточки
export class Card {
    constructor(name, link, cardSelector) {
        this._name = name;
        this._link = link;
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

    //Создание карточки
    generateCard() {
        this._element = this._getTemplate();
        this._setEventListeners();
        this._element.querySelector(".card__name").textContent = this._name;
        const cardPic = this._element.querySelector(".card__picture");
        cardPic.src = this._link;
        cardPic.alt = this._name;
        return this._element;
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
    //Увеличение изображения
    _zoomImage() {
        const popupPicElement = document.querySelector(".popup_type_picture");
        const popupPicture = document.querySelector(".popup__big-picture");
        popupPicture.src = this._link;
        popupPicture.alt = this._name;
        popupPicElement.querySelector(".popup__capture").textContent = this._name;
        popupActivate(popupPicElement);
        document.addEventListener("keydown", closeByEsc);
    };
}