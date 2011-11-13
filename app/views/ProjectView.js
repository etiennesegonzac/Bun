function ProjectView(aElement, aProject) {
  this.element = aElement; // a zepto element
  this.project = aProject;

  var self = this;
  this.render = function render() {
    self.element.html(self.project.name);
    self.element.toggleClass("selected", self.project.selected);
    self.element.data("id", self.project.id);
  };

  this.project.bind("bun:change", this.render);
}

ProjectView.prototype.remove = function remove() {
  this.project.unbind("bun:change", this.render);
  this.element.remove();
}
