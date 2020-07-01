export default class AuthorizationModel {
  constructor(user) {
    this.user = user;
    this.defaultStatistics = {
      learnedWords: 0,
      optional: {
        savannah: {},
        audiocall: {},
        sprint: {},
        speakit: {},
        puzzle: {},
        own: {},
        statisticsChart: {},
      },
    };
    this.defaultSettings = {
      wordsPerDay: 1,
      optional: {
        lastDate: '2062020',
        todayTraining: '0,0,0,0,0,0,0,false,false',
        settings: {
          lang: 'EN',
          langEn: true,
          langRu: false,
          difficultWord: true,
          exampleWord: true,
          imgWord: true,
          interval: true,
          listAlternately: false,
          listNew: true,
          listRepeat: false,
          maxWords: '10',
          newWords: '10',
          meaningWord: true,
          numberLetters: true,
          removeWord: true,
          showAnswer: true,
          sound: false,
          transcription: true,
          translate: true,
        },
        dictSettings: {
          dictExample: true,
          dictMeaning: true,
          dictTranscr: true,
          dictSound: true,
          dictImg: true,
          dictProgress: true,
        },
      },
    };
  }

  async checkAuthorized() {
    if (!localStorage.token) {
      return false;
    }

    const request = await this.user.getUser()
      .then((res) => {
        console.log(res);
        return true;
      }).catch((res) => {
        console.log(res);
        return false;
      });

    return request;
  }

  /*--------------------------------------------------------*/

  async signUp(data) {
    const request = await this.user.createNewUser(data)
      .then((res) => {
        console.log(res);
        return res;
      }).catch((res) => {
        console.log(res);
        this.error = res;
      });

    return request;
  }

  async signIn(data) {
    const request = await this.user.loginUser(data)
      .then((res) => {
        console.log(res);
        return res;
      }).catch((res) => {
        console.log(res);
        this.error = res;
      });

    return request;
  }

  async createStatistic() {
    const request = await this.user.createUserStatistics(this.defaultStatistics)
      .then((res) => {
        console.log(res);
        return res;
      }).catch((res) => {
        console.log(res);
        this.error = res;
      });

    return request;
  }

  async createSettings() {
    const request = await this.user.createUserSettings(this.defaultSettings)
      .then((res) => {
        console.log(res);
        return res;
      }).catch((res) => {
        console.log(res);
        this.error = res;
      });

    return request;
  }

  /*--------------------------------------------------------*/

  async getUser() {
    const request = await this.user.getUser()
      .then((res) => {
        console.log(res);
        return res;
      }).catch((res) => {
        console.log(res);
        this.error = res;
      });

    return request;
  }

  async logStatistic() {
    const request = await this.user.getUserStatistics()
      .then((res) => {
        console.log(res);
        return res;
      }).catch((res) => {
        console.log(res);
        this.error = res;
      });

    return request;
  }

  async logSettings() {
    const request = await this.user.getUserSettings()
      .then((res) => {
        console.log(res);
        return res;
      }).catch((res) => {
        console.log(res);
        this.error = res;
      });

    return request;
  }

  async removeUser() {
    const request = await this.user.deleteUser()
      .then((res) => {
        console.log(res);
        return res;
      }).catch((res) => {
        console.log(res);
        this.error = res;
      });

    return request;
  }

  removeLocalUser() {
    this.user.removeLocalUser();
  }
}
