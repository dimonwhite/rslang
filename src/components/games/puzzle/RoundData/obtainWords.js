export default async function obtainWords(level, round) {
  const url = `https://afternoon-falls-25894.herokuapp.com/words?group=${level}&page=${round - 1}&wordsPerExampleSentenceLTE=10&wordsPerPage=10`;
  const response = await fetch(url);
  if (!response.ok) {
    throw new Error('Can`t connect server');
  }
  const json = await response.json();
  return json;
}
