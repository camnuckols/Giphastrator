angular.module( 'giphastrator' )
.factory( 'registerService', function( $http, $location ) {
	registerService = {};

			registerService.loggedIn = false;

			registerService.amIloggedIn = () => {
				return registerService.loggedIn;
			}

			// -------------------------------------------------- //
      // ----------------GET STORY ANALYTICS--------------- //
      // -------------------------------------------------- //

			registerService.getAnalytics = ( storyId, shortUrl ) => {
				return $http( {
					method: 'POST',
					url: `/api/userStory/${ storyId }`,
					data: {
						shortUrl: shortUrl
					}
				} ).then( response => {
					response.data = JSON.parse( response.data );

					return $http( {
						method: 'PUT',
						url: `/api/story/${ storyId }`,
						data: {
							statistics: response.data.analytics
						}
					} ).then( response => {
						return response.data;
					} );
				} );

			}

      // -------------------------------------------------- //
      // ----------GET CURRENT USER OR CREATE USER--------- //
      // -------------------------------------------------- //

      registerService.getCurrentOrCreateUser = () => {
        return $http({
          method: 'GET',
          url: '/api/user',
        }).then( response => {
					let user = {
						given_name: response.data.given_name,
						family_name: response.data.family_name,
						stories: response.data.stories,
						email: response.data.email
					};
					localStorage.setItem( 'user', JSON.stringify( user ) );
					registerService.loggedIn = true;
					return;
        });
      }

			// -------------------------------------------------- //
			// ---------------------LOG OUT---------------------- //
			// -------------------------------------------------- //

			registerService.logout = () => {
        localStorage.clear();
				return $http({
					method: 'GET',
					url: '/api/logout'
				}).then( response => {
					return $location.url( `/v2/logout?returnTo=localhost:8080/#/` );
				});
      }

      // -------------------------------------------------- //
      // --------------------CHECK USER-------------------- //
      // -------------------------------------------------- //

      registerService.checkUser = ( email ) => {
        return $http({
          method: 'GET',
          url: `/api/users/email/${ email }`
        }).then( response => {

          if ( response.data.length > 0 ) {
            return 'User';
          } else {
            return 'No user';
          }
        });
      }

      // -------------------------------------------------- //
      // --------------------CHECK USER-------------------- //
      // -------------------------------------------------- //

      registerService.findUserByEmail = ( email ) => {
        return $http({
          method: 'GET',
          url: `/api/users/email/${ email }`
        }).then( response => {
          return response.data[ 0 ];
        });
      }

			// -------------------------------------------------- //
      // --------------------OPEN OAUTH-------------------- //
      // -------------------------------------------------- //
			registerService.openLock = () => {
				return $http({
					method: 'GET',
					url: '/api/lock'
				}).then( response => {
					console.log( response, 'this is response' );
				})
			}


  return registerService;

});
