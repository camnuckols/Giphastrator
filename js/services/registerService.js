angular.module('giphastrator')
    .service('registerService', function($state, $timeout) {

        var users = [];
        var userDataArray = [];
        var ref = new Firebase("https://giphastrators.firebaseio.com");

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
                    console.log(userData);
                    saveUser(email, password, firstName, lastName, username, userData);
                    console.log("Successfully created user account with uid:", userData.uid);
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
                    currentUser = userData;
                    console.log(currentUser, 'loooool')
                    $state.go('dashboard');

                    // This changes the log in and log out buttons appropriately
                    $('#login').hide();
                    $('#logout').removeClass('ng-hide');

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

        this.loginPopup = function() {
            ref.authWithOAuthPopup("facebook", function(error, authData) {
                if (error) {
                    console.log("Login Failed!", error);
                    $timeout(function() {
                        Materialize.toast('Whoops, something went wrong. Please try again!', 3000);
                    }, 500);
                } else {
                    console.log("Authenticated successfully with payload:", authData);
                    $timeout(function() {
                        Materialize.toast('Welcome to Giphastrator, ' + firstName + '!', 3000);
                    }, 500);
                }
            });
        }


    //   GOOGLE SIGN UPS
    //****************************************************************************************************************************************

this.googleLoginPopup = function() {
  ref.authWithOAuthPopup("google", function(error, authData) {
  if (error) {
    console.log("Login Failed!", error);
    $timeout(function() {
        Materialize.toast('Whoops, something went wrong. Please try again!', 3000);
    }, 500);
  } else {
    console.log("Authenticated successfully with payload:", authData);
    $timeout(function() {
        Materialize.toast('Welcome to Giphastrator, ' + firstName + '!', 3000);
    }, 500);
  }
});
}


    });
