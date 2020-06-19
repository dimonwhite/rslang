import book1 from '../../../data/book1';
import book2 from '../../../data/book2';
import book3 from '../../../data/book3';
import book4 from '../../../data/book4';
import book5 from '../../../data/book5';
import book6 from '../../../data/book6';
import rus from '../../../data/rus';

export default class Savannah {
  constructor(user, callResult) {
    this.user = user;
    this.callResult = callResult;
    this.lockChoice = true; //
    this.words = []; //
    this.gameWords = []; //
    this.stopRounds = [];
    this.level = 0;
    this.maxHeart = 5;
    this.heart = 5;
    this.count = 10;
    this.attempt = 0;
    this.correctly = 0;
    this.timeInterval = 7000;
    this.SHIP_HIGHT = 35;
    this.BG_HIGHT = 3500;
    this.studyWords = false;
    this.allStudyWords = []; // JSON.parse(localStorage.getItem('userAllStudyWords'));
  }

  create() {
    const main = document.getElementById('main');
    const savannah = document.createElement('section');
    savannah.className = 'savannah';
    savannah.id = 'savannah';
    savannah.append(this.createGame());
    main.append(savannah);
    this.savannah = document.getElementById('savannah');
    this.startBg = window.getComputedStyle(this.game, null).getPropertyValue('background-position-y');
    this.createEvent();
  }

  createGame() {
    const game = document.createElement('section');
    game.className = 'savannah__game';
    game.id = 'savGame';
    const heart = document.createElement('div');
    heart.className = 'savannah__game-heart';
    for (let i = 1; i <= this.heart; i += 1) {
      const img = document.createElement('img');
      img.className = 'savannah__game-heart-img';
      img.src = './img/heart.png';
      img.id = `savHeart${i}`;
      img.setAttribute('alt', '');
      heart.append(img);
    }
    game.append(heart);

    const fild = document.createElement('div');
    fild.className = 'savannah__game-fild';
    fild.id = 'savFild';
    this.fild = fild;
    const top = document.createElement('div');
    top.className = 'savannah__game-question';
    top.innerHTML = '';
    top.id = 'savTop';
    fild.append(top);
    const wrap = document.createElement('div');
    wrap.className = 'savannah__game-wrap';
    wrap.id = 'savOptions';
    for (let i = 1; i < 5; i += 1) {
      const answer = document.createElement('button');
      answer.id = `savAnswer${i}`;
      answer.className = 'savannah__game-answer';
      answer.setAttribute('type', 'button');
      answer.innerHTML = '';
      wrap.append(answer);
    }
    fild.append(wrap);
    const bottom = document.createElement('div');
    bottom.className = 'savannah__game-question';
    bottom.innerHTML = '';
    bottom.id = 'savBottom';
    fild.append(bottom);
    game.append(fild);

    const wrapTime = document.createElement('div');
    wrapTime.id = 'countdown';
    wrapTime.className = 'savannah__timer';
    this.countdown = wrapTime;
    const time = document.createElement('span');
    time.innerHTML = '3';
    time.className = 'savannah__timer-time';
    time.id = 'savTime';
    wrapTime.append(time);

    const text = document.createElement('p');
    text.innerHTML = 'Для быстрого ответа можно использовать клавиши 1, 2, 3, 4';
    text.className = 'savannah__timer-text';
    text.id = 'savText';
    wrapTime.append(text);

    const key = document.createElement('img');
    key.setAttribute('alt', '');
    key.src = './img/keyboard.png';
    key.className = 'savannah__timer-key';
    wrapTime.append(key);
    game.append(wrapTime);

    const ship = document.createElement('img');
    ship.src = './img/ship.png';
    ship.className = 'savannah__game-ship';
    ship.id = 'savShip';
    ship.setAttribute('alt', '');
    game.append(ship);
    this.game = game;
    return game;
  }

  createEvent() {
    document.getElementById('savOptions').addEventListener('click', (e) => {
      if (this.lockChoice) this.getAnswer(e);
    });
    document.getElementById('startGame').addEventListener('click', this.getStart.bind(this));
    document.getElementById('newGame').addEventListener('click', this.newGame.bind(this));
    document.body.onkeydown = (e) => {
      switch (e.code) {
        case 'Digit1':
          document.getElementById('savAnswer1').click();
          break;
        case 'Digit2':
          document.getElementById('savAnswer2').click();
          break;
        case 'Digit3':
          document.getElementById('savAnswer3').click();
          break;
        case 'Digit4':
          document.getElementById('savAnswer4').click();
          break;
        default:
          break;
      }
    };
  }

  createWords() {
    switch (this.level) {
      case 0:
        if (this.allStudyWords.length < 100) {
          this.random(book1.slice(0, 100));
        } else {
          this.studyWords = true;
          this.random(this.allStudyWords);
        }
        break;
      case 1:
        this.random(book1);
        break;
      case 2:
        this.random(book2);
        break;
      case 3:
        this.random(book3);
        break;
      case 4:
        this.random(book4);
        break;
      case 5:
        this.random(book5);
        break;
      case 6:
        this.random(book6);
        break;
      default:
        break;
    }
  }

  random(book) {
    const unique = [];
    for (let i = 0; i < this.count + this.maxHeart; i += 1) {
      const rand = Math.floor(Math.random() * (book.length + 1));
      if (book[rand] && book[rand].wordTranslate) {
        if (unique.includes(rand)) {
          i -= 1;
        } else {
          unique.push(rand);
          this.words.push(book[rand]);
        }
      } else {
        i -= 1;
      }
    }
  }

  getRandomIndexes(count) {
    try {
      const indexes = [];
      while (indexes.length < count) {
        const rand = Math.floor(Math.random() * count);
        if (!indexes.includes(rand)) indexes.push(rand);
      }
      return indexes;
    } catch (error) {
      this.error = error.message;
    }
    return new Array(count).fill(1).map((item, index) => index);
  }

  getWords() {
    try {
      for (let i = 0; i < this.words.length; i += 1) {
        this.gameWords.push([this.words[i].wordTranslate]);
        const WRONG_WORDS = 3;
        for (let j = 0; j < WRONG_WORDS; j += 1) {
          for (let k = 0; k < rus.length; k += 1) {
            if (rus[k][0][0] === this.words[i].wordTranslate[0]) {
              if (!this.gameWords[i].includes(rus[k][0])) {
                this.gameWords[i].push(rus[k][0]);
                k = rus.length;
              }
            }
          }
        }
        while (this.gameWords[i].length < 4) {
          this.gameWords[i].push(rus[Math.floor(Math.random() * rus.length)][0]);
        }
        this.gameWords[i].push(this.words[i].word);
      }
    } catch (error) {
      this.error = error.message;
    }
  }

  getStart() {
    this.savannah.classList.add('show');
    document.getElementById('begin').classList.add('hide');
    document.getElementById('savGame').style.backgroundImage = 'url(./img/bg-savana.svg)';
    // this.startBg = window.getComputedStyle(this.game, null)
    // .getPropertyValue('background-position-y');
    document.getElementById('savGame').classList.add('show-flex');
    this.getAudio('start');
    this.count = +document.getElementById('selectCount').value;
    // document.getElementById('savStart').classList.add('hide');
    // document.getElementById('savTime').classList.add('show');
    this.createWords();
    this.getWords();
    this.stopRounds = new Array(this.words.length).fill(true);
    setTimeout(() => { document.getElementById('savTime').innerHTML = 2; }, 1000);
    setTimeout(() => { document.getElementById('savTime').innerHTML = 1; }, 2000);
    setTimeout(this.getStartRound.bind(this), 3000);
    // this.getStartFn(this);
  }

  getStartRound() {
    this.countdown.classList.add('hide');
    this.fild.classList.add('show-flex');
    this.options = document.getElementById('savOptions');
    this.top = document.getElementById('savTop');
    this.bottom = document.getElementById('savBottom');
    this.ship = document.getElementById('savShip');
    this.attempt = 0;
    this.correctly = 0;
    this.heart = 5;
    this.lockChoice = true;
    // this.addStatistics();
    this.startNextRound();
  }

  startNextRound() {
    if (this.top) this.top.remove();
    if (this.bottom) this.bottom.remove();

    const randIndexes = this.getRandomIndexes(4);
    Array.from(this.options.children).forEach((item, index) => {
      const word = this.gameWords[this.attempt][randIndexes[index]];
      item.innerHTML = word;
      item.classList.remove('savannah__correct');
      item.classList.remove('savannah__incorrect');
      if (randIndexes[index] === 0) {
        item.setAttribute('data-answer', 'true');
      } else {
        item.setAttribute('data-answer', 'false');
      }
    });
    const rand = Math.floor(Math.random() * 2);
    if (rand) {
      const word = this.gameWords[this.attempt][4];
      const top = document.createElement('div');
      top.className = 'savannah__game-question';
      this.top = top;
      this.top.innerHTML = word;
      this.bottom = document.createElement('div');
      this.fild.prepend(this.top);
      this.fild.append(this.bottom);
      this.top.classList.add('move-from-top');
    } else {
      const word = this.gameWords[this.attempt][4];
      const bottom = document.createElement('div');
      bottom.className = 'savannah__game-question';
      this.bottom = bottom;
      this.bottom.innerHTML = word;
      this.top = document.createElement('div');
      this.fild.prepend(this.top);
      this.fild.append(this.bottom);
      this.bottom.innerHTML = word;
      this.bottom.classList.add('move-from-bottom');
    }
    setTimeout(() => { this.lockChoice = true; }, 500);
    setTimeout(this.nextWord.bind(this, this.attempt), 10000);
  }

  getAnswer({ target }) {
    if (target.tagName === 'BUTTON' && target.classList.length < 2 && this.lockChoice) {
      this.lockChoice = false;
      this.stopRounds[this.attempt] = false;
      if (target.dataset.answer === 'true') {
        this.getCorrectlyAnswer(target);
      } else {
        this.getIncorrectlyAnswer(target);
      }
      this.attempt += 1;
      // this.changeStatistics();
    }
    if (this.correctly === this.count || this.heart === 0) {
      this.lockChoice = false;
      if (this.heart === 0) {
        this.getAudio('game-over');
      } else {
        this.getAudio('win');
      }
      setTimeout(this.endGame.bind(this), 4000);
    } else {
      setTimeout(this.startNextRound.bind(this), 2300);
    }
  }

  getCorrectlyAnswer(target) {
    this.getAudio('correctly');
    target.classList.add('savannah__correct');
    if (this.top.classList.length > 1) {
      this.top.innerHTML = '';
      const matrix = window.getComputedStyle(this.top).getPropertyValue('transform');
      this.top.classList.remove('move-from-top');
      this.top.style.transform = matrix;
      this.top.classList.add('move-to-ship-top');
    } else {
      this.bottom.innerHTML = '';
      const matrix = window.getComputedStyle(this.bottom).getPropertyValue('transform');
      this.bottom.classList.remove('move-from-bottom');
      this.bottom.style.transform = matrix;
      this.bottom.classList.add('move-to-ship-bottom');
    }
    this.words[this.attempt].correctly = true;
    this.correctly += 1;

    const delta = (this.correctly / this.count);
    const bg = +this.startBg.replace('px', '');
    this.game.style.backgroundPositionY = `${bg + Math.floor(this.BG_HIGHT * delta)}px`;
    setTimeout(() => {
      this.ship.style.height = `${Math.floor(this.SHIP_HIGHT * (delta + 1))}px`;
      this.ship.style.width = `${Math.floor(this.SHIP_HIGHT * (delta + 1))}px`;
    }, 2000);
  }

  getIncorrectlyAnswer(target) {
    this.getAudio('mistake');
    target.classList.add('savannah__incorrect');
    if (this.top.classList.length > 1) {
      this.top.innerHTML = '';
      const top = window.getComputedStyle(this.top).getPropertyValue('transform');
      this.top.classList.remove('move-from-top');
      this.top.style.transform = top;
      this.top.classList.add('move-out-top');
    } else {
      this.bottom.innerHTML = '';
      const m = window.getComputedStyle(this.bottom).getPropertyValue('transform');
      this.bottom.classList.remove('move-from-bottom');
      this.bottom.style.transform = m;
      this.bottom.classList.add('move-out-bottom');
    }
    this.words[this.attempt].correctly = false;
    document.getElementById(`savHeart${this.maxHeart - this.heart + 1}`).src = './img/heart-empty.png';
    this.heart -= 1;
    // this.changeWordStatistics();
  }

  nextWord(indexRound) {
    if (this.stopRounds[indexRound]) {
      this.getAudio('mistake');
      this.words[this.attempt].correctly = false;
      document.getElementById(`savHeart${this.maxHeart - this.heart + 1}`).src = './img/heart-empty.png';
      this.heart -= 1;
      // this.changeWordStatistics();
      this.attempt += 1;
      // this.changeStatistics();
      if (this.top.classList.length > 1) {
        this.top.innerHTML = '';
        const matrix = window.getComputedStyle(this.top).getPropertyValue('transform');
        this.top.classList.remove('move-from-top');
        this.top.style.transform = matrix;
        this.top.classList.add('move-out-top');
      } else {
        this.bottom.innerHTML = '';
        const matrix = window.getComputedStyle(this.bottom).getPropertyValue('transform');
        this.bottom.classList.remove('move-from-bottom');
        this.bottom.style.transform = matrix;
        this.bottom.classList.add('move-out-bottom');
      }

      if (this.correctly === this.count || this.heart === 0) {
        if (this.heart === 0) {
          this.getAudio('game-over');
        } else {
          this.getAudio('win');
        }
        setTimeout(this.endGame.bind(this), 4000);
      } else {
        setTimeout(this.startNextRound.bind(this), 2500);
      }
    }
  }

  endGame() {
    this.top.remove();
    this.bottom.remove();
    this.fild.classList.remove('show-flex');
    this.countdown.classList.remove('hide');
    this.savannah.classList.remove('show');
    this.callResult(this.words, this.attempt);
  }

  newGame() {
    document.getElementById('begin').classList.remove('hide');
    document.getElementById('gameResult').classList.remove('show');
    document.getElementById('savTime').innerHTML = '3';
    this.ship.style.height = `${this.SHIP_HIGHT}px`;
    this.ship.style.width = `${this.SHIP_HIGHT}px`;
    this.game.style.backgroundPositionY = this.startBg;
    for (let i = 1; i <= this.maxHeart; i += 1) {
      document.getElementById(`savHeart${i}`).src = './img/heart.png';
    }
    this.gameWords = [];
    this.words = [];
  }

  getAudio(stateGame) {
    try {
      const audio = new Audio();
      switch (stateGame) {
        case 'start':
          audio.src = './sounds/start.mp3';
          break;
        case 'win':
          audio.src = './sounds/win.mp3';
          break;
        case 'correctly':
          audio.src = './sounds/correctly.mp3';
          break;
        case 'mistake':
          audio.src = './sounds/mistake.mp3';
          break;
        case 'game-over':
          audio.src = './sounds/game-over.mp3';
          break;
        default:
          break;
      }
      audio.autoplay = true;
    } catch (error) {
      this.error = error.message;
    }
  }
}
