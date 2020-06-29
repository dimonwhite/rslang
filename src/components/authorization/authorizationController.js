import AuthorizationView from './authorizationView';
import AuthorizationModel from './authorizationModel';

export default class AuthorizationController {
  constructor() {
    this.model = new AuthorizationModel();
    this.view = new AuthorizationView();

    this.formType = {
      signIn: 'signIn',
      signUp: 'signUp',
    };
    this.activeForm = this.formType.signIn;
  }

  create() {
    this.init();
  }

  init() {
    this.view.btnLogin.addEventListener('click', () => {
      this.view.renderPopUp();
      this.initForm();
    });

    this.view.popUp.addEventListener('click', (e) => {
      this.clickWrapForm(e);
    });
  }

  initForm() {
    this.view.form.addEventListener('submit', (e) => {
      e.preventDefault();

      const data = {
        email: this.view.formLogin.value,
        password: this.view.formPassword.value,
      };

      if (this.activeForm === this.formType.signIn) {
        this.model.signIn(data);
        return;
      }

      if (this.activeForm === this.formType.signUp) {
        this.model.signUp(data);
      }
    });
  }

  clickWrapForm(e) {
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

  toggleForm() {
    this.view.clearform();

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
}

/* if (!localStorage.tokenData) {
  return false;
}
this.tokenData = JSON.parse(localStorage.tokenData);
const fourHours = 14400000; / ms in 4 hours /
const isExpired = new Date().getTime() > (this.tokenData.createTime + fourHours);
if (isExpired) {
  return false;
}
return true; */
