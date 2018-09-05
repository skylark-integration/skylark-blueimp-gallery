define([
  'skylark-langx/langx',
  '../../Album',
  './SliderView'
],function (langx,Album,SliderView) {

	var LightBoxView = SliderView.inherit({
		klassName : "LightBoxView",
		options : {
	        // Hide the page scrollbars:
	        hidePageScrollbars: false,

		    // The tag name, Id, element or querySelector of the indicator container:
		    indicatorContainer: 'ol',
		    // The class for the active indicator:
		    activeIndicatorClass: 'active',
		    // The list object property (or data attribute) with the thumbnail URL,
		    // used as alternative to a thumbnail child element:
		    thumbnailProperty: 'thumbnail',
		    // Defines if the gallery indicators should display a thumbnail:
		    thumbnailIndicators: true
		},


	    initOptions: function (options) {
	    	var options = langx.mixin({},LightBoxView.prototype.options,options);
			this.overrided(options);
	    },

	    createIndicator: function (obj) {
	      var album = this.album,
	      		indicator = this.indicatorPrototype.cloneNode(false)
	      var title = album.getItemTitle(obj)
	      var thumbnailProperty = this.options.thumbnailProperty
	      var thumbnailUrl
	      var thumbnail
	      if (this.options.thumbnailIndicators) {
	        if (thumbnailProperty) {
	          thumbnailUrl = Album.getItemProperty(obj, thumbnailProperty)
	        }
	        if (thumbnailUrl === undefined) {
	          thumbnail = obj.getElementsByTagName && $(obj).find('img')[0]
	          if (thumbnail) {
	            thumbnailUrl = thumbnail.src
	          }
	        }
	        if (thumbnailUrl) {
	          indicator.style.backgroundImage = 'url("' + thumbnailUrl + '")'
	        }
	      }
	      if (title) {
	        indicator.title = title;
	      }
	      return indicator;
	    },

	    addIndicator: function (index) {
	      if (this.indicatorContainer.length) {
	        var indicator = this.createIndicator(this.list[index])
	        indicator.setAttribute('data-index', index)
	        this.indicatorContainer[0].appendChild(indicator)
	        this.indicators.push(indicator)
	      }
	    },

	    setActiveIndicator: function (index) {
	      if (this.indicators) {
	        if (this.activeIndicator) {
	          this.activeIndicator.removeClass(this.options.activeIndicatorClass)
	        }
	        this.activeIndicator = $(this.indicators[index])
	        this.activeIndicator.addClass(this.options.activeIndicatorClass)
	      }
	    },

	    initSlides: function (reload) {
	      if (!reload) {
	        this.indicatorContainer = this.container.find(
	          this.options.indicatorContainer
	        )
	        if (this.indicatorContainer.length) {
	          this.indicatorPrototype = document.createElement('li')
	          this.indicators = this.indicatorContainer[0].children
	        }
	      }
	      this.overrided(reload);
	    },

	    addSlide: function (index) {
	      this.overrided(index);
	      this.addIndicator(index)
	    },

	    resetSlides: function () {
	    	this.overrided();
	    	this.indicatorContainer.empty();
	    	this.indicators = [];
	    },

	    handleClick: function (event) {
	      var target = event.target || event.srcElement
	      var parent = target.parentNode
	      if (parent === this.indicatorContainer[0]) {
	        // Click on indicator element
	        this.preventDefault(event)
	        this.slide(this.getNodeIndex(target))
	      } else if (parent.parentNode === this.indicatorContainer[0]) {
	        // Click on indicator child element
	        this.preventDefault(event)
	        this.slide(this.getNodeIndex(parent))
	      } else {
	        return this.overrided(event)
	      }
	    },

	    handleSlide: function (index) {
	      this.overrided(index)
	      this.setActiveIndicator(index)
	    },

	    handleClose: function () {
	      if (this.activeIndicator) {
	        this.activeIndicator.removeClass(this.options.activeIndicatorClass)
	      }
	      this.overrided();
	    }

	});

	Album.installPlugin("views",{
		"name" :  "lightbox",
		"ctor" :  LightBoxView,
		"templates" : {
			"default" : '<div class="slides"></div>' +
			          '<h3 class="title"></h3>' +
			          '<a class="prev">‹</a>' +
			          '<a class="next">›</a>' +
			          '<a class="close">×</a>' + 
			          '<ol class="indicator"></ol>'

		} 
	});

	return LightBoxView;

});