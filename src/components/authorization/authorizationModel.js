import HttpClient from '../httpclient/HttpClient';

export default class AuthorizationModel {
  constructor() {
    this.user = new HttpClient();
  }

  signUp(data) {
    const request = this.user.createNewUser(data);
    request.then((res) => {
      console.log(res);
      this.signIn(data, true);
      return res;
    }).catch((res) => {
      console.log(res);
    });
  }

  signIn(data, isFirst) {
    const request = this.user.loginUser(data);
    request.then((res) => {
      console.log(res);
      if (isFirst) {
        this.createStatistic();
        this.createSettings();
      }
      return res;
    }).catch((res) => {
      console.log(res);
    });
  }

  getUser() {
    const request = this.user.getUser();

    request.then((res) => {
      console.log(res);
      return res;
    }).catch((res) => {
      console.log(res);
    });
  }

  createStatistic() {
    const request = this.user.createUserStatistics({
      learnedWords: 0,
      optional: {},
    });

    request.then((res) => {
      console.log(res);
      return res;
    }).catch((res) => {
      console.log(res);
    });
  }

  createSettings() {
    const request = this.user.createUserSettings({
      wordsPerDay: 1,
      optional: {},
    });

    request.then((res) => {
      console.log(res);
      return res;
    }).catch((res) => {
      console.log(res);
    });
  }

  logStatistic() {
    const request = this.user.getUserStatistics();

    request.then((res) => {
      console.log(res);
      return res;
    }).catch((res) => {
      console.log(res);
    });
  }

  logSettings() {
    const request = this.user.getUserSettings();

    request.then((res) => {
      console.log(res);
      return res;
    }).catch((res) => {
      console.log(res);
    });
  }

  removeUser() {
    const request = this.user.deleteUser();

    request.then((res) => {
      console.log(res);
      return res;
    }).catch((res) => {
      console.log(res);
    });
  }
}
