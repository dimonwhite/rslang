export default class SpeakitView {
  constructor() {
    this.speakit = document.getElementById('main');
    this.result = null;
  }

  renderHTML() {
    this.speakit.innerHTML = '';
    this.result = document.createElement('button');
    this.result.innerHTML = 'RESULT';
    this.speakit.append(this.result);
  }
}
