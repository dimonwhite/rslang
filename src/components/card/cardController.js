import book1 from '@/data/book1';
import book2 from '@/data/book2';
import book3 from '@/data/book3';
import book4 from '@/data/book4';
import book5 from '@/data/book5';
import book6 from '@/data/book6';
import { urlGitHub } from '@/constants';
import CardView from './cardView';
import CardModel from './cardModel';
import HttpClient from '../httpclient/HttpClient';

export default class CardController {
  constructor(user) {
    this.user = user;
    this.user = new HttpClient();
    this.view = new CardView();
    this.model = new CardModel(this.user);
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
    this.left = false;
    this.cutLeft = false;
    this.cut = false;
  }

  async create() {
    document.body.className = 'body show-main';
    this.view.renderHTML();
    this.getTodayStatStorage();
    const isGenerated = this.generatedListToday;
    this.generatedListToday = await this.model.createList(this.view.settings, isGenerated);
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
    document.getElementById('addition').onclick = async () => {
      this.view.nextCard();
      this.passedToday = 0;
      this.cardIndex = 0;
      this.newWordsToday = 0;
      this.consecutive = 0;
      this.newConsecutive = 0;
      this.correctAnswer = 0;
      this.incorrectAnswer = 0;
      this.model.clearListToday();
      this.generatedListToday = await this.model.createList(this.view.settings, false);
      this.view.setWordInCard(false, 0, this.model.listToday[0], 0);
      this.setTodayStatStorage();
    };
    document.getElementById('cardLeft').onclick = () => {
      if (this.cardIndex > 0) {
        this.setAnswerInCard('left');
        this.left = true;
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
      if (this.view.isShow(this.model.listToday[this.cardIndex])) {
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

    document.getElementById('settings').onchange = async (e) => {
      if (e.target.tagName === 'INPUT') {
        if (this.view.getSettings()) {
          await this.model.createList(this.view.settings, false, this.newWordsToday);
          this.passedToday = 0;
          this.cardIndex = 0;
          this.view.clearCard();
          this.view.setWordInCard(false, 0, this.model.listToday[0], 0);
          this.setTodayStatStorage();
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
        if (this.left) nextWord += Number(this.cutLeft);
        this.cut = false;
        this.cutLeft = false;
        this.left = false;
        if (this.cardIndex === this.model.listToday.length - 1) nextWord = 0;
        const word = this.model.listToday[this.cardIndex + nextWord];
        [this.cardIndex, this.passedToday, this.next] = this.view.setWordInCard(
          true, this.passedToday, word, this.cardIndex,
        );
      }
    } else if (this.cardIndex === this.passedToday) {
      this.setAnswerInCard(false, this.currentMistake);
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
    const word = this.model.listToday[this.cardIndex].word.toLowerCase();
    if (this.model.allStudyWords.find((item) => item.word.toLowerCase() === word)) {
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
        false, this.passedToday, word, this.cardIndex, false,
      );
    } else if (prev === 'right') {
      this.cardIndex += 1;
      const word = this.model.listToday[this.cardIndex];
      [this.cardIndex, this.passedToday, this.next] = this.view.setWordInCard(
        false, this.passedToday, word, this.cardIndex, false,
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

    let isNotNew;
    if (this.view.settings.langEn) {
      isNotNew = this.model.allStudyWords.find((item) => item.word === word.word);
    } else {
      isNotNew = this.model.allStudyWords.find((item) => item.wordTranslate === word.wordTranslate);
    }

    if (showAnswer || prev) {
      this.view.setAnswerInCard(word, this.currentMistake, prev);
      if (showAnswer) {
        if (this.view.settings.sound) {
          this.playWord();
        }
        const { customRating } = this.model.listToday[this.cardIndex];
        this.view.blockButtons(customRating);
        this.newConsecutive += 1;
        this.correctAnswer += 1;
        if (this.newConsecutive > this.consecutive) this.consecutive = this.newConsecutive;
        if (isNotNew && !prev) {
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
          this.cutLeft = true;
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
      if (isNotNew && !prev) {
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
