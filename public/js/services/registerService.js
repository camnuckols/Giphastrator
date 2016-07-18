angular.module( 'giphastrator' )
.factory( 'registerService', function( $http ) {
  registerService = {};

  registerService.logOut = () => {

  }

  registerService.getUserDataArray = () => {

  }

      // -------------------------------------------------- //
      // -----------------CREATE EMAIL USER---------------- //
      // -------------------------------------------------- //

      registerService.createEmailUser = ( email, picture, authId ) => {
        return $http({
          method: 'POST',
          url: '/api/user',
          data: {
            email: email,
            picture: picture,
            id: authId
          }
        }).then( response => {
          return response.data;
        });
      }

      // -------------------------------------------------- //
      // -----------------CREATE GOOGLE USER--------------- //
      // -------------------------------------------------- //

      registerService.createGoogleOrFacebookUser = ( fname, lname, email, picture, authId ) => {
        return $http({
          method: 'POST',
          url: '/api/user',
          data: {
            fname: fname,
            lname: lname,
            email: email,
            picture: picture,
            id: authId
          }
        }).then( response => {
          return response.data;
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


  return registerService;

});
