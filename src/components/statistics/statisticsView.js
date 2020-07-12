import { createElement } from '@/utils';

export default class StatisticsView {
  constructor(indent) {
    this.main = document.getElementById('main');
    this.mainStatisticInformation = createElement({ tag: 'div', class: 'main-statistic-info' });
    this.progress = createElement({ tag: 'div', class: 'progress' });
    this.mainIndent = indent;
  }

  renderHTML() {
    this.main.prepend(this.progress);
    this.main.append(this.mainStatisticInformation);
  }
}
