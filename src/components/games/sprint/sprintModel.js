/* eslint-disable no-plusplus */
import dataWords from '@/data/mock_StudyWords';
import { randomArray } from '@/utils';

export default class SprintModel {
  constructor(user) {
    this.user = user;
    this.game = false;
    this.score = 0;
    this.page = 0;
    this.index = 0;
    this.dataWords = dataWords;
    this.countWords = 24;
    this.isCorrect = true;
  }

  getWords() {
    let arrWords = [...this.dataWords];
    arrWords = arrWords.slice(0, this.countWords);
    return arrWords;
  }

  getWord(id) {
    return this.dataWords[id];
  }
  /*
  makeRandomWord() {
    const shuffleWords = [...this.dataWords];
    // eslint-disable-next-line no-unused-vars
    const rand = Math.floor(Math.random() * 2);
    const arr = this.getFalseWords();

    console.log(rand);
    if (rand === 1) {
      this.index += 1;
      console.log(this.index);
      console.log(shuffleWords[this.index].word);
      console.log(shuffleWords[this.index].translation);
      this.index += 1;
      isCorrect = true;
    } else {
      console.log(dataWords[this.index].word);
      console.log(arr[this.index]);
      isCorrect = false;
      this.index += 1;
    }
  }
  */

  getFalseWords() {
    const falseWords = [...this.dataWords];
    const falseArray = [];
    // console.log(falseWords);

    falseWords.forEach((e) => {
      falseArray.push(e.translation);
    });
    // console.log(falseWords);
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
}
