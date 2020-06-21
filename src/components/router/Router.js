import Games from '../games/games';
import DictionaryController from '../dictionary/dictionaryController';
import CardController from '../card/cardController';
import StatisticsController from '../statistics/statisticsController';

export default class Router {
  constructor() {
    this.mainSection = document.querySelector('main');
    this.hash = window.location.hash;
    this.pages = {
      main: CardController,
      games: Games,
      dictionary: DictionaryController,
      statistics: StatisticsController,
    };
  }

  init() {
    this.changePage();
    window.addEventListener('hashchange', this.changeHash.bind(this));
  }

  changeHash() {
    this.hash = window.location.hash;
    this.changePage();
  }

  changePage() {
    this.mainSection.innerHTML = '';
    this.mainSection.className = 'main';
    document.body.className = 'body';
    document.body.removeAttribute('style');
    this.parseHash();
    this.currentPage = new this.pages[this.urlArray.shift()]();
    this.currentPage.create(...this.urlArray);
  }

  parseHash() {
    const url = this.hash.replace('#/', '');
    this.urlArray = url ? url.split('/') : ['main'];
  }
}
