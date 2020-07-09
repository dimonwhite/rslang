import dataWords from '@/data/mock_StudyWords';
import { randomArray } from '@/utils';

export default class SpeakitModel {
  constructor(http) {
    this.http = http;
    this.game = false;
    this.score = 0;
    this.page = Math.round(Math.random() * 29);
    this.dataWords = dataWords;
    this.countWords = 10;
    this.level = -1;
  }

  async getRandomWords() {
    randomArray(this.dataWords);
    let arrWords = [...this.dataWords];
    arrWords = arrWords.slice(0, this.countWords);
    return arrWords;
  }

  async getWords() {
    this.dataWords = await this.http.getWords({
      group: this.level, page: this.page, maxLength: 0, wordsPerPage: 0,
    });
  }

  async getUserWords() {
    this.userWords = await this.http.getAllUserWords();
    this.userWordsLength = this.userWords.length;
  }

  mapUserWords() {
    this.dataWords = this.userWords.map((word) => word.optional);
  }

  getWord(id) {
    return this.dataWords[id];
  }

  dropScore() {
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
