import DictionaryView from './dictionaryView';
import DictionaryModel from './dictionaryModel';

export default class DictionaryController {
  constructor(user) {
    this.model = new DictionaryModel(user);
    this.view = new DictionaryView();
    this.filter = this.model.state.all;
    this.strSearch = '';
    this.page = 0;
    this.isLoadFullData = false;
  }

  create() {
    this.view.renderHTML();
    this.listTopLimit = this.view.list.getBoundingClientRect().top;
    this.createList();
    this.init();
  }

  init() {
    this.view.filtersWrap.addEventListener('click', (e) => {
      this.clickFilter(e);
    });

    this.view.form.addEventListener('submit', (e) => {
      e.preventDefault();
    });

    this.view.formInput.addEventListener('input', () => {
      this.search(this.view.formInput.value);
    });

    this.view.list.addEventListener('click', (e) => {
      this.clickList(e);
    });

    this.scroll = this.listenerScroll.bind(this);
    window.addEventListener('scroll', this.scroll);
  }

  listenerScroll() {
    const windowBottom = window.pageYOffset + document.documentElement.clientHeight;
    if (windowBottom >= this.listBottomLimit) {
      this.paginationList();
    }
  }

  removeListeners() {
    window.removeEventListener('scroll', this.scroll);
  }

  search(str) {
    this.page = 0;
    this.isLoadFullData = false;
    this.strSearch = str;
    this.view.clearList();
    this.createList(this.filter, this.strSearch);
  }

  clickList(e) {
    const card = e.target.closest('.card-list');
    const word = this.model.getWord(card.dataset.id);

    if (e.target.closest('.card-list__sound')) {
      this.playAudio(word);
      return;
    }

    this.createCard(word, card.dataset.id);
  }

  playAudio(word) {
    this.view.playAudio(word);
  }

  createCard(word, wordId) {
    this.view.createCardBackground();
    this.view.createCard(word, wordId);
    this.initCard();
  }

  initCard() {
    this.view.card.addEventListener('click', (e) => {
      this.clickCard(e);
    });
  }

  clickCard(e) {
    if (e.target.closest('.card__sound-icon')) {
      const word = this.model.getWord(this.view.card.dataset.id);
      this.playAudio(word);
      return;
    }

    if (e.target.closest('.close-icon')) {
      this.view.card.remove();
      this.view.cardBackground.remove();
      return;
    }

    if (e.target.closest('.card__state')) {
      this.stateCard(e);
    }
  }

  stateCard(e) {
    const state = e.target.closest('.card__state-item');
    const stateActive = this.view.card.querySelector('.card__state-item_active');
    if (stateActive) {
      stateActive.classList.remove('card__state-item_active');
    }
    state.classList.add('card__state-item_active');

    const word = this.model.getWord(this.view.card.dataset.id);
    this.view.updateListItem(word);
  }

  createList(filter, strSearch) {
    const list = this.model.getList({
      page: this.page,
      filter,
      strSearch,
    });
    if (list) {
      list.then((data) => {
        if (data) {
          this.view.createList(data);
          this.listBottomLimit = this.listTopLimit + this.view.list.getBoundingClientRect().height;
          this.page += 1;
        } else {
          this.isLoadFullData = true;
        }
      });
    }
  }

  paginationList() {
    if (!this.isLoadFullData) {
      this.createList(this.filter, this.strSearch);
    }
  }

  clickFilter(e) {
    this.page = 0;
    this.isLoadFullData = false;
    const filter = e.target.closest('.filters__item');
    if (filter) {
      const filterData = filter.dataset.filter;
      const filterActive = this.view.filtersWrap.querySelector('.filters__item_active');
      if (filterActive) {
        filterActive.classList.remove('filters__item_active');
      }
      filter.classList.add('filters__item_active');

      this.filter = filterData;
      this.view.clearList();
      this.createList(this.filter, this.strSearch);
    }
  }
}
