$(document).ready(function() {
  var breakpointsJson = {"breakpoints": [
    {
      "portrait":"only screen and (orientation : portrait)",
      "landscape":"only screen and (orientation : landscape)",
      "small":"only screen and (max-width: 768px)",
      "smallMedium":"only screen and (max-width: 1023px)",
      "mediumOnly":"only screen and (min-width: 768px and max-width: 1023px)",
      "mediumUp":"only screen and (min-width: 768px)",
      "largeOnly":"only screen and (min-width: 1024px and max-width: 1279px)",
      "largeUp":"only screen and (min-width: 1024px)",
      "xLargeOnly":"only screen and (min-width: 1280px and max-width: 1799px)",
      "xLargeUp":"only screen and (min-width: 1280px)",
      "xxLarge":"only screen and (min-width: 1800px)",
      "heightSmall":"only screen and (max-height: 768px)",
      "heightMedium":"only screen and (min-height: 769px and max-height: 899px)",
      "heightLarge":"only screen and (min-height: 900px and max-height: 1199px)",
      "heightXlarge":"only screen and (min-height: 1200px)"
    }
  ]};

  var breakpoints = breakpointsJson.breakpoints[0];

  Modernizr.addTest('isios', function(){
    return navigator.userAgent.match(/(iPad|iPhone|iPod)/g) ? true : false
  });

  $(window).one('touchStart', function() {
    $('html').addClass('isTouch');
  });

  isPortrait = window.matchMedia(breakpoints.portrait),
  isLandscape = window.matchMedia(breakpoints.landscape),
  isSmall = window.matchMedia(breakpoints.small),
  isSmallMedium = window.matchMedia(breakpoints.smallMedium),
  isMediumUp = window.matchMedia(breakpoints.mediumUp),
  isMediumOnly = window.matchMedia(breakpoints.mediumOnly),
  isLargeUp = window.matchMedia(breakpoints.largeUp),
  isLargeOnly = window.matchMedia(breakpoints.largeOnly),
  isxLargeUp = window.matchMedia(breakpoints.xLargeUp),
  isxLargeOnly = window.matchMedia(breakpoints.xLargeOnly),
  isxxLarge = window.matchMedia(breakpoints.xxLarge),
  isHeightSmall = window.matchMedia(breakpoints.heightSmall),
  isHeightMedium = window.matchMedia(breakpoints.heightMedium),
  isHeightLarge = window.matchMedia(breakpoints.heightLarge),
  isHeightXlarge = window.matchMedia(breakpoints.heightXlarge);
});
