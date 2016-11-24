;"use strict";

(function(){
  angular
    .module("app")
    .directive("indexPage", [indexPage]);

  function indexPage () {
    return {
      scope: {},
      controller: ['$scope','$filter','ContactList', function ($scope, $filter, ContactList) {
        var vm = this;

        vm.currentPage = 1;
        vm.itemsPerPage = 10;
        vm.sortByColumn = '';
        vm.reverseSorting = false;
        vm.activeColumns= [];

        vm.getCurrentPageData = function(){};
        vm.getTotalPages = function(){ return Math.ceil( rawData.length / vm.itemsPerPage );};

        // Constructor
        var rawData = [],
            orderedData = [];
        vm.filteredData = [];

        $scope.$watch('[rawData, vm.sortByColumn, vm.reverseSorting]', generateOrderedData);
        $scope.$watch('[orderedData, vm.currentPage]', generateFilteredData );

        ////
        ContactList.fetchContacts().then(populateContactList);
        ////

        ///////////////////////////////////////////////////////////////////////
        // Function definitions
        ///////////////////////////////////////////////////////////////////////
        function generateOrderedData() {
          orderedData = $filter('orderBy')(rawData, vm.sortByColumn, vm.reverseSorting);
        }

        function generateFilteredData() {
          var begin = ((vm.currentPage - 1) * vm.itemsPerPage)
            , end   = begin + vm.itemsPerPage;

          vm.filteredData = orderedData.slice(begin, end);
        }
        
        $scope.$watch('vm.filteredData', function () {console.log(vm.filteredData)});

        function populateContactList (contactList) {
          rawdata = contactList || [];
        }
      }],
      controllerAs: 'vm',


      template: [
        '<paginator current="vm.currentPage" total="vm.getTotalPages()" />',
        '<dinamyc-table data="vm.filteredData" columns="vm.activeColumns" sortedBy="vm.sortByColumn" reverseOrder="vm.reverseSorting" />'
      ].join(''),
    };
  }
})();
