const urlGitHub = 'https://raw.githubusercontent.com/dimonwhite/rslang-data/master/data/';
const blackGradient = 'linear-gradient(rgba(0, 0, 0, 0.7) 0%, rgba(0, 0, 0, 0.7) 100%)';
const backendUrl = 'https://afternoon-falls-25894.herokuapp.com';

const defaultStatistics = {
  learnedWords: 0,
  optional: {
    savannah: {
      settings: {
        lvl: -1,
        page: '0',
        words: 10,
        speed: 'easy',
        hearts: 'easy',
        sound: true,
        lang: 'EN',
      },
    },
    audiocall: {
      length: 0,
    },
    sprint: {
      length: 0,
    },
    speakit: {
      length: 0,
    },
    puzzle: {
      length: 0,
    },
    own: {
      length: 0,
    },
    statisticsChart: {
      length: 0,
    },
    todayTraining: {
      lastDate: 2062020,
      params: {
        passedToday: 0,
        cardIndex: 0,
        passedNew: 0,
        numberNewWords: 0,
        newWordsToday: 0,
        consecutive: 0,
        newConsecutive: 0,
        correctAnswer: 0,
        incorrectAnswer: 0,
        wordsRepeatToday: 0,
        generatedListToday: 0,
        currentMistake: 0,
        length: 0,
      },
    },
  },
};
const defaultSettings = {
  wordsPerDay: 1,
  optional: {
    lang: 'EN',
    settings: {
      langEn: true,
      langRu: false,
      difficultWord: true,
      exampleWord: true,
      imgWord: true,
      listAlternately: true,
      listNew: false,
      listRepeat: false,
      maxWords: '24',
      newWords: '12',
      meaningWord: true,
      numberLetters: true,
      removeWord: true,
      showAnswer: true,
      sound: false,
      transcription: true,
      translate: true,
    },
    dictSettings: {
      dictExample: true,
      dictMeaning: true,
      dictTranscr: true,
      dictSound: true,
      dictImg: true,
      dictProgress: true,
    },
  },
};

export {
  backendUrl,
  urlGitHub,
  blackGradient,
  defaultStatistics,
  defaultSettings,
};
