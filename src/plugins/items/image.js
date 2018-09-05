define([
  "skylark-langx/langx",
  "skylark-utils/noder",
  "skylark-utils/query",
  '../../Album',
],function(langx,noder, $,Album) {

	var ImageItemFactory = Album.ItemFactoryBase.inherit({
		klassName : "ImageItemFactory",
	    options : {
	      // Defines if images should be stretched to fill the available space,
	      // while maintaining their aspect ratio (will only be enabled for browsers
	      // supporting background-size="contain", which excludes IE < 9).
	      // Set to "cover", to make images cover all available space (requires
	      // support for background-size="cover", which excludes IE < 9):
	      stretchImages: false
	    },

		initOptions : function(options) {
			this.overrided();
			this.options = langx.mixin(this.options,ImageItemFactory.prototype.options,options);
		},

	    render : function (obj, callback) {
	      var that = this,
	      	  img = noder.createElement("img"),
	      	  album = this.album,
	      	  url = obj,
	      	  backgroundSize = this.options.stretchImages,
	          called,
	          element,
	          title,
	          altText;

	      function callbackWrapper (event) {
	        if (!called) {
	          event = {
	            type: event.type,
	            target: element
	          }

	          called = true
	          $(img).off('load error', callbackWrapper)
	          if (backgroundSize) {
	            if (event.type === 'load') {
	              element.style.background = 'url("' + url + '") center no-repeat'
	              element.style.backgroundSize = backgroundSize
	            }
	          }
	          callback(event)
	        }
	      }
	      if (typeof url !== 'string') {
	        url = this.getItemProperty(obj, this.options.urlProperty);
	        title = this.getItemProperty(obj, this.options.titleProperty);
	        altText =
	          this.getItemProperty(obj, this.options.altTextProperty) || title;
	      }
	      if (backgroundSize === true) {
	        backgroundSize = 'contain';
	      }
	      if (backgroundSize) {
	        element = noder.createElement("div");
	      } else {
	        element = img;
	        img.draggable = false;
	      }
	      if (title) {
	        element.title = title;
	      }
	      if (altText) {
	        element.alt = altText;
	      }
	      $(img).on('load error', callbackWrapper);
	      img.src = url
	      return element;
	    }

	});

	var pluginInfo = {
		name : "image",
		mimeType : "image", 
		ctor :  ImageItemFactory
  	};

	Album.installPlugin("items",pluginInfo);

	return pluginInfo;
	
});