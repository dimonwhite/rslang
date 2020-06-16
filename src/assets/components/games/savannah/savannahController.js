import SavannahView from './savannahView';
import SavannahModel from './savannahModel';

export default class SavannahController {
  constructor(user) {
    this.savannahView = new SavannahView();
    this.savannahModel = new SavannahModel(user);
    this.savannahView.renderHTML();
    this.result = this.savannahView.result.bind(this);
  }

  createEvent(callResult) {
    this.result.onclick = () => callResult(this.savannahModel.words);
  }
}
