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
    this.wordResult = [];
    this.trueArray = [];
    this.falseArray = [];
    this.wordCount = 100;
    this.trueWord = 0;
    this.falseWord = 0;
    this.hard = 0;
    this.options = 1;
    this.chekedTranslate = [];
    this.wordControl = false;
  }

  init() {
    this.model.setUserStatistics();
    this.checkUser();
    this.view.renderHTML();
    this.changeLvlv();
    this.useMyWords();

    this.view.btnChoiceTrue.addEventListener('click', () => {
      this.checkBtnTrue();
    });

    this.view.btnChoiceFalse.addEventListener('click', () => {
      this.checkBtnFalse();
    });

    this.keyDownCallBack = this.keyPressArr.bind(this);
    document.addEventListener('keydown', this.keyDownCallBack);
    document.addEventListener('click', () => {
      clearInterval(this.roundTime);
    });
  }

  removeButton() {
    this.view.btnChoiceTrue.removeEventListener('click', () => {
      this.checkBtnTrue();
    });
    this.view.btnChoiceFalse.removeEventListener('click', () => {
      this.checkBtnFalse();
    });
  }

  keyPressArr(event) {
    if (event.code === 'ArrowLeft') {
      this.checkBtnTrue();
      return;
    }
    if (event.code === 'ArrowRight') {
      this.checkBtnFalse();
    }
  }

  changeLvlv() {
    document.querySelectorAll('.radio').forEach((e) => {
      e.addEventListener('click', () => {
        this.hard = e.id.slice(5);
        this.wordControl = false;
        return this.hard;
      });
    });
  }

  async checkUser() {
    this.trueArray = await this.model.getUserWords();
    if (this.trueArray.length >= 90) {
      this.wordControl = true;
    }
  }

  useMyWords() {
    document.querySelector('.game__sprint__user-words-button').addEventListener('click', () => {
      if (this.trueArray.length >= 90) {
        this.wordControl = true;
        this.makerArray(this.hard, this.count);
      } else {
        this.view.addNotificationWord();
        this.hard = 0;
        this.wordControl = false;

        this.makerArray(this.hard, this.wordCount);
      }
    });
  }

  async makerArray(y, x) {
    if (this.wordControl) {
      this.trueArray = await this.model.getUserWords();
      this.makeWordField();
      return this.trueArray;
    }
    this.trueArray = await this.model.getJustWords(y, x);
    this.makeWordField();
    return this.trueArray;
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
    } else {
      this.view.getFalseCouple(this.trueArray[this.time],
        randomArray(SprintController.translateCheck(this.trueArray[this.time]
          .wordTranslate,
        this.model.gameFalseWords))[this.time]);
      this.isCorrect = false;
    }
  }

  checkBtnTrue() {
    if (this.isCorrect) {
      this.view.playAudio('correct');
      this.trueArray[this.time].success = true;
      this.wordResult.push(this.trueArray[this.time]);
      this.score += 10;
      this.countWords += 1;
      this.trueWord += 1;
      this.view.getScore(this.score);
      this.answerCount += 1;
      this.view.addTextDescription(this.answerCount);
      this.addChekedBonus();
      this.bonusScore(this.bonusCount);
      this.view.changeBackgroundTrue();
      this.bonusCounter();
      this.time += 1;
      this.makeWordField();
    } else {
      this.view.playAudio('error');
      this.view.addTextDescriptionFalse(this.answerCount);
      this.answerCount = 0;
      this.trueArray[this.time].success = false;
      this.wordResult.push(this.trueArray[this.time]);
      this.view.clearBonus();
      this.falseWord += 1;
      this.bonusScore(this.bonusCount);
      this.view.changeBackgroundFalse();
      this.time += 1;
      this.makeWordField();
    }
  }

  checkBtnFalse() {
    if (!this.isCorrect) {
      this.view.playAudio('correct');
      this.trueArray[this.time].success = true;
      this.wordResult.push(this.trueArray[this.time]);
      this.countWords += 1;
      this.answerCount += 1;
      this.trueWord += 1;
      this.score += 10;
      this.view.getScore(this.score);
      this.bonusScore(this.bonusCount);
      this.view.addTextDescription(this.answerCount);
      this.addChekedBonus();
      this.view.changeBackgroundTrue();
      this.bonusCounter();
      this.time += 1;
      this.makeWordField();
    } else {
      this.view.playAudio('error');
      this.trueArray[this.time].success = false;
      this.wordResult.push(this.trueArray[this.time]);
      this.view.addTextDescriptionFalse(this.answerCount);
      this.view.changeBackgroundFalse();
      this.answerCount = 0;
      this.falseWord += 1;
      this.view.clearBonus();
      this.bonusScore(this.bonusCount);
      this.time += 1;
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
      this.view.playAudio('success');
      this.addBonusPlanet();
      this.view.getScore(this.score);
    }
  }

  addMainTimer() {
    clearInterval(this.roundTime);
    this.seconds = 60;
    this.wordResult = [];
    this.roundTime = setInterval(() => {
      this.view.addTimer(this.seconds);
      // this.view.startCircleTimer();
      this.seconds -= 1;
      this.playLustSecond();
      if (this.seconds === -1) {
        clearInterval(this.roundTime);
        this.seconds = 60;
        this.view.addTimer(' ');
        this.view.removeButton();
        this.openPopupResult(this.wordResult);
        this.view.restartCircleTimer();
        this.model.score = this.score;
        this.model.trueWord = this.trueWord;
        this.model.falseWord = this.falseWord;
        this.model.setUserStatistics();
        this.view.playAudio('endgame');
        this.view.clearBonus();
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
    setTimeout(() => {
      this.view.playAudio('loader');
    }, 1000);
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

  playLustSecond() {
    if (this.seconds === 7) {
      this.view.playLustSecond();
    }
  }

  change() {
    this.view.dropScore();
    this.view.clearPlanet();
    this.view.addButton();
    setTimeout(() => {
      this.view.playAudio('loader');
    }, 1000);
    this.view.clearBonus();
    this.makeWordField();
    this.view.restartCircleTimer();
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
    this.openPopupResult(this.wordResult);
  }

  changeCountWords(count) {
    this.model.countWords = count;
    this.change();
  }

  getCountWords() {
    return this.model.countWords;
  }

  getScore() {
    return this.trueWord;
  }

  removeListeners() {
    document.removeEventListener('keydown', this.keyDownCallBack);
  }
}
