"use strict";

angular
  .module("app")
  .directive("tableHeader", contactTableHeaderTitle);


function contactTableHeaderTitle () {
  return {
    restrict: 'A',
    scope: {
      sortFn: '<',
      id:   '@',
      description:  '=',
      sortCriteria: '=',
    },
    controller: function () {
      var vm = this;
    },
    controllerAs: 'vm',
    template: [
      '<th><a href ng-click="sortFn(name)">{{ description }} <i class="tiny material-icons">swap_vert</i></a></th>',
    ].join('')
  }
}
