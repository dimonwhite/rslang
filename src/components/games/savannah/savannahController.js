import SavannahView from './savannahView';
import SavannahModel from './savannahModel';

export default class SavannahController {
  constructor(user, callResult) {
    this.callResult = callResult;
    this.savannahView = new SavannahView();
    this.savannahModel = new SavannahModel(user);
  }

  createEvent() {
    this.savannahView.renderHTML();
    this.savannahView.result.onclick = () => this.callResult(this.savannahModel.words);
  }
}
