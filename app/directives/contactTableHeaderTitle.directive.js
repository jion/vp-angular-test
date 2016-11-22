"use strict";

angular
  .module("app")
  .directive("tableHeader", contactTableHeaderTitle);


function contactTableHeaderTitle () {
  return {
    restrict: 'A',
    scope: {
      'name': '@',
      'description': '=',
      'sort-criteria': '=',
    },
    controller: function () {
      var vm = this;

      vm.getCaret = getCaret;

      function getCaret (columnName) {
        if( vm.sortColumn == columnName ) {
          return vm.reverse ? '▼' : '▲';
        }
        return '';
      }
    },
    template: [
      '<th><a href="#" ng-click="vm.setAsSortColumn()">{{ description }} {{ vm.getCaret() }}</a></th>',
    ].join('')
  }
}
