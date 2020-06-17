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
    card.classList.add('word_list_item');
    card.dataset.id = this.key;
    card.innerHTML = `
      <svg class="svg_icon">
        <use xlink:href="sprite.svg#volume"></use>
      </svg>
      <div class="word_list_item_text">
          <div class="word_list_item_title">${word}</div>
          <div class="word_list_item_transcription">${transcription}</div>
      </div>
    `;
    return card;
  }
}
