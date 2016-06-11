angular.module('giphastrator')
    .service('registerService', function($state, $timeout) {

        var users = [];

         function saveUser(email, password, firstName, lastName, username) {
           users.push({email: email, password: password, firstName: firstName, lastName: lastName, username: username});
        }

        this.registerUser = function(email, password, firstName, lastName, username) {
            var ref = new Firebase("https://giphastrators.firebaseio.com");
            ref.createUser({
                email: email,
                password: password
            }, function(error, userData) {
                if (error) {
                  $timeout( function() {
                   Materialize.toast( 'Whoops, something went wrong. Please try again!', 3000 );
                    }, 500 );

                    console.log("Error creating user:", error);
                } else {
                  $timeout( function() {
                    Materialize.toast( 'Welcome to Giphastrator, ' + firstName + lastName + '!', 3000 );
                }, 500 );
                $state.go( 'write' );
                console.log( userData );
                    console.log("Successfully created user account with uid:", userData.uid);
                }
                saveUser(email, password, firstName, lastName, username);
            });
        }



    });
