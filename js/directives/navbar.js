angular.module('giphastrator')
.directive('navbar', function(registerService) {
  return {
    restrict: 'E',
    templateUrl: './views/navbar.html',
    link: function(scope, elem, attr) {
      scope.logOut = function() {
        registerService.logOut();
      }
    }
  }
});
