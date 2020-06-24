import CardView from './cardView';
import CardModel from './cardModel';

export default class CardController {
  constructor(user) {
    this.cardView = new CardView();
    this.cardModel = new CardModel(user);
  }

  create() {
    document.body.className = 'body show-main';
    this.cardView.renderHTML();
  }
}
