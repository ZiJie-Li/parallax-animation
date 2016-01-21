var EpicTextEffects = function() {
	
	// desktop elements
	var year2016			= document.getElementById("year2016");
	var year2015			= document.getElementById("year2015");
	var year2014			= document.getElementById("year2014");

	function init() {

		desktopElements = [year2016, year2015, year2014];

	}

	this.animateDeskTopHero = function() {

		// loop through elements
		for(var i=0; i<desktopElements.length; i++) {

			desktopElements[i].style.visibility = "visible";

			if (i != 1) TweenMax.from(desktopElements[i], 1.3, {css:{y: -1000/(i+2), delay: 0.6*(i*i), ease: Expo.easeOut}});
			else TweenMax.from(desktopElements[i], 1.3, {css:{y: 500, delay: 0.6*(i*i), ease: Expo.easeOut}});

		}

	}


	init();


 }

;(function() {
	
	parallaxController = this;
	
    // Totally lifted from this: http://stackoverflow.com/questions/11197247/javascript-equivalent-of-jquerys-extend-method
    function extend(){
        for(var i=1; i<arguments.length; i++)
            for(var key in arguments[i])
                if(arguments[i].hasOwnProperty(key))
                    arguments[0][key] = arguments[i][key];
        return arguments[0];
    }
	
    // HTML Stuff
    this.paralaxxed = document.getElementsByClassName("parallaxy-animate");
    
    // Create the logic
    parallaxate = function(parallax_elements, defaultSettings) {
        var elements = parallax_elements; 

        for (i = 0; i < elements.length; i++) {
			
			// console.log(elements[i]);
			
            var settings = JSON.parse(JSON.stringify(defaultSettings)); // defaultSettings.copy();
            var options = JSON.parse(elements[i].getAttribute('parallaxy-options'));
            elements[i].settings = extend(settings, options);
            
            if (options.positionType == 'relative') {
                elements[i].initial_offset = parseInt(window.getComputedStyle(elements[i], null).getPropertyValue('margin-top'), 10);
                elements[i].dataset.positionType = "relative";
            } else {
                elements[i].initial_offset = elements[i].offsetTop;
                elements[i].dataset.positionType = "absolute";
            }
            
            elements[i].dataset = options.direction;
            elements[i].dataset.currentDelta = 0;
            elements[i].dataset.newDelta = 0;
			
    //         container.addEventListener("scroll", function(event) {
    //             for (i = 0; i < elements.length; i++) {
    //                 var newDelta = (0 - (container.scrollTop * elements[i].settings.multiplier));
    //                 if(elements[i].settings.direction == "down") {
    //                     newDelta = (0 + (container.scrollTop * elements[i].settings.multiplier));
    //                 }
    //                 elements[i].dataset.newDelta = newDelta;
    //             }
				// parallaxController.scrollHandler()
    //         });
        }
    }
    
    scrollHandler = function() {

        var that = this;
		var scrollTop = window.pageYOffset;
		var menuClosed = true;
		var ismobile = false;
		
        for (i = 0; i < paralaxxed.length; i++) {
            
            var currentDelta = paralaxxed[i].dataset.currentDelta;
            // var newDelta = paralaxxed[i].dataset.newDelta;
			
			var newDelta = (0 - (scrollTop * paralaxxed[i].settings.multiplier));
            
			if(paralaxxed[i].settings.direction == "down") {
				newDelta = (0 + (scrollTop * paralaxxed[i].settings.multiplier));
			}
			
            // figure out the tween.
            // var tweenDelta = (currentDelta - ((currentDelta - newDelta) * 0.08)); // up
            if(paralaxxed[i].settings.direction == "down") {
            
            } else {
				
				if( ismobile ) {
					
					tweenDelta = (currentDelta - ((currentDelta - newDelta)));
					if(currentDelta && currentDelta < 0 ) paralaxxed[i].style.transform = "translateY(" + tweenDelta + "px)";
					// if(currentDelta && currentDelta < 0 ) paralaxxed[i].style.webkitTransform = "translateY(" + tweenDelta + "px)";
					
				} else {
					
					var tweenDelta = (currentDelta - ((currentDelta - newDelta) * 0.08));
					// paralaxxed[i].style.transform = "translateY(" + tweenDelta + "px) translateZ(0)";
					// paralaxxed[i].style.webkitTransform = "translateY(" + tweenDelta + "px) translateZ(0)";
                    paralaxxed[i].style.transform = "translateY(" + tweenDelta + "px) translateZ(0)";
                    paralaxxed[i].style.webkitTransform = "translateY(" + tweenDelta + "px) translateZ(0)";
				}
				// paralaxxed[i].style.transform = "translate3d(0px," + tweenDelta + "px, 0px)";
                paralaxxed[i].dataset.currentDelta = tweenDelta;
            }
        }
		
	
        if(menuClosed) {
            window.requestAnimationFrame( scrollHandler );
        }
        // window.requestAnimationFrame( scrollHandler );
    }

    // init the thing
    function init() {
        var that = this;
        menuClosed = true;
        var paralaxxedsettings = {
             "multiplier" : "0.2",
             "direction": "up",
             "positionType": "absolute",
        };
        
        if(paralaxxed.length > 0) {
            parallaxate(that.paralaxxed, paralaxxedsettings);
        }
    }

    startTween = function() {
    	init();
        scrollHandler();
    }

    pauseTween = function() {
		menuClosed = false;
        // console.log("pause parallax");
	}
	
	restartTween = function() {
		menuClosed = true;
        // console.log("restart parallax");
		scrollHandler();
	}

})();

var parallaxController;

$(function(){
	var epicText = new EpicTextEffects();
	epicText.animateDeskTopHero();
	parallaxController.startTween();

});