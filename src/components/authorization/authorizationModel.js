import { defaultStatistics, defaultSettings } from '@/constants';

export default class AuthorizationModel {
  constructor(http) {
    this.http = http;
  }

  async checkAuthorized() {
    if (!localStorage.token) {
      return false;
    }

    const request = await this.http.getUser()
      .then(() => true)
      .catch(() => false);

    return request;
  }

  async signUp(data) {
    const request = await this.http.createNewUser(data)
      .then((res) => res)
      .catch((error) => {
        this.error = error;
      });

    return request;
  }

  async signIn(data) {
    const request = await this.http.loginUser(data)
      .then((res) => res)
      .catch((error) => {
        this.error = error;
      });

    return request;
  }

  async createStatistic() {
    const request = await this.http.createUserStatistics(defaultStatistics)
      .then((res) => res)
      .catch((error) => {
        this.error = error;
      });

    return request;
  }

  async createSettings() {
    const request = await this.http.createUserSettings(defaultSettings)
      .then((res) => res)
      .catch((error) => {
        this.error = error;
      });

    return request;
  }

  removeLocalUser() {
    this.http.removeLocalUser();
  }
}
