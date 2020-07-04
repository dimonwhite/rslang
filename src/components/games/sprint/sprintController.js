import SprintView from './sprintView';
import SprintModel from './sprintModel';
import HttpClient from '../../httpclient/HttpClient';

export default class SprintController {
  constructor(user, openPopupResult) {
    this.user = new HttpClient();
    this.openPopupResult = openPopupResult;
    this.view = new SprintView();
    this.model = new SprintModel(this.user);
    this.startDelay = true;
    this.level = 0;
    this.time = 0;
    this.score = 0;
    this.isCorrect = true;
    this.minutes = 59;
    this.LoadTime = 5;
    this.bonusCount = 0;
    this.countWords = 0;
    this.trueArray = [];
    this.falseArray = [];
    this.wordCount = 30;
    this.hard = 0;
    this.options = 1;
  }

  init() {
    this.makerArray();

    this.view.renderHTML();
    // this.model.getWords();
    //  this.model.getHTTpWords('2');
    this.view.btnChoiceTrue.addEventListener('click', () => {
      this.checkBtnTrue();
    });

    this.view.btnChoiceFalse.addEventListener('click', () => {
      this.checkBtnFalse();
    });

    document.addEventListener('keydown', (event) => {
      if (event.code === 'ArrowLeft') {
        this.checkBtnTrue();
      }
    });

    document.addEventListener('keydown', (event) => {
      if (event.code === 'ArrowRight') {
        this.checkBtnFalse();
      }
    });
  }

  async makerArray() {
    this.trueArray = await this.model.getWords(this.hard, this.wordCount);
    this.makeWordField();
    console.log(this.trueArray);
    console.log(this.falseArray);
  }

  makeWordField() {
    const rand = Math.floor(Math.random() * 2);
    if (rand) {
      this.view.getTrueCouple(this.trueArray[this.time], this.trueArray[this.time]);
      this.isCorrect = true;
      this.time += 1;
    } else {
      this.view.getFalseCouple(this.trueArray[this.time], this.model.gameFalseWords[this.time]);
      this.isCorrect = false;
      this.time += 1;
    }
  }

  checkBtnTrue() {
    if (this.isCorrect) {
      this.trueArray[this.time].success = true;
      this.score += 10;
      this.countWords += 1;
      this.view.getScore(this.score);
      this.bonusCount += 1;
      this.view.getBonus();
      this.bonusScore(this.bonusCount);
      this.makeWordField();
    } else {
      this.bonusCount = 0;
      this.trueArray[this.time - 1].success = false;
      this.view.clearBonus();
      this.bonusScore(this.bonusCount);
      this.makeWordField();
    }
  }

  checkBtnFalse() {
    if (!this.isCorrect) {
      this.trueArray[this.time].success = true;
      this.countWords += 1;
      this.bonusCount += 1;
      this.score += 10;
      this.view.getScore(this.score);
      this.bonusScore(this.bonusCount);
      this.view.getBonus();
      this.makeWordField();
    } else {
      this.trueArray[this.time].success = false;
      this.bonusCount = 0;
      this.view.clearBonus();
      this.bonusScore(this.bonusCount);
      this.makeWordField();
    }
  }

  bonusScore(bonus) {
    if (bonus === 4) {
      this.score += 10;
      this.bonusCount = 0;
      this.view.clearBonus();
    }
  }

  getRealtimer() {
    const roundTime = setInterval(() => {
      this.view.getTime(0, this.minutes);
      this.minutes -= 1;
      if (this.minutes === -1) {
        clearInterval(roundTime);
        this.minutes = 59;
        this.view.getTime('1', '00');
        this.openPopupResult(this.trueArray);
      }
    }, 1000);
  }

  getLoadTimer() {
    const LoadTime = setInterval(() => {
      this.view.getLoaderTime(this.LoadTime);
      this.LoadTime -= 1;
      if (this.LoadTime === -1) {
        this.getRealtimer();
        clearInterval(LoadTime);
        this.LoadTime = 5;
      }
    }, 1000);
  }

  checkWords() {
    if (this.isCorrect) {
      this.score += 10;
      this.makeScore(this.score);
      this.makeWordField();
    } else {
      this.makeWordField();
    }
  }

  createWords() {
    this.model.getWords()
      .then((data) => {
        this.words = data;
        this.view.createWords(this.words);
      });
  }

  startRound() {
    this.view.getPreloader();
    this.getLoadTimer();
  }

  clickStart() {
    if (this.model.game) {
      this.stop();
    } else {
      this.start();
    }
  }

  dropScore() {
    this.model.score = 0;
    this.view.dropScore();
  }

  stop() {
    this.dropScore();
    this.view.stop();
    this.model.stop();
  }

  change() {
    this.view.dropScore();
    this.view.clearBonus();
    this.makeWordField();
    this.view.getLoaderTime(5);
    this.view.restartLoader();
    this.view.getPreloader();
    this.getLoadTimer();
  }

  successCard() {
    this.model.successWord.success = true;
    this.view.successCard(this.model.successWord, this.model.successId);
    this.model.score += 1;
    if (this.model.score >= this.model.countWords) {
      this.win();
    }
  }

  win() {
    this.dropScore();
    this.stop();
    this.openPopupResult(this.trueArray);
  }

  changeCountWords(count) {
    this.model.countWords = count;
    this.change();
  }

  getCountWords() {
    return this.model.countWords;
  }

  getScore() {
    return this.countWords;
  }
}
