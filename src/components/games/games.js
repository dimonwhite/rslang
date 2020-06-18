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
      this.game = new this.games[name](this.user, this);
      this.gameInfo = this.gamesInfo[name];
      const main = document.getElementById('main');
      main.append(this.createStartScreen());
      main.append(this.createSettings());
      main.append(this.createResultPopup());
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

  createResultPopup() {
    this.resultPopup = createElement('div', 'resultPopup');
    const wrap = createElement('div', 'resultPopup__wrap');

    const titleError = createElement('div', 'resultPopup__title', false, 'Ошибок');
    this.titleErrorCount = createElement('span', 'errors');
    this.errorBlock = createElement('div', 'resultPopup__errors');

    const titleSuccess = createElement('div', 'resultPopup__title', false, 'Знаю');
    this.titleSuccessCount = createElement('span', 'success');
    this.successBlock = createElement('div', 'resultPopup__success');

    const btnBlock = createElement('div', 'resultPopup__btns');
    this.btnClosePopup = createElement('button', 'btn', false, 'Close');
    this.btnNewGame = createElement('button', 'btn', false, 'New game');

    this.resultPopup.append(wrap);
    titleError.append(this.titleErrorCount);
    titleSuccess.append(this.titleSuccessCount);
    wrap.append(
      titleError,
      this.errorBlock,
      titleSuccess,
      this.successBlock,
      btnBlock,
    );
    btnBlock.append(this.btnClosePopup, this.btnNewGame);
    this.addResultListeners();
    return this.resultPopup;
  }

  addResultListeners() {
    this.btnClosePopup.addEventListener('click', () => {
      this.closeResultPopup();
    });
    this.btnNewGame.addEventListener('click', () => {
      this.game.change();
      this.closeResultPopup();
    });
  }

  openPopupResult(words) {
    const score = this.game.getScore();
    const count = this.game.words.length;

    this.successBlock.innerHTML = '';
    this.errorBlock.innerHTML = '';

    this.titleErrorCount.textContent = count - score;
    this.titleSuccessCount.textContent = score;
    words.forEach((item, key) => {
      if (item.success) {
        Games.createResultItem(item, key, this.successBlock);
      } else {
        Games.createResultItem(item, key, this.errorBlock);
      }
    });

    this.resultPopup.classList.add('active');
  }

  static createResultItem(item, key, block) {
    const listItem = createElement('div', 'resultPopup__word');
    listItem.dataset.id = key;
    listItem.innerHTML = `
      <svg class="svg_icon">
        <use xlink:href="sprite.svg#volume"></use>
      </svg>
      <div class="text word">${item.word}</div>
      <div class="text">${item.transcription}</div>
      <div class="text">${item.translation}</div>
    `;
    block.append(listItem);
  }

  closeResultPopup() {
    this.resultPopup.classList.remove('active');
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
