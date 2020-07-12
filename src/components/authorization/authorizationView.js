import { createElement } from '@/utils';
import { blackGradient } from '@/constants';

export default class AuthorizationView {
  constructor() {
    this.main = document.getElementById('main');
    this.btnLogin = document.querySelector('.header__user-login');
    this.popUp = createElement({ tag: 'div', class: 'pop-up' });
  }

  renderPopUp() {
    /* this.popUp.innerHTML = `<svg class="svg_icon pop-up__close">
      <use xlink:href="sprite.svg#close"></use>
    </svg>`; */

    this.formWrap = createElement({ tag: 'div', class: 'form-wrap' });
    this.popUp.append(this.formWrap);

    this.main.append(this.popUp);

    this.error = createElement({ tag: 'div', class: 'pop-up__error' });
    this.main.append(this.error);

    this.createBackground();
  }

  createSignIn() {
    if (this.popUp.classList.contains('sing-up')) {
      this.popUp.classList.remove('sing-up');
    }
    this.popUp.classList.add('sing-in');

    this.createForm('Войти');

    this.formBtn = createElement({ tag: 'div', class: 'form-wrap__link', content: 'Регистрация' });

    this.formWrap.innerHTML = `<svg class="svg_icon form-wrap__auth-user">
      <use xlink:href="sprite.svg#auth-user"></use>
    </svg>`;

    this.formWrap.append(this.form);
    this.formWrap.append(this.formBtn);
  }

  createSignUp() {
    if (this.popUp.classList.contains('sing-in')) {
      this.popUp.classList.remove('sing-in');
    }
    this.popUp.classList.add('sing-up');

    this.createForm('Регистрация');

    this.hiText = createElement({ tag: 'div', class: 'form-wrap__hiText', content: 'Привет, создай свой профиль' });
    this.formBtn = createElement({ tag: 'div', class: 'form-wrap__link', content: 'Войти' });

    this.formWrap.innerHTML = `<svg class="svg_icon form-wrap__auth-user">
      <use xlink:href="sprite.svg#auth-user"></use>
    </svg>`;

    this.formWrap.append(this.hiText);
    this.formWrap.append(this.form);
    this.formWrap.append(this.formBtn);
  }

  createForm(submitValue) {
    this.form = createElement({ tag: 'form', class: 'form-auth' });
    this.form.setAttribute('enctype', 'text/plain');
    this.form.setAttribute('method', 'POST');

    this.formLogin = createElement({ tag: 'input', class: 'form-auth__input form-auth__login' });
    this.formLogin.setAttribute('type', 'text');
    this.formLogin.setAttribute('name', 'login');
    this.formLogin.setAttribute('placeholder', 'Имя пользователя');

    this.formPassword = createElement({ tag: 'input', class: 'form-auth__input form-auth__password' });
    this.formPassword.setAttribute('type', 'password');
    this.formPassword.setAttribute('name', 'password');
    this.formPassword.setAttribute('placeholder', 'Пароль');

    this.formSubmit = createElement({ tag: 'input', class: 'form-auth__submit' });
    this.formSubmit.setAttribute('type', 'submit');
    this.formSubmit.setAttribute('value', submitValue);

    this.form.append(this.formLogin);
    this.form.append(this.formPassword);
    this.form.append(this.formSubmit);
  }

  createBackground() {
    this.background = createElement({ tag: 'div', class: 'auth-background' });
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

  createError(error) {
    this.error.innerHTML = `<div class="pop-up__error-text">${error}</div>`;
  }
}
