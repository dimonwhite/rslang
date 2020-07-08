import { createElement } from '../../utils';

export default class StatisticsView {
  constructor(indent) {
    this.main = document.getElementById('main');
    this.canvasMainChart = createElement({ tag: 'canvas', class: 'graphMain' });
    this.canvasMainChartContext = this.canvasMainChart.getContext('2d');
    this.mainIndent = indent;
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

  baseSettingsCanvas(sizes) {
    this.canvasMainChartWidth = sizes.width;
    this.canvasMainChartHeight = sizes.height;
    this.setSettingsCanvas = function () {
      this.canvasMainChart.setAttribute('width', sizes.width);
      this.canvasMainChart.setAttribute('height', sizes.height);
      this.main.append(this.canvasMainChart);
    };
    return this.setSettingsCanvas();
  }

  drawAxis(axis) {
    this.canvasMainChartContext.strokeStyle = '#ffeb00';
    this.canvasMainChartContext.lineWidth = 5.0;
    this.canvasMainChartContext.lineCap = 'round';
    this.canvasMainChartContext.moveTo(
      this.mainIndent,
      (this.canvasMainChartHeight - this.mainIndent),
    );
    switch (axis) {
      case 'x':
        this.canvasMainChartContext.lineTo(this.canvasMainChartWidth - this.mainIndent,
          this.canvasMainChartHeight - this.mainIndent);
        break;
      case 'y':
        this.canvasMainChartContext.lineTo(this.mainIndent, this.mainIndent);
        break;
      default:
        break;
    }
    this.canvasMainChartContext.stroke();
  }

  drawScale(data, axis) {
    this.canvasMainChartContext.strokeStyle = '#ffeb00';
    this.canvasMainChartContext.lineWidth = 3.0;
    this.canvasMainChartContext.lineCap = 'round';
    const lengthScaleIndent = 10;
    for (let i = 0; i <= data.getStudyPeriod; i += 1) {
      switch (axis) {
        case 'x':
          if (i === data.getStudyPeriod) break;
          this.canvasMainChartContext.moveTo(
            (this.mainIndent + (i * data.indents[axis])),
            (this.canvasMainChartHeight - this.mainIndent),
          );
          break;
        case 'y':
          this.canvasMainChartContext.moveTo(
            this.mainIndent,
            (this.canvasMainChartHeight - this.mainIndent - (i * data.indents[axis])),
          );
          break;
        default:
          break;
      }
      switch (axis) {
        case 'x':
          if (i === data.getStudyPeriod) break;
          this.canvasMainChartContext.lineTo(
            (this.mainIndent + (i * data.indents[axis])),
            (this.canvasMainChartHeight - this.mainIndent - lengthScaleIndent),
          );
          break;
        case 'y':
          this.canvasMainChartContext.lineTo(
            (this.mainIndent - lengthScaleIndent),
            (this.canvasMainChartHeight - this.mainIndent - (i * data.indents[axis])),
          );
          break;
        default:
          break;
      }
    }
    this.canvasMainChartContext.stroke();
  }

  drawSignaturesScale(data, axis) {
    this.canvasMainChartContext.fillStyle = '#ffeb00';
    this.canvasMainChartContext.font = 'bold 12px Raleway';
    const scaleIndent = 40;
    for (let i = 0; i <= data.getStudyPeriod; i += 1) {
      let coordX;
      let coordY;
      switch (axis) {
        case 'x':
          if (i === data.getStudyPeriod) break;
          coordX = this.mainIndent + (i * data.indents[axis]);
          coordY = this.canvasMainChartHeight - this.mainIndent + scaleIndent;
          break;
        case 'y':
          coordX = this.mainIndent - scaleIndent;
          coordY = this.canvasMainChartHeight - this.mainIndent - (i * data.indents[axis]);
          break;
        default:
          break;
      }
      this.canvasMainChartContext.fillText(data.axisSignatures[axis][i], coordX, coordY);
    }
  }

  drawMainChartLines(data) {
    this.canvasMainChartContext.strokeStyle = '#ffeb00';
    this.canvasMainChartContext.lineWidth = 3.0;
    this.canvasMainChartContext.lineCap = 'round';
    for (let i = 0; i <= data.getStudyPeriod; i += 1) {
      this.canvasMainChartContext.moveTo(
        ((i * data.indents.x) + this.mainIndent),
        data.convertedValues[i],
      );
      this.canvasMainChartContext.lineTo(
        (((i + 1) * data.indents.x) + this.mainIndent),
        data.convertedValues[i + 1],
      );
    }
    this.canvasMainChartContext.stroke();
  }
}
