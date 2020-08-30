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
  initialCards,
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
  const newUserInfo = new UserInfo({
    profileNameSelector: ".profile__title",
    profileJobSelector: ".profile__subtitle",
  });
  newUserInfo.setUserInfo({
    name: userInfoFromServer.name,
    job: userInfoFromServer.about
  });

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
              console.log('удаление!')
              api.deleteItem(data._id).then(res => {
                card._handleDeleteCard();
              })
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
                })
              },
              handleCardDisLike: () => {
                //
              },

              handleCardDelete: () => {
                console.log('удаление')
                api.deleteItem(res._id).then(res => {
                  card._handleDeleteCard()
                })
              }
            },
            ".card-template"
          );
          const cardElement = card.generateCard();
          cardList.addNewItem(cardElement);
          newPopupWithFormPlace.popupClose();
        })
    }
  });


  function handleOpenPlacePopup() {
    newValidationPlace.resetForm();
    placeNameInput.value = "";
    placeLinkInput.value = "";
    newPopupWithFormPlace.popupOpen();
  };
  addButton.addEventListener("click", () => handleOpenPlacePopup());
  editButton.addEventListener("click", () => handleOpenProfilePopup());


  //Новый экземпляр класса попапа профиля
  const newPopupWithFormProfile = new PopupWithForm({
    popupSelector: ".popup_type_profile",
    handleFormSubmit: (data) => {
      newUserInfo.setUserInfo(data);
      newPopupWithFormProfile.popupClose();
    },
  });

  //Обработчик для открытия попапа профиля
  function handleOpenProfilePopup(newUserInfo) {
    profileNameInput.value = title.textContent;
    profileJobInput.value = subtitle.textContent;
    newValidationProfile.resetForm();
    newPopupWithFormProfile.popupOpen();
  }

  const newPopupWithImage = new PopupWithImage(".popup_type_picture");


  return {
    cardList,
    newPopupWithFormPlace,
    newPopupWithFormProfile,
    newPopupWithImage
  }

}).then(res => {
  const {
    newPopupWithFormPlace,
    newPopupWithFormProfile,
    newPopupWithImage
  } = res

  newPopupWithFormPlace.setEventListeners();
  newPopupWithFormProfile.setEventListeners();
  newPopupWithImage.setEventListeners();

})


// //Начальная загрузка карточек с сервера
// api.getItems().then(result => {
//     const cardList = new Section({
//         items: result,
//         renderer: (data) => {
//           const card = new Card({
//               data,
//               handleCardClick: () => {
//                 newPopupWithImage.popupOpen(data);
//               },
//             },
//             ".card-template"
//           );
//           const cardElement = card.generateCard();
//           cardList.addItem(cardElement);
//         },
//       },
//       ".cards"
//     );
//     // const newUserInfo = new UserInfo({
//     //   profileNameSelector: ".profile__title",
//     //   profileJobSelector: ".profile__subtitle",
//     // });
//     cardList.renderItems();
//     return cardList;
//   })
//   .then((cardList) => {
//     console.log(cardList);
//     const newPopupWithFormPlace = new PopupWithForm({
//       popupSelector: ".popup_type_place",
//       handleFormSubmit: (item) => {
//         console.log(item);
//         api.createItem(item)
//           .then(res => {
//             const card = new Card({
//                 data: res,
//                 handleCardClick: () => {
//                   newPopupWithImage.popupOpen(res, ".popup_type_picture");
//                 },
//               },
//               ".card-template"
//             );
//             const cardElement = card.generateCard();
//             cardList.addNewItem(cardElement);
//             newPopupWithFormPlace.popupClose();
//           })
//       }
//     });
//     newPopupWithFormPlace.setEventListeners();

//     function handleOpenPlacePopup() {
//       newValidationPlace.resetForm();
//       placeNameInput.value = "";
//       placeLinkInput.value = "";
//       newPopupWithFormPlace.popupOpen();
//     };
//     addButton.addEventListener("click", () => handleOpenPlacePopup());
//   });



//Новый экземпляр класса с информацией о пользователе


//Новый экземпляр класса попапа профиля
// const newPopupWithFormProfile = new PopupWithForm({
//   popupSelector: ".popup_type_profile",
//   handleFormSubmit: (data) => {
//     newUserInfo.setUserInfo(data);
//     newPopupWithFormProfile.popupClose();
//   },
// });
// newPopupWithFormProfile.setEventListeners();

// //Обработчик для открытия попапа профиля
// function handleOpenProfilePopup() {
//   profileNameInput.value = title.textContent;
//   profileJobInput.value = subtitle.textContent;
//   newValidationProfile.resetForm();
//   newPopupWithFormProfile.popupOpen();
// }



//Обработчик для открытия попапа места
// function handleOpenPlacePopup() {
//   newValidationPlace.resetForm();
//   placeNameInput.value = "";
//   placeLinkInput.value = "";
//   newPopupWithFormPlace.popupOpen();
// }

//Новый экземпляр попапа с картинкой
// const newPopupWithImage = new PopupWithImage(".popup_type_picture");
// newPopupWithImage.setEventListeners();

// // Слушатель для открытия попапа места (карточки)
// addButton.addEventListener("click", () => handleOpenPlacePopup());

// Слушатель для открытия попапа профиля
// editButton.addEventListener("click", () => handleOpenProfilePopup());