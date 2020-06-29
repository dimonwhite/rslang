export default class DictionaryView {
  constructor() {
    this.dictionary = document.getElementById('dictionary');
    this.close = false;
  }

  renderHTML() {
    this.close = true;
  }
}
