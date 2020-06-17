import SpeakitView from './speakitView';
import SpeakitModel from './speakitModel';

export default class SpeakitController {
  constructor(user, callResult) {
    this.callResult = callResult;
    this.speakitView = new SpeakitView();
    this.speakitModel = new SpeakitModel(user);
  }

  createEvent() {
    this.speakitView.renderHTML();
    const listener = () => this.callResult(this.speakitModel.words);
    this.speakitView.result.addEventListener('click', listener);
  }
}
