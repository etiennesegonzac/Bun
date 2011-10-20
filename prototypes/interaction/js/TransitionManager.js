function TransitionManager() {
  this.scrollToTop = function() {
    window.scrollTo(0,0);
  };

  this.show = function(id) {
    this.scrollToTop();
    $(id).show();

    setTimeout(function(){
      $(id).addClass("shown");

      setTimeout(function(){
        $("#tasks").hide();
      }, 300);
    }, 10);
  };

  this.hide = function(id) {
    // this.scrollToTop();
    $("#tasks").show();

    setTimeout(function(){
      $(id).removeClass("shown");

      setTimeout(function(){
        $(id).hide();
      }, 300);
    }, 10);
  };

  this.toggleProjects = function() {
    if (window.innerWidth <= 1024) {
      if ($("#projects").css('display') === "none") {
        this.show("#projects");
      } else {
        this.hide("#projects");
      }
    }
  };

  this.toggleDetails = function() {
    if (window.innerWidth <= 600) {
      if ($("#details").css('display') === "none") {
        this.show("#details");
      } else {
        this.hide("#details");
      }
    }
  };
}
