import { randomArray } from '@/utils';
import SprintView from './sprintView';
import SprintModel from './sprintModel';

export default class SprintController {
  constructor(http, openPopupResult) {
    this.openPopupResult = openPopupResult;
    this.view = new SprintView();
    this.model = new SprintModel(http);
    this.startDelay = true;
    this.level = 0;
    this.time = 0;
    this.answerCount = 0;
    this.score = 0;
    this.isCorrect = true;
    this.seconds = 60;
    this.LoadTime = 5;
    this.bonusPlanet = 0;
    this.countWords = 0;
    this.trueArray = [];
    this.falseArray = [];
    this.wordCount = 15;
    this.hard = 0;
    this.options = 1;
    this.chekedTranslate = [];
  }

  init() {
    this.view.renderHTML();
    this.changeLvlv();
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

  changeLvlv() {
    document.querySelectorAll('.radio').forEach((e) => {
      e.addEventListener('click', () => {
        this.hard = e.id.slice(5);
        return this.hard;
      });
      console.log(e.id.slice(5));
    });
  }

  async makerArray(y, x) {
    this.trueArray = await this.model.getWords(y, x);
    this.makeWordField();
  }

  static translateCheck(word, badTranslate) {
    const result = badTranslate.filter((e) => e !== word);
    return result;
  }

  makeWordField() {
    const rand = Math.floor(Math.random() * 2);
    if (rand) {
      this.view.getTrueCouple(this.trueArray[this.time], this.trueArray[this.time]);
      this.isCorrect = true;
      this.time += 1;
    } else {
      this.view.getFalseCouple(this.trueArray[this.time],
        randomArray(SprintController.translateCheck(this.trueArray[this.time]
          .wordTranslate,
        this.model.gameFalseWords))[this.time]);
      console.log(this.trueArray[this.time].wordTranslate);
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
      this.answerCount += 1;
      this.view.addTextDescription(this.answerCount);
      this.addChekedBonus();
      this.bonusScore(this.bonusCount);
      this.view.changeBackgroundTrue();
      this.bonusCounter();
      this.makeWordField();
    } else {
      this.view.addTextDescriptionFalse(this.answerCount);
      this.answerCount = 0;
      this.trueArray[this.time - 1].success = false;
      this.view.clearBonus();

      this.bonusScore(this.bonusCount);
      this.view.changeBackgroundFalse();
      this.makeWordField();
    }
  }

  checkBtnFalse() {
    if (!this.isCorrect) {
      this.trueArray[this.time].success = true;
      this.countWords += 1;
      this.answerCount += 1;
      this.score += 10;
      this.view.getScore(this.score);
      this.bonusScore(this.bonusCount);
      this.view.addTextDescription(this.answerCount);
      this.addChekedBonus();
      this.view.changeBackgroundTrue();
      this.bonusCounter();

      this.makeWordField();
    } else {
      this.trueArray[this.time].success = false;
      this.view.addTextDescriptionFalse(this.answerCount);
      this.view.changeBackgroundFalse();
      this.answerCount = 0;
      this.view.clearBonus();
      this.bonusScore(this.bonusCount);
      this.makeWordField();
    }
  }

  bonusScore(bonus) {
    if (bonus === 4) {
      this.score += 10;
      this.view.clearBonus();
    }
  }

  addChekedBonus() {
    switch (this.answerCount) {
      case 1:
        SprintView.getBonus('1');
        break;
      case 2:
        SprintView.getBonus('2');
        break;
      case 3:
        SprintView.getBonus('3');
        break;

      default:
        break;
    }
  }

  addBonusPlanet() {
    switch (this.bonusPlanet) {
      case 1:
        SprintView.getBonusPlanet('1');
        break;
      case 2:
        SprintView.getBonusPlanet('2');
        break;
      case 3:
        SprintView.getBonusPlanet('3');
        break;
      case 4:
        SprintView.getBonusPlanet('4');
        break;

      default:
        break;
    }
  }

  bonusCounter() {
    if (this.answerCount === 3) {
      this.view.addTrueBonusTittle();
      setTimeout(() => {
        this.view.clearBonus();
      }, 300);
      this.bonusPlanet += 1;
      this.answerCount = 0;
      this.score += 10;
      this.addBonusPlanet();
      this.view.getScore(this.score);
      console.log(this.bonusPlanet);
    }
  }

  addMainTimer() {
    clearInterval(this.roundTime);
    this.seconds = 60;

    this.roundTime = setInterval(() => {
      this.view.addTimer(this.seconds);
      this.view.startCircleTimer();
      this.seconds -= 1;
      if (this.seconds === 0) {
        clearInterval(this.roundTime);
        this.seconds = 60;
        this.view.addTimer('0');
        console.log(this.seconds);
        // this.openPopupResult(this.trueArray);
      }
    }, 1000);
  }

  addLoadTimer() {
    const LoadTime = setInterval(() => {
      this.view.getLoaderTime(this.LoadTime);
      this.LoadTime -= 1;
      if (this.LoadTime === -1) {
        this.addMainTimer();

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
    this.makerArray(this.hard, this.wordCount);
    this.view.getPreloader();
    this.addLoadTimer();
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
    this.addLoadTimer();
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
