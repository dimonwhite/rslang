import { createElement } from '@/utils';

export default class SavannahView {
  constructor() {
    this.countHearts = 5;
    this.SHIP_HIGHT = 60;
    this.speed = 7;
    this.lang = 'EN';
  }

  renderHTML() {
    this.main = document.getElementById('main');
    const options = document.getElementById('gameOptions');
    if (options) {
      options.classList.add('show');
    }
    this.createGameOptions();
    this.savannah = createElement({ tag: 'section', class: 'savannah', id: 'savannah' });
    this.savannah.append(this.createGame());
    this.main.append(this.savannah);
    this.setSettings();
  }

  initView() {
    document.body.className = 'body show-game show-game-fix hide-control';
    this.startScreen = document.getElementById('startScreen');
    this.startScreen.classList.add('game__startScreen-fix');
  }

  createControl() {
    document.querySelector('.game__select-text').classList.add('savannah__select-text');
    document.querySelector('.game__select-options').classList.add('savannah__select-options');
    this.selectPage = document.getElementById('selectPage');
    this.selectPage.classList.add('game__select-options-page');
    document.getElementById('wrapPage').classList.add('game__select-wrap');
    document.body.classList.remove('hide-control');
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
    if (this.start) {
      this.gameSettings = createElement({ tag: 'div', class: 'savannah__settings' });
      this.gameSettings.append(document.getElementById('gameOptions'));
      this.gameSettings.append(this.createOptions('Выбор языка:', ['EN', 'RU'], 'selectLang'));
      this.gameSettings.append(this.createOptions('Скорость:', ['easy', 'normal', 'hard'], 'selectSpeed'));
      this.gameSettings.append(this.createOptions('Жизни:', ['easy', 'normal', 'hard'], 'selectHearts'));
      this.start.append(this.gameSettings);
      const ALL_PAGES = 30;
      const pages = new Array(ALL_PAGES).fill('').map((item, index) => index + 1);
      this.start.append(this.createOptions('Страница:', pages, 'selectPage', 'wrapPage'));
      this.learnedWords = createElement({ tag: 'button', class: 'savannah-start__words', content: 'Выученные слова' });
      const wrap = createElement({ tag: 'div', class: 'savannah__wrap-level' });
      wrap.append(document.getElementById('wrapPage'));
      wrap.append(document.querySelector('.levels'));
      this.wrap.append(this.learnedWords);
      this.start.append(wrap);
    }
  }

  createOptions(content, options, id, idSelect) {
    this.wrap = createElement({ tag: 'div', class: 'game__select', id: idSelect });
    const selectText = createElement({
      tag: 'span', class: 'savannah__select-text', id: `text${id}`, content,
    });
    const select = createElement({ tag: 'select', class: 'savannah__select-options', id });
    if (options.length === 3) select.classList.add('select-width');
    for (let i = 0; i < options.length; i += 1) {
      const option = createElement({ tag: 'option', class: 'game__select-options-item', content: options[i] });
      select.append(option);
    }
    this.wrap.append(selectText);
    this.wrap.append(select);
    return this.wrap;
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
    if (this.savannah) this.savannah.classList.add('show');
    const options = document.getElementById('gameOptions');
    if (options) options.classList.add('hide');
    if (this.game) this.game.classList.add('show-flex');
    setTimeout(() => { this.time.innerHTML = 2; }, 1000);
    setTimeout(() => { this.time.innerHTML = 1; }, 2000);
  }

  getStartRound() {
    if (this.coundown) this.countdown.classList.add('hide');
    if (this.field) this.field.classList.add('show-flex');
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
    this.game.style.backgroundPosition = `0% ${100 - delta}%`;
    setTimeout(() => {
      this.ship.style.height = `${Math.floor(this.SHIP_HIGHT * ((delta / 100) + 1))}px`;
      this.ship.style.width = `${Math.floor(this.SHIP_HIGHT * ((delta / 100) + 1))}px`;
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
    this.learnedWords.classList.remove('active-learned');
    document.getElementById('startScreen').classList.remove('hide');
    document.getElementById('gameOptions').classList.remove('hide');
    this.time.innerHTML = '3';
    this.ship.style.height = `${this.SHIP_HIGHT}px`;
    this.ship.style.width = `${this.SHIP_HIGHT}px`;
    this.game.style.backgroundPosition = '0% 100%';
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
    document.querySelector('input:checked').checked = false;
    return -1;
  }

  setSettings() {
    this.setLevel();
    document.getElementById('selectCount').value = this.settings.words;
    document.getElementById('selectPage').value = this.settings.page;
    document.getElementById('selectSpeed').value = this.settings.speed;
    document.getElementById('selectHearts').value = this.settings.hearts;
    document.getElementById('selectLang').value = this.settings.lang;
    if (this.settings.sound) {
      document.getElementById('sound').classList.remove('sound-mute');
    } else {
      document.getElementById('sound').classList.add('sound-mute');
    }
  }

  setLevel() {
    if (this.settings.lvl === -1) {
      this.learnedWords.classList.add('active-learned');
      const radio = document.querySelector('input:checked');
      if (radio) radio.checked = false;
    } else {
      document.querySelectorAll('.radio__input')[this.settings.lvl].checked = true;
    }
  }
}
