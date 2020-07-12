import TodayProgressView from './todayProgressView';
import TodayProgressModel from './todayProgressModel';

export default class TodayProgressController {
  constructor(statistic) {
    this.todayProgressView = new TodayProgressView();
    this.todayProgressModel = new TodayProgressModel(statistic);
  }

  init() {
    this.todayProgressView.create(this.todayProgressModel.totalWord,
      this.todayProgressModel.learnedToday);
  }
}
