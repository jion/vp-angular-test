"use strict";

angular
  .module("app")
  .directive("contactTable", ['RecursionHelper', contactTable]);


function contactTable (RecursionHelper) {
  return {
    scope: {},
    controller: ['ContactList', '$scope', function(ContactList, $scope) {
      /* jshint validthis: true */
      var vm = this;

      vm.columns = [
	{
	  'name': 'name',
	  'description': 'Contact Name',
	  'sort-criteria': ['firstName', 'lastName']
	},
	{
	  'name': 'title',
	  'description': 'Title',
	  'sort-criteria': ['firstName', 'lastName']
	},
	{
	  'name': 'outlet',
	  'description': 'Outlet name',
	  'sort-criteria': ['firstName', 'lastName']
	},
	{
	  'name': 'profile',
	  'description': 'Contact Profile',
	  'sort-criteria': ['firstName', 'lastName']
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

      $scope.$watch("vm.contactList.length + vm.currentPage + vm.numPerPage", function() {
	var begin = ((vm.currentPage - 1) * vm.numPerPage)
	  , end = begin + vm.numPerPage;

	vm.filteredContactList = vm.contactList.slice(begin, end);
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

      ContactList.fetchContacts().then(function (contactList) {

	vm.contactList = contactList || [];
      });
    }],
    controllerAs: 'vm',
    template: [
      '<table class="striped">',
	'<thead>',
	'<th table-header ng-repeat="column in vm.columns" ',
	                    'name="column.name" ',
			    'description="column.description" ',
			    'sort-criteria="column[\'sort-criteria\'" />',
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
    ].join(''),
    compile: function(element) {
      return RecursionHelper.compile(element);
    }
  }
}
