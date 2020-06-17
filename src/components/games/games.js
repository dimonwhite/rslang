import gamesInfo from '@/data/games.json';
import SavannahController from './savannah/savannahController';
import PuzzleController from './puzzle/puzzleController';
import AudiocallController from './audiocall/audiocallController';
import SpeakitController from './speakit/speakitController';
import SprintController from './sprint/sprintController';
import { createElement } from '../../utils';

export default class Games {
  constructor() {
    this.count = 10;
    this.games = {
      savannah: SavannahController,
      puzzle: PuzzleController,
      audiocall: AudiocallController,
      speakit: SpeakitController,
      sprint: SprintController,
    };
    this.gamesInfo = gamesInfo;
  }

  create(name) {
    if (this.games[name]) {
      const main = document.getElementById('main');
      main.append(this.createStartScreen(name));
      main.append(this.createSettings());
      main.append(this.createEndGame());
      this.game = new this.games[name](this.user, this.endGame);
      this.game.init();
    }
  }

  createStartScreen(game) {
    const gameInfo = this.gamesInfo[game];
    const startScreen = createElement('div', 'game__startScreen');
    const title = createElement('div', 'game__startScreen-title', false, gameInfo.title);
    const desc = createElement('div', 'game__startScreen-desc', false, gameInfo.desc);
    const btnStart = createElement('button', 'btn', false, 'Start');
    const btnExit = createElement('button', 'btn', false, 'Go back');
    const image = require(`@/assets/img/${gameInfo.bgImage}`);
    startScreen.style.backgroundImage = `url("${image.default}")`;

    startScreen.append(title);
    startScreen.append(desc);
    startScreen.append(btnStart);

    btnStart.addEventListener('click', () => {
      startScreen.classList.add('hide');
    });
    btnExit.addEventListener('click', Games.exitGame.bind(this));
    return startScreen;
  }

  createSettings() {
    const wrap = createElement('div', 'game__options');
    wrap.append(this.createLevels());
    wrap.append(this.createOptions());
    return wrap;
  }

  createEndGame() {
    const result = createElement('section', 'result', 'gameResult');
    const wrapIncorr = createElement('div', 'result__wrap');
    const incorrect = createElement('p', 'result__incorrect');
    const incorrectlyText = createElement('span', false, false, 'Incorrectly: ');
    const incorrectly = createElement('span', false, 'incorrectly');
    incorrect.append(incorrectlyText);
    incorrect.append(incorrectly);
    const invalidList = createElement('ul', 'result__list', 'invalidList');
    wrapIncorr.append(incorrect);
    wrapIncorr.append(invalidList);

    const wrapCorr = createElement('div', 'result__wrap');
    const correct = createElement('p', 'result__correct');
    const correctlyText = createElement('span', false, false, 'Correctly: ');
    const correctly = createElement('span', false, 'correctly');
    correct.append(correctlyText);
    correct.append(correctly);
    const validList = createElement('ul', 'result__list', 'validList');
    wrapCorr.append(correct);
    wrapCorr.append(validList);

    const buttons = createElement('div', 'result__buttons');
    const returnBtn = createElement('button', 'result__buttons-item', false, 'Выход');
    const newGameBtn = createElement('button', 'result__buttons-item', 'newGame', 'Нова игра');
    returnBtn.addEventListener('click', Games.exitGame.bind(this));
    buttons.append(returnBtn);
    buttons.append(newGameBtn);
    result.append(wrapCorr);
    result.append(wrapIncorr);
    result.append(buttons);
    return result;
  }

  endGame(words) {
    this.count = 10;
    this.words = words;
    document.getElementById('gameResult').classList.add('show');

    const corrFragment = new DocumentFragment();
    const incorrFragment = new DocumentFragment();
    let incorrect = 0;
    for (let i = 0; i < this.count; i += 1) {
      const { word, transcription, wordTranslate } = words[i];
      const content = `${word} ${transcription} ${wordTranslate}`;
      const li = createElement('li', false, `li${i}`, content);
      if (words[i].correctly) {
        corrFragment.append(li);
      } else {
        incorrFragment.append(li);
        incorrect += 1;
      }
    }
    document.getElementById('correctly').innerHTML = this.count - incorrect;
    document.getElementById('incorrectly').innerHTML = incorrect;

    const invalidList = document.getElementById('invalidList');
    invalidList.innerHTML = '';
    invalidList.append(incorrFragment);
    const validList = document.getElementById('validList');
    validList.innerHTML = '';
    validList.append(corrFragment);
  }

  createLevels() {
    const wrap = createElement('div', 'levels', 'levels');
    for (let i = 0; i <= 6; i += 1) {
      const radio = createElement('label', 'radio', `radio${i}`);
      const span = createElement('span', 'radio__span', false, `lvl-${i}`);
      const input = createElement('input', 'radio__input');
      input.value = i;
      input.type = 'radio';
      input.name = 'group';
      if (i === 0) input.checked = 'checked';
      radio.append(input);
      radio.append(span);
      wrap.append(radio);
    }
    wrap.addEventListener('change', (e) => {
      this.game.level = +e.target.value;
      this.game.change();
    });
    return wrap;
  }

  createOptions(minWords = 10, step = 5, options = 3) {
    const wrap = createElement('div', 'savannah__select');
    const selectText = createElement('span', 'savannah__select-text', 'savSelectText', 'Количество слов');
    const select = createElement('select', 'savannah__select-options', 'selectCount');
    for (let i = 0; i < options; i += 1) {
      const content = `${minWords + i * step}`;
      const option = createElement('option', 'savannah__select-options-item', false, content);
      select.append(option);
    }
    select.addEventListener('change', (e) => {
      this.count = e.target.value;
    });
    wrap.append(selectText);
    wrap.append(select);
    return wrap;
  }

  static exitGame() {
    document.getElementById('navPage').click();
  }
}
