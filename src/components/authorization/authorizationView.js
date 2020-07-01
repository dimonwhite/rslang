import { createElement } from '@/utils';
import { blackGradient } from '@/constants';

export default class AuthorizationModel {
  constructor() {
    this.main = document.getElementById('main');
    this.btnLogin = document.querySelector('.header__user-login');
    this.popUp = createElement({ tag: 'div', class: 'pop-up' });
  }

  renderPopUp() {
    this.popUp.innerHTML = `<svg class="login-form__close close-icon" width="36" height="36" viewBox="0 0 36 36" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path class="close-icon__path" d="M34.9001 7.60001L27.9001 0.600009C27.3001 9.14931e-06 26.3 9.14931e-06 25.7 0.600009L19 7.30001C18.4 7.90001 17.4001 7.90001 16.8001 7.30001L10.1 0.600009C9.50002 9.14931e-06 8.50007 9.14931e-06 7.90007 0.600009L0.900073 7.60001C0.300073 8.20001 0.300073 9.20001 0.900073 9.80001L7.60002 16.5C8.20002 17.1 8.20002 18.1 7.60002 18.7L0.900073 25.4C0.300073 26 0.300073 27 0.900073 27.6L7.90007 34.6C8.50007 35.2 9.50002 35.2 10.1 34.6L16.8001 27.9C17.4001 27.3 18.4 27.3 19 27.9L25.7 34.6C26.3 35.2 27.3001 35.2 27.9001 34.6L34.9001 27.6C35.5001 27 35.5001 26 34.9001 25.4L28.2 18.7C27.6 18.1 27.6 17.1 28.2 16.5L34.9001 9.80001C35.5001 9.10001 35.5001 8.20001 34.9001 7.60001Z" fill="#A586FF"/>
    </svg>`;

    this.formWrap = createElement({ tag: 'div', class: 'form-wrap' });
    this.popUp.append(this.formWrap);

    this.main.append(this.popUp);

    /* this.getUser = createElement({ tag: 'div', class: 'getUser', content: 'getUser' });
    this.formWrap.append(this.getUser);

    this.createStatistic = createElement({
      tag: 'div',
      class: 'createStatistic',
      content: 'createStatistic'
    });
    this.createSettings = createElement({
      tag: 'div',
      class: 'createSettings',
      content: 'createSettings'
    });
    this.formWrap.append(this.createStatistic);
    this.formWrap.append(this.createSettings);

    this.logStatistic = createElement({
      tag: 'div',
      class: 'logStatistic',
      content: 'logStatistic'
    });
    this.logSettings = createElement({ tag: 'div', class: 'logSettings', content: 'logSettings' });
    this.removeUser = createElement({ tag: 'div', class: 'removeUser', content: 'removeUser' });
    this.formWrap.append(this.logStatistic);
    this.formWrap.append(this.logSettings);
    this.formWrap.append(this.removeUser); */

    this.createBackground();
  }

  createSignIn() {
    this.popTitle = createElement({ tag: 'p', class: 'pop-up__title', content: 'Войти' });

    this.createForm();

    this.formBtn = createElement({ tag: 'div', class: 'form-auth__link', content: 'Регистрация' });

    this.formWrap.append(this.popTitle);
    this.formWrap.append(this.form);
    this.formWrap.append(this.formBtn);
  }

  createSignUp() {
    this.popTitle = createElement({ tag: 'p', class: 'pop-up__title', content: 'Регистрация' });

    this.createForm();

    this.formBtn = createElement({ tag: 'div', class: 'form-auth__link', content: 'Войти' });

    this.formWrap.append(this.popTitle);
    this.formWrap.append(this.form);
    this.formWrap.append(this.formBtn);
  }

  createForm() {
    this.form = createElement({ tag: 'form', class: 'form-auth' });
    this.form.setAttribute('enctype', 'text/plain');
    this.form.setAttribute('method', 'POST');

    this.formLogin = createElement({ tag: 'input', class: 'form-auth__input form-auth__login' });
    this.formLogin.setAttribute('type', 'text');
    this.formLogin.setAttribute('name', 'login');
    this.formLogin.setAttribute('placeholder', 'Login');

    this.formPassword = createElement({ tag: 'input', class: 'form-auth__input form-auth__password' });
    this.formPassword.setAttribute('type', 'password');
    this.formPassword.setAttribute('name', 'password');
    this.formPassword.setAttribute('placeholder', 'Password');

    this.formSubmit = createElement({ tag: 'input', class: 'form-auth__submit' });
    this.formSubmit.setAttribute('type', 'submit');
    this.formSubmit.setAttribute('value', 'Отправить');

    this.form.append(this.formLogin);
    this.form.append(this.formPassword);
    this.form.append(this.formSubmit);
  }

  createBackground() {
    this.background = createElement({ tag: 'div', class: 'background' });
    this.background.style.background = blackGradient;
    this.main.append(this.background);
  }

  clearForm() {
    this.popUp.innerHTML = '';
  }

  clearFormWrap() {
    this.formWrap.innerHTML = '';
  }

  createLoginBtn() {
    this.btnLogin.innerHTML = `<svg class="svg_icon">
      <use xlink:href="sprite.svg#login"></use>
    </svg>`;
  }

  createLogoutBtn() {
    this.btnLogin.innerHTML = 'logout';
  }

  showError(error) {
    this.error = createElement({ tag: 'div', class: 'form-auth__error', content: error });
    this.formWrap.append(this.error);
  }
}
