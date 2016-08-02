angular.module('giphastrator')
.controller('dashboardController', function( $scope, registerService, $timeout ) {

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

function getAnalytics() {
	$scope.userDetails.stories.map ( story => {
		registerService.getAnalytics( story._id, story.shortUrl );
	} );
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
