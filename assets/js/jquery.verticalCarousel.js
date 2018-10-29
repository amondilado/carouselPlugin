(function($, window, document, undefined) {

    'use strict';

    $.fn.verticalCarousel = function() {

        var $elem = $(this);
        var data = $elem.data('vertical-carousel');
        if (!data) $elem.data('vertical-carousel', (data = new VerticalCarousel($elem) ));
        
        return this;
    }

    var VerticalCarousel = function (element) {
        
        this.el = $(element);

        this.indiOuter = $('.carousel-indicators-outer'),
        this.indiOuterPosTop = Math.floor(this.indiOuter.position().top),
        this.indiList = $('.carousel-indicators'),
        this.indiLength = this.indiList.children().length - 1,
        this.indiItemHeight = Math.floor($('.carousel-indicator').height()),
        this.controlPrev = $('.carousel-control.left'),
        this.controlNext = $('.carousel-control.right'),
        this.counter = 1,
        this.indiOuterHeight = Math.floor(this.indiOuter.height()),
        this.indiListHeight = Math.floor(this.indiList.height());

        this.init();

        return this;
    }

    //
    // Plugin prototype
    //
    VerticalCarousel.prototype = {
        init: function() {
            var _self = this;
            this.el.on('slid.bs.carousel', function(e) {
                _self.onSlide(_self);
            });
        },

        destroy: function () {
            this.el.removeData('vertical-carousel');

            return this;
        },

        onSlide: function() {
            var _self = this;
            var indiActive = $('.carousel-indicator.active'),
                indiIndex = indiActive.index(), // indiActive.data("slide-to"); zero based
                indiActivePosTop = Math.floor(indiActive.position().top), // position() Returns an object containing the properties top and left.
                indiActivePosBot = indiActivePosTop + this.indiItemHeight,
                dy = indiIndex * this.indiItemHeight; // translate value: itemHeight x position in list

            // Give a vertical offset of thumb half height
            if (dy > (this.indiItemHeight * 0.5)) {
                dy -= this.indiItemHeight * 0.5;
            }

            // Handle controls visibility
            if ((indiIndex > 0) && (indiIndex < this.indiLength)) {
                $('.carousel-control').removeClass('disabled');
            }
            if (indiIndex === this.indiLength) {
                _self.hide(this.controlNext);
            }
            if (indiIndex < 1) {
                _self.hide(this.controlPrev);
            }

            // Return if active node is within visible area
            if (indiActivePosTop > this.indiOuterPosTop && indiActivePosBot < this.indiOuterHeight) {
                return;
            }

            // If active node is hidden translate list up
            if (indiActivePosBot > this.indiOuterHeight) {
                _self.transform(dy);
            }
            // Translate list top to btm
            else if (indiActivePosTop < this.indiOuterPosTop) {
                _self.transform(dy);
            }
        },

        transform: function(dy) {
            this.indiList.css("transform", "translate3d(0,-" + dy + "px,0)");
        },

        hide: function(elem) {
            elem.addClass('disabled');
        }
    }
 
})(jQuery, window, document);