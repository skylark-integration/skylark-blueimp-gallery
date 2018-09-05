define([
  "skylark-langx/langx",
  "skylark-utils/noder",
  "skylark-utils/eventer",
  "skylark-utils/query",
  '../../Album',
],function(langx,noder, eventer,$ ,Album) {

  'use strict'

  var VideoItemFactory = Album.ItemFactoryBase.inherit({
    klassName : "VideoItemFactory",

    options : {
      // The class for video content elements:
      videoContentClass: 'video-content',
      // The class for video when it is loading:
      videoLoadingClass: 'video-loading',
      // The class for video when it is playing:
      videoPlayingClass: 'video-playing',
      // The list object property (or data attribute) for the video poster URL:
      videoPosterProperty: 'poster',
      // The list object property (or data attribute) for the video sources array:
      videoSourcesProperty: 'sources'
    },

    initOptions : function(options) {
      this.overrided();
      this.options = langx.mixin(this.options,VideoItemFactory.prototype.options,options);
    },

    handleSlide: function (index) {
      handleSlide.call(this, index)
      if (this.playingVideo) {
        this.playingVideo.pause()
      }
    },

    render : function(obj, callback, videoInterface) {
      var that = this
      var options = this.options
      var videoContainerNode = noder.createElement("div")
      var videoContainer = $(videoContainerNode)
      var errorArgs = [
        {
          type: 'error',
          target: videoContainerNode
        }
      ]
      var video = videoInterface || document.createElement('video')
      var url = this.getItemProperty(obj, options.urlProperty)
      var type = this.getItemProperty(obj, options.typeProperty)
      var title = this.getItemProperty(obj, options.titleProperty)
      var altText =
        this.getItemProperty(obj, this.options.altTextProperty) || title
      var posterUrl = this.getItemProperty(obj, options.videoPosterProperty)
      var posterImage
      var sources = this.getItemProperty(obj, options.videoSourcesProperty)
      var source
      var playMediaControl
      var isLoading
      var hasControls
      videoContainer.addClass(options.videoContentClass)
      if (title) {
        videoContainerNode.title = title
      }
      if (video.canPlayType) {
        if (url && type && video.canPlayType(type)) {
          video.src = url
        } else if (sources) {
          while (sources.length) {
            source = sources.shift()
            url = this.getItemProperty(source, options.urlProperty)
            type = this.getItemProperty(source, options.typeProperty)
            if (url && type && video.canPlayType(type)) {
              video.src = url
              break
            }
          }
        }
      }
      if (posterUrl) {
        video.poster = posterUrl
        posterImage = noder.createElement("img")
        $(posterImage).addClass(options.toggleClass)
        posterImage.src = posterUrl
        posterImage.draggable = false
        posterImage.alt = altText
        videoContainerNode.appendChild(posterImage)
      }
      playMediaControl = document.createElement('a')
      playMediaControl.setAttribute('target', '_blank')
      if (!videoInterface) {
        playMediaControl.setAttribute('download', title)
      }
      playMediaControl.href = url
      if (video.src) {
        video.controls = true
        ;(videoInterface || $(video))
          .on('error', function () {
            that.setTimeout(callback, errorArgs)
          })
          .on('pause', function () {
            if (video.seeking) return
            isLoading = false
            videoContainer
              .removeClass(that.options.videoLoadingClass)
              .removeClass(that.options.videoPlayingClass)
            that.album.trigger("item.pause",{
              item : that
            });
            delete that.playingVideo
            if (that.interval) {
              that.play()
            }
          })
          .on('playing', function () {
            isLoading = false
            videoContainer
              .removeClass(that.options.videoLoadingClass)
              .addClass(that.options.videoPlayingClass);

            that.album.trigger("item.running",{
              item : that
            });
          })
          .on('play', function () {
            window.clearTimeout(that.timeout)
            isLoading = true
            videoContainer.addClass(that.options.videoLoadingClass)
            that.playingVideo = video

            that.album.trigger("item.run",{
              item : that
            });
          })
        $(playMediaControl).on('click', function (event) {
          eventer.stop(event)
          if (isLoading) {
            video.pause()
          } else {
            video.play()
          }
        })
        videoContainerNode.appendChild(
          (videoInterface && videoInterface.element) || video
        )
      }
      videoContainerNode.appendChild(playMediaControl)
      this.setTimeout(callback, [
        {
          type: 'load',
          target: videoContainerNode
        }
      ])
      return videoContainerNode

    }


  });


  var pluginInfo = {
    name : "video",
    mimeType : "video",
    ctor : VideoItemFactory
  };

  Album.installPlugin("items",pluginInfo);

  return pluginInfo;

});
