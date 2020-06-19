import gamesInfo from '@/data/games.json';
import { blackGradient } from '@/constants';
import { createElement } from '@/utils';
import SavannahController from './savannah/savannahController';
import PuzzleController from './puzzle/puzzleController';
import AudiocallController from './audiocall/audiocallController';
import SpeakitController from './speakit/speakitController';
import SprintController from './sprint/sprintController';

export default class Games {
  constructor() {
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
      this.game = new this.games[name](this.user, this.openPopupResult.bind(this));
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
    const startScreen = createElement({ tag: 'div', class: 'game__startScreen' });
    const title = createElement({ tag: 'div', class: 'game__startScreen-title', content: this.gameInfo.title });
    const desc = createElement({ tag: 'div', class: 'game__startScreen-desc', content: this.gameInfo.desc });
    const btnStart = createElement({ tag: 'button', class: 'btn', content: 'Start' });
    const btnExit = createElement({ tag: 'button', class: 'btn', content: 'Go back' });
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
    const wrap = createElement({ tag: 'div', class: 'game__options' });
    if (this.gameInfo.settings.levels) {
      wrap.append(this.createLevels());
    }
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
    this.resultPopup = createElement({ tag: 'div', class: 'resultPopup' });
    const wrap = createElement({ tag: 'div', class: 'resultPopup__wrap' });

    const titleError = createElement({ tag: 'div', class: 'resultPopup__title', content: 'Ошибок' });
    this.titleErrorCount = createElement({ tag: 'span', class: 'errors' });
    this.errorBlock = createElement({ tag: 'div', class: 'resultPopup__errors' });

    const titleSuccess = createElement({ tag: 'div', class: 'resultPopup__title', content: 'Знаю' });
    this.titleSuccessCount = createElement({ tag: 'span', class: 'success' });
    this.successBlock = createElement({ tag: 'div', class: 'resultPopup__success' });

    const btnBlock = createElement({ tag: 'div', class: 'resultPopup__btns' });
    this.btnClosePopup = createElement({ tag: 'button', class: 'btn', content: 'Close' });
    this.btnNewGame = createElement({ tag: 'button', class: 'btn', content: 'New game' });
    this.appendResultPopupElements(wrap, titleError, titleSuccess, btnBlock);
    this.addResultListeners();
    return this.resultPopup;
  }

  appendResultPopupElements(wrap, titleError, titleSuccess, btnBlock) {
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
    const listItem = createElement({ tag: 'div', class: 'resultPopup__word' });
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
    const wrap = createElement({ tag: 'div', class: 'levels', id: 'levels' });
    const levelsParent = createElement({ tag: 'div', class: 'levels__wrap' });
    wrap.append(createElement({ tag: 'div', class: 'levels__title', content: 'Levels' }));
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
    const radio = createElement({ tag: 'label', class: 'radio', id: `radio${i}` });
    const span = createElement({ tag: 'span', class: 'radio__decor' });
    const input = createElement({ tag: 'input', class: 'radio__input' });
    input.value = i;
    input.type = 'radio';
    input.name = 'group';
    if (i === 0) input.checked = 'checked';
    radio.append(input);
    radio.append(span);
    return radio;
  }

  createOptions(minWords = 5, step = 5, options = 3) {
    const wrap = createElement({ tag: 'div', class: 'game__select' });
    const selectText = createElement({
      tag: 'span', class: 'game__select-text', id: 'savSelectText', content: 'Количество слов',
    });
    const select = createElement({ tag: 'select', class: 'game__select-options', id: 'selectCount' });
    for (let i = 0; i < options; i += 1) {
      const content = `${minWords + i * step}`;
      const option = createElement({ tag: 'option', class: 'game__select-options-item', content });
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
