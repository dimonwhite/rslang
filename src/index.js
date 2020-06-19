import './scss/main.scss';
import Header from './components/header/header';
import User from './components/user/user';
import CardController from './components/card/cardController';

window.addEventListener('load', () => {
  const user = new User();
  document.body.addEventListener('click', (e) => {
    const nav = document.getElementById('nav');
    if (nav.classList.length > 1 && !(e.target.tagName === 'NAV' || !e.target.tagName === 'LI')) {
      nav.classList.remove('nav__show');
    }
  });

  document.getElementById('startBtn').addEventListener('click', () => {
    document.body.className = 'body show-main';
    document.getElementById('startPage').classList.add('hide');
    document.getElementById('navPage').classList.add('decoration');
    new Header(user).createEvent();
    new CardController(user).create();
  });
});

// function importAll(r) {
//   return r.keys().map(r);
// }
// importAll(require.context('./assets/img/', false, /\.svg$/));
