angular.module('giphastrator')
.controller('writeController', function($scope, writeService) {

var wordsLength = 2;
$scope.tag = [];

$scope.$watch('userInput', function(userInput, userSymbol) {
      if (userInput) {

        //Here I am setting the user symbol that they can use to create GIF's. By default it will be a dash /.

        if ($scope.id) {
          userSymbol = $scope.id;
        } else {
          userSymbol = '/';
        }

        //I am splitting apart the words that the user types by whatever the user symbol is.
        //This will separate them into an array.

        var words = userInput.split(userSymbol);

        //  We are going to loop through the words array to find the GIF's. We are only grabbing odd values (with this feature
        //  the user will have to have input between GIF's because it will only grab every other GIF).

        if (words.length > wordsLength) {
          var input = words[words.length - 2];
          $scope.tag.push(input);

            writeService.getGif(input, 'g').then(function(response) {
              $scope.gif = response.data.data.images.downsized.url;
              console.log(words);

              words = words.slice(words.length -3, words.length -1);

              console.log(words);
              $scope.words += words.join(' ') + '<img class = "gif" src = "' + response.data.data.images.downsized.url + '">';
            });
          wordsLength += 2;
        }
     }
  })
});

//***********************************************************************************************************************


   // $scope.getGif = function(userInput, userRating) {
   //   writeService.getGif(userInput, userRating).then(function(response) {
   //     console.log(response.data.data.images);
   //     $scope.gif = response.data.data.images.downsized_medium.url;
   //   });
   // }
   //$scope.power = [];

         // for (var i = 0; i < words.length; i++) {
         //   if (words[i][0] === userSymbol && words[i][words[i].length - 1] === "/") {
         //     console.log(words[i].indexOf(userInput));
         //     //Finds the word in userInput word from the array and cuts off the symbols from both sides
         //     userInput = words[i].slice(1, -1);
         //
         //     //Takes the dashes out of the user's view of whatever it is they are typing.
         //     words[i] = words[i].slice(1, -1);
         //     console.log(words);
         //     $scope.sentence = words.join(' ');
         //     console.log(userInput);

             // $scope.input = writeService.searchWritingForGif(userInput, userSymbol);
             // console.log($scope.input);

   // words[i].slice(1, -1) +
             // if (words[i].indexOf(userInput) === -1) {



             //   $scope.power.push('<img src = "' + response.data.data.images.downsized.url + '"> ');
//***********************************************************************************************************************

  // if (userInput) {
  // var words = write.split(' ');
  // console.log(words);
  // for (var i = 0; i < words.length; i++) {
  //   console.log(words[i][i] === userSymbol);
  //   if (words[i][i] === userSymbol) {
  //
  //   }
// });


    // for (var i = 0; i < words.length; i++) {
    //   if (words[i] === "<") {
    //
    //     for (var j = 0; j < words.length; j++) {
    //     if (words[j] === ">") {
    //       var ourWord = words.splice(i + 1, j - i - 1).join('');
    //       console.log(ourWord);
//           writeService.getGif(ourWord, "g").then(function(response) {
//
//             $scope.gif = response.data.data.images.downsized_medium.url;
//           });
//           //This deletes the word that we just used to find a gif.
//           $scope.write = $scope.write.slice(0, $scope.write.length - ourWord.length - 2);
//
//           $scope.gifWrite = $scope.write;
//
//         } // When I coded this part, I was listening to 'The Longest Time' by Billy Joel. It must have inspired me.
//       }
//     }
//   }
// }
// });


  //
  // $scope.$watch('write', function(write) {
  //   writeService.find(write);
  //
  // });
