"use strict";

angular
  .module("app")
  .directive("manuel", contactTableBody);


function contactTableBody () {
  return {
    scope: {
    },
    replace: true,
    template: [
      '<tr ng-repeat="contact in contactList">',
        '<td>{{contact.firstName}} {{contact.lastName}}</td>',
        '<td>{{contact.title}}</td>',
        '<td>{{contact.outletId}}</td>',
        '<td>{{contact.profile}}</td>',
      '</tr>',
    ].join('')
  }
}
