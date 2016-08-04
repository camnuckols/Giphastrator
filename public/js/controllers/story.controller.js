angular.module( 'giphastrator' )
.controller( 'storyCtrl', function( $scope, writeService, $timeout ) {

	new Clipboard( '.shortUrlBtn' );

	$scope.copied = () => {
		Materialize.toast( 'Copied!', 500, 'rounded' );
	}

	$scope.facebook = 'OFF';
	$scope.twitter = 'OFF';
	$scope.tumblr = 'OFF';
	$scope.digg = 'OFF';
	$scope.reddit = 'OFF';
	$scope.pinterest = 'OFF';

	$scope.changeFacebookColor = () => {
	  if ($scope.facebook === 'OFF') {
	    $scope.facebook = 'ON';
	  } else {
	    $scope.facebook = 'OFF';
	  }
	}

	$scope.changeTwitterColor = () => {
	  if ($scope.twitter === 'OFF') {
	    $scope.twitter = 'ON';
	  } else {
	    $scope.twitter = 'OFF';
	  }
	}

	$scope.changeTumblrColor = () => {
	  if ($scope.tumblr === 'OFF') {
	    $scope.tumblr = 'ON';
	  } else {
	    $scope.tumblr = 'OFF';
	  }
	}

	$scope.changeDiggColor = () => {
	  if ($scope.digg === 'OFF') {
	    $scope.digg = 'ON';
	  } else {
	    $scope.digg = 'OFF';
	  }
	}

	$scope.changeRedditColor = () => {
	  if ($scope.reddit === 'OFF') {
	    $scope.reddit = 'ON';
	  } else {
	    $scope.reddit = 'OFF';
	  }
	}

	$scope.changePinterestColor = () => {
	  if ($scope.pinterest === 'OFF') {
	    $scope.pinterest = 'ON';
	  } else {
	    $scope.pinterest = 'OFF';
	  }
	}

	$scope.getGif = () => {
		let backGif = $scope.story.title;

		writeService.getGif( backGif, 'g' ).then((response) => {
								$timeout( () => {

									if ( $scope.background !== response.data.data.images.downsized_large.url ) {
										$scope.background = response.data.data.images.downsized_large.url;
									} else {
										$scope.getGif();
									}
								} );
						});
	}


	getStory = () => {

		writeService.getStory().then( response => {
			$timeout(() => {
				$scope.story = response
				let backGif = response.title;

				writeService.getGif( backGif, 'g' ).then((response) => {

										$timeout( () => {
											$scope.background = response.data.data.images.downsized_large.url;
										} );
									});
				if ( response ) {
					getAuthor();
				}
			} );
		} );
	};

	getStory();

	getAuthor = () => {
		$scope.author = $scope.story.author;
		// writeService.getAuthor( $scope.story.author ).then( response => {
		// 	console.log( response, 'line 105 storyCtrl' );
		// 	$timeout(() => {
		// 		$scope.author = response;
		// 	} );
		// } );
	};

} );
