angular.module( 'giphastrator' )
.controller( 'storyBoardCtrl', function( $scope, writeService, $timeout ) {

$scope.getStories = () => {
	writeService.getStories().then( response => {
		$timeout(() => {
			// console.log( response);
		$scope.stories = response;
		} );
	} );
}
$scope.getStories();

$scope.addToFavorites = ( storyId, index ) => {
	writeService.addToFavorites( storyId ).then( response => {

	} );
}

} );
