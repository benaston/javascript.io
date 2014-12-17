(function ($) {
  'use strict';

  $.debounce = function (func, threshold, execAsap, alwaysRun) {
    alwaysRun = alwaysRun || function () {};

    var timeout;

    return function debounced() {
      var obj = this, args = arguments;

      alwaysRun.apply(obj, args);

      if (timeout) {
        clearTimeout(timeout);
      }
      else if (execAsap) {
        func.apply(obj, args);
      }

      timeout = setTimeout(delayed, threshold || 100);

      function delayed() {
        if (!execAsap) {
          func.apply(obj, args);
        }
        timeout = null;
      }
    };
  };

}($));
