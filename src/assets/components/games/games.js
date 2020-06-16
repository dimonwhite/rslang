import SavannahController from './savannah/savannahController';
import PuzzleController from './puzzle/puzzleController';
import AudiocallController from './audiocall/audiocallController';
import SpeakitController from './speakit/speakitController';
import SprintController from './sprint/sprintController';

export default class Games {
  create(name) {
    switch (name) {
      case 'liSavannah':
        new SavannahController(this.user).createEvent(this.endGame);
        break;
      case 'liPuzzle':
        new PuzzleController(this.user).createEvent(this.endGame);
        break;
      case 'liAudiocall':
        new AudiocallController(this.user).createEvent(this.endGame);
        break;
      case 'liSpeakit':
        new SpeakitController(this.user).createEvent(this.endGame);
        break;
      case 'liSprint':
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
