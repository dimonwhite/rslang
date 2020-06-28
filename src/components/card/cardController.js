import book1 from '@/data/book1';
import book2 from '@/data/book2';
import book3 from '@/data/book3';
import book4 from '@/data/book4';
import book5 from '@/data/book5';
import book6 from '@/data/book6';
import { urlGitHub } from '@/constants';
import CardView from './cardView';
import CardModel from './cardModel';

export default class CardController {
  constructor(user) {
    this.view = new CardView();
    this.model = new CardModel(user);
    this.cardIndex = 0;
    this.passedToday = 0;
    this.nextNewWord = 0;
    this.consecutive = 0;
    this.newConsecutive = 0;
    this.newWordsToday = 0;
    this.correctAnswer = 0;
    this.incorrectAnswer = 0;
    this.currentMistake = false;
    this.next = false;
    this.cut = false;
  }

  create() {
    document.body.className = 'body show-main';
    this.view.renderHTML();
    this.getTodayStatStorage();
    this.generatedListToday = this.model.createList(this.view.settings, this.generatedListToday);
    if (this.model.listToday.length !== this.passedToday) {
      const word = this.model.listToday[this.cardIndex];
      [this.cardIndex, this.passedToday, this.next] = this.view.setWordInCard(
        false, this.passedToday, word, this.cardIndex,
      );
      this.setTodayStatStorage();
    } else {
      this.view.inputTodayStatistics(
        this.passedToday, this.incorrectAnswer, this.correctAnswer,
        this.newWordsToday, this.consecutive,
      );
    }
    this.createEvent();
  }

  getTodayStatStorage() {
    let date = new Date();
    date = `${date.getDate()}${(date.getMonth() + 1)}${date.getFullYear()}`;
    this.checkCreateList = localStorage.getItem('lastDate') === date;
    localStorage.setItem('lastDate', date);
    this.model.listToday = JSON.parse(localStorage.getItem('listToday')) || [];
    if (!this.checkCreateList) {
      this.passedToday = 0;
      this.cardIndex = 0;
      this.newWordsToday = 0;
      this.consecutive = 0;
      this.newConsecutive = 0;
      this.correctAnswer = 0;
      this.incorrectAnswer = 0;
      this.generatedListToday = false;
      this.currentMistake = false;
      this.setTodayStatStorage();
    } else {
      [
        this.passedToday,
        this.cardIndex,
        this.newWordsToday,
        this.consecutive,
        this.newConsecutive,
        this.correctAnswer,
        this.incorrectAnswer,
        this.generatedListToday,
        this.currentMistake,
      ] = (localStorage.getItem('todayTraining') || '0,0,0,0,0,0,0,false,false').split(',').map((item) => {
        if (item === 'false') return false;
        if (item === 'true') return true;
        return +item;
      });
    }
  }

  setTodayStatStorage() {
    localStorage.setItem('todayTraining', [
      this.passedToday,
      this.passedToday,
      this.newWordsToday,
      this.consecutive,
      this.newConsecutive,
      this.correctAnswer,
      this.incorrectAnswer,
      this.generatedListToday,
      this.currentMistake,
    ].join(','));
    localStorage.setItem('listToday', JSON.stringify(this.model.listToday));
  }

  createEvent() {
    document.getElementById('addition').onclick = () => {
      this.view.nextCard();
      this.passedToday = 0;
      this.cardIndex = 0;
      this.newWordsToday = 0;
      this.consecutive = 0;
      this.newConsecutive = 0;
      this.correctAnswer = 0;
      this.incorrectAnswer = 0;
      this.model.clearListToday();
      this.generatedListToday = this.model.createList(this.view.settings, false);
      this.view.setWordInCard(false, 0, this.model.listToday[0], 0);
      this.setTodayStatStorage();
    };
    document.getElementById('cardLeft').onclick = () => {
      if (this.cardIndex > 0) {
        this.setAnswerInCard('left');
        this.view.moveToLeft();
      }
    };
    document.getElementById('cardPlay').onclick = this.playWord.bind(this);
    document.getElementById('inputWord').oninput = () => {
      const cardCorrect = document.getElementById('cardCorrect');
      cardCorrect.innerHTML = '';
      cardCorrect.classList.remove('opacity-correct');
    };
    document.body.onkeydown = (e) => {
      if (e.code === 'Enter') this.eventRight();
    };
    document.getElementById('cardRight').onclick = this.eventRight.bind(this);
    document.getElementById('cardRemove').onclick = this.eventRemove.bind(this);
    document.getElementById('cardDifficult').onclick = this.eventBookmark.bind(this);
    document.getElementById('cardAgain').onclick = this.eventCardAgain.bind(this);
    document.getElementById('cardCorrect').onclick = () => document.getElementById('inputWord').focus();
    document.getElementById('cardShow').onclick = () => {
      if (this.view.isShow(this.model.listToday[this.cardIndex].word)) {
        this.currentMistake = true;
        this.setAnswerInCard(false, true);
        if (this.newConsecutive === this.consecutive) this.consecutive -= 1;
        this.newConsecutive -= 1;
        this.correctAnswer -= 1;
        this.newConsecutive = 0;
        this.incorrectAnswer += 1;
        this.setTodayStatStorage();
      }
    };

    ['cardHard', 'cardNormal', 'cardEasy'].forEach((item, index) => {
      document.getElementById(item).onclick = () => {
        const word = this.model.listToday[this.cardIndex];
        const INTERVAL_FACTOR = (1 + index) * 2 - 1;
        this.model.listToday[this.cardIndex].customRating = INTERVAL_FACTOR;
        this.view.setCustomRating(INTERVAL_FACTOR);
        this.model.updateAllStudyWords(word, false, true, false, false, INTERVAL_FACTOR, 'study');
      };
    });

    document.getElementById('settings').onchange = (e) => {
      if (e.target.tagName === 'INPUT') {
        if (this.view.getSettings()) {
          this.model.createList(this.view.settings, false);
        }
        const word = this.model.listToday[this.cardIndex];
        this.view.setSettingsInCard(word, this.cardIndex, this.passedToday, true);
      }
    };

    const idChecks = ['translate', 'transcription', 'imgWord', 'meaningWord', 'exampleWord'];
    idChecks.forEach((item) => {
      document.getElementById(item).onclick = () => {
        if (idChecks.filter((el) => document.getElementById(el).checked).length < 1) {
          document.getElementById(item).checked = true;
        }
      };
    });
  }

  eventRight() {
    if (document.getElementById('cardRight').classList.contains('go-next')
      && this.cardIndex + 1 === (this.passedToday + Number(this.next))) {
      this.view.clearCard();
      if (this.passedToday === this.model.listToday.length) {
        this.generatedListToday = false;
        this.view.inputTodayStatistics(
          this.passedToday, this.incorrectAnswer, this.correctAnswer,
          this.newWordsToday, this.consecutive,
        );
        this.model.clearListToday();
      } else {
        let nextWord = Number(!this.cut);
        this.cut = false;
        if (this.cardIndex === this.model.listToday.length - 1) nextWord = 0;
        const word = this.model.listToday[this.cardIndex + nextWord];
        [this.cardIndex, this.passedToday, this.next] = this.view.setWordInCard(
          true, this.passedToday, word, this.cardIndex,
        );
      }
    } else if (this.cardIndex === this.passedToday) {
      this.setAnswerInCard(false);
    } else {
      this.setAnswerInCard('right');
    }
  }

  eventRemove() {
    // удалённое слово добавить во вкладку "удалённые слова" в словаре
    // сделать проверку настройки, если указана галочка напротив только повторение,
    // тогда добавлять из списка на повторение и не увеличивать nextNewWord.

    if (!document.getElementById('cardRemove').classList.contains('lock-element')) {
      if (this.model.listToday.length > 0) {
        const removeWord = this.model.listToday.splice(this.cardIndex, 1)[0];
        const INTERVAL_FACTOR = 'clear';
        if (this.model.allStudyWords.find((item) => item.word === removeWord.word)) {
          this.model.updateAllStudyWords(removeWord, false, true, false, false, INTERVAL_FACTOR, 'remove');
        } else {
          this.nextNewWord += 1;
          this.model.updateAllStudyWords(removeWord, true, false, false, false, INTERVAL_FACTOR, 'remove');
        }
        let allWords = [...book1, ...book2, ...book3, ...book4, ...book5, ...book6];
        const userWords = localStorage.getItem('userAllStudyWords');
        let len = 0;
        if (userWords) len = JSON.parse(userWords).length;
        let nextWord = len + this.model.listToday.length;
        nextWord -= this.newWordsToday;
        this.model.listToday.push(allWords[nextWord]);
        const word = this.model.listToday[this.passedToday];
        allWords = null;
        this.view.setWordInCard(false, this.passedToday, word, this.passedToday);
        this.setTodayStatStorage();
      }
    }
  }

  eventBookmark() {
    let mark;
    let customRating;
    if (this.view.changeMark()) {
      customRating = 1;
      mark = 'difficult';
    } else {
      customRating = 'clear';
      mark = 'study';
    }
    const word = this.model.listToday[this.cardIndex];
    if (this.model.allStudyWords.find((item) => item.word === word.word.toLowerCase())) {
      this.model.updateAllStudyWords(word, false, true, false, false, customRating, mark);
    } else {
      this.model.updateAllStudyWords(word, true, false, false, false, customRating, mark);
    }
  }

  eventCardAgain() {
    if (!document.getElementById('cardAgain').classList.contains('lock-element')) {
      document.getElementById('cardAgain').classList.add('lock-element');
      const cutWord = this.model.listToday.splice(this.cardIndex, 1)[0];
      this.model.listToday.push(cutWord);
      this.passedToday -= 1;
      this.next = true;
      this.cut = true;
      this.view.changeRange(false, this.passedToday);
      this.setTodayStatStorage();
    }
  }

  setAnswerInCard(prev, mistake = false) {
    if (prev === 'left') {
      this.cardIndex -= 1;
      const word = this.model.listToday[this.cardIndex];
      [this.cardIndex, this.passedToday, this.next] = this.view.setWordInCard(
        false, this.passedToday, word, this.cardIndex,
      );
    } else if (prev === 'right') {
      this.cardIndex += 1;
      const word = this.model.listToday[this.cardIndex];
      [this.cardIndex, this.passedToday, this.next] = this.view.setWordInCard(
        false, this.passedToday, word, this.cardIndex,
      );
    }

    const answer = this.view.input.value.toLowerCase();
    const word = this.model.listToday[this.cardIndex];
    let showAnswer;
    if (this.view.settings.langEn) {
      word.word = word.word.toLowerCase();
      showAnswer = (answer === word.word);
    } else {
      word.wordTranslate = word.wordTranslate.toLowerCase();
      showAnswer = (answer === word.wordTranslate);
    }

    if (showAnswer || prev) {
      this.view.setAnswerInCard(word, this.currentMistake);
      if (showAnswer) {
        if (this.view.settings.sound) {
          this.playWord();
        }
        const { customRating } = this.model.listToday[this.cardIndex];
        this.view.blockButtons(customRating);
        this.newConsecutive += 1;
        this.correctAnswer += 1;
        if (this.newConsecutive > this.consecutive) this.consecutive = this.newConsecutive;
        if (this.model.allStudyWords.find((item) => item.word === answer) && !prev) {
          this.model.updateAllStudyWords(word, false, true, true, mistake);
        } else {
          this.newWordsToday += 1;
          this.model.updateAllStudyWords(word, true, false, true, mistake, false, 'study');
        }
        if (!this.currentMistake) {
          this.passedToday = this.view.changeRange(true, this.passedToday);
        } else if (this.model.listToday.length !== this.cardIndex + 1) {
          const cutWord = this.model.listToday.splice(this.cardIndex, 1)[0];
          this.model.listToday.push(cutWord);
          this.cut = true;
        }
        if (this.currentMistake) {
          this.next = true;
          this.view.next = true;
        }
        this.currentMistake = false;
      }
    } else {
      this.currentMistake = true;
      this.newConsecutive = 0;
      this.incorrectAnswer += 1;
      if (this.model.allStudyWords.find((item) => item.word === word.word) && !prev) {
        this.model.updateAllStudyWords(word, false, true, true, true);
      } else {
        this.newWordsToday += 1;
        this.model.updateAllStudyWords(word, true, false, true, true, false, 'study');
      }
      if (this.view.settings.langEn) {
        this.view.incorrectWord(answer, word.word);
      } else {
        this.view.incorrectWord(answer, word.wordTranslate);
      }
    }
    this.setTodayStatStorage();
  }

  // updateAllStudyWords(word, isNew, isUpdate, isCount, mistake, customRating, state) {
  //   const DAY_INTERVAL = 5;
  //   const DAY = 60 * 60 * 24 * 1000;
  //   if (isNew) {
  //     if (!word.translation) word.translation = word.wordTranslate;
  //     word.count = (isCount) ? 1 : 0;
  //     word.mistakes = Number(mistake);
  //     word.state = state; // study|difficult|remove
  //     word.customRating = customRating; // undefine|complexity|normal|easy (false|1|3|5)
  //     if (isCount || mistake) {
  //       word.rating = this.getRating(word.count, word.mistakes);
  //     } else {
  //       const MAX_RATING = 5;
  //       word.rating = MAX_RATING;
  //     }
  //     word.lastTime = new Date().getTime();

  //     if (customRating) {
  //       word.nextTime = word.lastTime + customRating * DAY * DAY_INTERVAL;
  //     } else {
  //       word.nextTime = word.lastTime + word.rating * DAY * DAY_INTERVAL;
  //     }
  //     this.allStudyWords.push(word);
  //   } else if (isUpdate) {
  //     const index = this.allStudyWords.findIndex((item) => item.word === word.word);
  //     if (isCount) this.allStudyWords[index].count += 1;
  //     if (mistake) this.allStudyWords[index].mistakes += 1;
  //     if (state) this.allStudyWords[index].state = state;
  //     if (customRating === 'clear') {
  //       this.allStudyWords[index].customRating = false;
  //     } else if (customRating) {
  //       this.allStudyWords[index].customRating = customRating;
  //     }
  //     const counts = this.allStudyWords[index].count;
  //     const { mistakes } = this.allStudyWords[index];
  //     this.allStudyWords[index].rating = this.getRating(counts, mistakes);
  //     this.allStudyWords[index].lastTime = new Date().getTime();

  //     if (this.allStudyWords[index].customRating) {
  //       const delta = this.allStudyWords[index].customRating * DAY * DAY_INTERVAL;
  //       this.allStudyWords[index].nextTime = this.allStudyWords[index].lastTime + delta;
  //     } else {
  //       const delta = this.allStudyWords[index].rating * DAY * DAY_INTERVAL;
  //       this.allStudyWords[index].nextTime = this.allStudyWords[index].lastTime + delta;
  //     }
  //   }
  //   localStorage.setItem('userAllStudyWords', JSON.stringify(this.allStudyWords));
  //   localStorage.setItem('listToday', JSON.stringify(this.model.listToday));
  // }

  // getRating(count, mistakes) {
  //   let rating = 1;
  //   try {
  //     const correctPercent = (1 - mistakes / count) * 100;
  //     if (correctPercent >= 20 && correctPercent < 40) {
  //       rating = 2;
  //     } else if (correctPercent >= 40 && correctPercent < 65) {
  //       rating = 3;
  //     } else if (correctPercent >= 65 && correctPercent < 90) {
  //       rating = 4;
  //     } else if (correctPercent >= 90) rating = 5;
  //   } catch (error) {
  //     this.error = error.message;
  //   }
  //   return rating;
  // }

  playWord() {
    const word = this.model.listToday[this.cardIndex];
    const playWord = new Audio();
    playWord.src = `${urlGitHub}${word.audio.replace('files/', '')}`;
    const playMeaning = new Audio();
    playMeaning.src = `${urlGitHub}${word.audioMeaning.replace('files/', '')}`;
    const playExample = new Audio();
    playExample.src = `${urlGitHub}${word.audioExample.replace('files/', '')}`;
    playWord.play();
    playWord.onended = () => {
      if (this.view.settings.meaningWord) {
        playMeaning.play();
      } else if (this.view.settings.exampleWord) {
        playExample.play();
      }
    };
    playMeaning.onended = () => {
      if (this.view.settings.exampleWord) {
        playExample.play();
      }
    };
  }
}
