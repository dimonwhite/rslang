import Sortable from 'sortablejs';

import RoundData from './RoundData/RoundData';
import RenderView from './RenderView';
import obtainWords from './RoundData/obtainWords';

export default class PuzzleController {
  constructor() {
    this.root = document.querySelector('.main');
    this.imgWidth = 600;
    this.imgHeight = 400;
    this.startDelay = true;
    this.roundData = null;
    this.renderView = null;
    this.roundNumber = 1;
    this.level = 0;
    this.currentRow = 0;
    this.tips = {
      backImg: true,
      translate: true,
      autoPlay: true,
    };
    this.puzzleRow = null;
    this.ethaloneSentence = null;
    this.audioTip = null;
    this.clickListener = this.clickListener.bind(this);
  }

  tipsHandler() {
    if (this.tips.translate) {
      this.renderView
        .appendtranslation(this.roundData.sentences[this.currentRow].textExampleTranslate);
    } else {
      this.renderView.appendtranslation('');
    }

    if (!this.tips.backImg) {
      [...this.renderView.wordContainer.querySelectorAll('.word')].forEach((el) => {
        const word = el;
        word.style.backgroundImage = 'none';
        word.style.backgroundColor = '#adbaec';
      });
    }

    if (this.tips.autoPlay) {
      this.playAudioTip();
      this.displayElement('.btn__audio', 'inline-block');
    } else {
      this.displayElement('.btn__audio', 'none');
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

  displayElement(nodeSelector, display) {
    this.root.querySelector(nodeSelector).style.display = display;
  }

  startCheck() {
    if (this.puzzleRow.children.length === Object.keys(this.ethaloneSentence).length) {
      this.displayElement('.btn__check', 'inline-block');
      this.displayElement('.btn__idk', 'none');
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
      this.displayElement('.btn__check', 'none');
      this.displayElement('.btn__continue', 'inline-block');
    } else {
      this.displayElement('.btn__idk', 'inline-block');
    }
  }

  dontKnowHandler() {
    this.finishRow();
    this.displayElement('.btn__continue', 'inline-block');
    this.displayElement('.btn__idk', 'none');
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
    this.displayElement('.btn__check', 'none');

    this.sortableRow.destroy();
    this.sortableWord.destroy();

    Object.values(this.ethaloneSentence).forEach((word) => {
      this.puzzleRow.append(this.renderView.renderWord(word));
    });
  }

  async startRound() {
    this.tips = {
      backImg: true,
      translate: true,
      autoPlay: true,
    };
    this.roundData = await new RoundData(this.level, this.roundNumber, obtainWords);
    this.renderView = await new RenderView(this.root,
      this.roundData, this.imgWidth, this.imgHeight);

    await this.roundData.formSentenceData();
    this.renderView.init();
    this.makeRow();
  }

  finishRound() {
    this.displayElement('.btn__idk', 'none');
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

    const hidePaintingDelay = 3000;

    setTimeout(() => {
      this.root.innerHTML = '';
      this.root.append(this.renderView.renderResult(this.roundData));
    }, hidePaintingDelay);
  }

  async continue() {
    if (!this.roundData.sentences[this.currentRow].success) {
      this.finishRow();
    }
    this.displayElement('.btn__continue', 'none');
    if (this.currentRow < 9) {
      this.currentRow += 1;
      this.makeRow();
    } else {
      this.finishRound();
      this.currentRow = 0;
      if (this.roundNumber < 25) {
        this.roundNumber += 1;
      } else if (this.roundNumber === 25 && this.level < 5) {
        this.roundNumber = 1;
        this.level += 1;
      }
      return;
    }
    this.displayElement('.btn__idk', 'inline-block');
  }

  clickListener(e) {
    if (e.target.closest('.btn__go')) {
      this.startRound();
    }

    if (e.target.closest('.btn__continue')) {
      this.puzzleRow.classList.remove('row__current');
      this.continue();
    }

    if (e.target.closest('.btn__continue__modal')) {
      this.startRound();
    }

    if (e.target.closest('.btn__check')) {
      this.checkPuzzle();
    }

    if (e.target.closest('.btn__idk')) {
      this.roundData.sentences[this.currentRow].success = true;
      this.dontKnowHandler();
    }

    if (e.target.closest('.btn__backImg')) {
      e.target.closest('.btn__backImg').classList.toggle('inactive');
      this.tips.backImg = !this.tips.backImg;
    }

    if (e.target.closest('.btn__audio')) {
      this.playAudioTip();
    }

    if (e.target.closest('.btn__translate')) {
      e.target.closest('.btn__translate').classList.toggle('inactive');
      this.tips.translate = !this.tips.translate;
    }

    if (e.target.closest('.btn__audio__tip')) {
      e.target.closest('.btn__audio__tip').classList.toggle('inactive');
      this.tips.autoPlay = !this.tips.autoPlay;
    }

    if (e.target.closest('.btn__select')) {
      this.level = parseInt(this.root.querySelector('.select-level').value, 0);
      this.roundNumber = parseInt(this.root.querySelector('.select-round').value, 0);
      this.startRound();
    }
  }

  addListeners() {
    this.root.addEventListener('click', this.clickListener);
  }

  removeListeners() {
    this.root.removeEventListener('click', this.clickListener);
  }

  async init() {
    this.roundData = await new RoundData(this.level, this.roundNumber, obtainWords);
    this.renderView = new RenderView(this.root, this.roundData, this.imgWidth, this.imgHeight);
    this.addListeners();
  }
}
