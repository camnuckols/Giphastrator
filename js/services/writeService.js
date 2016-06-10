angular.module('giphastrator')
.service('writeService', function($http) {
var baseUrl = "http://api.giphy.com/v1/gifs/translate?s=";

var searchTerm = "superman";
var userRating = "g";

this.getGif = function(searchTerm, userRating) {
  return $http({
    method: 'GET',
    url: baseUrl + searchTerm + "&api_key=dc6zaTOxFJmzC&rating=" + userRating
  });
}




// this.find = function() {
//   var first;
//   var second;
//   var words = write.split('');
//
//   for (var i = 0; i < words.length; i++) {
//     if (words[i] === '<') {
//       first = words[i];
//       if (words[i]) === '>') {
//         second = words[i];
//       }
//       words.splice(first, 10);
//     }
//
//       console.log(words);
//       return words;
//     }
//
// }

});
