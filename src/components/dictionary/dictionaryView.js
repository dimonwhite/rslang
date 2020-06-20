import { urlGitHub } from '@/constants';
import Card from './Card';
import { createElement, createElementAttr } from '../../utils';

export default class DictionaryView {
  constructor() {
    this.main = document.getElementById('main');
    this.audio = new Audio();
  }

  renderHTML() {
    this.createElements();
    this.main.innerHTML = '';
    this.main.append(this.body);
  }

  createElements() {
    this.form = createElement({ tag: 'form', class: 'form-search' });
    this.form.setAttribute('enctype', 'text/plain');
    this.form.setAttribute('method', 'POST');
    this.formInput = createElement({ tag: 'input', class: 'form-search__input' });
    this.formInput.setAttribute('type', 'text');
    this.formInput.setAttribute('name', 'search');
    this.formInput.setAttribute('placeholder', 'Найти');

    this.form.append(this.formInput);

    this.filtersWrap = createElement({ tag: 'div', class: 'filters' });

    this.filterAll = createElementAttr({ tag: 'div', class: 'filters__item filters__all filters__item_active', content: 'Все' });
    this.filterAll.dataset.filter = 'all';
    this.filterStudy = createElementAttr({ tag: 'div', class: 'filters__item filters__study', content: '<img class="filters__item-icon" src="src/assets/img/dictionary-filter-study.svg" title="Изучемые слова">' });
    this.filterStudy.dataset.filter = 'study';
    this.filterDifficult = createElementAttr({ tag: 'div', class: 'filters__item filters__difficult', content: '<img class="filters__item-icon" src="src/assets/img/dictionary-filter-difficult.svg" title="Сложные слова">' });
    this.filterDifficult.dataset.filter = 'difficult';
    this.filterRemote = createElementAttr({ tag: 'div', class: 'filters__item filters__remove', content: '<img class="filters__item-icon" src="src/assets/img/dictionary-filter-remove.svg" title="Удаленные слова">' });
    this.filterRemote.dataset.filter = 'remove';

    this.filtersWrap.append(this.filterAll);
    this.filtersWrap.append(this.filterStudy);
    this.filtersWrap.append(this.filterDifficult);
    this.filtersWrap.append(this.filterRemote);

    this.head = createElement({ tag: 'div', class: 'head-dictionary' });
    this.head.append(this.form);
    this.head.append(this.filtersWrap);

    this.list = createElement({ tag: 'div', class: 'list-dictionary' });

    this.body = createElement({ tag: 'div', class: 'dictionary' });
    this.body.append(this.head);
    this.body.append(this.list);
  }

  createList(data) {
    data.forEach((item) => {
      const card = new Card(item, item.id);
      this.list.append(card.create());
    });
  }

  clearList() {
    this.list.innerHTML = '';
  }

  playAudio(word) {
    this.audio.src = `${urlGitHub}${word.audio.replace('files/', '')}`;
    this.audio.play();
  }

  createCard(word, wordId) {
    const content = `
      <svg class="card__close close-icon" width="36" height="36" viewBox="0 0 36 36" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path class="close-icon__path" d="M34.9001 7.60001L27.9001 0.600009C27.3001 9.14931e-06 26.3 9.14931e-06 25.7 0.600009L19 7.30001C18.4 7.90001 17.4001 7.90001 16.8001 7.30001L10.1 0.600009C9.50002 9.14931e-06 8.50007 9.14931e-06 7.90007 0.600009L0.900073 7.60001C0.300073 8.20001 0.300073 9.20001 0.900073 9.80001L7.60002 16.5C8.20002 17.1 8.20002 18.1 7.60002 18.7L0.900073 25.4C0.300073 26 0.300073 27 0.900073 27.6L7.90007 34.6C8.50007 35.2 9.50002 35.2 10.1 34.6L16.8001 27.9C17.4001 27.3 18.4 27.3 19 27.9L25.7 34.6C26.3 35.2 27.3001 35.2 27.9001 34.6L34.9001 27.6C35.5001 27 35.5001 26 34.9001 25.4L28.2 18.7C27.6 18.1 27.6 17.1 28.2 16.5L34.9001 9.80001C35.5001 9.10001 35.5001 8.20001 34.9001 7.60001Z" fill="#A586FF"/>
      </svg>
      <div class="card__head">
        <div class="card__head-left">
          <div class="card__img" style="background: url(${urlGitHub}${word.image.replace('files/', '')}) center center no-repeat;background-size: cover;"></div>
        </div>
        <div class="card__head-right">
          <div class="card__sound">
            <img class="card__sound-icon" src="src/assets/img/dictionary-sound.svg">
          </div>
          <div class="card__text">
            <div class="card__word">${word.word}</div>
            <div class="card__translation">${word.translation}</div>
          </div>
        </div>
      </div>
      <div class="card__body">
        <div class="card__example">${word.textExample}</div>
        <div class="card__meaning">${word.textMeaning}</div>
      </div>
      <div class="card__bot">
        <div class="card__state">
          <img class="card__state-item card__study-icon" src="src/assets/img/dictionary-filter-study.svg" title="Изучемое слово">
          <img class="card__state-item card__difficult-icon" src="src/assets/img/dictionary-filter-difficult.svg" title="Сложное слово">
          <img class="card__state-item card__remove-icon" src="src/assets/img/dictionary-filter-remove.svg" title="Удаленное слово">
        </div>
      </div>
    `;

    this.cardId = wordId;
    this.card = createElementAttr({ tag: 'div', class: 'card', content });
    this.card.setAttribute('data-id', wordId);

    this.card.querySelector(`.card__${word.state}-icon`).classList.add('card__state-item_active');

    this.main.append(this.card);
  }
}
