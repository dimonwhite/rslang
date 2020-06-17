function createElement(elementName, className, id, content) {
  const element = document.createElement(elementName);
  if (className) element.className = className;
  if (id) element.id = id;
  if (content) element.innerHTML = content;
  return element;
}

function createElementAttr(elementName, className, id, content, attr, valueAttr) {
  const element = createElement(elementName, className, id, content);
  if (attr) element.setAttribute(attr, valueAttr);
  return element;
}

export {
  createElement,
  createElementAttr,
};
