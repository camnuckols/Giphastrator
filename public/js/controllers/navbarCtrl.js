angular.module('giphastrator')
.controller('navbarCtrl', function($scope) {

$scope.mobileMenu = () => {
  setTimeout(function(){
     $(".dropdown-button").dropdown();
  }, 0);
}
$scope.mobileMenu();
});
