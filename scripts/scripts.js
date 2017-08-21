var
  $html = $('html'),
  $body = $('body'),
  $document = $(document),
  $window = $(window),
  $pageContent = $('#page-content');

  $window.on('load', function() {
    var
      $imageHovers = $('.image-hover'),
      $infoItems = $('.info-item:not(.title)');
    if (isMediumUp.matches) {
      $infoItems.each(function(index) {
        $(this).velocity({opacity: 1}, {duration: 2500, easing: 'easeInOutQuint', delay: 800 * index, queue: false});
      });

      $imageHovers.delay(1250).each(function(index) {
        $(this).velocity({opacity:[1,0]}, {duration: 1250, easing: 'easeInOutQuint', delay: 100 * index, display: 'block', queue: false});
      });
    }
  });

  $document.ready(function() {

    var movementStrength = 25;
    var height = movementStrength / $(window).height();
    var width = movementStrength / $(window).width();
    $window.on('mousemove', function(e){
      var pageX = e.pageX - ($(window).width() / 2);
      var pageY = e.pageY - ($(window).height() / 2);
      var newvalueX = width * pageX * -1 - 25;
      var newvalueY = height * pageY * -1 - 50;
      $('.image-hover-1').css("top", newvalueY*0.8+"px");
      $('.image-hover-2').css("top", newvalueY*8+"px");
      $('.image-hover-3').css("top", newvalueY*2+"px");
      $('.image-hover-4').css("top", newvalueY*1.2+"px");
      $('.image-hover-5').css("top", newvalueY*0.25+"px");
    });

  });