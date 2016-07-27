angular.module('giphastrator')
    .controller('navbarCtrl', function( $scope, auth, store, registerService, $timeout ) {

        $scope.mobileMenu = () => {
            setTimeout(function() {
                $(".dropdown-button").dropdown();
            }, 0);
        }
        $scope.mobileMenu();

        $scope.login = () => {
            auth.signin({
                popup: true,
                icon: './img/giphastrator-logo.png',
                callbackUrl: '/'
            }, function(profile, token) {

                store.set('profile', profile);
                store.set('token', token);

                registerService.checkUser( profile.email ).then(response => {

                    if (response !== 'User') {

                        // EMAIL LOG IN
                        if (profile.user_id.slice(0, 4) === 'auth') {

                            registerService.createEmailUser(profile.email, profile.picture, profile.user_id).then(response => {

                                $scope.userDetails = response;
                            });

                            // GOOGLE LOG IN
                        } else if (profile.user_id.slice(0, 4) === 'goog') {

                            registerService.createGoogleOrFacebookUser(profile.given_name, profile.family_name, profile.email, profile.picture,
                                profile.user_id).then(response => {

                                $scope.userDetails = response;
                            });

                            // FACEBOOK LOG IN
                        } else if (profile.user_id.slice(0, 4) === 'face') {

                            registerService.createGoogleOrFacebookUser(profile.given_name, profile.family_name, profile.email, profile.picture_large,
                                profile.user_id).then(response => {

                                $scope.userDetails = response;
                            });
                        }
                    } else {

                        registerService.findUserByEmail(profile.email).then(response => {

                            $scope.userDetails = response;
                        });
                    }
                });

								$timeout( function() {
	                $scope.userIsLoggedIn = true;
								} );

            }, function(err) {
                Materialize.toast(err, 2000);
            });
        }



    });
