import SprintView from './sprintView';
import SprintModel from './sprintModel';

export default class SprintController {
  constructor(user) {
    this.sprintView = new SprintView();
    this.sprintModel = new SprintModel(user);
    this.sprintView.renderHTML();
    this.result = this.sprintView.result.bind(this);
  }

  createEvent(callResult) {
    this.result.onclick = () => callResult(this.sprintModel.words);
  }
}
