angular.module('giphastrator')
.controller('registerController', function($scope, registerService) {

    const ref = new Firebase("https://giphastrators.firebaseio.com");

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

$scope.facebook = 'OFF';
$scope.twitter = 'OFF';
$scope.google = 'OFF';

$scope.changeFacebookColor = () => {
  if ($scope.facebook === 'OFF') {
    $scope.facebook = 'ON';
  } else {
    $scope.facebook = 'OFF';
  }
}

$scope.changeTwitterColor = () => {
  if ($scope.twitter === 'OFF') {
    $scope.twitter = 'ON';
  } else {
    $scope.twitter = 'OFF';
  }
}

$scope.changeGoogleColor = () => {
  if ($scope.google === 'OFF') {
    $scope.google = 'ON';
  } else {
    $scope.google = 'OFF';
  }
}

});
