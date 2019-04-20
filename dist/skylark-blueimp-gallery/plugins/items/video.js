/**
 * skylark-blueimp-gallery - The skylark album widgets.
 * @author Hudaokeji Co.,Ltd
 * @version v0.9.0
 * @link www.skylarkjs.org
 * @license MIT
 */
define(["skylark-langx/langx","skylark-utils-dom/noder","skylark-utils-dom/eventer","skylark-utils-dom/query","../../Gallery"],function(e,t,i,o,r){"use strict";var s=r.ItemFactoryBase.inherit({klassName:"VideoItemFactory",options:{videoContentClass:"video-content",videoLoadingClass:"video-loading",videoPlayingClass:"video-playing",videoPosterProperty:"poster",videoSourcesProperty:"sources"},initOptions:function(t){this.overrided(),this.options=e.mixin(this.options,s.prototype.options,t)},handleSlide:function(e){handleSlide.call(this,e),this.playingVideo&&this.playingVideo.pause()},render:function(e,r,s){var n,a,l,d,p=this,y=this.options,g=t.createElement("div"),m=o(g),u=[{type:"error",target:g}],c=s||document.createElement("video"),v=this.getItemProperty(e,y.urlProperty),h=this.getItemProperty(e,y.typeProperty),P=this.getItemProperty(e,y.titleProperty),C=this.getItemProperty(e,this.options.altTextProperty)||P,f=this.getItemProperty(e,y.videoPosterProperty),k=this.getItemProperty(e,y.videoSourcesProperty);if(m.addClass(y.videoContentClass),P&&(g.title=P),c.canPlayType)if(v&&h&&c.canPlayType(h))c.src=v;else if(k)for(;k.length;)if(a=k.shift(),v=this.getItemProperty(a,y.urlProperty),h=this.getItemProperty(a,y.typeProperty),v&&h&&c.canPlayType(h)){c.src=v;break}return f&&(c.poster=f,n=t.createElement("img"),o(n).addClass(y.toggleClass),n.src=f,n.draggable=!1,n.alt=C,g.appendChild(n)),(l=document.createElement("a")).setAttribute("target","_blank"),s||l.setAttribute("download",P),l.href=v,c.src&&(c.controls=!0,(s||o(c)).on("error",function(){p.setTimeout(r,u)}).on("pause",function(){c.seeking||(d=!1,m.removeClass(p.options.videoLoadingClass).removeClass(p.options.videoPlayingClass),p.gallery.trigger("item.pause",{item:p}),delete p.playingVideo,p.interval&&p.play())}).on("playing",function(){d=!1,m.removeClass(p.options.videoLoadingClass).addClass(p.options.videoPlayingClass),p.gallery.trigger("item.running",{item:p})}).on("play",function(){window.clearTimeout(p.timeout),d=!0,m.addClass(p.options.videoLoadingClass),p.playingVideo=c,p.gallery.trigger("item.run",{item:p})}),o(l).on("click",function(e){i.stop(e),d?c.pause():c.play()}),g.appendChild(s&&s.element||c)),g.appendChild(l),this.setTimeout(r,[{type:"load",target:g}]),g}}),n={name:"video",mimeType:"video",ctor:s};return r.installPlugin("items",n),n});
//# sourceMappingURL=../../sourcemaps/plugins/items/video.js.map