import StatisticsView from './statisticsView';
import StatisticsModel from './statisticsModel';

export default class StatisticsController {
  constructor(user) {
    this.user = user;
    this.statisticsView = new StatisticsView(60);
    this.statisticsModel = new StatisticsModel(user, 60);
  }

  init() {
    this.create();
  }

  create() {
    this.statisticsView.commonProgress(
      this.statisticsModel.quantityAllWords,
      this.statisticsModel.quantityStudyWords,
    );
    this.drawMainChart();
  }

  drawMainChart() {
    this.statisticsView.baseSettingsCanvas(this.statisticsModel.baseSettingsCanvas());
    this.statisticsView.drawAxis('x');
    this.statisticsView.drawAxis('y');
    this.statisticsView.drawScale(this.statisticsModel.dataScale(), 'x');
    this.statisticsView.drawScale(this.statisticsModel.dataScale(), 'y');
    this.statisticsView.drawSignaturesScale(this.statisticsModel.dataScale(), 'x');
    this.statisticsView.drawSignaturesScale(this.statisticsModel.dataScale(), 'y');
    this.statisticsView.drawMainChartLines(this.statisticsModel.dataScale());
  }
}
