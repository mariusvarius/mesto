//Импорт CSS
import "../../index/index.css";
//Импорт констант
import {
  editButton,
  addButton,
  title,
  subtitle,
  profileNameInput,
  profileJobInput,
  placeNameInput,
  placeLinkInput,
  placeForm,
  profileForm,
  avatarForm,
  editButtonAvatar,
  config
} from "../utils/constants.js";

//Импорт классов
import {
  Card
} from "../components/Сard.js";
import {
  PopupWithForm
} from "../components/PopupWithForm.js";
import {
  PopupWithImage
} from "../components/PopupWithImage.js";
import {
  UserInfo
} from "../components/UserInfo.js";
import {
  Section
} from "../components/Section.js";
import {
  Api
} from "../components/Api.js";

import {
  PopupWithFormSubmit
} from "../components/PopupWithFormSubmit.js";

//Импорт класса валидации
import {
  FormValidator
} from "../components/FormValidator.js";

//Запуск валидации для каждого попапа
const newValidationPlace = new FormValidator(config, placeForm);
newValidationPlace.enableValidation();

const newValidationProfile = new FormValidator(config, profileForm);
newValidationProfile.enableValidation();

const newValidationAvatar = new FormValidator(config, avatarForm);
newValidationAvatar.enableValidation();

//Новый экземпляр класса Api
const api = new Api({
  baseUrl: 'https://mesto.nomoreparties.co/v1/cohort-14/cards',
  headers: {
    'Content-Type': 'application/json',
    authorization: '8dfe63c4-625a-48d6-87ec-294d98f8761b'
  }
});

api.getAppInfo().then(res => {
  const [cardsFromServer, userInfoFromServer] = res
  console.log(res);

  //Новый экземпляр класса UserInfo
  const newUserInfo = new UserInfo({
    profileNameSelector: ".profile__title",
    profileJobSelector: ".profile__subtitle",
    profileAvatarSelector: ".profile__avatar"

  });
  newUserInfo.setUserInfo({
    name: userInfoFromServer.name,
    about: userInfoFromServer.about,
    avatar: userInfoFromServer.avatar
  });

  //Новый экземпляр класса Section с логикой загрузки карточек с сервера
  const cardList = new Section({
      items: cardsFromServer,
      renderer: (data) => {
        const card = new Card({
            data,
            handleCardClick: () => {
              newPopupWithImage.popupOpen(data);
            },
            handleCardLike: () => {
              api.likeCard(data._id).then(res => {
                card.updateLikes(res.likes);
              })
            },
            handleCardDislike: () => {
              api.dislikeCard(data._id).then(res => {
                card.updateLikes(res.likes);
              })
            },
            handleCardDelete: () => {
              newPopupWithFormSubmit.popupOpen();
              newPopupWithFormSubmit.setSubmitAction(() => {
                newPopupWithFormSubmit.activatePreload();
                api.deleteItem(data._id).then(res => {
                    card._handleDeleteCard();
                  })
                  .catch((err) => {
                    console.log(err);
                  })
                newPopupWithFormSubmit.popupClose();
              })
              console.log('удаление!')
            },
            userId: userInfoFromServer._id
          },
          ".card-template"
        );
        const cardElement = card.generateCard();
        cardList.addItem(cardElement);
      },
    },
    ".cards"
  );
  cardList.renderItems();


  //Новый экземпляр создания попапа места с логикой добавления новой карточки
  const newPopupWithFormPlace = new PopupWithForm({
    popupSelector: ".popup_type_place",
    handleFormSubmit: (item) => {
      console.log(item);
      api.createItem(item)
        .then(res => {
          const card = new Card({
              data: res,
              handleCardClick: () => {
                newPopupWithImage.popupOpen(res, ".popup_type_picture");
              },
              handleCardLike: () => {
                api.likeCard(res._id).then(res => {
                  card.updateLikes(res.likes);
                  console.log('like!');
                })
              },
              handleCardDislike: () => {
                api.dislikeCard(res._id).then(res => {
                  card.updateLikes(res.likes);
                });
              },

              handleCardDelete: () => {
                newPopupWithFormSubmit.popupOpen();
                newPopupWithFormSubmit.setSubmitAction(() => {
                  newPopupWithFormSubmit.activatePreload();
                  api.deleteItem(res._id).then(res => {
                      card._handleDeleteCard();

                    })
                    .catch((err) => {
                      console.log(err);
                    })
                  newPopupWithFormSubmit.popupClose();
                })
                console.log('удаление!')
              },
              userId: userInfoFromServer._id
            },
            ".card-template"
          );
          const cardElement = card.generateCard();
          cardList.addNewItem(cardElement);
          newPopupWithFormPlace.popupClose();
        })
    }
  });

  //Новый экземпляр класса попапа профиля
  const newPopupWithFormProfile = new PopupWithForm({
    popupSelector: ".popup_type_profile",
    handleFormSubmit: (data) => {
      newPopupWithFormProfile.activatePreload();
      api.editProfile(data).then(res => {
        newUserInfo.setUserInfo(data);
        newPopupWithFormProfile.disablePreload();
      })
      newPopupWithFormProfile.popupClose();
    },

  });

  //Новый экземпляр класса попапа с аватаркой
  const newPopupWithFormAvatar = new PopupWithForm({
    popupSelector: ".popup_type_avatar",
    handleFormSubmit: (data) => {
      newPopupWithFormAvatar.activatePreload();
      console.log(data);
      api.patchAvatar(data).then(res => {
        console.log(data.avatar);
        newUserInfo.setUserAvatar(data.avatar)
      })
      newPopupWithFormAvatar.disablePreload();
    },
  })

  //Новый экземпляр попапа с изображением
  const newPopupWithImage = new PopupWithImage(".popup_type_picture");

  //Новый экземпляр попапа с подтверждением отменя удаления карточки
  const newPopupWithFormSubmit = new PopupWithFormSubmit(".popup_type_delete");

  //Обработчик для открытия попапа профиля
  function handleOpenProfilePopup(newUserInfo) {
    profileNameInput.value = title.textContent;
    profileJobInput.value = subtitle.textContent;
    newValidationProfile.resetForm();
    newPopupWithFormProfile.popupOpen();
  }

  //Обработчик открытия попапа места
  function handleOpenPlacePopup() {
    newValidationPlace.resetForm();
    placeNameInput.value = "";
    placeLinkInput.value = "";
    newPopupWithFormPlace.popupOpen();
  }

  //Обработчик открытия попапа аватарки
  function handleOpenAvatarPopup() {
    newValidationAvatar.resetForm();
    newPopupWithFormAvatar.popupOpen();
  }

  //Установка слушателей событий на обработчики попапов
  addButton.addEventListener("click", () => handleOpenPlacePopup());
  editButton.addEventListener("click", () => handleOpenProfilePopup());
  editButtonAvatar.addEventListener("click", () => handleOpenAvatarPopup());


  return {
    cardList,
    newPopupWithFormPlace,
    newPopupWithFormProfile,
    newPopupWithImage,
    newPopupWithFormAvatar,
    newPopupWithFormSubmit
  }

}).then(res => {
  const {
    newPopupWithFormPlace,
    newPopupWithFormProfile,
    newPopupWithImage,
    newPopupWithFormAvatar,
    newPopupWithFormSubmit
  } = res

  //Установка слушателей событий на экземпляры классов
  newPopupWithFormPlace.setEventListeners();
  newPopupWithFormProfile.setEventListeners();
  newPopupWithImage.setEventListeners();
  newPopupWithFormSubmit.setEventListeners();
  newPopupWithFormAvatar.setEventListeners();

})