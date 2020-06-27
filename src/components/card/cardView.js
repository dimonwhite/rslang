import { createElement } from '@/utils';
import { urlGitHub } from '@/constants';

export default class CardView {
  constructor() {
    this.card = document.getElementById('main');
    this.data = [];
    this.listToday = [];
    this.cardIndex = 0;
    this.nextNewWord = 0;
    this.consecutive = 0;
    this.newConsecutive = 0;
    this.newWordsToday = 0;
    this.correctAnswer = 0;
    this.incorrectAnswer = 0;
    this.currentMistake = false;
    this.next = false;
    this.settings = localStorage.getItem('settings');
  }

  renderHTML() {
    if (this.settings) {
      this.setSettings();
    } else {
      this.getSettings();
    }
    this.createCard();
    this.endTraining();
  }

  createCard() {
    const card = createElement({ tag: 'section', class: 'card', id: 'card' });
    const playBtn = createElement({ tag: 'button', class: 'card__play', id: 'cardPlay' });
    const img = createElement({ tag: 'img', class: 'card__img', id: 'cardImg' });
    img.src = '/src/assets/img/default.png';
    const explanation = createElement({ tag: 'p', id: 'cardMeaning' });
    const translation = createElement({ tag: 'p', id: 'cardMeaningTranslation' });
    const sentence = createElement({ tag: 'p', id: 'cardExample' });
    const sentenceTranslation = createElement({ tag: 'p', id: 'cardExampleTranslation' });
    const input = createElement({ tag: 'div', class: 'card__input', id: 'cardInput' });
    this.input = createElement({ tag: 'input', class: 'card__input-item', id: 'inputWord' });
    this.input.setAttribute('type', 'text');
    const correctText = createElement({ tag: 'span', class: 'card__input-correct', id: 'cardCorrect' });
    input.append(this.input);
    input.append(correctText);

    const wrapTranslation = createElement({ tag: 'div', class: 'card__translation' });
    const spanTranslation = createElement({ tag: 'span', id: 'translationWord' });
    const spanTranscription = createElement({ tag: 'span', id: 'transcriptionWord' });
    wrapTranslation.append(spanTranslation);
    wrapTranslation.append(spanTranscription);

    const answer = createElement({ tag: 'div', class: 'card__answer' });
    const removeBtn = createElement({ tag: 'button', id: 'cardRemove', content: 'Remove' });
    const difficultBtn = createElement({ tag: 'button', id: 'cardDifficult', content: 'Difficult' });
    const showBtn = createElement({ tag: 'button', id: 'cardShow', content: 'Show the answer' });
    answer.append(removeBtn);
    answer.append(difficultBtn);
    answer.append(showBtn);

    const interval = createElement({ tag: 'div', class: 'card__interval', id: 'intervalBtns' });
    const againBtn = createElement({ tag: 'button', id: 'cardAgain', content: 'Again' });
    const hardBtn = createElement({ tag: 'button', id: 'cardHard', content: 'Hard' });
    const goodBtn = createElement({ tag: 'button', id: 'cardNormal', content: 'Normal' });
    const easyBtn = createElement({ tag: 'button', id: 'cardEasy', content: 'Easy' });
    interval.append(againBtn);
    interval.append(hardBtn);
    interval.append(goodBtn);
    interval.append(easyBtn);

    const wrapRange = createElement({ tag: 'div', class: 'card__range' });
    this.firstNumber = createElement({ tag: 'span', id: 'firstNumber' });
    const secondNumber = createElement({ tag: 'span', id: 'secondNumber' });
    const range = createElement({ tag: 'progress', id: 'rangeWords' });
    range.setAttribute('value', 0);
    wrapRange.append(this.firstNumber);
    wrapRange.append(range);
    wrapRange.append(secondNumber);

    this.buttonLeft = createElement({ tag: 'button', class: 'card__left', id: 'cardLeft' });
    this.buttonRight = createElement({ tag: 'button', class: 'card__right', id: 'cardRight' });
    const wrapCard = createElement({ tag: 'div', class: 'card__wrapper' });

    wrapCard.append(playBtn);
    wrapCard.append(img);
    wrapCard.append(explanation);
    wrapCard.append(translation);
    wrapCard.append(sentence);
    wrapCard.append(sentenceTranslation);
    wrapCard.append(input);
    wrapCard.append(wrapTranslation);
    wrapCard.append(answer);
    wrapCard.append(interval);
    wrapCard.append(wrapRange);
    card.append(this.buttonLeft);
    card.append(wrapCard);
    card.append(this.buttonRight);
    this.card.append(card);
    this.card.append(this.endTraining());
    this.input.focus();
  }

  endTraining() {
    this.message = createElement({ tag: 'section', class: 'finished', id: 'message' });
    const message = createElement({ tag: 'h3', class: 'finished__message', content: 'План на сегодня выполнен!' });
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
      tag: 'button', class: 'finished__btn', id: 'addition', content: 'Учить ещё',
    });
    statistics.append(wrapCount);
    statistics.append(wrapCorrect);
    statistics.append(wrapNew);
    statistics.append(wrapLong);
    this.message.append(message);
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
    this.settings = {};
    this.getCheckRadio('listType');
    const checkBoxes = document.querySelectorAll('[type=checkbox]');
    Array.from(checkBoxes).forEach((item) => {
      this.settings[item.id] = item.checked;
    });
    this.settings.newWords = document.getElementById('newWords').value;
    this.settings.maxWords = document.getElementById('maxWords').value;
    localStorage.setItem('settings', JSON.stringify(this.settings));
  }

  setSettings() {
    this.settings = JSON.parse(this.settings);
    const keys = Object.keys(this.settings);
    keys.forEach((item) => {
      document.getElementById(item).checked = this.settings[item];
    });
    document.getElementById('newWords').value = this.settings.newWords;
    document.getElementById('maxWords').value = this.settings.maxWords;
  }

  showResult() {
    document.getElementById('card').classList.add('hide');
    document.getElementById('message').classList.add('show');
    this.inputTodayStatistics();
  }

  setWordInCard(next, passedTodaY, word, cardIndeX) {
    let passedToday = passedTodaY;
    let cardIndex = cardIndeX;
    if (document.getElementById('maxWords').value === passedToday) {
      document.getElementById('card').classList.add('hide');
      document.getElementById('message').classList.add('show');
    } else {
      const again = document.getElementById('cardAgain').classList.contains('lock-element');
      document.getElementById('cardAgain').classList.remove('lock-element');
      if (next && !again && !this.next) cardIndex += 1;
      this.currentMistake = false;
      if (this.settings.removeWord) {
        document.getElementById('cardRemove').classList.remove('hide');
      } else {
        document.getElementById('cardRemove').classList.add('hide');
      }
      if (this.settings.difficultWord) {
        document.getElementById('cardDifficult').classList.remove('hide');
      } else {
        document.getElementById('cardDifficult').classList.add('hide');
      }
      if (this.settings.showAnswer) {
        document.getElementById('cardShow').classList.remove('hide');
      } else {
        document.getElementById('cardShow').classList.add('hide');
      }
      if (this.settings.numberLetters && cardIndex === passedToday) {
        this.input.setAttribute('maxlength', word.word.length);
        this.incorrectWord('', '*'.repeat(word.word.length));
      } else {
        this.input.setAttribute('maxlength', 80);
      }
      if (this.settings.imgWord) {
        document.getElementById('cardImg').classList.remove('hide');
        const image = `${urlGitHub}${word.image.replace('files/', '')}`;
        document.getElementById('cardImg').src = image;
      } else {
        document.getElementById('cardImg').classList.add('hide');
      }
      if (this.settings.meaningWord) {
        document.getElementById('cardMeaning').innerHTML = word.textMeaning;
      }
      if (this.settings.exampleWord) {
        document.getElementById('cardExample').innerHTML = word.textExample;
      }
      if (this.settings.transcription) {
        document.getElementById('transcriptionWord').innerHTML = word.transcription;
      }
      if (this.settings.translate) {
        document.getElementById('translationWord').innerHTML = word.wordTranslate;
      }
      passedToday = this.changeRange(false, passedToday);
      this.next = false;
    }
    return [cardIndex, passedToday];
  }

  setAnswerInCard(word) {
    this.input.value = word.word;
    if (this.settings.meaningWord) {
      const meaning = word.textMeaningTranslate;
      document.getElementById('cardMeaningTranslation').innerHTML = meaning;
    }
    if (this.settings.exampleWord) {
      const example = word.textExampleTranslate;
      document.getElementById('cardExampleTranslation').innerHTML = example;
    }
    if (this.settings.removeWord) {
      document.getElementById('cardRemove').classList.remove('hide');
    } else {
      document.getElementById('cardRemove').classList.add('hide');
    }
    if (this.settings.difficultWord) {
      document.getElementById('cardDifficult').classList.remove('hide');
    } else {
      document.getElementById('cardDifficult').classList.add('hide');
    }
    if (this.settings.showAnswer) {
      document.getElementById('cardShow').classList.remove('hide');
    } else {
      document.getElementById('cardShow').classList.add('hide');
    }

    document.getElementById('cardPlay').classList.add('show');
    document.getElementById('cardRight').classList.add('go-next');
  }

  blockButtons() {
    this.input.setAttribute('readonly', 'readonly');
    this.input.classList.add('correct-color');
    document.getElementById('cardShow').classList.add('lock-element');
    document.getElementById('cardRemove').classList.add('lock-element');
    document.getElementById('cardDifficult').classList.remove('lock-element');
    if (this.settings.interval) {
      document.getElementById('intervalBtns').classList.add('show-flex');
    }
  }

  changeRange(next, passedTodaY) {
    let passedToday = passedTodaY;
    if (next) passedToday += 1;
    this.firstNumber.innerHTML = passedToday;
    const secondNumber = document.getElementById('maxWords').value;
    document.getElementById('secondNumber').innerHTML = secondNumber;
    const range = document.getElementById('rangeWords');
    range.setAttribute('min', 0);
    range.setAttribute('max', secondNumber);
    range.value = passedToday;
    return passedToday;
  }

  inputTodayStatistics() {
    document.getElementById('statCount').innerHTML = this.passedToday;
    document.getElementById('statCorrect')
      .innerHTML = `${Math.floor((this.correctAnswer / (this.incorrectAnswer + this.correctAnswer)) * 100)}%`;
    document.getElementById('statNewWords').innerHTML = this.newWordsToday;
    document.getElementById('statLong').innerHTML = this.consecutive;
    this.generatedListToday = false;
    this.listToday = [];
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
    const correct = document.getElementById('cardCorrect');
    correct.innerHTML = text;
    setTimeout(() => correct.classList.add('opacity-correct'), 2000);
  }

  moveToLeft() {
    this.input.setAttribute('readonly', 'readonly');
    this.input.classList.add('correct-color');
    const cardCorrect = document.getElementById('cardCorrect');
    cardCorrect.innerHTML = '';
    cardCorrect.classList.remove('opacity-correct');
    document.getElementById('cardRemove').classList.add('lock-element');
    document.getElementById('cardShow').classList.add('lock-element');
    document.getElementById('intervalBtns').classList.remove('show-flex');
    document.getElementById('cardDifficult').classList.remove('lock-element');
  }

  clearCard() {
    document.getElementById('cardRemove').classList.remove('lock-element');
    document.getElementById('cardShow').classList.remove('lock-element');
    document.getElementById('cardDifficult').classList.add('lock-element');
    document.getElementById('intervalBtns').classList.remove('show-flex');
    document.getElementById('cardMeaningTranslation').innerHTML = '';
    document.getElementById('cardExampleTranslation').innerHTML = '';
    // document.getElementById('cardImg').src = './img/default.jpg';
    document.getElementById('cardMeaning').innerHTML = '';
    document.getElementById('cardExample').innerHTML = '';
    document.getElementById('translationWord').innerHTML = '';
    document.getElementById('transcriptionWord').innerHTML = '';
    document.getElementById('cardPlay').classList.remove('show');
    this.input.removeAttribute('readonly');
    this.input.classList.remove('correct-color');
    this.input.value = '';
    this.input.focus();
  }
}
