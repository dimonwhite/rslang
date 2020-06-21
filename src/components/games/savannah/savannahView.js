export default class SavannahView {
  constructor() {
    this.savannah = document.getElementById('main');
  }

  renderHTML() {
    this.result = document.createElement('button');
    this.result.innerHTML = 'RESULT';
    this.result.className = 'temp';
    this.savannah.append(this.result);
  }
}
