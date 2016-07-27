angular.module( 'giphastrator' )
.controller( 'storyCtrl', function( $scope, writeService, $timeout ) {


	getStory = () => {

		writeService.getStory().then( response => {
			$timeout(() => {
				$scope.story = response;
			} );
		} );
	}

	getStory();

} );
