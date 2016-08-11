angular.module('giphastrator')
.controller('dashboardController', function( $scope, registerService, writeService, $timeout, $state ) {

	$( document ).ready( function() {
		$('.menu .item').tab();
	} );

function getUser() {
	registerService.getCurrentOrCreateUser().then( response => {
		setUser();
	} );
}

getUser();

function setUser() {
	$timeout(() => {
			$scope.userDetails = JSON.parse( localStorage.getItem( 'user' ) );
			getAnalytics();
	} );
}

$scope.visitsToday = null;
$scope.visitsWeek = null;
$scope.visitsMonth = null;
$scope.allTime = null;
$scope.countries = [];
function getAnalytics() {

	$scope.userDetails.stories.map ( story => {
		registerService.getAnalytics( story._id, story.shortUrl ).then( response => {
			$scope.visitsToday += parseInt( response.statistics.day.shortUrlClicks );
			$scope.visitsWeek += parseInt( response.statistics.week.shortUrlClicks );
			$scope.visitsMonth += parseInt( response.statistics.month.shortUrlClicks );
			$scope.allTime += parseInt( response.statistics.allTime.shortUrlClicks );
			if ( response.statistics.allTime.countries[ 0 ].id ) {
				$scope.countries.push( response.statistics.allTime.countries[ 0 ].id );
			}
		} );
	} );
}

$scope.deleteStory = ( storyId, index ) => {
	if ( storyId ) {
	writeService.deleteStory( storyId ).then( response => {
		if ( response ) {
			Materialize.toast( 'Your story was successfully deleted.', 2000 );
			$scope.userDetails.stories.splice( index, 1 );
		}
	} );
} else {
	Materialize.toast( 'Something went wrong. Please try again.', 2000 );
}
}

	$scope.editStory = ( storyId, index ) => {
		$state.go( 'write' );

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


});
