angular.module(`giphastrator`)
.controller(`writeController`, function($scope, writeService, $interval, registerService) {

new Clipboard('.clipboard-button');
let wordsLength = 2;
$scope.tag = [];

//Send the data to FireBase
$scope.sendUserDataToFB = () => {
  writeService.sendUserDataToFB($scope.words);
}

$scope.$watch(`userInput`, (userInput, userSymbol) => {
      if (userInput) {

$scope.clearBoard = () => {
  $scope.words = ``;
  $scope.userInput = ``;
  $scope.tag = [];
  wordsLength = 2;
}
        //Here I am setting the user symbol that they can use to create GIF`s. By default it will be a dash /.

        if ($scope.id) {
          userSymbol = $scope.id;
        } else {
          userSymbol = `/`;
        }

        // This sets the rating of the GIF depending on what the user selects. The default is G.

        let rating;
        if ($scope.rating) {
          rating = $scope.rating;
        } else {
          rating = `g`;
        }

        // This sets the text size of the text that the user will see. The default is 24px if the user doesn`t change it.

        let textSize;
        if ($scope.textSize) {
          textSize = $scope.textSize;
          $(`#textOnMainPage`).css(`font-size`, textSize + `px`);
        } else {
          textSize = 24;
          $(`#textOnMainPage`).css(`font-size`, textSize + `px`);
        }

        //This sets the GIF size that the user will see. The default is 125px if the user doesn`t change it.
        let gifSize;
        if ($scope.gifSize) {
          gifSize = $scope.gifSize;
          $(`.gif`).css(`height`, gifSize + `px`);
        } else {
          gifSize = 125;
          $(`.gif`).css(`height`, gifSize + `px`);
        }
        //I am splitting apart the words that the user types by whatever the user symbol is.
        //This will separate them into an array.

        let words = userInput.split(userSymbol);

        //  We are going to loop through the words array to find the GIF`s. We are only grabbing odd values (with this feature
        //  the user will have to have input between GIF`s because it will only grab every other GIF).

        if (words.length > wordsLength) {
          let input = words[words.length - 2];

          //I create the tag here that goes out on the screen for the user to delete the GIF`s if they please.
          $scope.tag.push(input);

            writeService.getGif(input, rating).then((response) => {

              //This grabs the Gif from the Giffy API
              $scope.gif = response.data.data.images.downsized.url;

              words = words.slice(words.length -3, words.length -1);

              $scope.words +=  ` ${words.join(` `)} <img class = "gif" src = "${response.data.data.images.downsized.url}">`;

              //This check solves the problem that I was having with the undefined value.
              //It clears it from the front of the array. I`m not 100% sure what is causing
              //it to be undefined in the first place.

              if ($scope.words[0] === `u` && $scope.words[1] === `n`) {
              $scope.words = $scope.words.split(`undefined`).slice(1);
              }

            });
          wordsLength += 2;
        }
     }
  })


$scope.deleteGif = (gifName) => {
  try {
  let gif;
//gif = $scope.words.split(/(gifName)/);

    gif = $scope.words.replace(/<img[^>]*>/,``);
  //  gif = $scope.words.split(`<`);
   $scope.words = gif;
 } catch (err) {
   if (Error.name === `TypeError` || Error.name === `ReferenceError` || Error.name === `Error`) {
     // Materialize.toast(message, displayLength, className, completeCallback);
     Materialize.toast(`You can't delete a GIF unless you have more than one GIF`, 3000); //3000 is the duration of the toast
   }
 }
  }
});

//***********************************************************************************************************************
