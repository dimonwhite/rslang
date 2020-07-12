import { randomArray } from '@/utils';

export default class FillwordsModel {
  constructor(http) {
    this.http = http;
    this.quantityPages = 29;
    this.level = -1;
    this.maxStatistics = 30;
    this.minWords = 10;
    this.userWords = [];
  }

  async getWords() {
    this.words = await this.http.getWords({
      group: this.level,
      page: Math.round(Math.random() * this.quantityPages),
      maxLength: 0,
      wordsPerPage: 0,
    });
    this.words = this.filterWords(this.words);
    this.words = this.spliceRandomWords(this.words);
    return this.words;
  }

  async getUserWords() {
    let userWords = await this.http.getAllUserWords();
    userWords = userWords.splice(10);
    if (userWords.length >= this.minWords) {
      this.userWords = userWords.map((word) => {
        word.optional.userWordId = word.wordId;
        return word.optional;
      });
    } else {
      this.userWords = [];
    }

    this.userWords = this.filterWords(this.userWords);
    this.userWords = this.spliceRandomWords(this.userWords);

    return this.userWords;
  }

  filterWords(words) {
    return words.filter((item) => item.word.length <= this.lengthBoard);
  }

  spliceRandomWords(words) {
    return randomArray(words).splice(0, this.lengthBoard);
  }

  async setUserStatistics() {
    const statistics = await this.http.getUserStatistics();
    const statisticsGame = statistics.optional.own;
    const statisticsGameKeys = Object.keys(statisticsGame);

    if (statisticsGameKeys.length >= this.maxStatistics) {
      statisticsGame[statisticsGameKeys[0]] = undefined;
    }

    statisticsGame[new Date().getTime()] = `${this.successCount}, ${this.errorCount}`;

    this.http.createUserStatistics({
      learnedWords: statistics.learnedWords,
      optional: statistics.optional,
    });
  }
}
