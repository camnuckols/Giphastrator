angular.module('giphastrator')
.controller('registerController', function($scope, registerService) {

$scope.registerUser = function(email, password, firstName, lastName, username) {
  registerService.registerUser(email, password, firstName, lastName, username);
}
$scope.signIn = function(email, password) {
  registerService.signIn(email, password);
}
$scope.changeEmail = function(newEmail, password) {
  registerService.changeEmail(newEmail, password);
}
$scope.loginPopup = function() {
  registerService.loginPopup();
}
$scope.googleLoginPopup = function() {
  registerService.googleLoginPopup();
}
$scope.twitterLoginPopup = function() {
  registerService.twitterLoginPopup();
}

});
