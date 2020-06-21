import CardView from './cardView';
import CardModel from './cardModel';

export default class CardController {
  constructor(user) {
    this.cardView = new CardView();
    this.cardModel = new CardModel(user);
  }

  create() {
    this.cardView.renderHTML();
  }
}
