import book1 from '../../../data/book1';
import { shuffleArray } from '../../../utils';

export default class AudiocallModel {
  constructor(user) {
    this.user = user;
    this.wordArray = null;
    this.level = 0;
    this.optionWordsNumber = 4;
    this.step = 0;
    this.isStepGoing = false;
    this.score = 0;
  }

  formWordarray() {
    this.wordArray = shuffleArray(Object.values(book1)).slice(0, 10);

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
}
