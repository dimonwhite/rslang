import { createElement } from '../../../utils';

export default class TodayProgressView {
  constructor() {
    this.main = document.getElementById('main');
    this.progress = document.querySelector('.progress');
    this.progressBar = createElement({ tag: 'div', class: 'progress-bar' });
  }

  create(max, currentValue, commonQuantityWords) {
    this.createProgressBar(max, currentValue, commonQuantityWords);
    document.body.classList.add('statistic-page');
  }

  createProgressBar(max, currentValue, commonQuantityWords) {
    this.progress.innerHTML = `<h2 class="progress-title">Ваш прогресс на сегодня</h2>
    <div class='progress-bar'>
      <p class='progress-learned-words'>${currentValue} <span>слов</span></p>
      <div class='progress-scale'>
        <input class="progress-slider" type="range" max="${max}" value="${currentValue}" disabled>
        <progress class="progress-line" max="${max}" value="${currentValue}"></progress>
      </div>
      <p class='progress-all-words'><span>из</span> ${max}</p>
    </div>
    <div class='common-quantity-words'>Вы уже знаете <span>${commonQuantityWords}</span>!</div>
    `;
  }
}
