// Transition Manager for the responsive design
var TransitionManager = {
  scrollToTop: function() {
    window.scrollTo(0,0);
  },

  show: function(id) {
    this.scrollToTop();
    $(id).show();

    setTimeout(function(){
      $(id).addClass("shown");

      setTimeout(function(){
        $("#tasks").hide();
      }, 300);
    }, 10);
  },

  hide: function(id) {
    $("#tasks").show();

    setTimeout(function(){
      $(id).removeClass("shown");

      setTimeout(function(){
        $(id).hide();
      }, 300);
    }, 10);
  },

  toggleProjects: function() {
    if (window.innerWidth <= 1024) {
      if ($("#projects").css('display') === "none") {
        this.show("#projects");
      } else {
        this.hide("#projects");
      }
    }
  },

  toggleDetails: function() {
    if (window.innerWidth <= 600) {
      if ($("#details").css('display') === "none") {
        this.show("#details");
      } else {
        this.hide("#details");
      }
    }
  }
}

// BunController
var BunController = {
  projectsList: ProjectsList,

  start: function(){
    this.projectsList.init();
    this.bindActions();

    // main views
    this.projectsListView = new ProjectsListView($("#projects-list"));
    this.projectsListView.projects = this.projectsList.projects;
    this.tasksListView = new TasksListView($("#tasks-list"));

    // selecting the first project
    this.selectProject(this.projectsList.projects[0].id);
  },

  selectProject: function selectProject(id) {
    // finding the project with the corresponding id
    var project = this.projectsList.projects.filter(function(p) {
      return (p.id == parseInt(id));
    })[0];

    if (this.selectedProject) {
      this.selectedProject.selected = false;
    }
    this.selectedProject = project;
    project.selected = true;

    // updating the tasks list view
    this.tasksListView.tasks = this.selectedProject.tasks;
    this.selectTask(this.selectedProject.tasks[0].id);
  },

  selectTask: function selectTask(id) {
    // finding the task with the corresponding id
    var task = this.selectedProject.tasks.filter(function(t) {
      return (t.id == parseInt(id));
    })[0];

    if (this.selectedTask) {
      this.selectedTask.selected = false;
    }
    this.selectedTask = task;
    task.selected = true;
  },

  bindActions: function(){
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
      TransitionManager.toggleProjects();
      event.preventDefault();
    });

    $(document).delegate("a.details-toggle", (touch_device ? "touchstart" : "click"), function(event){
      TransitionManager.toggleDetails();
      event.preventDefault();
    });
  }
}
