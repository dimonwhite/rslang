export default class AudiocallView {
  constructor() {
    this.audiocall = document.getElementById('main');
  }

  renderHTML() {
    this.result = document.createElement('button');
    this.result.innerHTML = 'RESULT';
    this.result.className = 'temp';
    this.audiocall.append(this.result);
  }
}
