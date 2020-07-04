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
    this.countWords = 24;
    this.isCorrect = true;
    this.words = [];
    this.gameWords = [];
    this.gameFalseWords = [];
    this.maxHeart = 5;
    this.countWords = 10;
    this.level = 0;
    this.page = 1;
    this.lang = 'EN';
    this.allStudyWords = [];
  }

  async getWords(group, count) {
    const response = await fetch(`https://afternoon-falls-25894.herokuapp.com/words?group=${group}&page=2&wordsPerExampleSentenceLTE=10&wordsPerPage=${count}`);
    const data = await response.json();
    data.forEach((e) => {
      this.gameWords.push(e);
      this.gameFalseWords.push(e.wordTranslate);
    });
    return data;
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
}
