import book1 from '@/data/book1';
import book2 from '@/data/book2';
import book3 from '@/data/book3';
import book4 from '@/data/book4';
import book5 from '@/data/book5';
import book6 from '@/data/book6';

export default class CardModel {
  constructor(user) {
    this.user = user;
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
    this.allStudyWords = [];
    // this.settings = localStorage.getItem('settings');
    // this.getTodayStatStorage();
    // if (this.settings) {
    //   this.setSettings();
    // } else {
    //   this.getSettings();
    // }
  }

  createList(settings) {
    const userWords = localStorage.getItem('userAllStudyWords');
    if (userWords) {
      this.allStudyWords = JSON.parse(userWords);
      this.allStudyWords.sort((a, b) => a.nextTime - b.nextTime);
    }
    if (!this.generatedListToday) {
      this.listToday = [];
      const allWords = [...book1, ...book2, ...book3, ...book4, ...book5, ...book6];
      this.nextNewWord = this.allStudyWords.length;
      const max = +settings.maxWords;
      if (settings.listNew) {
        this.addToList(max, allWords, true, false, settings.newWords);
      } else if (settings.listRepeat) {
        this.addToList(max, allWords, false, false, settings.newWords);
      } else if (settings.listAlternately) {
        this.addToList(max, allWords, false, true, settings.newWords);
      }
      this.generatedListToday = true;
    }
  }

  addToList(max, allWords, onlyNew, alternately, newWords) {
    let count = 0;
    if (!onlyNew) {
      let repeatWords = max;
      if (alternately) repeatWords = max - newWords;
      for (let i = 0; i < this.allStudyWords.length && count < repeatWords; i += 1) {
        this.listToday.push(this.allStudyWords[i]);
        count += 1;
      }
    }
    if (max > this.listToday.length) {
      for (let i = this.nextNewWord; i < allWords.length && count < max; i += 1) {
        this.nextNewWord += 1;
        if (!this.allStudyWords.includes(allWords[i].word)) {
          this.listToday.push(allWords[i]);
          count += 1;
        }
      }
    }
  }
}
