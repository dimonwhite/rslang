const createElement = (elementName, className, id, content) => {
  const element = document.createElement(elementName);
  if (className) element.className = className;
  if (id) element.id = id;
  if (content) element.innerHTML = content;
  return element;
};

const createElementAttr = (elementName, className, id, content, attr, valueAttr) => {
  const element = createElement(elementName, className, id, content);
  if (attr) element.setAttribute(attr, valueAttr);
  return element;
};

const randomArray = (arr) => {
  let j;
  let temp;
  for (let i = arr.length - 1; i > 0; i -= 1) {
    j = Math.floor(Math.random() * (i + 1));
    temp = arr[j];
    arr[j] = arr[i];
    arr[i] = temp;
  }
  return arr;
};

export {
  createElement,
  createElementAttr,
  randomArray,
};
