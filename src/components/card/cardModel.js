export default class CardModel {
  constructor(user) {
    this.user = user;
    this.data = [];
    this.listToday = [];
    this.allStudyWords = [];
    this.defaultRating = 1;
  }

  async createList(settings, generatedListToday, wordsRepeatToday, numberListPages) {
    const WORDS_START_WITH = 10;
    const userWords = await this.user.getAllUserWords();
    if (userWords.length > WORDS_START_WITH) {
      this.allStudyWords = userWords.slice(WORDS_START_WITH).map((item) => item.optional);
      this.allStudyWords.sort((a, b) => a.nextTime - b.nextTime);
    } else if (userWords.length === 0) {
      const difficulty = 'today';
      const ID_LENGTH = 24;
      for (let i = 0; i < WORDS_START_WITH; i += 1) {
        const wordId = String(i).repeat(ID_LENGTH);
        const wordData = {};
        wordData.listToday = 'empty';
        // eslint-disable-next-line no-await-in-loop
        await this.user.createUserWord({ wordData, wordId, difficulty });
      }
    }

    if (!generatedListToday) {
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
        const wordsPerPage = (learnedWords % maxWordsPerPage) + settingsNewWords;
        allWords = await this.user.getWords({
          group, page, maxLength, wordsPerPage,
        });
      } else {
        const wordsPerPage = (learnedWords + settingsNewWords) % maxWordsPerPage;
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
        if (item.state !== 'remove') {
          let date = new Date(item.nextTime);
          date = `${date.getDate()}${(date.getMonth() + 1)}${date.getFullYear()}`;
          if (date === dateToday) return true;
        }
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
        item.interval = 0;
        item.timeToday = new Date().getTime();
        return item;
      });
      if (wordsStudyForToday.length > maxForToday) {
        this.listToday = [...wordsStudyForToday.slice(0, maxForToday), ...newWords];
      } else {
        this.listToday = [...wordsStudyForToday, ...newWords];
      }

      const WORDS_PER_PAGE = 10;
      const newNumberListPages = Math.ceil(this.listToday.length / WORDS_PER_PAGE);
      return [true, wordsStudyForToday.length, newNumberListPages];
    }
    return [generatedListToday, wordsRepeatToday, numberListPages];
  }

  async putListToday() {
    const WORDS_PER_PAGE = 10;
    const difficulty = 'today';
    const ID_LENGTH = 24;
    const numberListPages = Math.ceil(this.listToday.length / WORDS_PER_PAGE);
    for (let i = 0; i < numberListPages; i += 1) {
      const wordId = String(i).repeat(ID_LENGTH);
      const wordData = this.parseToObj(i);
      // eslint-disable-next-line no-await-in-loop
      await this.user.updateUserWord({ wordId, wordData, difficulty });
    }
  }

  parseToObj(index) {
    const WORDS_PER_PAGE = 10;
    const part = this.listToday.slice(index * WORDS_PER_PAGE, (index + 1) * WORDS_PER_PAGE);
    const resultObj = {};
    part.forEach((item, i) => { resultObj[i] = item; });
    return resultObj;
  }

  async getListToday(numberListPages) {
    const ID_LENGTH = 24;
    for (let i = 0; i < numberListPages; i += 1) {
      const wordId = String(i).repeat(ID_LENGTH);
      // eslint-disable-next-line no-await-in-loop
      const page = await this.user.getUserWordById(wordId);
      this.listToday = [...this.listToday, ...Object.values(page.optional)];
    }
  }

  async putListPage(word) {
    const index = this.listToday.findIndex((item) => item.word === word.word);
    const WORDS_PER_PAGE = 10;
    const page = Math.floor(index / WORDS_PER_PAGE);
    const ID_LENGTH = 24;
    const wordId = String(page).repeat(ID_LENGTH);
    const wordData = this.parseToObj(page);
    await this.user.updateUserWord({ wordId, wordData, difficulty: 'today' });
  }

  async getAllUserWords() {
    const WORDS_START_WITH = 10;
    const userWords = await this.user.getAllUserWords();
    this.allStudyWords = userWords.slice(WORDS_START_WITH).map((item) => item.optional);
  }

  async updateAllStudyWords(word, isNew, isUpdate, isCount, mistake, customRating, state) {
    const DAY = 60 * 60 * 24 * 1000;
    if (isNew) {
      word.count = (isCount) ? 1 : 0;
      word.mistakes = Number(mistake);
      if (state) word.state = state; // study|difficult|remove
      word.customRating = customRating; // undefine|complexity|normal|easy (false|1|3|5)
      word.interval = -1;
      if (isCount || mistake) {
        word.rating = this.getRating(word.count, word.mistakes);
      } else {
        const MAX_RATING = 5;
        word.rating = MAX_RATING;
      }
      word.lastTime = new Date().getTime();

      if (customRating) {
        word.nextTime = word.lastTime + (customRating ** customRating + 2) * DAY;
      } else {
        word.nextTime = word.lastTime + DAY;
      }
      const id = this.allStudyWords.length + 1;
      word.id = `${String('0').repeat(24 - String(id).length)}${id}`;
      this.allStudyWords.push(word);
      await this.user.createUserWord({ wordData: word, wordId: word.id, difficulty: 'string' });
    } else if (isUpdate && !isNew) {
      const update = this.allStudyWords.find((item) => item.word === word.word);
      if (isCount) update.count += 1;
      if (mistake) {
        update.mistakes += 1;
        update.interval = -1;
      } else {
        let dateToday = new Date();
        dateToday = `${dateToday.getDate()}${dateToday.getMonth()}${dateToday.getFullYear()}`;
        let date = new Date(update.nextTime);
        date = `${date.getDate()}${date.getMonth()}${date.getFullYear()}`;
        if (date !== dateToday) update.interval += 1;
      }
      if (state) update.state = state;
      if (customRating === 'clear') {
        update.customRating = false;
      } else if (customRating) {
        update.customRating = customRating;
      }
      const counts = update.count;
      const { mistakes } = update;
      update.rating = this.getRating(counts, mistakes);
      update.lastTime = new Date().getTime();

      if (update.customRating) {
        update.nextTime = update.lastTime + (update.customRating ** update.customRating + 2) * DAY;
      } else {
        const interval = (update.interval === -1) ? 0 : update.interval;
        update.nextTime = update.lastTime + (2 ** interval) * DAY;
      }
      Object.keys(update).forEach((key) => { word[key] = update[key]; });
      await this.user.updateUserWord({ wordData: update, wordId: update.id, difficulty: 'string' });
    }
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
