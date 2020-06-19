import DictionaryView from './dictionaryView';
import DictionaryModel from './dictionaryModel';

export default class DictionaryController {
  constructor(user) {
    this.model = new DictionaryModel(user);
    this.view = new DictionaryView();
    this.list = this.model.getList();
  }

  create() {
    this.view.renderHTML();
    this.view.createList(this.list);
  }
}
