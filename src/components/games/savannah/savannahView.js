import { createElement } from '../../../utils';

export default class SavannahView {
  constructor(callResult) {
    this.callResult = callResult;
    this.countHearts = 5;
    this.SHIP_HIGHT = 35;
    this.BG_HIGHT = 3500;
  }

  renderHTML() {
    const main = document.getElementById('main');
    this.savannah = createElement('section', 'savannah', 'savannah');
    this.savannah.append(this.createGame());
    main.append(this.savannah);
    this.startBg = window.getComputedStyle(this.game, null).getPropertyValue('background-position-y');
    document.getElementById('gameResult').addEventListener('click', this.speakWord.bind(this));
  }

  createGame() {
    this.game = createElement('section', 'savannah__game');
    this.hearts = createElement('div', 'savannah__game-heart');
    for (let i = 0; i < this.countHearts; i += 1) {
      const img = createElement('img', 'savannah__game-heart-img');
      img.src = './img/heart.png';
      img.setAttribute('alt', '');
      this.hearts.append(img);
    }
    this.game.append(this.hearts);
    this.game.append(this.createField());
    this.game.append(this.createCountdown());

    this.ship = createElement('img', 'savannah__game-ship');
    this.ship.src = './img/ship.png';
    this.ship.setAttribute('alt', '');
    this.game.append(this.ship);
    return this.game;
  }

  createField() {
    this.field = createElement('div', 'savannah__game-field');
    this.top = createElement('div', 'savannah__game-question');
    this.field.append(this.top);

    this.options = createElement('div', 'savannah__game-wrap', 'savOptions');
    const OPTIONS = 4;
    for (let i = 1; i <= OPTIONS; i += 1) {
      const answer = createElement('button', 'savannah__game-answer', `savAnswer${i}`);
      this.options.append(answer);
    }
    this.field.append(this.options);
    this.bottom = createElement('div', 'savannah__game-question');
    this.field.append(this.bottom);
    return this.field;
  }

  createCountdown() {
    this.countdown = createElement('div', 'savannah__timer');
    this.time = createElement('span', 'savannah__timer-time', false, '3');
    this.countdown.append(this.time);

    const context = 'Для быстрого ответа можно использовать клавиши 1, 2, 3, 4';
    const text = createElement('p', 'savannah__timer-text', 'savText', context);
    this.countdown.append(text);

    const key = createElement('img', 'savannah__timer-key');
    key.setAttribute('alt', '');
    key.src = './img/keyboard.png';
    this.countdown.append(key);
    return this.countdown;
  }

  getStart() {
    this.savannah.classList.add('show');
    document.getElementById('begin').classList.add('hide');
    this.game.style.backgroundImage = 'url(./img/bg-savana.svg)';
    this.game.classList.add('show-flex');
    setTimeout(() => { this.time.innerHTML = 2; }, 1000);
    setTimeout(() => { this.time.innerHTML = 1; }, 2000);
    return +document.getElementById('selectCount').value;
  }

  getStartRound() {
    this.countdown.classList.add('hide');
    this.field.classList.add('show-flex');
  }

  startNextRound(gameWords, attempt) {
    if (this.top) this.top.remove();
    if (this.bottom) this.bottom.remove();

    const WORDS = 4;
    this.getRandomIndexes(WORDS);
    Array.from(this.options.children).forEach((item, index) => {
      const word = gameWords[attempt][this.randIndexes[index]];
      item.innerHTML = word;
      item.classList.remove('savannah__correct');
      item.classList.remove('savannah__incorrect');
      if (this.randIndexes[index] === 0) {
        item.setAttribute('data-answer', 'true');
      } else {
        item.setAttribute('data-answer', 'false');
      }
    });

    const rand = Math.floor(Math.random() * 2);
    if (rand) {
      this.moveWordFromTop(gameWords[attempt][4]);
    } else {
      this.moveWordFromBottom(gameWords[attempt][4]);
    }
  }

  moveWordFromTop(word) {
    this.top = createElement('div', 'savannah__game-question', false, word);
    this.bottom = createElement('div');
    this.field.prepend(this.top);
    this.field.append(this.bottom);
    this.top.classList.add('move-from-top');
  }

  moveWordFromBottom(word) {
    this.bottom = createElement('div', 'savannah__game-question', false, word);
    this.top = createElement('div');
    this.field.prepend(this.top);
    this.field.append(this.bottom);
    this.bottom.innerHTML = word;
    this.bottom.classList.add('move-from-bottom');
  }

  nextWord(countHeart) {
    this.hearts.children[countHeart].src = './img/heart-empty.png';
    if (this.top.classList.length > 1) {
      this.top.innerHTML = '';
      const matrix = window.getComputedStyle(this.top).getPropertyValue('transform');
      this.top.classList.remove('move-from-top');
      this.top.style.transform = matrix;
      this.top.classList.add('move-out-top');
    } else {
      this.bottom.innerHTML = '';
      const matrix = window.getComputedStyle(this.bottom).getPropertyValue('transform');
      this.bottom.classList.remove('move-from-bottom');
      this.bottom.style.transform = matrix;
      this.bottom.classList.add('move-out-bottom');
    }
  }

  getCorrectlyAnswer(target, delta) {
    target.classList.add('savannah__correct');
    if (this.top.classList.length > 1) {
      this.top.innerHTML = '';
      const matrix = window.getComputedStyle(this.top).getPropertyValue('transform');
      this.top.classList.remove('move-from-top');
      this.top.style.transform = matrix;
      this.top.classList.add('move-to-ship-top');
    } else {
      this.bottom.innerHTML = '';
      const matrix = window.getComputedStyle(this.bottom).getPropertyValue('transform');
      this.bottom.classList.remove('move-from-bottom');
      this.bottom.style.transform = matrix;
      this.bottom.classList.add('move-to-ship-bottom');
    }
    this.moveBackground(delta);
  }

  moveBackground(delta) {
    const bg = +this.startBg.replace('px', '');
    this.game.style.backgroundPositionY = `${bg + Math.floor(this.BG_HIGHT * delta)}px`;
    setTimeout(() => {
      this.ship.style.height = `${Math.floor(this.SHIP_HIGHT * (delta + 1))}px`;
      this.ship.style.width = `${Math.floor(this.SHIP_HIGHT * (delta + 1))}px`;
    }, 2000);
  }

  getIncorrectlyAnswer(target, countHeart) {
    target.classList.add('savannah__incorrect');
    if (this.top.classList.length > 1) {
      this.top.innerHTML = '';
      const matrix = window.getComputedStyle(this.top).getPropertyValue('transform');
      this.top.classList.remove('move-from-top');
      this.top.style.transform = matrix;
      this.top.classList.add('move-out-top');
    } else {
      this.bottom.innerHTML = '';
      const matrix = window.getComputedStyle(this.bottom).getPropertyValue('transform');
      this.bottom.classList.remove('move-from-bottom');
      this.bottom.style.transform = matrix;
      this.bottom.classList.add('move-out-bottom');
    }
    this.hearts.children[countHeart].src = './img/heart-empty.png';
  }

  endGame(words, attempt) {
    this.top.remove();
    this.bottom.remove();
    this.field.classList.remove('show-flex');
    this.countdown.classList.remove('hide');
    this.savannah.classList.remove('show');
    this.callResult(words, attempt);
  }

  newGame() {
    document.getElementById('begin').classList.remove('hide');
    document.getElementById('gameResult').classList.remove('show');
    this.time.innerHTML = '3';
    this.ship.style.height = `${this.SHIP_HIGHT}px`;
    this.ship.style.width = `${this.SHIP_HIGHT}px`;
    this.game.style.backgroundPositionY = this.startBg;
    Array.from(this.hearts.children).forEach((item) => {
      item.src = './img/heart.png';
    });
  }

  speakWord(e) {
    if (e.target.tagName === 'LI') {
      const audio = new Audio();
      audio.src = this.words[+e.target.id.replace('li', '')].audio;
      audio.autoplay = true;
    }
  }

  getRandomIndexes(count) {
    this.randIndexes = [];
    while (this.randIndexes.length < count) {
      const rand = Math.floor(Math.random() * count);
      if (!this.randIndexes.includes(rand)) {
        this.randIndexes.push(rand);
      }
    }
  }
}
