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
  this.selectProject(0, false);
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

  $(document).delegate("#projects li", (touch_device ? "tap" : "click"), function(event){
    _controller.selectProject(parseInt($(this).data('id')), true);
    event.preventDefault();
  });

  $(document).delegate("#tasks li", (touch_device ? "tap" : "click"), function(event){
    _controller.selectTask(parseInt($(this).data('id')), true);
    event.preventDefault();
  });

  $(document).delegate("a.projects-toggle", (touch_device ? "touchstart" : "click"), function(event){
    _controller.transitionManager.toggleProjects();
    event.preventDefault();
  });

  $(document).delegate("a.details-toggle", (touch_device ? "touchstart" : "click"), function(event){
    _controller.transitionManager.toggleDetails();
    event.preventDefault();
  });
}

AppController.prototype.renderProjects = function() {
  $("#projects ul").html(this.projectsList.projects.map(function(e, i){
    return "<li data-id=\"" + i.toString() + "\">" + e.name + "</li>"
  }).join("\n"));
}

AppController.prototype.selectProject = function(id, show){
  if (id < this.projectsList.projects.length && id >= 0) {
    this.selectedProject = this.projectsList.projects[id];

    $("#projects li").each(function(i, e){
      $(e).toggleClass("selected", (i == id));
    });

    // updating the tasks
    $("#tasks ul").html(this.selectedProject.tasks.map(function(e, i){
      var li_html = "<li data-id=\"" + i.toString() + "\"><input type=\"checkbox\" /> " + e.name;
      if (e.priority) {
        li_html += "<span class=\"label important\">\n";
        li_html += e.priorityString();
        li_html += "</span>\n";
      }
      if (e.due_date) {
        li_html += "<span class=\"label notice\">" + e.due_date +"</span>\n";
      }
      li_html += "</li>";
      return li_html;
    }).join("\n"));

    this.selectTask(0, false);

    if (show) {
      var _controller = this;
      setTimeout(function(){
        _controller.transitionManager.toggleProjects();
      }, 100);
    }
  }
}

AppController.prototype.selectTask = function(id, show){
  if (id < this.selectedProject.tasks.length && id >= 0) {
    var task = this.selectedProject.tasks[id];
    this.selectedTask = task;

    $("#tasks li").each(function(i, e){
      $(e).toggleClass("selected", (i == id));
    });

    // updating the tasks
    details_html = "<h1>" + task.name;
    if (task.priority) {
      details_html += "<span class=\"label important\">\n";
      details_html += task.priorityString();
      details_html += "</span>\n";
    }
    details_html += "</h1>\n"
    if (task.due_date) {
      details_html += "<h3>Due:<span class=\"label notice\">" + task.due_date +"</span></h3>\n";
    }
    if (task.notes) {
      details_html += "<div class=\"notes\">\n";
      details_html += task.notes;
      details_html += "</div>\n";
    }

    $("#details .container").html(details_html);

    if (show) {
      var _controller = this;
      setTimeout(function(){
        _controller.transitionManager.toggleDetails();
      }, 100);
    }
  }
}
