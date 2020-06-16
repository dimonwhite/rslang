import './assets/scss/main.scss';
import header from './assets/components/header/header';
import User from './assets/components/user/user';

window.addEventListener('load', () => {
  header(new User());
});

function importAll(r) {
  return r.keys().map(r);
}
importAll(require.context('./assets/img/', false, /\.svg$/));
