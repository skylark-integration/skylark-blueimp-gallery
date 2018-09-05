/* global define, window, document */

define([
  "skylark-utils/langx",
  "skylark-utils/query"
],function (langx,q) {
  'use strict'

  q.extend = langx.mixin;

  return q;
});
