$(document).delegate("a.projects-toggle", "click, touchend", function(event){
  $("#projects").toggleClass("shown");
  event.preventDefault();
});

$(document).delegate(".inspector-toggle", "click, touchend", function(event){
  $("#inspector").toggleClass("shown");
  event.preventDefault();
});
