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

  // addAllModels() {
  //   // this.chartMainModel = new ChartMainModel(this.mainIndent, this.request);
  // }

  // createDataStatistic(requestObject) {
  //   this.dataChart = requestObject.optional.statisticsChart;
  //   // this.dataGameSavannah;
  //   // this.dataGameAudiocall;
  //   // Sprint;
  //   // Speakit;
  //   // Puzzle;
  //   // Own;
  //   delete this.dataChart.length;
  //   console.log(this.dataChart);
  // }

  // baseSettingsCanvas() {
  //   this.determineHeightWidthCanvas = function () {
  //     const mainScreenSizes = {
  //       computer: 1000,
  //       tablets: 768,
  //       smartphoneLandscape: 480,
  //       smartphone: 320,
  //     };

  //     switch (true) {
  //       case this.widthWindow >= mainScreenSizes.computer:
  //         this.canvasSizeWidth = 700;
  //         this.canvasSizeHeight = 500;
  //         break;
  //       case (this.widthWindow < mainScreenSizes.computer)
  //       && (this.widthWindow >= mainScreenSizes.tablets):
  //         this.canvasSizeWidth = 500;
  //         this.canvasSizeHeight = 350;
  //         break;
  //       case (this.widthWindow < mainScreenSizes.tablets)
  //       && (this.widthWindow >= mainScreenSizes.smartphoneLandscape):
  //         this.canvasSizeWidth = 400;
  //         this.canvasSizeHeight = 250;
  //         break;
  //       case (this.widthWindow < mainScreenSizes.smartphoneLandscape)
  //       && (this.widthWindow >= mainScreenSizes.smartphone):
  //         this.canvasSizeWidth = 300;
  //         this.canvasSizeHeight = 150;
  //         break;
  //       default:
  //         break;
  //     }

  //     return {
  //       width: this.canvasSizeWidth,
  //       height: this.canvasSizeHeight,
  //     };
  //   };
  //   return this.determineHeightWidthCanvas();
  // }

  // determineAxisLength() {
  //   this.lengthX = this.canvasSizeWidth - (this.mainIndent * 2);
  //   this.lengthY = this.canvasSizeHeight - (this.mainIndent * 2);

  //   return {
  //     x: this.lengthX,
  //     y: this.lengthY,
  //   };
  // }

  // getMaxActiveDay(obj) {
  //   this.maxQuantityWord = 0;
  //   Object.keys(obj).forEach((key) => {
  //     if (obj[key] > this.maxQuantityWord) this.maxQuantityWord = obj[key];
  //   });
  //   return this.maxQuantityWord;
  // }

  // getStudyPeriod(obj) {
  //   this.quantityDaysStudy = Object.keys(obj).length;
  //   return this.quantityDaysStudy;
  // }

  // determinScaleIndent() {
  //   this.scaleIndentY = (this.canvasSizeHeight - (this.mainIndent * 2))
  //   / this.getStudyPeriod(this.dataChart);
  //   this.scaleIndentX = (this.canvasSizeWidth - (this.mainIndent * 2))
  //   / this.getStudyPeriod(this.dataChart);

  //   return {
  //     x: this.scaleIndentX,
  //     y: this.scaleIndentY,
  //   };
  // }

  // getAxisSignatures(obj) {
  //   this.decrease = this.getMaxActiveDay(this.dataChart) / this.quantityDaysStudy;
  //   this.arrayDataWord = [];
  //   for (let i = this.getStudyPeriod(this.dataChart); i >= 0; i -= 1) {
  //     this.arrayDataWord.push(Math.round(this.decrease * i));
  //   }
  //   this.arrayDataWord.reverse();
  //   this.datesWords = Object.keys(obj);

  //   return {
  //     x: this.datesWords,
  //     y: this.arrayDataWord,
  //   };
  // }

  // determineScaleCoefficient() {
  //   this.scaleCoefficient = this.getMaxActiveDay(this.dataChart)
  //   / this.determineAxisLength().y;
  //   return this.scaleCoefficient;
  // }

  // scaleWordsValues() {
  //   this.convertedValues = Object.values(this.dataChart);
  //   this.convertedValues.forEach((value, i) => {
  //     if (this.convertedValues[i] === 0) {
  //       this.convertedValues[i] = this.canvasSizeHeight - this.mainIndent
  //     - (this.convertedValues[i]);
  //     } else {
  //       this.convertedValues[i] = this.canvasSizeHeight - this.mainIndent
  //     - (this.convertedValues[i] / this.scaleCoefficient);
  //     }
  //   });
  //   console.log(this.convertedValues);
  //   return this.convertedValues;
  // }

  // determineLineCoordinates() {
  //   this.lineCoordinates = {
  //     coordStartLine: {
  //       x: [],
  //       y: [],
  //     },
  //     coordEndLine: {
  //       x: [],
  //       y: [],
  //     },
  //   };
  //   for (let i = 0; i < (this.quantityDaysStudy - 1); i += 1) {
  //     this.lineCoordinates.coordStartLine.x.push(
  //       ((i * this.scaleIndentX) + this.mainIndent),
  //     );
  //     this.lineCoordinates.coordStartLine.y.push(
  //       this.convertedValues[i],
  //     );
  //     this.lineCoordinates.coordEndLine.x.push(
  //       (((i + 1) * this.scaleIndentX) + this.mainIndent),
  //     );
  //     this.lineCoordinates.coordEndLine.y.push(
  //       this.convertedValues[i + 1],
  //     );
  //     console.log(this.convertedValues[i]);
  //   }
  //   console.log(this.lineCoordinates);
  //   return this.lineCoordinates;
  // }

  // dataScale() {
  //   const mainScaleElements = {
  //     getMaxActiveDay: this.getMaxActiveDay(this.dataChart),
  //     getStudyPeriod: this.getStudyPeriod(this.dataChart),
  //     indents: this.determinScaleIndent(),
  //     axisLength: this.determineAxisLength(),
  //     axisSignatures: this.getAxisSignatures(this.dataChart),
  //     scaleCoefficient: this.determineScaleCoefficient(),
  //     convertedValues: this.scaleWordsValues(),
  //     coordinatesPoints: this.determineLineCoordinates(),
  //   };
  //   return mainScaleElements;
  // }
}
