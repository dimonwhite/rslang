import { createElement } from '../../../utils';
import sound from '../../../assets/img/sound-audiocall.svg';
import arrow from '../../../assets/img/arrow-audiocall.svg';
import { urlGitHub } from '../../../constants';
import gameOver from '../../../assets/img/audiocall/gameover.svg';

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
    <div class="restart-wrapper">
    <div class="btn__top stats">Статистика</div>
    <div class="btn__top user-words">Слова пользователя</div>
    <div class="btn__top restart">Рестарт</div>
    <a class="btn__top exit" href="#/games">Выход</a>
    </div>
    <div class="info-wrapper">
      <div class="icon-container"></div>
      <div class="word-description"></div>
    </div>
    <div class="word-wrapper"></div>
    <div class="btn-wrapper">
      <div class="btn btn__idk">Я не знаю</div>
      <div class="btn btn__next"><img class ="btn__next__img" src=${arrow}></div>
    </div>
    `;
    this.main.append(this.game);

    this.iconContainer = this.game.querySelector('.icon-container');
    this.wordDescription = this.game.querySelector('.word-description');
    this.wordWrapper = this.game.querySelector('.word-wrapper');
    this.infoWrapper = this.game.querySelector('.info-wrapper');
    this.btnIdk = this.game.querySelector('.btn__idk');
    this.btnNext = this.game.querySelector('.btn__next');
    this.btnuserWords = this.game.querySelector('.user-words');
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

  btnUserWordsDecorate(isUserWords) {
    if (isUserWords) {
      this.btnuserWords.classList.add('active');
    } else {
      this.btnuserWords.classList.remove('active');
    }
  }

  renderSoundIcon() {
    this.iconContainer.innerHTML = '';
    this.iconContainer.style.background = 'none';
    const soundIcon = createElement({ tag: 'img', class: 'sound-icon' });
    soundIcon.src = `${sound}`;
    this.iconContainer.append(soundIcon);
  }

  renderEndgamePost() {
    this.iconContainer.innerHTML = '';
    this.iconContainer.style.background = `url(${gameOver})`;
  }

  renderWordIcon(word) {
    this.iconContainer.innerHTML = '';
    this.iconContainer.style.background = `white url(${urlGitHub}${word.image.replace('files/', '')}) no-repeat`;
    this.iconContainer.style.backgroundSize = 'cover';
  }

  renderStats(data) {
    this.statWindow = document.createElement('div');
    this.statWindow.classList.add('stat-window', 'modal-window');

    this.statWindow.innerHTML = `
      <div class="stat-modal">
        <h2 class="stat-modal__title">СТАТИСТИКА</h2>
        <h3 class="stat-modal__subtitle">Кликай для продолжения</h3>
      </div>
    `;
    if (!this.main.querySelector('.stat-window')) {
      this.main.append(this.statWindow);
    }

    this.statMessage = this.statWindow.querySelector('.stat-modal');

    Object.keys(data).forEach((key) => {
      if (key !== 'length') {
        const statLine = document.createElement('p');
        statLine.classList.add('stat-line');
        const parsedStat = data[key].replace(' ', '').split(',');
        statLine.innerText = `${new Date(parseInt(key, 0)).toLocaleString()} правильные ответы: ${parsedStat[0]}, Неправильные ответы: ${parsedStat[1]}`;
        this.statMessage.append(statLine);
      }
    });
  }

  removeModal() {
    this.main.querySelector('.modal-window').remove();
  }

  appendanswerIcon(answer, nodeElement) {
    const answerIcon = createElement({ tag: 'img', class: 'answer-icon' });
    answerIcon.src = answer;
    nodeElement.append(answerIcon);
    return this;
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

  getBackColor() {
    const randomColor = () => Math.floor(Math.random() * 255);
    this.backColor = {
      r: randomColor(),
      g: randomColor(),
      b: randomColor(),
    };
  }

  setBackground() {
    this.main.style.background = `rgba(${this.backColor.r}, ${this.backColor.g}, ${this.backColor.b}, 0.3)`;
  }

  changeBackground() {
    this.backColor.r -= 10;
    this.backColor.g -= 20;
    this.backColor.b -= 30;
    this.setBackground();
  }

  renderPreloader() {
    this.preloader = createElement({ tag: 'div', class: 'loading' });
    this.preloader.innerHTML = `
    <div class="dot"></div>
    <div class="dot"></div>
    <div class="dot"></div>
    <div class="dot"></div>
    <div class="dot"></div>
    `;
    this.main.append(this.preloader);
  }

  slideAway() {
    [...this.wordWrapper.children].forEach((el) => {
      el.classList.add('slide-away');
    });
  }
}
