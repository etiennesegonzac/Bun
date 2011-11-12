function Task(name) {
  this.name = name;
}

// mixin Observable
Task.prototype = new Observable();
Task.prototype.__defineSetter__("selected", function setSelected(value) {
  this._selected = value;
  this.triggerChangeEvent.call(this);
});
Task.prototype.__defineGetter__("selected", function selected() {
  return this._selected;
});
