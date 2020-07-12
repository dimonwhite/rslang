import dataWords from '@/data/mock_StudyWords';
import { randomArray } from '@/utils';

export default class SprintModel {
  constructor(http) {
    this.http = http;
    this.game = false;
    this.score = 0;
    this.page = 0;
    this.index = 0;
    this.dataWords = dataWords;
    this.trueWord = 0;
    this.falseWord = 0;
    this.words = [];
    this.gameWords = [];
    this.gameFalseWords = [];
    this.maxHeart = 5;
    this.countWords = 10;
    this.level = 0;
    this.page = Math.round(Math.random() * 5);
    this.lang = 'EN';
    this.maxStatistics = 30;
    this.allStudyWords = [];
  }

  async getUserWords() {
    const words = await this.http.getAllUserWords();
    let userWords = words.splice(10);
    userWords = userWords.map((word) => word.optional);
    userWords.forEach((e) => {
      this.gameWords.push(e);
      this.gameFalseWords.push(e.wordTranslate);
    });
    return this.gameWords;
  }

  async getJustWords(group, count) {
    const data = await this.http.getWords({
      group, page: this.page, maxLength: 50, wordsPerPage: count,
    });
    data.forEach((e) => {
      this.gameWords.push(e);
      this.gameFalseWords.push(e.wordTranslate);
    });
    return this.gameWords;
  }

  getWord(id) {
    return this.dataWords[id];
  }

  getFalseWords() {
    const falseWords = [...this.dataWords];
    const falseArray = [];
    falseWords.forEach((e) => {
      falseArray.push(e.wordTranslate);
    });
    const randomFalseArray = randomArray(falseArray);

    return randomFalseArray;
  }

  stop() {
    this.game = false;
    this.dataWords.forEach((item) => {
      item.success = false;
    });
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

  async getNewWords() {
    if (this.lang === 'EN') {
      this.words.forEach((item) => this.gameWords.push([item.wordTranslate]));
    } else {
      this.words.forEach((item) => this.gameWords.push([item.word]));
    }
    await this.getPartsOfSpeech();
  }

  async setUserStatistics() {
    const statistics = await this.http.getUserStatistics();
    const statisticsGame = statistics.optional.sprint;
    const statisticsGameKeys = Object.keys(statisticsGame);

    if (statisticsGameKeys.length >= this.maxStatistics) {
      statisticsGame[statisticsGameKeys[0]] = undefined;
    }

    statisticsGame[new Date().getTime()] = `${this.trueWord}, ${this.falseWord}, ${this.score}`;

    this.http.createUserStatistics({
      learnedWords: statistics.learnedWords,
      optional: statistics.optional,
    });
  }
}
