import { checkAuthorized } from '@/utils';
import AuthorizationView from './authorizationView';
import AuthorizationModel from './authorizationModel';
import HttpClient from '../httpclient/HttpClient';

export default class AuthorizationController {
  constructor() {
    this.formType = {
      signIn: 'signIn',
      signUp: 'signUp',
    };
    this.activeForm = this.formType.signIn;

    this.showFormListener = this.showForm.bind(this);
    this.popUpListener = this.clickPopUp.bind(this);
    this.unauthorizedListener = this.unauthorized.bind(this);

    this.user = new HttpClient(this.unauthorizedListener);

    this.model = new AuthorizationModel(this.user);
    this.view = new AuthorizationView();
  }

  create() {
    console.log(checkAuthorized());

    this.initUnauthorized();
    /* if (checkAuthorized()) {
      this.initAuthorized();
    } else {
      this.initUnauthorized();
    } */
  }

  authorized() {
    this.view.popUp.remove();
    this.view.background.remove();
    this.view.clearform();

    this.initAuthorized();
  }

  initAuthorized() {
    this.view.createLogoutBtn();

    this.view.btnLogin.addEventListener('click', this.unauthorizedListener);
  }

  unauthorized() {
    this.view.btnLogin.removeEventListener('click', this.unauthorizedListener);

    // this.model.removeLocalUser();
    this.view.createLoginBtn();
    this.initUnauthorized();
  }

  initUnauthorized() {
    this.view.createLoginBtn();

    this.view.btnLogin.addEventListener('click', this.showFormListener);
    this.view.popUp.addEventListener('click', this.popUpListener);
  }

  /*--------------------------------------------------------*/

  showForm() {
    this.view.renderPopUp();
    this.initForm();
  }

  initForm() {
    this.view.form.addEventListener('submit', (e) => {
      e.preventDefault();

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
  }

  async signIn(data) {
    if (await this.model.signIn(data)) {
      this.view.btnLogin.removeEventListener('click', this.showFormListener);
      this.view.popUp.removeEventListener('click', this.popUpListener);

      this.authorized();
    } else {
      this.showError();
    }
  }

  async signUp(data) {
    if (await this.model.signUp(data)) {
      if (!await this.model.signIn(data)) {
        this.showError();
        return;
      }

      if (!await this.model.createStatistic()) {
        this.showError();
        return;
      }

      if (!await this.model.createSettings()) {
        this.showError();
        return;
      }

      this.view.btnLogin.removeEventListener('click', this.showFormListener);
      this.view.popUp.removeEventListener('click', this.popUpListener);

      this.authorized();
    } else {
      this.showError();
    }
  }

  clickPopUp(e) {
    if (e.target.closest('.close-icon')) {
      this.view.popUp.remove();
      this.view.background.remove();
      this.view.clearform();
    }

    if (e.target.closest('.form-signUp__link')) {
      this.toggleForm();
    }

    if (e.target.closest('.getUser')) {
      this.model.getUser();
    }
    if (e.target.closest('.createStatistic')) {
      this.model.createStatistic();
    }
    if (e.target.closest('.createSettings')) {
      this.model.createSettings();
    }
    if (e.target.closest('.logStatistic')) {
      this.model.logStatistic();
    }
    if (e.target.closest('.logSettings')) {
      this.model.logSettings();
    }
    if (e.target.closest('.removeUser')) {
      this.model.removeUser();
    }
  }

  /*--------------------------------------------------------*/

  toggleForm() {
    this.view.clearform();
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
    this.view.showError(this.model.error);
    this.model.error = undefined;
  }

  removeError() {
    this.view.error.remove();
  }
}
