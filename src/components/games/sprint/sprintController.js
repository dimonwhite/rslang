import SprintView from './sprintView';
import SprintModel from './sprintModel';

export default class SprintController {
  constructor(user, openPopupResult) {
    this.openPopupResult = openPopupResult;
    this.view = new SprintView();
    this.model = new SprintModel(user);
    this.startDelay = true;
    this.level = 0;
    this.time = 0;
    this.score = 0;
    this.isCorrect = true;
    this.minutes = 60;
    this.LoadTime = 5;
    this.bonusCount = 0;
    this.countWords = 0;
  }

  init() {
    this.view.renderHTML();

    // this.createWords();
    this.view.btnChoiceTrue.addEventListener('click', () => {
      this.checkBtnTrue();
    });

    this.view.btnChoiceFalse.addEventListener('click', () => {
      this.checkBtnFalse();
    });

    document.addEventListener('keydown', (event) => {
      // eslint-disable-next-line eqeqeq
      if (event.code == 'ArrowLeft') {
        this.checkBtnTrue();
      }
    });

    document.addEventListener('keydown', (event) => {
      // eslint-disable-next-line eqeqeq
      if (event.code == 'ArrowRight') {
        this.checkBtnFalse();
      }
    });

    /*
    this.view.wordList.addEventListener('click', (e) => {
      this.clickWordList(e);
    });

    this.view.startBtn.addEventListener('click', () => {
      this.clickStart();
    });
    this.view.newGame.addEventListener('click', () => {
      this.stop();
      this.change();
    });

    this.createRecognition();
    */
  }

  makeWordField() {
    const trueArray = this.model.getWords();
    const falseArray = this.model.getFalseWords();
    const rand = Math.floor(Math.random() * 2);
    if (rand) {
      this.view.getTrueCouple(trueArray[this.time], trueArray[this.time]);
      this.isCorrect = true;
      this.time += 1;
    } else {
      this.view.getFalseCouple(trueArray[this.time], falseArray[this.time]);
      this.isCorrect = false;
      this.time += 1;
    }
  }

  checkBtnTrue() {
    const obj = this.model.getWords();
    if (this.isCorrect) {
      obj[this.time].success = true;
      this.score += 10;
      this.countWords += 1;
      this.view.getScore(this.score);
      this.bonusCount += 1;
      this.view.getBonus();
      this.bonusScore(this.bonusCount);
      this.makeWordField();
    } else {
      this.bonusCount = 0;
      obj[this.time].success = false;
      this.view.clearBonus();
      this.makeWordField();
      this.bonusScore(this.bonusCount);
    }
  }

  checkBtnFalse() {
    const obj = this.model.getWords();
    if (!this.isCorrect) {
      obj[this.time].success = true;
      this.countWords += 1;
      this.bonusCount += 1;
      this.score += 10;
      this.view.getScore(this.score);
      this.bonusScore(this.bonusCount);
      this.view.getBonus();
      this.makeWordField();
    } else {
      obj[this.time].success = false;
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
      // this.minutes = this.minutes < 10 ? `0  ${this.minutes}` : this.minutes;
      this.view.getTime(0, this.minutes);
      this.minutes -= 1;
      if (this.minutes === -1) {
        clearInterval(roundTime);
        // this.openPopupResult(this.model.getWords());
      }
    }, 1000);
  }

  getLoadTimer() {
    const LoadTime = setInterval(() => {
      // this.minutes = this.minutes < 10 ? `0  ${this.minutes}` : this.minutes;
      this.view.getLoaderTime(this.LoadTime);
      this.LoadTime -= 1;
      if (this.LoadTime === -1) {
        clearInterval(LoadTime);
        // this.openPopupResult(this.model.getWords());
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

  changeNumberPage() {
    this.model.page = this.model.page === 29 ? 0 : this.model.page + 1;
  }

  nextCard() {
    // console.log(document.querySelector('.couple__item'));
    const preWords = document.querySelector('.couple__item');
    while (preWords.firstChild) {
      this.preWords.removeChild(preWords.firstChild);
    }
    this.createWords();
  }

  createWords() {
    this.model.getWords()
      .then((data) => {
        this.words = data;
        // console.log(data);
        this.view.createWords(this.words);
      });
  }

  startRound() {
    this.view.getPreloader();
    this.getLoadTimer();
    this.makeWordField();
    this.getRealtimer();
  }

  change() {
    this.stop();
    this.changeNumberPage();
    this.createWords();
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
    this.recognition.stop();
  }

  start() {
    this.dropScore();
    this.view.start();
    this.model.game = true;
    this.recognition.start();
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
    this.openPopupResult(this.words);
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
