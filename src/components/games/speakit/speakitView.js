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
    this.newGame = createElement('button', 'btn', false, 'New game');
    this.startBtn = createElement('button', 'btn start', false, 'Start');
    this.result = createElement('button', 'btn', false, 'Result');
  }

  appendElements() {
    this.btnsBlock.append(this.newGame, this.startBtn, this.result);
    this.game.append(this.img, this.translation, this.gameWord, this.wordList, this.btnsBlock);
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
}
