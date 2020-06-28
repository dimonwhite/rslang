import emptyImg from '@/assets/img/blank.jpg';

import SprintCard from '@/components/games/sprint/SprintCouple';

import { urlGitHub } from '@/constants';
import { createElement } from '../../../utils';

export default class SprintView {
  constructor() {
    this.main = document.getElementById('main');
  }

  renderHTML() {
    this.createElements();
    this.appendElements();

    this.main.append(this.game);
    // this.getPreloader();
  }

  createElements() {
    this.preloader = createElement({ tag: 'div', class: 'game__sprint__preloader' });
    this.loader = createElement({ tag: 'div', class: 'game__sprint__loader' });
    this.loadCounter = createElement({ tag: 'div', class: 'game__sprint__loader__count' });
    this.game = createElement({ tag: 'section', class: 'game__sprint' });
    this.img = createElement({ tag: 'img', class: 'game__sprint__img' });
    this.currentWord = createElement({ tag: 'div', class: 'game__sprint__word' });
    this.currentTranslation = createElement({ tag: 'div', class: 'game__sprint__translation' });
    this.btnsBlock = createElement({ tag: 'div', class: 'game__sprint__btns' });
    this.arrowsBlock = createElement({ tag: 'div', class: 'game__sprint__btns' });
    this.btnChoiceTrue = createElement({ tag: 'button', class: 'btn btn-circle', content: 'True' });
    this.btnChoiceFalse = createElement({ tag: 'button', class: 'btn  btn-circle', content: 'False' });
    this.arrowChoiceTrue = createElement({ tag: 'div', class: 'arrowChoice', content: '←' });
    this.arrowChoiceFalse = createElement({ tag: 'div', class: 'arrowChoice', content: '→' });
    this.scoreBlock = createElement({ tag: 'div', class: 'game__sprint__score', content: 'Score: 0' });
    this.currentBonus = createElement({ tag: 'div', class: 'game__sprint__bonus__star', id: 'current_Bonus' });
    this.wordList = createElement({ tag: 'div', class: 'wordList' });
    this.timer = createElement({ tag: 'div', class: 'timer' });
    this.timer = createElement({ tag: 'p', class: 'game__sprint__time' });
    this.bonus = createElement({ tag: 'div', class: 'current__Bonus__item', content: '*' });
  }

  appendElements() {
    this.btnsBlock.append(this.btnChoiceTrue, this.timer, this.btnChoiceFalse);
    // this.preloader.append(this.loader);
    this.arrowsBlock.append(this.arrowChoiceTrue, this.arrowChoiceFalse);
    this.game.append(
      /* this.preloader, */ this.scoreBlock, this.currentBonus, this.currentWord,
      this.currentTranslation, this.btnsBlock, this.arrowsBlock,
    );
  }

  getPreloader() {
    this.preloader.append(this.loadCounter, this.loader);
    this.game.append(this.preloader);
    setTimeout(() => {
      console.log(this.preloader.classList);
      if (!this.preloader.classList.contains('hide__loader')) {
        this.preloader.classList.add('hide__loader');
      }
    }, 100000);
  }

  createWords(words) {
    words.forEach((item, key) => {
      const card = new SprintCard(item, key);
      this.wordList.append(card.create());
    });
  }

  getTrueCouple(trueword, truetranslate) {
    this.currentWord.textContent = `${trueword.word}`;
    this.currentTranslation.textContent = `${truetranslate.translation}`;
  }

  getFalseCouple(trueword, falsetranslate) {
    this.currentWord.textContent = `${trueword.word}`;
    this.currentTranslation.textContent = `${falsetranslate}`;
  }

  getScore(score) {
    this.scoreBlock.textContent = `Score: ${score}`;
  }

  getTime(howMinutes, howSecond) {
    this.timer.innerHTML = `${howMinutes} : ${howSecond}`;
  }

  getLoaderTime(timeItem) {
    this.loadCounter.innerHTML = `${timeItem}`;
  }

  getBonus() {
    const star = '<div id="game__sprint__bonus__star">*</div>';
    this.currentBonus.insertAdjacentHTML('beforeend', star);
  }

  clearBonus() {
    while (this.currentBonus.firstChild) {
      this.currentBonus.removeChild(this.currentBonus.firstChild);
    }
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
    this.scoreBlock.append(SprintView.createStar());
    this.editInfo(word);
    this.gameWord.textContent = word.word;
  }

  static createStar() {
    const svg = `
      <svg class="svg_icon">
        <use xlink:href="sprite.svg#star"></use>
      </svg>
    `;
    return createElement({ tag: 'div', class: 'star', content: svg });
  }
}
