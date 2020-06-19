import SavannahView from './savannahView';
import SavannahModel from './savannahModel';

export default class SavannahController {
  constructor(user, callResult) {
    this.callResult = callResult;
    this.view = new SavannahView(callResult);
    this.model = new SavannahModel(user);

    this.lockChoice = true;
    this.user = user;
    this.callResult = callResult;
    this.lockChoice = true; //
    this.words = []; //
    this.gameWords = []; //
    this.stopRounds = [];
    this.level = 0;
    this.maxHeart = 5;
    this.heart = 5;
    this.count = 10;
    this.attempt = 0;
    this.correctly = 0;
    this.timeInterval = 7000;
    this.SHIP_HIGHT = 35;
    this.BG_HIGHT = 3500;
    this.studyWords = false;
    this.allStudyWords = []; // JSON.parse(localStorage.getItem('userAllStudyWords'));
  }

  create() {
    this.view.renderHTML();
    this.createEvent();
  }

  createEvent() {
    document.getElementById('savOptions').addEventListener('click', (e) => {
      if (this.lockChoice) this.getAnswer(e);
    });
    document.getElementById('startGame').addEventListener('click', this.getStart.bind(this));
    document.getElementById('newGame').addEventListener('click', this.newGame.bind(this));
    document.body.addEventListener('keydown', (e) => {
      switch (e.code) {
        case 'Digit1':
          document.getElementById('savAnswer1').click();
          break;
        case 'Digit2':
          document.getElementById('savAnswer2').click();
          break;
        case 'Digit3':
          document.getElementById('savAnswer3').click();
          break;
        case 'Digit4':
          document.getElementById('savAnswer4').click();
          break;
        default:
          break;
      }
    });
  }

  getStart() {
    this.getAudio('start');
    this.count = this.view.getStart();
    this.model.createWords();
    this.model.getWords();
    this.stopRounds = new Array(this.model.words.length).fill(true);
    setTimeout(this.getStartRound.bind(this), 3000);
  }

  getStartRound() {
    this.view.getStartRound();
    this.attempt = 0;
    this.correctly = 0;
    this.heart = 5;
    this.lockChoice = true;
    // this.addStatistics();
    this.startNextRound();
  }

  startNextRound() {
    // if (this.stopRounds[this.attempt]) { ... }
    this.view.startNextRound(this.model.gameWords, this.attempt);
    setTimeout(() => { this.lockChoice = true; }, 500);
    setTimeout(this.nextWord.bind(this, this.attempt), 10000);
  }

  getAnswer({ target }) {
    if (target.tagName === 'BUTTON' && target.classList.length < 2 && this.lockChoice) {
      this.lockChoice = false;
      this.stopRounds[this.attempt] = false;
      if (target.dataset.answer === 'true') {
        this.getAudio('correctly');
        this.correctly += 1;
        const delta = (this.correctly / this.count);
        this.view.getCorrectlyAnswer(target, delta);
        this.model.words[this.attempt].correctly = true;
      } else {
        this.getAudio('mistake');
        const countHeart = this.maxHeart - this.heart;
        this.view.getIncorrectlyAnswer(target, countHeart);
        this.model.words[this.attempt].correctly = false;
        this.heart -= 1;
        // this.changeWordStatistics();
      }
      this.attempt += 1;
      // this.changeStatistics();
    }
    this.checkEndGame();
  }

  nextWord(indexRound) {
    if (this.stopRounds[indexRound]) {
      this.getAudio('mistake');
      this.model.words[this.attempt].correctly = false;
      const countHeart = this.maxHeart - this.heart;
      this.view.nextWord(countHeart);
      this.heart -= 1;
      // this.changeWordStatistics();
      this.attempt += 1;
      // this.changeStatistics();

      this.checkEndGame();
    }
  }

  checkEndGame() {
    if (this.correctly === this.count || this.heart === 0) {
      this.lockChoice = false;
      if (this.heart === 0) {
        this.getAudio('game-over');
      } else {
        this.getAudio('win');
      }
      setTimeout(this.view.endGame.bind(this.view, this.model.words, this.attempt), 4000);
    } else {
      setTimeout(this.startNextRound.bind(this), 2500);
    }
  }

  newGame() {
    this.model.newGame();
    this.view.newGame();
  }

  getAudio(stateGame) {
    try {
      const audio = new Audio();
      switch (stateGame) {
        case 'start':
          audio.src = './sounds/start.mp3';
          break;
        case 'win':
          audio.src = './sounds/win.mp3';
          break;
        case 'correctly':
          audio.src = './sounds/correctly.mp3';
          break;
        case 'mistake':
          audio.src = './sounds/mistake.mp3';
          break;
        case 'game-over':
          audio.src = './sounds/game-over.mp3';
          break;
        default:
          break;
      }
      audio.autoplay = true;
    } catch (error) {
      this.error = error.message;
    }
  }
}
