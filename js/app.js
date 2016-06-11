angular.module('giphastrator', ['ui.router', 'firebase', 'ngSanitize'])
.constant('fb', {
  url: 'http://www.google.com'
})
.config(function($stateProvider, $urlRouterProvider) {
  $urlRouterProvider.otherwise('/home');
  $stateProvider.state('/home', {
    url: '/home',
    templateUrl: './views/home.html'
  })
  .state('register', {
    url: '/register',
    templateUrl: './views/register.html',
    controller: 'registerController'
  })
  .state('write', {
    url: '/write',
    templateUrl: './views/write.html',
    controller: 'writeController'
  })
  .state('login', {
    url: '/login',
    templateUrl: './views/login.html',
    controller: 'registerController'
  })

})


//
// $scope.$watch('write', function(write) {
//   if (write) {
//   var words = write.split('');
//     for (var i = 0; i < words.length; i++) {
//       if (words[i] === "<") {
//
//         for (var j = 0; j < words.length; j++) {
//         if (words[j] === ">") {
//           var ourWord = words.splice(i + 1, j - i - 1).join('');
//           console.log(ourWord);
//           writeService.getGif(ourWord, "g").then(function(response) {
//
//             $scope.gif = response.data.data.images.downsized_medium.url;
//           });
//           //This deletes the word that we just used to find a gif.
//           $scope.write = $scope.write.slice(0, $scope.write.length - ourWord.length - 2);
//           $scope.gifWrite = $scope.write;
//
//           $scope.data.push($scope.write);
//           $scope.data.push($scope.gif);
//           console.log($scope.data);
//         //  $scope.write = $scope.write.slice(i);
//           console.log($scope.write);
//         } // When I coded this part, I was listening to 'The Longest Time' by Billy Joel. It must have inspired me.
//       }
//     }
//   }
// }
// });
