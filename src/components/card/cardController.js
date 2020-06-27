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
    this.data = [];
    this.listToday = [];
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
    this.allStudyWords = [];
  }

  create() {
    document.body.className = 'body show-main';
    this.view.renderHTML();
    this.getTodayStatStorage();
    this.model.createList(this.view.settings);
    if (this.model.listToday.length !== this.passedToday) {
      const word = this.model.listToday[this.cardIndex];
      [this.cardIndex, this.passedToday] = this.view.setWordInCard(
        false, this.passedToday, word, this.cardIndex,
      );
      this.setTodayStatStorage();
    } else {
      this.view.showResult();
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
      document.getElementById('message').classList.remove('show');
      document.getElementById('card').classList.remove('hide');
      document.getElementById('intervalBtns').classList.add('show-flex');
      this.passedToday = 0;
      this.cardIndex = 0;
      this.newWordsToday = 0;
      this.consecutive = 0;
      this.newConsecutive = 0;
      this.correctAnswer = 0;
      this.incorrectAnswer = 0;
      this.generatedListToday = false;
      this.listToday = [];
      this.createList();
      this.setWordInCard();
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
    document.getElementById('cardDifficult').onclick = this.eventBookmark.bind(this, 'difficult', 1);
    document.getElementById('cardAgain').onclick = this.eventCardAgain.bind(this);
    document.getElementById('cardCorrect').onclick = () => document.getElementById('inputWord').focus();
    document.getElementById('cardShow').onclick = () => {
      if (!document.getElementById('cardShow').classList.contains('lock-element')) {
        document.getElementById('inputWord').value = this.model.listToday[this.cardIndex].word;
        const cardCorrect = document.getElementById('cardCorrect');
        cardCorrect.innerHTML = '';
        cardCorrect.classList.remove('opacity-correct');
        this.eventRight();
      }
    };

    ['cardHard', 'cardNormal', 'cardEasy'].forEach((item, index) => {
      document.getElementById(item).onclick = () => {
        const word = this.model.listToday[this.cardIndex];
        const INTERVAL_FACTOR = (1 + index) * 2 - 1;
        this.updateAllStudyWords(word, false, true, false, false, INTERVAL_FACTOR, 'study');
      };
    });

    document.getElementById('settings').onchange = (e) => {
      if (e.target.tagName === 'INPUT') {
        this.view.getSettings();
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
    const right = document.getElementById('cardRight');
    if (right.classList.contains('go-next')
      && this.cardIndex + 1 === (this.passedToday + Number(this.next))) {
      right.classList.remove('go-next');
      this.view.clearCard();
      if (this.passedToday === +document.getElementById('maxWords').value) {
        document.getElementById('card').classList.add('hide');
        document.getElementById('message').classList.add('show');
        this.view.inputTodayStatistics();
      } else {
        const word = this.model.listToday[this.cardIndex + 1];
        [this.cardIndex, this.passedToday] = this.view.setWordInCard(
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
        const INTERVAL_FACTOR = 0;
        if (this.allStudyWords.find((item) => item.word === removeWord.word)) {
          this.updateAllStudyWords(removeWord, false, true, false, false, INTERVAL_FACTOR, 'remove');
        } else {
          this.nextNewWord += 1;
          this.updateAllStudyWords(removeWord, true, false, false, false, INTERVAL_FACTOR, 'remove');
        }
        let allWords = [...book1, ...book2, ...book3, ...book4, ...book5, ...book6];
        this.model.listToday.push(allWords[this.nextNewWord]);
        allWords = null;
        this.setWordInCard();
        this.setTodayStatStorage();
      }
    }
  }

  eventBookmark(mark, customRating) {
    const word = this.model.listToday[this.cardIndex];
    if (this.allStudyWords.find((item) => item.word === word.word.toLowerCase())) {
      this.updateAllStudyWords(word, false, true, false, false, customRating, mark);
    } else {
      this.updateAllStudyWords(word, true, false, false, false, customRating, mark);
    }
  }

  eventCardAgain() {
    if (!document.getElementById('cardAgain').classList.contains('lock-element')) {
      document.getElementById('cardAgain').classList.add('lock-element');
      const answer = this.input.value.toLowerCase();
      if (!this.allStudyWords.find((item) => item.word === answer)) this.newWordsToday -= 1;
      const cutWord = this.model.listToday.splice(this.cardIndex, 1)[0];
      this.model.listToday.push(cutWord);
      this.passedToday -= 1;
      this.next = true;
      this.changeRange(false);
      this.setTodayStatStorage();
    }
  }

  setAnswerInCard(prev) {
    if (prev === 'left') {
      this.cardIndex -= 1;
      const word = this.model.listToday[this.cardIndex];
      [this.cardIndex, this.passedToday] = this.view.setWordInCard(
        false, this.passedToday, word, this.cardIndex,
      );
      // this.view.setWordInCard(false);
    } else if (prev === 'right') {
      this.cardIndex += 1;
      const word = this.model.listToday[this.cardIndex];
      [this.cardIndex, this.passedToday] = this.view.setWordInCard(
        false, this.passedToday, word, this.cardIndex,
      );
      // this.view.setWordInCard(false);
    }

    const answer = this.view.input.value.toLowerCase();
    const word = this.model.listToday[this.cardIndex];
    word.word = word.word.toLowerCase();
    const showAnswer = (answer === word.word);

    if (showAnswer || prev) {
      this.view.setAnswerInCard(word);
      if (showAnswer) {
        if (this.view.settings.sound) {
          this.playWord();
        }
        this.view.blockButtons();
        this.newConsecutive += 1;
        this.correctAnswer += 1;
        if (this.newConsecutive > this.consecutive) this.consecutive = this.newConsecutive;
        if (this.allStudyWords.find((item) => item.word === answer) && !prev) {
          this.updateAllStudyWords(word, false, true, true, false);
        } else {
          this.newWordsToday += 1;
          this.updateAllStudyWords(word, true, false, true, false, false, 'study');
        }
        if (!this.currentMistake) {
          this.passedToday = this.view.changeRange(true, this.passedToday);
        } else {
          const cutWord = this.model.listToday.splice(this.cardIndex, 1)[0];
          this.model.listToday.push(cutWord);
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
      if (this.allStudyWords.find((item) => item.word === word.word) && !prev) {
        this.updateAllStudyWords(word, false, true, true, true);
      } else {
        this.newWordsToday += 1;
        this.updateAllStudyWords(word, true, false, true, true, false, 'study');
      }
      this.view.incorrectWord(answer, word.word);
    }
    this.setTodayStatStorage();
  }

  updateAllStudyWords(word, isNew, isUpdate, isCount, mistake, customRating, state) {
    const DAY_INTERVAL = 5;
    const DAY = 60 * 60 * 24 * 1000;
    if (isNew) {
      if (!word.translation) word.translation = word.wordTranslate;
      word.count = (isCount) ? 1 : 0;
      word.mistakes = Number(mistake);
      word.state = state; // study|difficult|remove
      word.customRating = customRating; // undefine|complexity|normal|easy (false|1|3|5)
      if (isCount || mistake) {
        word.rating = this.getRating(word.count, word.mistakes);
      } else {
        const MAX_RATING = 5;
        word.rating = MAX_RATING;
      }
      word.lastTime = new Date().getTime();

      if (customRating) {
        word.nextTime = word.lastTime + customRating * DAY * DAY_INTERVAL;
      } else {
        word.nextTime = word.lastTime + word.rating * DAY * DAY_INTERVAL;
      }
      this.allStudyWords.push(word);
    } else if (isUpdate) {
      const index = this.allStudyWords.findIndex((item) => item.word === word.word);
      if (isCount) this.allStudyWords[index].count += 1;
      if (mistake) this.allStudyWords[index].mistakes += 1;
      if (state) this.allStudyWords[index].state = state;
      if (customRating) this.allStudyWords[index].customRating = customRating;
      const counts = this.allStudyWords[index].count;
      const { mistakes } = this.allStudyWords[index];
      this.allStudyWords[index].rating = this.getRating(counts, mistakes);
      this.allStudyWords[index].lastTime = new Date().getTime();

      if (this.allStudyWords[index].customRating) {
        const delta = this.allStudyWords[index].customRating * DAY * DAY_INTERVAL;
        this.allStudyWords[index].nextTime = this.allStudyWords[index].lastTime + delta;
      } else {
        const delta = this.allStudyWords[index].rating * DAY * DAY_INTERVAL;
        this.allStudyWords[index].nextTime = this.allStudyWords[index].lastTime + delta;
      }
    }
    localStorage.setItem('userAllStudyWords', JSON.stringify(this.allStudyWords));
  }

  getRating(count, mistakes) {
    let rating = 1;
    try {
      const correctPercent = (1 - mistakes / count) * 100;
      if (correctPercent >= 20 && correctPercent < 40) {
        rating = 2;
      } else if (correctPercent >= 40 && correctPercent < 65) {
        rating = 3;
      } else if (correctPercent >= 65 && correctPercent < 90) {
        rating = 4;
      } else if (correctPercent >= 90) rating = 5;
    } catch (error) {
      this.error = error.message;
    }
    return rating;
  }

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
