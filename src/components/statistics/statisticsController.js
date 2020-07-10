import StatisticsView from './statisticsView';
import StatisticsModel from './statisticsModel';
import ChartMainController from './chartMain/chartMainController';
import TodayProgressController from './todayProgress/todayProgressController';

export default class StatisticsController {
  constructor(http) {
    this.http = http;
    this.mainIndent = 60;
    this.statisticsView = new StatisticsView(this.mainIndent);
    this.statisticsModel = new StatisticsModel(http, this.mainIndent);
  }

  init() {
    this.create();
  }

  async create() {
    this.statisticInfo = await this.statisticsModel.getStatistic();
    // this.statisticsModel.createDataStatistic(statisticInfo);
    // this.statisticsView.commonProgress(
    //   this.statisticsModel.quantityAllWords,
    //   this.statisticsModel.quantityStudyWords,
    // );
    // this.drawMainChart();
    this.runComponents(this.statisticInfo);
  }

  runComponents(data) {
    this.todayProgressController = new TodayProgressController(data);
    this.todayProgressController.init();
    this.chartMainController = new ChartMainController(data, this.mainIndent);
    this.chartMainController.init();

    console.log(data);
  }

  // drawMainChart() {
  //   this.statisticsView.baseSettingsCanvas(this.statisticsModel.baseSettingsCanvas());
  //   this.statisticsView.drawAxis('x');
  //   this.statisticsView.drawAxis('y');
  //   this.statisticsView.drawScale(this.statisticsModel.dataScale(), 'x');
  //   this.statisticsView.drawScale(this.statisticsModel.dataScale(), 'y');
  //   this.statisticsView.drawSignaturesScale(this.statisticsModel.dataScale(), 'x');
  //   this.statisticsView.drawSignaturesScale(this.statisticsModel.dataScale(), 'y');
  //   this.statisticsView.drawMainChartLines(this.statisticsModel.dataScale());
  // }
}
