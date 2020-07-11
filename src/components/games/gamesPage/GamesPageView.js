import gamesInfo from '@data/games';
import { createElement, getSvg } from '@/utils';

export default class GamesPageView {
  constructor() {
    this.gamesInfo = gamesInfo;
    this.main = document.querySelector('main');
  }

  createElements() {
    this.main.classList = 'main gamesPage';
    this.gamesBlock = createElement({ tag: 'div', class: 'gamesBlock' });
    Object.keys(this.gamesInfo).forEach((gameKey) => {
      this.gamesBlock.append(this.createGameLink(gameKey));
    });
    this.gamesBlock.append(GamesPageView.createAssistant());
    this.main.append(this.gamesBlock);
  }

  createGameLink(gameKey) {
    const link = createElement({ tag: 'a', class: 'gamesBlock__link', content: this.gamesInfo[gameKey].title });
    link.setAttribute('href', `#/games/${gameKey}`);
    const template = document.createElement('div');
    template.innerHTML = getSvg(`${gameKey}Planet`);
    link.append(template.firstElementChild);
    return link;
  }

  static createAssistant() {
    const assistant = createElement({ tag: 'div', class: 'gamesBlock__assistant' });
    assistant.innerHTML = `
      <div class="gamesBlock__assistant-message">
        ${getSvg('message')}
        <div class="text">Привет, выберите тренировку!</div>
      </div>
      ${getSvg('shrimp')}
    `;
    return assistant;
  }
}
