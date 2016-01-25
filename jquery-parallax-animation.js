/**
 *   jquery-parallax-animation
 *
 *   version 1.0.0
 *
 *   By Lee
 *
 *   20160124
 *
 */

(function($) {

    var closed = true;
    //var elements = [];
    var elements = [];

    //  Create a jQuery plugin
    $.fn.parallaxAnimation = function(o) {

        this.options = {
            autoplay: true,
        }

        this.options = $.extend(this.options, o);

        this.each(function(index) {
            var me = $(this),
                instance = (new parallaxAnimation).init(me, index);
        });

        if (this.options.autoplay) {
            scrollHandler();
        }
        else {
            closed = false;
        }

        this.start = function() {
            if ( ! closed) this.restart();
        }

        this.pause = function() {
            closed = false;
        }

        this.restart = function() {
            closed = true;
            scrollHandler();
        }

        return this;
    };

    var parallaxAnimation = function() {

        //  Object clone
        var _this = this;

        _this.init = function(el, key) {

            elements[key] = [];
            elements[key].el = el;

            //set init options
            elements[key].options = {
                 "multiplier" : ( typeof el.data('parallax-multiplier') !== 'undefined') ? el.data('parallax-multiplier') : "0.6",
                 "direction": ( typeof el.data('parallax-direction') !== 'undefined') ? el.data('parallax-direction') : "up",
                 "positionType": ( typeof el.data('parallax-positionType') !== 'undefined') ? el.data('parallax-positionType') : "absolute",
            };
            
            _this.parallaxate();
        }

        // Create the logic
        _this.parallaxate = function() {

            for (i = 0; i < elements.length; i++) {

                elements[i].dataset = [];

                if (elements[i].options.positionType == 'relative') {
                    elements[i].initial_offset = parseInt(elements[i].el.css('margin-top').replace(/[^-d.]/g, ''), 10);
                    elements[i].dataset.positionType = "relative";
                } else {
                    elements[i].initial_offset = elements[i].el.offset().top;
                    elements[i].dataset.positionType = "absolute";
                }
                    
                //elements[i].dataset = elements[i].options.direction;
                elements[i].dataset.currentDelta = 0;
                elements[i].dataset.newDelta = 0;
            }
        }
    };


    scrollHandler = function() {

        var _this = this;
        var scrollTop = window.pageYOffset;
        //var menuClosed = true;
        var ismobile = false;
        
        for (i = 0; i < elements.length; i++) {

            var tweenDelta = 0;
            var currentDelta = elements[i].dataset.currentDelta;
            // var newDelta = paralaxxed[i].dataset.newDelta;
            //console.log(currentDelta);
            
            var newDelta = (0 - (scrollTop * elements[i].options.multiplier));
            
            if(elements[i].options.direction == "down") {
                newDelta = (0 + (scrollTop * elements[i].options.multiplier));
            }
            
            // figure out the tween.
            // var tweenDelta = (currentDelta - ((currentDelta - newDelta) * 0.08)); // up
            if (elements[i].options.direction == "down") {
                tweenDelta = (currentDelta - ((currentDelta - newDelta) * 0.06));
                //console.log(tweenDelta);
                elements[i].el.css('transform', "translateY(" + tweenDelta + "px)");
                elements[i].el.css('-webkit-transform', "translateY(" + tweenDelta + "px)");

                elements[i].dataset.currentDelta = tweenDelta;
            }
            else {
                
                if( ismobile ) {
                    
                    tweenDelta = (currentDelta - ((currentDelta - newDelta)));
                    if(currentDelta && currentDelta < 0) {
                        elements[i].el.css('transform', "translateY(" + tweenDelta + "px)");
                        elements[i].el.css('-webkit-transform', "translateY(" + tweenDelta + "px)");
                    }
                    
                } else {
                    
                    tweenDelta = (currentDelta - ((currentDelta - newDelta) * 0.06));

                    console.log(tweenDelta);
                    
                    elements[i].el.css('transform', "translateY(" + tweenDelta + "px) translateZ(0)");
                    elements[i].el.css('-webkit-transform', "translateY(" + tweenDelta + "px) translateZ(0)");
                }
                
                //paralaxxed[i].style.transform = "translate3d(0px," + tweenDelta + "px, 0px)";
                elements[i].dataset.currentDelta = tweenDelta;
            }
        }
        
    
        if(closed) {
            window.requestAnimationFrame( scrollHandler );
        }
        else {
            window.cancelAnimationFrame;
        }
    }

    //parallaxAnimation.version = "1.0.0";

})(jQuery);