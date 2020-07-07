import HttpClient from '../../../httpclient/HttpClient';

export default class RoundData {
  constructor(obtainWords) {
    this.level = 0;
    this.roundNumber = 1;
    this.obtainWords = obtainWords;
    this.rawData = null;
    this.roundImgData = null;
    this.roundImg = null;
    this.cutRoundImg = null;
    this.client = new HttpClient();
    this.isUserWords = true;
    this.fail = 0;
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
    this.rawData = await this.obtainWords(this.level, this.roundNumber);
    this.sentences = Object.values(this.rawData).map((el) => RoundData.makeSingleSentence(el));
  }

  async makeUserSentence() {
    this.rawData = await this.client.getAllUserWords();
    if (this.rawData.length < 11) {
      throw new Error('Not enough user words, try to change level');
    }
    this.rawData = this.rawData.sort(() => 0.5 - Math.random())
      .filter((data) => data.optional.textExample.split(' ').length < 11).slice(0, 10);
    this.sentences = Object.values(this.rawData)
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
