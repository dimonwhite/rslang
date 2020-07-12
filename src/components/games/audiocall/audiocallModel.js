import { shuffleArray } from '@/utils';
import book1 from '../../../data/book1';

export default class AudiocallModel {
  constructor(user) {
    this.user = user;
    this.wordArray = null;
    this.isUserWords = true;
    this.level = 0;
    this.optionWordsNumber = 4;
    this.step = 0;
    this.isStepGoing = false;
    this.score = 0;
  }

  async formWordarray() {
    if (this.isUserWords) {
      await this.makeUserSentences();
    } else {
      await this.makeSentences();
    }
  }

  async makeSentences() {
    const randomPage = Math.floor(Math.random() * 60);

    this.wordArray = await this.user.getWords({
      group: this.level, page: randomPage, maxLength: 20, wordsPerPage: 10,
    });

    this.wordArray.forEach((el) => {
      const optionWords = Object.values(book1)
        .filter((item) => item.wordTranslate.startsWith(el.wordTranslate[0])
        && item.wordTranslate !== el.wordTranslate);

      el.optionWords = optionWords.slice(0, this.optionWordsNumber)
        .map((word) => word.wordTranslate);
      el.optionWords.push(el.wordTranslate);
      el.optionWords = shuffleArray(el.optionWords);
    });
  }

  async makeUserSentences() {
    let words = await this.user.getAllUserWords();
    words = words.splice(10);
    this.wordArray = shuffleArray(words).slice(0, 10);
    if (this.wordArray.length < 10) {
      this.isUserWords = false;
      await this.makeSentences();
      return;
    }
    this.wordArray.forEach((el) => {
      const optionWords = Object.values(book1)
        .filter((item) => item.wordTranslate.startsWith(el.optional.wordTranslate[0])
          && item.wordTranslate !== el.optional.wordTranslate);

      el.optional.optionWords = optionWords.slice(0, this.optionWordsNumber)
        .map((word) => word.wordTranslate);
      el.optional.optionWords.push(el.optional.wordTranslate);
      el.optional.optionWords = shuffleArray(el.optional.optionWords);
    });
  }

  async getStats() {
    const stats = await this.user.getUserStatistics();
    return stats;
  }

  async setStats() {
    const stats = await this.getStats();
    const date = new Date().getTime();
    const info = `${this.score}, ${10 - this.score}`;

    if (Object.keys(stats.optional.audiocall).length > 20) {
      const keys = Object.keys(stats.optional.audiocall).slice(-20);
      const temp = {};
      keys.forEach((key) => {
        temp[key] = stats.optional.audiocall[key];
      });
      stats.optional.audiocall = temp;
    }

    stats.optional.audiocall[date] = info;

    await this.user.createUserStatistics({
      learnedWords: stats.learnedWords,
      optional: stats.optional,
    });
  }
}
