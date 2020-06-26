import paintings from './imgData/paintings';

export default class RoundData {
  constructor(level, roundNumber, obtainWords) {
    this.level = level;
    this.roundNumber = roundNumber;
    this.obtainWords = obtainWords;
    this.rawData = null;
    this.roundImgData = null;
    this.roundImg = null;
    this.cutRoundImg = null;
  }

  async makeSentences() {
    this.rawData = await this.obtainWords(this.level, this.roundNumber);
    this.sentences = Object.values(this.rawData).map((el) => {
      const currentSentence = {};
      currentSentence.img = `https://raw.githubusercontent.com/timurkalimullin/rslang-data/master/${el.image}`;
      currentSentence.audio = `https://raw.githubusercontent.com/timurkalimullin/rslang-data/master/${el.audioExample}`;
      currentSentence.word = el.word;
      currentSentence.wordTranslate = el.wordTranslate;
      currentSentence.textExampleTranslate = el.textExampleTranslate;
      currentSentence.textExample = el.textExample;
      return currentSentence;
    });
  }

  getRoundImg() {
    const modRoundNumber = this.roundNumber < 10 ? `0${this.roundNumber}` : this.roundNumber;

    paintings.forEach((el) => {
      if (el.id === `${parseInt(this.level, 0) + 1}_${modRoundNumber}`) {
        this.roundImgData = el;
      }
    });

    this.roundImg = `https://raw.githubusercontent.com/timurkalimullin/rslang_data_paintings/master/${this.roundImgData.imageSrc}`;
    this.cutRoundImg = `https://raw.githubusercontent.com/timurkalimullin/rslang_data_paintings/master/${this.roundImgData.cutSrc}`;
  }

  async formSentenceData() {
    await this.makeSentences();
    this.getRoundImg();
  }
}
