import emptyImg from '@/assets/img/blank.jpg';
import Card from '@/components/games/speakit/Card';
import { urlGitHub } from '@/constants';
import { createElement, getSvg } from '../../../utils';

export default class SpeakitView {
  constructor() {
    this.main = document.getElementById('main');
    this.audio = new Audio();
  }

  renderHTML() {
    this.createElements();
    this.appendElements();
    this.main.append(this.game);
  }

  createElements() {
    this.game = createElement({ tag: 'section', class: 'game' });
    this.img = createElement({ tag: 'img', class: 'game__img' });
    this.img.src = emptyImg;
    this.translation = createElement({ tag: 'div', class: 'game__translation' });
    this.gameWord = createElement({ tag: 'div', class: 'game__word' });
    this.wordList = createElement({ tag: 'div', class: 'wordList' });
    this.btnsBlock = createElement({ tag: 'div', class: 'game__btns' });
    this.newGame = createElement({
      tag: 'button',
      class: 'btn btn-circle',
      content: `${getSvg('repeat')}Новая игра`,
    });
    this.startBtn = createElement({ tag: 'button', class: 'btn  btn-circle start', content: 'Start' });
    this.result = createElement({ tag: 'button', class: 'btn  btn-circle', content: 'Result' });
    this.scoreBlock = createElement({ tag: 'div', class: 'score' });
    this.topBlock = createElement({ tag: 'div', class: 'topBlock' });
    this.close = createElement({ tag: 'a', class: 'close', content: getSvg('close') });
    this.close.setAttribute('href', '#/');
  }

  appendElements() {
    this.optionsWrap = this.main.querySelector('.game__options');
    this.optionsWrap.append(this.result);
    this.btnsBlock.append(this.startBtn);
    this.topBlock.append(this.scoreBlock, this.newGame, this.close);
    this.game.append(
      this.topBlock, this.img, this.translation,
      this.gameWord, this.wordList, this.btnsBlock,
    );
  }

  clearWordList() {
    this.wordList.innerHTML = '';
  }

  createWords(words) {
    words.forEach((item, key) => {
      const card = new Card(item, key);
      this.wordList.append(card.create());
    });
  }

  editInfo(word) {
    const image = `${urlGitHub}${word.image.replace('files/', '')}`;
    this.translation.textContent = word.translation;
    this.img.src = image;
  }

  playAudio(word) {
    this.audio.src = `${urlGitHub}${word.audio.replace('files/', '')}`;
    this.audio.play();
  }

  dropScore() {
    this.img.src = emptyImg;
    this.translation.textContent = '';
    this.gameWord.textContent = '';
    this.wordList.querySelectorAll('.wordList__item.active').forEach((item) => {
      item.classList.remove('active');
    });
    this.scoreBlock.innerHTML = '';
  }

  stop() {
    this.startBtn.classList.remove('active');
    this.startBtn.innerText = 'Start';
    this.game.classList.remove('active');
  }

  start() {
    this.startBtn.classList.add('active');
    this.startBtn.innerText = 'Stop';
    this.game.classList.add('active');
  }

  displayWord(e) {
    const i = e.resultIndex;
    this.gameWord.textContent = e.results[i][0].transcript;
  }

  successCard(word, id) {
    const card = this.wordList.querySelector(`.wordList__item[data-id="${id}"]`);
    card.classList.add('active');
    this.scoreBlock.append(SpeakitView.createStar());
    this.editInfo(word);
    this.gameWord.textContent = word.word;
  }

  static createStar() {
    const svg = `
      <svg class="svg_icon">
        <use xlink:href="sprite.svg#alien"></use>
      </svg>
    `;
    return createElement({ tag: 'div', class: 'star', content: svg });
  }
}
