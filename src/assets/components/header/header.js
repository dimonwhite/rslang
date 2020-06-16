import Games from '../games/games';

function eventNav() {
  new Games().create('savannah');
}

export default function header() {
  const btn = document.getElementById('headerBtn');
  btn.addEventListener('click', (e) => {
    btn.classList.toggle('header__click');
    document.getElementById('nav').classList.toggle('nav__show');
    e.stopPropagation();
  });

  const nav = document.getElementById('nav');
  nav.addEventListener('click', eventNav);
}
