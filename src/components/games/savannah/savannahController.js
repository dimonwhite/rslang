import soundStart from '@/assets/sounds/start.mp3';
import soundWin from '@/assets/sounds/win.mp3';
import soundCorr from '@/assets/sounds/correctly.mp3';
import soundGO from '@/assets/sounds/game-over.mp3';
import soundMist from '@/assets/sounds/mistake.mp3';
import SavannahView from './savannahView';
import SavannahModel from './savannahModel';
// import HttpClient from '../../httpclient/HttpClient';

export default class SavannahController {
  constructor(user, callResult) {
    this.user = user;
    this.view = new SavannahView();
    this.callResult = callResult;
    this.model = new SavannahModel(this.user);
    this.level = -1;
    this.maxHeart = 5;
    this.heart = 5;
    this.count = 10;
    this.maxKeyId = 4;
    this.attempt = 0;
    this.correctly = 0;
    this.sound = true;
    this.answer = false;
  }

  init() {
    this.view.renderHTML();
    this.createEvent();
  }

  createEvent() {
    this.view.options.addEventListener('click', this.getAnswer.bind(this));
    this.view.learnedWords.addEventListener('click', this.selectWords.bind(this));
    document.getElementById('startGame').addEventListener('click', this.getStart.bind(this));
    document.body.addEventListener('keydown', this.setEventsKeyboard.bind(this));
    document.getElementById('cancel').addEventListener('click', this.cancel.bind(this));
    document.getElementById('closePopup').addEventListener('click', this.cancel.bind(this));
    document.getElementById('selectHearts').addEventListener('change', this.getHearts.bind(this));
    document.getElementById('selectSpeed').addEventListener('change', this.getSpeed.bind(this));
    document.getElementById('selectPage').addEventListener('change', (e) => {
      this.model.page = +e.target.value;
    });
    document.getElementById('selectLang').addEventListener('change', (e) => {
      this.model.lang = e.target.value;
      this.view.lang = e.target.value;
    });
    const sound = document.getElementById('sound');
    sound.addEventListener('click', () => {
      this.sound = !this.sound;
      sound.classList.toggle('sound-mute');
    });
  }

  async getStart() {
    this.model.countWords = this.count;
    this.model.level = this.level;
    await this.addStatistics();
    await this.model.createWords();
    await this.model.getWords();
    this.getAudio('start');
    this.view.getStart();
    setTimeout(this.getStartRound.bind(this), 3000);
  }

  getStartRound() {
    this.view.getStartRound();
    this.attempt = 0;
    this.correctly = 0;
    this.heart = this.maxHeart;
    this.startNextRound();
  }

  startNextRound() {
    this.view.startNextRound({
      gameWords: this.model.gameWords, attempt: this.attempt, words: this.model.words,
    });
    const countHeart = this.maxHeart - this.heart;
    if (this.view.top.classList.length > 0) {
      this.view.top.addEventListener('animationend', () => {
        this.view.setAnswer();
        this.view.top.addEventListener('animationstart', () => this.getAudio('mistake'));
        this.view.nextWord(countHeart, this.answer);
        this.view.top.addEventListener('animationend', this.nextWord.bind(this, this.attempt));
      });
    } else {
      this.view.bottom.addEventListener('animationend', () => {
        this.view.setAnswer();
        this.view.bottom.addEventListener('animationstart', () => this.getAudio('mistake'));
        this.view.nextWord(countHeart, this.answer);
        this.view.bottom.addEventListener('animationend', this.nextWord.bind(this, this.attempt));
      });
    }
    this.answer = false;
  }

  async getAnswer({ target }) {
    const TARGET_WAS_ALREADY_SELECTED = 2;
    let copyWord;
    if (target.tagName === 'BUTTON' && target.classList.length < TARGET_WAS_ALREADY_SELECTED) {
      this.answer = true;
      if (target.dataset.answer === 'correct') {
        this.view.setAnswer('correct', target);
        this.getAudio('correctly');
        this.correctly += 1;
        const delta = (this.correctly / this.count);
        this.view.getCorrectlyAnswer(delta);
        this.model.words[this.attempt].success = true;
      } else {
        copyWord = { ...this.model.words[this.attempt] };
        this.view.setAnswer('mistake', target);
        this.getAudio('mistake');
        const countHeart = this.maxHeart - this.heart;
        this.view.getIncorrectlyAnswer(countHeart);
        this.model.words[this.attempt].success = false;
        this.heart -= 1;
      }
      this.attempt += 1;
      this.view.top.addEventListener('animationend', this.checkEndGame.bind(this));
      this.view.bottom.addEventListener('animationend', this.checkEndGame.bind(this));
      if (copyWord) await this.changeWordStatistics(copyWord);
      await this.changeStatistics();
    }
  }

  async nextWord() {
    const copyWord = { ...this.model.words[this.attempt] };
    this.model.words[this.attempt].success = false;
    this.heart -= 1;
    this.attempt += 1;
    await this.checkEndGame(copyWord);
  }

  async checkEndGame(word) {
    if (this.correctly === this.count || this.heart === 0) {
      this.endGame();
    } else {
      this.view.bottom.remove();
      this.view.top.remove();
      this.startNextRound();
      if (word.id) await this.changeWordStatistics(word);
      await this.changeStatistics();
    }
  }

  endGame() {
    if (this.heart === 0) {
      this.getAudio('game-over');
    } else {
      this.getAudio('win');
    }
    if (this.view.top) this.view.top.remove();
    if (this.view.bottom) this.view.bottom.remove();
    const DELAY_ENDING = 4000;
    setTimeout(() => {
      this.view.endGame();
      this.callResult(this.model.words.slice(0, this.attempt));
    }, DELAY_ENDING);
  }

  cancel() {
    this.sound = false;
    this.view.cancel();
  }

  getSpeed({ target }) {
    const MAX_SPEED = 7;
    const options = ['easy', 'normal', 'hard'];
    this.view.speed = MAX_SPEED - 2 * options.findIndex((item) => item === target.value);
  }

  setEventsKeyboard(e) {
    try {
      if (e.code.includes('Digit')) {
        const id = +e.code.replace('Digit', '');
        if (id > 0 && id <= this.maxKeyId) {
          document.getElementById(`savAnswer${id}`).click();
        }
      }
    } catch (error) {
      this.error = error;
    }
  }

  getHearts({ target }) {
    const MIN_HEARTS = 3;
    const options = ['hard', 'normal', 'easy'];
    this.maxHeart = MIN_HEARTS + options.findIndex((item) => item === target.value);
    this.model.maxHeart = this.maxHeart;
    this.view.countHearts = this.maxHeart;
    this.view.createHearts();
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

  selectWords() {
    this.level = this.view.selectLearnedWords();
  }

  async addStatistics() {
    this.statistics = await this.user.getUserStatistics();
    this.stat = this.statistics.optional.savannah;
    const save = Object.keys(this.stat);
    const MAX_PROP = 50;
    if (save.length > MAX_PROP) {
      delete this.stat[save[1]];
      this.stat.length -= 1;
    }
    this.timeCurGame = new Date().getTime();
    this.stat[this.timeCurGame] = `${this.correctly},${this.attempt}`;
    this.stat.length = +this.stat.length + 1;
  }

  async changeStatistics() {
    this.stat[this.timeCurGame] = `${this.correctly},${this.attempt}`;
    await this.user.createUserStatistics({ learnedWords: 0, optional: this.statistics.optional });
  }

  async changeWordStatistics(word) {
    word.nextTime = new Date().getTime();
    await this.user.updateUserWord({ wordData: word, wordId: word.id, difficulty: 'string' });
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
