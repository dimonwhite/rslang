import SpeakitView from './speakitView';
import SpeakitModel from './speakitModel';

export default class SpeakitController {
  constructor(user, callResult) {
    this.callResult = callResult;
    this.view = new SpeakitView();
    this.model = new SpeakitModel(user);
  }

  init() {
    this.view.renderHTML();
    this.change();
    const listener = () => this.callResult(this.model.words);
    this.view.result.addEventListener('click', listener);

    this.view.wordList.addEventListener('click', (e) => {
      this.clickWordList(e);
    });

    this.view.startBtn.addEventListener('click', () => {
      this.clickStart();
    });
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
      console.log(word);
      this.view.editInfo(word);
      this.view.playAudio(word);
    }
  }

  change() {
    this.view.clearWordList();
    this.model.getWords()
      .then((data) => {
        this.view.createWords(data);
        this.model.page = this.model.page === 29 ? 0 : this.model.page + 1;
      });
  }
}
