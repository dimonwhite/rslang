import ChartMainModel from './chartMainModel';
import ChartMainView from './chartMainView';

export default class ChartMainController {
  constructor(statistic, indent) {
    this.chartMainView = new ChartMainView(indent);
    this.chartMainModel = new ChartMainModel(indent, statistic);
  }

  init() {
    this.chartMainView.baseSettingsCanvas(this.chartMainModel.baseSettingsCanvas());
    this.chartMainView.drawAxis('x');
    this.chartMainView.drawAxis('y');
    this.chartMainView.drawScale(this.chartMainModel.dataScale(), 'x');
    this.chartMainView.drawScale(this.chartMainModel.dataScale(), 'y');
    this.chartMainView.drawSignaturesScale(this.chartMainModel.dataScale(), 'x');
    this.chartMainView.drawSignaturesScale(this.chartMainModel.dataScale(), 'y');
    this.chartMainView.drawMainChartLines(this.chartMainModel.dataScale());
    this.createDataSignature();
  }

  createDataSignature() {
    this.chartMainView.showSignaturesData({
      quantityWord: Object.values(this.chartMainModel.dataChart),
      ranges: this.chartMainModel.determinePointsRange(),
    });
  }
}
