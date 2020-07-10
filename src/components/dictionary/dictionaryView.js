import { urlGitHub, blackGradient } from '@/constants';
import { createElement } from '@/utils';

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
    this.createForm();
    this.createFilters();

    this.head = createElement({ tag: 'div', class: 'head-dictionary' });
    this.head.append(this.form);
    this.head.append(this.filtersWrap);

    this.list = createElement({ tag: 'div', class: 'list-dictionary' });

    this.body = createElement({ tag: 'div', class: 'dictionary' });
    this.body.append(this.head);
    this.body.append(this.list);
  }

  createForm() {
    this.form = createElement({ tag: 'form', class: 'form-search' });
    this.form.setAttribute('enctype', 'text/plain');
    this.form.setAttribute('method', 'POST');
    this.formInput = createElement({ tag: 'input', class: 'form-search__input' });
    this.formInput.setAttribute('type', 'text');
    this.formInput.setAttribute('name', 'search');
    this.formInput.setAttribute('placeholder', 'Найти');

    this.form.append(this.formInput);
  }

  createFilters() {
    this.filtersWrap = createElement({ tag: 'div', class: 'filters' });

    this.filterAll = createElement({ tag: 'div', class: 'filters__item filters__all filters__item_active', content: 'Все' });
    this.filterAll.dataset.filter = 'all';

    this.filterStudy = createElement({
      tag: 'div',
      class: 'filters__item filters__study',
      content: '<svg class="filters__item-icon" title="Изучемое слово"><use xlink:href="sprite.svg#dictionary-filter-study"></use></svg>',
    });
    this.filterStudy.dataset.filter = 'study';

    this.filterDifficult = createElement({
      tag: 'div',
      class: 'filters__item filters__difficult',
      content: '<svg class="filters__item-icon" title="Сложные слова"><use xlink:href="sprite.svg#dictionary-filter-difficult"></use></svg>',
    });
    this.filterDifficult.dataset.filter = 'difficult';

    this.filterRemote = createElement({
      tag: 'div',
      class: 'filters__item filters__remove',
      content: '<svg class="filters__item-icon" title="Удаленные слова"><use xlink:href="sprite.svg#dictionary-filter-remove"></use></svg>',
    });
    this.filterRemote.dataset.filter = 'remove';

    this.filtersWrap.append(this.filterAll);
    this.filtersWrap.append(this.filterStudy);
    this.filtersWrap.append(this.filterDifficult);
    this.filtersWrap.append(this.filterRemote);
  }

  createList(data) {
    data.forEach((item) => {
      const content = `
        <div class="card-list__left">
          <div class="card-list__sound">
            <svg class="card-list__sound-icon" title="Прослушать">
              <use xlink:href="sprite.svg#dictionary-sound"></use>
            </svg>
          </div>
          <div class="card-list__text">
            <div class="card-list__word">${item.word}</div>
            <div class="card-list__translation">${item.translation}</div>
          </div>
        </div>
        <div class="card-list__right">
          <div class="card-list__img" style="background: url(${urlGitHub}${item.image.replace('files/', '')}) center center no-repeat;background-size: cover;"></div>
          <div class="card-list__state">
            <svg class="card-list__state-icon">
              <use xlink:href="sprite.svg#dictionary-filter-${item.state}"></use>
            </svg>
          </div>
        </div>
      `;

      const card = createElement({ tag: 'div', class: 'list-dictionary__item card-list', content });
      card.dataset.id = item.id;

      this.list.append(card);
    });
  }

  clearList() {
    this.list.innerHTML = '';
  }

  updateListItem(word) {
    const item = this.list.querySelector(`.card-list[data-id="${word.id}"]`);

    const content = `
        <div class="card-list__left">
          <div class="card-list__sound">
            <svg class="card-list__sound-icon" title="Прослушать">
              <use xlink:href="sprite.svg#dictionary-sound"></use>
            </svg>
          </div>
          <div class="card-list__text">
            <div class="card-list__word">${word.word}</div>
            <div class="card-list__translation">${word.translation}</div>
          </div>
        </div>
        <div class="card-list__right">
          <div class="card-list__img" style="background: url(${urlGitHub}${word.image.replace('files/', '')}) center center no-repeat;background-size: cover;"></div>
          <div class="card-list__state">
            <svg class="card-list__state-icon">
              <use xlink:href="sprite.svg#dictionary-filter-${word.state}"></use>
            </svg>
          </div>
        </div>
      `;

    item.innerHTML = content;
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
            <svg class="card__sound-icon" title="Прослушать">
              <use xlink:href="sprite.svg#dictionary-sound"></use>
            </svg>
          </div>
          <div class="card__text">
            <div class="card__word">${word.word}</div>
            <div class="card__translation">${word.translation}</div>
            <div class="card__transcription">${word.transcription}</div>
          </div>
        </div>
      </div>
      <div class="card__body">
        <div class="card__example">${word.textExample}</div>
        <div class="card__meaning">${word.textMeaning}</div>
        <div class="card__progress">
          <div class="card__rating">Прогресс изучения: ${word.rating}</div>
          <div class="card__repeat">Повторейний: ${word.count}</div>
          <div class="card__last-time">Давность: ${word.lastTimeText} назад</div>
          <div class="card__next-time">Повтор: через ${word.nextTimeText}</div>
        </div>
      </div>
      <div class="card__bot">
        <div class="card__state">
          <svg class="card__state-item card__study-icon" title="Изучемое слово">
            <use xlink:href="sprite.svg#dictionary-filter-study"></use>
          </svg>
          <svg class="card__state-item card__difficult-icon" title="Сложное слово">
            <use xlink:href="sprite.svg#dictionary-filter-difficult"></use>
          </svg>
          <svg class="card__state-item card__remove-icon" title="Удаленное слово">
            <use xlink:href="sprite.svg#dictionary-filter-remove"></use>
          </svg>
        </div>
      </div>
    `;

    this.cardId = wordId;
    this.card = createElement({ tag: 'div', class: 'card', content });
    this.card.setAttribute('data-id', wordId);

    this.card.querySelector(`.card__${word.state}-icon`).classList.add('card__state-item_active');

    this.main.append(this.card);
  }

  createCardBackground() {
    this.cardBackground = createElement({ tag: 'div', class: 'card-background' });
    this.cardBackground.style.background = blackGradient;
    this.main.append(this.cardBackground);
  }
}
