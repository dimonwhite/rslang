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
    this.closeGameStatistic();
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
        this.gamesStatisticView.windowGameStatistic.style = '';
        this.gamesStatisticView.gamestatisticClose.toggle('window-game-hide');
      });
    }));
  }

  closeGameStatistic() {
    const statisticInfo = document.querySelector('.main-statistic-info');
    if (statisticInfo) {
      statisticInfo.addEventListener('click', (event) => {
        if (event.target.className === 'close-game-window') {
          this.gamesStatisticView.windowGameStatistic.toggle('window-game-hide');
          this.gamesStatisticView.gamestatisticClose.toggle('window-game-hide');
        }
      });
    }
    this.gamesStatisticView.gamestatisticClose.addEventListener('click', () => {
      this.gamesStatisticView.windowGameStatistic.toggle('window-game-hide');
      this.gamesStatisticView.gamestatisticClose.toggle('window-game-hide');
    });
  }
}
