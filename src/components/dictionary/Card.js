import { urlGitHub } from '@/constants';

export default class Card {
  constructor(card, id) {
    this.card = card;
    this.id = id;
  }

  create() {
    const card = document.createElement('div');
    card.classList.add('list-dictionary__item', 'card-list');
    card.dataset.id = this.id;
    card.innerHTML = `
      <div class="card-list__left">
        <div class="card-list__sound">
          <img class="card-list__sound-icon" src="src/assets/img/dictionary-sound.svg">
        </div>
        <div class="card-list__text">
          <div class="card-list__word">${this.card.word}</div>
          <div class="card-list__translation">${this.card.translation}</div>
        </div>
      </div>
      <div class="card-list__right">
        <div class="card-list__img" style="background: url(${urlGitHub}${this.card.image.replace('files/', '')}) center center no-repeat;background-size: cover;"></div>
        <div class="card-list__state">
          <img class="card-list__state-icon" src="src/assets/img/dictionary-filter-${this.card.state}.svg">
        </div>
      </div>
    `;
    return card;
  }
}
