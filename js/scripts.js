$(document).ready(function(){

});

$(window).load(function(){

  $('.mast-bg').delay(600).queue(function(){
    $(this).addClass('show-bg');
  });

  $('.info-contain').delay(900).queue(function(){
    $(this).addClass('show-info');
  });

});