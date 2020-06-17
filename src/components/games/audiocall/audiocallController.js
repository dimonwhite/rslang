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
    const listener = () => this.callResult(this.audiocallModel.words);
    this.audiocallView.result.addEventListener('click', listener);
  }
}
