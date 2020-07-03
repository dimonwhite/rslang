import SpeakitView from './speakitView';
import SpeakitModel from './speakitModel';

export default class SpeakitController {
  constructor(http, openPopupResult) {
    this.openPopupResult = openPopupResult;
    this.view = new SpeakitView();
    this.model = new SpeakitModel(http);
    this.level = 0;
  }

  init() {
    this.view.renderHTML();
    this.createWords();
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
    this.model.page = Math.round(Math.random() * 29);
  }

  change() {
    this.model.level = this.level;
    this.stop();
    this.changeNumberPage();
    this.createWords();
    this.dropScore();
    this.model.dropScore();
  }

  createWords() {
    this.view.clearWordList();
    this.model.getWords()
      .then((data) => {
        this.words = data;
        this.view.createWords(this.words);
      });
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
