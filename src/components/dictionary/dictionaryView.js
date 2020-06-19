import Card from './Card';
import { createElement, createElementAttr } from '../../utils';

export default class DictionaryView {
  constructor() {
    this.dictionary = document.getElementById('dictionary');
    this.test = 'createList';
  }

  renderHTML() {
    this.createElements();
    this.dictionary.append(this.head);
    this.dictionary.append(this.list);
  }

  createElements() {
    this.form = createElement('form', 'form-search', 'form-search');
    this.formInput = createElementAttr('input', 'form-search__input', false, false, 'type', 'text');
    this.formInput.setAttribute('name', 'search');
    this.formInput.setAttribute('placeholder', 'Найти');

    this.form.append(this.formInput);

    this.filtersWrap = createElement('div', 'filters', 'filters');
    this.filterAll = createElementAttr('div', 'filters__item filters__all', false, 'Все', 'filter_data', 'all');
    this.filterStudy = createElementAttr('div', 'filters__item filters__study', false, '<img class="filters__item-icon" src="src/assets/img/dictionary-filter-study.svg">', 'filter_data', 'study');
    this.filterDifficult = createElementAttr('div', 'filters__item filters__difficult', false, '<img class="filters__item-icon" src="src/assets/img/dictionary-filter-difficult.svg">', 'filter_data', 'difficult');
    this.filterLearned = createElementAttr('div', 'filters__item filters__learned', false, '<img class="filters__item-icon" src="src/assets/img/dictionary-filter-learned.svg">', 'filter_data', 'learned');
    this.filterRemote = createElementAttr('div', 'filters__item filters__remote', false, 'remote', 'filter_data', 'remote');

    this.filtersWrap.append(this.filterAll);
    this.filtersWrap.append(this.filterStudy);
    this.filtersWrap.append(this.filterDifficult);
    this.filtersWrap.append(this.filterLearned);
    this.filtersWrap.append(this.filterRemote);

    this.head = createElement('div', 'head-dictionary');
    this.head.append(this.form);
    this.head.append(this.filtersWrap);

    this.list = createElement('div', 'list-dictionary');
  }

  createList(data) {
    data.forEach((item, key) => {
      const card = new Card(item, key);
      this.list.append(card.create());
    });
  }
}
