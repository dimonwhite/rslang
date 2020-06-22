import AudiocallView from './audiocallView';
import AudiocallModel from './audiocallModel';

export default class AudiocallController {
  constructor(user, openPopupResult) {
    this.openPopupResult = openPopupResult;
    this.view = new AudiocallView();
    this.model = new AudiocallModel(user);
    this.level = 0;
    this.step = 0;
    this.eventHandler = this.eventHandler.bind(this);
  }

  init() {
    this.model.formWordarray();
    this.view.renderHTML();
    this.startStep();
    this.view.game.addEventListener('click', this.eventHandler);
    window.document.addEventListener('keypress', this.eventHandler);
  }

  eventHandler(e) {
    const eventKeys = [1, 2, 3, 4, 5];
    if (e.target === this.view.rightWord || +e.key === this.view.rightWord.index) {
      this.endStep(true);
    } else if (e.target.closest('.word') || (+e.key !== this.view.rightWord.index && eventKeys.includes(+e.key))) {
      this.endStep(false);
      e.target.classList.add('wrong');
    }

    if (e.target.closest('.btn__next')) {
      this.proceedStep();
      this.view.displayElement(this.view.btnNext, 'none');
    }
  }

  startStep() {
    if (this.step < this.model.wordArray.length) {
      this.view.renderSoundIcon();
      this.view.playAudio(this.model.wordArray[this.step]);
      this.view.renderStepWords(this.model.wordArray[this.step]);
    } else {
      window.document.removeEventListener('keypress', this.eventHandler);
      // this.openPopupResult(this.model.wordArray);
      console.log(this.model.wordArray);
    }
  }

  endStep(isRight) {
    this.view.rightWord.classList.add('right');
    this.model.wordArray[this.step].success = isRight;
    this.view.displayElement(this.view.btnNext, 'block');
    this.view.renderWordIcon(this.model.wordArray[this.step]);
  }

  proceedStep() {
    this.step += 1;
    this.view.wordWrapper.innerHTML = '';
    this.startStep();
  }

  change() {
    this.model.level = this.level;
  }
}
