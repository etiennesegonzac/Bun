function TaskView(aElement, aTask) {
  this.element = aElement; // a zepto element
  this.task = aTask;

  var self = this;
  this.render = function render() {
    var fragment = "<input type='checkbox' />" + self.task.name;
    self.element.html(fragment);
    self.element.toggleClass("selected", self.task.selected);
    self.element.data("id", self.task.id);
  };

  this.task.bind("bun:change", this.render);
}

TaskView.prototype.remove = function remove() {
  this.task.unbind("bun:change", this.render);
  this.element.remove();
}
