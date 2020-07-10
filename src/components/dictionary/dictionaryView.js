import { urlGitHub, blackGradient } from '@/constants';
import { createElement } from '@/utils';

export default class DictionaryView {
  constructor() {
    this.main = document.getElementById('main');
    this.audio = new Audio();
    this.card = null;
  }

  renderHTML() {
    this.main.innerHTML = '';
    this.dictionary = createElement({ tag: 'div', class: 'dictionary' });
    this.main.append(this.dictionary);
  }

  showEmptyMsg() {
    this.msg = createElement({ tag: 'div', class: 'dictionary__msg-empty', content: 'Нет слов' });
    this.dictionary.append(this.msg);
  }

  renderDictionary() {
    this.createElements();
  }

  createElements() {
    this.createForm();
    this.createFilters();

    this.head = createElement({ tag: 'div', class: 'head-dictionary' });
    this.head.append(this.form);
    this.head.append(this.filtersWrap);

    this.list = createElement({ tag: 'div', class: 'list-dictionary' });

    this.dictionary.append(this.head);
    this.dictionary.append(this.list);
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

  createList(data, settings) {
    data.forEach((item) => {
      const content = DictionaryView.contentListItem(item, settings);
      const card = createElement({ tag: 'div', class: 'list-dictionary__item card-list', content });
      card.dataset.id = item.wordId;

      this.list.append(card);
    });
  }

  clearList() {
    this.list.innerHTML = '';
  }

  updateListItem(word, settings) {
    const item = this.list.querySelector(`.card-list[data-id="${word.wordId}"]`);
    const content = DictionaryView.contentListItem(word, settings);
    item.innerHTML = content;
  }

  static contentListItem(word, settings) {
    let content = '<div class="card-list__left">';

    if (settings.sound) {
      content += `<div class="card-list__sound">
        <svg class="card-list__sound-icon" title="Прослушать">
          <use xlink:href="sprite.svg#dictionary-sound"></use>
        </svg>
      </div>`;
    }

    content += `<div class="card-list__text">
        <div class="card-list__word">${word.optional.word}</div>
        <div class="card-list__translation">${word.optional.wordTranslate}</div>
      </div>
    </div>
    <div class="card-list__right">`;

    if (settings.image) {
      content += `<div class="card-list__img" style="background: url(${urlGitHub}${word.optional.image.replace('files/', '')}) center center no-repeat;background-size: cover;"></div>`;
    }

    content += `<div class="card-list__state">
        <svg class="card-list__state-icon">
          <use xlink:href="sprite.svg#dictionary-filter-${word.optional.state}"></use>
        </svg>
      </div>
    </div>
    `;

    return content;
  }

  playAudio(word) {
    this.audio.src = `${urlGitHub}${word.optional.audio.replace('files/', '')}`;
    this.audio.play();
  }

  createBackground() {
    this.background = createElement({ tag: 'div', class: 'background' });
    this.background.style.background = blackGradient;
    this.dictionary.append(this.background);
  }

  createCard({ word, wordId, settings }) {
    let contentHead = '<div class="card__head">';
    if (settings.image) {
      contentHead += `<div class="card__head-left">
        <div class="card__img" style="background: url(${urlGitHub}${word.optional.image.replace('files/', '')}) center center no-repeat;background-size: cover;"></div>
      </div>`;
    }
    contentHead += '<div class="card__head-right">';
    if (settings.sound) {
      contentHead += `<div class="card__sound">
        <svg class="card__sound-icon" title="Прослушать">
          <use xlink:href="sprite.svg#dictionary-sound"></use>
        </svg>
      </div>`;
    }
    contentHead += `<div class="card__text">
        <div class="card__word">${word.optional.word}</div>
        <div class="card__translation">${word.optional.wordTranslate}</div>`;
    if (settings.transcription) {
      contentHead += `<div class="card__transcription">${word.optional.transcription}</div>`;
    }
    contentHead += `</div>
      </div>
    </div>`;

    /*-------------------------------------------------*/
    let contentBody = '';

    if (settings.example || settings.meaning || settings.progress) {
      contentBody += '<div class="card__body">';
      if (settings.example) {
        contentBody += `<div class="card__example">${word.optional.textExample}</div>`;
      }
      if (settings.meaning) {
        contentBody += `<div class="card__meaning">${word.optional.textMeaning}</div>`;
      }
      if (settings.progress) {
        contentBody += `<div class="card__progress">
          <div class="card__rating">Прогресс изучения: ${word.optional.rating}</div>
          <div class="card__repeat">Повторейний: ${word.optional.count}</div>
          <div class="card__last-time">Давность: ${word.lastTimeText} назад</div>
          <div class="card__next-time">Повтор: через ${word.nextTimeText}</div>
        </div>`;
      }
      contentBody += '</div>';
    }

    /*-------------------------------------------------*/

    const prev = `<div class="card__prev">
      <svg class="card__prev-icon" title="Предыдущее слово">
        <use xlink:href="sprite.svg#dictionary-prev"></use>
      </svg>
    </div>`;

    const next = `<div class="card__next">
      <svg class="card__next-icon" title="Следующее слово">
        <use xlink:href="sprite.svg#dictionary-next"></use>
      </svg>
    </div>`;

    /*-------------------------------------------------*/

    const content = `
      ${word.prev ? prev : ''}
      ${word.next ? next : ''}
      <div class="card__content-wrap">
        <svg class="card__close close-icon">
          <use xlink:href="sprite.svg#close"></use>
        </svg>
        ${contentHead}
        ${contentBody}
        <div class="card__bot">
          <div class="card__state">
            <svg class="card__state-item card__study-icon" data-type="study" title="Изучемое слово">
              <use xlink:href="sprite.svg#dictionary-filter-study"></use>
            </svg>
            <svg class="card__state-item card__difficult-icon" data-type="difficult" title="Сложное слово">
              <use xlink:href="sprite.svg#dictionary-filter-difficult"></use>
            </svg>
            <svg class="card__state-item card__remove-icon" data-type="remove" title="Удаленное слово">
              <use xlink:href="sprite.svg#dictionary-filter-remove"></use>
            </svg>
          </div>
        </div>
      </div>
    `;

    this.cardId = wordId;
    this.card = createElement({ tag: 'div', class: 'card', content });
    this.card.setAttribute('data-id', wordId);

    this.card.querySelector(`.card__${word.optional.state}-icon`).classList.add('card__state-item_active');

    this.dictionary.append(this.card);
  }
}
