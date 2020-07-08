const urlGitHub = 'https://raw.githubusercontent.com/dimonwhite/rslang-data/master/data/';
const blackGradient = 'linear-gradient(rgba(0, 0, 0, 0.7) 0%, rgba(0, 0, 0, 0.7) 100%)';
const backendUrl = 'https://afternoon-falls-25894.herokuapp.com';

const defaultStatistics = {
  learnedWords: 0,
  optional: {
    savannah: {},
    audiocall: {},
    sprint: {},
    speakit: {},
    puzzle: {},
    own: {},
    statisticsChart: {},
  },
};
const defaultSettings = {
  wordsPerDay: 1,
  optional: {
    lastDate: '2062020',
    todayTraining: '0,0,0,0,0,0,0,false,false',
    settings: {
      lang: 'EN',
      langEn: true,
      langRu: false,
      difficultWord: true,
      exampleWord: true,
      imgWord: true,
      interval: true,
      listAlternately: false,
      listNew: true,
      listRepeat: false,
      maxWords: '10',
      newWords: '10',
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
