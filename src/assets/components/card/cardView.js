export default class CardView {
  constructor() {
    this.card = document.getElementById('main');
  }

  renderHTML() {
    this.card.innerHTML = '';
    const card = document.createElement('h2');
    card.innerHTML = 'card';
    this.card.append(card);
  }
}
