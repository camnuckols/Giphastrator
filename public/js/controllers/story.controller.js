angular.module( 'giphastrator' )
.controller( 'storyCtrl', function( $scope, writeService, $timeout ) {


	getStory = () => {

		writeService.getStory().then( response => {
			$timeout(() => {
				$scope.story = response;
				if ( response ) {
					getAuthor();
				}
			} );
		} );
	}

	getStory();

	getAuthor = () => {
		writeService.getAuthor( $scope.story.author ).then( response => {
			$timeout(() => {
				$scope.author = response;
			} );
		} );
	}

} );
