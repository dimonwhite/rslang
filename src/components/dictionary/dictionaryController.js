import DictionaryView from './dictionaryView';
import DictionaryModel from './dictionaryModel';

export default class DictionaryController {
  constructor(http) {
    this.model = new DictionaryModel(http);
    this.view = new DictionaryView();
    this.filter = this.model.state.all;
    this.strSearch = '';
    this.page = 0;
    this.isLoadFullData = false;
    this.settings = {
      image: true,
      sound: true,
      transcription: true,
      example: true,
      meaning: true,
      progress: true,
    };
  }

  async create() {
    const dataWords = await this.model.getDataWords();
    console.log(dataWords);

    this.view.renderHTML();
    if (dataWords && dataWords.length > 0) {
      this.model.dataWords = dataWords;
      console.log(this.model.dataWords);

      this.view.renderDictionary();
      this.listTopLimit = this.view.list.getBoundingClientRect().top;
      this.createList();
      this.init();
    } else {
      this.view.showEmptyMsg();
    }
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
    document.body.classList.add('scroll-off');
  }

  createCard(word, wordId) {
    this.view.createBackground();
    this.view.createCard({ word, wordId, settings: this.settings });
    this.initCard();
  }

  initCard() {
    this.view.card.addEventListener('click', (e) => {
      this.clickCard(e);
    });

    this.view.background.addEventListener('click', () => {
      this.view.card.remove();
      this.view.background.remove();
      document.body.classList.remove('scroll-off');
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
      this.view.background.remove();
      document.body.classList.remove('scroll-off');
      return;
    }

    if (e.target.closest('.card__state')) {
      this.stateCard(e);
    }

    if (e.target.closest('.card__prev-icon')) {
      this.createPrevCard();
    }

    if (e.target.closest('.card__next-icon')) {
      this.createNextCard();
    }
  }

  createPrevCard() {
    const word = this.model.getWord(this.model.prev.wordId);
    this.view.card.remove();
    this.view.createCard({
      word,
      wordId: word.wordId,
      settings: this.settings,
    });
    this.initCard();
  }

  createNextCard() {
    const word = this.model.getWord(this.model.next.wordId);
    this.view.card.remove();
    this.view.createCard({
      word,
      wordId: word.wordId,
      settings: this.settings,
    });
    this.initCard();
  }

  async stateCard(e) {
    const state = e.target.closest('.card__state-item');
    const stateActive = this.view.card.querySelector('.card__state-item_active');
    const stateType = state.dataset.type;

    const updateState = await this.model.updateState(stateType);

    if (updateState) {
      if (stateActive) {
        stateActive.classList.remove('card__state-item_active');
      }
      state.classList.add('card__state-item_active');

      // обновление state
      this.view.updateListItem(updateState, this.settings);

      await this.model.getDataWords();
    }
  }

  createList(filter, strSearch) {
    const list = this.model.getList({
      page: this.page,
      filter,
      strSearch,
    });
    if (list) {
      console.log(list);

      this.view.createList(list, this.settings);
      this.listBottomLimit = this.listTopLimit + this.view.list.getBoundingClientRect().height;
      this.page += 1;
    } else {
      this.isLoadFullData = true;
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

  playAudio(word) {
    this.view.playAudio(word);
  }
}
