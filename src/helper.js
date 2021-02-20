/* global define, window, document */

define([
  "skylark-langx/langx",
  "skylark-domx-query"
], function (langx, q) {
  'use strict'
  q.extend = langx.mixin;
  return q;
});