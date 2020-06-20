import DictionaryView from './dictionaryView';
import DictionaryModel from './dictionaryModel';

export default class DictionaryController {
  constructor(user) {
    this.model = new DictionaryModel(user);
    this.view = new DictionaryView();
    this.test = 'test';
    this.page = 0;
    this.load = false;
    this.loadFullData = false;
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

    this.view.list.addEventListener('click', (e) => {
      this.clickList(e);
    });

    window.addEventListener('scroll', () => {
      const windowBottom = window.pageYOffset + document.documentElement.clientHeight;
      if (windowBottom >= this.listBottomLimit) {
        this.paginationList();
      }
    });
  }

  clickList(e) {
    const card = e.target.closest('.card-list');
    const word = this.model.getWord(card.dataset.id);

    if (e.target.closest('.card-list__sound')) {
      this.playAudio(word);
      return true;
    }

    this.createCard(word, card.dataset.id);
    return false;
  }

  playAudio(word) {
    this.view.playAudio(word);
  }

  createCard(word, wordId) {
    this.view.createCard(word, wordId);
    this.initCard();
  }

  initCard() {
    this.view.card.addEventListener('click', (e) => {
      this.clickCard(e);
    });
  }

  clickCard(e) {
    const card = e.target.closest('.card');
    const word = this.model.getWord(card.dataset.id);

    if (e.target.closest('.card__sound-icon')) {
      this.playAudio(word);
      return true;
    }

    if (e.target.closest('.close-icon')) {
      this.view.card.remove();
      return true;
    }

    return false;
  }

  createList(filter) {
    const list = this.model.getList(this.page, filter);
    if (list) {
      list.then((data) => {
        if (data) {
          this.view.createList(data);
          this.listBottomLimit = this.listTopLimit + this.view.list.getBoundingClientRect().height;
          this.page += 1;
        } else {
          this.loadFullData = true;
        }
      });
    }
  }

  paginationList() {
    if (this.load === false && !this.loadFullData) {
      this.load = true;
      this.createList();
      this.load = false;
    }
  }

  clickFilter(e) {
    console.log('clickFilter');
    this.page = 0;
    const filter = e.target.closest('.filters__item');
    console.log(filter);
    const filterData = filter.dataset.filter;
    console.log(filterData);
    if (filterData) {
      const filterActive = this.view.filtersWrap.querySelector('.filters__item_active');
      if (filterActive) {
        filterActive.classList.remove('filters__item_active');
        filter.classList.add('filters__item_active');
      }
      this.view.clearList();
      this.createList(filterData);
    }
  }
}
