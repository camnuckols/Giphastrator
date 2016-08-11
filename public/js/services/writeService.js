angular.module('giphastrator')
.service('writeService', function( $http, registerService, $state, $stateParams ) {

const stories = [];

this.getGif = function( searchTerm, userRating ) {
	searchTerm = searchTerm.split( ' ' ).join( '+' );
  return $http({
    method: 'POST',
    url: '/api/giphy',
		data: {
			searchTerm,
			userRating
		}
  } ).then( response => {
		return response.data;
	} );
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

this.getStories = function() {
	return $http({
		method: 'GET',
		url: '/api/story'
	} ).then( response => {
		return response.data;
	} );
}

this.addToFavorites = function( storyId ) {
	return $http({
		method: 'POST',
		url: '/api/story/favorites',
		data: {
			storyId
		}
	}).then( response => {
		return response.data;
	} );
}

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
			url: '/api/shortUrl',
			data: {
				id,
				storyId
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

this.deleteStory = function( storyId ) {
	return $http({
		method: 'DELETE',
		url: `/api/story/${ storyId }`
	}).then( response => {
		return response.data;
	} );
}

});
