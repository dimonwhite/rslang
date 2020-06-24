import AudiocallView from './audiocallView';
import AudiocallModel from './audiocallModel';
import right from '../../../assets/img/audiocall/right.svg';
import wrong from '../../../assets/img/audiocall/wrong.svg';
import idk from '../../../assets/img/audiocall/idk.svg';

export default class AudiocallController {
  constructor(user, openPopupResult) {
    this.startDelay = true;
    this.openPopupResult = openPopupResult;
    this.view = new AudiocallView();
    this.model = new AudiocallModel(user);
    this.level = 0;
    this.clickHandler = this.clickHandler.bind(this);
    this.keypressHandler = this.keypressHandler.bind(this);
  }

  init() {
    this.view.renderHTML();
    this.addListeners();
  }

  clickHandler(e) {
    if (e.target === this.view.rightWord && this.model.isStepGoing) {
      this.endStep(true);
      this.model.score += 1;
    } else if (e.target.closest('.word') && this.model.isStepGoing) {
      this.endStep(false);
      e.target.classList.add('wrong');
      this.view.appendanswerIcon(wrong, e.target);
    }

    if (e.target.closest('.btn__next')) {
      this.proceedStep();
      this.view.displayElement(this.view.btnNext, 'none');
    }

    if (e.target.closest('.btn__idk')) {
      this.idkTip();
    }

    if (e.target.closest('.icon-container') && this.model.isStepGoing) {
      this.view.playAudio();
    }

    if (e.target.closest('.restart')) {
      this.startRound();
    }
  }

  keypressHandler(e) {
    const eventKeys = [1, 2, 3, 4, 5];
    if (+e.key === this.view.rightWord.index && this.model.isStepGoing) {
      this.endStep(true);
    } else if
    (+e.key !== this.view.rightWord.index && eventKeys.includes(+e.key) && this.model.isStepGoing) {
      this.endStep(false);
      this.view.wordWrapper.querySelectorAll('.word').forEach((el) => {
        if (el.innerText.slice(0, 1) === e.key) {
          el.classList.add('wrong');
          this.view.appendanswerIcon(wrong, el);
        }
      });
    }
  }

  addListeners() {
    this.view.game.addEventListener('click', this.clickHandler);
    window.document.addEventListener('keypress', this.keypressHandler);
  }

  removeListeners() {
    this.view.game.removeEventListener('click', this.clickHandler);
    window.document.removeEventListener('keypress', this.keypressHandler);
  }

  startStep() {
    if (this.model.step < this.model.wordArray.length) {
      this.model.isStepGoing = true;

      this.view.displayElement(this.view.btnIdk, 'block');
      this.view.wordDescription.innerText = '';
      this.view.renderSoundIcon();
      this.view.playAudio(this.model.wordArray[this.model.step]);
      this.view.renderStepWords(this.model.wordArray[this.model.step]);
    } else {
      this.endRound();
    }
  }

  endStep(isRight) {
    this.model.isStepGoing = false;
    this.view.rightWord.classList.add('right');
    this.view.appendanswerIcon(right, this.view.rightWord);
    this.model.wordArray[this.model.step].success = isRight;
    this.view.displayElement(this.view.btnNext, 'block');
    this.view.displayElement(this.view.btnIdk, 'none');
    this.view.wordDescription.innerText = this.model.wordArray[this.model.step].word;
    this.view.renderWordIcon(this.model.wordArray[this.model.step]);
  }

  idkTip() {
    this.endStep(false);
    this.view.rightWord.classList.add('idk');
    this.view.appendanswerIcon(idk, this.view.rightWord);
  }

  proceedStep() {
    this.model.step += 1;
    this.view.wordWrapper.innerHTML = '';
    this.view.changeBackground();
    this.startStep();
  }

  resetGame() {
    this.model.score = 0;
    this.model.step = 0;
    this.view.displayElement(this.view.btnNext, 'none');
    this.view.wordWrapper.innerHTML = '';
    this.view.wordDescription.innerHTML = '';
  }

  startRound() {
    this.resetGame();
    this.view.getBackColor();
    this.view.setBackground();
    this.model.formWordarray();
    this.view.wordWrapper.innerHTML = '';
    this.startStep();
  }

  endRound() {
    this.view.renderEndgamePost();
    this.openPopupResult(this.model.wordArray);
    this.resetGame();
    console.log(this.model.wordArray);
  }

  change() {
    this.model.level = this.level;
    this.startRound();
  }

  getScore() {
    return this.model.score;
  }
}
