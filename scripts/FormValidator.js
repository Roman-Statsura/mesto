class FormValidator{
    constructor(form){
        this.form = form;
    }
    isValidate(input) {

        input.setCustomValidity('');

        if (input.validity.valueMissing) {
          input.setCustomValidity(errorMessages.empty);
          return false
        }

        if (input.validity.tooShort || input.validity.tooLong) {
          input.setCustomValidity(errorMessages.wrongLength);
          return false
        }

        if (input.validity.typeMismatch && input.type === 'url') {
          input.setCustomValidity(errorMessages.wrongUrl);
          return false
        }
        return input.checkValidity();
      }
    isFieldValid(input) {
        const errorElem = input.parentNode.querySelector(`#${input.id}-error`);
        const valid = this.isValidate(input);
        errorElem.textContent = input.validationMessage;
        return valid;
      }
    setSubmitButtonState(button, state) {
        if (state) {
          button.removeAttribute('disabled');
          button.classList.add('popup__button_dark');
        } else {
          button.setAttribute('disabled', true);
          button.classList.remove('popup__button_dark');
        }
      }
    setEventListeners = function (buttonClose) {

        const submit = this.form.querySelector('.button');
        const [...inputs] = this.form.querySelectorAll('.popup__input');
        inputs.forEach((item) => {
          item.addEventListener('input', () => {
            this.isFieldValid(item);

            if (inputs.every(this.isValidate)) {
              this.setSubmitButtonState(submit, true);
            } else {
              this.setSubmitButtonState(submit, false);
            }
          });
        });
        buttonClose.addEventListener("click", this.clearTheField);
    }
    clearTheField = () => {
        const [...inputs] = this.form.querySelectorAll('.popup__input');
        const [...errors] = this.form.querySelectorAll(".error");

        errors.forEach(function (item) {
            item.textContent = '';
        });
        inputs.forEach(function (item) {
            item.setCustomValidity('');
        });
    }
}
