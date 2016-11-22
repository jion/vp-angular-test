"use strict";

angular
  .module("app")
	.service("ContactList", ['$http', ContactList]);


function ContactList ($http) {
  return {
    fetchContacts: fetchContacts
  }

  function fetchContacts() {
    return $http({
      method: 'GET',
      url: '/data/contacts.json'
    }).then(function successCallback(response) {
      return response.data;
    }, function errorCallback(response) {
      console.log("Error al cargar los datos de contacto");
    });
  };
}
