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

$(function () {
  'use strict'

  // Load demo images from flickr:
  $.ajax({
    url: 'https://api.flickr.com/services/rest/',
//    url: './api.flickr.com.json',
    data: {
      format: 'json',
      method: 'flickr.interestingness.getList',
      api_key: '7617adae70159d09ba78cfec73c13be3' // jshint ignore:line
    },
    dataType: 'jsonp',
    jsonp: 'jsoncallback'
  }).done(function (result) {
    var carouselLinks = []
    var linksContainer = $('#links')
    var baseUrl
    // Add the demo images as links with thumbnails to the page:
    $.each(result.photos.photo, function (index, photo) {
      baseUrl = 'https://farm' + photo.farm + '.static.flickr.com/' +
      photo.server + '/' + photo.id + '_' + photo.secret
      $('<a/>')
        .append($('<img>').prop('src', baseUrl + '_s.jpg'))
        .prop('href', baseUrl + '_b.jpg')
        .prop('title', photo.title)
        .attr('data-gallery', '')
        .appendTo(linksContainer)
      carouselLinks.push({
        href: baseUrl + '_c.jpg',
        title: photo.title
      })
    });
    // Initialize the Gallery as image carousel:
    skylarkjs.ui.Album('#image-carousel', {
      items: carouselLinks,
      view : {
        mode : "slider",
        options : {
          carousel: true
        }
      }
    })
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

  skylarkjs.ui.Album('#video-carousel', {
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
      var viewOptions = $.extend(
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
      return new skylarkjs.ui.Album(container[0],{
        items : links, 
        view : {
          mode : "lightbox",
          options : viewOptions
        }
      });
  });

});
