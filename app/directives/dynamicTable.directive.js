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

      template: [
        '<table>',
          '<thead>',
            '<tr>',
              '<th ng-repeat="column in columns">{{ columnDescription[column] }}</th>'
            '</tr>',
          '</thead>',
          '<tbody>',
            '<tr ng-repeat="row in data">',
              '<td ng-repeat="column in columns">{{ row[column] }}</td>'
            '</tr>',
          '</tbody>',
        '</table>',
      ].join('');
    };
  }

})();
