import { createElement, getSvg } from '@/utils';
import { urlGitHub } from '@/constants';

export default class FillwordsView {
  constructor() {
    this.main = document.getElementById('main');
    this.audio = new Audio();
  }

  renderHtml() {
    this.levelsWrap = document.querySelector('.levels__wrap');
    this.createElements();
    this.appendElements();
  }

  createElements() {
    this.gameBlock = createElement({ tag: 'div', class: 'gameBlock' });
    this.wordsList = createElement({ tag: 'div', class: 'wordsList' });
    this.btnResult = createElement({ tag: 'button', class: 'btn btn-circle', content: 'Результаты' });
    this.bottomBlock = createElement({ tag: 'div', class: 'bottomBlock' });
    this.createTopBlockElements();
    this.createBoard();
    this.createHintImg();
    this.createPreloader();
  }

  createTopBlockElements() {
    this.topBlock = createElement({ tag: 'div', class: 'topBlock' });
    this.btnUserWords = createElement({ tag: 'button', class: 'btn btn-circle btnUserWords active', content: 'Свои слова' });
    this.newGame = createElement({
      tag: 'button',
      class: 'btn btn-circle',
      content: `${getSvg('repeat')}Новая игра`,
    });
    this.close = createElement({ tag: 'a', class: 'close', content: getSvg('close') });
    this.close.setAttribute('href', '#/games');
    this.topBlock.append(this.btnUserWords, this.newGame, this.close);
  }

  createBoard() {
    this.boardWrap = createElement({ tag: 'div', class: 'board' });
    const countSquare = this.lengthBoard * this.heigthBoard;
    for (let i = 0; i < countSquare; i += 1) {
      this.boardWrap.append(createElement({ tag: 'div', class: 'board__square' }));
    }
  }

  createHintImg() {
    this.popupHint = createElement({ tag: 'div', class: 'popupHint' });
    this.popupHintImg = createElement({ tag: 'img', class: 'popupHint__img' });
    this.popupHint.append(this.popupHintImg);
  }

  createPreloader() {
    this.preloaderWrap = createElement({
      tag: 'div', class: 'preloader', content: `
        <div class="preloader__letter">F</div>
        <div class="preloader__letter">I</div>
        <div class="preloader__letter">L</div>
        <div class="preloader__letter">L</div>
        <div class="preloader__letter">W</div>
        <div class="preloader__letter">O</div>
        <div class="preloader__letter">R</div>
        <div class="preloader__letter">D</div>
        <div class="preloader__letter">S</div>
      `,
    });
  }

  appendElements() {
    this.bottomBlock.append(this.btnResult);
    this.gameBlock.append(this.wordsList, this.boardWrap);
    this.main.append(
      this.topBlock, this.gameBlock, this.bottomBlock, this.popupHint, this.preloaderWrap,
    );
  }

  fillBoard(letters) {
    this.boardWrap.childNodes.forEach((item, i) => {
      item.classList.remove('success', 'active');
      item.innerHTML = `<span class="board__square--letter">${letters[i].toUpperCase()}</span>`;
    });
  }

  createWords(words) {
    this.wordsList.innerHTML = '';
    words.forEach((word, i) => {
      const wordElement = createElement({ tag: 'div', class: 'wordsList__item opacity' });
      const wordText = createElement({ tag: 'div', class: 'wordsList__item--text', content: word.wordTranslate });
      const dontKnowBtn = createElement({ tag: 'button', class: 'wordsList__item--dontKnow', content: 'Я не знаю' });
      const hint = createElement({ tag: 'button', class: 'wordsList__item--hint', content: '?' });
      wordElement.append(hint, wordText, dontKnowBtn);
      this.wordsList.append(wordElement);
      setTimeout(() => {
        wordElement.classList.remove('opacity');
      }, 30 * i);
    });
  }

  // eslint-disable-next-line class-methods-use-this
  cancelSelected(letters) {
    letters.forEach((letter) => {
      letter.classList.remove('active');
    });
  }

  // eslint-disable-next-line class-methods-use-this
  successSelected(letters) {
    letters.forEach((letter) => {
      letter.classList.remove('active');
      letter.classList.add('success');
    });
  }

  successWord(i) {
    this.wordsList.childNodes[i].classList.add('active');
  }

  playAudio(word) {
    this.audio.src = `${urlGitHub}${word.audio.replace('files/', '')}`;
    this.audio.play();
  }

  openHintPopup(word) {
    this.popupHintImg.src = `${urlGitHub}${word.image.replace('files/', '')}`;
    this.popupHintImg.onload = () => {
      this.popupHint.classList.add('active');
    };
  }

  markSquares(squareLetters) {
    squareLetters.forEach((index) => {
      this.boardWrap.childNodes[index].classList.add('success');
    });
  }

  addClassAllLetters() {
    this.boardWrap.childNodes.forEach((letter) => {
      letter.classList.add('active');
    });
  }

  activateBtnUserWords() {
    this.btnUserWords.classList.add('active');
    const checkedLevel = this.levelsWrap.querySelector('.radio__input:checked');
    if (checkedLevel) {
      checkedLevel.checked = false;
    }
  }

  deactivateBtnUserWords() {
    this.btnUserWords.classList.remove('active');
  }

  activateLevel(level) {
    const checkedLevel = this.levelsWrap.querySelector(`.radio__input[value="${level}"]`);
    if (checkedLevel) {
      checkedLevel.checked = true;
    }
  }

  showPreloader() {
    this.preloaderWrap.classList.add('active');
  }

  hidePreloader() {
    this.preloaderWrap.classList.remove('active');
  }
}
