export default class DictionaryView {
  constructor() {
    this.dictionary = document.getElementById('dictionary');
  }

  renderHTML() {
    this.dictionary.innerHTML = '';
    const li = document.createElement('li');
    li.innerHTML = 'dictionary';
    this.dictionary.append(li);
  }
}
