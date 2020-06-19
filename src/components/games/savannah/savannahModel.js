// import words from '../../../data/mock_endGame';
import book1 from '../../../data/book1';
import book2 from '../../../data/book2';
import book3 from '../../../data/book3';
import book4 from '../../../data/book4';
import book5 from '../../../data/book5';
import book6 from '../../../data/book6';
import rus from '../../../data/rus';

export default class SavannahModel {
  constructor(user) {
    this.user = user;
    // this.words = words;
    this.words = [];
    this.gameWords = [];

    this.lockChoice = true; //
    this.words = []; //
    this.gameWords = []; //
    this.stopRounds = [];
    this.level = 0;
    this.maxHeart = 5;
    this.heart = 5;
    this.count = 10;
    this.attempt = 0;
    this.correctly = 0;
    this.timeInterval = 7000;
    this.SHIP_HIGHT = 35;
    this.BG_HIGHT = 3500;
    this.studyWords = false;
    this.allStudyWords = []; // JSON.parse(localStorage.getItem('userAllStudyWords'));
  }

  createWords() {
    switch (this.level) {
      case 0:
        if (this.allStudyWords.length < 100) {
          this.random(book1.slice(0, 100));
        } else {
          this.studyWords = true;
          this.random(this.allStudyWords);
        }
        break;
      case 1:
        this.random(book1);
        break;
      case 2:
        this.random(book2);
        break;
      case 3:
        this.random(book3);
        break;
      case 4:
        this.random(book4);
        break;
      case 5:
        this.random(book5);
        break;
      case 6:
        this.random(book6);
        break;
      default:
        break;
    }
  }

  random(book) {
    const unique = [];
    for (let i = 0; i < this.count + this.maxHeart; i += 1) {
      const rand = Math.floor(Math.random() * (book.length + 1));
      if (book[rand] && book[rand].wordTranslate) {
        if (unique.includes(rand)) {
          i -= 1;
        } else {
          unique.push(rand);
          this.words.push(book[rand]);
        }
      } else {
        i -= 1;
      }
    }
  }

  getWords() {
    try {
      for (let i = 0; i < this.words.length; i += 1) {
        this.gameWords.push([this.words[i].wordTranslate]);
        const WRONG_WORDS = 3;
        for (let j = 0; j < WRONG_WORDS; j += 1) {
          for (let k = 0; k < rus.length; k += 1) {
            if (rus[k][0][0] === this.words[i].wordTranslate[0]) {
              if (!this.gameWords[i].includes(rus[k][0])) {
                this.gameWords[i].push(rus[k][0]);
                k = rus.length;
              }
            }
          }
        }
        while (this.gameWords[i].length < 4) {
          this.gameWords[i].push(rus[Math.floor(Math.random() * rus.length)][0]);
        }
        this.gameWords[i].push(this.words[i].word);
      }
    } catch (error) {
      this.error = error.message;
    }
  }

  newGame() {
    this.gameWords = [];
    this.words = [];
  }
}
