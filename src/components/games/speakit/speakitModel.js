import dataWords from '@/data/mock_StudyWords';
import { randomArray } from '@/utils';

export default class SpeakitModel {
  constructor(user) {
    this.user = user;
    this.game = false;
    this.score = 0;
    this.page = 0;
    this.dataWords = dataWords;
    this.countWords = 10;
  }

  getWords() {
    randomArray(this.dataWords);
    let arrWords = [...this.dataWords];
    arrWords = arrWords.slice(0, this.countWords);
    return new Promise((resolve) => resolve(arrWords));
  }

  getWord(id) {
    return this.dataWords[id];
  }

  start() {
    this.score = 0;
    this.dataWords.forEach((item) => {
      item.success = false;
    });
  }

  stop() {
    this.game = false;
  }

  isSameWord(e) {
    let success = false;
    const i = e.resultIndex;
    const resultWords = e.results[i];
    this.dataWords.every((item, id) => {
      Object.keys(resultWords).every((key) => {
        let wordItem = typeof resultWords[key] === 'object' ? resultWords[key].transcript : '';
        wordItem = wordItem.trim().toLowerCase();
        if (wordItem === item.word.toLowerCase() && !item.success) {
          this.successWord = item;
          this.successId = id;
          success = true;
        }
        return !success;
      });
      return !success;
    });
    return success;
  }
}
