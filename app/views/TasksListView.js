function TasksListView(aElement) {
  this.element = aElement; // a zepto element
  this._tasks = [];
  this.taskViews = [];

  var self = this;
  this.render = function render() {
    // removing the old task views
    self.taskViews.forEach(function(tv) {
      tv.remove();
    });

    // creating new ones
    self.tasks.forEach(function(task) {
      self.element.append("<li></li>");
      var t_element = self.element.children("li").last();
      tv = new TaskView(t_element, task);
      tv.render();
      self.taskViews.push(tv);
    });
  }
}

// auto rendering when the projects property is set
TasksListView.prototype.__defineSetter__("tasks", function setTasks(tasks) {
  this._tasks = tasks;
  this.render();
});
TasksListView.prototype.__defineGetter__("tasks", function tasks() {
  return this._tasks;
});
