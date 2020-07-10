import Sortable from 'sortablejs';

import RoundData from './RoundData/RoundData';
import RenderView from './RenderView';

export default class PuzzleController {
  constructor(http) {
    this.http = http;
    this.root = document.querySelector('.main');
    this.imgWidth = 600;
    this.imgHeight = 400;
    this.startDelay = true;
    this.roundData = null;
    this.renderView = null;
    this.currentRow = 0;
    this.puzzleRow = null;
    this.ethaloneSentence = null;
    this.audioTip = null;
    this.clickListener = this.clickListener.bind(this);
  }

  tipsHandler() {
    if (this.roundData.tips.translate) {
      this.renderView
        .appendtranslation(this.roundData.sentences[this.currentRow].textExampleTranslate);
    } else {
      this.renderView.appendtranslation('');
    }

    if (!this.roundData.tips.backImg) {
      [...this.renderView.wordContainer.querySelectorAll('.word')].forEach((el) => {
        const word = el;
        word.style.backgroundImage = 'none';
        word.style.backgroundColor = '#adbaec';
      });
    }

    if (this.roundData.tips.autoPlay) {
      this.playAudioTip();
      this.renderView.displayElement('.btn__audio', 'inline-block');
    } else {
      this.renderView.displayElement('.btn__audio', 'none');
    }
  }

  makeRow() {
    this.renderView.modifyData();
    this.puzzleRow = this.renderView.renderRow();
    this.puzzleRow.classList.add('row__current');
    this.ethaloneSentence = this.roundData.sentences[this.currentRow].splitted;

    this.renderView.puzzleContainer.append(this.puzzleRow);
    Object.values(this.roundData.sentences[this.currentRow].shuffled).forEach((wordData) => {
      const word = this.renderView.renderWord(wordData);
      word.addEventListener('click', (e) => {
        if (word.parentElement !== this.puzzleRow) {
          this.puzzleRow.append(e.target);
          this.startCheck();
        }
      });
      this.renderView.wordContainer.append(word);
    });

    this.tipsHandler();

    this.sortableRow = Sortable.create(this.puzzleRow, {
      group: {
        name: 'row',
        put: true,
      },
      animation: 100,
      onEnd: () => {
        this.startCheck();
      },
    });

    this.sortableWord = Sortable.create(this.renderView.wordContainer, {
      group: {
        name: 'wordContainer',
        pull: true,
      },
      animation: 100,
      dragClass: 'draggable',
      onEnd: () => {
        this.startCheck();
      },
    });
  }

  playAudioTip() {
    this.root.querySelector('.btn__audio').classList.add('playing');
    const audioSrc = this.roundData.sentences[this.currentRow].audio;
    if (this.audioTip) {
      this.audioTip.pause();
    }
    this.audioTip = new Audio(audioSrc);
    this.audioTip.play();

    this.audioTip.onended = () => {
      if (this.root.querySelector('.btn__audio')) {
        this.root.querySelector('.btn__audio').classList.remove('playing');
      }
    };
  }

  startCheck() {
    if (this.puzzleRow.children.length === Object.keys(this.ethaloneSentence).length) {
      this.renderView.displayElement('.btn__check', 'inline-block');
      this.renderView.displayElement('.btn__idk', 'none');
    }
  }

  checkPuzzle() {
    let right = 0;
    const puzzleContainerList = this.puzzleRow.querySelectorAll('.word');
    puzzleContainerList.forEach((word) => {
      word.classList.remove('right', 'wrong');
    });
    [...puzzleContainerList].forEach((el, i) => {
      if (el.innerText === this.roundData.sentences[this.currentRow].splitted[i].word) {
        el.classList.add('right');
        right += 1;
      } else {
        el.classList.add('wrong');
      }
    });
    if (right === Object.keys(this.ethaloneSentence).length) {
      if (!this.roundData.sentences[this.currentRow].success) {
        this.playAudioTip();
      }
      this.renderView.displayElement('.btn__check', 'none');
      this.renderView.displayElement('.btn__continue', 'inline-block');
    } else {
      this.renderView.displayElement('.btn__idk', 'inline-block');
    }
  }

  dontKnowHandler() {
    this.roundData.fail += 1;
    this.roundData.sentences[this.currentRow].success = true;
    this.finishRow();
    this.renderView.displayElement('.btn__continue', 'inline-block');
    this.renderView.displayElement('.btn__idk', 'none');
  }

  finishRow() {
    if (this.roundData.sentences[this.currentRow].success) {
      this.playAudioTip();
    }
    this.renderView
      .appendtranslation(this.roundData.sentences[this.currentRow].textExampleTranslate);
    this.renderView.wordContainer.innerHTML = '';
    this.puzzleRow.innerHTML = '';

    this.puzzleRow.style.outline = 'none';
    this.renderView.displayElement('.btn__check', 'none');

    this.sortableRow.destroy();
    this.sortableWord.destroy();

    Object.values(this.ethaloneSentence).forEach((word) => {
      this.puzzleRow.append(this.renderView.renderWord(word));
    });
  }

  async startRound() {
    this.renderView.renderPreloader();
    await this.roundData.formSentenceData();
    this.renderView.init();
    this.makeRow();
  }

  async finishRound() {
    this.renderView.displayElement('.btn__idk', 'none');
    const fullpainting = new Image();
    fullpainting.src = this.roundData.roundImg;
    fullpainting.onload = () => {
      this.renderView.puzzleContainer.innerHTML = '';
      this.renderView.puzzleContainer.style.background = `url(${fullpainting.src})`;
      this.renderView.puzzleContainer.style.backgroundSize = `${this.imgWidth}px ${this.imgHeight}px`;
      this.root.querySelector('.sentence-translation').innerHTML = `
      ${this.roundData.roundImgData.author}, ${this.roundData.roundImgData.name} (${this.roundData.roundImgData.year})
      `;
    };

    await this.roundData.setStatistics();

    const hidePaintingDelay = 3000;

    setTimeout(() => {
      this.root.innerHTML = '';
      this.root.append(this.renderView.renderResult(this.roundData, this.roundData.fail));
      this.roundData.fail = 0;
    }, hidePaintingDelay);
  }

  async continue() {
    if (!this.roundData.sentences[this.currentRow].success) {
      this.finishRow();
    }
    this.renderView.displayElement('.btn__continue', 'none');
    if (this.currentRow < 9) {
      this.currentRow += 1;
      this.makeRow();
    } else {
      await this.finishRound();
      this.currentRow = 0;
      if (this.roundData.isUserWords) {
        return;
      }
      if (this.roundData.roundNumber < 25) {
        this.roundData.roundNumber += 1;
      } else if (this.roundData.roundNumber === 25 && this.roundData.level < 5) {
        this.roundData.roundNumber = 1;
        this.roundData.level += 1;
      }
      return;
    }
    this.renderView.displayElement('.btn__idk', 'inline-block');
  }

  clickListener(e) {
    if (e.target.closest('.btn__go')) {
      this.startRound();
    }

    if (e.target.closest('.btn__continue')) {
      this.puzzleRow.classList.remove('row__current');
      this.roundData.setLocalStorage('level', this.roundData.level);
      this.roundData.setLocalStorage('roundNumber', this.roundData.roundNumber);
      this.continue();
    }

    if (e.target.closest('.btn__continue__modal')) {
      this.startRound();
    }

    if (e.target.closest('.btn__check')) {
      this.checkPuzzle();
    }

    if (e.target.closest('.btn__idk')) {
      this.dontKnowHandler();
    }

    if (e.target.closest('.btn__backImg')) {
      e.target.closest('.btn__backImg').classList.toggle('inactive');
      this.roundData.tips.backImg = !this.roundData.tips.backImg;
      this.roundData.setLocalStorage('tips', this.roundData.tips);
    }

    if (e.target.closest('.btn__audio')) {
      this.playAudioTip();
    }

    if (e.target.closest('.btn__translate')) {
      e.target.closest('.btn__translate').classList.toggle('inactive');
      this.roundData.tips.translate = !this.roundData.tips.translate;
      this.roundData.setLocalStorage('tips', this.roundData.tips);
    }

    if (e.target.closest('.btn__audio__tip')) {
      e.target.closest('.btn__audio__tip').classList.toggle('inactive');
      this.roundData.tips.autoPlay = !this.roundData.tips.autoPlay;
      this.roundData.setLocalStorage('tips', this.roundData.tips);
    }

    if (e.target.closest('.btn__select')) {
      this.roundData.isUserWords = false;
      this.roundData.level = parseInt(this.root.querySelector('.select-level').value, 0);
      this.roundData.roundNumber = parseInt(this.root.querySelector('.select-round').value, 0);
      this.roundData.setLocalStorage('level', this.roundData.level);
      this.roundData.setLocalStorage('roundNumber', this.roundData.roundNumber);
      this.startRound();
    }

    if (e.target.closest('.btn__userwords')) {
      this.roundData.isUserWords = !this.roundData.isUserWords;
      this.startRound();
    }

    if (e.target.closest('.btn__statistics')) {
      this.showStats().then(() => {
        this.renderView.statWindow.addEventListener('click', () => {
          this.renderView.removeModal();
        });
      });
    }
  }

  addListeners() {
    this.root.addEventListener('click', this.clickListener);
  }

  removeListeners() {
    this.root.removeEventListener('click', this.clickListener);
  }

  async showStats() {
    const stats = await this.roundData.getStatistics();
    this.renderView.renderStats(stats.optional.puzzle);
  }

  async init() {
    this.roundData = await new RoundData(this.http);
    this.renderView = new RenderView(this.root, this.roundData, this.imgWidth, this.imgHeight);
    this.addListeners();
  }
}
