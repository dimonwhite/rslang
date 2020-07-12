import StatisticsView from './statisticsView';
import StatisticsModel from './statisticsModel';
import ChartMainController from './chartMain/chartMainController';
import TodayProgressController from './todayProgress/todayProgressController';
import GamesStatisticController from './gamesStatistic/gamesStatisticController';

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
    this.runComponents(this.statisticInfo);
  }

  runComponents(data) {
    this.statisticsView.renderHTML();
    this.todayProgressController = new TodayProgressController(data);
    this.todayProgressController.init();
    this.chartMainController = new ChartMainController(data, this.mainIndent);
    this.chartMainController.init();
    this.gamesStatisticController = new GamesStatisticController(data);
    this.gamesStatisticController.init();
  }
}
