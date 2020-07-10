export default class RoundData {
  constructor(http) {
    this.level = this.getLocalStorage('level');
    this.roundNumber = this.getLocalStorage('roundNumber');
    this.wordData = null;
    this.roundImgData = null;
    this.roundImg = null;
    this.cutRoundImg = null;
    this.client = http;
    this.isUserWords = true;
    this.fail = 0;
    this.tips = {
      backImg: this.getLocalStorage('tips').backImg,
      translate: this.getLocalStorage('tips').translate,
      autoPlay: this.getLocalStorage('tips').autoPlay,
    };
  }

  setLocalStorage(key, value) {
    this.parsed = JSON.parse(localStorage.puzzle);
    this.parsed[key] = value;
    localStorage.setItem('puzzle', JSON.stringify(this.parsed));
  }

  getLocalStorage(key) {
    if (!localStorage.puzzle) {
      const newObj = {
        tips: {
          backImg: true,
          translate: true,
          autoPlay: true,
        },
        level: 0,
        roundNumber: 1,
      };
      localStorage.setItem('puzzle', JSON.stringify(newObj));
    }
    this.parsed = JSON.parse(localStorage.puzzle);
    return this.parsed[key];
  }

  async setStatistics() {
    const stats = await this.getStatistics();
    const date = new Date().getTime();
    const info = `${10 - this.fail}, ${this.fail}`;

    if (Object.keys(stats.optional.audiocall).length > 20) {
      const keys = Object.keys(stats.optional.puzzle).slice(-20);
      const temp = {};
      keys.forEach((key) => {
        temp[key] = stats.optional.puzzle[key];
      });
      stats.optional.audiocall = temp;
    }

    stats.optional.puzzle[date] = info;

    await this.client.createUserStatistics({
      learnedWords: stats.learnedWords,
      optional: stats.optional,
    });
  }

  async getStatistics() {
    const stats = await this.client.getUserStatistics();
    return stats;
  }

  static makeSingleSentence(el) {
    const currentSentence = {};
    currentSentence.img = `https://raw.githubusercontent.com/timurkalimullin/rslang-data/master/${el.image}`;
    currentSentence.audio = `https://raw.githubusercontent.com/timurkalimullin/rslang-data/master/${el.audioExample}`;
    currentSentence.word = el.word;
    currentSentence.wordTranslate = el.wordTranslate;
    currentSentence.textExampleTranslate = el.textExampleTranslate;
    currentSentence.textExample = el.textExample;
    return currentSentence;
  }

  async makeSentences() {
    this.wordData = await this.client.getWords({
      group: this.level,
      page: this.roundNumber - 1,
      maxLength: 10,
      wordsPerPage: 10,
    });
    this.sentences = Object.values(this.wordData).map((el) => RoundData.makeSingleSentence(el));
  }

  async makeUserSentence() {
    this.wordData = await this.client.getAllUserWords();
    if (this.wordData.length < 11) {
      throw new Error('Not enough user words, try to change level');
    }
    this.wordData = this.wordData.sort(() => 0.5 - Math.random())
      .filter((data) => data.optional.textExample.split(' ').length < 11).slice(0, 10);
    this.sentences = Object.values(this.wordData)
      .map((el) => RoundData.makeSingleSentence(el.optional));
  }

  async getRoundImg() {
    const urlPaintings = 'https://raw.githubusercontent.com/timurkalimullin/rslang_data_paintings/master/';
    const modRoundNumber = this.roundNumber < 10 ? `0${this.roundNumber}` : this.roundNumber;

    const response = await fetch(`${urlPaintings}paintings.json`);
    const paintings = await response.json();

    if (this.isUserWords) {
      const randomImage = Math.floor(Math.random() * paintings.length);
      this.roundImgData = paintings[randomImage];
      this.roundImg = `${urlPaintings}${this.roundImgData.imageSrc}`;
      this.cutRoundImg = `${urlPaintings}${this.roundImgData.cutSrc}`;
      return;
    }

    paintings.forEach((el) => {
      if (el.id === `${parseInt(this.level, 0) + 1}_${modRoundNumber}`) {
        this.roundImgData = el;
      }
    });

    this.roundImg = `${urlPaintings}${this.roundImgData.imageSrc}`;
    this.cutRoundImg = `${urlPaintings}${this.roundImgData.cutSrc}`;
  }

  async formSentenceData() {
    if (this.isUserWords) {
      await this.makeUserSentence();
    } else {
      await this.makeSentences();
    }
    await this.getRoundImg();
  }
}
