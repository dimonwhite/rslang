import FillwordsModel from '@/components/games/fillwords/fillwordsModel';
import FillwordsView from '@/components/games/fillwords/fillwordsView';

export default class FillwordsController {
  constructor(http, openPopupResult) {
    this.alphabet = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'];
    this.openPopupResult = openPopupResult;
    this.view = new FillwordsView();
    this.model = new FillwordsModel(http);
    this.level = 0;
    this.lengthBoard = 20;
    this.heigthBoard = 20;
  }

  init() {
    this.createBoard();
    this.view.renderHtml();
  }

  change() {
    this.createNewBoard();
  }

  createBoard() {
    this.createNewBoard();
  }

  async createNewBoard() {
    this.board = [];
    for (let i = 0; i < this.lengthBoard; i += 1) {
      this.board.push([]);
      for (let j = 0; j < this.heigthBoard; j += 1) {
        this.board[i].push('');
      }
    }
    await this.fillBoard();
  }

  async fillBoard() {
    this.words = await this.model.getWords();
    this.words.forEach((word, i) => {
      const randomStart = Math.round(Math.random() * (this.lengthBoard - word.word.length));
      this.fillBoardRow(randomStart, word.word, i);
    });
    this.board = this.board.flat();
    this.fillRandomLetter();
  }

  fillBoardRow(start, word, i) {
    let ordinalLetter = 0;
    for (let j = start; ordinalLetter < word.length; j += 1) {
      this.board[i][j] = word[ordinalLetter];
      ordinalLetter += 1;
    }
  }

  fillRandomLetter() {
    this.board = this.board.map((item) => item || this.alphabet[Math.round(Math.random() * 25)]);
  }
}
