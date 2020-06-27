import SprintView from './sprintView';
import SprintModel from './sprintModel';

export default class SprintController {
  constructor(user, openPopupResult) {
    this.openPopupResult = openPopupResult;
    this.view = new SprintView();
    this.model = new SprintModel(user);
    this.level = 0;
    this.time = 0;
    this.score = 0;
    this.isCorrect = true;
    this.minutes = 10;
    this.bonusCount = 0;
  }

  init() {
    this.view.renderHTML();
    this.makeWordField();
    this.finishHim();
    this.getRealtimer();

    // this.createWords();
    this.view.btnChoiceTrue.addEventListener('click', () => {
      this.checkBtnTrue();
    });

    this.view.btnChoiceFalse.addEventListener('click', () => {
      this.checkBtnFalse();
    });

    this.view.testButton.addEventListener('click', () => {
      this.checkWords();
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
    if (this.isCorrect) {
      this.score += 10;
      this.view.getScore(this.score);
      this.bonusCount += 1;
      console.log(this.bonusCount);
      this.bonusScore(this.bonusCount);
      this.makeWordField();
    } else {
      this.bonusCount = 0;
      this.makeWordField();
      this.bonusScore(this.bonusCount);
      console.log(this.bonusCount);
    }
  }

  checkBtnFalse() {
    if (!this.isCorrect) {
      this.bonusCount += 1;
      this.score += 10;
      this.view.getScore(this.score);
      this.bonusScore(this.bonusCount);
      this.makeWordField();
      console.log(this.bonusCount);
    } else {
      this.bonusCount = 0;
      console.log(this.bonusCount);
      this.bonusScore(this.bonusCount);
      this.makeWordField();
    }
  }

  bonusScore(bonus) {
    if (bonus === 4) {
      this.score += 10;
      this.bonusCount = 0;
    }
  }

  /*
  getTimer() {
    let timer;
    if (this.seconds < 60) {
      this.view.getTime(this.seconds);
    }
    if (this.seconds > 0) {
      this.seconds -= 1;
    } else {
      clearInterval(timer);
    }
    timer = window.setInterval(() => {
      this.getTimer();
    }, 1000);
  } */
  /*
  getTimer() {
    const minutes = Math.floor(this.minutes / 60);
    let seconds = this.minutes % 60;
    seconds = seconds < 60 ? `0  ${seconds}` : seconds;
    this.view.getTime(minutes, seconds);
    this.minutes -= 1;
    console.log(seconds);
  } */

  getRealtimer() {
    // const minutes = Math.floor(this.minutes / 60);
    const timer = setInterval(() => {
      // this.minutes = this.minutes < 10 ? `0  ${this.minutes}` : this.minutes;
      this.view.getTime(0, this.minutes);
      this.minutes -= 1;
      if (this.minutes === -1) {
        this.finishHim();
        clearInterval(timer);
        // this.openPopupResult(this.falseArray);
      }
    }, 1000);
  }

  finishHim() {
    return this.minutes;
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

  resultRecognition(e) {
    if (this.model.isSameWord(e)) {
      this.successCard();
    } else {
      this.view.displayWord(e);
    }
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
    return this.model.score;
  }
}
