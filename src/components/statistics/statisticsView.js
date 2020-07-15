import { createElement } from '../../utils';

export default class StatisticsView {
  constructor(indent) {
    this.main = document.getElementById('main');
    this.mainStatisticInformation = createElement({ tag: 'div', class: 'main-statistic-info' });
    this.progress = createElement({ tag: 'div', class: 'progress' });
    this.mainIndent = indent;
    this.body = document.body;
  }

  renderHTML() {
    if (document.body.classList.contains('statistic-page')) {
      this.main.prepend(this.progress);
      this.main.append(this.mainStatisticInformation);
    }
  }

  addClassBody() {
    this.body.classList.add('statistic-page');
  }
}
