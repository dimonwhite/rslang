import soundStart from '@/assets/sounds/start.mp3';
import soundWin from '@/assets/sounds/win.mp3';
import soundCorr from '@/assets/sounds/correctly.mp3';
import soundGO from '@/assets/sounds/game-over.mp3';
import soundMist from '@/assets/sounds/mistake.mp3';
import SavannahView from './savannahView';
import SavannahModel from './savannahModel';

export default class SavannahController {
  constructor(user, callResult) {
    this.view = new SavannahView();
    this.callResult = callResult;
    this.model = new SavannahModel(user);
    this.lockChoice = true;
    this.stopRounds = [];
    this.level = 0;
    this.maxHeart = 5;
    this.heart = 5;
    this.count = 10;
    this.attempt = 0;
    this.correctly = 0;
    this.sound = true;
  }

  init() {
    this.view.renderHTML();
    this.createEvent();
  }

  createEvent() {
    this.view.options.addEventListener('click', (e) => {
      if (this.lockChoice) this.getAnswer(e);
    });
    document.getElementById('selectLang').addEventListener('change', (e) => {
      this.model.lang = e.target.value;
      this.view.lang = e.target.value;
    });
    document.getElementById('cancel').addEventListener('click', () => {
      this.sound = false;
      document.getElementById('main').className = 'main';
      document.getElementById('navPage').click();
    });
    const sound = document.getElementById('sound');
    sound.addEventListener('click', () => {
      this.sound = !this.sound;
      sound.classList.toggle('sound-mute');
    });
    document.getElementById('closePopup').addEventListener('click', () => {
      document.getElementById('main').className = 'main';
      document.getElementById('navPage').click();
    });
    document.getElementById('startGame').addEventListener('click', this.getStart.bind(this));
    document.body.addEventListener('keydown', (e) => {
      if (e.code.includes('Digit')) {
        const id = +e.code.replace('Digit', '');
        if (id > 0 && id < 5) {
          document.getElementById(`savAnswer${id}`).click();
        }
      }
    });
  }

  async getStart() {
    this.getAudio('start');
    this.view.getStart();
    this.model.countWords = this.count;
    this.model.level = this.level;
    this.model.createWords();
    setTimeout(this.getStartRound.bind(this), 3000);
    await this.model.getWords();
    this.stopRounds = new Array(this.model.words.length).fill(true);
  }

  getStartRound() {
    this.view.getStartRound();
    this.sound = true;
    this.attempt = 0;
    this.correctly = 0;
    this.heart = 5;
    this.lockChoice = true;
    // this.addStatistics();
    this.startNextRound();
  }

  startNextRound() {
    // if (this.stopRounds[this.attempt]) { ... }
    this.view.startNextRound(this.model.gameWords, this.attempt, this.model.words);
    setTimeout(() => { this.lockChoice = true; }, 1300);
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
        this.model.words[this.attempt].success = true;
      } else {
        this.getAudio('mistake');
        const countHeart = this.maxHeart - this.heart;
        this.view.getIncorrectlyAnswer(target, countHeart);
        this.model.words[this.attempt].success = false;
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
      setTimeout(() => {
        this.view.endGame();
        this.callResult(this.model.words.slice(0, this.attempt));
      }, 4000);
    } else {
      setTimeout(this.startNextRound.bind(this), 2500);
    }
  }

  change() {
    this.model.newGame();
    this.view.newGame();
  }

  getCountWords() {
    return this.model.countWords;
  }

  changeCountWords(value) {
    this.count = +value;
  }

  getScore() {
    let count = 0;
    for (let i = 0; i < this.attempt; i += 1) {
      if (this.model.words[i].success) {
        count += 1;
      }
    }
    return count;
  }

  getAudio(stateGame) {
    if (this.sound) {
      const audio = new Audio();
      switch (stateGame) {
        case 'start':
          audio.src = soundStart;
          break;
        case 'win':
          audio.src = soundWin;
          break;
        case 'correctly':
          audio.src = soundCorr;
          break;
        case 'mistake':
          audio.src = soundMist;
          break;
        case 'game-over':
          audio.src = soundGO;
          break;
        default:
          break;
      }
      audio.autoplay = true;
    }
  }
}
