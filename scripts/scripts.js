var
  $html = $('html'),
  $body = $('body'),
  $document = $(document),
  $window = $(window),
  $pageContent = $('#page-content');

  $window.on('load resize' ,setImageOffset);

  function setImageOffset() {
    var
      $title = $('.js-title'),
      $image = $('.js-image');


    $image.css('left', $title.offset().left);
  }

  $document.ready(function() {

    var
      halftoneImg = $('.js-halftone')[0],
      halftoneOptions = {
        // ----- dot size ----- //

        dotSize: 1/100,
        // size of dots
        // as a fraction of the diagonal of the image
        // smaller dots = more dots = poorer performance

        dotSizeThreshold: 0.025,
        // hides dots that are smaller than a percentage

        initVelocity: 0.0125,
        // speed at which dots initially grow

        oscPeriod: 6,
        // duration in seconds of a cycle of dot size oscilliation or 'breathing'

        oscAmplitude: 0.125,
        // percentage of change of oscillation

        // ----- color & layout ----- //

        isAdditive: false,
        // additive is black with RGB dots,
        // subtractive is white with CMK dots

        isRadial: true,
        // enables radial grid layout

        channels: [ 'red', 'green', 'blue' ],
        // layers of dots
        // 'lum' is another supported channel, for luminosity

        isChannelLens: true,
        // disables changing size of dots when displaced

        // ----- behavior ----- //

        friction: 0.08,
        // lower makes dots easier to move, higher makes it harder

        hoverDiameter: 0.125,
        // size of hover effect
        // as a fraction of the diagonal of the image

        hoverForce: 0.02,
        // amount of force of hover effect
        // negative values pull dots in, positive push out

        activeDiameter: 0.6,
        // size of click/tap effect
        // as a fraction of the diagonal of the image

        activeForce: 0.01
        // amount of force of hover effect
        // negative values pull dots in, positive push out
      };

      new BreathingHalftone(halftoneImg, halftoneOptions);

  });