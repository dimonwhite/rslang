const urlGitHub = 'https://raw.githubusercontent.com/dimonwhite/rslang-data/master/data/';

export default class Card {
  constructor(card, key) {
    this.card = card;
    this.key = key;
  }

  create() {
    const card = document.createElement('div');
    card.classList.add('list-dictionary__item', 'card-dictionary');
    card.dataset.id = this.key;
    card.innerHTML = `
      <div class="card-dictionary__left">
        <div class="card-dictionary__sound">
          <img class="card-dictionary__sound-icon" src="src/assets/img/dictionary-sound.svg">
        </div>
        <div class="card-dictionary__text">
          <div class="card-dictionary__word">${this.card.word}</div>
          <div class="card-dictionary__translation">${this.card.translation}</div>
        </div>
      </div>
      <div class="card-dictionary__right">
        <div class="card-dictionary__img" style="background: url(${urlGitHub}${this.card.image.replace('files/', '')}) center center no-repeat;background-size: cover;"></div>
        <div class="card-dictionary__state">
          <img class="card-dictionary__state-icon" src="src/assets/img/dictionary-filter-${this.card.state}.svg">
        </div>
        <div class="card-dictionary__remove">
          <img class="card-dictionary__remove-icon" src="src/assets/img/dictionary-remove.svg">
        </div>
      </div>
    `;
    return card;
  }
}
