import { defaultStatistics, defaultSettings } from '@/constants';

export default class AuthorizationModel {
  constructor(http) {
    this.http = http;

    this.errorsText = {
      'Error: Incorrect e-mail or password': 'Неверный email или пароль',
      'Error: Couldn`t find any user with this email': 'Не удалось найти пользователя с этим email',
      'Error: Can`t login user, network problems': 'Не удается войти, проблемы с сетью',
      'Error: User with this e-mail exists': 'Пользователь с этим email существует',
      'Error: Email or password fields has invalid value or empty': 'Поля email или пароля имеют недопустимое значение или пусты',
      'Error: Can`t create user, network problems': 'Не удается создать пользователя, проблемы с сетью',
    };
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
        if (this.errorsText[error]) {
          this.error = this.errorsText[error];
        } else {
          this.error = error;
        }
      });

    return request;
  }

  async signIn(data) {
    const request = await this.http.loginUser(data)
      .then((res) => res)
      .catch((error) => {
        if (this.errorsText[error]) {
          this.error = this.errorsText[error];
        } else {
          this.error = error;
        }
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

  async createWords() {
    const WORDS_START_WITH = 10;
    const difficulty = 'today';
    const ID_LENGTH = 24;
    for (let i = 0; i < WORDS_START_WITH; i += 1) {
      const wordId = String(i).repeat(ID_LENGTH);
      const wordData = {};
      wordData.listToday = 'empty';
      // eslint-disable-next-line no-await-in-loop
      await this.http.createUserWord({ wordData, wordId, difficulty });
    }
  }

  removeLocalUser() {
    this.http.removeLocalUser();
  }
}
