import AudiocallView from './audiocallView';
import AudiocallModel from './audiocallModel';
import right from '../../../assets/img/audiocall/right.svg';
import wrong from '../../../assets/img/audiocall/wrong.svg';
import idk from '../../../assets/img/audiocall/idk.svg';

export default class AudiocallController {
  constructor(http, openPopupResult) {
    this.client = http;
    this.startDelay = true;
    this.openPopupResult = openPopupResult;
    this.view = new AudiocallView();
    this.model = new AudiocallModel(this.client);
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
      this.continueHandler();
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

    if (e.target.closest('.user-words')) {
      this.model.isUserWords = !this.model.isUserWords;
      this.view.btnuserWords.classList.toggle('active');
      this.startRound();
    }

    if (e.target.closest('.stats')) {
      this.showStats().then(() => {
        this.view.statWindow.addEventListener('click', () => {
          this.view.removeModal();
        });
      });
    }
  }

  keypressHandler(e) {
    const eventKeys = [1, 2, 3, 4, 5];
    if (+e.key === this.view.rightWord.index && this.model.isStepGoing) {
      this.model.score += 1;
      this.endStep(true);
    }
    if (+e.key !== this.view.rightWord.index
      && eventKeys.includes(+e.key) && this.model.isStepGoing) {
      this.endStep(false);
      this.view.wordWrapper.querySelectorAll('.word').forEach((el) => {
        if (el.innerText.slice(0, 1) === e.key) {
          el.classList.add('wrong');
          this.view.appendanswerIcon(wrong, el);
        }
      });
    }

    if (e.code === 'Space' && this.model.isStepGoing) {
      e.preventDefault();
      this.idkTip();
    }

    if (e.code === 'Enter' && this.model.isContinueAble) {
      e.preventDefault();
      this.continueHandler();
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

  isModelUserWords() {
    if (!this.model.isUserWords) {
      return this.model.wordArray[this.model.step];
    }
    return this.model.wordArray[this.model.step].optional;
  }

  async startStep() {
    if (this.model.step < this.model.wordArray.length) {
      this.model.isStepGoing = true;

      this.view.displayElement(this.view.btnIdk, 'block');
      this.view.wordDescription.innerText = '';
      this.view.renderSoundIcon();
      this.view.playAudio(this.isModelUserWords());
      this.view.renderStepWords(this.isModelUserWords());
    } else {
      await this.endRound();
    }
  }

  async endStep(isRight) {
    if (this.model.isUserWords && !isRight) {
      await this.updateWord(this.model.wordArray[this.model.step]);
    }
    this.model.isStepGoing = false;
    this.model.isContinueAble = true;
    this.view.rightWord.classList.add('right');
    this.view.appendanswerIcon(right, this.view.rightWord);
    this.isModelUserWords().success = isRight;
    this.view.displayElement(this.view.btnNext, 'block');
    this.view.displayElement(this.view.btnIdk, 'none');
    this.view.wordDescription.innerText = this.isModelUserWords().word;
    this.view.renderWordIcon(this.isModelUserWords());
  }

  idkTip() {
    this.endStep(false);
    this.view.rightWord.classList.add('idk');
    this.view.appendanswerIcon(idk, this.view.rightWord);
  }

  continueHandler() {
    this.view.slideAway();
    this.model.isContinueAble = false;
    setTimeout(this.proceedStep.bind(this), 400);
    this.view.displayElement(this.view.btnNext, 'none');
  }

  async proceedStep() {
    this.model.step += 1;
    this.view.wordWrapper.innerHTML = '';
    this.view.changeBackground();
    await this.startStep();
  }

  async showStats() {
    const stats = await this.model.getStats();
    this.view.renderStats(stats.optional.audiocall);
  }

  resetGame() {
    this.model.score = 0;
    this.model.step = 0;
    this.model.isStepGoing = false;
    this.model.isContinueAble = false;
    this.view.displayElement(this.view.btnNext, 'none');
    this.view.wordWrapper.innerHTML = '';
    this.view.wordDescription.innerHTML = '';
  }

  async updateWord(word) {
    word.optional.optionWords = false;
    word.optional.nextTime = new Date().getTime();
    await this.client.updateUserWord({
      wordId: word.wordId,
      difficulty: word.difficulty,
      wordData: word.optional,
    });
  }

  async startRound() {
    this.resetGame();
    this.view.getBackColor();
    this.view.setBackground();
    if (this.view.preloader) {
      this.view.preloader.remove();
    }
    this.view.renderPreloader();
    await this.model.formWordarray();
    this.view.preloader.remove();
    this.view.wordWrapper.innerHTML = '';
    this.view.btnUserWordsDecorate(this.model.isUserWords);
    this.view.levelUserWordsDecorate(this.model.isUserWords);
    this.startStep();
  }

  async endRound() {
    await this.model.setStats();
    this.view.renderEndgamePost();
    if (this.model.isUserWords) {
      this.model.wordArray = this.model.wordArray.map((el) => {
        const modEl = el.optional;
        return modEl;
      });
    }
    await this.openPopupResult(this.model.wordArray);
    this.resetGame();
  }

  async change() {
    this.view.main.querySelector('.resultPopup__btns button.btn:nth-child(2)').blur();
    this.view.btnuserWords.classList.remove('active');
    this.model.level = this.level;
    await this.startRound();
  }

  getScore() {
    return this.model.score;
  }
}
