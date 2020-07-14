import { createElement } from '@/utils';
import { urlGitHub } from '@/constants';

export default class CardView {
  constructor() {
    this.card = document.getElementById('main');
    this.next = false;
    this.again = false;
    this.settings = null;
    this.settingsBlock = document.getElementById('settings');
  }

  renderHTML() {
    this.createSettings();
    this.setSettings();
    this.card.append(this.createCard());
    this.card.append(this.endTraining());
  }

  createCard() {
    const card = createElement({ tag: 'section', class: 'card', id: 'card' });
    this.createPartialCard();
    const input = createElement({ tag: 'div', class: 'card__input', id: 'cardInput' });
    this.input = createElement({ tag: 'input', class: 'card__input-item', id: 'inputWord' });
    this.input.setAttribute('type', 'text');
    this.cardCorrect = createElement({ tag: 'span', class: 'card__input-correct', id: 'cardCorrect' });
    input.append(this.input);
    input.append(this.cardCorrect);

    const wrapTranslation = createElement({ tag: 'div', class: 'card__translation' });
    wrapTranslation.append(this.translationWord);
    wrapTranslation.append(this.transcriptionWord);

    const wrapRange = createElement({ tag: 'div', class: 'card__range' });
    const range = createElement({ tag: 'progress', class: 'card__progress', id: 'rangeWords' });
    range.setAttribute('value', 0);
    wrapRange.append(this.firstNumber);
    wrapRange.append(range);
    wrapRange.append(this.secondNumber);
    const wrapCard = createElement({ tag: 'div', class: 'card__wrapper' });

    const wrapImage = createElement({ tag: 'div', class: 'card__wrapper-image' });
    wrapImage.append(...[this.cardPlay, this.cardImg]);
    const wrapMean = createElement({ tag: 'div', class: 'card__wrapper-meaning' });
    const mid = createElement({ tag: 'hr' });
    wrapMean.append(...[this.cardMeaning, mid, this.cardMeaningTranslation]);
    const wrapExample = createElement({ tag: 'div', class: 'card__wrapper-example' });
    const hr = createElement({ tag: 'hr' });
    wrapExample.append(...[this.cardExample, hr, this.cardExampleTranslation]);
    const wrapText = createElement({ tag: 'div', class: 'card__wrapper-text' });
    wrapText.append(...[wrapMean, wrapExample]);
    const wrapHelp = createElement({ tag: 'div', class: 'card__wrapper-help' });
    wrapHelp.append(...[wrapImage, wrapText]);
    const wrapWords = createElement({ tag: 'div', class: 'card__wrapper-words' });
    wrapWords.append(...[wrapTranslation, input, this.cardShow]);
    const wrapDict = createElement({ tag: 'div', class: 'card__wrapper-dict' });
    wrapDict.append(...[this.cardDiff, this.cardRemove]);
    const wrapPanel = createElement({ tag: 'div', class: 'card__wrapper-panel' });
    wrapPanel.append(...[wrapDict, wrapWords]);
    wrapCard.append(...[wrapRange, wrapHelp, this.interval, wrapPanel]);
    card.append(...[this.leftArrow, wrapCard, this.rightArrow]);
    this.input.focus();
    return card;
  }

  createPartialCard() {
    this.cardPlay = createElement({ tag: 'button', class: 'card__play', id: 'cardPlay' });
    this.cardImg = createElement({ tag: 'img', class: 'card__img', id: 'cardImg' });
    this.cardMeaning = createElement({ tag: 'p', id: 'cardMeaning' });
    this.cardMeaningTranslation = createElement({ tag: 'p', id: 'cardMeaningTranslation' });
    this.cardExample = createElement({ tag: 'p', id: 'cardExample' });
    this.cardExampleTranslation = createElement({ tag: 'p', id: 'cardExampleTranslation' });

    this.interval = createElement({ tag: 'div', class: 'card__interval', id: 'intervalBtns' });
    this.cardAgain = createElement({ tag: 'button', id: 'cardAgain', content: 'Снова' });
    this.cardHard = createElement({ tag: 'button', id: 'cardHard', content: 'Трудно' });
    this.cardNormal = createElement({ tag: 'button', id: 'cardNormal', content: 'Хорошо' });
    this.cardEasy = createElement({ tag: 'button', id: 'cardEasy', content: 'Легко' });
    this.interval.append(this.cardAgain);
    this.interval.append(this.cardHard);
    this.interval.append(this.cardNormal);
    this.interval.append(this.cardEasy);

    this.cardRemove = createElement({
      tag: 'button', class: 'card__remove', id: 'cardRemove',
    });
    this.cardDiff = createElement({
      tag: 'button', class: 'card__difficult', id: 'cardDifficult',
    });
    this.cardShow = createElement({
      tag: 'button', class: 'card__show', id: 'cardShow', content: 'Показать слово',
    });

    this.firstNumber = createElement({ tag: 'span', id: 'firstNumber' });
    this.secondNumber = createElement({ tag: 'span', id: 'secondNumber' });
    this.translationWord = createElement({ tag: 'span', id: 'translationWord' });
    this.transcriptionWord = createElement({ tag: 'span', id: 'transcriptionWord' });

    this.leftArrow = createElement({ tag: 'button', class: 'card__left', id: 'cardLeft' });
    this.rightArrow = createElement({ tag: 'button', class: 'card__right', id: 'cardRight' });
  }

  endTraining() {
    this.message = createElement({ tag: 'section', class: 'finished', id: 'message' });
    const title = createElement({ tag: 'h3', class: 'finished__message', content: 'План на сегодня выполнен!' });
    const statistics = createElement({ tag: 'div', class: 'finished__statistics' });
    const wrapCount = createElement({ tag: 'div' });
    const countMes = createElement({
      tag: 'span', class: 'finished__statistics-count', id: 'statCountMes', content: 'Карточек завершено:',
    });
    const count = createElement({ tag: 'span', class: 'finished__statistics-count', id: 'statCount' });
    wrapCount.append(countMes);
    wrapCount.append(count);

    const wrapCorrect = createElement({ tag: 'div' });
    const correctMes = createElement({
      tag: 'span', class: 'finished__statistics-correct', id: 'statCorrectMes', content: 'Правильных ответов:',
    });
    const correct = createElement({ tag: 'span', class: 'finished__statistics-correct', id: 'statCorrect' });
    wrapCorrect.append(correctMes);
    wrapCorrect.append(correct);

    const wrapNew = createElement({ tag: 'div' });
    const newMes = createElement({
      tag: 'span', class: 'finished__statistics-new', id: 'statNewMes', content: 'Новые слова:',
    });
    const newWord = createElement({ tag: 'span', class: 'finished__statistics-new', id: 'statNewWords' });
    wrapNew.append(newMes);
    wrapNew.append(newWord);

    const wrapLong = createElement({ tag: 'div' });
    const longMes = createElement({
      tag: 'span', class: 'finished__statistics-long', id: 'statLongMes', content: 'Серия правильных ответов:',
    });
    const long = createElement({ tag: 'span', class: 'finished__statistics-long', id: 'statLong' });
    wrapLong.append(longMes);
    wrapLong.append(long);
    const btn = createElement({
      tag: 'button', class: 'finished__btn btn', id: 'addition', content: 'Учить ещё',
    });
    statistics.append(wrapCount);
    statistics.append(wrapCorrect);
    statistics.append(wrapNew);
    statistics.append(wrapLong);
    this.message.append(title);
    this.message.append(statistics);
    this.message.append(btn);
    return this.message;
  }

  getCheckRadio(name) {
    const elements = document.getElementsByName(name);
    for (let i = 0; i < elements.length; i += 1) {
      if (elements[i].checked) {
        this.settings[elements[i].id] = true;
      } else {
        this.settings[elements[i].id] = false;
      }
    }
  }

  getSettings() {
    const newW = (this.settings) ? this.settings.newWords : false;
    const maxW = (this.settings) ? this.settings.maxWords : false;
    this.settings = {};
    this.getCheckRadio('lang');
    const checkBoxes = document.querySelectorAll('[type=checkbox]');
    Array.from(checkBoxes).forEach((item) => {
      this.settings[item.id] = item.checked;
    });
    this.settings.newWords = document.getElementById('newWords').value;
    this.settings.maxWords = document.getElementById('maxWords').value;
    this.checkValidSettings();
    if (newW && maxW && (newW !== this.settings.newWords || maxW !== this.settings.maxWords)) {
      return true;
    }
    return false;
  }

  checkValidSettings() {
    const MIN_WORDS = '3';
    const MAX_WORDS = '100';
    const MIN_NEW_WORDS = '0';
    if (+this.settings.maxWords < +MIN_WORDS) {
      document.getElementById('maxWords').value = MIN_WORDS;
      this.settings.maxWords = MIN_WORDS;
    }
    if (+this.settings.maxWords > +MAX_WORDS) {
      document.getElementById('maxWords').value = MAX_WORDS;
      this.settings.maxWords = MAX_WORDS;
    }
    if (+this.settings.newWords < +MIN_NEW_WORDS) {
      document.getElementById('newWords').value = MIN_NEW_WORDS;
      this.settings.newWords = MIN_NEW_WORDS;
    }
    if (+this.settings.newWords > +this.settings.maxWords) {
      document.getElementById('newWords').value = this.settings.maxWords;
      this.settings.newWords = this.settings.maxWords;
    }
    if (+this.settings.newWords > +MAX_WORDS) {
      document.getElementById('newWords').value = MAX_WORDS;
      this.settings.newWords = MAX_WORDS;
    }
  }

  setSettings() {
    const keys = Object.keys(this.settings);
    keys.forEach((item) => {
      document.getElementById(item).checked = this.settings[item];
    });
    document.getElementById('newWords').value = this.settings.newWords;
    document.getElementById('maxWords').value = this.settings.maxWords;
  }

  setWordInCard({
    next, numberWords, passedTodaY, word, cardIndeX, notPrev = true,
  }) {
    let passedToday = passedTodaY;
    let cardIndex = cardIndeX;
    if (document.getElementById('maxWords').value === passedToday) {
      document.getElementById('card').classList.add('hide');
      document.getElementById('message').classList.add('show-flex');
    } else {
      if (next && !this.next && !this.again) cardIndex += 1;
      this.setDataInCard(word, cardIndex, passedToday);
      if (notPrev) passedToday = this.changeRange(false, passedToday, numberWords);
      this.next = false;
      this.again = false;
    }
    return [cardIndex, passedToday, this.next];
  }

  setDataInCard(word, cardIndex, passedToday) {
    const hide = cardIndex === passedToday;
    this.setDataInInput(word, this.settings.numberLetters, !hide);

    const image = `${urlGitHub}${word.image.replace('files/', '')}`;
    this.cardImg.src = image;
    if (this.settings.langEn) {
      this.cardMeaning.innerHTML = this.replace({
        word: word.word, text: word.textMeaning, hide,
      });
      this.cardExample.innerHTML = this.replace({
        word: word.word, text: word.textExample, hide,
      });
      this.translationWord.innerHTML = word.wordTranslate;
    } else {
      this.cardMeaning.innerHTML = this.replace({
        word: word.wordTranslate, text: word.textMeaningTranslate, hide,
      });
      this.cardExample.innerHTML = this.replace({
        word: word.wordTranslate, text: word.textExampleTranslate, hide,
      });
      this.translationWord.innerHTML = word.word;
    }
    this.setSettingsInCard({ word });
  }

  replace({ word, text, hide }) {
    const words = text.split(' ');
    for (let i = 0; i < words.length; i += 1) {
      let punct = '';
      const len = words[i].length - 1;
      if (words[i][len] === '.' || words[i][len] === ',') {
        punct = words[i][len];
      }
      if (this.settings.langEn) {
        this.setLangEn({
          words, i, hide, punct,
        });
      } else {
        this.setLangRu({
          word, words, i, hide, punct,
        });
      }
    }
    return words.join(' ');
  }

  setLangEn({
    words, i, hide, punct,
  }) {
    if (words[i].includes('<i>') || words[i].includes('<b>')) {
      words[i] = words[i].replace(/(<([^>]+)>)/gi, '');
      if (this.settings.numberLetters && hide) {
        words[i] = String('*').repeat(words[i].length - punct.length) + punct;
      } else {
        words[i] = String('*').repeat(3) + punct;
      }
    }
  }

  setLangRu({
    word, words, i, hide, punct,
  }) {
    let compare;
    if (word.length > 5) {
      compare = word.slice(0, word.length - 4).toLowerCase();
    } else {
      compare = word.slice(0, word.length - 2).toLowerCase();
    }
    if (words[i].toLowerCase().startsWith(compare)) {
      if (this.settings.numberLetters && hide) {
        words[i] = String('*').repeat(words[i].length - punct.length) + punct;
      } else {
        words[i] = String('*').repeat(3) + punct;
      }
    }
  }

  setAnswerInCard(word, currentMistake, prev) {
    this.transcriptionWord.innerHTML = word.transcription;
    if (currentMistake && prev !== 'right') {
      this.cardAgain.classList.add('lock-element');
    }
    if (this.settings.langEn) {
      this.input.value = word.word;
      this.cardMeaning.innerHTML = word.textMeaning;
      this.cardExample.innerHTML = word.textExample;
      this.cardMeaningTranslation.innerHTML = word.textMeaningTranslate;
      this.cardExampleTranslation.innerHTML = word.textExampleTranslate;
    } else {
      this.input.value = word.wordTranslate;
      this.cardMeaning.innerHTML = word.textMeaningTranslate;
      this.cardExample.innerHTML = word.textExampleTranslate;
      this.cardMeaningTranslation.innerHTML = word.textMeaning;
      this.cardExampleTranslation.innerHTML = word.textExample;
    }
    this.setSettingsInCard({
      word, cardIndex: false, passedToday: false, change: false, prev, mistake: currentMistake,
    });
    this.cardPlay.classList.add('show');
    if (prev) {
      this.rightArrow.classList.add('go-next');
    } else {
      setTimeout(() => this.rightArrow.classList.add('go-next'), 500);
    }
  }

  setSettingsInCard({
    word, cardIndex, passedToday, change, prev, mistake,
  }) {
    const hide = cardIndex === passedToday;
    if (this.settings.interval && (prev || !hide)) {
      this.interval.classList.add('visibility');
      this.setCustomRating(word.customRating);
    } else {
      this.interval.classList.remove('visibility');
    }
    if (this.settings.removeWord) {
      this.cardRemove.classList.remove('hide');
      this.setInDictionary(word.state, mistake);
    } else {
      this.cardRemove.classList.add('hide');
    }
    if (this.settings.difficultWord) {
      this.cardDiff.classList.remove('hide');
      this.setInDictionary(word.state, mistake);
    } else {
      this.cardDiff.classList.add('hide');
    }
    this.setPartialSettingInCard();
    if (change) this.changeSettings(word, prev, hide);
    this.input.focus();
  }

  setPartialSettingInCard() {
    if (this.settings.showAnswer) {
      this.cardShow.classList.remove('hide');
    } else {
      this.cardShow.classList.add('hide');
    }
    if (this.settings.imgWord) {
      this.cardImg.classList.remove('lock-img');
    } else {
      this.cardImg.classList.add('lock-img');
    }
    if (this.settings.meaningWord) {
      this.cardMeaning.classList.remove('hide-text');
    } else {
      this.cardMeaning.classList.add('hide-text');
    }
    if (this.settings.exampleWord) {
      this.cardExample.classList.remove('hide-text');
    } else {
      this.cardExample.classList.add('hide-text');
    }
    if (this.settings.transcription) {
      this.transcriptionWord.classList.remove('hide');
    } else {
      this.transcriptionWord.classList.add('hide');
    }
    if (this.settings.translate) {
      this.translationWord.classList.remove('hide');
    } else {
      this.translationWord.classList.add('hide');
    }
    if (this.settings.meaningWordTransl) {
      this.cardMeaningTranslation.classList.remove('hide-text');
    } else {
      this.cardMeaningTranslation.classList.add('hide-text');
    }
    if (this.settings.exampleWordTransl) {
      this.cardExampleTranslation.classList.remove('hide-text');
    } else {
      this.cardExampleTranslation.classList.add('hide-text');
    }
  }

  changeSettings(word, prev, hide) {
    const hideAnswer = this.rightArrow.classList.contains('go-next') || prev;
    if (hideAnswer) {
      if (this.settings.langEn) {
        this.input.value = word.word;
      } else {
        this.input.value = word.wordTranslate;
      }
    }

    if (this.settings.langEn) {
      this.setWordEn({ hideAnswer, word, hide });
    } else {
      this.setWordRu({ hideAnswer, word, hide });
    }
    this.setDataInInput(word, this.settings.numberLetters, hideAnswer);
  }

  setWordRu({ hideAnswer, word, hide }) {
    if (hideAnswer) {
      this.cardMeaning.innerHTML = word.textMeaningTranslate;
      this.cardExample.innerHTML = word.textExampleTranslate;
      this.cardMeaningTranslation.innerHTML = word.textMeaning;
      this.cardExampleTranslation.innerHTML = word.textExample;
    } else {
      this.cardMeaning.innerHTML = this.replace({
        word: word.wordTranslate, text: word.textMeaningTranslate, hide,
      });
      this.cardExample.innerHTML = this.replace({
        word: word.wordTranslate, text: word.textExampleTranslate, hide,
      });
    }
    this.translationWord.innerHTML = word.word;
  }

  setWordEn({ hideAnswer, word, hide }) {
    if (hideAnswer) {
      this.cardMeaning.innerHTML = word.textMeaning;
      this.cardExample.innerHTML = word.textExample;
      this.cardMeaningTranslation.innerHTML = word.textMeaningTranslate;
      this.cardExampleTranslation.innerHTML = word.textExampleTranslate;
    } else {
      this.cardMeaning.innerHTML = this.replace({
        word: word.word, text: word.textMeaning, hide,
      });
      this.cardExample.innerHTML = this.replace({
        word: word.word, text: word.textExample, hide,
      });
    }
    this.translationWord.innerHTML = word.wordTranslate;
  }

  setDataInInput(word, numberLetters, hide) {
    if (numberLetters && !hide) {
      if (this.settings.langEn && word.word) {
        this.input.setAttribute('maxlength', word.word.length);
        this.incorrectWord('', '*'.repeat(word.word.length));
      } else if (word.wordTranslate) {
        this.input.setAttribute('maxlength', word.wordTranslate.length);
        this.incorrectWord('', '*'.repeat(word.wordTranslate.length));
      }
    } else {
      this.cardCorrect.innerHTML = '';
      this.cardCorrect.classList.remove('opacity-correct');
      this.input.setAttribute('maxlength', 80);
    }
  }

  blockButtons(customRating) {
    this.input.setAttribute('readonly', 'readonly');
    this.input.classList.add('correct-color');
    this.cardShow.classList.add('lock-element');
    this.cardDiff.classList.remove('lock-element');
    const isSound = this.settings.meaningWord || this.settings.exampleWord;
    const isFastAndSound = this.settings.nextCard && isSound;
    if (this.settings.interval && (!this.settings.nextCard || isFastAndSound)) {
      this.interval.classList.add('visibility');
      if (customRating) {
        this.setCustomRating(customRating);
      }
    }
  }

  changeRange(next, passedTodaY, numberWords) {
    let passedToday = passedTodaY;
    if (next) passedToday += 1;
    this.firstNumber.innerHTML = passedToday;
    this.secondNumber.innerHTML = numberWords;
    const range = document.getElementById('rangeWords');
    range.setAttribute('min', 0);
    range.setAttribute('max', numberWords);
    range.value = passedToday;
    return passedToday;
  }

  inputTodayStatistics({
    passedToday, incorrectAnswer, correctAnswer, newWordsToday, consecutive,
  }) {
    document.getElementById('card').classList.add('hide');
    this.message.classList.add('show-flex');
    document.getElementById('statCount').innerHTML = passedToday;
    if (incorrectAnswer + correctAnswer > 0) {
      document.getElementById('statCorrect')
        .innerHTML = `${Math.floor((correctAnswer / (incorrectAnswer + correctAnswer)) * 100)}%`;
    }
    document.getElementById('statNewWords').innerHTML = newWordsToday;
    document.getElementById('statLong').innerHTML = consecutive;
  }

  incorrectWord(answer, word) {
    let mistakes = 0;
    mistakes = Math.abs(answer.length - word.length);
    for (let i = 0; i < word.length; i += 1) {
      if (answer && answer.length > i) {
        if (answer[i] !== word[i]) mistakes += 1;
      }
    }
    const color = (mistakes < 3) ? 'orange' : 'red';
    let text = '';
    for (let i = 0; i < word.length; i += 1) {
      if (answer && answer.length > i) {
        if (answer[i] !== word[i]) {
          text += `<font color="${color}">${word[i]}</font>`;
        } else {
          text += `<font color="green">${word[i]}</font>`;
        }
      } else {
        text += `<font color="${color}">${word[i]}</font>`;
      }
    }
    this.input.value = '';
    this.input.focus();
    this.cardCorrect.innerHTML = text;
    setTimeout(() => this.cardCorrect.classList.add('opacity-correct'), 2000);
  }

  setCustomRating(customRating) {
    Array.from(this.interval.children).forEach((item) => item.classList.remove('custom-rating'));
    const [HARD, NORMAL, EASY] = [1, 3, 5];
    if (customRating === HARD) {
      this.cardHard.classList.add('custom-rating');
    } else if (customRating === NORMAL) {
      this.cardNormal.classList.add('custom-rating');
    } else if (customRating === EASY) {
      this.cardEasy.classList.add('custom-rating');
    }
  }

  setInDictionary(state, mistake) {
    if (state === 'difficult') {
      this.cardDiff.classList.add('custom-rating');
    } else {
      this.cardDiff.classList.remove('custom-rating');
    }
    if (state === 'remove') {
      this.cardRemove.classList.add('custom-rating');
      this.cardAgain.classList.add('lock-element');
    } else {
      this.cardRemove.classList.remove('custom-rating');
      if (!mistake) this.cardAgain.classList.remove('lock-element');
    }
  }

  nextCard() {
    this.message.classList.remove('show-flex');
    document.getElementById('card').classList.remove('hide');
  }

  isLock() {
    return this.cardRemove.classList.contains('lock-element');
  }

  isShow(word) {
    if (!this.cardShow.classList.contains('lock-element')) {
      if (this.settings.langEn) {
        this.input.value = word.word;
      } else {
        this.input.value = word.wordTranslate;
      }
      this.cardCorrect.innerHTML = '';
      this.cardCorrect.classList.remove('opacity-correct');
      return true;
    }
    return false;
  }

  moveToLeft(state) {
    this.input.setAttribute('readonly', 'readonly');
    this.input.classList.add('correct-color');
    this.cardAgain.classList.remove('lock-element');
    this.cardCorrect.innerHTML = '';
    this.cardCorrect.classList.remove('opacity-correct');
    this.cardRemove.classList.remove('lock-element');
    this.cardShow.classList.add('lock-element');
    this.cardDiff.classList.remove('lock-element');
    this.setInDictionary(state);
  }

  lockArrows(lock) {
    if (lock) {
      this.rightArrow.classList.add('lock-arrow');
      this.leftArrow.classList.add('lock-arrow');
    } else {
      this.rightArrow.classList.remove('lock-arrow');
      this.leftArrow.classList.remove('lock-arrow');
    }
  }

  lockElements(lock) {
    if (lock) {
      this.card.classList.add('lock-elements');
      this.rightArrow.classList.add('lock-arrow');
      this.leftArrow.classList.add('lock-arrow');
    } else {
      this.rightArrow.classList.remove('lock-arrow');
      this.leftArrow.classList.remove('lock-arrow');
      this.card.classList.remove('lock-elements');
    }
  }

  clearCard() {
    this.cardRemove.classList.remove('lock-element');
    this.cardShow.classList.remove('lock-element');
    Array.from(this.interval.children).forEach((item) => item.classList.remove('custom-rating'));
    this.interval.classList.remove('visibility');
    this.cardMeaningTranslation.innerHTML = '';
    this.cardExampleTranslation.innerHTML = '';
    this.cardMeaning.innerHTML = '';
    this.cardExample.innerHTML = '';
    this.translationWord.innerHTML = '';
    this.transcriptionWord.innerHTML = '';
    this.cardPlay.classList.remove('show');
    this.cardAgain.classList.remove('lock-element');
    this.cardDiff.classList.remove('custom-rating');
    this.cardRemove.classList.remove('custom-rating');
    this.rightArrow.classList.remove('go-next');
    this.leftArrow.classList.remove('lock-element');
    this.input.removeAttribute('readonly');
    this.input.classList.remove('correct-color');
    this.input.value = '';
    this.input.focus();
  }

  createSettings() {
    this.settingsBlock.classList.add('settings-card');
    const content = `<h2 class="settings__title">Настройки</h2>
    <div class="setting-block">
      <div class="setting-block__list-card">
        <div class="setting-block__item-card">
          <label for="maxWords" id="lab1" class="setting-block__label">Всего слов:</label>
          <input type="number" id="maxWords" value="25" min="3" max="100"  class="settings__raido-card"/>
        </div>
        <div class="setting-block__item-card">
          <label for="newWords" id="lab2" class="setting-block__label">Новые слова:</label>
          <input type="number" id="newWords" value="15" min="0" max="100" class="settings__raido-card"/>
        </div>
      </div>
      <div class="setting-block__list-card">
        <div class="setting-block__item-card">
          <input type="radio" id="langEn" name="lang" checked="checked"  class="settings__checkbox"/>
          <label for="langEn">Английские слова</label>
        </div>
        <div class="setting-block__item-card">
          <input type="radio" id="langRu" name="lang" class="settings__checkbox"/>
          <label for="langRu">Русские слова</label>
        </div>
      </div>

      <div class="setting-block__title">Настройка карточек</div>

      <div class="setting-block__list-card">
        <div>
          <div class="setting-block__item-card">
            <input type="checkbox" id="meaningWord" checked class="settings__checkbox"/>
            <label for="meaningWord">Значение слова</label>
          </div>
          <div class="setting-block__item-card">
            <input type="checkbox" id="exampleWord" checked class="settings__checkbox" />
            <label for="exampleWord">Пример слова</label>
          </div>
          <div class="setting-block__item-card">
            <input type="checkbox" id="translate" checked  class="settings__checkbox"/>
            <label for="translate">Перевод слова</label>
          </div>
          </div>
          <div>
          <div class="setting-block__item-card">
            <input type="checkbox" id="meaningWordTransl" checked class="settings__checkbox"/>
            <label for="meaningWord">Перевод значения</label>
          </div>
          <div class="setting-block__item-card">
            <input type="checkbox" id="exampleWordTransl" checked class="settings__checkbox" />
            <label for="exampleWord">Перевод примера</label>
          </div>
          <div class="setting-block__item-card">
            <input type="checkbox" id="transcription" class="settings__checkbox" checked />
            <label for="transcription">Транскрипция</label>
          </div>
          <div class="setting-block__item-card">
            <input type="checkbox" id="imgWord" class="settings__checkbox" checked />
            <label for="imgWord">Картинка</label>
          </div>
          </div>
        </div>
      </div>

      <div class="setting-block__title">Режим</div>
      <div class="setting-block__list-card">
        <div>
          <div class="setting-block__item-card">
            <input type="checkbox" id="interval" class="settings__checkbox" checked />
            <label for="interval">Интервальное повторение</label>
          </div>
        </div>
        <div>
          <div class="setting-block__item-card">
            <input type="checkbox" id="sound" checked class="settings__checkbox" />
            <label for="sound">Воспроизведение звука</label>
          </div>
          <div class="setting-block__item-card">
            <input type="checkbox" id="nextCard" checked class="settings__checkbox" />
            <label for="nextCard">Быстрый переход</label>
          </div>
        </div>
      </div>

      <div class="setting-block__title">Дополнительные подсказки</div>
      <div class="setting-block__list-card">
        <div class="setting-block__item-card">
          <input type="checkbox" id="numberLetters" class="settings__checkbox" checked />
          <label for="numberLetters">Показать количество букв</label>
        </div>
        <div class="setting-block__item-card">
          <input type="checkbox" id="showAnswer" class="settings__checkbox" checked />
          <label for="showAnswer">Показать слово</label>
        </div>
      </div>

      <div class="setting-block__title">Добавление в словарь</div>
      <div class="setting-block__list-card">
        <div class="setting-block__item-card">
          <input type="checkbox" id="difficultWord" class="settings__checkbox" checked />
          <label for="difficultWord">Сложное слово</label>
        </div>
        <div class="setting-block__item-card">
          <input type="checkbox" id="removeWord" class="settings__checkbox" checked />
          <label for="removeWord">Удалить слово</label>
        </div>
      </div>
    </div>`;
    this.settingsBlock.innerHTML = content;
  }
}
