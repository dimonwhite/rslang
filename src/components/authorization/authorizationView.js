import { createElement, getSvg } from '@/utils';
import { blackGradient } from '@/constants';

export default class AuthorizationView {
  constructor() {
    this.main = document.getElementById('main');
    this.btnLogin = document.querySelector('.header__user-login');
    this.popUp = createElement({ tag: 'div', class: 'pop-up' });
  }

  renderPopUp() {
    this.popUp.innerHTML = getSvg('close');

    this.formWrap = createElement({ tag: 'div', class: 'form-wrap' });
    this.popUp.append(this.formWrap);

    this.main.append(this.popUp);

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
