import HeaderView from '@/components/header/HeaderView';

export default class Header {
  constructor() {
    this.openedNav = false;
    this.view = new HeaderView();
  }

  createEvent() {
    this.view.btn.addEventListener('click', () => {
      this.view.toggleShowNav();
      this.openedNav = !this.openedNav;
    });

    this.view.nav.addEventListener('click', (e) => {
      this.clickNav(e);
    });

    document.addEventListener('click', (e) => {
      if (this.isClickOutside(e)) {
        this.closeNav();
      }
      if (this.isClickOutsideSettings(e)) {
        this.view.closeSettings();
      }
    });

    this.view.settingsBtn.addEventListener('click', () => {
      this.view.toggleShowSettings();
    });
  }

  isClickOutside(e) {
    return this.openedNav && !this.view.nav.contains(e.target) && !this.view.btn.contains(e.target);
  }

  isClickOutsideSettings(e) {
    return !this.view.settings.contains(e.target) && !this.view.settingsBtn.contains(e.target);
  }

  clickNav(e) {
    if (e.target.closest('.nav__list-link')) {
      this.closeNav();
      return;
    }
    const showBtn = e.target.closest('.nav__list-open');
    if (showBtn) {
      this.view.toggleShowSubmenu(showBtn);
    }
  }

  closeNav() {
    this.view.closeNav();
    this.openedNav = false;
  }
}
