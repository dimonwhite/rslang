import SpeakitView from './speakitView';
import SpeakitModel from './speakitModel';

export default class SpeakitController {
  constructor(user, callResult) {
    this.callResult = callResult;
    this.view = new SpeakitView();
    this.model = new SpeakitModel(user);
    this.level = 0;
  }

  init() {
    this.view.renderHTML();
    this.createWords();
    this.result = () => this.callResult(this.model.dataWords);
    this.view.result.addEventListener('click', this.result);

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
    this.model.page = this.model.page === 29 ? 0 : this.model.page + 1;
  }

  change() {
    this.stop();
    this.changeNumberPage();
    this.createWords();
  }

  createWords() {
    this.view.clearWordList();
    this.model.getWords()
      .then((data) => {
        this.view.createWords(data);
      });
  }

  clickStart() {
    this.dropScore();
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
    this.view.stop();
    this.model.stop();
    this.recognition.stop();
  }

  start() {
    this.view.start();
    this.model.game = true;
    this.recognition.start();
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
    this.result();
  }

  changeCountWords(count) {
    this.model.countWords = count;
    this.change();
  }

  getCountWords() {
    return this.model.countWords;
  }
}
