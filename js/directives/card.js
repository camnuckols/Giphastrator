angular.module('giphastrator')
.directive('card', function() {
    return {
      restrict: 'EA',
      templateUrl: './views/card.html',
      scope: {
      },
      controller: function($scope) {
        $scope.image = "/img/cameron-nuckols-logo.png";
        $scope.title = "Giphastrator";
        $scope.desc = "It all started with Flavio.";
      }
    }
});
