import AudiocallView from './audiocallView';
import AudiocallModel from './audiocallModel';

export default class AudiocallController {
  constructor(user, openPopupResult) {
    this.openPopupResult = openPopupResult;
    this.audiocallView = new AudiocallView();
    this.audiocallModel = new AudiocallModel(user);
    this.level = 0;
  }

  init() {
    this.audiocallModel.formWordarray();
    console.log(this.audiocallModel.wordArray);
    this.audiocallView.renderHTML();
  }

  change() {
    this.audiocallModel.level = this.level;
    console.log(this.audiocallModel.level);
  }
}
