$(document).ready(function(){

});

$(window).load(function(){

  $('.loader').delay(800).queue(function(){
    $(this).addClass('loaded');
  });

  $('.mast-bg').delay(1500).queue(function(){
    $(this).addClass('show-bg');
  });

  $('.info-contain').delay(2000).queue(function(){
    $(this).addClass('show-info');
  });

});