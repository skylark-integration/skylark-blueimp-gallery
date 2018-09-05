define([
  "skylark-langx/langx",
  "skylark-utils/noder",
  "skylark-utils/query",
  '../../Album',
  './video'
],function(langx,noder, $,Album,video) {
  'use strict'

  var YouTubePlayer = langx.Evented.inherit({
    klassName : "YouTubePlayer",

    init : function (videoId, playerVars, clickToPlay) {
      this.videoId = videoId;
      this.playerVars = playerVars;
      this.clickToPlay = clickToPlay;
      this.element = document.createElement('div');
    },

    canPlayType: function () {
      return true;
    },

    loadAPI: function () {
      var that = this,
          onYouTubeIframeAPIReady = window.onYouTubeIframeAPIReady,
          apiUrl = 'https://www.youtube.com/iframe_api',
          scriptTags = document.getElementsByTagName('script'),
          i = scriptTags.length,
          scriptTag;

      window.onYouTubeIframeAPIReady = function () {
        if (onYouTubeIframeAPIReady) {
          onYouTubeIframeAPIReady.apply(this);
        }
        if (that.playOnReady) {
          that.play();
        }
      }
      while (i) {
        i -= 1
        if (scriptTags[i].src === apiUrl) {
          return
        }
      }
      scriptTag = document.createElement('script')
      scriptTag.src = apiUrl
      scriptTags[0].parentNode.insertBefore(scriptTag, scriptTags[0])
    },

    onReady: function () {
      this.ready = true;
      if (this.playOnReady) {
        this.play()
      }
    },

    onPlaying: function () {
      if (this.playStatus < 2) {
        this.listeners.playing();
        this.playStatus = 2;
      }
    },

    onPause: function () {
      Gallery.prototype.setTimeout.call(this, this.checkSeek, null, 2000)
    },

    checkSeek: function () {
      if (
        this.stateChange === YT.PlayerState.PAUSED ||
        this.stateChange === YT.PlayerState.ENDED
      ) {
        // check if current state change is actually paused
        this.listeners.pause()
        delete this.playStatus
      }
    },

    onStateChange: function (event) {
      switch (event.data) {
        case YT.PlayerState.PLAYING:
          this.hasPlayed = true
          this.onPlaying()
          break
        case YT.PlayerState.PAUSED:
        case YT.PlayerState.ENDED:
          this.onPause()
          break
      }
      // Save most recent state change to this.stateChange
      this.stateChange = event.data
    },

    onError: function (event) {
      this.trigger("error",event);
    },

    play: function () {
      var that = this
      if (!this.playStatus) {
        this.listeners.play();
        this.playStatus = 1;
      }
      if (this.ready) {
        if (
          !this.hasPlayed &&
          (this.clickToPlay ||
            (window.navigator &&
              /iP(hone|od|ad)/.test(window.navigator.platform)))
        ) {
          // Manually trigger the playing callback if clickToPlay
          // is enabled and to workaround a limitation in iOS,
          // which requires synchronous user interaction to start
          // the video playback:
          this.onPlaying();
        } else {
          this.player.playVideo();
        }
      } else {
        this.playOnReady = true;
        if (!(window.YT && YT.Player)) {
          this.loadAPI();
        } else if (!this.player) {
          this.player = new YT.Player(this.element, {
            videoId: this.videoId,
            playerVars: this.playerVars,
            events: {
              onReady: function () {
                that.onReady()
              },
              onStateChange: function (event) {
                that.onStateChange(event)
              },
              onError: function (event) {
                that.onError(event)
              }
            }
          })
        }
      }
    },

    pause: function () {
      if (this.ready) {
        this.player.pauseVideo()
      } else if (this.playStatus) {
        delete this.playOnReady
        this.listeners.pause()
        delete this.playStatus
      }
    }
  });


  var YouTubeItemFactory = video.ctor.inherit({
    klassName : "YouTubeItemFactory",

    YouTubePlayer: YouTubePlayer,
    
    options : {
      // The list object property (or data attribute) with the YouTube video id:
      youTubeVideoIdProperty: 'youtube',
      // Optional object with parameters passed to the YouTube video player:
      // https://developers.google.com/youtube/player_parameters
      youTubePlayerVars: {
        wmode: 'transparent'
      },
      // Require a click on the native YouTube player for the initial playback:
      youTubeClickToPlay: true
    },

    initOptions : function(options) {
      this.overrided();
      this.options = langx.mixin(this.options,YouTubeItemFactory.prototype.options,options);
    },

    render : function (obj, callback) {
      var options = this.options
      var videoId = this.getItemProperty(obj, options.youTubeVideoIdProperty)
      if (videoId) {
        if (this.getItemProperty(obj, options.urlProperty) === undefined) {
          obj[options.urlProperty] = '//www.youtube.com/watch?v=' + videoId
        }
        if (
          this.getItemProperty(obj, options.videoPosterProperty) === undefined
        ) {
          obj[options.videoPosterProperty] =
            '//img.youtube.com/vi/' + videoId + '/maxresdefault.jpg'
        }
        return this.overrided(
          obj,
          callback,
          new YouTubePlayer(
            videoId,
            options.youTubePlayerVars,
            options.youTubeClickToPlay
          )
        )
      }
    }
  });

  var pluginInfo = {
    name : "youtube",
    mimeType : "youtube", 
    ctor :  YouTubeItemFactory
    };

  Album.installPlugin("items",pluginInfo);

  return pluginInfo;
});
