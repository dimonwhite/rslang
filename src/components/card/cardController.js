// import book1 from '@/data/book1';
// import book2 from '@/data/book2';
// import book3 from '@/data/book3';
// import book4 from '@/data/book4';
// import book5 from '@/data/book5';
// import book6 from '@/data/book6';
import { urlGitHub } from '@/constants';
import CardView from './cardView';
import CardModel from './cardModel';
import HttpClient from '../httpclient/HttpClient';

export default class CardController {
  constructor(user) {
    this.user = user;
    this.user = new HttpClient();
    this.user.userId = localStorage.getItem('userId');
    this.user.token = localStorage.getItem('token');

    this.view = new CardView();
    this.model = new CardModel(this.user);
    this.params = {
      cardIndex: 0,
      passedToday: 0,
      passedNew: 0, // newWordsToday - похожу тоже самое
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
    this.lockBtns = true;
    this.next = false;
    this.left = false;
    this.cutLeft = false;
    this.cut = false;
  }

  async create() {
    this.model.lockBtns = true;
    this.settings = await this.user.getUserSettings();
    this.view.settings = this.settings.optional.settings;
    this.statistics = await this.user.getUserStatistics();
    this.params = this.statistics.optional.todayTraining.params;
    this.view.renderHTML();
    await this.getTodayStatStorage();
    if (this.model.listToday.length !== this.params.passedToday) {
      const word = this.model.listToday[this.params.cardIndex];
      [this.params.cardIndex, this.params.passedToday, this.next] = this.view.setWordInCard(
        false, this.model.listToday.length, this.params.passedToday, word, this.params.cardIndex,
      );
      // await this.setTodayStatStorage();
    } else {
      this.view.inputTodayStatistics(this.params);
    }
    await this.setTodayStatStorage();
    this.lockBtns = false;
    this.createEvent();
  }

  async getTodayStatStorage() {
    let date = new Date();
    date = `${date.getDate()}${(date.getMonth() + 1)}${date.getFullYear()}`;
    this.checkCreateList = this.statistics.optional.todayTraining.lastDate === date;
    this.statistics.optional.todayTraining.lastDate = date;

    if (!this.checkCreateList) {
      Object.keys(this.params).forEach((key) => { this.params[key] = 0; });
      [
        this.params.generatedListToday,
        this.params.numberWordsForToday,
        this.params.numberListPages,
      ] = await this.model.createList(
        this.view.settings,
        this.params.generatedListToday,
        this.params.wordsRepeatToday,
        this.params.numberListPages,
      );
      // await this.setTodayStatStorage();
    } else {
      await this.model.getAllUserWords();
      await this.model.getListToday(this.params.numberListPages);
    }
  }

  async setTodayStatStorage() {
    this.model.lockBtns = true;
    const { cardIndex } = this.params;
    this.params.cardIndex = this.params.passedToday;
    await this.user.createUserStatistics({ learnedWords: 0, optional: this.statistics.optional });
    this.params.cardIndex = cardIndex;
    // await this.model.putListToday();
  }

  createEvent() {
    document.getElementById('addition').onclick = async () => {
      this.view.nextCard();
      Object.keys(this.params).forEach((key) => { this.params[key] = 0; });
      this.model.clearListToday();
      [
        this.params.generatedListToday,
        this.params.numberWordsForToday,
        this.params.numberListPages,
      ] = await this.model.createList(
        this.view.settings, false, this.params.wordsRepeatToday, this.numberListPages,
      );
      this.view.setWordInCard(
        false, this.model.listToday.length, 0, this.model.listToday[0], 0,
      );
      await this.setTodayStatStorage();
    };
    document.getElementById('cardLeft').onclick = async () => {
      if (this.params.cardIndex > 0) {
        await this.setAnswerInCard('left');
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
    document.getElementById('cardShow').onclick = async () => {
      if (this.view.isShow(this.model.listToday[this.params.cardIndex])) {
        this.params.currentMistake = true;
        await this.setAnswerInCard(false, true);
        if (this.params.newConsecutive === this.params.consecutive) this.params.consecutive -= 1;
        this.params.newConsecutive -= 1;
        this.params.correctAnswer -= 1;
        this.params.newConsecutive = 0;
        this.params.incorrectAnswer += 1;
        await this.setTodayStatStorage();
      }
    };

    ['cardHard', 'cardNormal', 'cardEasy'].forEach((item, index) => {
      document.getElementById(item).onclick = async () => {
        const word = this.model.listToday[this.params.cardIndex];
        const INTERVAL_FACTOR = (1 + index) * 2 - 1;
        this.model.listToday[this.params.cardIndex].customRating = INTERVAL_FACTOR;
        this.view.setCustomRating(INTERVAL_FACTOR);
        await this.model.updateAllStudyWords(word, false, true, false, false, INTERVAL_FACTOR, 'study');
        await this.model.putListPage(word);
      };
    });

    document.getElementById('settings').onchange = async (e) => {
      if (e.target.tagName === 'INPUT') {
        if (this.view.getSettings()) {
          [
            this.params.generatedListToday,
            this.params.numberWordsForToday,
            this.params.numberListPages,
          ] = await this.model.createList(
            this.view.settings, false, this.params.wordsRepeatToday, this.numberListPages,
          );
          this.params.passedToday = 0;
          this.params.cardIndex = 0;
          this.view.clearCard();
          this.view.setWordInCard(
            false, this.model.listToday.length, 0, this.model.listToday[0], 0,
          );
          await this.setTodayStatStorage();
        }
        this.settings.optional.settings = this.view.settings;
        await this.user.createUserSettings({ learnedWords: 0, optional: this.settings.optional });
        const word = this.model.listToday[this.params.cardIndex];
        this.view.setSettingsInCard(word, this.params.cardIndex, this.params.passedToday, true);
      }
    };

    const idChecks = ['translate', 'meaningWord', 'exampleWord'];
    idChecks.forEach((item) => {
      document.getElementById(item).onclick = () => {
        if (idChecks.filter((el) => document.getElementById(el).checked).length < 1) {
          document.getElementById(item).checked = true;
        }
      };
    });
  }

  async eventRight() {
    if (this.params.cardIndex >= this.params.passedToday - 1) {
      if (this.lockBtns || this.view.rightArrow.classList.contains('lock-btn')) return;
      this.lockBtns = true;
      this.view.lockArrows(true);
      this.timeout = setTimeout(() => {
        this.view.lockArrows();
        this.lockBtns = false;
      }, 1500);
    }

    if (this.view.rightArrow.classList.contains('go-next')
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
        const len = this.model.listToday.length;
        [this.params.cardIndex, this.params.passedToday, this.next] = this.view.setWordInCard(
          true, len, this.params.passedToday, word, this.params.cardIndex,
        );
      }
    } else if (this.params.cardIndex === this.params.passedToday) {
      await this.setAnswerInCard(false); // , this.params.currentMistake);
    } else {
      await this.setAnswerInCard('right');
    }
  }

  async eventRemove() {
    if (!this.view.isLock()) {
      if (this.model.listToday.length > 0) {
        const removeWord = this.model.listToday[this.params.cardIndex];
        let state = 'remove';
        if (removeWord.state === state) state = 'study';
        const INTERVAL_FACTOR = 'clear';
        let isNew = false;
        if (this.model.allStudyWords.find((item) => item.word === removeWord.word)) {
          if (!removeWord.isPassed) isNew = true;
          await this.model.updateAllStudyWords(
            removeWord, false, true, false, false, INTERVAL_FACTOR, state,
          );
        } else {
          isNew = true;
          await this.model.updateAllStudyWords(
            removeWord, true, false, false, false, INTERVAL_FACTOR, state,
          );
        }
        if (isNew) {
          this.model.lockBtns = true;
          this.model.listToday.splice(this.params.cardIndex, 1);
          let nextNewWord = this.model.allStudyWords.length + this.params.numberNewWords;
          nextNewWord -= this.params.newWordsToday;
          const maxWordsPerPage = 600;
          const group = Math.floor(nextNewWord / maxWordsPerPage);
          const pagesInGroup = 30;
          const wordsInGroup = nextNewWord % maxWordsPerPage;
          const page = Math.floor(wordsInGroup / pagesInGroup);
          const indexInPage = wordsInGroup % pagesInGroup;
          const words = await this.user.getWords({
            group, page, maxLength: 99, wordsPerPage: 20,
          });
          const word = words[indexInPage];
          this.model.listToday.push(word);
          const setWord = this.model.listToday[this.params.passedToday];
          const len = this.model.listToday.length;
          this.view.setWordInCard(
            false, len, this.params.passedToday, setWord, this.params.passedToday,
          );
        }
        await this.setTodayStatStorage();
        await this.model.putListToday;
      }
    }
  }

  async eventBookmark() {
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
      await this.model.updateAllStudyWords(word, false, true, false, false, customRating, mark);
    } else {
      await this.model.updateAllStudyWords(word, true, false, false, false, customRating, mark);
    }
    await this.model.putListPage(word);
  }

  async eventCardAgain() {
    if (!document.getElementById('cardAgain').classList.contains('lock-element')) {
      document.getElementById('cardAgain').classList.add('lock-element');
      const cutWord = this.model.listToday.splice(this.params.cardIndex, 1)[0];
      this.model.listToday.push(cutWord);
      this.params.passedToday -= 1;
      this.next = true;
      this.cut = true;
      this.view.changeRange(false, this.params.passedToday, this.model.listToday.length);
      // await this.setTodayStatStorage();
      this.model.putListToday();
    }
  }

  async setAnswerInCard(prev, show) {
    if (prev === 'left') {
      this.params.cardIndex -= 1;
      const word = this.model.listToday[this.params.cardIndex];
      const len = this.model.listToday.length;
      [this.params.cardIndex, this.params.passedToday, this.next] = this.view.setWordInCard(
        false, len, this.params.passedToday, word, this.params.cardIndex, false,
      );
    } else if (prev === 'right') {
      this.params.cardIndex += 1;
      const word = this.model.listToday[this.params.cardIndex];
      const len = this.model.listToday.length;
      [this.params.cardIndex, this.params.passedToday, this.next] = this.view.setWordInCard(
        false, len, this.params.passedToday, word, this.params.cardIndex, false,
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
      await this.view.setAnswerInCard(word, this.params.currentMistake, prev);
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
        const mistake = show || false;
        if (isNotNew && !prev) {
          await this.model.updateAllStudyWords(word, false, true, true, mistake);
        } else if (!prev) {
          this.params.newWordsToday += 1;
          await this.model.updateAllStudyWords(word, true, false, true, mistake, false, 'study');
        }

        if (!this.params.currentMistake) {
          this.params.passedToday = this.view.changeRange(
            true, this.params.passedToday, this.model.listToday.length,
          );
        } else if (this.model.listToday.length !== this.params.cardIndex + 1) {
          const cutWord = this.model.listToday.splice(this.params.cardIndex, 1)[0];
          this.model.listToday.push(cutWord);
          this.cut = true;
          this.cutLeft = true;
        }

        if (this.params.currentMistake) {
          await this.model.putListToday();
          this.next = true;
          this.view.next = true;
        } else {
          await this.model.putListPage(word);
        }
        this.params.currentMistake = false;
        if (!this.view.settings.sound && this.view.settings.nextCard) {
          clearTimeout(this.timeout);
          this.view.lockArrows();
          this.lockBtns = false;
          this.eventRight();
        }
        if (!prev) await this.setTodayStatStorage();
      }
    } else {
      this.params.currentMistake = true;
      this.params.newConsecutive = 0;
      this.params.incorrectAnswer += 1;
      if (isNotNew && !prev) {
        await this.model.updateAllStudyWords(word, false, true, true, true);
      } else {
        this.params.newWordsToday += 1;
        await this.model.updateAllStudyWords(word, true, false, true, true, false, 'study');
      }
      if (this.view.settings.langEn) {
        this.view.incorrectWord(answer, word.word);
      } else {
        this.view.incorrectWord(answer, word.wordTranslate);
      }
      await this.setTodayStatStorage();
      await this.model.putListPage(word);
    }
  }

  playWord() {
    clearTimeout(this.timeout);
    this.view.lockArrows(true);
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
      } else if (this.view.settings.nextCard) {
        this.view.lockArrows();
        this.lockBtns = false;
        this.eventRight();
      }
    };
    playMeaning.onended = () => {
      if (this.view.settings.exampleWord) {
        playExample.play();
      } else if (this.view.settings.nextCard) {
        this.view.lockArrows();
        this.lockBtns = false;
        this.eventRight();
      }
    };
    playExample.onended = () => {
      if (this.view.settings.nextCard) {
        this.view.lockArrows();
        this.lockBtns = false;
        this.eventRight();
      }
    };
  }
}
