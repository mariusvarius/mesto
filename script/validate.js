function enableValidation({
  formSelector,
  ...rest
}) {
  const formList = Array.from(document.querySelectorAll(formSelector));
  console.log(formList);
  formList.forEach((formElement) => {
    formElement.addEventListener("submit", (evt) => {
      evt.preventDefault();
    });
    setEventListeners(formElement, rest);
  });
}

function setEventListeners(
  formElement, {
    inputSelector,
    submitButtonSelector,
    ...rest
  }
) {
  const inputList = Array.from(formElement.querySelectorAll(inputSelector));
  const buttonElement = formElement.querySelector(submitButtonSelector);
  console.log(inputList);
  inputList.forEach((inputElement) => {
    inputElement.addEventListener("input", () => {
      isValid(formElement, inputElement, rest);
      toggleButtonState(buttonElement, inputList, rest);
    });
  });
}

function showInputError(
  formElement,
  inputElement,
  errorMessage, {
    inputErrorClass,
    errorClass
  }
) {
  const errorElement = formElement.querySelector(`#${inputElement.id}-error`);
  inputElement.classList.add(inputErrorClass);
  errorElement.textContent = errorMessage;
  errorElement.classList.add(errorClass);
}

function hideInputError(
  formElement,
  inputElement, {
    inputErrorClass,
    errorClass
  }
) {
  const errorElement = formElement.querySelector(`#${inputElement.id}-error`);
  inputElement.classList.remove(inputErrorClass);
  errorElement.classList.remove(errorClass);
  errorElement.textContent = "";
}

function hasInvalidInput(inputList) {
  return inputList.some((inputElement) => {
    return !inputElement.validity.valid;
  });
}

function toggleButtonState(buttonElement, inputList, {
  inactiveButtonClass
}) {
  if (hasInvalidInput(inputList)) {
    buttonElement.classList.add(inactiveButtonClass);
    buttonElement.setAttribute('disabled');
  } else {
    buttonElement.classList.remove(inactiveButtonClass);
    buttonElement.removeAttribute('disabled');
  }
}

function isValid(formElement, inputElement, rest) {
  if (!inputElement.validity.valid) {
    showInputError(
      formElement,
      inputElement,
      inputElement.validationMessage,
      rest
    );
  } else {
    hideInputError(formElement, inputElement, rest);
  }
}

enableValidation({
  formSelector: ".popup__container",
  inputSelector: ".popup__input",
  submitButtonSelector: ".popup__save-button",
  inactiveButtonClass: "popup__save-button_disabled",
  inputErrorClass: "popup__input_type_error",
  errorClass: "popup__input-error_mode_active",
});