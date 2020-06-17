export default class Card {
  constructor(card, key) {
    this.card = card;
    this.key = key;
  }

  create() {
    const {
      word, transcription,
    } = this.card;
    const card = document.createElement('div');
    card.classList.add('wordList__item');
    card.dataset.id = this.key;
    card.innerHTML = `
      <svg class="svg_icon">
        <use xlink:href="sprite.svg#volume"></use>
      </svg>
      <div class="wordList__item-text">
          <div class="wordList__item-title">${word}</div>
          <div class="wordList__item-transcription">${transcription}</div>
      </div>
    `;
    return card;
  }
}
