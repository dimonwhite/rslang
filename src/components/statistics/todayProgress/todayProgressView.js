import { createElement } from '../../../utils';

export default class TodayProgressView {
  constructor() {
    this.main = document.getElementById('main');
    this.progress = document.querySelector('.progress');
    this.progressBar = createElement({ tag: 'div', class: 'progress-bar' });
  }

  create(max, currentValue, commonQuantityWords) {
    this.createProgressBar(max, currentValue, commonQuantityWords);
  }

  createProgressBar(max, currentValue, allWords) {
    if (this.progress) {
      this.progress.innerHTML = `<h2 class="progress-title">Ваш прогресс на сегодня</h2>
      <div class='progress-bar'>
        <p class='progress-learned-words'>${currentValue} <span>слов</span></p>
        <div class='progress-scale'>
          <div class="progress-fire" style="width: ${currentValue / (max / 100)}%"></div>
          <progress class="progress-line" max="${max}" value="${currentValue}"></progress>
        </div>
        <p class='progress-all-words'><span>из</span> ${max}</p>
      </div>
      <div class='common-quantity-words'>Вы уже знаете <span>${allWords}</span> слов!</div>`;
    }
  }
}
