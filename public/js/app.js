angular.module('giphastrator', [ 'ui.router', 'ngSanitize', '720kb.socialshare' ])
.constant('fb', {
  url: 'http://www.google.com'
})
.config(function($stateProvider, $urlRouterProvider) {
  $urlRouterProvider.otherwise('/');
  $stateProvider.state('home', {
    url: '/',
    templateUrl: './views/home.html'
  })
  .state('register', {
    url: '/register',
    templateUrl: './views/register.html',
    controller: 'registerCtrl'
  })
  .state('write', {
    url: '/write',
    templateUrl: './views/write.html',
    controller: 'writeController'
  })
  .state('customwrite', {
    url: '/write/:userId/story/:num',
    templateUrl: './views/userStory.html',
    controller: 'storyCtrl'
  })
  .state('login', {
    url: '/login',
    templateUrl: './views/login.html',
    controller: 'registerCtrl'
  })
  .state('dashboard', {
    url: '/dashboard',
    templateUrl: './views/dashboard.html',
    controller: 'dashboardController',
    data: { requiresLogin: true }
  })
  .state('storyBoard', {
    url: '/storyBoard',
    templateUrl: './views/storyBoard.html',
		controller: 'storyBoardCtrl'
  })

})
// .config( function myAppConfig (authProvider) {
//   //authProvider init configuration
//   authProvider.init({
//     domain: 'camnuckols.auth0.com',
//     clientID: '8g1IF7bcCaNDcfPwwm6jbY1DhSpfvqG9',
//     loginState: 'home'
// });
//
// authProvider.on('loginSuccess', ['$location', 'profilePromise', 'idToken', function( $location, profilePromise, idToken, store ) {
//   // Successfully log in
//   // Access to user profile and token
//   profilePromise.then( function( profile ) {
//     store.set( 'profile', profile );
//     store.set( 'token', idToken );
//   });
//   $location.url('/dashboard');
// }]);
//
// //Called when login fails
// authProvider.on('loginFailure', function() {
//   // If anything goes wrong
// });
//
// authProvider.on('authenticated', function() {
//   // if user is authenticated.
//   // Useful in re-authentication
// });




// })
// .run( ['$rootScope', 'auth', 'store', 'jwtHelper', '$location', function( $rootScope, auth, store, jwtHelper, $location ) {
//   // Listen to a location change event
//   $rootScope.$on( '$locationChangeStart', function() {
//     // Grab the user's token
//     var token = store.get('token');
//     // Check if token was actually stored
//     if ( token ) {
//       // Check if token is yet to expire
//       if ( !jwtHelper.isTokenExpired( token )) {
//         // Check if the user is not authenticated
//         if ( !auth.isAuthenticated ) {
//           // Re-authenticate with the user's profile
//           // Calls authProvider.on('authenticated')
//           auth.authenticate( store.get( 'profile' ), token );
//         }
//       } else {
//         // Either show the login page
//         // $location.path('/');
//         // .. or
//         // or use the refresh token to get a new idToken
//         auth.refreshIdToken( token );
//       }
//     }
//
//   })
// }])



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
