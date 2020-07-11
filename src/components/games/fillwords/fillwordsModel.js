import { randomArray } from '@/utils';

export default class FillwordsModel {
  constructor(http) {
    this.http = http;
    this.quantityPages = 29;
    this.level = 0;
    this.maxStatistics = 30;
  }

  async getWords() {
    this.words = await this.http.getWords({
      group: this.level,
      page: Math.round(Math.random() * this.quantityPages),
      maxLength: 0,
      wordsPerPage: 0,
    });
    this.words = this.words.filter((item) => item.word.length <= this.lengthBoard);
    this.words = randomArray(this.words).splice(0, this.lengthBoard);
    return this.words;
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
