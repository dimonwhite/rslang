import studyWords from '@/data/mock_StudyWords';
import book1 from '@/data/book1';

export default class StatisticsModel {
  constructor(user, indent) {
    this.user = user;
    this.quantityAllWords = book1.length;
    this.quantityStudyWords = studyWords.length;
    this.widthWindow = document.documentElement.clientWidth;
    this.data = {
      '01-07': 0,
      '02-07': 0,
      '04-07': 15,
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
    this.maxQuantityWord = 0;
    Object.keys(obj).forEach((key) => {
      if (obj[key] > this.maxQuantityWord) this.maxQuantityWord = obj[key];
    });
    return this.maxQuantityWord;
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
    this.decrease = this.getMaxActiveDay(this.data) / this.quantityDaysStudy;
    this.arrayDataWord = [];
    for (let i = this.getStudyPeriod(this.data); i >= 0; i -= 1) {
      this.arrayDataWord.push(Math.round(this.decrease * i));
    }
    this.arrayDataWord.reverse();
    this.datesWords = Object.keys(obj);

    return {
      x: this.datesWords,
      y: this.arrayDataWord,
    };
  }

  determineScaleCoefficient() {
    this.scaleCoefficient = this.getMaxActiveDay(this.data)
    / this.determineAxisLength().y;
    return this.scaleCoefficient;
  }

  scaleWordsValues() {
    const convertedValues = Object.values(this.data);
    convertedValues.forEach((value, i) => {
      if (convertedValues[i] === 0) {
        convertedValues[i] = this.canvasSizeHeight - this.mainIndent
      - (convertedValues[i]);
      } else {
        convertedValues[i] = this.canvasSizeHeight - this.mainIndent
      - (convertedValues[i] / this.scaleCoefficient);
      }
    });
    return convertedValues;
  }

  dataScale() {
    const mainScaleElements = {
      getMaxActiveDay: this.getMaxActiveDay(this.data),
      getStudyPeriod: this.getStudyPeriod(this.data),
      indents: this.determinScaleIndent(),
      axisLength: this.determineAxisLength(),
      axisSignatures: this.getAxisSignatures(this.data),
      scaleCoefficient: this.determineScaleCoefficient(),
      convertedValues: this.scaleWordsValues(),
    };
    return mainScaleElements;
  }
}
