export default class FillwordsModel {
  constructor(http) {
    this.http = http;
  }

  async getWords() {
    this.words = await this.http.getWords({
      group: 0, page: 0, maxLength: 0, wordsPerPage: 0,
    });
    return this.words;
  }
}
