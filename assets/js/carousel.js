$(function() {
  'use strict';
  // TODO do sth with those vars
  var indiOuter = $('.carousel-indicators-outer'),
    indiOuterPosTop = Math.floor(indiOuter.position().top),
    indiList = $('.carousel-indicators'),
    indiLength = indiList.children().length - 1,
    indiItemHeight = Math.floor($('.carousel-indicator').height()),
    controlPrev = $('.carousel-control.left'),
    controlNext = $('.carousel-control.right'),
    counter = 1,
    indiOuterHeight = Math.floor(indiOuter.height()),
    indiListHeight = Math.floor(indiList.height());

// TODO run logic in functions if thumbs wrap
  if (indiListHeight > indiOuterHeight) {
    var indiWrap = true;
    console.log(`indiWrap: ${indiWrap}`);
  }
  // ^ i.e.: if(indiListHeight < indiOuterHeight) return; else {...

  // on carousel slid get active position
  $('#carouselThumbsV').on('slid.bs.carousel', function(e) {
    var indiActive = $('.carousel-indicator.active'),
        indiIndex = indiActive.index(), // indiActive.data("slide-to"); zero based
        indiActivePosTop = Math.floor(indiActive.position().top), // position() Returns an object containing the properties top and left.
        indiActivePosBot = indiActivePosTop + indiItemHeight,
        dy = indiIndex * indiItemHeight; // translate value: itemHeight x position in list

      // Give a vertical offset of thumb half height
      if (dy > (indiItemHeight * 0.5)) {
        console.log(`dy: ${dy}, offset `)
        dy -= indiItemHeight * 0.5;
        console.log(`dy: ${dy}`);
      }

      console.log('indiLength:' + indiLength + ', active index: ' + indiIndex);

      // Handle controls visibility
      if ((indiIndex > 0) && (indiIndex < indiLength)) {
        $('.carousel-control').removeClass('disabled');
      }
      if (indiIndex === indiLength) {
        controlNext.addClass('disabled');
      }
      if (indiIndex < 1) {
        controlPrev.addClass('disabled');
      }

    // Return if active node is within visible area
    if (indiActivePosTop > indiOuterPosTop && indiActivePosBot < indiOuterHeight) {
      return;
    }

    // If active node is hidden translate list up
    if (indiActivePosBot > indiOuterHeight) {
      console.log('going up!');
      console.log("top: " + indiActivePosTop + ", bottom: " + (indiActivePosTop + indiItemHeight));
      console.log('indiActivePosTop: ' + indiActivePosTop);

      // TODO Smooth down - if thumbs list is a little bigger than carousels heigh calculate dy in a different way
      console.log(`dy: ${dy}, counter: ${(counter)}`);
      indiList.css("transform", "translate3d(0,-" + dy + "px,0)");
    }
    // Translate list top to btm
    else if (indiActivePosTop < indiOuterPosTop) {
      console.log(`going down! dy: ${dy}`);
      indiList.css("transform", "translate3d(0,-" + dy + "px,0)");
    }
  });
});
