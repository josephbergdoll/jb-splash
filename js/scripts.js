$(document).ready(function(){

  $('.project-hero h1').waypoint(function(direction) {
    $('.top-nav').toggleClass('pre-fixed');
  });

  $('.buttons').waypoint(function(direction) {
    $('.top-nav').toggleClass('addtransitions');
  });

  $('#about').waypoint(function(direction) {
    $('.top-nav').toggleClass('fixed');
  }, { offset: 116 });

  $('.js-info-button').click(function(event){
    event.preventDefault();
    $(this).closest('.posters li').toggleClass('show');
  });

});