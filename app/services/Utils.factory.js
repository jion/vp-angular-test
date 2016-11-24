;"use strict";

(function() {

  angular
    .module("app")
    .factory("Utils", Utils);

  function Utils () {
    return {
      getRange: getRange,
    };


    function getRange ( value ) {
      if ( isNaN( value ) ) {
	throw "You must specify a number value in order to get a Range";
      }
      return new Array(value);
    };
  }
})();
