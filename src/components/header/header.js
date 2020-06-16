import Games from '../games/games';
import DictionaryController from '../dictionary/dictionaryController';
import CardController from '../card/cardController';
import StatisticsController from '../statistics/statisticsController';

export default class Header {
  constructor(user) {
    this.user = user;
  }

  createEvent() {
    const btn = document.getElementById('headerBtn');
    btn.addEventListener('click', (e) => {
      btn.classList.toggle('header__click');
      document.getElementById('nav').classList.toggle('nav__show');
      e.stopPropagation();
    });

    const nav = document.getElementById('nav');
    nav.addEventListener('click', this.eventNav.bind(this));
  }

  eventNav(e) {
    if (e.target.tagName === 'LI') {
      const mainPage = document.getElementById('main');
      mainPage.innerHTML = '';
      if (!e.target.classList.contains('decoration')) {
        switch (e.target.id) {
          case 'liMain':
            document.getElementById('statistics').classList.remove('show');
            document.getElementById('dictionary').classList.remove('show');
            mainPage.classList.remove('hide');
            new CardController(this.user).create();
            break;
          case 'liStatistics':
            mainPage.classList.add('hide');
            document.getElementById('dictionary').classList.remove('show');
            new StatisticsController(this.user).create();
            document.getElementById('statistics').classList.add('show');
            break;
          case 'liDictionary':
            mainPage.classList.add('hide');
            document.getElementById('statistics').classList.remove('show');
            document.getElementById('dictionary').classList.add('show');
            new DictionaryController(this.user).create();
            break;
          case e.target.id:
            document.getElementById('settings').classList.add('hide');
            document.getElementById('footer').classList.add('hide');
            document.getElementById('statistics').classList.remove('show');
            document.getElementById('dictionary').classList.remove('show');
            document.getElementById('header').classList.add('hide');
            mainPage.classList.remove('hide');
            new Games().create(e.target.id);
            break;
          default:
            break;
        }
      }

      const list = document.getElementById('list');
      Array.from(list.children).forEach((el) => el.classList.remove('decoration'));
      e.target.classList.add('decoration');
      document.getElementById('nav').classList.toggle('nav__show');
    }
  }
}
