import SprintView from './sprintView';
import SprintModel from './sprintModel';

export default class SavannahController {
  constructor(user, callResult) {
    this.callResult = callResult;
    this.sprintView = new SprintView();
    this.sprintModel = new SprintModel(user);
  }

  createEvent() {
    this.sprintView.renderHTML();
    const listener = () => this.callResult(this.sprintModel.words);
    this.sprintView.result.addEventListener('click', listener);
  }
}
