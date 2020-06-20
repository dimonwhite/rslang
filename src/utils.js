const createElement = (el) => {
  const element = document.createElement(el.tag);
  if (el.class) element.className = el.class;
  if (el.id) element.id = el.id;
  if (el.content) element.innerHTML = el.content;
  return element;
};

function createElementAttr(elementName, className, id, content, attr, valueAttr) {
  const element = createElement(elementName, className, id, content);
  if (attr) element.setAttribute(attr, valueAttr);
  return element;
}

export {
  createElement,
  createElementAttr,
};
