const createElement = (el) => {
  const element = document.createElement(el.tag);
  if (el.class) element.className = el.class;
  if (el.id) element.id = el.id;
  if (el.content) element.innerHTML = el.content;
  return element;
};

const createElementAttr = (elementName, className, id, content, attr, valueAttr) => {
  const element = createElement({
    tag: elementName, class: className, id, content,
  });
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

const getSvg = (id) => `
  <svg class="svg_icon">
    <use xlink:href="sprite.svg#${id}"></use>
  </svg>
`;

export {
  createElement,
  createElementAttr,
  randomArray,
  getSvg,
};
