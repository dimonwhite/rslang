import StatisticsView from './statisticsView';
import StatisticsModel from './statisticsModel';

export default class StatisticsController {
  constructor(user) {
    this.user = user;
    this.statisticsView = new StatisticsView();
    this.statisticsModel = new StatisticsModel(user);
  }

  init() {
    this.create();
  }

  create() {
    this.statisticsView.commonProgress(
      this.statisticsModel.quantityAllWords,
      this.statisticsModel.quantityStudyWords,
    );
  }
}
