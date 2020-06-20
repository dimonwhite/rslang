import dataWords from '../../data/mock_StudyWords';

export default class DictionaryModel {
  constructor(user) {
    this.user = user;
    this.dataWords = dataWords;
    this.countWords = 10;
  }

  getList(page) {
    const first = page * this.countWords;
    const last = first + 10;
    let arrWords = [...this.dataWords];
    if (first < arrWords.length) {
      arrWords = arrWords.slice(first, last);
      return new Promise((resolve) => resolve(arrWords));
    }
    return false;
  }

  getWord(id) {
    return this.dataWords.find((item) => item.id === id);
  }
}
