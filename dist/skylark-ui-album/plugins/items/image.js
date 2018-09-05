/**
 * skylark-ui-album - The skylark album widgets.
 * @author Hudaokeji Co.,Ltd
 * @version v0.9.0
 * @link www.skylarkjs.org
 * @license MIT
 */
define(["skylark-langx/langx","skylark-utils/noder","skylark-utils/query","../../Album"],function(t,e,r,i){var o=i.ItemFactoryBase.inherit({klassName:"ImageItemFactory",options:{stretchImages:!1},initOptions:function(e){this.overrided(),this.options=t.mixin(this.options,o.prototype.options,e)},render:function(t,i){function o(t){n||(t={type:t.type,target:s},n=!0,r(p).off("load error",o),y&&"load"===t.type&&(s.style.background='url("'+m+'") center no-repeat',s.style.backgroundSize=y),i(t))}var n,s,a,l,p=e.createElement("img"),m=(this.album,t),y=this.options.stretchImages;return"string"!=typeof m&&(m=this.getItemProperty(t,this.options.urlProperty),a=this.getItemProperty(t,this.options.titleProperty),l=this.getItemProperty(t,this.options.altTextProperty)||a),y===!0&&(y="contain"),y?s=e.createElement("div"):(s=p,p.draggable=!1),a&&(s.title=a),l&&(s.alt=l),r(p).on("load error",o),p.src=m,s}}),n={name:"image",mimeType:"image",ctor:o};return i.installPlugin("items",n),n});
//# sourceMappingURL=../../sourcemaps/plugins/items/image.js.map
