define([
    "skylark-langx/skylark",
    "skylark-langx/langx",
    "skylark-utils/noder",
    "skylark-utils/widgets"
], function(skylark, langx, noder, widgets) {
	var registry = {
		views : [],
		items : []
	};

	var Album = widgets.Widget.inherit({
		klassName : "Album",

	    options : {
		 
 	      // The list object property (or data attribute) with the object type:
	      typeProperty: 'type',
	      // The list object property (or data attribute) with the object title:
	      titleProperty: 'title',
	      // The list object property (or data attribute) with the object alt text:
	      altTextProperty: 'alt',
	      // The list object property (or data attribute) with the object URL:
	      urlProperty: 'href',
	      // The list object property (or data attribute) with the object srcset URL(s):
	      srcsetProperty: 'urlset',	    	
	    },

		/*
		 * @param {Element} el The container element. 
		 */
		init : function(el,options) {
			//this.overrided(el,options);	
			this.$el = $(el);
			this.el = this.$el[0];
			this.options = langx.mixin({},Album.prototype.options,options);
			this._itemFactories = {

			};
			this.items = this.options.items;
			this.setViewMode(this.options.view.mode,this.options.view.options);
		},

		setViewMode : function(mode,options) {
			this.viewMode = mode;
      		for (var i =0 ;i<registry.views.length;i++) {
      			if (registry.views[i].name === mode) {
      				this.view = new registry.views[i].ctor(this,options);
      				break;
      			}
      		}
		},

		getItemUrl : function(item) {
			return Album.getItemProperty(item,this.options.urlProperty);
		},

		getItemTitle : function(item) {
			return Album.getItemProperty(item,this.options.titleProperty);
		},

	    addItems: function (items) {
	      var i
	      if (!items.concat) {
	        // Make a real array out of the items to add:
	        items = Array.prototype.slice.call(items);
	      }
	      if (!this.items.concat) {
	        // Make a real array out of the Gallery items:
	        this.items = Array.prototype.slice.call(this.items);
	      }
	      this.items = this.items.concat(items);
	      this.num = this.items.length;
	      this.trigger("itemsChanged");
	    },

	    renderItem : function(item,callback) {
		      var type = item && Album.getItemProperty(item, this.options.typeProperty);

		      if (type) {
		      	type = type.split('/')[0];
		      }

		      if (!type) {
		      	//throw new Error("no type ");
		      	type = "image";
		      }

	      	var factory = this._itemFactories[type];

	      	if (!factory) {
	      		for (var i =0 ;i<registry.items.length;i++) {
	      			if (registry.items[i].mimeType === type) {
	      				factory = this._itemFactories[type] = new registry.items[i].ctor(this);
	      				break;
	      			}
	      		}
	      	}

	      	if (!factory) {
	      		throw new Error ("invalid type:" + type);
	      	}
		    
		    var element = factory.render(item,callback);
		    var srcset = Album.getItemProperty(item, this.options.srcsetProperty)
		    if (srcset) {
		      element.setAttribute('srcset', srcset)
		    }
		    return element;
	    },

	    /*
	     * Check whether a item is runnable.
	     * @param {Object} item The item object
	     * @return {Boolean}
	     */
	    isRunnable : function(item) {

	    },

	    playItem : function(item) {

	    }

	});


	langx.mixin(Album,{
	    getNestedProperty: function (obj, property) {
	      property.replace(
	        // Matches native JavaScript notation in a String,
	        // e.g. '["doubleQuoteProp"].dotProp[2]'
	        // eslint-disable-next-line no-useless-escape
	        /\[(?:'([^']+)'|"([^"]+)"|(\d+))\]|(?:(?:^|\.)([^\.\[]+))/g,
	        function (str, singleQuoteProp, doubleQuoteProp, arrayIndex, dotProp) {
	          var prop =
	            dotProp ||
	            singleQuoteProp ||
	            doubleQuoteProp ||
	            (arrayIndex && parseInt(arrayIndex, 10))
	          if (str && obj) {
	            obj = obj[prop]
	          }
	        }
	      )
	      return obj
	    },

	    getDataProperty: function (obj, property) {
	      var key
	      var prop
	      if (obj.dataset) {
	        key = property.replace(/-([a-z])/g, function (_, b) {
	          return b.toUpperCase()
	        })
	        prop = obj.dataset[key]
	      } else if (obj.getAttribute) {
	        prop = obj.getAttribute(
	          'data-' + property.replace(/([A-Z])/g, '-$1').toLowerCase()
	        )
	      }
	      if (typeof prop === 'string') {
	        // eslint-disable-next-line no-useless-escape
	        if (
	          /^(true|false|null|-?\d+(\.\d+)?|\{[\s\S]*\}|\[[\s\S]*\])$/.test(prop)
	        ) {
	          try {
	            return $.parseJSON(prop)
	          } catch (ignore) {}
	        }
	        return prop
	      }
	    },

	    getItemProperty: function (obj, property) {
	      var prop = this.getDataProperty(obj, property)
	      if (prop === undefined) {
	        prop = obj[property]
	      }
	      if (prop === undefined) {
	        prop = this.getNestedProperty(obj, property)
	      }
	      return prop
	    }

	});

	var ViewBase = Album.ViewBase = langx.Evented.inherit({
	    klassName : "ViewBase",

	    options : {
	      // The class to add when the gallery controls are visible:
	      controlsClass: 'skylarkui-album-controls',
		  // Defines if the gallery should open in fullscreen mode:
		  fullScreen: false

	    },

		init : function(album,options) {
			var that = this,
				hasControls;
			this.album = album;
			this.initOptions(options);
	        if (this.options.fullScreen) {
	          noder.fullScreen(this.container[0]);
	        }
	        this.album.on("item.running",function(e){
	            if (that.container.hasClass(that.options.controlsClass)) {
	              hasControls = true
	              that.container.removeClass(that.options.controlsClass);
	            } else {
	              hasControls = false
	            }
	        });

	        this.album.on("item.running",function(e){
	            if (hasControls) {
	              that.container.addClass(that.options.controlsClass);
	            }
	        });
		},

	    initOptions: function (options) {
	      // Create a copy of the prototype options:
	      this.options = langx.mixin({}, ViewBase.prototype.options,options);
	    },

	    close: function () {
      		if (noder.fullScreen() === this.container[0]) {
        		noder.fullScreen(false);
      		}
      	}
	});

	var ItemFactoryBase = Album.ItemFactoryBase =  langx.Evented.inherit({
	    klassName : "ItemFactoryBase",

	    options : {
	      // The list object property (or data attribute) with the object type:
	      typeProperty: 'type',
	      // The list object property (or data attribute) with the object title:
	      titleProperty: 'title',
	      // The list object property (or data attribute) with the object alt text:
	      altTextProperty: 'alt',
	      // The list object property (or data attribute) with the object URL:
	      urlProperty: 'href',
	      // The list object property (or data attribute) with the object srcset URL(s):
	      srcsetProperty: 'urlset',	    	
	    },

		init : function(album,options) {
			this.album = album;
			this.initOptions(options);
		},

	    initOptions: function (options) {
	      // Create a copy of the prototype options:
	      this.options = langx.mixin({}, ItemFactoryBase.prototype.options,options);
	    },


	    setTimeout: function (func, args, wait) {
	      var that = this
	      return (
	        func &&
	        window.setTimeout(function () {
	          func.apply(that, args || [])
	        }, wait || 0)
	      )
	    },	    

	    getNestedProperty: Album.getNestedProperty,

	    getDataProperty: Album.getDataProperty,

	    getItemProperty: Album.getItemProperty
	});
	

	Album.installPlugin = function(pointer,setting) {
		var plugins = registry[pointer];
		if (!plugins) {
			throw new Error("Invalid paramerter!");
		}

		plugins.push(setting);
	};


	var ui = skylark.ui = skylark.ui || {};

    return ui.Album = Album;
})
