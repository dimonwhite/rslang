import './scss/main.scss';
import Header from './components/header/header';
import User from './components/user/user';
import CardController from './components/card/cardController';

window.addEventListener('load', () => {
  document.body.addEventListener('click', (e) => {
    const nav = document.getElementById('nav');
    if (nav.classList.length > 1 && !(e.target.tagName === 'NAV' || !e.target.tagName === 'LI')) {
      nav.classList.remove('nav__show');
    }
  });

  document.getElementById('startPage').addEventListener('click', () => {
    document.getElementById('startPage').classList.add('hide');
    document.getElementById('header').classList.remove('hide');
    document.getElementById('settings').classList.remove('hide');
    document.getElementById('footer').classList.remove('hide');
    document.getElementById('main').classList.remove('hide');
    document.getElementById('liMain').classList.add('decoration');
    new Header(new User()).createEvent();
    new CardController().create();
  });
});

function importAll(r) {
  return r.keys().map(r);
}
importAll(require.context('./assets/img/', false, /\.svg$/));
