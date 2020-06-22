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
    this.nav = document.getElementById('nav');
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
    this.parseHash();
    const PageClass = this.pages[this.urlArray.shift()];
    if (PageClass) {
      this.mainSection.innerHTML = '';
      this.mainSection.className = 'main';
      document.body.className = 'body';
      document.body.removeAttribute('style');
      this.currentPage = new PageClass();
      this.currentPage.create(...this.urlArray);
      this.changeActiveLink();
    }
  }

  parseHash() {
    const url = this.hash.replace('#/', '');
    this.urlArray = url ? url.split('/') : ['main'];
  }

  changeActiveLink() {
    this.nav.querySelectorAll('.nav__list-item.active').forEach((listItem) => {
      listItem.classList.remove('active');
    });
    const activeLink = this.nav.querySelector(`[href="/${this.hash || '#/'}"]`);
    activeLink.parentNode.classList.add('active');
  }
}
