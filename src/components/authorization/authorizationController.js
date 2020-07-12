import AuthorizationView from './authorizationView';
import AuthorizationModel from './authorizationModel';

export default class AuthorizationController {
  constructor() {
    this.view = new AuthorizationView();

    this.formType = {
      signIn: 'signIn',
      signUp: 'signUp',
    };
    this.activeForm = this.formType.signIn;
    this.defaulPage = '#/promo';

    this.showPopUpListener = this.showPopUp.bind(this);
    this.clickPopUpListener = this.clickPopUp.bind(this);
    this.unauthorizedListener = this.unauthorized.bind(this);
  }

  async create(http) {
    this.http = http;
    this.model = new AuthorizationModel(http);

    const isAuthorized = await this.model.checkAuthorized();

    if (isAuthorized) {
      this.initAuthorized();
    } else {
      this.initUnauthorized();
    }
  }

  authorized() {
    this.view.error.remove();
    this.view.popUp.remove();
    this.view.background.remove();
    this.view.clearForm();

    this.initAuthorized();
  }

  initAuthorized() {
    document.body.classList.remove('unauthorized');
    this.view.createLogoutBtn();

    this.view.btnLogin.addEventListener('click', this.unauthorizedListener);
  }

  unauthorized() {
    this.view.btnLogin.removeEventListener('click', this.unauthorizedListener);

    this.model.removeLocalUser();
    this.view.createLoginBtn();
    this.initUnauthorized();

    if (window.location.hash !== this.defaulPage) {
      window.location.hash = this.defaulPage;
    }
  }

  initUnauthorized() {
    document.body.classList.add('unauthorized');
    this.view.createLoginBtn();

    this.view.btnLogin.addEventListener('click', this.showPopUpListener);
    this.view.popUp.addEventListener('click', this.clickPopUpListener);
  }

  showPopUp() {
    this.view.renderPopUp();

    if (this.activeForm === this.formType.signIn) {
      this.view.createSignIn();
    }

    if (this.activeForm === this.formType.signUp) {
      this.view.createSignUp();
    }

    this.initForm();
  }

  initForm() {
    this.view.form.addEventListener('submit', (e) => {
      e.preventDefault();

      if (this.view.error) {
        this.removeError();
      }

      const data = {
        email: this.view.formLogin.value,
        password: this.view.formPassword.value,
      };

      if (this.activeForm === this.formType.signIn) {
        this.signIn(data);
        return;
      }

      if (this.activeForm === this.formType.signUp) {
        this.signUp(data);
      }
    });

    this.view.background.addEventListener('click', () => {
      this.isClickOutside();
    });
  }

  async signIn(data) {
    const isSignIn = await this.model.signIn(data);

    if (isSignIn) {
      this.view.btnLogin.removeEventListener('click', this.showPopUpListener);
      this.view.popUp.removeEventListener('click', this.clickPopUpListener);

      this.authorized();
    } else {
      this.showError();
    }
  }

  async signUp(data) {
    const isSignUp = await this.model.signUp(data);

    if (isSignUp) {
      const isSignIn = await this.model.signIn(data);
      if (!isSignIn) {
        this.showError();
        return;
      }

      const isCreateStatistic = await this.model.createStatistic();
      if (!isCreateStatistic) {
        this.showError();
        return;
      }

      const isCreateSettings = await this.model.createSettings();
      if (!isCreateSettings) {
        this.showError();
        return;
      }

      await this.model.createWords();

      this.view.btnLogin.removeEventListener('click', this.showPopUpListener);
      this.view.popUp.removeEventListener('click', this.clickPopUpListener);

      this.authorized();
    } else {
      this.showError();
    }
  }

  clickPopUp(e) {
    if (e.target.closest('.form-wrap__link')) {
      this.toggleForm();
    }
  }

  toggleForm() {
    this.view.clearFormWrap();
    if (this.view.error) {
      this.removeError();
    }

    if (this.activeForm === this.formType.signIn) {
      this.activeForm = this.formType.signUp;
      this.view.createSignUp();
      this.initForm();
      return;
    }

    if (this.activeForm === this.formType.signUp) {
      this.activeForm = this.formType.signIn;
      this.view.createSignIn();
      this.initForm();
    }
  }

  showError() {
    this.view.createError(this.model.error);
    this.view.error.classList.add('pop-up__error_active');
    this.model.error = undefined;
  }

  removeError() {
    this.view.error.classList.remove('pop-up__error_active');
  }

  isClickOutside() {
    this.view.error.remove();
    this.view.popUp.remove();
    this.view.background.remove();
    this.view.clearForm();
  }
}
