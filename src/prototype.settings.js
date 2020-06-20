Element.prototype.show = function show(time = 0) {
  this.style.cssText = `overflow: hidden; height: 0px; opacity: 0; transition: all ${time}ms;`;
  this.style.display = 'block';
  this.style.height = `${this.scrollHeight}px`;
  this.style.opacity = '1';
  return this;
};

Element.prototype.hide = function hide(time = 0) {
  this.style.cssText = `display: block; overflow: hidden; height: ${`${this.scrollHeight}px`}; opacity: 1; transition: all ${time}ms;`;
  this.style.height = '0px';
  this.style.opacity = '0';
  setTimeout(() => {
    this.style.display = 'none';
  }, time);
  return this;
};

Element.prototype.toggle = function toggle(time = 0) {
  if (this.offsetWidth > 0 && this.offsetHeight > 0) {
    this.hide(time);
  } else {
    this.show(time);
  }
  return this;
};

if (!NodeList.prototype.forEach) {
  NodeList.prototype.forEach = Array.prototype.forEach;
}
if (!HTMLCollection.prototype.forEach) {
  HTMLCollection.prototype.forEach = Array.prototype.forEach;
}
