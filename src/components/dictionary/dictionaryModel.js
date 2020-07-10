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
