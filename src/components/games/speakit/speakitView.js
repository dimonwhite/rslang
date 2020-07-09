import Choices from 'choices.js';
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
    this.levelsWrap = document.querySelector('#levels');
    this.createElements();
    this.appendElements();
    this.main.append(this.game, this.loader);
    // eslint-disable-next-line no-new
    new Choices('.game__select-options', {
      searchEnabled: false,
      searchChoices: false,
      itemSelectText: '',
    });
  }

  createElements() {
    this.game = createElement({ tag: 'section', class: 'game' });
    this.gameInfo = createElement({ tag: 'div', class: 'game__info' });
    this.imgBlock = createElement({ tag: 'div', class: 'game__imgBlock' });
    this.img = createElement({ tag: 'img', class: 'game__img' });
    this.mic = createElement({ tag: 'div', class: 'game__mic', content: getSvg('mic') });
    this.img.src = emptyImg;
    this.translation = createElement({ tag: 'div', class: 'game__translation' });
    this.gameWord = createElement({ tag: 'div', class: 'game__word' });
    this.gameText = createElement({ tag: 'div', class: 'game__text' });
    this.wordList = createElement({ tag: 'div', class: 'wordList' });
    this.btnsBlock = createElement({ tag: 'div', class: 'game__btns' });
    this.startBtn = createElement({ tag: 'button', class: 'btn  btn-circle start', content: 'Start' });
    this.result = createElement({ tag: 'button', class: 'btn  btn-circle', content: 'Result' });
    this.topBlock = createElement({ tag: 'div', class: 'topBlock' });
    this.createTopBlockElements();
    this.createPreloader();
  }

  createTopBlockElements() {
    this.btnUserWords = createElement({ tag: 'button', class: 'btn btn-circle btnUserWords active', content: 'Свои слова' });
    this.scoreBlock = createElement({ tag: 'div', class: 'score' });
    this.newGame = createElement({
      tag: 'button',
      class: 'btn btn-circle',
      content: `${getSvg('repeat')}Новая игра`,
    });
    this.close = createElement({ tag: 'a', class: 'close', content: getSvg('close') });
    this.close.setAttribute('href', '#/games');
    this.topBlock.append(this.scoreBlock, this.btnUserWords, this.newGame, this.close);
  }

  createPreloader() {
    this.loader = createElement({ tag: 'div', class: 'loader' });
    this.micWrapLoader = createElement({ tag: 'div', class: 'micWrap', content: getSvg('mic') });
    this.loader.append(this.micWrapLoader);
  }

  appendElements() {
    this.imgBlock.append(this.img, this.mic);
    this.gameText.append(this.translation, this.gameWord);
    this.gameInfo.append(this.imgBlock, this.gameText);
    this.optionsWrap = this.main.querySelector('.game__options');
    this.optionsWrap.append(this.result);
    this.btnsBlock.append(this.startBtn);
    this.game.append(
      this.topBlock, this.gameInfo, this.wordList, this.btnsBlock,
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
    this.translation.textContent = word.translation || word.wordTranslate;
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
    this.wordList.querySelectorAll('.wordList__item').forEach((item) => {
      item.classList.remove('active', 'success');
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
    card.classList.add('success');
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

  uncheckedLevels() {
    this.checkedLevel = document.querySelector('.levels__wrap input:checked');
    if (this.checkedLevel) {
      this.checkedLevel.checked = false;
    }
  }

  addClassBtnUserWords() {
    this.btnUserWords.classList.add('active');
  }

  removeClassBtnUserWords() {
    this.btnUserWords.classList.remove('active');
  }

  checkFirstLevel() {
    this.firstLevel = document.querySelector('.levels__wrap .radio:first-child input');
    this.firstLevel.checked = true;
  }

  addLoadedClass() {
    this.main.classList.add('loaded');
  }

  removeLoadedClass() {
    this.main.classList.remove('loaded');
  }
}
