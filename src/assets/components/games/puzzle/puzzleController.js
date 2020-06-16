import PuzzleView from './puzzleView';
import PuzzleModel from './puzzleModel';

export default class AudiocallController {
  constructor(user) {
    this.puzzleView = new PuzzleView();
    this.puzzleModel = new PuzzleModel(user);
    this.puzzleView.renderHTML();
    this.result = this.puzzleView.result.bind(this);
  }

  createEvent(callResult) {
    this.result.onclick = () => callResult(this.puzzleModel.words);
  }
}
