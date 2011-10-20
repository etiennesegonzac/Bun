function AppController(){
  this.projectsList = new ProjectsList();
  this.transitionManager = new TransitionManager();
  this.selectedProject = null;
  this.selectedTask = null;
}

AppController.prototype.start = function(){
  this.projectsList.load();
  this.bindActions();
  this.renderProjects();
  this.selectProject(0);
}

AppController.prototype.bindActions = function(){
  var _controller = this;
  var touch_device = false;

  // least awefull way to detect touch devices for now
  try{
    document.createEvent("TouchEvent"); 
    touch_device = true
  }catch(e){
    touch_device = false;
  }

  bind_on = touch_device ? "tap" : "click";

  $(document).delegate("#projects li", bind_on, function(event){
    _controller.selectProject(parseInt($(this).data('id')));
  });

  $(document).delegate("#tasks li", bind_on, function(event){
    _controller.selectTask(parseInt($(this).data('id')));
  });

  $(document).delegate("a.projects-toggle", bind_on, function(event){
    _controller.transitionManager.toggleProjects();
    event.preventDefault();
  });

  $(document).delegate("a.details-toggle, #tasks li", bind_on, function(event){
    if (window.innerWidth <= 600) {
      if ($("#details").css('display') === "none") {
        _controller.transitionManager.show("#details");
      } else {
        _controller.transitionManager.hide("#details");
      }
    }
    event.preventDefault();
  });
}

AppController.prototype.renderProjects = function() {
  $("#projects ul").html(this.projectsList.projects.map(function(e, i){
    return "<li data-id=\"" + i.toString() + "\">" + e.name + "</li>"
  }).join("\n"));
}

AppController.prototype.selectProject = function(id){
  if (id < this.projectsList.projects.length && id >= 0) {
    this.selectedProject = this.projectsList.projects[id];

    $("#projects li").each(function(i, e){
      $(e).toggleClass("selected", (i == id));
    });

    // updating the tasks
    $("#tasks ul").html(this.selectedProject.tasks.map(function(e, i){
      return "<li data-id=\"" + i.toString() + "\"><input type=\"checkbox\" /> " + e.name + "</li>";
    }).join("\n"));

    var _controller = this;

    setTimeout(function(){
      _controller.transitionManager.toggleProjects();
      _controller.selectTask(0);
    }, 100);
  }
}

AppController.prototype.selectTask = function(id){
  if (id < this.selectedProject.tasks.length && id >= 0) {
    this.selectedTask = this.selectedProject.tasks[id];

    $("#tasks li").each(function(i, e){
      $(e).toggleClass("selected", (i == id));
    });

    // updating the tasks
    details_html = "<h1>" + this.selectedTask.name + "</h1>\n";
    $("#details .container").html(details_html);
  }
}
