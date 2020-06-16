import DictionaryView from './dictionaryView';
import DictionaryModel from './dictionaryModel';

export default class DictionaryController {
  constructor(user) {
    this.dictionaryModel = new DictionaryModel(user);
    this.dictionaryView = new DictionaryView();
  }

  create() {
    this.dictionaryView.renderHTML();
  }
}
