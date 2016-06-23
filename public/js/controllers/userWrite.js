angular.module('giphastrator')
.controller('userWrite', function( $scope, writeService ) {

  $scope.addStory = ( words ) => {
    writeService.addStory( words )
    .then( response => {
      $scope.stories = response;
  });
  }

  $scope.getStory = () => {
    writeService.getStory()
    .then( response => {
      $scope.stories = response;
    });
  }
  $scope.getStory();

});
