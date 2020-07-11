<<<<<<< HEAD
import './scss/main.scss';
import Router from '@/components/router/Router';
import Header from './components/header/header';
import HttpClient from './components/httpclient/HttpClient';
import Authorization from './components/authorization/authorizationController';

require('./prototype.settings');

function importAll(r) {
  return r.keys().map(r);
}

importAll(require.context('./assets/img/', false, /\.svg$/));

window.addEventListener('DOMContentLoaded', () => {
  const authorization = new Authorization();
  const http = new HttpClient(authorization.unauthorizedListener);

  const router = new Router(http);
  router.init();

  document.body.addEventListener('click', (e) => {
    const nav = document.getElementById('nav');
    if (nav.classList.length > 1 && !(e.target.tagName === 'NAV' || !e.target.tagName === 'LI')) {
      nav.classList.remove('nav__show');
    }
  });

  new Header().createEvent();
  authorization.create(http);
});
=======
import './scss/main.scss';
import Router from '@/components/router/Router';
import { importAll } from '@/utils';
import Header from './components/header/header';
import HttpClient from './components/httpclient/HttpClient';
import Authorization from './components/authorization/authorizationController';

require('./prototype.settings');

importAll(require.context('./assets/img/', false, /\.svg$/));

window.addEventListener('DOMContentLoaded', () => {
  const authorization = new Authorization();
  const http = new HttpClient(authorization.unauthorizedListener);

  const router = new Router(http);
  router.init();

  document.body.addEventListener('click', (e) => {
    const nav = document.getElementById('nav');
    if (nav.classList.length > 1 && !(e.target.tagName === 'NAV' || !e.target.tagName === 'LI')) {
      nav.classList.remove('nav__show');
    }
  });

  new Header().createEvent();
  authorization.create(http);
});
>>>>>>> 6c06c15379edfc7f7717e502e7ff6ea7607697d4
