export default class Utils {
  static createElement(elementName, className, id, content) {
    const element = document.createElement(elementName);
    if (className) element.className = className;
    if (id) element.id = id;
    if (content) element.innerHTML = content;
    return element;
  }
}
