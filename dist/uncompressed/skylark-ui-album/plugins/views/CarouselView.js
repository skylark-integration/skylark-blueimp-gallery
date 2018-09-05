define([
  '../../Album',
  './SliderView'
],function (Album,SliderView) {

	var CarouselView = SliderView.inherit({
		klassName : "CarouselView",

		options : {
	      hidePageScrollbars: false,
	      toggleControlsOnReturn: false,
	      toggleSlideshowOnSpace: false,
	      enableKeyboardNavigation: false,
	      closeOnEscape: false,
	      closeOnSlideClick: false,
	      closeOnSwipeUpOrDown: false,
	      disableScroll: false,
	      startSlideshow: true			
		},

	    initOptions: function (options) {
	    	var options = langx.mixin({},CarouselView.prototype.options,options);
			this.overrided(options);
	    }

	});

	Album.installPlugin("views",{
		"name" :  "carousel",
		"ctor" :  CarouselView,
		"templates" : {
			"default" : '<div class="slides"></div>' +
			          '<h3 class="title"></h3>' +
			          '<a class="prev">‹</a>' +
			          '<a class="next">›</a>' +
			          '<a class="close">×</a>' + 
			          '<a class="play-pause"></a>' +
			          '<ol class="indicator"></ol>'

		} 
	});

	return CarouselView;

});