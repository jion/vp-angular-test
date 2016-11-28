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

        vm.getColumnTitle = getColumnTitle;
        vm.getContent   = getContent;
        vm.setSortedBy  = setSortedBy;
        vm.isActive     = isActive;
        vm.getClassIcon = getClassIcon;
        vm.getColumnClass = getColumnClass;
        
        function getColumnTitle (column) {
          if (typeof column != 'object' || column == null)
            return;

          if (typeof column.title === 'function')
            return column.title(column);

          return column.title;
        };

        function getContent (column, row) {
          if (typeof column != 'object' || column == null)
            return;

          if (typeof column.content === 'function')
            return column.content(row);

          return row[column.content];
        };

        function setSortedBy (column, $index) {
          if ( vm.isActive($index) ) {
            $scope.reverseOrder = !$scope.reverseOrder;
          } else {
            $scope.sortedBy = column.sortCriteria;
            activeColumn = $index;
          }
        };

        function isActive ($index) {
          return activeColumn === $index;
        };

        function getClassIcon ($index) {
          if (vm.isActive($index)) {
            return "expand_" + ( $scope.reverseOrder ? 'more' : 'less' );
          } else {
            return '';
          }
        }

        function getColumnClass($index) {
          if ($index == 3)
            return 'table__profile-column';
          return '';
        }

      }],
      controllerAs: 'vm',

      template: [
        '<table class="responsive-table">',
          '<thead>',
            '<tr>',
              '<th ng-repeat="column in columns track by $index" ng-class="vm.getColumnClass($index)">',
                '<a href="#!" ng-click="vm.setSortedBy(column,$index+1)">{{ vm.getColumnTitle(column) }}<i class="tiny material-icons">{{ vm.getClassIcon($index+1) }}</i></a>',
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
