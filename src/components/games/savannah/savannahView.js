import { createElement } from '../../../utils';

export default class SavannahView {
  constructor() {
    this.countHearts = 5;
    this.SHIP_HIGHT = 35;
    this.BG_HIGHT = 3500;
    this.lang = 'EN';
  }

  renderHTML() {
    const main = document.getElementById('main');
    document.getElementById('gameOptions').classList.add('show');
    document.getElementById('closePopup').innerHTML = 'Close Game';
    this.createLanguageSelect();
    this.savannah = createElement({ tag: 'section', class: 'savannah', id: 'savannah' });
    this.savannah.append(this.createGame());
    main.append(this.savannah);
    this.startBg = window.getComputedStyle(this.game, null).getPropertyValue('background-position-y');
  }

  createGame() {
    this.game = createElement({ tag: 'section', class: 'savannah__game' });
    this.hearts = createElement({ tag: 'div', class: 'savannah__game-heart' });
    for (let i = 0; i < this.countHearts; i += 1) {
      const img = createElement({ tag: 'div', class: 'savannah__game-heart-img' });
      this.hearts.append(img);
    }
    const cancel = createElement({ tag: 'div', class: 'savannah__game-cancel', id: 'cancel' });
    const sound = createElement({ tag: 'div', class: 'savannah__game-sound', id: 'sound' });
    const wrap = createElement({ tag: 'div', class: 'savannah__game-wrapper' });
    wrap.append(cancel);
    wrap.append(sound);
    const control = createElement({ tag: 'div', class: 'savannah__game-control' });
    control.append(wrap);
    control.append(this.hearts);
    this.game.append(control);
    this.game.append(this.createField());
    this.game.append(this.createCountdown());

    this.ship = createElement({ tag: 'div', class: 'savannah__game-ship' });
    this.game.append(this.ship);
    return this.game;
  }

  createLanguageSelect() {
    this.start = document.getElementById('startScreen');
    const select = createElement({ tag: 'select', class: 'game__select-options', id: 'selectLang' });
    const en = createElement({ tag: 'option', class: 'game__select-options-item', content: 'EN' });
    const ru = createElement({ tag: 'option', class: 'game__select-options-item', content: 'RU' });
    select.append(en);
    select.append(ru);
    this.start.append(select);
  }

  createField() {
    this.field = createElement({ tag: 'div', class: 'savannah__game-field' });
    this.top = createElement({ tag: 'div', class: 'savannah__game-question' });
    this.field.append(this.top);

    this.options = createElement({ tag: 'div', class: 'savannah__game-wrap', id: 'savOptions' });
    const OPTIONS = 4;
    for (let i = 1; i <= OPTIONS; i += 1) {
      const answer = createElement({ tag: 'button', class: 'savannah__game-answer', id: `savAnswer${i}` });
      this.options.append(answer);
    }
    this.field.append(this.options);
    this.bottom = createElement({ tag: 'div', class: 'savannah__game-question' });
    this.field.append(this.bottom);
    return this.field;
  }

  createCountdown() {
    this.countdown = createElement({ tag: 'div', class: 'savannah__timer' });
    this.time = createElement({ tag: 'span', class: 'savannah__timer-time', content: '3' });
    this.countdown.append(this.time);

    const context = 'Для быстрого ответа можно использовать клавиши 1, 2, 3, 4';
    const text = createElement({
      tag: 'p', class: 'savannah__timer-text', id: 'savText', content: context,
    });
    this.countdown.append(text);

    const key = createElement({ tag: 'img', class: 'savannah__timer-key' });
    key.setAttribute('alt', '');
    key.src = './img/keyboard.png';
    this.countdown.append(key);
    return this.countdown;
  }

  getStart() {
    this.savannah.classList.add('show');
    document.getElementById('gameOptions').classList.add('hide');
    this.game.classList.add('show-flex');
    setTimeout(() => { this.time.innerHTML = 2; }, 1000);
    setTimeout(() => { this.time.innerHTML = 1; }, 2000);
  }

  getStartRound() {
    this.countdown.classList.add('hide');
    this.field.classList.add('show-flex');
  }

  startNextRound(gameWords, attempt, words) {
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

    this.checkSide(words, attempt);
  }

  checkSide(words, attempt) {
    const rand = Math.floor(Math.random() * 2);
    if (rand) {
      if (this.lang === 'EN') {
        this.moveWordFromTop(words[attempt].word);
      } else {
        this.moveWordFromTop(words[attempt].wordTranslate);
      }
    } else if (this.lang === 'EN') {
      this.moveWordFromBottom(words[attempt].word);
    } else {
      this.moveWordFromBottom(words[attempt].wordTranslate);
    }
  }

  moveWordFromTop(word) {
    this.top = createElement({ tag: 'div', class: 'savannah__game-question', content: word });
    this.bottom = createElement({ tag: 'div' });
    this.field.prepend(this.top);
    this.field.append(this.bottom);
    this.top.classList.add('move-from-top');
  }

  moveWordFromBottom(word) {
    this.bottom = createElement({ tag: 'div', class: 'savannah__game-question', content: word });
    this.top = createElement({ tag: 'div' });
    this.field.prepend(this.top);
    this.field.append(this.bottom);
    this.bottom.innerHTML = word;
    this.bottom.classList.add('move-from-bottom');
  }

  nextWord(countHeart) {
    const MAX_HEART = 5;
    if (countHeart < MAX_HEART) {
      this.hearts.children[countHeart].classList.add('heart-empty');
    }
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
    const MAX_HEART = 5;
    if (countHeart < MAX_HEART) {
      this.hearts.children[countHeart].classList.add('heart-empty');
    }
  }

  endGame() {
    this.top.remove();
    this.bottom.remove();
    this.field.classList.remove('show-flex');
    this.countdown.classList.remove('hide');
    this.savannah.classList.remove('show');
  }

  newGame() {
    document.getElementById('startScreen').classList.remove('hide');
    document.getElementById('gameOptions').classList.remove('hide');
    this.time.innerHTML = '3';
    this.ship.style.height = `${this.SHIP_HIGHT}px`;
    this.ship.style.width = `${this.SHIP_HIGHT}px`;
    this.game.style.backgroundPositionY = this.startBg;
    Array.from(this.hearts.children).forEach((item) => {
      item.classList.remove('heart-empty');
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
