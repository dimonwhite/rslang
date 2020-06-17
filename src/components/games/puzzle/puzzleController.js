import PuzzleView from './puzzleView';
import PuzzleModel from './puzzleModel';

export default class PuzzleController {
  constructor(user, callResult) {
    this.callResult = callResult;
    this.PuzzleView = new PuzzleView();
    this.PuzzleModel = new PuzzleModel(user);
  }

  createEvent() {
    this.PuzzleView.renderHTML();
    const listener = () => this.callResult(this.PuzzleModel.words);
    this.PuzzleView.result.addEventListener('click', listener);
  }
}
