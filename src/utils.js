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

function declOfNum(number, titles) {
  const cases = [2, 0, 1, 1, 1, 2];
  return titles[(number % 100 > 4 && number % 100 < 20)
    ? 2 : cases[(number % 10 < 5) ? number % 10 : 5]];
}

function getDiffTime(date1, date2) {
  return date2.getTime() - date1.getTime();
}

function getDiffFormatDate(date) {
  const time = Math.abs(date);
  const obj = {};

  obj.milliseconds = time;
  obj.second = Math.round(obj.milliseconds / 1000);
  obj.minutes = Math.round(obj.second / 60);
  obj.hours = Math.round(obj.minutes / 60);
  obj.days = Math.round(obj.hours / 24);

  if (obj.hours < 1) {
    return `${obj.minutes} ${declOfNum(obj.minutes, ['минута', 'минуты', 'минут'])}`;
  }
  if (obj.days < 1) {
    return `${obj.hours} ${declOfNum(obj.hours, ['час', 'часа', 'часов'])}`;
  }

  return `${obj.days} ${declOfNum(obj.days, ['день', 'дня', 'дней'])}`;
}

const getSvg = (id) => `
  <svg class="svg_icon">
    <use xlink:href="sprite.svg#${id}"></use>
  </svg>
`;

const importAll = (r) => r.keys().map(r);

export {
  createElement,
  createElementAttr,
  randomArray,
  declOfNum,
  getDiffTime,
  getDiffFormatDate,
  getSvg,
  importAll,
};
