//Класс карточки
export class Card {
    constructor({
        data,
        handleCardClick,
        handleCardLike,
        handleCardDislike,
        handleCardDelete,
        userId

    }, cardSelector) {
        this._name = data.name;
        this._link = data.link;
        this._id = data._id;
        this._likes = data.likes;
        this._handleCardClick = handleCardClick;
        this._handleCardLike = handleCardLike;
        this._handleCardDislike = handleCardDislike;
        this._handleCardDelete = handleCardDelete;
        this._userId = userId;
        this._cardOwnerId = data.owner._id;
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

    updateLikes(likes) {
        this._likes = likes;
        this.renderLikes();
    }

    _isLiked() {
        return this._likes.some((like) => {
            return like._id === this._userId;
        });
    }

    renderLikes() {
        this._likesCounter.textContent = this._likes.length;
        if (this._isLiked()) {
            this._likeButton.classList.add("card__like-button_mode_active");
        } else {
            this._likeButton.classList.remove("card__like-button_mode_active");
        };
    }

    //Создание карточки
    generateCard() {
        this._element = this._getTemplate();
        this._likeButton = this._element.querySelector(".card__like-button");
        this._likesCounter = this._element.querySelector(".card__like-counter");
        this.renderLikes();
        this._setEventListeners();
        this._element.querySelector(".card__name").textContent = this._name;
        const cardPic = this._element.querySelector(".card__picture");
        cardPic.src = this._link;
        cardPic.alt = this._name;
        if (this._cardOwnerId !== this._userId) {
            this._element.querySelector(".card__remove-button").classList.add("card__remove-button_mode_inactive")
        };

        return this._element;
    }

    //Установка слушателей
    _setEventListeners() {
        this._element.querySelector(".card__remove-button").addEventListener("click", () => {
            this._handleCardDelete()
        });
        this._element.querySelector(".card__like-button").addEventListener("click", () => {
            if (!this._likeButton.classList.contains("card__like-button_mode_active")) {
                this._handleCardLike();
            } else {
                this._handleCardDislike();
            };

        });
        this._element.querySelector(".card__picture").addEventListener("click", (evt) => {
            this._handleCardClick();
        });
    }

    //Обработчик удаления карточки
    _handleDeleteCard() {
        this._element.remove();
        this._element = null;
    }


}