import book1 from '../../../data/book1';
import { shuffleArray } from '../../../utils';

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
    if (!this.isUserWords) {
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
    } else {
      const words = await this.user.getAllUserWords();
      this.wordArray = shuffleArray(words).slice(0, 10);
      if (this.wordArray.length < 10) {
        throw new Error('Not enough words, try to change level');
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
  }
}
