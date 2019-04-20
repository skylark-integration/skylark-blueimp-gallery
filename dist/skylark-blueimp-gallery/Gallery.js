/**
 * skylark-blueimp-gallery - The skylark album widgets.
 * @author Hudaokeji Co.,Ltd
 * @version v0.9.0
 * @link www.skylarkjs.org
 * @license MIT
 */
define(["skylark-langx/skylark","skylark-langx/langx","skylark-utils-dom/noder","skylark-ui-swt/Widget"],function(t,e,i,r){var s={views:[],items:[]},n=r.inherit({klassName:"Gallery",pluginName:"blueimp.gallery",options:{typeProperty:"type",titleProperty:"title",altTextProperty:"alt",urlProperty:"href",srcsetProperty:"urlset"},_init:function(){this.$el=this._elm,this.el=this.$el[0],this._itemFactories={},this.items=this.options.items,this.setViewMode(this.options.view.mode,this.options.view.options)},setViewMode:function(t,e){this.viewMode=t;for(var i=0;i<s.views.length;i++)if(s.views[i].name===t){this.view=new s.views[i].ctor(this,e);break}},getItemUrl:function(t){return n.getItemProperty(t,this.options.urlProperty)},getItemTitle:function(t){return n.getItemProperty(t,this.options.titleProperty)},addItems:function(t){t.concat||(t=Array.prototype.slice.call(t)),this.items.concat||(this.items=Array.prototype.slice.call(this.items)),this.items=this.items.concat(t),this.num=this.items.length,this.trigger("itemsChanged")},renderItem:function(t,e){var i=t&&n.getItemProperty(t,this.options.typeProperty);i&&(i=i.split("/")[0]),i||(i="image");var r=this._itemFactories[i];if(!r)for(var o=0;o<s.items.length;o++)if(s.items[o].mimeType===i){r=this._itemFactories[i]=new s.items[o].ctor(this);break}if(!r)throw new Error("invalid type:"+i);var a=r.render(t,e),l=n.getItemProperty(t,this.options.srcsetProperty);return l&&a.setAttribute("srcset",l),a},isRunnable:function(t){},playItem:function(t){}});e.mixin(n,{getNestedProperty:function(t,e){return e.replace(/\[(?:'([^']+)'|"([^"]+)"|(\d+))\]|(?:(?:^|\.)([^\.\[]+))/g,function(e,i,r,s,n){var o=n||i||r||s&&parseInt(s,10);e&&t&&(t=t[o])}),t},getDataProperty:function(t,e){var i,r;if(t.dataset?(i=e.replace(/-([a-z])/g,function(t,e){return e.toUpperCase()}),r=t.dataset[i]):t.getAttribute&&(r=t.getAttribute("data-"+e.replace(/([A-Z])/g,"-$1").toLowerCase())),"string"==typeof r){if(/^(true|false|null|-?\d+(\.\d+)?|\{[\s\S]*\}|\[[\s\S]*\])$/.test(r))try{return $.parseJSON(r)}catch(t){}return r}},getItemProperty:function(t,e){var i=this.getDataProperty(t,e);return void 0===i&&(i=t[e]),void 0===i&&(i=this.getNestedProperty(t,e)),i}});var o=n.ViewBase=e.Evented.inherit({klassName:"ViewBase",options:{controlsClass:"skylark-blueimp-gallery-controls",fullScreen:!1},init:function(t,e){var r,s=this;this.gallery=t,this.initOptions(e),this.options.fullScreen&&i.fullScreen(this.container[0]),this.gallery.on("item.running",function(t){s.container.hasClass(s.options.controlsClass)?(r=!0,s.container.removeClass(s.options.controlsClass)):r=!1}),this.gallery.on("item.running",function(t){r&&s.container.addClass(s.options.controlsClass)})},initOptions:function(t){this.options=e.mixin({},o.prototype.options,t)},close:function(){i.fullScreen()===this.container[0]&&i.fullScreen(!1)}}),a=n.ItemFactoryBase=e.Evented.inherit({klassName:"ItemFactoryBase",options:{typeProperty:"type",titleProperty:"title",altTextProperty:"alt",urlProperty:"href",srcsetProperty:"urlset"},init:function(t,e){this.gallery=t,this.initOptions(e)},initOptions:function(t){this.options=e.mixin({},a.prototype.options,t)},setTimeout:function(t,e,i){var r=this;return t&&window.setTimeout(function(){t.apply(r,e||[])},i||0)},getNestedProperty:n.getNestedProperty,getDataProperty:n.getDataProperty,getItemProperty:n.getItemProperty});return n.installPlugin=function(t,e){var i=s[t];if(!i)throw new Error("Invalid paramerter!");i.push(e)},t.itg=t.itg||{},t.itg.blueimp=t.itg.blueimp||{},t.itg.blueimp.Gallery=n});
//# sourceMappingURL=sourcemaps/Gallery.js.map
