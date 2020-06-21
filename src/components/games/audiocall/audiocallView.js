import { createElement } from '../../../utils';

export default class AudiocallView {
  constructor() {
    this.main = document.getElementById('main');
    this.audio = null;
  }

  renderHTML() {
    this.createElements();
    this.main.append(this.game);
  }

  createElements() {
    this.game = createElement({ tag: 'section', class: 'game' });

    this.game.innerHTML = `
    <div class="info-wrapper">
      <div class="icon-container"></div>
      <div class="word-description"></div>
    </div>
    <div class="word-wrapper"></div>
    <div class="btn-wrapper">
      <div class="btn btn__idk">I don't know</div>
      <div class="btn btn__next">Next</div>
    </div>
    `;
    this.iconContainer = document.querySelector('.icon-container');
    this.wordDescription = document.querySelector('.word-description');
    this.wordWrapper = document.querySelector('.word-wrapper');
    this.btnIdk = document.querySelector('.btn__idk');
    this.btnNext = document.querySelector('.btn__next');
  }

  renderWords(arr) {
    arr.forEach((el) => {
      const word = createElement({ tag: 'div', class: 'word' });
      word.innerText = el;
      this.wordWrapper.append(word);
    });
  }
}
