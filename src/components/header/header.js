import Games from '../games/games';
import DictionaryController from '../dictionary/dictionaryController';
import CardController from '../card/cardController';
import StatisticsController from '../statistics/statisticsController';

export default class Header {
  constructor(user) {
    this.user = user;
    this.mainPage = document.getElementById('main');
  }

  createEvent() {
    const btn = document.getElementById('headerBtn');
    const nav = document.getElementById('nav');
    nav.addEventListener('click', this.eventNav.bind(this));

    btn.addEventListener('click', (e) => {
      btn.classList.toggle('header__click');
      nav.classList.toggle('nav__show');
      e.stopPropagation();
    });
  }

  eventNav({ target }) {
    if (target.tagName === 'LI') {
      if (!target.classList.contains('decoration')) {
        this.mainPage.innerHTML = '';
        this.createClass(target.dataset.name);
      }

      const list = document.getElementById('list');
      Array.from(list.children).forEach((el) => el.classList.remove('decoration'));
      target.classList.add('decoration');
      document.getElementById('nav').classList.toggle('nav__show');
    }
  }

  createClass(name) {
    switch (name) {
      case 'main':
        document.body.className = 'body show-main';
        new CardController(this.user).create();
        break;
      case 'statistics':
        document.body.className = 'body show-statistics';
        new StatisticsController(this.user).create();
        break;
      case 'dictionary':
        document.body.className = 'body show-dictionary';
        new DictionaryController(this.user).create();
        break;
      default:
        document.body.className = 'body show-game';
        new Games().create(name);
        break;
    }
  }
}
