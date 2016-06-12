angular.module('giphastrator')
.service('writeService', function($http, registerService) {
var baseUrl = "http://api.giphy.com/v1/gifs/translate?s=";

this.getGif = function(searchTerm, userRating) {
  return $http({
    method: 'GET',
    url: baseUrl + searchTerm + "&api_key=dc6zaTOxFJmzC&rating=" + userRating
  });
}

//***********************************************************************************************************************


// this.searchWritingForGif = function(userInput, userSymbol) {
//   var userSymbol = "/";
//     if (userInput) {
//     var words = userInput.split(' ');
//     for (var i = 0; i < words.length; i++) {
//       if (words[i][0] === userSymbol && words[i][words[i].length - 1] === "/") {
//         //Finds the word in userInput word from the array and cuts off the symbols from both sides
//         userInput = words[i].slice(1, -1);
//         console.log(userInput);
//         return userInput;
//       }
//     }
//   }
// };


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
