export default class TodayProgressModel {
  constructor(http) {
    this.totalWord = http.optional.todayTraining.params.length;
    this.learnedToday = http.optional.todayTraining.params.passedToday;
    this.commonQuantityWords = http.optional.allUserWords;
  }
}
