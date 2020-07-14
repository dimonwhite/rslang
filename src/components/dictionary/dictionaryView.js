import { urlGitHub, blackGradient } from '@/constants';
import { createElement } from '@/utils';

export default class DictionaryView {
  constructor() {
    this.main = document.getElementById('main');
    this.audio = new Audio();
    this.card = null;
    this.settingsBlock = document.getElementById('settings');
  }

  renderHTML() {
    this.main.innerHTML = '';
    this.settingsBlock.classList.remove('settings-card');
    this.dictionary = createElement({ tag: 'div', class: 'dictionary-content' });
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

  static contentListItem(word, settings) {
    let content = '<div class="card-list__left">';

    if (settings.dictSound) {
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

    if (settings.dictImg) {
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
    this.background = createElement({ tag: 'div', class: 'dictionary-background' });
    this.background.style.background = blackGradient;
    this.dictionary.append(this.background);
  }

  createCard({ word, wordId, settings }) {
    const contentHead = DictionaryView.createCardHead(word, settings);
    const contentBody = DictionaryView.createCardBody(word, settings);

    const prev = `<div class="card-dictionary__prev">
      <svg class="card-dictionary__prev-icon" title="Предыдущее слово">
        <use xlink:href="sprite.svg#dictionary-prev"></use>
      </svg>
    </div>`;

    const next = `<div class="card-dictionary__next">
      <svg class="card-dictionary__next-icon" title="Следующее слово">
        <use xlink:href="sprite.svg#dictionary-next"></use>
      </svg>
    </div>`;

    const content = `
      ${word.prev ? prev : ''}
      ${word.next ? next : ''}
      <div class="card-dictionary__content-wrap">
        <svg class="card-dictionary__close close-icon">
          <use xlink:href="sprite.svg#close"></use>
        </svg>
        ${contentHead}
        ${contentBody}
        <div class="card-dictionary__bot">
          <div class="card-dictionary__state">
            <svg class="card-dictionary__state-item card-dictionary__study-icon" data-type="study" title="Изучемое слово">
              <use xlink:href="sprite.svg#dictionary-filter-study"></use>
            </svg>
            <svg class="card-dictionary__state-item card-dictionary__difficult-icon" data-type="difficult" title="Сложное слово">
              <use xlink:href="sprite.svg#dictionary-filter-difficult"></use>
            </svg>
            <svg class="card-dictionary__state-item card-dictionary__remove-icon" data-type="remove" title="Удаленное слово">
              <use xlink:href="sprite.svg#dictionary-filter-remove"></use>
            </svg>
          </div>
        </div>
      </div>
    `;

    this.cardId = wordId;
    this.card = createElement({ tag: 'div', class: 'card-dictionary', content });
    this.card.setAttribute('data-id', wordId);

    this.card.querySelector(`.card-dictionary__${word.optional.state}-icon`).classList.add('card-dictionary__state-item_active');

    this.dictionary.append(this.card);
  }

  static createCardHead(word, settings) {
    let content = '<div class="card-dictionary__head">';
    if (settings.dictImg) {
      content += `<div class="card-dictionary__head-left">
        <div class="card-dictionary__img" style="background: url(${urlGitHub}${word.optional.image.replace('files/', '')}) center center no-repeat;background-size: cover;"></div>
      </div>`;
    }
    content += '<div class="card-dictionary__head-right">';
    if (settings.dictSound) {
      content += `<div class="card-dictionary__sound">
        <svg class="card-dictionary__sound-icon" title="Прослушать">
          <use xlink:href="sprite.svg#dictionary-sound"></use>
        </svg>
      </div>`;
    }
    content += `<div class="card-dictionary__text">
        <div class="card-dictionary__word">${word.optional.word}</div>
        <div class="card-dictionary__translation">${word.optional.wordTranslate}</div>`;
    if (settings.dictTranscr) {
      content += `<div class="card-dictionary__transcription">${word.optional.transcription}</div>`;
    }
    content += `</div>
      </div>
    </div>`;

    return content;
  }

  static createCardBody(word, settings) {
    let content = '';

    content += '<div class="card-dictionary__body">';
    if (settings.dictExample) {
      content += `<div class="card-dictionary__example">${word.optional.textExample}</div>`;
    }
    if (settings.dictMeaning) {
      content += `<div class="card-dictionary__meaning">${word.optional.textMeaning}</div>`;
    }

    content += `<div class="card-dictionary__progress">
      <div class="card-dictionary__repeat">Повторейний: ${word.optional.count}</div>
      <div class="card-dictionary__last-time">Давность: ${word.lastTimeText} назад</div>
      <div class="card-dictionary__next-time">Повтор: ${word.nextTimeText}</div>`;

    if (settings.dictProgress) {
      const contentProgress = DictionaryView.createProgress(word.optional.rating);
      content += `<div class="card-dictionary__rating">Прогресс изучения: ${contentProgress}</div>`;
    }

    content += `</div>
    </div>`;

    return content;
  }

  static createProgress(rating) {
    const countPoints = 5;

    let content = `<div class="card-dictionary__rating-points" rating="${rating}">`;
    for (let i = 0; i < countPoints; i += 1) {
      if (i < rating) {
        content += '<div class="card-dictionary__rating-point card-dictionary__rating-point_active"></div>';
      } else {
        content += '<div class="card-dictionary__rating-point"></div>';
      }
    }
    content += '</div>';

    return content;
  }

  createSettings(arr) {
    const content = `<h2 class="settings__title">Настройки</h2>
    <div class="setting-block">
      <div class="setting-block__title">Настройки словаря</div>

      <div class="setting-block__list">
        <div class="setting-block__item">
          <input type="checkbox" id="dictExample" class="settings__checkbox" />
          <label for="dictExample">Пример</label>
        </div>
        <div class="setting-block__item">
          <input type="checkbox" id="dictMeaning" class="settings__checkbox" />
          <label for="dictMeaning">Значение</label>
        </div>
        <div class="setting-block__item">
          <input type="checkbox" id="dictTranscr" class="settings__checkbox" />
          <label for="dictTranscr">Транскрипция</label>
        </div>
        <div class="setting-block__item">
          <input type="checkbox" id="dictSound" class="settings__checkbox" />
          <label for="dictSound">Звучание</label>
        </div>
        <div class="setting-block__item">
          <input type="checkbox" id="dictImg" class="settings__checkbox" />
          <label for="dictImg">Картинка</label>
        </div>
        <div class="setting-block__item">
          <input type="checkbox" id="dictProgress" class="settings__checkbox" />
          <label for="dictProgress">Прогресс</label>
        </div>
      </div>
    </div>`;

    this.settingsBlock.innerHTML = content;

    Object.keys(arr).map((key) => {
      const value = arr[key];

      if (value) {
        document.getElementById(key).checked = true;
      }

      return value;
    });
  }
}
