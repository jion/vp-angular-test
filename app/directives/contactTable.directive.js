"use strict";

angular
  .module("app")
  .directive("contactTable", ['RecursionHelper', contactTable]);


function contactTable (RecursionHelper) {
  return {
    scope: {
      previousPage: '=',
      nextPage: '=',
    },
    controller: ['ContactList', '$filter', '$scope', function(ContactList, $filter, $scope) {
      /* jshint validthis: true */
      var vm = this;

      // Accesible para sus hijos
      var actions= {
        sortedBy: ()=>console.log('gay')
      };

      vm.columns = [
        {
          id: 'name', 
          description: 'Contact Name',
          sortCriteria: ['firstName', 'lastName']
        },
        {
          id: 'title', 
          description: 'Title',
          sortCriteria: 'title', 
        },
        {
          id: 'outlet', 
          description: 'Outlet name',
          sortCriteria: 'outlet', 
        },
        {
          id: 'profile',
          description: 'Contact Profile',
          sortCriteria: 'profile', 
        },
      ];

      const sortRules = {
        name: ['firstName', 'lastName'],
        title: 'title',
        profile: 'profile',
      };

      vm.contactList = [];
      vm.sortColumn  = '';
      vm.reverse = false;

      vm.filteredContactList = [];
      vm.currentPage = 1;
      vm.numPerPage = 10;

      vm.setSortColumn = setSortColumn;
      vm.getSortRule = function () { return sortRules[vm.sortColumn] || ''; };
      vm.getCaret = getCaret;

      $scope.$watch("[vm.contactList.length, vm.currentPage, vm.numPerPage, vm.reverse]", function() {
        var begin = ((vm.currentPage - 1) * vm.numPerPage)
          , end = begin + vm.numPerPage;
        
        var reorderedList = $filter('orderBy')(vm.contactList, vm.sortColumn, vm.reverse);
        vm.filteredContactList = reorderedList.slice(begin, end);
      });

      window.next = function(){$scope.$apply(()=>vm.currentPage++);}

      function setSortColumn (columnName) {
        if (vm.sortColumn == columnName) {
          reverseSorting();
        } else {
          vm.sortColumn = columnName;
          vm.reverse = false;
        }
      }

      function reverseSorting () {
        vm.reverse = !vm.reverse;
      }

      function getCaret (columnName) {
        if( vm.sortColumn == columnName ) {
          return vm.reverse ? '▼' : '▲';
        }
        return '';
      }

      // Constructor
      ContactList.fetchContacts().then(function (contactList) {
        vm.contactList = contactList || [];
      });

      // XXX Need to move upper
      vm.actions = {
        sortBy: function ( columnName ) {
          setSortColumn(columnName);
        }
      }
    }],
    controllerAs: 'vm',
    template: [
      '<table class="striped">',
          '<thead>',
          '<th table-header sort-fn="vm.actions.sortBy" ng-repeat="column in vm.columns"',
                          ' id="column.id"',
                          ' description="column.description"',
                          ' sortCriteria="column.sortCriteria" />',
          '</thead>',
          '<tbody id="outlet-rows">',
            '<tr ng-repeat="contact in vm.filteredContactList | orderBy:vm.getSortRule():vm.reverse">',
              '<td>{{contact.firstName}} {{contact.lastName}}</td>',
              '<td>{{contact.title}}</td>',
              '<td>{{contact.outletId}}</td>',
              '<td>{{contact.profile}}</td>',
            '</tr>',
          '</tbody>',
      '</table>',
      '<paginator current="vm.currentPage" total="vm.filteredContactList.length"></paginator>',
    ].join(''),
    compile: function(element) {
      return RecursionHelper.compile(element);
    }
  }
}
