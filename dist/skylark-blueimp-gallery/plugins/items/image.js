/**
 * skylark-blueimp-gallery - The skylark album widgets.
 * @author Hudaokeji Co.,Ltd
 * @version v0.9.0
 * @link www.skylarkjs.org
 * @license MIT
 */
define(["skylark-langx/langx","skylark-utils-dom/noder","skylark-utils-dom/query","../../Gallery"],function(t,e,r,o){var i=o.ItemFactoryBase.inherit({klassName:"ImageItemFactory",options:{stretchImages:!1},initOptions:function(e){this.overrided(),this.options=t.mixin(this.options,i.prototype.options,e)},render:function(t,o){var i,n,s,a,l=e.createElement("img"),p=(this.gallery,t),y=this.options.stretchImages;return"string"!=typeof p&&(p=this.getItemProperty(t,this.options.urlProperty),s=this.getItemProperty(t,this.options.titleProperty),a=this.getItemProperty(t,this.options.altTextProperty)||s),!0===y&&(y="contain"),y?n=e.createElement("div"):(n=l,l.draggable=!1),s&&(n.title=s),a&&(n.alt=a),r(l).on("load error",function t(e){i||(e={type:e.type,target:n},i=!0,r(l).off("load error",t),y&&"load"===e.type&&(n.style.background='url("'+p+'") center no-repeat',n.style.backgroundSize=y),o(e))}),l.src=p,n}}),n={name:"image",mimeType:"image",ctor:i};return o.installPlugin("items",n),n});
//# sourceMappingURL=../../sourcemaps/plugins/items/image.js.map
