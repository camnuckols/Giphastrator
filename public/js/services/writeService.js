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

		if ( response.data.shortUrl ) {
			console.log( 'interesting things are happening');
			$state.go( 'customwrite', { userId: id, num: response.data._id } );
		}
		if ( response ) {
			let storyId = response.data._id;

		return $http({
			method: 'POST',
			url: 'https://www.googleapis.com/urlshortener/v1/url?key=AIzaSyBdPqa214IrabT8qxB18PXEHYGbXuSoBBk',
			data: {
				'longUrl': `http://localhost:8080/#/write/${ id }/story/${ storyId }`
			}
		}).then( response => {
			let shortUrl = response.data.id;
			return $http({
				method: 'PUT',
				url: `/api/story/${ storyId }`,
				data: {
					shortUrl
				}
			}).then( response => {

		stories.push( response.data._id );
		$state.go( 'customwrite', { userId: id, num: response.data._id } );
    // return response.config.data.words;

	} );
	} );

	} else {
		Materialize.toast( 'Something went wrong. Please try again.', 2000 );
	}
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
