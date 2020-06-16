import SavannahController from './savannah/savannahController';
import PuzzleController from './puzzle/puzzleController';
import AudiocallController from './audiocall/audiocallController';
import SpeakitController from './speakit/speakitController';
import SprintController from './sprint/sprintController';

export default class Games {
  create(name) {
    switch (name) {
      case 'savannah':
        new SavannahController(this.user).createEvent(this.endGame);
        break;
      case 'puzzle':
        new PuzzleController(this.user).createEvent(this.endGame);
        break;
      case 'audiocall':
        new AudiocallController(this.user).createEvent(this.endGame);
        break;
      case 'speakit':
        new SpeakitController(this.user).createEvent(this.endGame);
        break;
      case 'sprint':
        new SprintController(this.user).createEvent(this.endGame);
        break;
      default:
        break;
    }
  }

  endGame() {
    this.words = [];
  }
}
