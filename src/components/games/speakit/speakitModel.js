import dataWords from '@/data/mock_StudyWords';
import words from '../../../data/mock_endGame';

export default class SpeakitModel {
  constructor(user) {
    this.user = user;
    this.words = words;
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
}
