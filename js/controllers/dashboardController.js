angular.module('giphastrator')
.controller('dashboardController', function($scope, dashboardService, registerService) {
$scope.userData = registerService.getUserDataArray();
});
