// Transitions
$.bunTransitions = {
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
    // this.scrollToTop();
    $("#tasks").show();

    setTimeout(function(){
      $(id).removeClass("shown");

      setTimeout(function(){
        $(id).hide();
      }, 300);
    }, 10);
  },

  toggleProjects: function() {
    if ($("#projects").css('display') === "none") {
      $.bunTransitions.show("#projects");
    } else {
      $.bunTransitions.hide("#projects");
    }
  }
};

// Bindings
$(document).delegate("a.projects-toggle", "click", function(event){
  $.bunTransitions.toggleProjects();
  event.preventDefault();
});

$(document).delegate("#tasks", "swipeRight", function(event){
  $.bunTransitions.toggleProjects();
  event.preventDefault();
});

$(document).delegate("#projects", "swipeLeft", function(event){
  $.bunTransitions.toggleProjects();
  event.preventDefault();
});

$(document).delegate("a.details-toggle, #tasks li", "click", function(event){
  if (window.innerWidth <= 600) {
    if ($("#details").css('display') === "none") {
      $.bunTransitions.show("#details");
    } else {
      $.bunTransitions.hide("#details");
    }
  }
  event.preventDefault();
});

// Ready
$(document).ready(function(){
  $.bunTransitions.scrollToTop();

  if (window.innerWidth > 600) {
    $("#details").css('height', $('#tasks').height());
    if (window.innerWidth > 1024) {
      $("#projects").css('height', $('#tasks').height());
    }
  }
});
