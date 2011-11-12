var projectIdCounter = 0; // temporary uniqueId generator for projects

function Project(aName, aTasks) {
  this.id = projectIdCounter++;
  this.name = aName;
  this.tasks = [];

  aTasks.forEach(function(e){
    this.tasks.push(new Task(e.name, e.due_date, e.notes, e.priority));
  }, this);
}

// mixin Observable
Project.prototype = new Observable();
Project.prototype.__defineSetter__("selected", function setSelected(value) {
  this._selected = value;
  this.triggerChangeEvent.call(this);
});
Project.prototype.__defineGetter__("selected", function selected() {
  return this._selected;
});
