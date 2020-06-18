import emptyImg from '@/assets/img/blank.jpg';
import Card from '@/components/games/speakit/Card';
import { urlGitHub } from '@/constants';
import { createElement } from '../../../utils';

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
    this.game = createElement('section', 'game');
    this.img = createElement('img', 'game__img');
    this.img.src = emptyImg;
    this.translation = createElement('div', 'game__translation');
    this.gameWord = createElement('div', 'game__word');
    this.wordList = createElement('div', 'wordList');
    this.btnsBlock = createElement('div', 'game__btns');
    this.newGame = createElement('button', 'btn btn-circle', false, 'New game');
    this.startBtn = createElement('button', 'btn  btn-circle start', false, 'Start');
    this.result = createElement('button', 'btn  btn-circle', false, 'Result');
    this.scoreBlock = createElement('div', 'score');
  }

  appendElements() {
    this.btnsBlock.append(this.newGame, this.startBtn, this.result);
    this.game.append(
      this.scoreBlock, this.img, this.translation,
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
    const star = document.createElement('div');
    star.classList.add('star');
    star.innerHTML = `
      <svg class="svg_icon">
        <use xlink:href="sprite.svg#star"></use>
      </svg>
    `;
    return star;
  }
}
