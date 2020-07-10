function modifySentence(sentence, rowWidth) {
  const modSentence = sentence.toLowerCase().replace(/(<b>)|(<\/b>)|\./g, '').split(' ');
  const sentenceLength = modSentence.reduce((acc, el) => acc + el.length, 0);
  const wordData = {};
  let elementOffsetX = 0;
  let wordPosition = 0;

  modSentence.forEach((el) => {
    const elWidth = (el.length / sentenceLength) * rowWidth;
    wordData[wordPosition] = {
      word: el,
      width: elWidth,
      offsetX: elementOffsetX,
      offsetY: null,
    };
    elementOffsetX += elWidth;
    wordPosition += 1;
  });
  return wordData;
}

function shuffleSentence(wordData) {
  const shuffledWordData = {};
  let count = 0;

  Object.keys(wordData).sort(() => Math.random() - 0.5)
    .forEach((key) => {
      shuffledWordData[count] = wordData[key];
      count += 1;
    });
  return shuffledWordData;
}

export { modifySentence, shuffleSentence };
