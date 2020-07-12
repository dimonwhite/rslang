import FillwordsModel from '@/components/games/fillwords/fillwordsModel';
import FillwordsView from '@/components/games/fillwords/fillwordsView';
import { randomArray } from '@/utils';

export default class FillwordsController {
  constructor(http, openPopupResult) {
    this.alphabet = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'];
    this.openPopupResult = openPopupResult;
    this.view = new FillwordsView();
    this.model = new FillwordsModel(http);
    this.level = -1;
    this.lengthBoard = 10;
    this.heigthBoard = 10;
  }

  init() {
    this.view.lengthBoard = this.lengthBoard;
    this.view.heigthBoard = this.heigthBoard;
    this.model.lengthBoard = this.lengthBoard;
    this.view.renderHtml();
    this.addListeners();
    this.createBoard();
  }

  addListeners() {
    this.moveBoardCallback = this.moveBoard.bind(this);
    this.view.boardWrap.addEventListener('mousedown', this.mouseDownBoard.bind(this));
    this.view.boardWrap.addEventListener('touchstart', this.mouseDownBoard.bind(this));
    document.addEventListener('mouseup', this.mouseUpBoard.bind(this));
    document.addEventListener('touchend', this.mouseUpBoard.bind(this));
    document.addEventListener('touchcancel', this.mouseUpBoard.bind(this));
    this.view.newGame.addEventListener('click', () => {
      this.change();
    });
    this.view.btnResult.addEventListener('click', () => {
      this.openPopupResult(this.words);
    });
    this.view.wordsList.addEventListener('click', this.clickWordsList.bind(this));
    this.view.popupHint.addEventListener('click', (e) => {
      if (!this.view.popupHintImg.contains(e.target)) {
        this.view.popupHint.classList.remove('active');
      }
    });
    this.view.btnUserWords.addEventListener('click', () => {
      this.level = -1;
      this.change();
    });
  }

  mouseDownBoard() {
    this.isBoardMouseDown = true;
    this.resultMove = '';
    this.selectedLetters = [];
    this.view.boardWrap.addEventListener('mousemove', this.moveBoardCallback);
    this.view.boardWrap.addEventListener('touchmove', this.moveBoardCallback);
  }

  mouseUpBoard() {
    if (this.isBoardMouseDown) {
      this.isBoardMouseDown = false;
      this.view.boardWrap.removeEventListener('mousemove', this.moveBoardCallback);
      this.view.boardWrap.removeEventListener('touchmove', this.moveBoardCallback);
      if (this.isSuccessWord()) {
        this.view.successSelected(this.selectedLetters);
        this.score += 1;
        this.scoreSuccess += 1;
      } else {
        this.view.cancelSelected(this.selectedLetters);
      }
      this.checkWin();
    }
  }

  checkWin(isCheckWin) {
    if ((this.resultMove || isCheckWin) && this.score >= this.countWords) {
      this.win();
    }
  }

  clickWordsList(e) {
    const btnDontKnow = e.target.closest('.wordsList__item--dontKnow');
    const btnHint = e.target.closest('.wordsList__item--hint');
    let indexWord;
    if (btnDontKnow || btnHint) {
      indexWord = [...this.view.wordsList.childNodes].indexOf(e.target.closest('.wordsList__item'));
    }

    if (btnDontKnow) {
      const currentWord = this.words[indexWord];
      this.view.markSquares(currentWord.squareLetters);
      this.view.successWord(indexWord);
      this.score += 1;
      this.checkWin(true);
      return;
    }

    if (btnHint) {
      this.view.playAudio(this.words[indexWord]);
    }
  }

  isSuccessWord() {
    let result = false;
    this.words.forEach((word, i) => {
      if (word.word.toUpperCase() === this.resultMove.toUpperCase()) {
        this.view.successWord(i);
        word.success = true;
        this.view.playAudio(word);
        result = true;
      }
    });
    return result;
  }

  moveBoard(e) {
    let square;
    if (e.touches) {
      const myLocation = e.touches.item(0);
      const realTarget = document.elementFromPoint(myLocation.clientX, myLocation.clientY);
      square = realTarget.closest('.board__square');
    } else {
      square = e.target.closest('.board__square');
    }
    if (square && !square.classList.contains('active') && !square.classList.contains('success')) {
      square.classList.add('active');
      this.resultMove += square.textContent;
      this.selectedLetters.push(square);
    }
  }

  change() {
    this.model.level = this.level;
    this.createNewGame();
  }

  createBoard() {
    this.createNewGame();
  }

  async createNewGame() {
    this.score = 0;
    this.scoreSuccess = 0;
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
    this.words = await this.getWords();
    this.countWords = this.words.length;
    this.words.forEach((word, i) => {
      word.squareLetters = [];
      const randomStart = Math.round(Math.random() * (this.lengthBoard - word.word.length));
      this.fillBoardRow(randomStart, word, i);
    });
    this.board = this.board.flat();
    this.fillRandomLetter();
  }

  async getWords() {
    this.view.showPreloader();
    let words = [];
    if (this.level < 0) {
      words = await this.model.getUserWords();
      this.view.activateBtnUserWords();
    }
    if (this.level < 0 && !words.length) {
      this.level = 0;
      this.model.level = this.level;
      this.view.activateLevel(this.level);
    }
    if (!words.length) {
      this.view.deactivateBtnUserWords();
      words = await this.model.getWords();
    }
    this.view.hidePreloader();
    return words;
  }

  fillBoardRow(start, wordObject, i) {
    const { word } = wordObject;
    let ordinalLetter = 0;
    const newWord = !Math.round(Math.random()) ? word.split('').reverse().join('') : word;
    for (let j = start; ordinalLetter < newWord.length; j += 1) {
      this.board[i][j] = newWord[ordinalLetter];
      wordObject.squareLetters.push(i * 10 + j);
      ordinalLetter += 1;
    }
  }

  fillRandomLetter() {
    this.board = this.board.map((item) => item || this.alphabet[Math.round(Math.random() * 25)]);
  }

  win() {
    this.openPopupResult(this.words);
    this.view.addClassAllLetters();
    this.model.successCount = this.scoreSuccess;
    this.model.errorCount = this.score - this.scoreSuccess;
    this.model.setUserStatistics();
  }

  getScore() {
    return this.scoreSuccess;
  }

  removeListeners() {
    document.removeEventListener('mouseup', this.mouseUpBoard.bind(this));
    document.removeEventListener('touchend', this.mouseUpBoard.bind(this));
    document.removeEventListener('touchcancel', this.mouseUpBoard.bind(this));
  }
}
