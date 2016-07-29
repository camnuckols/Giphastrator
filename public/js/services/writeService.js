angular.module('giphastrator')
.service('writeService', function( $http, registerService, $state, $stateParams ) {
const baseUrl = "http://api.giphy.com/v1/gifs/translate?s=";
const stories = [];

this.getGif = function( searchTerm, userRating ) {
	searchTerm = searchTerm.split( ' ' ).join( '+' );
  return $http({
    method: 'GET',
    url: baseUrl + searchTerm + "&api_key=dc6zaTOxFJmzC&rating=" + userRating
  });
}


this.getStory = function() {
	let id = stories[ stories.length - 1 ];
	if ( !id ) {
		return $http({
		method: 'GET',
		url: `/api/story/${ $stateParams.num }`
	} ).then( response => {
		return response.data;
	} );
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
		$state.go( 'customwrite', { userId: id, num: response.data._id } );
    // return response.config.data.words;
  });
};

this.getAuthor = function( id ) {
	return $http( {
		method: 'GET',
		url: `/api/user/${ id }`
	} ).then( response => {
		return response.data;
	} );
}

});
