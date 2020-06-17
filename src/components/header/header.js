import Games from '../games/games';
import DictionaryController from '../dictionary/dictionaryController';
import CardController from '../card/cardController';
import StatisticsController from '../statistics/statisticsController';

export default class Header {
  constructor(user) {
    this.user = user;
    this.mainPage = document.getElementById('main');
    this.nav = document.getElementById('nav');
    this.body = document.body;
  }

  createEvent() {
    const btn = document.getElementById('headerBtn');
    this.nav.addEventListener('click', this.eventNav.bind(this));

    btn.addEventListener('click', (e) => {
      btn.classList.toggle('header__click');
      this.nav.classList.toggle('nav__show');
      e.stopPropagation();
    });
  }

  eventNav({ target }) {
    if (target.tagName === 'LI' && !target.classList.contains('decoration')) {
      this.mainPage.innerHTML = '';
      this.createClass(target.dataset.name);
      const list = document.getElementById('list');
      Array.from(list.children).forEach((el) => el.classList.remove('decoration'));
      target.classList.add('decoration');
      this.nav.classList.toggle('nav__show');
    }
  }

  createClass(name) {
    switch (name) {
      case 'main':
        this.body.className = 'body show-main';
        new CardController(this.user).create();
        break;
      case 'statistics':
        this.body.className = 'body show-statistics';
        new StatisticsController(this.user).create();
        break;
      case 'dictionary':
        this.body.className = 'body show-dictionary';
        new DictionaryController(this.user).create();
        break;
      default:
        this.body.className = 'body show-game';
        new Games().create(name);
        break;
    }
  }
}
