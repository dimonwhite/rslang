export default class SavannahView {
  constructor(callResult) {
    this.savannah = document.getElementById('main');

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

  renderHTML() {
    const main = document.getElementById('main');
    const savannah = document.createElement('section');
    savannah.className = 'savannah';
    savannah.id = 'savannah';
    savannah.append(this.createGame());
    main.append(savannah);
    this.savannah = savannah;
    this.startBg = window.getComputedStyle(this.game, null).getPropertyValue('background-position-y');
    // this.createEvent();
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

  getStart() {
    this.savannah.classList.add('show');
    document.getElementById('begin').classList.add('hide');
    document.getElementById('savGame').style.backgroundImage = 'url(./img/bg-savana.svg)';
    document.getElementById('savGame').classList.add('show-flex');
    setTimeout(() => { document.getElementById('savTime').innerHTML = 2; }, 1000);
    setTimeout(() => { document.getElementById('savTime').innerHTML = 1; }, 2000);
    return +document.getElementById('selectCount').value;
  }

  getStartRound() {
    this.countdown.classList.add('hide');
    this.fild.classList.add('show-flex');
    this.options = document.getElementById('savOptions');
    this.top = document.getElementById('savTop');
    this.bottom = document.getElementById('savBottom');
    this.ship = document.getElementById('savShip');
  }
}
