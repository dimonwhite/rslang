export default class SprintCard {
  constructor(card, key) {
    this.card = card;
    this.key = key;
  }

  create() {
    const {
      word, translation,
    } = this.card;
    const card = document.createElement('div');
    card.classList.add('couple__item');
    card.dataset.id = this.key;
    card.innerHTML = `
      <div class="wordList__item-text">
          <div class="wordList__item-title">${word}</div>
          <div class="wordList__item-translation">${translation}</div>
      </div>
    `;
    return card;
  }
}
