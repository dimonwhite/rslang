import StatisticsView from './statisticsView';
import StatisticsModel from './statisticsModel';

export default class DictionaryController {
  constructor(user) {
    this.statisticsView = new StatisticsView();
    this.statisticsModel = new StatisticsModel(user);
  }

  create() {
    this.statisticsView.renderHTML();
  }
}
