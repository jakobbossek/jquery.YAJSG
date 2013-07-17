;(function($) {
	jQuery.fn.yasg = function(arg) {
		var options = $.extend(
			{},
			$.fn.yasg.defaults,
			arg
		);
		
		
		return this.each(function() {
			// need to be vars to enable 
			var activeElem = 0;
			var totalElems = 0;
			var autoplayTimer = false;
			
			// define shortcut (performance purpose)
			var theGallery = $(this);
			
			// count elements
			totalElems = theGallery.children().length;
			
			// wrap gallery element
			theGallery.wrap('<div id="' + options.wrapperId + '"></div>').css({position: 'absolute', width: options.galleryWidth, height: options.galleryHeight});
			
			// set prperties for children (i.e. gallery elements) 
			theGallery.children().each(function(index, elem) {
				$(this).css({
					position: 'absolute', 
					width: options.galleryWidth, 
					height: options.galleryHeight,
					top: 0,
					left: index * options.galleryWidth
				});
			});
			
			// add controls
			theGallery.after('<a href="#" id="' + options.nextButtonId + '">' + options.nextButtonText + '</a>');
			theGallery.after('<a href="#" id="' + options.prevButtonId + '">' + options.prevButtonText + '</a>');
			theGallery.after('<a href="#" id="' + options.autoplayButtonId + '">' + (options.autoplay ? options.autoplayStopText : options.autoplayStartText) + '</a>');
			
			// add functionality to controls
			$("#" + options.nextButtonId).click(function(e) {
				activeElem = (activeElem + 1) < totalElems ? activeElem + 1 : 0;
				jumpTo(activeElem, theGallery, options);
				e.preventDefault();
			});
			
			$("#" + options.prevButtonId).click(function(e) {
				activeElem = (activeElem - 1 < 0) ? totalElems - 1 : activeElem - 1;
				jumpTo(activeElem, theGallery, options);
				e.preventDefault();
			});
			
			var autoplayControl = $("#" + options.autoplayButtonId);
			
			toggleAutoplay = function() {
				if(autoplayTimer) {
					stopAutoplay();
					//alert("timer aktiv");
					autoplayControl.html(options.autoplayStartText);
				} else {
					startAutoplay();
					//alert("timer inaktiv");
					autoplayControl.html(options.autoplayStopText);
				}
			}
		
			startAutoplay = function() {
				autoplayTimer = setInterval(function() {
					activeElem = (activeElem + 1) < totalElems ? activeElem + 1 : 0;
					jumpTo(activeElem, theGallery, options);
				}, 2000);
			}

			stopAutoplay = function() {
				clearInterval(autoplayTimer);
				autoplayTimer = false;
			}
			
			$("#" + options.autoplayButtonId).click(function(e) {
				toggleAutoplay();
			});
			
			if(options.autoplay) {
				//startAutoplay();
			}
			
			// jumps to the corresponding position
		 	jumpTo = function(newIndex, toMove, options) {
				var distance = newIndex * options.galleryWidth;
				toMove.stop().animate({left: -distance}, options.slideTime);
			}
		});
	};
	
	$.fn.yasg.defaults ={
		wrapperId: 'yasgWrapper',
		galleryWidth: 400,
		galleryHeight: 400,
		nextButtonId: 'yasgNextButton',
		nextButtonText: 'next',
		prevButtonId: 'yasgPrevButton',
		prevButtonText: 'prev',
		slideTime: 300,
		autoplay: true,
		autoplayStopText: 'stop slideshow',
		autoplayStartText: 'start slideshow',
		autoplayButtonId: 'yasgAutoplayButtom'
	};
})(jQuery);




