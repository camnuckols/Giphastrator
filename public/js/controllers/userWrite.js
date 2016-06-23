angular.module('giphastrator')
.controller('userWrite', function( $scope, writeService ) {

  $scope.addStory = ( words ) => {
    writeService.addStory( words )
    .then( response => {
      console.log(response);
      $scope.stories = response;
  });
  }

  $scope.getStory = () => {
    writeService.getStory()
    .then( response => {
      console.log(response);
      $scope.stories = response;
    });
  }
  $scope.getStory();

});
