export default class SprintView {
  constructor() {
    this.sprint = document.getElementById('main');
    this.result = null;
  }

  renderHTML() {
    this.sprint.innerHTML = '';
    this.result = document.createElement('button');
    this.result.innerHTML = 'RESULT';
    this.sprint.append(this.result);
  }
}
