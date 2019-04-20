/**
 * skylark-blueimp-gallery - The skylark album widgets.
 * @author Hudaokeji Co.,Ltd
 * @version v0.9.0
 * @link www.skylarkjs.org
 * @license MIT
 */
define(["../../Gallery","./SliderView"],function(e,l){var a=l.inherit({klassName:"CarouselView",options:{hidePageScrollbars:!1,toggleControlsOnReturn:!1,toggleSlideshowOnSpace:!1,enableKeyboardNavigation:!1,closeOnEscape:!1,closeOnSlideClick:!1,closeOnSwipeUpOrDown:!1,disableScroll:!1,startSlideshow:!0},initOptions:function(e){e=langx.mixin({},a.prototype.options,e);this.overrided(e)}});return e.installPlugin("views",{name:"carousel",ctor:a,templates:{default:'<div class="slides"></div><h3 class="title"></h3><a class="prev">‹</a><a class="next">›</a><a class="close">×</a><a class="play-pause"></a><ol class="indicator"></ol>'}}),a});
//# sourceMappingURL=../../sourcemaps/plugins/views/CarouselView.js.map
