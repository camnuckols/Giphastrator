angular.module('giphastrator')
.controller('registerController', function($scope, registerService) {

$scope.registerUser = function(email, password, firstName, lastName, username) {
  registerService.registerUser(email, password, firstName, lastName, username);
}

});
