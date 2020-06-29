import studyWords from '@/data/mock_StudyWords';
import book1 from '@/data/book1';

export default class StatisticsModel {
  constructor(user) {
    this.user = user;
    this.quantityAllWords = book1.length;
    this.quantityStudyWords = studyWords.length;
  }
}
