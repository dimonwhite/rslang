import { createElement } from '../../../utils';

export default class ChartMainView {
  constructor(indent) {
    this.mainStatisticInfo = document.querySelector('.main-statistic-info');
    this.canvasMainChart = createElement({ tag: 'canvas', class: 'graphMain' });
    this.dataSignature = createElement({ tag: 'p', class: 'data-signature signature-data-hide' });
    this.canvasMainChartContext = this.canvasMainChart.getContext('2d');
    this.mainIndent = indent;
  }

  baseSettingsCanvas(sizes) {
    this.canvasMainChartWidth = sizes.width;
    this.canvasMainChartHeight = sizes.height;
    this.setSettingsCanvas = function () {
      this.canvasMainChart.setAttribute('width', sizes.width);
      this.canvasMainChart.setAttribute('height', sizes.height);
      this.mainStatisticInfo.append(this.canvasMainChart);
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
    this.canvasMainChartContext.fillStyle = '#a902ff';
    this.canvasMainChartContext.lineWidth = 3.0;
    this.canvasMainChartContext.lineCap = 'round';
    for (let i = 0; i < (data.getStudyPeriod); i += 1) {
      const coordinates = {
        firstPoint: [
          ((i * data.indents.x) + this.mainIndent),
          data.convertedValues[i],
        ],
        secondPoint: [
          (((i + 1) * data.indents.x) + this.mainIndent),
          data.convertedValues[i + 1],
        ],
      };
      const pointR = 7;
      this.canvasMainChartContext.beginPath();
      this.canvasMainChartContext.moveTo(
        coordinates.firstPoint[0],
        coordinates.firstPoint[1],
      );
      this.canvasMainChartContext.lineTo(
        coordinates.secondPoint[0],
        coordinates.secondPoint[1],
      );
      this.canvasMainChartContext.stroke();

      this.canvasMainChartContext.beginPath();
      this.canvasMainChartContext.arc(coordinates.firstPoint[0],
        coordinates.firstPoint[1], pointR, 0, 2 * Math.PI);
      this.canvasMainChartContext.fill();
    }
  }

  showSignaturesData(obj) {
    this.mainStatisticInfo.append(this.dataSignature);
    let content = '';
    for (let i = 0; i < obj.ranges.length; i += 1) {
      content += `<p class="signature-item" style="transform: translate(${this.canvasMainChart.getBoundingClientRect().x + obj.ranges[i].xStart}px, ${this.canvasMainChart.getBoundingClientRect().y + obj.ranges[i].yStart}px)">
        <span class="signature-text" style="transform: translate(${this.canvasMainChart.getBoundingClientRect().x + obj.ranges[i].xStart}px, ${this.canvasMainChart.getBoundingClientRect().y + obj.ranges[i].yStart}px)">${obj.quantityWord[i]}</span>
      </p>`;
    }
    console.log(this.canvasMainChart.getBoundingClientRect().x);
    this.dataSignature.innerHTML = `${content}`;
  }
}
