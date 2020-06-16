import AudiocallView from './audiocallView';
import AudiocallModel from './audiocallModel';

export default class AudiocallController {
  constructor(user) {
    this.audiocallView = new AudiocallView();
    this.audiocallModel = new AudiocallModel(user);
    this.audiocallView.renderHTML();
    this.result = this.audiocallView.result.bind(this);
  }

  createEvent(callResult) {
    this.result.onclick = () => callResult(this.audiocallModel.words);
  }
}
