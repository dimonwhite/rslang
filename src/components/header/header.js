export default class Header {
  constructor() {
    this.nav = document.getElementById('nav');
    this.body = document.body;
    this.btn = document.getElementById('headerBtn');
    this.openedNav = false;
  }

  createEvent() {
    this.btn.addEventListener('click', () => {
      this.btn.classList.toggle('header__btn-active');
      this.nav.classList.toggle('nav-show');
      this.openedNav = !this.openedNav;
    });

    this.nav.addEventListener('click', (e) => {
      this.clickLink(e);
    });

    document.addEventListener('click', (e) => {
      if (this.isClickOutside(e)) {
        this.closeNav();
      }
    });
  }

  isClickOutside(e) {
    return this.openedNav && !this.nav.contains(e.target) && !this.btn.contains(e.target);
  }

  clickLink(e) {
    if (e.target.closest('.nav__list-link')) {
      this.closeNav();
    }
  }

  closeNav() {
    this.btn.classList.remove('header__btn-active');
    this.nav.classList.remove('nav-show');
    this.openedNav = false;
  }
}
