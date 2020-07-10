import GamesPageView from '@/components/games/gamesPage/GamesPageView';

export default class GamesPageController {
  constructor() {
    this.view = new GamesPageView();
  }

  create() {
    this.view.createElements();
  }
}
