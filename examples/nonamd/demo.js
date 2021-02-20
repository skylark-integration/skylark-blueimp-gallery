/*
 * blueimp Gallery Demo JS
 * https://github.com/blueimp/Gallery
 *
 * Copyright 2013, Sebastian Tschan
 * https://blueimp.net
 *
 * Licensed under the MIT license:
 * https://opensource.org/licenses/MIT
 */

/* global blueimp, $ */
var $ = skylarkjs.domx.query,
    langx = skylarkjs.langx;

$(function () {
  'use strict'

  var carouselLinks = [
    {
     type: 'image',

      href : "https://i.imgur.com/MUSw4Zu.jpg",
      title : "1"
    },
    {
     type: 'image',
      href : 'https://upload.wikimedia.org/wikipedia/commons/thumb/c/c0/' +
      'Big_Buck_Bunny_4K.webm/4000px--Big_Buck_Bunny_4K.webm.jpg',
      title : "2"
    },
    {
     type: 'image',
      href : 'https://upload.wikimedia.org/wikipedia/commons/thumb/9/90/' +
        'Elephants_Dream_s1_proog.jpg/800px-Elephants_Dream_s1_proog.jpg',
      title : "3"
    },
    {
     type: 'image',
      href : "https://secure-a.vimeocdn.com/ts/448/835/448835699_960.jpg",
      title : "4"
    }
  ];
    // Initialize the Gallery as image carousel:
  $('#image-carousel').plugin("blueimp.gallery",{
    items: carouselLinks,
    view : {
      mode : "slider",
      options : {
        carousel: true
      }
    }
  });

  // Initialize the Gallery as video carousel:

  var videos = [
    {
      title: 'Sintel',
      href: 'https://archive.org/download/Sintel/' +
        'sintel-2048-surround.mp4',
      type: 'video/mp4',
      poster: 'https://i.imgur.com/MUSw4Zu.jpg'
    },
    {
      title: 'Big Buck Bunny',
      href: 'https://upload.wikimedia.org/wikipedia/commons/c/c0/' +
        'Big_Buck_Bunny_4K.webm',
      type: 'video/webm',
      poster: 'https://upload.wikimedia.org/wikipedia/commons/thumb/c/c0/' +
        'Big_Buck_Bunny_4K.webm/4000px--Big_Buck_Bunny_4K.webm.jpg'
    },
    {
      title: 'Elephants Dream',
      href: 'https://upload.wikimedia.org/wikipedia/commons/8/83/' +
        'Elephants_Dream_%28high_quality%29.ogv',
      type: 'video/ogg',
      poster: 'https://upload.wikimedia.org/wikipedia/commons/thumb/9/90/' +
        'Elephants_Dream_s1_proog.jpg/800px-Elephants_Dream_s1_proog.jpg'
    },
    {
      title: 'LES TWINS - An Industry Ahead',
      type: 'youtube',
      youtube: 'zi4CIXpx7Bg'
    },
    {
      title: 'KN1GHT - Last Moon',
      type: 'vimeo',
      vimeo: '73686146',
      poster: 'https://secure-a.vimeocdn.com/ts/448/835/448835699_960.jpg'
    }
  ];

  $('#video-carousel').plugin("blueimp.gallery",{
    items: videos,
    view : {
      mode : "slider",
      options : {
        carousel: true
      }
    }
  });
   $(document).on('click', '[data-gallery]', function (event) {
      // Get the container id from the data-gallery attribute:
      var id = $(this).data('gallery'),
          widget = $(id),
          container = (widget.length && widget) || $("#image-lightbox");
      
      var callbacks = {
        onopen: function () {
          container.data('gallery', this).trigger('open')
        },
        onopened: function () {
          container.trigger('opened')
        },
        onslide: function () {
          container.trigger('slide', arguments)
        },
        onslideend: function () {
          container.trigger('slideend', arguments)
        },
        onslidecomplete: function () {
          container.trigger('slidecomplete', arguments)
        },
        onclose: function () {
          container.trigger('close')
        },
        onclosed: function () {
          container.trigger('closed').removeData('gallery')
        }
      };
      var viewOptions = langx.extend(
        // Retrieve custom options from data-attributes
        // on the Gallery widget:
        container.data(),
        {
          container: container[0],
          index: this,
          event: event
        },
        callbacks
      );
      // Select all links with the same data-gallery attribute:
      var links = $(this)
        .closest('[data-gallery-group], body')
        .find('[data-gallery="' + id + '"]');
      if (viewOptions.filter) {
        links = links.filter(viewOptions.filter);
      }
      return new skylarkjs.intg.blueimp.Gallery(container[0],{
        items : links, 
        view : {
          mode : "lightbox",
          options : viewOptions
        }
      });
  });

});
