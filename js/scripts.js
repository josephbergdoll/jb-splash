$(document).ready(function(){

});

$(window).load(function(){

  $('.mast-bg').delay(900).queue(function(){
    $(this).addClass('show-bg');
  });

  $('.info-contain').delay(1500).queue(function(){
    $(this).addClass('show-info');
  });

});