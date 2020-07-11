import studyWords from '@/data/mock_StudyWords';
import book1 from '@/data/book1';
// import ChartMainModel from './chartMain/chartMainModel';

export default class StatisticsModel {
  constructor(http, indent) {
    this.http = http;
    this.quantityAllWords = book1.length;
    this.quantityStudyWords = studyWords.length;
    this.widthWindow = document.documentElement.clientWidth;
    this.data = {};
    this.mainIndent = indent;
  }

  async getStatistic() {
    this.request = await this.http.getUserStatistics();
    return this.request;
  }
}
