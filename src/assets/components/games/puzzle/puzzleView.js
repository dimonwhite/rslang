export default class PuzzleView {
  constructor() {
    this.puzzle = document.getElementById('main');
    this.result = null;
  }

  renderHTML() {
    this.puzzle.innerHTML = '';
    this.result = document.createElement('button');
    this.result.innerHTML = 'RESULT';
    this.puzzle.append(this.result);
  }
}
