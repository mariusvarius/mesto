export class Card {
    constructor(name, link, cardSelector) {
        this._name = name;
        this._link = link;
        this._cardSelector = cardSelector;
    }

    _getTemplate() {
        const cardElement = document
            .querySelector(this._cardSelector)
            .content
            .querySelector('.card')
            .cloneNode(true);
        return cardElement;
    }

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


    generateCard() {
        this._element = this._getTemplate();
        this._setEventListeners();
        this._element.querySelector(".card__name").textContent = this._name;
        this._element.querySelector(".card__picture").src = this._link;
        this._element.querySelector(".card__picture").alt = this._name;
        return this._element;
    }

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

    _likeCard() {
        this._element.querySelector(".card__like-button").classList.toggle("card__like-button_mode_active");
    }

    _zoomImage() {
        document.querySelector(".popup__big-picture").src = this._link;
        document.querySelector(".popup__big-picture").alt = this._name;
        document.querySelector(".popup__capture").textContent = this._name;
        document.querySelector(".popup_type_picture").classList.add("popup_opened");
    }


}