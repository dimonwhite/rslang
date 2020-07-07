import studyWords from '@/data/mock_StudyWords';
import book1 from '@/data/book1';

export default class StatisticsModel {
  constructor(user, indent) {
    this.user = user;
    this.quantityAllWords = book1.length;
    this.quantityStudyWords = studyWords.length;
    this.widthWindow = document.documentElement.clientWidth;
    this.data = {
      '01-07-2020': 15,
      '02-07-2020': 25,
      '03-07-2020': 35,
      '04-07-2020': 19,
      '05-07-2020': 7,
      '06-07-2020': 51,
      '07-07-2020': 107,
    };
    this.mainIndent = indent;
  }

  baseSettingsCanvas() {
    this.determineHeightWidthCanvas = function () {
      const mainScreenSizes = {
        computer: 1000,
        tablets: 768,
        smartphoneLandscape: 480,
        smartphone: 320,
      };

      switch (true) {
        case this.widthWindow >= mainScreenSizes.computer:
          this.canvasSizeWidth = 700;
          this.canvasSizeHeight = 500;
          break;
        case (this.widthWindow < mainScreenSizes.computer)
        && (this.widthWindow >= mainScreenSizes.tablets):
          this.canvasSizeWidth = 500;
          this.canvasSizeHeight = 350;
          break;
        case (this.widthWindow < mainScreenSizes.tablets)
        && (this.widthWindow >= mainScreenSizes.smartphoneLandscape):
          this.canvasSizeWidth = 400;
          this.canvasSizeHeight = 250;
          break;
        case (this.widthWindow < mainScreenSizes.smartphoneLandscape)
        && (this.widthWindow >= mainScreenSizes.smartphone):
          this.canvasSizeWidth = 300;
          this.canvasSizeHeight = 150;
          break;
        default:
          break;
      }

      return {
        width: this.canvasSizeWidth,
        height: this.canvasSizeHeight,
      };
    };
    return this.determineHeightWidthCanvas();
  }

  determineAxisLength() {
    this.lengthX = this.canvasSizeWidth - (this.mainIndent * 2);
    this.lengthY = this.canvasSizeHeight - (this.mainIndent * 2);

    return {
      x: this.lengthX,
      y: this.lengthY,
    };
  }

  getMaxActiveDay(obj) {
    this.search = function () {
      let maxQuantityWord = 0;
      Object.keys(obj).forEach((key) => {
        if (obj[key] > maxQuantityWord) maxQuantityWord = obj[key];
      });
      return maxQuantityWord;
    };
    return this.search;
  }

  getStudyPeriod(obj) {
    this.quantityDaysStudy = Object.keys(obj).length;
    return this.quantityDaysStudy;
  }

  determinScaleIndent() {
    this.scaleIndentY = (this.canvasSizeHeight - (this.mainIndent * 2))
    / this.getStudyPeriod(this.data);
    this.scaleIndentX = (this.canvasSizeWidth - (this.mainIndent * 2))
    / this.getStudyPeriod(this.data);

    return {
      x: this.scaleIndentX,
      y: this.scaleIndentY,
    };
  }

  getAxisSignatures(obj) {
    this.quantityWords = Object.values(obj);
    this.quantityWords.sort((a, b) => a - b);

    this.datesWords = Object.keys(obj);

    return {
      x: this.datesWords,
      y: this.quantityWords,
    };
  }

  dataScale() {
    const mainScaleElements = {
      getMaxActiveDay: this.getMaxActiveDay(this.data),
      getStudyPeriod: this.getStudyPeriod(this.data),
      indents: this.determinScaleIndent(),
      axisLength: this.determineAxisLength(),
      axisSignatures: this.getAxisSignatures(this.data),
    };

    return mainScaleElements;
  }
}
