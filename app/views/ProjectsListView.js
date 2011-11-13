function ProjectsListView(aElement) {
  this.element = aElement; // a zepto element
  this._projects = [];
  this.projectViews = [];

  var self = this;
  this.render = function render() {
    // removing the old project views
    self.projectViews.forEach(function(pv) {
      pv.remove();
    });

    // creating new ones
    self.projects.forEach(function(project) {
      self.element.append("<li></li>");
      var p_element = self.element.children("li").last();
      pv = new ProjectView(p_element, project);
      pv.render();
      self.projectViews.push(pv);
    });
  }
}

// auto rendering when the projects property is set
ProjectsListView.prototype.__defineSetter__("projects", function setProjects(projects) {
  this._projects = projects;
  this.render();
});
ProjectsListView.prototype.__defineGetter__("projects", function projects() {
  return this._projects;
});
