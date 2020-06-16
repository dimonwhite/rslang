export default class SavannahView {
  constructor() {
    this.savannah = document.getElementById('main');
    this.result = null;
  }

  renderHTML() {
    this.savannah.innerHTML = '';
    this.result = document.createElement('button');
    this.result.innerHTML = 'RESULT';
    this.savannah.append(this.result);
  }
}
