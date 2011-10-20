function Task(name, due_date, notes, priority) {
  this.name = name;
  this.due_date = due_date;
  this.notes = notes;
  this.priority = priority;
}

Task.prototype.priorityString = function() {
  switch(this.priority)
  {
    case 1:
      return "Low";
    break;
    case 2:
      return "Medium";
    break;
    case 3:
      return "High";
    break;
    default:
      return "";
  }
}
