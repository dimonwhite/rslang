import checkTrueImg from '@/assets/img/Sprint/Check-True.png';
import planetImg1 from '@/assets/img/Sprint/Planet1.png';
import planetImg2 from '@/assets/img/Sprint/Planet2.png';
import planetImg3 from '@/assets/img/Sprint/Planet3.png';
import planetImg4 from '@/assets/img/Sprint/Planet4.png';
import correctAudio from '@/assets/sounds/sprint/correct.mp3';
import errorAudio from '@/assets/sounds/sprint/error.mp3';
import successAudio from '@/assets/sounds/sprint/success.mp3';
import endgameAudio from '@/assets/sounds/sprint/endgame.mp3';
import loaderAudio from '@/assets/sounds/sprint/loader.mp3';
import lustsecond from '@/assets/sounds/sprint/lustsecond.mp3';
import { createElement, getSvg } from '../../../utils';

export default class SprintView {
  constructor() {
    this.main = document.getElementById('main');
    this.countLevels = 6;
    this.addTime = 60;
    this.audio = new Audio();
    this.audioLust = new Audio();
    this.planetImgs = {
      planet1: planetImg1,
      planet2: planetImg2,
      planet3: planetImg3,
      planet4: planetImg4,
    };
    this.audioList = {
      correct: correctAudio,
      error: errorAudio,
      success: successAudio,
      endgame: endgameAudio,
      loader: loaderAudio,
    };
  }

  renderHTML() {
    SprintView.noPadding();
    this.createElements();
    this.appendElements();

    this.main.append(this.game);
  }

  createElements() {
    this.indicationBlock = createElement({ tag: 'div', class: 'game__sprint__main-field' });
    this.preloader = createElement({ tag: 'div', class: 'game__sprint__preloader' });
    this.loader = createElement({ tag: 'div', class: 'game__sprint__loader' });
    this.loadCounter = createElement({ tag: 'div', class: 'game__sprint__loader__count' });
    this.game = createElement({ tag: 'section', class: 'game__sprint' });
    this.wordsBlock = createElement({ tag: 'div', class: 'game__sprint__play-content' });
    this.currentWord = createElement({ tag: 'div', class: 'game__sprint__word' });
    this.currentTranslation = createElement({ tag: 'div', class: 'game__sprint__translation' });
    this.btnsBlock = createElement({ tag: 'div', class: 'game__sprint__btns' });
    this.arrowsBlock = createElement({ tag: 'div', class: 'game__sprint__btns' });
    this.btnChoiceTrue = createElement({ tag: 'div', class: 'btn btn-circle-true', content: 'Верно' });
    this.btnChoiceFalse = createElement({ tag: 'div', class: 'btn  btn-circle-false', content: 'Неверно' });
    this.arrowChoiceTrue = createElement({ tag: 'div', class: 'arrowChoice', content: '←' });
    this.arrowChoiceFalse = createElement({ tag: 'div', class: 'arrowChoice', content: '→' });
    this.scoreBlock = createElement({ tag: 'div', class: 'game__sprint__score', content: 'Счёт: 0' });
    this.currentBonus = createElement({ tag: 'div', class: 'game__sprint__bonus__star', id: 'current_Bonus' });
    this.bonusAreaFirst = createElement({
      tag: 'div', class: 'game__sprint__bonus__area__1', id: 'current_Bonus__area__1',
    });
    this.bonusAreaSecond = createElement({ tag: 'div', class: 'game__sprint__bonus__area__2', id: 'current_Bonus__area__2' });
    this.bonusAreaThird = createElement({ tag: 'div', class: 'game__sprint__bonus__area__3', id: 'current_Bonus__area__3' });
    this.bonusItemsBlock = createElement({ tag: 'div', class: 'game__sprint__bonus__area__count', id: 'game__sprint__bonus__area__count' });
    this.firstBonusItem = createElement({ tag: 'div', class: 'game__sprint__bonus__item1', id: 'game__sprint__bonus__item1' });
    this.secondBonusItem = createElement({ tag: 'div', class: 'game__sprint__bonus__item2', id: 'game__sprint__bonus__item2' });
    this.thirdBonusItem = createElement({ tag: 'div', class: 'game__sprint__bonus__item3', id: 'game__sprint__bonus__item3' });
    this.fourBonusItem = createElement({ tag: 'div', class: 'game__sprint__bonus__item4', id: 'game__sprint__bonus__item4' });
    this.answerCheck = createElement({ tag: 'div', class: 'game__sprint__checkAnswer__area', id: 'game__sprint__checkAnswer__area' });
    this.wordList = createElement({ tag: 'div', class: 'wordList' });
    this.timerBlock = createElement({ tag: 'div', class: 'game__sprint__time__block' });
    this.timer = createElement({ tag: 'div', class: 'game__sprint__time__count' });
    this.secondTimer = createElement({ tag: 'div', class: 'game__sprint__time__Second' });
    this.bonus = createElement({ tag: 'div', class: 'current__Bonus__item', content: '*' });
    this.gameOptions = createElement({ tag: 'div', class: 'game__options' });
    this.svgTimer = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
    this.svgTimer.classList.add('timer_svg');
    this.svgTimer.setAttribute('width', 150);
    this.svgTimer.setAttribute('height', 150);
    this.svgTimer.innerHTML = '<circle class="circle" cx="80" cy="80" r="60"  />';
    this.SvgCircleBlock = createElement({ tag: 'div', class: 'game__sprint__time__block_svg' });
    this.userBlock = createElement({ tag: 'div', class: 'game__sprint__user-words-block' });
    this.userBlockButton = createElement({ tag: 'div', class: 'game__sprint__user-words-button', content: 'Мои слова' });
    this.userNotification = createElement({ tag: 'p', class: 'game__sprint__user-words-notification' });
    this.close = createElement({ tag: 'a', class: 'close', content: getSvg('close') });
    this.close.setAttribute('href', '/#/games');
  }

  appendElements() {
    this.btnsBlock.append(this.btnChoiceTrue, this.wordsBlock, this.btnChoiceFalse);
    this.currentBonus.append(this.bonusAreaFirst, this.bonusAreaSecond, this.bonusAreaThird);
    this.svgTimer.append(this.svgCircle);
    this.SvgCircleBlock.append(this.svgTimer);
    this.timerBlock.append(this.SvgCircleBlock, this.timer);
    this.userBlock.append(this.userBlockButton, this.userNotification);
    this.bonusItemsBlock.append(this.firstBonusItem,
      this.secondBonusItem, this.thirdBonusItem, this.fourBonusItem);

    this.indicationBlock.append(this.scoreBlock, this.close,
      this.currentBonus, this.timerBlock);
    this.wordsBlock.append(this.currentWord, this.currentTranslation);
    document.querySelector('.game__startScreen').append(this.createLevels());
    document.querySelector('.game__startScreen').append(this.userBlock);
    this.game.append(
      this.indicationBlock, this.bonusItemsBlock,
      this.answerCheck, this.btnsBlock, this.arrowsBlock,
    );
  }

  static noPadding() {
    document.body.classList.add('fix__padding');
    document.body.classList.add('show-game');
  }

  createLevels() {
    const wrap = createElement({ tag: 'div', class: 'levels', id: 'levels' });
    const levelsParent = createElement({ tag: 'div', class: 'levels__wrap' });
    wrap.append(createElement({ tag: 'div', class: 'levels__title', content: 'Сложность' }));
    wrap.append(levelsParent);
    for (let i = 0; i < this.countLevels; i += 1) {
      levelsParent.append(SprintView.createRadioLevel(i));
    }
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

  getPreloader() {
    this.preloader.append(this.loadCounter, this.loader);
    this.game.append(this.preloader);
    this.IntervalLoaderHide = setTimeout(() => {
      if (!this.preloader.classList.contains('hide__loader')) {
        clearInterval(this.IntervalLoaderHide);
        this.preloader.classList.add('hide__loader');
        this.startCircleTimer();
      }
    }, 6000);
  }

  restartLoader() {
    if (this.preloader.classList.contains('hide__loader')) {
      this.preloader.classList.remove('hide__loader');
    }
  }

  getTrueCouple(trueword, truetranslate) {
    this.currentWord.textContent = `${trueword.word}`;
    this.currentTranslation.textContent = `${truetranslate.wordTranslate}`;
  }

  getFalseCouple(trueword, falsetranslate) {
    this.currentWord.textContent = `${trueword.word}`;
    this.currentTranslation.textContent = `${falsetranslate}`;
  }

  getScore(score) {
    this.scoreBlock.textContent = `Очки: ${score}`;
  }

  addNotificationWord(text) {
    this.userNotification.innerHTML = `${text}`;
    setTimeout(() => {
      this.userNotification.innerHTML = ' ';
    }, 3000);
  }

  addTimer(howSecond) {
    this.timer.innerHTML = `${howSecond}`;
  }

  startCircleTimer() {
    document.querySelector('.circle').classList.add('start_timer');
    return this.timer;
  }

  restartCircleTimer() {
    if (document.querySelector('.circle').classList.contains('start_timer')) {
      document.querySelector('.circle').classList.remove('start_timer');
    }
    return this.timer;
  }

  getLoaderTime(timeItem) {
    this.loadCounter.innerHTML = `${timeItem}`;
  }

  static getBonus(i) {
    const check = `<img src="${checkTrueImg}" class="game__sprint__true__check__item" alt="True">`;

    document.querySelector(`.game__sprint__bonus__area__${i}`).insertAdjacentHTML('beforeend', check);
  }

  getBonusPlanet(i) {
    const planet = `<img src="${this.planetImgs[`planet${i}`]}" class="game__sprint__bonus__item__planet__icon${i}" alt="True">`;

    document.querySelector(`.game__sprint__bonus__item${i}`).insertAdjacentHTML('beforeend', planet);
  }

  addTextDescription(i, multiply) {
    if (i === 4) {
      this.answerCheck.style.color = 'yellow';
      this.answerCheck.textContent = `Серия правильных ответов! Бонус: умножение очков на ${multiply}! Планета открыта!`;
      this.removeTextAnswerCheck();
    } else {
      this.answerCheck.style.color = 'yellow';
      this.answerCheck.textContent = `Верно: +${10 * multiply} очков!`;
      this.removeTextAnswerCheck();
    }
  }

  addTextDescriptionFalse(i) {
    switch (i) {
      case 1:
        this.answerCheck.style.color = 'red';
        this.answerCheck.textContent = 'Ошибка!';
        this.removeTextAnswerCheck();
        break;
      case 2:
        this.answerCheck.style.color = 'red';
        this.answerCheck.textContent = 'Ошибка! Серия прервана!';
        this.removeTextAnswerCheck();
        break;
      case 3:
        this.answerCheck.style.color = 'red';
        this.answerCheck.textContent = 'Ошибка! Серия прервана!';
        this.removeTextAnswerCheck();
        break;
      default:
        this.answerCheck.style.color = 'red';
        this.answerCheck.textContent = 'Ошибка!';
        this.removeTextAnswerCheck();
        break;
    }
  }

  addTrue() {
    this.answerCheck.style.color = 'yellow';
    this.answerCheck.textContent = 'Верно: +10 очков!';
    this.removeTextAnswerCheck();
  }

  addFalse() {
    this.answerCheck.style.color = 'red';
    this.answerCheck.textContent = 'Ошибка! Серия прервана!';
    this.removeTextAnswerCheck();
  }

  addTrueBonusTittle(multiply) {
    this.answerCheck.textContent = `Серия правильных ответов! Бонус: умножение очков на ${multiply}! Планета открыта!`;
    this.removeTextAnswerCheck();
  }

  removeTextAnswerCheck() {
    if (this.answerCheckTimer) {
      clearTimeout(this.answerCheckTimer);
    }

    this.answerCheckTimer = setTimeout(() => {
      this.answerCheck.innerHTML = ' ';
    }, 2000);
  }

  clearBonus() {
    const bonusArea = this.currentBonus.childNodes;
    bonusArea.forEach((e) => {
      while (e.firstChild) {
        e.removeChild(e.firstChild);
      }
    });
  }

  clearPlanet() {
    const bonusPlanet = this.bonusItemsBlock.childNodes;
    bonusPlanet.forEach((e) => {
      while (e.firstChild) {
        e.removeChild(e.firstChild);
      }
    });
  }

  changeBackgroundTrue() {
    this.wordsBlock.classList.add('true_choice');
    setTimeout(() => {
      this.wordsBlock.classList.remove('true_choice');
    }, 300);
  }

  changeBackgroundFalse() {
    this.wordsBlock.classList.add('false_choice');
    setTimeout(() => {
      this.wordsBlock.classList.remove('false_choice');
    }, 300);
  }

  playAudio(sound) {
    this.audio.src = this.audioList[sound];
    this.audio.play().catch(() => this.audio.currentTime);
  }

  playLustSecond() {
    this.audioLust.src = lustsecond;
    this.audioLust.play();
  }

  dropScore() {
    this.scoreBlock.innerHTML = 'Score: 0';
  }

  stop() {
    this.game.classList.remove('active');
  }

  start() {
    this.startBtn.classList.add('active');
    this.startBtn.innerText = 'Stop';
    this.game.classList.add('active');
  }

  displayWord(e) {
    const i = e.resultIndex;
    this.gameWord.textContent = e.results[i][0].transcript;
  }

  removeButton() {
    this.btnChoiceTrue.classList.add('remove');
    this.btnChoiceFalse.classList.add('remove');
  }

  addButton() {
    this.btnChoiceTrue.classList.remove('remove');
    this.btnChoiceFalse.classList.remove('remove');
  }
}
