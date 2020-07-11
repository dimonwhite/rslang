import GamesStatisticView from './gamesStatisticView';
import GamesStatisticModel from './gamesStatisticModel';

export default class GamesStatisticController {
  constructor(statistic) {
    this.gamesStatisticView = new GamesStatisticView();
    this.gamesStatisticModel = new GamesStatisticModel(statistic);
  }

  init() {
    this.gamesStatisticView.createGamesButtons(this.gamesStatisticModel.statisticData);
    this.clickGamesButton();
  }

  clickGamesButton() {
    this.lalal = 0;
    const allButtons = document.querySelectorAll('.games');
    allButtons.forEach(((element) => {
      element.addEventListener('click', (event) => {
        this.gamesStatisticView.createStatisticWindow(
          this.gamesStatisticModel.convertGameStatistic(event.target.getAttribute('data-game')),
          event.target.textContent,
        );
        this.gamesStatisticView.windowGameStatistic.toggle('window-game-hide');
      });
    }));
    document.querySelector('.main-statistic-info').addEventListener('click', (event) => {
      if (event.target.className === 'close-game-window') {
        this.gamesStatisticView.windowGameStatistic.toggle('window-game-hide');
      }
    });
  }
}
