export default class DictionaryView {
  constructor() {
    this.dictionary = document.getElementById('dictionary');
  }

  renderHTML() {
    const li = document.createElement('li');
    li.innerHTML = 'dictionary';
    this.dictionary.append(li);
  }
}
