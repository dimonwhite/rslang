import { modifySentence, shuffleSentence } from './RoundData/modifySentence';

export default class RenderView {
  constructor(root, data, containerWidth, containerHeight) {
    this.root = root;
    this.data = data;
    this.row = null;
    this.containerHeight = containerHeight;
    this.containerWidth = containerWidth;
    this.rowHeight = containerHeight / 10; /*  10 - sentences number */
    this.puzzleContainer = null;
    this.wordContainer = null;
    this.sentenceTranslation = null;
  }

  modifyData() {
    let offsetY = 0;
    Object.values(this.data.sentences).forEach((el) => {
      const modified = modifySentence(el.textExample, this.containerWidth, this.rowHeight);
      Object.values(modified).forEach((word) => {
        const currentWord = word;
        currentWord.offsetY = offsetY;
      });
      const shuffled = shuffleSentence(modified);
      const currentEl = el;
      currentEl.splitted = modified;
      currentEl.shuffled = shuffled;
      offsetY += this.rowHeight;
    });
  }

  renderMainLayout() {
    this.root.innerHTML = `
      <div class="container">
        <div class="control-block">
        <div class="logout__wrapper"><button class="btn btn__logout"><i class="icon-logout"></i></button></div>
        <div class="btn__block">
          <button class="btn btn__backImg"><i class="icon-picture"></i><span class="tooltiptext">Click to toggle background images of puzzles</span></button>
          <button class="btn btn__audio__tip"><i class="icon-play"></i><span class="tooltiptext">Click to toggle audio tip </span></button>
          <button class="btn btn__translate"><i class="icon-book-open"></i><span class="tooltiptext">Click to toggle sentence translation</span></button>
          <select class="btn select-level">
            <option value="0">1</option>
            <option value="1">2</option>
            <option value="2">3</option>
            <option value="3">4</option>
            <option value="4">5</option>
            <option value="5">6</option>
          </select>
          <select class="btn select-round"></select>
          <button class="btn btn__select">Select round</button>
          <button class="btn btn__statistics__modal">Statistic</button>
        </div>
        <div class="btn__audio__wrapper"><button class="btn btn__audio"><i class="icon-sound"></i><span class="tooltiptext">Click to play audio pronounce of current sentence</span></button></div>
        <div class="sentence-translation"></div>
        </div>
        <div class="puzzle-container"></div>
        <div class="word-container"></div>
        <div class="control-block">
          <div class="btn__block btn__block_bottom">
            <button class="btn btn__check">Check</button>
            <button class="btn btn__continue">Continue</button>
            <button class="btn btn__idk">I don't know</button>
          </div>
        </div>
      </div>
    `;
    this.root.querySelector('.select-level').querySelectorAll('option').forEach((el) => {
      if (parseInt(el.value, 0) === this.data.level) {
        el.setAttribute('selected', 'true');
      }
    });
    let maxroundNumber = 25;
    while (maxroundNumber) {
      const option = document.createElement('option');
      option.setAttribute('value', maxroundNumber);
      option.innerText = maxroundNumber;
      this.root.querySelector('.select-round').append(option);
      maxroundNumber -= 1;
    }
    this.root.querySelector('.select-round').querySelectorAll('option').forEach((el) => {
      if (parseInt(el.value, 0) === this.data.roundNumber) {
        el.setAttribute('selected', 'true');
      }
    });

    this.puzzleContainer = this.root.querySelector('.puzzle-container');
    this.wordContainer = this.root.querySelector('.word-container');
    this.sentenceTranslation = this.root.querySelector('.sentence-translation');
    this.wordContainer.style.width = `${this.containerWidth + 100}px`;
    this.wordContainer.style.height = `${this.rowHeight + 20}px`;
    this.puzzleContainer.style.width = `${this.containerWidth}px`;
    this.puzzleContainer.style.height = `${this.containerHeight}px`;
  }

  renderRow() {
    this.row = document.createElement('div');
    this.row.classList.add('row');
    this.row.style.height = `${this.rowHeight}px`;
    this.row.style.outline = '2px dotted gray';
    return this.row;
  }

  renderWord(wordData) {
    this.word = document.createElement('div');
    this.word.classList.add('word', 'draggable');
    this.word.innerHTML = `<span>${wordData.word}</span>`;
    this.word.style.width = `${wordData.width}px`;
    this.word.style.height = `${this.rowHeight}px`;
    this.word.style.background = `url(${this.data.cutRoundImg}) no-repeat`;
    this.word.style.backgroundPosition = `-${wordData.offsetX}px -${wordData.offsetY}px`;
    this.word.style.backgroundSize = `${this.containerWidth}px ${this.containerHeight}px`;
    return this.word;
  }

  appendtranslation(translation) {
    this.sentenceTranslation.innerHTML = translation;
  }

  renderResult(sentenceData) {
    this.resultWindow = document.createElement('div');
    this.resultWindow.classList.add('result-window');
    this.resultWindow.innerHTML = `
      <div class="result-modal">
        <div class="result-modal__painting">
          <img class="result-modal__image" src=${sentenceData.roundImg} alt="round-image">
          <p class="result-modal__title">${sentenceData.roundImgData.author}, ${sentenceData.roundImgData.name} (${sentenceData.roundImgData.year}) </p>
        </div>
        <div class="result-modal__info">
          <h2>I don't know</h2>
          <div class="dont-know"></div>
          <h2>I know</h2>
          <div class="know"></div>
        </div>
        <div class="result-modal__btn">
          <button class="btn btn__continue__modal">Continue</button>
          <button class="btn btn__statistics__modal">Statistics</button>
        </div>
      </div>
    `;
    Object.values(sentenceData.sentences).forEach((el) => {
      const resultSentence = document.createElement('div');
      resultSentence.classList.add('result-sentence');
      resultSentence.innerHTML = `
      <img src="" alt="sound">
      <p>${el.textExample}</p>
      `;
      resultSentence.addEventListener('click', () => {
        const audio = new Audio(`${el.audio}`);
        audio.play();
      });
      if (el.idk === true) {
        this.resultWindow.querySelector('.dont-know').append(resultSentence);
      } else {
        this.resultWindow.querySelector('.know').append(resultSentence);
      }
    });
    return this.resultWindow;
  }

  renderstartScreen() {
    this.root.innerHTML = '';
    const startScreen = document.createElement('div');
    startScreen.classList.add('start-screen');
    startScreen.innerHTML = `
    <div class="start-screen__message">
      <h1>Howdy, partner!</h1>
      <p>Let's play english puzzle!</p>
      <p>You can drag puzzles or just click 'em, use tips and learn art history.</p>
      <p>Finish the puzzle and see some great art!</p>
      <button class ="btn btn__go">GO ON</button>
    </div>
    `;
    this.root.append(startScreen);
  }

  renderAuthorization() {
    const authorization = document.createElement('div');
    authorization.classList.add('authorization');
    authorization.innerHTML = `
    <form autocomplete="off" class="form form__login">
      <h2>Log in</h2>
      <p class="login__info"></p>
      <fieldset class="form__fieldset">
        <div class="form__field">
          <input name="login-email" type="email" placeholder="Email" required autofocus autocomplete="off" />
        </div>
        <div class="form__field">
          <input name="login-password" type="password" placeholder="Password" required autocomplete="off" value="" />
        </div>
      </fieldset>
      <div class="form__buttons">
        <input type="submit" value="Log In" class="btn btn__login">
      </div>
    </form>
    <form autocomplete="off" class="form form__signup">
    <h2>Sign up</h2>
    <p class="signup__info"></p>
    <fieldset class="form__fieldset">
      <div class="form__field">
        <input name="signup-email" type="email" placeholder="Email" class="forms_field-input" required autofocus />
      </div>
      <div class="form__field">
        <input name="signup-password" type="password" placeholder="Password" class="forms_field-input" required />
      </div>
    </fieldset>
    <div class="form__buttons">
      <input type="submit" value="Sign Up" class="btn btn__signup">
    </div>
  </form>
    `;
    this.root.append(authorization);
  }

  renderStatistic(data) {
    this.statWindow = document.createElement('div');
    this.statWindow.classList.add('stat-window');
    this.statWindow.innerHTML = `
      <div class="stat-modal">
        <div class="stat-modal__info">
          <h2>Statistics</h2>
          <div class="stat-modal__data"></div>
        </div>
        <div class="stat-modal__btn">
          <button class="btn btn__back">Back</button>
        </div>
      </div>
    `;
    this.root.append(this.statWindow);
    Object.values(data).forEach((el) => {
      const paragraph = document.createElement('p');
      paragraph.innerHTML = `${el.date} ${el.text}`;
      this.statWindow.querySelector('.stat-modal__data').append(paragraph);
    });
    this.statWindow.querySelector('.btn__back').onclick = () => {
      this.statWindow.remove();
    };
  }

  init() {
    this.modifyData();
    this.renderMainLayout();
  }
}
