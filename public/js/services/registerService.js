angular.module('giphastrator')
    .service('registerService', function ($state, $timeout) {

        let users = [];
        let userDataArray = [];
        const ref = new Firebase("https://giphastrators.firebaseio.com");

        function saveUserToArray(userData) {
            userDataArray.push(userData);
        }

        this.getUserDataArray = function() {
            return userDataArray;
        }

        function saveUser(email, password, firstName, lastName, username, userData) {
            users.push({
                email: email,
                password: password,
                firstName: firstName,
                lastName: lastName,
                username: username,
                userData: userData
            });
        }

        this.getUsers = function() {
            return users;
        }

        this.registerUser = function(email, password, firstName, lastName, username) {
            ref.createUser({
                email: email,
                password: password
            }, function(error, userData) {
                if (error) {
                    $timeout(function() {
                        Materialize.toast('Whoops, something went wrong. Please try again!', 3000);
                    }, 500);

                    console.log("Error creating user:", error);
                } else {
                    $timeout(function() {
                        Materialize.toast('Welcome to Giphastrator, ' + firstName + '!', 3000);
                    }, 500);
                    $state.go('dashboard');
                    // saveUser(email, password, firstName, lastName, username, userData);


                    // This changes the log in and log out buttons appropriately
                    $('#login').hide();
                    $('#register').hide();
                    $('#logout').removeClass('ng-hide');
                    $('#dashboard').removeClass('ng-hide');
                    let isNewUser = true;

                    ref.onAuth(function(userData) {
                        if (userData && isNewUser) {

                            // save the user's profile into the database

                            ref.child("users").child(userData.uid).push({
                                provider: userData.provider,
                                name: getName(userData),
                                firstName: getFirstName(userData),
                                id: getId(userData),
                                picture: getPicture(userData)
                            });
                        }
                    });
                }
            });
        }

        this.signIn = function(email, password) {
            ref.authWithPassword({
                email: email,
                password: password
            }, function(error, userData) {
                if (error) {
                    $timeout(function() {
                        Materialize.toast('Whoops, something went wrong. Please try again!', 3000);
                    }, 500);
                    console.log("Login Failed!", error);

                } else {

                    $timeout(function() {
                        Materialize.toast('Welcome back!', 3000);
                    }, 500);

                    $state.go('dashboard');

                    // This changes the log in and log out buttons appropriately
                    $('#login').hide();
                    $('#register').hide();
                    $('#logout').removeClass('ng-hide');
                    $('#dashboard').removeClass('ng-hide');

                    saveUserToArray(userData);
                }
            });
        }

        this.logOut = function() {

            ref.unauth();
            $timeout(function() {
                Materialize.toast('Hasta luego!', 3000);
            }, 500);

            //Changes back the log in and log out buttons
            $('#logout').addClass('ng-hide');
            $('#register').show();
            $('#dashboard').addClass('ng-hide');
            $('#login').show();

        }

        this.changeEmail = function(newEmail, password) {
            ref.changeEmail({
                oldEmail: "bobtony@firebase.com",
                newEmail: newEmail,
                password: password
            }, function(error) {
                if (error === null) {
                    console.log("Email changed successfully");
                    Materialize.toast('Email changed successfully', 3000);

                } else {
                    console.log("Error changing email:", error);
                    Materialize.toast("Error changing email:", error, 3000);
                }
            });
        }

        //   FACEBOOK SIGN UPS
        //****************************************************************************************************************************************

        this.loginPopup = () => {
            ref.authWithOAuthPopup("facebook", function(error, authData) {
                if (error) {
                    console.log("Login Failed!", error);
                    $timeout(function() {
                        Materialize.toast('Whoops, something went wrong. Please try again!', 3000);
                    }, 500);
                } else {
                    $timeout(function() {
                        Materialize.toast('Welcome to Giphastrator, ' + authData.facebook.cachedUserProfile.first_name + '!', 3000);
                    }, 500);

                    $state.go('dashboard');

                    // This changes the log in and log out buttons appropriately
                    $('#login').hide();
                    $('#register').hide();
                    $('#dashboard').removeClass('ng-hide');
                    $('#logout').removeClass('ng-hide');

                    let isNewUser = true;

                    ref.onAuth(function(authData) {
                        if (authData && isNewUser) {

                            // save the user's profile into the database

                            ref.child("users").child(authData.uid).push({
                                provider: authData.provider,
                                name: getName(authData),
                                firstName: getFirstName(authData),
                                id: getId(authData),
                                picture: getPicture(authData)
                            });
                        }
                    });
                }
            });
        }





        function getName(authData) {
            switch (authData.provider) {
                case 'password':
                    return authData.password.email.replace(/@.*/, '');
                case 'twitter':
                    return authData.twitter.displayName;
                case 'facebook':
                    return authData.facebook.displayName;
                case 'google':
                    return authData.google.displayName;
            }
        }

        function getId(authData) {
            switch (authData.provider) {
                case 'password':
                    return authData.uid;
                case 'google':
                    return authData.google.id;
                case 'facebook':
                    return authData.facebook.id;
                case 'twitter':
                    return authData.twitter.id;
            }
        }

        function getPicture(authData) {
            switch (authData.provider) {
                case 'password':
                    return authData.password.profileImageURL;
                case 'google':
                    return authData.google.cachedUserProfile.picture;
                case 'facebook':
                    return authData.facebook.profileImageURL;
                case 'twitter':
                    return authData.twitter.profileImageURL;
            }
        }

        function getFirstName(authData) {
            switch (authData.provider) {
                case 'password':
                    return authData.password.email.replace(/@.*/, '');
                case 'google':
                    return authData.google.cachedUserProfile.given_name;
                case 'facebook':
                    return authData.facebook.cachedUserProfile.first_name;
                case 'twitter':
                    return authData.twitter.displayName;
            }
        }
        //   GOOGLE SIGN UPS
        //****************************************************************************************************************************************

        this.googleLoginPopup = () => {
                ref.authWithOAuthPopup("google", function(error, authData) {
                    if (error) {
                        console.log("Login Failed!", error);
                        $timeout(function() {
                            Materialize.toast('Whoops, something went wrong. Please try again!', 3000);
                        }, 500);
                    } else {
                        $timeout(function() {
                            Materialize.toast('Welcome to Giphastrator, ' + authData.google.cachedUserProfile.given_name + '!', 3000);
                        }, 500);
                        $state.go('dashboard');

                        // This changes the log in and log out buttons appropriately
                        $('#login').hide();
                        $('#register').hide();
                        $('#logout').removeClass('ng-hide');
                        $('#dashboard').removeClass('ng-hide');


                        let isNewUser = true;

                        ref.onAuth(function(authData) {
                            if (authData && isNewUser) {

                                // save the user's profile into the database

                                ref.child("users").child(authData.uid).push({
                                    provider: authData.provider,
                                    name: getName(authData),
                                    firstName: getFirstName(authData),
                                    id: getId(authData),
                                    picture: getPicture(authData)
                                });
                            }
                        });
                    }
                });
            }
            //TWITTER SIGN-UP
            //****************************************************************************************************************************************

        this.twitterLoginPopup = () => {

            ref.authWithOAuthPopup("twitter", function(error, authData) {
                if (error) {
                    console.log("Login Failed!", error);
                    $timeout(function() {
                        Materialize.toast('Whoops, something went wrong. Please try again!', 3000);
                    }, 500);
                } else {
                    $timeout(function() {
                        Materialize.toast('Welcome to Giphastrator, ' + authData.twitter.displayName + '!', 3000);
                    }, 500);
                    $state.go('dashboard');

                    // This changes the log in and log out buttons appropriately
                    $('#login').hide();
                    $('#register').hide();
                    $('#logout').removeClass('ng-hide');
                    $('#dashboard').removeClass('ng-hide');


                    let isNewUser = true;

                    ref.onAuth(function(authData) {
                        if (authData && isNewUser) {

                            // save the user's profile into the database

                            ref.child("users").child(authData.uid).push({
                                provider: authData.provider,
                                name: getName(authData),
                                firstName: getFirstName(authData),
                                id: getId(authData),
                                picture: getPicture(authData)
                            });
                        }
                    });
                }
            });
        }
});
