export default class AudiocallView {
  constructor() {
    this.audiocall = document.getElementById('main');
    this.result = null;
  }

  renderHTML() {
    this.audiocall.innerHTML = '';
    this.result = document.createElement('button');
    this.result.innerHTML = 'RESULT';
    this.audiocall.append(this.result);
  }
}
