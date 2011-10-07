$(document).delegate("a.projects-toggle", "click", function(event){
  $("#projects").toggleClass("shown");
  $("#tasks").toggleClass("faded");
  event.preventDefault();
});

function inspectorHandle(event){
  // window.scrollTo(0,0);
  $("#inspector").toggleClass("shown");
  if (window.innerWidth <= 600) {
    $("#tasks").toggleClass("faded");
  }
  event.preventDefault();
}
$(document).delegate("a.inspector-toggle", "click", inspectorHandle);
$(document).delegate("#tasks li", "click", inspectorHandle);

$(document).ready(function(){
  $("#tasks li").tap(inspectorHandle);
  if (window.innerWidth > 600) {
    $("#inspector").css('height', $('#tasks').height());
    if (window.innerWidth > 1024) {
      $("#projects").css('height', $('#tasks').height());
    }
  }
});
