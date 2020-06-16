import SavannahController from './savannah/savannahController';
import PuzzleController from './puzzle/puzzleController';
import AudiocallController from './audiocall/audiocallController';
import SpeakitController from './speakit/speakitController';
import SprintController from './sprint/sprintController';

export default class Games {
  constructor() {
    this.count = 10;
  }

  create(name) {
    document.getElementById('main').append(this.createBegin());
    document.getElementById('main').append(this.createEndGame());
    switch (name) {
      case 'liSavannah':
        new SavannahController(this.user, this.endGame).createEvent();
        break;
      case 'liPuzzle':
        new PuzzleController(this.user, this.endGame).createEvent();
        break;
      case 'liAudiocall':
        new AudiocallController(this.user, this.endGame).createEvent();
        break;
      case 'liSpeakit':
        new SpeakitController(this.user, this.endGame).createEvent();
        break;
      case 'liSprint':
        new SprintController(this.user, this.endGame).createEvent();
        break;
      default:
        break;
    }
  }

  createBegin() {
    const begin = document.createElement('section');
    begin.className = 'savannah__begin';
    begin.id = 'savBegin';
    const wrap = document.createElement('div');
    wrap.className = 'savannah__options';
    wrap.append(this.createLevels());
    wrap.append(this.createOptions());
    begin.append(wrap);

    const title = document.createElement('h2');
    title.className = 'savannah__begin-title';
    title.id = 'savTitle';
    title.innerHTML = 'Savannah';
    begin.append(title);

    const start = document.createElement('button');
    start.innerHTML = 'НАЧАТЬ';
    start.className = 'savannah__begin-start';
    start.id = 'savStart';
    begin.append(start);

    const exit = document.createElement('button');
    exit.innerHTML = 'Вернуться';
    exit.className = 'savannah__begin-start';
    exit.id = 'savExit';
    begin.append(exit);
    exit.onclick = this.exitGame.bind(this);
    start.onclick = this.getStart.bind(this);
    return begin;
  }

  createEndGame() {
    const result = document.createElement('section');
    result.className = 'result';
    result.id = 'savResult';

    const wrapIncorr = document.createElement('div');
    wrapIncorr.className = 'result__wrap';
    const incorrect = document.createElement('p');
    incorrect.className = 'result__incorrect';
    const incorrectlyText = document.createElement('span');
    incorrectlyText.innerHTML = 'Incorrectly: ';
    incorrectlyText.id = 'savIncorrectlyText';
    const incorrectly = document.createElement('span');
    incorrectly.innerHTML = '0';
    incorrectly.id = 'savIncorrectly';
    incorrect.append(incorrectlyText);
    incorrect.append(incorrectly);
    const invalidList = document.createElement('ul');
    invalidList.id = 'savInvalidList';
    invalidList.className = 'result__list';
    wrapIncorr.append(incorrect);
    wrapIncorr.append(invalidList);

    const wrapCorr = document.createElement('div');
    wrapCorr.className = 'result__wrap';
    const correct = document.createElement('p');
    correct.className = 'result__correct';
    const correctlyText = document.createElement('span');
    correctlyText.innerHTML = 'Correctly: ';
    correctlyText.id = 'savCorrectlyText';
    const correctly = document.createElement('span');
    correctly.innerHTML = this.correctly;
    correctly.id = 'savCorrectly';
    correct.append(correctlyText);
    correct.append(correctly);
    const validList = document.createElement('ul');
    validList.id = 'savValidList';
    validList.className = 'result__list';
    wrapCorr.append(correct);
    wrapCorr.append(validList);

    const buttons = document.createElement('div');
    buttons.className = 'result__buttons';
    const returnBtn = document.createElement('button');
    returnBtn.className = 'result__buttons-item';
    returnBtn.id = 'savExit';
    returnBtn.innerHTML = 'Выйти из игры';
    const newGameBtn = document.createElement('button');
    newGameBtn.className = 'result__buttons-item';
    newGameBtn.id = 'savGameBtn';
    newGameBtn.innerHTML = 'Нова игра';
    // newGameBtn.onclick = this.newGame.bind(this);
    returnBtn.onclick = this.exitGame.bind(this);
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
    document.getElementById('savResult').classList.add('show');

    const invalidList = document.getElementById('savInvalidList');
    invalidList.innerHTML = '';
    const validList = document.getElementById('savValidList');
    validList.innerHTML = '';
    const corrFragment = new DocumentFragment();
    const incorrFragment = new DocumentFragment();
    let incorrect = 0;
    for (let i = 0; i < this.count; i += 1) {
      const li = document.createElement('li');
      li.id = `li${i}`;
      const { word, transcription, wordTranslate } = words[i];
      li.innerHTML = `${word} ${transcription} ${wordTranslate}`;
      if (words[i].correctly) {
        corrFragment.append(li);
      } else {
        incorrFragment.append(li);
        incorrect += 1;
      }
    }
    document.getElementById('savCorrectly').innerHTML = this.count - incorrect;
    document.getElementById('savIncorrectly').innerHTML = incorrect;
    invalidList.append(incorrFragment);
    validList.append(corrFragment);
  }

  createLevels() {
    const wrap = document.createElement('div');
    wrap.className = 'levels';
    wrap.id = 'levels';
    for (let i = 0; i <= 6; i += 1) {
      const radio = document.createElement('label');
      radio.className = 'radio';
      radio.id = `radio${i}`;

      const input = document.createElement('input');
      input.type = 'radio';
      input.name = 'group';
      input.className = 'radio__input';
      input.setAttribute('data-value', i);

      const span = document.createElement('span');
      span.innerHTML = `lvl-${i}`;
      span.className = 'radio__span';

      if (i === 0) input.checked = 'checked';
      radio.append(input);
      radio.append(span);
      wrap.append(radio);
    }
    wrap.addEventListener('change', (e) => {
      if (e.target.value === 'on' && e.target.dataset) {
        this.level = +e.target.dataset.value;
      }
    });
    return wrap;
  }

  createOptions() {
    const wrap = document.createElement('div');
    wrap.className = 'savannah__select';
    const selectText = document.createElement('span');
    selectText.innerHTML = 'Количество слов';
    selectText.id = 'savSelectText';
    selectText.className = 'savannah__select-text';
    const select = document.createElement('select');
    select.className = 'savannah__select-options';
    select.id = 'savSelect';
    for (let i = 1; i <= 3; i += 1) {
      const option = document.createElement('option');
      option.innerHTML = `${i * 10}`;
      option.className = 'savannah__select-options-item';
      select.append(option);
    }
    select.onchange = (e) => {
      this.count = e.target.value;
    };
    wrap.append(selectText);
    wrap.append(select);
    return wrap;
  }

  getStart() {
    this.count = 10;
    document.getElementById('savBegin').classList.add('hide');
    // document.getElementById('savGame').classList.add('show-flex');
  }

  exitGame() {
    this.words = [];
    document.getElementById('header').classList.remove('hide');
    document.getElementById('footer').classList.remove('hide');
    document.getElementById('settings').classList.remove('hide');
    document.getElementById('liMain').classList.remove('decoration');
    document.getElementById('liMain').click();
  }
}
