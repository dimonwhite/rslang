import savannahImg from '@/assets/icons/statistic/game-savanna-icon.png';
import audiocallImg from '@/assets/icons/statistic/game-audiocall-icon.png';
import sprintImg from '@/assets/icons/statistic/game-sprint-icon.png';
import speakitImg from '@/assets/icons/statistic/game-speakit-icon.png';
import englishPuzzleImg from '@/assets/icons/statistic/game-englishpuzzle-icon.png';
import ourgamePuzzleImg from '@/assets/icons/statistic/game-ourgame-icon.png';
import { createElement } from '../../../utils';

export default class GamesStatisticView {
  constructor() {
    this.mainStatisticInfo = document.querySelector('.main-statistic-info');
    this.gamesStatistic = createElement({ tag: 'div', class: 'games-statistic' });
    this.gamestatisticClose = createElement({ tag: 'div', class: 'game-wrap window-game-hide' });
    this.windowGameStatistic = createElement({ tag: 'div', class: 'window-game-statistic' });
    this.gamesNamesRu = [
      'Savannah',
      'Audiocall',
      'Sprint',
      'SpeakIt',
      'English Puzzle',
      'Fillwords',
    ];
    this.iconsGamesUrl = {
      Savannah: savannahImg,
      Audiocall: audiocallImg,
      Sprint: sprintImg,
      SpeakIt: speakitImg,
      'English Puzzle': englishPuzzleImg,
      Fillwords: ourgamePuzzleImg,
    };
  }

  createGamesButtons(quantityGames) {
    if (this.mainStatisticInfo) {
      this.mainStatisticInfo.append(this.gamesStatistic);
      this.mainStatisticInfo.append(this.gamestatisticClose);
      let content = '';
      for (let i = 0; i < Object.keys(quantityGames).length; i += 1) {
        content += `
        <div class="games games-${Object.keys(quantityGames)[i]}" data-game="${Object.keys(quantityGames)[i]}">${this.gamesNamesRu[i]}</div>`;
      }
      this.gamesStatistic.innerHTML = content;
    }
  }

  createStatisticWindow(statisticGame, gameName) {
    this.gamestatisticClose.append(this.windowGameStatistic);
    let dataForContnent = '';
    for (let i = 0; i < statisticGame.length; i += 1) {
      dataForContnent += `
        <li class="field-item">
          <p class="field-data">${statisticGame[i][0]}</p>
          <p class="field-right-answer">${statisticGame[i][1][0]}</p>
          <p class="field-mistakes">${statisticGame[i][1][1]}</p>
          <p class="field-points">${(statisticGame[i][1][2] === undefined) ? '-' : `${statisticGame[i][1][2]}`}</p>
        </li>
      `;
    }
    this.windowGameStatistic.innerHTML = `
    <img class="game-logo" src=${this.iconsGamesUrl[gameName]}></img>
    <h3 class="game-name">${gameName}</h3>
    <button class="close-game-window"></button>
    <ul class="statistic-signatures">
      <li class="signatures-item">Дата</li>
      <li class="signatures-item">Количество правильных ответов </li>
      <li class="signatures-item">Количество ошибок</li>
      <li class="signatures-item">Баллы (Sprint)</li>
    </ul>
    <ul class="statistic-field">
      ${dataForContnent}
    </ul>`;
  }
}
