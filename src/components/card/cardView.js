// import defImg from '@/assets/img/default.jpg';
import { createElement } from '@/utils';
import { urlGitHub } from '@/constants';

export default class CardView {
  constructor() {
    this.card = document.getElementById('main');
    this.currentMistake = false;
    this.next = false;
    this.settings = null; // = localStorage.getItem('settings');
  }

  renderHTML() {
    document.body.className = 'body show-main';
    this.setSettings();
    // if (this.settings) {
    //   this.setSettings();
    // } else {
    //   this.getSettings();
    // }
    this.card.append(this.createCard());
    this.card.append(this.endTraining());
  }

  createCard() {
    const card = createElement({ tag: 'section', class: 'card', id: 'card' });
    const playBtn = createElement({ tag: 'button', class: 'card__play', id: 'cardPlay' });
    const img = createElement({ tag: 'img', class: 'card__img', id: 'cardImg' });
    // img.src = defImg;
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
    this.cardRemove = createElement({ tag: 'button', id: 'cardRemove', content: 'Remove' });
    this.cardDiff = createElement({ tag: 'button', id: 'cardDifficult', content: 'Difficult' });
    this.cardDiff.classList.add('lock-element');
    const showBtn = createElement({ tag: 'button', id: 'cardShow', content: 'Show the answer' });
    answer.append(this.cardRemove);
    answer.append(this.cardDiff);
    answer.append(showBtn);

    this.interval = createElement({ tag: 'div', class: 'card__interval', id: 'intervalBtns' });
    const againBtn = createElement({ tag: 'button', id: 'cardAgain', content: 'Again' });
    this.cardHard = createElement({ tag: 'button', id: 'cardHard', content: 'Hard' });
    this.cardNormal = createElement({ tag: 'button', id: 'cardNormal', content: 'Normal' });
    this.cardEasy = createElement({ tag: 'button', id: 'cardEasy', content: 'Easy' });
    this.interval.append(againBtn);
    this.interval.append(this.cardHard);
    this.interval.append(this.cardNormal);
    this.interval.append(this.cardEasy);

    const wrapRange = createElement({ tag: 'div', class: 'card__range' });
    this.firstNumber = createElement({ tag: 'span', id: 'firstNumber' });
    const secondNumber = createElement({ tag: 'span', id: 'secondNumber' });
    const range = createElement({ tag: 'progress', id: 'rangeWords' });
    range.setAttribute('value', 0);
    wrapRange.append(this.firstNumber);
    wrapRange.append(range);
    wrapRange.append(secondNumber);

    this.leftArrow = createElement({ tag: 'button', class: 'card__left', id: 'cardLeft' });
    this.rightArrow = createElement({ tag: 'button', class: 'card__right', id: 'cardRight' });
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
    wrapCard.append(this.interval);
    wrapCard.append(wrapRange);
    card.append(this.leftArrow);
    card.append(wrapCard);
    card.append(this.rightArrow);
    this.input.focus();
    return card;
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
      tag: 'button', class: 'finished__btn', id: 'addition', content: 'Учить ещё',
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
    // проверка на изменение only new / only repeat ...
    this.settings = {};
    this.getCheckRadio('listType');
    this.getCheckRadio('lang');
    const checkBoxes = document.querySelectorAll('[type=checkbox]');
    Array.from(checkBoxes).forEach((item) => {
      this.settings[item.id] = item.checked;
    });
    this.settings.newWords = document.getElementById('newWords').value;
    this.settings.maxWords = document.getElementById('maxWords').value;
    if (+this.settings.maxWords < 3) {
      document.getElementById('maxWords').value = '3';
      this.settings.maxWords = '3';
    }
    if (+this.settings.maxWords > 300) {
      document.getElementById('maxWords').value = '300';
      this.settings.maxWords = '300';
    }
    if (+this.settings.newWords < 0) {
      document.getElementById('newWords').value = '0';
      this.settings.newWords = '0';
    }
    if (+this.settings.newWords > +this.settings.maxWords) {
      document.getElementById('newWords').value = this.settings.maxWords;
      this.settings.newWords = this.settings.maxWords;
    }
    if (+this.settings.newWords > 100) {
      document.getElementById('newWords').value = '100';
      this.settings.newWords = '100';
    }
    if (newW && maxW && (newW !== this.settings.newWords || maxW !== this.settings.maxWords)) {
      return true;
    }
    // localStorage.setItem('settings', JSON.stringify(this.settings));
    return false;
  }

  setSettings() {
    const keys = Object.keys(this.settings);
    keys.forEach((item) => {
      document.getElementById(item).checked = this.settings[item];
    });
    document.getElementById('newWords').value = this.settings.newWords;
    document.getElementById('maxWords').value = this.settings.maxWords;
  }

  setWordInCard(next, numberWords, passedTodaY, word, cardIndeX, notPrev = true) {
    let passedToday = passedTodaY;
    let cardIndex = cardIndeX;
    if (document.getElementById('maxWords').value === passedToday) {
      document.getElementById('card').classList.add('hide');
      document.getElementById('message').classList.add('show-flex');
    } else {
      // this.next и currentMistake вероятно лишние.
      if (next && !this.next) cardIndex += 1;
      this.currentMistake = false;
      this.setDataInCard(word, cardIndex, passedToday);
      if (notPrev) passedToday = this.changeRange(false, passedToday, numberWords);
      this.next = false;
    }
    return [cardIndex, passedToday, this.next];
  }

  setDataInCard(word, cardIndex, passedToday) {
    if (this.settings.numberLetters && cardIndex === passedToday) {
      if (this.settings.langEn) {
        this.input.setAttribute('maxlength', word.word.length);
        this.incorrectWord('', '*'.repeat(word.word.length));
      } else {
        this.input.setAttribute('maxlength', word.wordTranslate.length);
        this.incorrectWord('', '*'.repeat(word.wordTranslate.length));
      }
    } else {
      const correct = document.getElementById('cardCorrect');
      correct.innerHTML = '';
      correct.classList.remove('opacity-correct');
      this.input.setAttribute('maxlength', 80);
    }

    const image = `${urlGitHub}${word.image.replace('files/', '')}`;
    document.getElementById('cardImg').src = image;
    if (this.settings.langEn) {
      document.getElementById('cardMeaning').innerHTML = this.replace(
        word.word, word.textMeaning, cardIndex, passedToday,
      );
      document.getElementById('cardExample').innerHTML = this.replace(
        word.word, word.textExample, cardIndex, passedToday,
      );
      document.getElementById('translationWord').innerHTML = word.wordTranslate;
    } else {
      document.getElementById('cardMeaning').innerHTML = this.replace(
        word.wordTranslate, word.textMeaningTranslate, cardIndex, passedToday,
      );
      document.getElementById('cardExample').innerHTML = this.replace(
        word.wordTranslate, word.textExampleTranslate, cardIndex, passedToday,
      );
      document.getElementById('translationWord').innerHTML = word.word;
    }
    this.setSettingsInCard(word);
  }

  replace(word, text, cardIndex, passedToday) {
    const words = text.split(' ');
    let compare;
    if (word.length > 5) {
      compare = word.slice(0, word.length - 4).toLowerCase();
    } else {
      compare = word.slice(0, word.length - 2).toLowerCase();
    }
    for (let i = 0; i < words.length; i += 1) {
      if (words[i].toLowerCase().startsWith(compare)
        || words[i].includes('<i>')
        || words[i].includes('<b>')
      ) {
        words[i] = words[i].replace(/(<([^>]+)>)/gi, '');
        if (this.settings.numberLetters && cardIndex === passedToday) {
          words[i] = String('*').repeat(words[i].length);
        } else {
          words[i] = String('*').repeat(3);
        }
      }
    }
    return words.join(' ');
  }

  setAnswerInCard(word, currentMistake, prev) {
    document.getElementById('transcriptionWord').innerHTML = word.transcription;
    if (currentMistake) {
      document.getElementById('cardAgain').classList.add('lock-element');
    }
    if (this.settings.langEn) {
      this.input.value = word.word;
      document.getElementById('cardMeaning').innerHTML = word.textMeaning;
      document.getElementById('cardExample').innerHTML = word.textExample;
      const meaning = word.textMeaningTranslate;
      document.getElementById('cardMeaningTranslation').innerHTML = meaning;
      const example = word.textExampleTranslate;
      document.getElementById('cardExampleTranslation').innerHTML = example;
    } else {
      this.input.value = word.wordTranslate;
      document.getElementById('cardMeaning').innerHTML = word.textMeaningTranslate;
      document.getElementById('cardExample').innerHTML = word.textExampleTranslate;
      const meaning = word.textMeaning;
      document.getElementById('cardMeaningTranslation').innerHTML = meaning;
      const example = word.textExample;
      document.getElementById('cardExampleTranslation').innerHTML = example;
    }
    this.setSettingsInCard(word, false, false, false, prev);
    document.getElementById('cardPlay').classList.add('show');
    if (prev) {
      this.rightArrow.classList.add('go-next');
    } else {
      setTimeout(() => this.rightArrow.classList.add('go-next'), 500);
    }
  }

  setSettingsInCard(word, cardIndex, passedToday, change, prev) {
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
    if (this.settings.imgWord) {
      document.getElementById('cardImg').classList.remove('hide');
    } else {
      document.getElementById('cardImg').classList.add('hide');
    }
    if (this.settings.meaningWord) {
      document.getElementById('cardMeaning').classList.remove('hide-text');
    } else {
      document.getElementById('cardMeaning').classList.add('hide-text');
    }
    if (this.settings.exampleWord) {
      document.getElementById('cardExample').classList.remove('hide-text');
    } else {
      document.getElementById('cardExample').classList.add('hide-text');
    }
    if (this.settings.transcription) {
      document.getElementById('transcriptionWord').classList.remove('hide-text');
    } else {
      document.getElementById('transcriptionWord').classList.add('hide-text');
    }
    if (this.settings.translate) {
      document.getElementById('translationWord').classList.remove('hide-text');
    } else {
      document.getElementById('translationWord').classList.add('hide-text');
    }
    if (this.settings.meaningWord) {
      document.getElementById('cardMeaningTranslation').classList.remove('hide-text');
    } else {
      document.getElementById('cardMeaningTranslation').classList.add('hide-text');
    }
    if (this.settings.exampleWord) {
      document.getElementById('cardExampleTranslation').classList.remove('hide-text');
    } else {
      document.getElementById('cardExampleTranslation').classList.add('hide-text');
    }

    if (change) {
      const hideAnswer = this.rightArrow.classList.contains('go-next') || prev;
      if (hideAnswer) {
        if (this.settings.langEn) {
          this.input.value = word.word;
        } else {
          this.input.value = word.wordTranslate;
        }
      }
      if (this.settings.langEn) {
        if (hideAnswer) {
          document.getElementById('cardMeaning').innerHTML = word.textMeaning;
          document.getElementById('cardExample').innerHTML = word.textExample;
        } else {
          document.getElementById('cardMeaning').innerHTML = this.replace(
            word.word, word.textMeaning, cardIndex, passedToday,
          );
          document.getElementById('cardExample').innerHTML = this.replace(
            word.word, word.textExample, cardIndex, passedToday,
          );
        }
        document.getElementById('translationWord').innerHTML = word.wordTranslate;
      } else {
        if (hideAnswer) {
          document.getElementById('cardMeaning').innerHTML = word.textMeaningTranslate;
          document.getElementById('cardExample').innerHTML = word.textExampleTranslate;
        } else {
          document.getElementById('cardMeaning').innerHTML = this.replace(
            word.wordTranslate, word.textMeaningTranslate, cardIndex, passedToday,
          );
          document.getElementById('cardExample').innerHTML = this.replace(
            word.wordTranslate, word.textExampleTranslate, cardIndex, passedToday,
          );
        }
        document.getElementById('translationWord').innerHTML = word.word;
      }
      if (this.settings.numberLetters && !hideAnswer) {
        if (this.settings.langEn) {
          this.input.setAttribute('maxlength', word.word.length);
          this.incorrectWord('', '*'.repeat(word.word.length));
        } else {
          this.input.setAttribute('maxlength', word.wordTranslate.length);
          this.incorrectWord('', '*'.repeat(word.wordTranslate.length));
        }
      } else {
        const correct = document.getElementById('cardCorrect');
        correct.innerHTML = '';
        correct.classList.remove('opacity-correct');
        this.input.setAttribute('maxlength', 80);
      }
    }
    this.input.focus();
  }

  blockButtons(customRating) {
    this.input.setAttribute('readonly', 'readonly');
    this.input.classList.add('correct-color');
    document.getElementById('cardShow').classList.add('lock-element');
    document.getElementById('cardRemove').classList.add('lock-element');
    document.getElementById('cardDifficult').classList.remove('lock-element');
    if (this.settings.interval) {
      document.getElementById('intervalBtns').classList.add('show-flex');
      if (customRating) {
        this.setCustomRating(customRating);
      }
    }
  }

  changeRange(next, passedTodaY, numberWords) {
    let passedToday = passedTodaY;
    if (next) passedToday += 1;
    this.firstNumber.innerHTML = passedToday;
    document.getElementById('secondNumber').innerHTML = numberWords;
    const range = document.getElementById('rangeWords');
    range.setAttribute('min', 0);
    range.setAttribute('max', numberWords);
    range.value = passedToday;
    return passedToday;
  }

  inputTodayStatistics(passed, incorr, corr, newWords, consecutive) {
    document.getElementById('card').classList.add('hide');
    this.message.classList.add('show-flex');
    document.getElementById('statCount').innerHTML = passed;
    if (incorr + corr > 0) {
      document.getElementById('statCorrect')
        .innerHTML = `${Math.floor((corr / (incorr + corr)) * 100)}%`;
    }
    document.getElementById('statNewWords').innerHTML = newWords;
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
    const correct = document.getElementById('cardCorrect');
    correct.innerHTML = text;
    setTimeout(() => correct.classList.add('opacity-correct'), 2000);
  }

  setCustomRating(customRating) {
    Array.from(this.interval.children).forEach((item) => item.classList.remove('custom-rating'));
    if (customRating === 1) {
      this.cardHard.classList.add('custom-rating');
    } else if (customRating === 3) {
      this.cardNormal.classList.add('custom-rating');
    } else if (customRating === 5) {
      this.cardEasy.classList.add('custom-rating');
    }
  }

  nextCard() {
    this.message.classList.remove('show-flex');
    document.getElementById('card').classList.remove('hide');
  }

  changeMark() {
    this.cardDiff.classList.toggle('lock-element');
    const lock = this.cardDiff.classList.contains('lock-element');
    if (lock) {
      this.setCustomRating(1);
    } else {
      this.setCustomRating();
    }
    return lock;
  }

  isLock() {
    return this.cardRemove.classList.contains('lock-element');
  }

  isShow(word) {
    if (!document.getElementById('cardShow').classList.contains('lock-element')) {
      if (this.settings.langEn) {
        this.input.value = word.word;
      } else {
        this.input.value = word.wordTranslate;
      }
      const cardCorrect = document.getElementById('cardCorrect');
      cardCorrect.innerHTML = '';
      cardCorrect.classList.remove('opacity-correct');
      return true;
    }
    return false;
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

  lockArrows(lock) {
    if (lock) {
      this.rightArrow.classList.add('lock-btn');
      this.leftArrow.classList.add('lock-btn');
    } else {
      this.rightArrow.classList.remove('lock-btn');
      this.leftArrow.classList.remove('lock-btn');
    }
  }

  clearCard() {
    this.rightArrow.classList.remove('go-next');
    document.getElementById('cardRemove').classList.remove('lock-element');
    document.getElementById('cardShow').classList.remove('lock-element');
    document.getElementById('cardDifficult').classList.add('lock-element');
    Array.from(this.interval.children).forEach((item) => item.classList.remove('custom-rating'));
    document.getElementById('intervalBtns').classList.remove('show-flex');
    document.getElementById('cardMeaningTranslation').innerHTML = '';
    document.getElementById('cardExampleTranslation').innerHTML = '';
    document.getElementById('cardMeaning').innerHTML = '';
    document.getElementById('cardExample').innerHTML = '';
    document.getElementById('translationWord').innerHTML = '';
    document.getElementById('transcriptionWord').innerHTML = '';
    document.getElementById('cardPlay').classList.remove('show');
    this.leftArrow.classList.remove('lock-element');
    this.input.removeAttribute('readonly');
    this.input.classList.remove('correct-color');
    this.input.value = '';
    this.input.focus();
  }
}
