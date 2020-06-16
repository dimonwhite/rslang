import SpeakitView from './speakitView';
import SpeakitModel from './speakitModel';

export default class SpeakitController {
  constructor(user) {
    this.speakitView = new SpeakitView();
    this.speakitModel = new SpeakitModel(user);
    this.speakitView.renderHTML();
    this.result = this.speakitView.result.bind(this);
  }

  createEvent(callResult) {
    this.result.onclick = () => callResult(this.speakitModel.words);
  }
}
