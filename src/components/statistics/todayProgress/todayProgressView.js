import { createElement } from '../../../utils';

export default class TodayProgressView {
  constructor() {
    this.main = document.getElementById('main');
    this.progress = createElement({ tag: 'div', class: 'progress' });
    this.progressBar = createElement({ tag: 'div', class: 'progress-bar' });
  }

  create(max, currentValue) {
    this.createProgressBar(max, currentValue);
  }

  createProgressBar(max, currentValue) {
    this.progress.innerHTML = `<h2 class="progress-title">Ваш прогресс</h2>
    <div class='progress-bar'>
      <p class='progress-learned-words'>${currentValue} <span>слов</span></p>
      <div class='progress-scale'>
        <input class="progress-slider" type="range" max="${max}" value="${currentValue}" disabled>
        <progress class="progress-line" max="${max}" value="${currentValue}"></progress>
      </div>
      <p class='progress-all-words'><span>из</span> ${max}</p>
    </div>
    `;
    this.main.append(this.progress);

    // this.commonProgressSlider = createElement({ tag: 'input', class: 'progress-slider' });
    // this.commonProgressSlider.setAttribute('type', 'range');
    // this.commonProgressSlider.setAttribute('max', max);
    // this.commonProgressSlider.setAttribute('value', currentValue);
    // this.commonProgressSlider.setAttribute('disabled', 'disabled');

    // this.commonProgressLine = createElement({ tag: 'progress', class: 'progress-line' });
    // this.commonProgressLine.setAttribute('max', max);
    // this.commonProgressLine.setAttribute('value', currentValue);

    // this.progressLearnedWords = createElement({ tag: 'p', class: 'progress-learned-words' });
    // this.progressLearnedWords.innerHTML = `${currentValue} <span>слов</span>`;
    // this.progressAllWords = createElement({ tag: 'p', class: 'progress-all-words',
    // content: max });
    // this.progressAllWords.innerHTML = `<span>из</span> ${max}`;

    // this.main.append(this.progress);
    // this.progress.append(this.progressBar);
    // this.progressBar.append(this.commonProgressSlider);
    // this.progressBar.append(this.commonProgressLine);
    // this.progress.prepend(this.progressLearnedWords);
    // this.progress.append(this.progressAllWords);
  }
}
