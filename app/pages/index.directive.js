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

        // Pagination
        vm.currentPage    =  1;
        vm.totalPages     =  1;
        vm.itemsPerPage   = 25;
        vm.sortByColumn   = '';
        vm.reverseSorting = false;

        vm.activeColumns  = [
          {
            title: "Name",
            content: function (e) { return e.firstName + ' ' + e.lastName; },
            sortCriteria: ["firstName", "lastName"],
          },
          {
            title: "Title",
            content: "title",
            sortCriteria: "title",
          },
          {
            title: "Outlet name",
            content: function (e) { return e.outletName; },
            sortCriteria: "outletName",
          },
          {
            title: "Contact Profile",
            content: "profile",
            sortCriteria: "profile",
          },
        ];


        // Constructor
        vm.rawData = [],
        vm.flattenData = [];
        vm.orderedData = [];
        vm.filteredData = [];

        /**
         *  Step 1. We receive the data
         *  Step 2. We resolve foreigns key references (outletId -> outletName)
         *  Step 3. We sort the data
         *  Step 4. We cut off the current page of data
         *  Step 5. We show the data
         */

        $scope.$watch('vm.rawData', generateFlattenedData);
        $scope.$watch('vm.flattenData', generateOrderedData);
        $scope.$watch('vm.sortByColumn', generateOrderedData);
        $scope.$watch('vm.reverseSorting', generateOrderedData);
        $scope.$watch('vm.orderedData', generateFilteredData);
        $scope.$watch('vm.currentPage', generateFilteredData);

        ////
        ContactList.fetchContacts()
          .then(populateContactList)
          .then(initializePagination)
        ;
        ////

        ///////////////////////////////////////////////////////////////////////
        // Function definitions
        ///////////////////////////////////////////////////////////////////////
        function generateFlattenedData() {
          ContactList.fetchOutlets()
            .then(function(outlets) {
              outlets = outlets.reduce(function(map, obj) {
                map[obj.id] = obj.name;
                return map;
              }, {});

              vm.flattenData = vm.rawData.map(function(item) {
                item.outletName = outlets[item.outletId];
                return item;
              });
            });
        }
        function generateOrderedData() {
          vm.orderedData = $filter('orderBy')(vm.flattenData, vm.sortByColumn, vm.reverseSorting);
        }

        function generateFilteredData() {
          var begin = ((vm.currentPage - 1) * vm.itemsPerPage)
            , end   = begin + vm.itemsPerPage;

          vm.filteredData = vm.orderedData.slice(begin, end);
        }
        
        function populateContactList (contactList) {
          return vm.rawData = contactList || [];
        }
        function initializePagination (contactList) {
          vm.totalPages  = getTotalPages();
          vm.currentPage = 1;
        }
        function getTotalPages () {
          return Math.ceil( vm.rawData.length / vm.itemsPerPage );
        };
      }],
      controllerAs: 'vm',


      template: [
        '<paginator current="vm.currentPage" total="vm.totalPages" />',
        '<dynamic-table data="vm.filteredData"',
                      ' columns="vm.activeColumns"',
                      ' sorted-by="vm.sortByColumn"',
                      ' reverse-order="vm.reverseSorting" />'
      ].join(''),
    };
  }
})();
