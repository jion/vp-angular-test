"use strict";
( function() {

angular
    .module("app")
    .directive("paginator", ['Utils', paginator]);

function paginator (Utils) {
    return {
        scope: {
            current: '=',
            total:   '=',
            prev:    '<',
            next:    '<',
        },
        controllerAs: 'vm',
        controller: ['$scope', 'Utils', function($scope, Utils) {
            var vm = this;

            vm.Utils = Utils;

            vm.getLiClass= function ( value ) {
                return {
                  'active': $scope.current == value,
                  'waves-effect': $scope.current != value,
                };
            };

            vm.leftArrowClasses = function () { return {
                'disabled': $scope.current == 1,
                'waves-effect': $scope.current !== 1,
            } };
            vm.rightArrowClasses = function () { return {
                'disabled': $scope.current == $scope.total,
                'waves-effect': $scope.current !== $scope.total,
            } };

            vm.clickPrev= function () {
                if ($scope.current == 1)
                    return;
                $scope.current = $scope.current -1;
                $scope.prev();
            }
            vm.clickNext= function () {
                if ($scope.current == $scope.total)
                    return;
                $scope.current = $scope.current +1;
                $scope.next();
            }
            vm.changePage= function ( $page ) {
                $scope.current = $page;
            }
        }],

        template: [
          '<ul class="pagination">',
            // <
            '<li ng-class="vm.leftArrowClasses()">',
                '<a href="#!" ng-click="vm.clickPrev()"><i class="material-icons">chevron_left</i></a>',
            '</li>',

            // 1 2 3 ..
            '<li ng-repeat="i in vm.Utils.getRange(total) track by $index" ng-class="vm.getLiClass($index+1)">',
              '<a href="#!" ng-click="vm.changePage($index+1)">{{ $index + 1 }}</a>',
            '</li>',

            // >
            '<li ng-class="vm.rightArrowClasses()">',
              '<a href="#!" ng-click="vm.clickNext()"><i class="material-icons">chevron_right</i></a>',
            '</li>',
          '</ul>',
        ].join(''),
    };
}

})();
