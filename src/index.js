import './scss/main.scss';
import Router from '@/components/router/Router';
import Header from './components/header/header';
// eslint-disable-next-line no-unused-vars
import HttpClient from './components/httpclient/HttpClient';

require('./prototype.settings');

function importAll(r) {
  return r.keys().map(r);
}

importAll(require.context('./assets/img/', false, /\.svg$/));

window.addEventListener('DOMContentLoaded', () => {
  const router = new Router();
  router.init();

  document.body.addEventListener('click', (e) => {
    const nav = document.getElementById('nav');
    if (nav.classList.length > 1 && !(e.target.tagName === 'NAV' || !e.target.tagName === 'LI')) {
      nav.classList.remove('nav__show');
    }
  });

  new Header().createEvent();
});
