// import book1 from '@/data/book1';
// import book2 from '@/data/book2';
// import book3 from '@/data/book3';
// import book4 from '@/data/book4';
// import book5 from '@/data/book5';
// import book6 from '@/data/book6';

export default class CardModel {
  constructor(user) {
    this.user = user;
    this.data = [];
    this.listToday = [];
    this.allStudyWords = [];
    this.defaultRating = 1;
  }

  async createList(settings, generatedListToday) { // , newWordsToday = 0) {
    const userWords = localStorage.getItem('userAllStudyWords');
    if (userWords) {
      this.allStudyWords = JSON.parse(userWords);
      this.allStudyWords.sort((a, b) => a.nextTime - b.nextTime);
    } else {
      this.allStudyWords = [];
    }
    if (!generatedListToday) {
      // const words = [...book1, ...book2, ...book3, ...book4, ...book5, ...book6];
      this.listToday = [];
      const maxWordsPerPage = 600;
      const maxWords = +settings.maxWords;
      let settNewWords = +settings.newWords;
      const learnedWords = this.allStudyWords.length;
      const ALL_WORDS = 3600;
      if (learnedWords === ALL_WORDS) settings.listNew = true;
      if (learnedWords + maxWords > ALL_WORDS) settNewWords = ALL_WORDS - learnedWords;
      const group = Math.floor(learnedWords / maxWordsPerPage);
      const groupNext = Math.floor((learnedWords + maxWords) / maxWordsPerPage);
      const page = 0;
      const maxLength = 99;
      let allWords = [];
      if (group === groupNext) {
        const wordsPerPage = (learnedWords % maxWordsPerPage) + maxWords;
        allWords = await this.user.getWords({
          group, page, maxLength, wordsPerPage,
        });
      } else {
        const wordsPerPage = (learnedWords + maxWords) % maxWordsPerPage;
        const firstChunk = await this.user.getWords({
          group, page, maxLength, wordsPerPage: maxWordsPerPage,
        });
        const secondChunk = await this.user.getWords({
          group: groupNext, page, maxLength, wordsPerPage,
        });
        allWords = [...firstChunk, ...secondChunk];
      }
      const newWords = allWords.slice(learnedWords % maxWordsPerPage);
      // this.nextNewWord = this.allStudyWords.length - newWordsToday;
      // const max = +settings.maxWords;
      // if (settings.listNew) {
      //   this.addToList(max, allWords, true, false, settings.newWords);
      // } else if (settings.listRepeat) {
      //   this.addToList(max, allWords, false, false, settings.newWords);
      // } else if (settings.listAlternately) {
      //   this.addToList(max, allWords, false, true, settings.newWords);
      // }
      // const max
      if (settings.listNew || settNewWords >= maxWords) {
        this.listToday = newWords;
      } else if (settings.listRepeat) {
        if (learnedWords >= maxWords) {
          this.listToday = this.allStudyWords.slice(0, maxWords);
        } else {
          this.listToday = this.allStudyWords;
          this.listToday = [...this.listToday, ...newWords.slice(0, maxWords - learnedWords)];
        }
      } else if (settings.listAlternately) {
        const studyWords = maxWords - settNewWords;
        const time = new Date().getTime();
        for (let i = 0; i < studyWords && i < this.allStudyWords.length; i += 1) {
          if (this.allStudyWords[i].nextTime < time) {
            this.listToday.push(this.allStudyWords[i]);
          }
        }
        const remainder = maxWords - this.listToday.length;
        this.listToday = [...this.listToday, ...newWords.slice(0, remainder)];
      }
      localStorage.setItem('listToday', JSON.stringify(this.listToday));
      return true;
    }
    return generatedListToday;
  }

  // addToList(max, allWords, onlyNew, alternately, newWords) {
  //   let count = 0;
  //   if (!onlyNew) {
  //     let repeatWords = max;
  //     if (alternately) repeatWords = max - newWords;
  //     for (let i = 0; i < this.allStudyWords.length && count < repeatWords; i += 1) {
  //       this.listToday.push(this.allStudyWords[i]);
  //       count += 1;
  //     }
  //   }
  //   if (max > this.listToday.length) {
  //     for (let i = this.nextNewWord; i < allWords.length && count < max; i += 1) {
  //       this.nextNewWord += 1;
  //       if (!this.allStudyWords.includes(allWords[i].word)) {
  //         this.listToday.push(allWords[i]);
  //         count += 1;
  //       }
  //     }
  //   }
  // }

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
      if (customRating === 'clear') {
        this.allStudyWords[index].customRating = false;
      } else if (customRating) {
        this.allStudyWords[index].customRating = customRating;
      }
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
    localStorage.setItem('listToday', JSON.stringify(this.listToday));
  }

  getRating(count, mistakes) {
    let rating = this.defaultRating;
    const correctPercent = (1 - mistakes / count) * 100;
    if (correctPercent >= 20 && correctPercent < 40) {
      rating = 2;
    } else if (correctPercent >= 40 && correctPercent < 65) {
      rating = 3;
    } else if (correctPercent >= 65 && correctPercent < 90) {
      rating = 4;
    } else if (correctPercent >= 90) rating = 5;
    return rating;
  }

  clearListToday() {
    this.listToday = [];
  }
}
