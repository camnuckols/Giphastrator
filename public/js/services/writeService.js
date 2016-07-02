angular.module('giphastrator')
.service('writeService', function($http, registerService) {
var baseUrl = "http://api.giphy.com/v1/gifs/translate?s=";

this.getGif = function(searchTerm, userRating) {
  return $http({
    method: 'GET',
    url: baseUrl + searchTerm + "&api_key=dc6zaTOxFJmzC&rating=" + userRating
  });
}

this.addStory = function( words ) {
  return $http({
    method: `POST`,
    url: `/api/story`,
    data: { words }
  }).then( response => {
    return response.config.data.words;
  });
}

this.getStory = function() {
  return $http({
    method: `GET`,
    url: `/api/story`
  }).then( response => {
    return response.data;
  });
}

});
