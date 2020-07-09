import SpeakitView from './speakitView';
import SpeakitModel from './speakitModel';

export default class SpeakitController {
  constructor(http, openPopupResult) {
    this.openPopupResult = openPopupResult;
    this.view = new SpeakitView();
    this.model = new SpeakitModel(http);
    this.level = -1;
    this.quantityPages = 29;
    this.minUserWords = 20;
  }

  async init() {
    this.view.renderHTML();
    await this.createWords();
    this.view.result.addEventListener('click', () => {
      this.openPopupResult(this.words);
    });

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
    this.view.btnUserWords.addEventListener('click', () => {
      if (!this.view.btnUserWords.classList.contains('active')) {
        this.level = -1;
        this.view.addClassBtnUserWords();
        this.stop();
        this.change();
      }
    });

    this.createRecognition();
  }

  clickWordList(e) {
    const card = e.target.closest('.wordList__item');
    if (card && !this.model.game) {
      const cardActive = this.view.wordList.querySelector('.wordList__item.active');
      if (cardActive) {
        cardActive.classList.remove('active');
      }
      card.classList.add('active');
      const word = this.model.getWord(card.dataset.id);
      this.view.editInfo(word);
      this.view.playAudio(word);
    }
  }

  changeNumberPage() {
    this.model.page = Math.round(Math.random() * this.quantityPages);
  }

  async change() {
    if (this.level >= 0) {
      this.view.removeClassBtnUserWords();
    }
    this.model.level = this.level;
    this.stop();
    this.changeNumberPage();
    await this.createWords();
    this.dropScore();
    this.model.dropScore();
  }

  async createWords() {
    this.view.addLoadedClass();
    if (this.level < 0) {
      await this.model.getUserWords();
    }
    if (this.level === -1 && this.isUserWords()) {
      this.level = 0;
      this.model.level = this.level;
      this.view.removeClassBtnUserWords();
      this.view.checkFirstLevel();
    }
    if (this.level >= 0 || this.isUserWords()) {
      await this.model.getWords();
    } else {
      this.view.uncheckedLevels();
      this.model.mapUserWords();
    }
    this.words = await this.model.getRandomWords();
    this.view.clearWordList();
    this.view.createWords(this.words);
    this.view.removeLoadedClass();
  }

  isUserWords() {
    return !this.model.userWordsLength || this.model.userWordsLength < this.minUserWords;
  }

  clickStart() {
    if (this.model.game) {
      this.stop();
    } else {
      this.start();
    }
  }

  dropScore() {
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
    this.model.dropScore();
    this.model.game = true;
    this.recognition.start();
    window.resultRecognition = this.resultRecognition.bind(this);
  }

  createRecognition() {
    const MySpeechRecognition = window.SpeechRecognition
      || window.webkitSpeechRecognition || window.mozSpeechRecognition;
    this.recognition = new MySpeechRecognition();
    this.recognition.continuous = true;
    this.recognition.interimResults = false;
    this.recognition.lang = 'en-US';
    this.recognition.maxAlternatives = 30;
    this.recognition.addEventListener('result', (e) => {
      this.resultRecognition(e);
    });
    this.recognition.addEventListener('end', () => {
      if (this.model.game) {
        this.recognition.start();
      }
    });
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
    this.model.setUserStatistics();
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
