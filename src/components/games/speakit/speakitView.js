import Card from './Card';

export default class SpeakitView {
  constructor() {
    this.speakit = document.getElementById('main');
  }

  renderHTML() {
    this.result = document.createElement('button');
    this.result.innerHTML = 'RESULT';
    this.result.className = 'temp';
    this.speakit.append(this.result);
  }
}
