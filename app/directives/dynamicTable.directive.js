;"use strict";

(function(){
  angular
    .module("app")
    .directive("dynamicTable", [dynamicTable]);


  function dynamicTable() {
    return {
      scope: {
        data: '=',
        columns: '=',
        sortedBy: '=',
        reverseOrder: '=',
      },

      controller: ['$scope', function ($scope) {
        var vm = this;
        var activeColumn = 0;

        vm.getDescription = function (column) {
          if (typeof column != 'object' || column == null)
            return;

          if (typeof column.title === 'function')
            return column.title(column);

          return column.title;
        };

        vm.getContent = function (column, row) {
          if (typeof column != 'object' || column == null)
            return;

          if (typeof column.content === 'function')
            return column.content(row);

          return row[column.content];
        };

        vm.setSortedBy = function (column, $index) {
          if ( vm.isActive($index) ) {
            $scope.reverseOrder = !$scope.reverseOrder;
          } else {
            $scope.sortedBy = column.sortCriteria;
            activeColumn = $index;
          }
        };

        vm.isActive = function ($index) {
          return activeColumn === $index;
        };

      }],
      controllerAs: 'vm',

      template: [
        '<table>',
          '<thead>',
            '<tr>',
              '<th ng-repeat="column in columns track by $index">',
                '<a href="#!" ng-click="vm.setSortedBy(column,$index+1)">{{ vm.getDescription(column) }}</a>',
              '</th>',
            '</tr>',
          '</thead>',
          '<tbody>',
            '<tr ng-repeat="row in data">',
              '<td ng-repeat="column in columns">{{ vm.getContent(column, row) }}</td>',
            '</tr>',
          '</tbody>',
        '</table>',
      ].join(''),
    };
  }

})();
