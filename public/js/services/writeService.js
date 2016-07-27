angular.module('giphastrator')
.service('writeService', function( $http, registerService, $state ) {
const baseUrl = "http://api.giphy.com/v1/gifs/translate?s=";
const stories = [];

this.getGif = function(searchTerm, userRating) {
  return $http({
    method: 'GET',
    url: baseUrl + searchTerm + "&api_key=dc6zaTOxFJmzC&rating=" + userRating
  });
}


this.getStory = function() {
	let id = stories[ stories.length - 1 ];
	if ( !id ) {
		return $http({
		method: 'GET'// MY NEXT PLANS ARE TO DO A GET REQUEST TO GET THE USER SO THAT YOU CAN JUST GO TO THE LINK SO THAT IT WILL OPEN UP
	})
	}
	  return $http({
	    method: `GET`,
	    url: `/api/story/${ id }`
	  }).then( response => {
		    return response.data;
	  });
	}
	// else {
	// 	let deferred = $q.defer();
	// 	deferred.resolve( stories );
	// 	return deferred.promise;


this.addStory = function( words, title, id ) {

  return $http({
    method: `POST`,
    url: `/api/story`,
    data: {
			words,
			title,
			id
		}
  }).then( response => {
		stories.push( response.data._id );
		$state.go( 'customwrite', { userId: id, num: 3 } );
    // return response.config.data.words;
  });
};

});
