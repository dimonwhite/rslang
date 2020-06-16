import AudiocallView from './audiocallView';
import AudiocallModel from './audiocallModel';

export default class AudiocallController {
  constructor(user, callResult) {
    this.callResult = callResult;
    this.audiocallView = new AudiocallView();
    this.audiocallModel = new AudiocallModel(user);
  }

  createEvent() {
    this.audiocallView.renderHTML();
    this.audiocallView.result.onclick = () => this.callResult(this.audiocallModel.words);
  }
}
