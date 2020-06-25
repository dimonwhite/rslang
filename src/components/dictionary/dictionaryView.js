export default class DictionaryView {
  constructor() {
    this.dictionary = document.getElementById('dictionary');
  }

  renderHTML() {
    const row = document.createElement('div');
    row.innerHTML = 'dictionary';
    this.dictionary.append(row);
  }
}
