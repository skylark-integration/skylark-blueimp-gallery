/* global define, window, document */

define([
  "skylark-utils-dom/langx",
  "skylark-utils-dom/query"
], function (langx, q) {
  'use strict'
  q.extend = langx.mixin;
  return q;
});