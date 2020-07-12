import soundStart from '@/assets/sounds/start.mp3';
import soundWin from '@/assets/sounds/win.mp3';
import soundCorr from '@/assets/sounds/correctly.mp3';
import soundGO from '@/assets/sounds/game-over.mp3';
import soundMist from '@/assets/sounds/mistake.mp3';
import SavannahView from './savannahView';
import SavannahModel from './savannahModel';

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

  async init() {
    try {
      this.view.initView();
      await this.addStatistics();
      this.view.renderHTML();
      this.view.createControl();
      this.createEvent();
    } catch (error) {
      this.error = error;
    }
  }

  async createEvent() {
    this.view.options.addEventListener('click', this.getAnswer.bind(this));
    this.view.learnedWords.addEventListener('click', this.selectWords.bind(this));
    document.getElementById('startGame').addEventListener('click', this.getStart.bind(this));
    document.body.addEventListener('keydown', this.setEventsKeyboard.bind(this));
    document.getElementById('cancel').addEventListener('click', this.cancel.bind(this));
    document.getElementById('closePopup').addEventListener('click', this.cancel.bind(this));
    document.getElementById('selectHearts').addEventListener('change', this.getHearts.bind(this));
    document.getElementById('selectSpeed').addEventListener('change', this.getSpeed.bind(this));
    document.getElementById('selectPage').addEventListener('change', async (e) => {
      this.model.page = +e.target.value;
      this.stat.settings.page = this.model.page;
      await this.user.createUserStatistics({ learnedWords: 0, optional: this.statistics.optional });
    });
    document.getElementById('selectLang').addEventListener('change', async (e) => {
      this.model.lang = e.target.value;
      this.view.lang = e.target.value;
      this.stat.settings.lang = this.model.lang;
      await this.user.createUserStatistics({ learnedWords: 0, optional: this.statistics.optional });
    });
    const sound = document.getElementById('sound');
    sound.addEventListener('click', () => {
      this.sound = !this.sound;
      this.stat.settings.sound = this.sound;
      sound.classList.toggle('sound-mute');
    });
  }

  async getStart() {
    this.model.countWords = this.count;
    this.model.level = this.level;
    this.stat.settings.lvl = this.level;
    this.addStatNewGame();
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
      if (this.level === -1 && copyWord && this.view.model) {
        await this.changeWordStatistics(copyWord);
      }
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
    }
    if (this.level === -1 && word.id && this.model.own) await this.changeWordStatistics(word);
    await this.changeStatistics();
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

  async getSpeed({ target }) {
    const MAX_SPEED = 7;
    const options = ['easy', 'normal', 'hard'];
    this.view.speed = MAX_SPEED - 2 * options.findIndex((item) => item === target.value);
    this.stat.settings.speed = target.value;
    await this.user.createUserStatistics({ learnedWords: 0, optional: this.statistics.optional });
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

  async getHearts({ target }) {
    const MIN_HEARTS = 3;
    const options = ['hard', 'normal', 'easy'];
    this.maxHeart = MIN_HEARTS + options.findIndex((item) => item === target.value);
    this.model.maxHeart = this.maxHeart;
    this.view.countHearts = this.maxHeart;
    this.stat.settings.hearts = target.value;
    this.view.createHearts();
    await this.user.createUserStatistics({ learnedWords: 0, optional: this.statistics.optional });
  }

  async change() {
    this.stat.settings.lvl = this.level;
    this.model.newGame();
    this.view.newGame();
    this.view.setLevel();
    await this.user.createUserStatistics({ learnedWords: 0, optional: this.statistics.optional });
  }

  getCountWords() {
    return this.model.countWords;
  }

  changeCountWords(value) {
    this.count = +value;
    this.stat.settings.words = this.count;
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

  async selectWords() {
    this.level = this.view.selectLearnedWords();
    this.stat.settings.lvl = this.level;
    await this.user.createUserStatistics({ learnedWords: 0, optional: this.statistics.optional });
  }

  async addStatistics() {
    this.statistics = await this.user.getUserStatistics();
    this.stat = this.statistics.optional.savannah;
    this.view.settings = this.stat.settings;
    this.setParams();
    const save = Object.keys(this.stat);
    const MAX_PROP = 30;
    if (save.length > MAX_PROP) {
      const FIRST_STAT = 1;
      this.stat[save[FIRST_STAT]] = undefined;
    }
    await this.user.createUserStatistics({ learnedWords: 0, optional: this.statistics.optional });
  }

  addStatNewGame() {
    this.timeCurGame = new Date().getTime();
    this.stat[this.timeCurGame] = `${this.correctly},${this.attempt}`;
  }

  setParams() {
    this.sound = this.stat.settings.sound;
    let options = ['easy', 'normal', 'hard'];
    const SPEED = 7;
    this.view.speed = SPEED - 2 * options.findIndex((item) => item === this.stat.settings.speed);
    const HEARTS = 3;
    options = ['hard', 'normal', 'easy'];
    this.maxHeart = HEARTS + options.findIndex((item) => item === this.stat.settings.hearts);
    this.model.maxHeart = this.maxHeart;
    this.view.countHearts = this.maxHeart;
    this.model.page = this.stat.settings.page;
    this.model.lang = this.stat.settings.lang;
    this.view.lang = this.stat.settings.lang;
    this.count = this.stat.settings.words;
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
