export default class PuzzleView {
  constructor() {
    this.puzzle = document.getElementById('main');
  }

  renderHTML() {
    this.result = document.createElement('button');
    this.result.innerHTML = 'RESULT';
    this.result.className = 'temp';
    this.puzzle.append(this.result);
  }
}
