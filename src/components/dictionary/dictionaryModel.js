import dataWords from '../../data/mock_StudyWords';

export default class DictionaryModel {
  constructor(user) {
    this.user = user;
    this.dataWords = dataWords;
    this.countWords = 10;
    this.state = {
      all: 'all',
      study: 'study',
      difficult: 'difficult',
      remove: 'remove',
    };
  }

  getList(page, filter) {
    console.log(filter);
    if (filter && filter === this.state.all) {
      this.dataWords = dataWords;
    }
    if (filter && filter !== this.state.all) {
      this.dataWords = dataWords.filter((item) => item.state === filter);
      console.log(this.dataWords);
    }

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
