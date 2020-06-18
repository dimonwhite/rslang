import gamesInfo from '@/data/games.json';
import { blackGradient } from '@/constants';
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
      this.game = new this.games[name](this.user, this.endGame);
      this.gameInfo = this.gamesInfo[name];
      const main = document.getElementById('main');
      main.append(this.createStartScreen());
      main.append(this.createSettings());
      main.append(this.createEndGame());
      main.classList.add(this.gameInfo.gameClass);
      this.game.init();
    }
  }

  createStartScreen() {
    const startScreen = createElement('div', 'game__startScreen');
    const title = createElement('div', 'game__startScreen-title', false, this.gameInfo.title);
    const desc = createElement('div', 'game__startScreen-desc', false, this.gameInfo.desc);
    const btnStart = createElement('button', 'btn', false, 'Start');
    const btnExit = createElement('button', 'btn', false, 'Go back');
    const image = require(`@/assets/img/${this.gameInfo.bgImage}`);
    startScreen.style.backgroundImage = `url("${image.default}")`;
    document.body.style.backgroundImage = `${blackGradient}, url("${image.default}")`;

    startScreen.append(title);
    startScreen.append(desc);
    startScreen.append(btnStart);
    startScreen.append(btnExit);

    btnStart.addEventListener('click', () => {
      startScreen.classList.add('hide');
    });
    btnExit.addEventListener('click', Games.exitGame.bind(this));
    return startScreen;
  }

  createSettings() {
    const wrap = createElement('div', 'game__options');
    wrap.append(this.createLevels());
    if (this.gameInfo.settings.countWords) {
      wrap.append(this.createOptions(
        this.gameInfo.settings.countWordsMin,
        this.gameInfo.settings.countWordsStep,
        this.gameInfo.settings.optionsCount,
      ));
    }
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
    const levelsParent = createElement('div', 'levels__wrap');
    wrap.append(createElement('div', 'levels__title', false, 'Levels'));
    wrap.append(levelsParent);
    for (let i = 0; i < 6; i += 1) {
      levelsParent.append(Games.createRadioLevel(i));
    }
    wrap.addEventListener('change', (e) => {
      this.game.level = +e.target.value;
      this.game.change();
    });
    return wrap;
  }

  static createRadioLevel(i) {
    const radio = createElement('label', 'radio', `radio${i}`);
    const span = createElement('span', 'radio__decor');
    const input = createElement('input', 'radio__input');
    input.value = i;
    input.type = 'radio';
    input.name = 'group';
    if (i === 0) input.checked = 'checked';
    radio.append(input);
    radio.append(span);
    return radio;
  }

  createOptions(minWords = 5, step = 5, options = 3) {
    const wrap = createElement('div', 'game__select');
    const selectText = createElement('span', 'game__select-text', 'savSelectText', 'Количество слов');
    const select = createElement('select', 'game__select-options', 'selectCount');
    for (let i = 0; i < options; i += 1) {
      const content = `${minWords + i * step}`;
      const option = createElement('option', 'game__select-options-item', false, content);
      select.append(option);
    }
    select.addEventListener('change', (e) => {
      this.game.changeCountWords(e.target.value);
    });
    select.value = this.game.getCountWords();
    wrap.append(selectText);
    wrap.append(select);
    return wrap;
  }

  static exitGame() {
    document.getElementById('navPage').click();
  }
}
