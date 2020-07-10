import FillwordsModel from '@/components/games/fillwords/fillwordsModel';
import FillwordsView from '@/components/games/fillwords/fillwordsView';
import { randomArray } from '@/utils';

export default class FillwordsController {
  constructor(http, openPopupResult) {
    this.alphabet = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'];
    this.openPopupResult = openPopupResult;
    this.view = new FillwordsView();
    this.model = new FillwordsModel(http);
    this.level = 0;
    this.lengthBoard = 10;
    this.heigthBoard = 10;
  }

  init() {
    this.createBoard();
    this.view.lengthBoard = this.lengthBoard;
    this.view.heigthBoard = this.heigthBoard;
    this.model.lengthBoard = this.lengthBoard;
    this.view.renderHtml();
    const moveBoardCallback = this.moveBoard.bind(this);
    this.view.boardWrap.addEventListener('mousedown', () => {
      this.resultMove = '';
      this.selectedLetters = [];
      this.view.boardWrap.addEventListener('mousemove', moveBoardCallback);
    });
    this.view.boardWrap.addEventListener('mouseup', () => {
      this.view.boardWrap.removeEventListener('mousemove', moveBoardCallback);
      if (this.isSuccessWord()) {
        this.view.successSelected(this.selectedLetters);
        this.score += 1;
      } else {
        this.view.cancelSelected(this.selectedLetters);
      }
      if (this.score >= this.countWords) {
        this.win();
      }
    });
  }

  isSuccessWord() {
    let result = false;
    this.words.forEach((word, i) => {
      if (word.word.toUpperCase() === this.resultMove.toUpperCase()) {
        this.view.successWord(i);
        word.success = true;
        result = true;
      }
    });
    return result;
  }

  moveBoard(e) {
    if (!e.target.classList.contains('active')) {
      e.target.classList.add('active');
      this.resultMove += e.target.textContent;
      this.selectedLetters.push(e.target);
    }
  }

  change() {
    this.createNewGame();
  }

  createBoard() {
    this.createNewGame();
  }

  async createNewGame() {
    this.score = 0;
    await this.createNewBoard();
    this.view.createWords(randomArray(this.words));
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
    this.view.fillBoard(this.board);
  }

  async fillBoard() {
    this.words = await this.model.getWords();
    this.countWords = this.words.length;
    this.words.forEach((word, i) => {
      const randomStart = Math.round(Math.random() * (this.lengthBoard - word.word.length));
      this.fillBoardRow(randomStart, word.word, i);
    });
    this.board = this.board.flat();
    this.fillRandomLetter();
  }

  fillBoardRow(start, word, i) {
    let ordinalLetter = 0;
    const newWord = !Math.round(Math.random()) ? word.split('').reverse().join('') : word;
    for (let j = start; ordinalLetter < newWord.length; j += 1) {
      this.board[i][j] = newWord[ordinalLetter];
      ordinalLetter += 1;
    }
  }

  fillRandomLetter() {
    this.board = this.board.map((item) => item || this.alphabet[Math.round(Math.random() * 25)]);
  }

  win() {
    this.openPopupResult(this.words);
  }

  getScore() {
    return this.score;
  }
}
