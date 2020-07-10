<<<<<<< HEAD
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
  }

  async getDataWords() {
    const request = await this.http.getAllUserWords()
      .then((res) => res)
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

  getWord(id) {
    const word = this.dataWords.find((item, index) => {
      if (item.wordId === id) {
        this.prev = this.dataWords[index - 1];
        this.next = this.dataWords[index + 1];
        return item;
      }
      return false;
    });
    // (item, index) => item.wordId === id);
    this.word = word;
    word.prev = this.prev ? this.prev.wordId : null;
    word.next = this.next ? this.next.wordId : null;

    console.log(word.prev);
    console.log(word.next);

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
    const nextTime = getDiffFormatDate(
      getDiffTime(
        new Date(),
        new Date(Number(this.word.optional.nextTime)),
      ),
    );

    return nextTime;
  }

  async updateState(state) {
    const word = this.dataWords.find((item) => item.wordId === this.word.wordId);
    word.optional.state = state;
    console.log(word);

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
}
=======
import dataWords from '@/data/mock_StudyWords';
import { getDiffTime, getDiffFormatDate } from '@/utils';

export default class DictionaryModel {
  constructor(user) {
    this.user = user;
    this.dataWords = dataWords;
    this.countWords = 10;
    this.state = {
      all: 'all',
      study: 'study',
      difficult: 'difficult',
      remove: 'remove',
    };
  }

  getList({ page, filter, strSearch }) {
    this.dataWords = dataWords;
    const first = page * this.countWords;
    const last = first + 10;

    if (filter && filter !== this.state.all) {
      this.dataWords = this.dataWords.filter((item) => item.state === filter);
    }

    if (strSearch) {
      this.dataWords = this.dataWords.filter((item) => item.word.indexOf(strSearch) !== -1);
    }

    let arrWords = [...this.dataWords];
    arrWords = arrWords.slice(first, last);
    return new Promise((resolve) => resolve(arrWords));
  }

  getWord(id) {
    const word = this.dataWords.find((item) => item.id === id);

    const lastTime = getDiffFormatDate(
      getDiffTime(new Date(word.lastTime), new Date()),
    );
    word.lastTimeText = lastTime;

    const nextTime = getDiffFormatDate(
      getDiffTime(new Date(), new Date(word.nextTime)),
    );
    word.nextTimeText = nextTime;

    return word;
  }
}
>>>>>>> develop
