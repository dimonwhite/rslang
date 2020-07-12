export default class GamesStatisticModel {
  constructor(http) {
    this.statisticData = {
      savannah: http.optional.savannah,
      audiocall: http.optional.audiocall,
      sprint: http.optional.sprint,
      speakit: http.optional.speakit,
      puzzle: http.optional.puzzle,
      own: http.optional.own,
    };
  }

  convertGameStatistic(gameName) {
    this.dataGame = Object.entries(this.statisticData[gameName]);
    this.dataGame.splice(0, 1);
    this.dataGame.forEach((item, i, arr) => {
      const date = new Date(Number(arr[i][0]));
      arr[i][0] = `${(date.getDate() < 10) ? `0${date.getDate()}` : date.getDate()}-${(date.getMonth() < 10) ? `0${date.getMonth() + 1}` : date.getMonth()}-${date.getFullYear()}`;
      arr[i][1] = arr[i][1].split(',');
    });
    return this.dataGame;
  }
}
