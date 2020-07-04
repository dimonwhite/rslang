import book1 from '@/data/book1';
import book2 from '@/data/book2';
import book3 from '@/data/book3';
import book4 from '@/data/book4';
import book5 from '@/data/book5';
import book6 from '@/data/book6';
import { urlGitHub } from '@/constants';
import CardView from './cardView';
import CardModel from './cardModel';
// import HttpClient from '../httpclient/HttpClient';

export default class CardController {
  constructor(user) {
    this.user = user;
    // this.user = new HttpClient();
    // this.userId = '5f0042478a12520017380f2d';

    this.view = new CardView();
    this.model = new CardModel(this.user);
    this.params = {
      cardIndex: 0,
      passedToday: 0,
      passedNew: 0,
      numberNewWords: 0,
      consecutive: 0,
      newConsecutive: 0,
      newWordsToday: 0,
      correctAnswer: 0,
      incorrectAnswer: 0,
      wordsRepeatToday: 0,
      numberListPages: 0,
      generatedListToday: false,
      currentMistake: false,
    };
    // this.params.cardIndex = 0;
    // this.params.passedToday = 0;
    // this.params.passedNew = 0;
    // this.params.numberNewWords = 0;
    // this.params.consecutive = 0;
    // this.params.newConsecutive = 0;
    // this.params.newWordsToday = 0;
    // this.params.correctAnswer = 0;
    // this.params.incorrectAnswer = 0;
    // this.params.generatedListToday = false;
    // this.params.currentMistake = false;
    this.next = false;
    this.left = false;
    this.cutLeft = false;
    this.cut = false;
    this.nextNewWord = 0;
  }

  async create() {
    document.body.className = 'body show-main';
    this.view.renderHTML();
    this.getTodayStatStorage();
    const isGenerated = this.params.generatedListToday;
    // this.params.generatedListToday =await this.model.createList(this.view.settings,isGenerated);
    [
      this.params.generatedListToday,
      this.params.numberWordsForToday,
      this.params.numberListPages,
    ] = await this.model.createList(
      this.view.settings, isGenerated, this.params.wordsRepeatToday, this.params.numberListPages,
    );
    if (this.model.listToday.length !== this.params.passedToday) {
      const word = this.model.listToday[this.params.cardIndex];
      [this.params.cardIndex, this.params.passedToday, this.next] = this.view.setWordInCard(
        false, this.params.passedToday, word, this.params.cardIndex,
      );
      this.setTodayStatStorage();
    } else {
      // this.view.inputTodayStatistics(
      //   this.params.passedToday, this.params.incorrectAnswer, this.params.correctAnswer,
      //   this.params.newWordsToday, this.params.consecutive,
      // );
      this.view.inputTodayStatistics(this.params);
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
      Object.keys(this.params).forEach((key) => { this.params[key] = 0; });
      // this.params.passedToday = 0;
      // this.params.cardIndex = 0;
      // this.params.passedNew = 0;
      // this.params.numberNewWords = 0;
      // this.params.newWordsToday = 0;
      // this.params.consecutive = 0;
      // this.params.newConsecutive = 0;
      // this.params.correctAnswer = 0;
      // this.params.incorrectAnswer = 0;
      // this.params.generatedListToday = false;
      // this.params.currentMistake = false;
      this.setTodayStatStorage();
    } else {
      // [
      //   this.params.passedToday,
      //   this.params.cardIndex,
      //   this.params.passedNew,
      //   this.params.numberNewWords,
      //   this.params.newWordsToday,
      //   this.params.consecutive,
      //   this.params.newConsecutive,
      //   this.params.correctAnswer,
      //   this.params.incorrectAnswer,
      //   this.params.generatedListToday,
      //   this.params.currentMistake,
      // ] = (localStorage.getItem('todayTraining') ||
      // '0,0,0,0,0,0,0,0,0,false,false').split(',').map((item) => {
      //   if (item === 'false') return false;
      //   if (item === 'true') return true;
      //   return +item;
      // });
      const params = localStorage.getItem('todayTraining');
      if (params) {
        this.params = JSON.parse(params);
      }
    }
  }

  setTodayStatStorage() {
    // localStorage.setItem('todayTraining', [
    //   this.params.passedToday,
    //   this.params.passedToday,
    //   this.params.newWordsToday,
    //   this.params.consecutive,
    //   this.params.newConsecutive,
    //   this.params.correctAnswer,
    //   this.params.incorrectAnswer,
    //   this.params.generatedListToday,
    //   this.params.currentMistake,
    // ].join(','));
    localStorage.setItem('todayTraining', JSON.stringify(this.params));
    localStorage.setItem('listToday', JSON.stringify(this.model.listToday));
  }

  createEvent() {
    document.getElementById('addition').onclick = async () => {
      this.view.nextCard();
      // this.params.passedToday = 0;
      // this.params.cardIndex = 0;
      // this.params.newWordsToday = 0;
      // this.params.consecutive = 0;
      // this.params.newConsecutive = 0;
      // this.params.correctAnswer = 0;
      // this.params.incorrectAnswer = 0;
      Object.keys(this.params).forEach((key) => { this.params[key] = 0; });
      this.model.clearListToday();
      // this.params.generatedListToday = await this.model.createList(this.view.settings, false);
      [
        this.params.generatedListToday,
        this.params.numberWordsForToday,
        this.params.numberListPages,
      ] = await this.model.createList(this.view.settings, false, this.params.wordsRepeatToday);
      this.view.setWordInCard(false, 0, this.model.listToday[0], 0);
      this.setTodayStatStorage();
    };
    document.getElementById('cardLeft').onclick = () => {
      if (this.params.cardIndex > 0) {
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
      if (this.view.isShow(this.model.listToday[this.params.cardIndex])) {
        this.params.currentMistake = true;
        this.setAnswerInCard(false, true);
        if (this.params.newConsecutive === this.params.consecutive) this.params.consecutive -= 1;
        this.params.newConsecutive -= 1;
        this.params.correctAnswer -= 1;
        this.params.newConsecutive = 0;
        this.params.incorrectAnswer += 1;
        this.setTodayStatStorage();
      }
    };

    ['cardHard', 'cardNormal', 'cardEasy'].forEach((item, index) => {
      document.getElementById(item).onclick = () => {
        const word = this.model.listToday[this.params.cardIndex];
        const INTERVAL_FACTOR = (1 + index) * 2 - 1;
        this.model.listToday[this.params.cardIndex].customRating = INTERVAL_FACTOR;
        this.view.setCustomRating(INTERVAL_FACTOR);
        this.model.updateAllStudyWords(word, false, true, false, false, INTERVAL_FACTOR, 'study');
      };
    });

    document.getElementById('settings').onchange = async (e) => {
      if (e.target.tagName === 'INPUT') {
        if (this.view.getSettings()) {
          [
            this.params.generatedListToday,
            this.params.numberWordsForToday,
            this.params.numberListPages,
          ] = await this.model.createList(this.view.settings, false, this.params.wordsRepeatToday);
          this.params.passedToday = 0;
          this.params.cardIndex = 0;
          this.view.clearCard();
          this.view.setWordInCard(false, 0, this.model.listToday[0], 0);
          this.setTodayStatStorage();
        }
        const word = this.model.listToday[this.params.cardIndex];
        this.view.setSettingsInCard(word, this.params.cardIndex, this.params.passedToday, true);
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
      && this.params.cardIndex + 1 === (this.params.passedToday + Number(this.next))) {
      this.view.clearCard();
      if (this.params.passedToday === this.model.listToday.length) {
        this.params.generatedListToday = false;
        this.view.inputTodayStatistics(
          this.params.passedToday, this.params.incorrectAnswer, this.params.correctAnswer,
          this.params.newWordsToday, this.params.consecutive,
        );
        this.model.clearListToday();
      } else {
        let nextWord = Number(!this.cut);
        if (this.left) nextWord += Number(this.cutLeft);
        this.cut = false;
        this.cutLeft = false;
        this.left = false;
        if (this.params.cardIndex === this.model.listToday.length - 1) nextWord = 0;
        const word = this.model.listToday[this.params.cardIndex + nextWord];
        [this.params.cardIndex, this.params.passedToday, this.next] = this.view.setWordInCard(
          true, this.params.passedToday, word, this.params.cardIndex,
        );
      }
    } else if (this.params.cardIndex === this.params.passedToday) {
      this.setAnswerInCard(false, this.params.currentMistake);
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
        const removeWord = this.model.listToday.splice(this.params.cardIndex, 1)[0];
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
        nextWord -= this.params.newWordsToday;
        this.model.listToday.push(allWords[nextWord]);
        const word = this.model.listToday[this.params.passedToday];
        allWords = null;
        this.view.setWordInCard(false, this.params.passedToday, word, this.params.passedToday);
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
    const word = this.model.listToday[this.params.cardIndex].word.toLowerCase();
    if (this.model.allStudyWords.find((item) => item.word.toLowerCase() === word)) {
      this.model.updateAllStudyWords(word, false, true, false, false, customRating, mark);
    } else {
      this.model.updateAllStudyWords(word, true, false, false, false, customRating, mark);
    }
  }

  eventCardAgain() {
    if (!document.getElementById('cardAgain').classList.contains('lock-element')) {
      document.getElementById('cardAgain').classList.add('lock-element');
      const cutWord = this.model.listToday.splice(this.params.cardIndex, 1)[0];
      this.model.listToday.push(cutWord);
      this.params.passedToday -= 1;
      this.next = true;
      this.cut = true;
      this.view.changeRange(false, this.params.passedToday);
      this.setTodayStatStorage();
    }
  }

  setAnswerInCard(prev, mistake = false) {
    if (prev === 'left') {
      this.params.cardIndex -= 1;
      const word = this.model.listToday[this.params.cardIndex];
      [this.params.cardIndex, this.params.passedToday, this.next] = this.view.setWordInCard(
        false, this.params.passedToday, word, this.params.cardIndex, false,
      );
    } else if (prev === 'right') {
      this.params.cardIndex += 1;
      const word = this.model.listToday[this.params.cardIndex];
      [this.params.cardIndex, this.params.passedToday, this.next] = this.view.setWordInCard(
        false, this.params.passedToday, word, this.params.cardIndex, false,
      );
    }

    const answer = this.view.input.value.toLowerCase();
    const word = this.model.listToday[this.params.cardIndex];
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
      this.view.setAnswerInCard(word, this.params.currentMistake, prev);
      if (showAnswer) {
        if (this.view.settings.sound) {
          this.playWord();
        }
        const { customRating } = this.model.listToday[this.params.cardIndex];
        this.view.blockButtons(customRating);
        this.params.newConsecutive += 1;
        this.params.correctAnswer += 1;
        if (this.params.newConsecutive > this.params.consecutive) {
          this.params.consecutive = this.params.newConsecutive;
        }
        if (isNotNew && !prev) {
          this.model.updateAllStudyWords(word, false, true, true, mistake);
        } else {
          this.params.newWordsToday += 1;
          this.model.updateAllStudyWords(word, true, false, true, mistake, false, 'study');
        }
        if (!this.params.currentMistake) {
          this.params.passedToday = this.view.changeRange(true, this.params.passedToday);
        } else if (this.model.listToday.length !== this.params.cardIndex + 1) {
          const cutWord = this.model.listToday.splice(this.params.cardIndex, 1)[0];
          this.model.listToday.push(cutWord);
          this.cut = true;
          this.cutLeft = true;
        }
        if (this.params.currentMistake) {
          this.next = true;
          this.view.next = true;
        }
        this.params.currentMistake = false;
      }
    } else {
      this.params.currentMistake = true;
      this.params.newConsecutive = 0;
      this.params.incorrectAnswer += 1;
      if (isNotNew && !prev) {
        this.model.updateAllStudyWords(word, false, true, true, true);
      } else {
        this.params.newWordsToday += 1;
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
    const word = this.model.listToday[this.params.cardIndex];
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
