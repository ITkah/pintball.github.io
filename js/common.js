$(document).ready(function() {

  $(".call-menu").on("click", function(){
    $("nav").slideToggle(250);
    $(".backdrop").toggleClass("backdrop-active");
  });

  $(".backdrop").on("click", function(){
    $("nav").slideUp(250);
    $(this).removeClass("backdrop-active");
  });
    
});