import dataWords from '@/data/mock_StudyWords';

export default class SpeakitModel {
  constructor(user) {
    this.user = user;
    this.game = false;
    this.score = 0;
    this.page = 0;
    this.dataWords = dataWords;
  }

  getWords() {
    console.log(this.dataWords);
    this.dataWords = this.dataWords.slice(0, 10);
    return new Promise((resolve) => resolve(this.dataWords));
  }

  getWord(id) {
    return this.dataWords[id];
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
    console.log(this.dataWords);
    return success;
  }
}
