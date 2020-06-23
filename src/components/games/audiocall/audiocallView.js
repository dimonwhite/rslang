import { createElement } from '../../../utils';
import sound from '../../../assets/img/sound-audiocall.svg';
import arrow from '../../../assets/img/arrow-audiocall.svg';
import { urlGitHub } from '../../../constants';

export default class AudiocallView {
  constructor() {
    this.main = document.getElementById('main');
    this.audio = null;
  }

  renderHTML() {
    this.createElements();
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
      <div class="btn__next"><img class ="btn__next__img" src=${arrow}></div>
    </div>
    `;
    this.main.append(this.game);

    this.iconContainer = this.game.querySelector('.icon-container');
    this.wordDescription = this.game.querySelector('.word-description');
    this.wordWrapper = this.game.querySelector('.word-wrapper');
    this.infoWrapper = this.game.querySelector('.info-wrapper');
    this.btnIdk = this.game.querySelector('.btn__idk');
    this.btnNext = this.game.querySelector('.btn__next');
    this.displayElement(this.btnNext, 'none');
  }

  renderStepWords(word) {
    word.optionWords.forEach((el, i) => {
      const wordBlock = createElement({ tag: 'div', class: 'word', content: `${i + 1} ${el}` });
      if (el === word.wordTranslate) {
        this.rightWord = wordBlock;
        this.rightWord.index = i + 1;
      }
      this.wordWrapper.append(wordBlock);
    });
  }

  renderSoundIcon() {
    this.iconContainer.innerHTML = '';
    this.iconContainer.style.background = 'none';
    const soundIcon = new Image();
    soundIcon.src = `${sound}`;
    soundIcon.style.filter = 'invert(90%) saturate(2476%) hue-rotate(86deg) brightness(118%) contrast(119%)';
    soundIcon.classList.add('sound-icon');
    this.iconContainer.append(soundIcon);
  }

  renderWordIcon(word) {
    this.iconContainer.innerHTML = '';
    this.iconContainer.style.background = `white url(${urlGitHub}${word.image.replace('files/', '')}) no-repeat`;
    this.iconContainer.style.backgroundSize = 'cover';
  }

  playAudio(word) {
    if (word) {
      this.audioUrl = `${urlGitHub}${word.audio.replace('files/', '')}`;
    }
    if (this.audio) {
      this.audio.pause();
    }
    this.audio = new Audio(this.audioUrl);
    this.iconContainer.style.animation = 'pulse 10s infinite';
    this.audio.play();
    this.audio.onended = () => {
      this.iconContainer.style.animation = '';
    };
  }

  displayElement(element, display) {
    element.style.display = display;
    return this;
  }
}
