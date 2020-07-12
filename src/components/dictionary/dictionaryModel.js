import { getDiffTime, getDiffFormatDate } from '@/utils';

export default class DictionaryModel {
  constructor(http) {
    this.http = http;
    this.dataWords = [];
    this.countWords = 10;
    this.state = {
      all: 'all',
      study: 'study',
      difficult: 'difficult',
      remove: 'remove',
    };
    this.word = null;
    this.settings = null;
  }

  async getSettings() {
    const request = await this.http.getUserSettings()
      .then((res) => {
        this.settings = res;
        return res;
      })
      .catch((error) => {
        this.error = error;
      });

    return request;
  }

  async getDataWords() {
    const request = await this.http.getAllUserWords()
      .then((res) => {
        this.dataWords = res.splice(10);
        return res;
      })
      .catch((error) => {
        this.error = error;
      });

    return request;
  }

  getList({ page, filter, strSearch }) {
    const first = page * this.countWords;
    const last = first + 10;
    let arrWords = [...this.dataWords];

    if (filter && filter !== this.state.all) {
      arrWords = arrWords.filter((item) => item.optional.state === filter);
    }

    if (strSearch) {
      arrWords = arrWords.filter((item) => item.optional.word.indexOf(strSearch) !== -1);
    }

    arrWords = arrWords.slice(first, last);
    return arrWords;
  }

  getWord(id, filter, strSearch) {
    let arrWords = [...this.dataWords];

    if (filter && filter !== this.state.all) {
      arrWords = arrWords.filter((item) => item.optional.state === filter);
    }

    if (strSearch) {
      arrWords = arrWords.filter((item) => item.optional.word.indexOf(strSearch) !== -1);
    }

    const word = arrWords.find((item, index) => {
      if (item.wordId === id) {
        this.prev = arrWords[index - 1];
        this.next = arrWords[index + 1];
        return item;
      }
      return false;
    });

    this.word = word;
    word.prev = this.prev ? this.prev.wordId : null;
    word.next = this.next ? this.next.wordId : null;

    word.lastTimeText = this.getLastTimeText();
    word.nextTimeText = this.getNextTimeText();

    return word;
  }

  getLastTimeText() {
    const lastTime = getDiffFormatDate(
      getDiffTime(
        new Date(Number(this.word.optional.lastTime)),
        new Date(),
      ),
    );

    return lastTime;
  }

  getNextTimeText() {
    let nextTime = '';

    if (new Date(Number(this.word.optional.nextTime)) < new Date()) {
      nextTime = 'ближайшая игра';
    } else {
      nextTime = 'через ';

      nextTime += getDiffFormatDate(
        getDiffTime(
          new Date(),
          new Date(Number(this.word.optional.nextTime)),
        ),
      );
    }

    return nextTime;
  }

  async updateState(state) {
    const word = this.dataWords.find((item) => item.wordId === this.word.wordId);
    word.optional.state = state;

    const request = await this.http.updateUserWord({
      wordId: word.wordId,
      wordData: word.optional,
      difficulty: word.difficulty,
    })
      .then((res) => res)
      .catch((error) => {
        this.error = error;
      });

    return request;
  }

  async updateSettings(id, value) {
    const setting = this.settings;
    setting.optional.dictSettings[id] = value;

    const request = await this.http.createUserSettings({
      wordsPerDay: 1,
      optional: setting.optional,
    })
      .then((res) => {
        this.settings = res;
        return res;
      })
      .catch((error) => {
        this.error = error;
      });

    return request;
  }
}
