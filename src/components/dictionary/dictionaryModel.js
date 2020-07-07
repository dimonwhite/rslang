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
      arrWords = this.dataWords.filter((item) => item.optional.state === filter);
    }

    if (strSearch) {
      arrWords = this.dataWords.filter((item) => item.optional.word.indexOf(strSearch) !== -1);
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

    word.optional.lastTimeText = this.getLastTimeText();
    word.optional.nextTimeText = this.getNextTimeText();

    return word;
  }

  getLastTimeText() {
    const lastTime = getDiffFormatDate(
      getDiffTime(new Date(this.word.optional.lastTime), new Date()),
    );

    return lastTime;
  }

  getNextTimeText() {
    const nextTime = getDiffFormatDate(
      getDiffTime(new Date(), new Date(this.word.optional.nextTime)),
    );

    return nextTime;
  }
}
