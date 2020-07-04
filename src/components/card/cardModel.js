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

  async createList(settings, generatedListToday, wordsRepeatToday, numberListPages) {
    // const userWords = localStorage.getItem('userAllStudyWords');
    const WORDS_START_WITH = 10;
    const userWords = await this.user.getAllUserWords();
    // првоерить в каком случае userWords пустой.
    if (userWords.length > 10) {
      this.allStudyWords = JSON.parse(userWords)
        .slice(WORDS_START_WITH)
        .filter((item) => item.state !== 'remove');
      this.allStudyWords.sort((a, b) => a.nextTime - b.nextTime);
    } else if (userWords.length === 0) {
      // this.allStudyWords = [];
      // POST - создать (зарезервировать) первые 10 слов allStudyWords
      // await this.user.createUserWord({ wordData, wordId, difficulty, });
      const difficulty = 'today';
      const ID_LENGTH = 24;
      for (let i = 0; i < WORDS_START_WITH; i += 1) {
        const wordId = String(i).repeat(ID_LENGTH);
        const list = {};
        list.listToday['0'].word = 'word';
        list.length = '1';
        const wordData = JSON.parse(list);
        // eslint-disable-next-line no-await-in-loop
        await this.user.createUserWord({ wordData, wordId, difficulty });
      }
    }

    if (!generatedListToday) {
      // const words = [...book1, ...book2, ...book3, ...book4, ...book5, ...book6];
      this.listToday = [];
      const maxWordsPerPage = 600;
      const maxWords = +settings.maxWords;
      let settingsNewWords = +settings.newWords;
      const learnedWords = this.allStudyWords.length;
      const ALL_WORDS = 3600;
      if (learnedWords + maxWords > ALL_WORDS) settingsNewWords = ALL_WORDS - learnedWords;
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
      let newWords = allWords.slice(learnedWords % maxWordsPerPage);

      let dateToday = new Date();
      dateToday = `${dateToday.getDate()}${(dateToday.getMonth() + 1)}${dateToday.getFullYear()}`;
      let wordsStudyForToday = this.allStudyWords.filter((item) => {
        let date = new Date(item.nextTime);
        date = `${date.getDate()}${(date.getMonth() + 1)}${date.getFullYear()}`;
        if (date === dateToday) return true;
        return false;
      });

      const maxForToday = maxWords - settingsNewWords;
      wordsStudyForToday = wordsStudyForToday.map((item) => {
        item.isNew = false;
        item.isPassed = false;
        item.timeToday = new Date().getTime();
        return item;
      });
      newWords = newWords.map((item) => {
        item.isNew = true;
        item.isPassed = false;
        item.timeToday = new Date().getTime();
        return item;
      });
      if (wordsStudyForToday.length > maxForToday) {
        this.listToday = [...wordsStudyForToday.slice(0, maxForToday), ...newWords];
      } else {
        this.listToday = [...wordsStudyForToday, ...newWords];
      }

      // localStorage.setItem('listToday', JSON.stringify(this.listToday));
      // await this.putListToday();
      // this.putListToday();
      const WORDS_PER_PAGE = 10;
      const newNumberListPages = Math.floor(this.listToday / WORDS_PER_PAGE);
      return [true, wordsStudyForToday.length, newNumberListPages];
    }
    return [generatedListToday, wordsRepeatToday, numberListPages];
  }

  async putListToday() {
    const WORDS_PER_PAGE = 10;
    const difficulty = 'today';
    const ID_LENGTH = 24;
    const numberListPages = Math.floor(this.listToday / WORDS_PER_PAGE);
    for (let i = 0; i < numberListPages; i += 1) {
      const wordId = String(i).repeat(ID_LENGTH);
      const wordData = this.listToday.slice(i * WORDS_PER_PAGE, (i + 1) * WORDS_PER_PAGE);
      // eslint-disable-next-line no-await-in-loop
      await this.user.updateUserWord({ wordId, wordData, difficulty });
    }
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
