export default class GamesPageController {
  constructor() {
    this.message = 'Список игр';
  }

  create() {
    document.querySelector('main').innerHTML = `
      <h1 style="color: white;">${this.message}</h1>
    `;
  }
}
