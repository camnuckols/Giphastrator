angular.module('giphastrator')
    .service('registerService', function($state, $timeout) {

        var users = [];
        var ref = new Firebase("https://giphastrators.firebaseio.com");

        function saveUser(email, password, firstName, lastName, username) {
            users.push({
                email: email,
                password: password,
                firstName: firstName,
                lastName: lastName,
                username: username
            });
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
                    $state.go('write');
                    console.log(userData);
                    console.log("Successfully created user account with uid:", userData.uid);
                }
                saveUser(email, password, firstName, lastName, username);
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
                    $state.go('write');

                    // This changes the log in and log out buttons appropriately
                    $('#login').hide();
                    $('#logout').removeClass('ng-hide');

                    console.log(userData);
                    console.log("Authenticated successfully with payload:", userData);
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


    });
