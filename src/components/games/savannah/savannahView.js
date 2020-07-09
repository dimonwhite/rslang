import { createElement } from '../../../utils';

export default class SavannahView {
  constructor() {
    this.countHearts = 5;
    this.SHIP_HIGHT = 35;
    this.BG_HIGHT = 3500;
    this.speed = 7;
    this.lang = 'EN';
  }

  renderHTML() {
    this.main = document.getElementById('main');
    document.getElementById('gameOptions').classList.add('show');
    document.getElementById('closePopup').innerHTML = 'Close Game';
    this.createGameOptions();
    this.savannah = createElement({ tag: 'section', class: 'savannah', id: 'savannah' });
    this.savannah.append(this.createGame());
    this.main.append(this.savannah);
    this.startBg = window.getComputedStyle(this.game, null).getPropertyValue('background-position-y');
  }

  createGame() {
    this.game = createElement({ tag: 'section', class: 'savannah__game' });
    const cancel = createElement({ tag: 'div', class: 'savannah__game-cancel', id: 'cancel' });
    cancel.href = '#/';
    const sound = createElement({ tag: 'div', class: 'savannah__game-sound', id: 'sound' });
    const wrap = createElement({ tag: 'div', class: 'savannah__game-wrapper' });
    wrap.append(cancel);
    wrap.append(sound);
    this.control = createElement({ tag: 'div', class: 'savannah__game-control' });
    this.control.append(wrap);
    this.createHearts();
    this.game.append(this.control);
    this.game.append(this.createField());
    this.game.append(this.createCountdown());

    this.ship = createElement({ tag: 'div', class: 'savannah__game-ship' });
    this.game.append(this.ship);
    return this.game;
  }

  createHearts() {
    if (this.hearts) this.hearts.innerHTML = '';
    this.hearts = createElement({ tag: 'div', class: 'savannah__game-heart' });
    for (let i = 0; i < this.countHearts; i += 1) {
      const img = createElement({ tag: 'div', class: 'savannah__game-heart-img' });
      this.hearts.append(img);
    }
    this.control.append(this.hearts);
  }

  createGameOptions() {
    this.start = document.getElementById('startScreen');
    this.createOptions('Выбор языка:', ['EN', 'RU'], 'selectLang');
    this.createOptions('Скорость:', ['easy', 'normal', 'hard'], 'selectSpeed');
    this.createOptions('Жизни:', ['easy', 'normal', 'hard'], 'selectHearts');
    const ALL_PAGES = 30;
    const pages = new Array(ALL_PAGES).fill('').map((item, index) => index + 1);
    this.createOptions('Страница:', pages, 'selectPage');
    this.learnedWords = createElement({ tag: 'button', class: 'savannah-start__btn', content: 'Выученные слова' });
    this.learnedWords.classList.add('active-learned');
    this.start.append(this.learnedWords);
  }

  createOptions(content, options, id) {
    const wrap = createElement({ tag: 'div', class: 'game__select' });
    const selectText = createElement({
      tag: 'span', class: 'game__select-text', id: `text${id}`, content,
    });
    const select = createElement({ tag: 'select', class: 'game__select-options', id });
    for (let i = 0; i < options.length; i += 1) {
      const option = createElement({ tag: 'option', class: 'game__select-options-item', content: options[i] });
      select.append(option);
    }
    wrap.append(selectText);
    wrap.append(select);
    this.start.append(wrap);
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

    const key = createElement({ tag: 'div', class: 'savannah__timer-key' });
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

  startNextRound({ gameWords, attempt, words }) {
    if (this.top) this.top.remove();
    if (this.bottom) this.bottom.remove();

    const WORDS = 4;
    this.getRandomIndexes(WORDS);
    Array.from(this.options.children).forEach((item, index) => {
      const word = gameWords[attempt][this.randIndexes[index]];
      item.innerHTML = `${index + 1}. ${word}`;
      item.className = 'savannah__game-answer';
      if (this.randIndexes[index] === 0) {
        item.setAttribute('data-answer', 'correct');
      } else {
        item.setAttribute('data-answer', 'incorr');
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
    this.top.style.animationDuration = `${this.speed}s`;
  }

  moveWordFromBottom(word) {
    this.bottom = createElement({ tag: 'div', class: 'savannah__game-question', content: word });
    this.top = createElement({ tag: 'div' });
    this.field.prepend(this.top);
    this.field.append(this.bottom);
    this.bottom.innerHTML = word;
    this.bottom.classList.add('move-from-bottom');
    this.bottom.style.animationDuration = `${this.speed}s`;
  }

  nextWord(countHeart, answer) {
    if (countHeart < this.countHearts && !answer) {
      this.hearts.children[countHeart].classList.add('heart-empty');
    }
    if (this.top.classList.length > 1) {
      this.top.innerHTML = '';
      const matrix = window.getComputedStyle(this.top).getPropertyValue('transform');
      this.top.classList.remove('move-from-top');
      this.top.style.transform = matrix;
      this.top.classList.add('move-out-top');
      this.top.style.animationDuration = '1.5s';
    } else {
      this.bottom.innerHTML = '';
      const matrix = window.getComputedStyle(this.bottom).getPropertyValue('transform');
      this.bottom.classList.remove('move-from-bottom');
      this.bottom.style.transform = matrix;
      this.bottom.classList.add('move-out-bottom');
      this.bottom.style.animationDuration = '1.5s';
    }
  }

  getCorrectlyAnswer(delta) {
    if (this.top.classList.length > 1) {
      this.top.innerHTML = '';
      const matrix = window.getComputedStyle(this.top).getPropertyValue('transform');
      this.top.classList.remove('move-from-top');
      this.top.style.transform = matrix;
      this.top.classList.add('move-to-ship-top');
      this.top.style.animationDuration = '1.5s';
    } else {
      this.bottom.innerHTML = '';
      const matrix = window.getComputedStyle(this.bottom).getPropertyValue('transform');
      this.bottom.classList.remove('move-from-bottom');
      this.bottom.style.transform = matrix;
      this.bottom.classList.add('move-to-ship-bottom');
      this.bottom.style.animationDuration = '1.5s';
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

  getIncorrectlyAnswer(countHeart) {
    if (this.top.classList.length > 1) {
      this.top.innerHTML = '';
      const matrix = window.getComputedStyle(this.top).getPropertyValue('transform');
      this.top.classList.remove('move-from-top');
      this.top.style.transform = matrix;
      this.top.classList.add('move-out-top');
      this.top.style.animationDuration = '1.5s';
    } else {
      this.bottom.innerHTML = '';
      const matrix = window.getComputedStyle(this.bottom).getPropertyValue('transform');
      this.bottom.classList.remove('move-from-bottom');
      this.bottom.style.transform = matrix;
      this.bottom.classList.add('move-out-bottom');
      this.bottom.style.animationDuration = '1.5s';
    }
    if (countHeart < this.countHearts) {
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

  cancel() {
    this.main.className = 'main';
    const cancel = createElement({ tag: 'a' });
    cancel.href = '#/';
    cancel.click();
  }

  setAnswer(result, target) {
    if (result === 'correct') {
      Array.from(this.options.children).forEach((item) => {
        if (target !== item) item.classList.add('answer-dark');
      });
      target.classList.add('answer-correct');
    } else if (result === 'mistake') {
      Array.from(this.options.children).forEach((item) => {
        if (target !== item && item.dataset.answer === 'incorr') {
          item.classList.add('answer-dark');
        }
        if (item.dataset.answer === 'correct') {
          item.classList.add('answer-auto');
        }
      });
      target.classList.add('answer-incorrect');
    } else {
      Array.from(this.options.children).forEach((item) => {
        if (item.dataset.answer === 'correct') {
          item.classList.add('answer-auto');
        } else {
          item.classList.add('answer-dark');
        }
      });
    }
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

  getRandomIndexes(count) {
    this.randIndexes = [];
    while (this.randIndexes.length < count) {
      const rand = Math.floor(Math.random() * count);
      if (!this.randIndexes.includes(rand)) {
        this.randIndexes.push(rand);
      }
    }
  }

  selectLearnedWords() {
    this.learnedWords.classList.add('active-learned');
    return -1;
  }
}
