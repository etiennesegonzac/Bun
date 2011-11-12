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
      _controller.transitionManager.toggleProjects();
      event.preventDefault();
    });

    $(document).delegate("a.details-toggle", (touch_device ? "touchstart" : "click"), function(event){
      _controller.transitionManager.toggleDetails();
      event.preventDefault();
    });
  }
}
