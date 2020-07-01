import { createElement } from '../../utils';

export default class StatisticsView {
  constructor() {
    this.main = document.getElementById('main');
  }

  renderHTML() {
    this.main.append(this.body);
  }

  commonProgress(max, currentValue) {
    this.commonProgressBar = createElement({ tag: 'progress', class: 'common-progress' });
    this.commonProgressBar.setAttribute('max', max);
    this.commonProgressBar.setAttribute('value', currentValue);
    this.main.append(this.commonProgressBar);
  }
}
