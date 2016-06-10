angular.module('giphastrator')
.directive('write', function() {
  return {
    templateUrl: './views/write.html',
    controller: 'writeController',
    restrict: 'E'
  }
});
