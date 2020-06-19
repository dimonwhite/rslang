import dataWords from '../../data/mock_StudyWords';

export default class DictionaryModel {
  constructor(user) {
    this.user = user;
    this.dataWords = dataWords;
    this.countWords = 10;
  }

  getList() {
    let arrWords = [...this.dataWords];
    arrWords = arrWords.slice(0, this.countWords);
    return arrWords;
  }
}
