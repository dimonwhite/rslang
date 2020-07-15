export default class CardModel {
  constructor(user) {
    this.user = user;
    this.data = [];
    this.listToday = [];
    this.fullListToday = [];
    this.allStudyWords = [];
    this.defaultRating = 1;
    this.WORDS_PER_PAGE = 10;
    this.DAY = 60 * 60 * 24 * 1000;
  }

  async createList({
    settings, generatedListToday, wordsRepeatToday, numberListPages,
  }) {
    await this.createAllStudyWords();

    if (!generatedListToday) {
      await this.createNewWords(settings);
      this.listToday = [];
      const wordsForToday = await this.createListToday();
      this.fullListToday = this.listToday;
      this.setListToday(settings);
      const newNumberListPages = Math.ceil(this.fullListToday.length / this.WORDS_PER_PAGE);
      return [true, wordsForToday, newNumberListPages];
    }
    return [generatedListToday, wordsRepeatToday, numberListPages];
  }

  async createAllStudyWords() {
    const WORDS_START_WITH = 10;
    const userWords = await this.user.getAllUserWords();
    if (userWords.length > WORDS_START_WITH) {
      this.allStudyWords = userWords.slice(WORDS_START_WITH).map((item) => item.optional);
      this.allStudyWords.sort((a, b) => a.nextTime - b.nextTime);
    }
  }

  async createNewWords(settings) {
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
    this.maxForToday = maxWords - settingsNewWords;
    this.newWords = allWords.slice(learnedWords % maxWordsPerPage);
  }

  async createListToday() {
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

    wordsStudyForToday = wordsStudyForToday.map((item) => {
      item.isNew = false;
      item.isPassed = false;
      item.timeToday = new Date().getTime();
      return item;
    });
    this.newWords = this.newWords.map((item) => {
      item.isNew = true;
      item.isPassed = false;
      item.timeToday = new Date().getTime();
      return item;
    });
    if (wordsStudyForToday.length > this.maxForToday) {
      this.listToday = [...wordsStudyForToday.slice(0, this.maxForToday), ...this.newWords];
    } else {
      this.listToday = [...wordsStudyForToday, ...this.newWords];
    }
    return wordsStudyForToday.length;
  }

  setListToday(settings) {
    if (settings.allDifficult) {
      this.listToday = this.allStudyWords.filter((word) => word.state === 'difficult');
      this.fullListToday = this.listToday;
    } else if (settings.onlyNew) {
      this.listToday = this.fullListToday.filter((word) => word.isNew);
    } else if (settings.onlyRepeat) {
      this.listToday = this.fullListToday.filter((word) => !word.isNew);
    } else if (settings.allTodayWords) {
      this.listToday = [
        ...this.fullListToday.filter((word) => word.isPassed),
        ...this.fullListToday.filter((word) => !word.isPassed),
      ];
    }
  }

  async putListToday() {
    const difficulty = 'today';
    const ID_LENGTH = 24;
    const numberListPages = Math.ceil(this.fullListToday.length / this.WORDS_PER_PAGE);
    const promises = [];
    for (let i = 0; i < numberListPages; i += 1) {
      const wordId = String(i).repeat(ID_LENGTH);
      const wordData = this.parseToObj(i);
      promises.push(this.user.updateUserWord({ wordId, wordData, difficulty }));
    }
    await Promise.all(promises);
  }

  parseToObj(index) {
    const next = index + 1;
    const part = this.fullListToday.slice(index * this.WORDS_PER_PAGE, next * this.WORDS_PER_PAGE);
    const resultObj = {};
    part.forEach((item, i) => { resultObj[i] = item; });
    return resultObj;
  }

  async getListToday(numberListPages, settings) {
    const ID_LENGTH = 24;
    const promises = [];
    this.listToday = [];
    this.fullListToday = [];
    for (let i = 0; i < numberListPages; i += 1) {
      const wordId = String(i).repeat(ID_LENGTH);
      promises.push(this.user.getUserWordById(wordId));
    }
    const pages = await Promise.all(promises);
    pages.forEach((page) => {
      this.fullListToday = [...this.fullListToday, ...Object.values(page.optional)];
    });
    this.setListToday(settings);
  }

  async putListPage(word) {
    const index = this.listToday.findIndex((item) => item.word === word.word);
    const page = Math.floor(index / this.WORDS_PER_PAGE);
    const ID_LENGTH = 24;
    const wordId = String(page).repeat(ID_LENGTH);
    const wordData = this.parseToObj(page);
    await this.user.updateUserWord({ wordId, wordData, difficulty: 'today' });
  }

  async getAllUserWords() {
    const userWords = await this.user.getAllUserWords();
    this.allStudyWords = userWords.slice(this.WORDS_PER_PAGE).map((item) => item.optional);
  }

  async updateAllStudyWords({
    word, isNew, isUpdate, isCount = false, mistake = false, customRating = false, state,
  }) {
    if (isNew) {
      await this.setNewWord({
        word, isCount, mistake, customRating, state,
      });
    } else if (isUpdate && !isNew) {
      await this.updateWord({
        word, isCount, mistake, customRating, state,
      });
    }
  }

  async setNewWord({
    word, isCount, mistake, customRating, state,
  }) {
    this.DAY = 60 * 60 * 24 * 1000;
    word.count = (isCount) ? 1 : 0;
    word.mistakes = Number(mistake);
    if (state) word.state = state;
    word.customRating = customRating;
    word.interval = -1;
    if (isCount || mistake) {
      word.rating = this.getRating(word.count, word.mistakes);
    } else if (state === 'remove') {
      const MIN_RATING = 1;
      word.rating = MIN_RATING;
    } else {
      const MAX_RATING = 5;
      word.rating = MAX_RATING;
    }
    word.lastTime = new Date().getTime();

    if (customRating) {
      word.nextTime = word.lastTime + (customRating ** customRating + 2) * this.DAY;
    } else {
      word.nextTime = word.lastTime + this.DAY;
    }
    const id = this.allStudyWords.length + 1;
    word.id = `${String('0').repeat(24 - String(id).length)}${id}`;
    this.allStudyWords.push(word);
    await this.user.createUserWord({ wordData: word, wordId: word.id, difficulty: 'string' });
  }

  async updateWord({
    word, isCount, mistake, customRating, state,
  }) {
    const update = this.allStudyWords.find((item) => item.word === word.word);
    if (state) update.state = state;
    if (customRating === 'clear') {
      update.customRating = false;
    } else if (customRating) {
      update.customRating = customRating;
    }
    if (isCount) this.changeWordStat({ update, mistake });
    const { isNew, isPassed } = word;
    Object.keys(update).forEach((key) => { word[key] = update[key]; });
    word.isNew = isNew;
    word.isPassed = isPassed;
    await this.user.updateUserWord({ wordData: update, wordId: update.id, difficulty: 'string' });
  }

  changeWordStat({ update, mistake }) {
    update.count += 1;
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

    const counts = update.count;
    const { mistakes } = update;
    update.rating = this.getRating(counts, mistakes);
    update.lastTime = new Date().getTime();

    if (update.customRating) {
      const interval = update.customRating ** update.customRating + 2;
      update.nextTime = update.lastTime + interval * this.DAY;
    } else {
      const interval = (update.interval === -1) ? 0 : update.interval;
      update.nextTime = update.lastTime + (2 ** interval) * this.DAY;
    }
  }

  getRating(count, mistakes) {
    let rating = this.defaultRating;
    const PERCENT = [20, 40, 65, 90];
    const correctPercent = (1 - mistakes / count) * 100;
    if (correctPercent >= PERCENT[0] && correctPercent < PERCENT[1]) {
      rating = 2;
    } else if (correctPercent >= PERCENT[1] && correctPercent < PERCENT[2]) {
      rating = 3;
    } else if (correctPercent >= PERCENT[2] && correctPercent < PERCENT[3]) {
      rating = 4;
    } else if (correctPercent >= PERCENT[3]) rating = 5;
    return rating;
  }

  spliceFullList(word, pushEnd) {
    const index = this.fullListToday.findIndex((curWord) => curWord.word === word.word);
    if (index >= 0) {
      const removeWord = this.fullListToday.splice(index, 1)[0];
      if (pushEnd) this.fullListToday.push(removeWord);
    }
  }

  clearListToday() {
    this.listToday = [];
    this.fullListToday = [];
  }
}
