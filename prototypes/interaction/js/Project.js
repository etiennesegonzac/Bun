function Project(aName, aTasks) {
  this.name = aName;
  this.tasks = [];

  aTasks.forEach(function(e){
    this.tasks.push(new Task(e.name, e.due_date, e.notes, e.priority));
  }, this);
}
