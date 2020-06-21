import book1 from '../../../data/book1';
import { shuffleArray } from '../../../utils';

export default class AudiocallModel {
  constructor(user) {
    this.user = user;
    this.wordArray = null;
    this.level = 0;
  }

  formWordarray() {
    this.wordArray = shuffleArray(Object.values(book1).slice(0, 10));

    this.wordArray.forEach((el) => {
      const optionWords = Object.values(book1)
        .filter((item) => item.wordTranslate.startsWith(el.wordTranslate[0])
        && item.wordTranslate !== el.wordTranslate);

      shuffleArray(optionWords);

      el.optionWords = optionWords.slice(0, this.optionWordsNumber)
        .map((word) => word.wordTranslate);
      el.optionWords.push(el.wordTranslate);
    });
  }
}
