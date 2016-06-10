angular.module('giphastrator')
.controller('writeController', function($scope, writeService) {

$scope.getGif = function(write, userRating) {
  writeService.getGif(write, userRating).then(function(response) {
    console.log(response.data.data.images);
    $scope.gif = response.data.data.images.downsized_medium.url;
  });
}

$scope.$watch('write', function(write) {
  if (write) {
  var words = write.split('');
    for (var i = 0; i < words.length; i++) {
      if (words[i] === "<") {

        for (var j = 0; j < words.length; j++) {
        if (words[j] === ">") {
          var ourWord = words.splice(i + 1, j - i - 1).join('');
          console.log(ourWord);
          writeService.getGif(ourWord, "g").then(function(response) {

            $scope.gif = response.data.data.images.downsized_medium.url;
          });
          //This deletes the word that we just used to find a gif.
          $scope.write = $scope.write.slice(0, $scope.write.length - ourWord.length - 2);

          $scope.gifWrite = $scope.write;

        } // When I coded this part, I was listening to 'The Longest Time' by Billy Joel. It must have inspired me.
      }
    }
  }
}
});


  //
  // $scope.$watch('write', function(write) {
  //   writeService.find(write);
  //
  // });

});
