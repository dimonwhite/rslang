import { randomArray } from '@/utils';

export default class FillwordsModel {
  constructor(http) {
    this.http = http;
  }

  async getWords() {
    this.words = await this.http.getWords({
      group: 0, page: 0, maxLength: 0, wordsPerPage: 0,
    });
    this.words = randomArray(this.words).splice(0, this.lengthBoard);
    this.words = this.words.filter((item) => item.word.length <= this.lengthBoard);
    return this.words;
  }
}
