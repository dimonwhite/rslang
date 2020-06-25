import choice from '../../../data/choice';

export default class SavannahModel {
  constructor(user) {
    this.user = user;
    this.words = [];
    this.gameWords = [];
    this.maxHeart = 5;
    this.countWords = 10;
    this.level = 0;
    this.page = 1;
    this.lang = 'EN';
    this.allStudyWords = [];
  }

  async createWords() {
    const SENTENCE = 99;
    // this.allStudyWords = await this.user.getAllUserWords();
    if (this.allStudyWords && this.allStudyWords.length > 100 && this.level === -1) {
      this.random(this.allStudyWords);
    } else {
      const HANDICAP = 10;
      const countWords = this.countWords + HANDICAP;
      const words = await this.user.getWords({
        group: this.level, page: this.page - 1, maxLength: SENTENCE, wordsPerPage: countWords,
      });
      this.random(words);
    }
  }

  random(words) {
    const unique = [];
    for (let i = 0; i < this.countWords + this.maxHeart; i += 1) {
      const rand = Math.floor(Math.random() * (words.length + 1));
      if (words[rand] && words[rand].wordTranslate) {
        if (unique.includes(rand)) {
          i -= 1;
        } else {
          unique.push(rand);
          this.words.push(words[rand]);
        }
      } else {
        i -= 1;
      }
    }
  }

  newGame() {
    this.gameWords = [];
    this.words = [];
  }

  async getWords() {
    if (this.lang === 'EN') {
      this.words.forEach((item) => this.gameWords.push([item.wordTranslate]));
    } else {
      this.words.forEach((item) => this.gameWords.push([item.word]));
    }
    await this.getPartsOfSpeech();
  }

  async getPartsOfSpeech() {
    try {
      const urls = [];
      this.words.forEach((word) => {
        urls.push(`https://dictionary.skyeng.ru/api/public/v1/words/search?search=${word.word}`);
      });

      const request = urls.map((url) => fetch(url));
      const promises = await Promise.all(request);
      const contents = await Promise.all(promises.map((response) => response.json()));
      const partsOfSpeech = ['j', 'r', 'v', 'n'];
      contents.forEach((content, index) => {
        const find = content.find((item) => item.text === this.words[index].word);
        const part = find.meanings[0].partOfSpeechCode;
        this.gameWords[index] = this.randWords(index, part, partsOfSpeech);
      });
    } catch (error) {
      this.error = error.message;
    }
  }

  randWords(index, part, partsOfSpeech) {
    let choiceWords;
    if (this.lang === 'EN') {
      if (partsOfSpeech.includes(part)) {
        choiceWords = choice.ru[part].find((item) => item[0][0] === this.gameWords[index][0][0]);
      } else {
        choiceWords = choice.ru.other;
      }
    } else {
      choiceWords = choice.en.find((item) => item[0][0] === this.gameWords[index][0][0]);
    }
    const randWords = [this.gameWords[index][0]];
    while (randWords.length < 4) {
      const rand = Math.floor(Math.random() * choiceWords.length);
      if (!randWords.includes(choiceWords[rand])) {
        randWords.push(choiceWords[rand]);
      }
    }
    randWords.push(this.words[index].word);
    return randWords;
  }
}
