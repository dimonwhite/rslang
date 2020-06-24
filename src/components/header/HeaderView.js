export default class HeaderView {
  constructor() {
    this.nav = document.getElementById('nav');
    this.btn = document.getElementById('headerBtn');
  }

  toggleShowNav() {
    this.btn.classList.toggle('header__btn-active');
    this.nav.classList.toggle('nav-show');
  }

  closeNav() {
    this.btn.classList.remove('header__btn-active');
    this.nav.classList.remove('nav-show');
  }

  // eslint-disable-next-line class-methods-use-this
  toggleShowSubmenu(showBtn) {
    showBtn.classList.toggle('active');
    showBtn.nextElementSibling.toggle(600);
  }
}
