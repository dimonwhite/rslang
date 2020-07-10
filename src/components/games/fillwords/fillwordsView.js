import { createElement } from '@/utils';

export default class FillwordsView {
  constructor() {
    this.main = document.getElementById('main');
  }

  renderHtml() {
    this.createElements();
    this.appendElements();
  }

  createElements() {
    this.gameBlock = createElement({ tag: 'div', class: 'gameBlock' });
    this.wordsList = createElement({ tag: 'div', class: 'wordsList' });
    this.btnResultCloseGame = createElement({ tag: 'a', class: 'btn', content: 'Выход' });
    this.btnResultCloseGame.href = '/#/games';
    this.createBoard();
  }

  createBoard() {
    this.boardWrap = createElement({ tag: 'div', class: 'board' });
    const countSquare = this.lengthBoard * this.heigthBoard;
    for (let i = 0; i < countSquare; i += 1) {
      this.boardWrap.append(createElement({ tag: 'div', class: 'board__square' }));
    }
  }

  appendElements() {
    this.gameBlock.append(this.boardWrap, this.wordsList);
    this.main.append(this.gameBlock);
    document.querySelector('.resultPopup__btns').prepend(this.btnResultCloseGame);
  }

  fillBoard(letters) {
    this.boardWrap.childNodes.forEach((item, i) => {
      item.classList.add('opacity');
      item.classList.remove('success');
      item.textContent = letters[i];
      setTimeout(() => {
        item.classList.remove('opacity');
      }, 3 * i);
    });
  }

  createWords(words) {
    this.wordsList.innerHTML = '';
    words.forEach((word, i) => {
      const wordElement = createElement({ tag: 'div', class: 'wordsList__item opacity', content: word.wordTranslate });
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
}
