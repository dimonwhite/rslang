export default class SprintView {
  constructor() {
    this.sprint = document.getElementById('main');
  }

  renderHTML() {
    this.result = document.createElement('button');
    this.result.innerHTML = 'RESULT';
    this.result.className = 'temp';
    this.sprint.append(this.result);
  }
}
