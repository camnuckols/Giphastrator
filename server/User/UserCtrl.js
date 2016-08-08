const User = require('./User');
const { googleKey, domain, clientID } = require ( '../config/config' );
const https = require( 'https' );
const request = require( 'request' );
// const Auth0Lock = require( 'auth0-lock' );

module.exports = {

getUser ( req, res ) {
  User.findById( req.params.id )
      .populate( `stories` )
      .exec( ( err, user ) => {
        if ( err ) {
          return res.status( 500 ).json( err );
        }
        return res.status( 200 ).json( user );
      });
},

getAllUsers ( req, res ) {
  User.find( {} )
	.populate( 'stories' ).exec( ( err, allUsers ) => {
    if ( err ) {
      return res.status( 500 ).json( err );
    }
    return res.status( 200 ).json( allUsers );
  });
},

createUser ( req, res ) {
  new User( req.body ).save(( err, user ) => {
    if ( err ) {
      return res.status( 500 ).json( err );
    }
    return res.status( 201 ).json( user );
  });
},

getUserByEmail ( req, res ) {
  User.find( { email: req.params.email })
  .populate( 'stories' )
  .exec(( err, user ) => {
    if ( err ) {
        return res.status( 500 ).json( err );
    } return res.status( 200 ).json( user );
  });
},

getAuth( req, res ) {

	if ( !req.user ) {
		throw new Error('user null');
	}
	res.redirect("/#/dashboard");
},

getAuthUser( req, res ) {
	User.findOne( { email: req.user._json.email }, ( err, user ) => {
		if ( user ) {
			User.findById( user._id )
			.populate( 'stories' )
			.exec( ( error, currentUser ) => {
				if ( error ) {
					return res.status( 500 ).json( error );
				} return res.status( 200 ).json( currentUser );
			} );
		} else if ( err ) {
			return res.status( 500 ).json( err );
		} else {
			console.log( req.body, 'this is req.body userCtrl line 65' );
			new User( {
				given_name: req.user._json.given_name,
				family_name: req.user._json.family_name,
				email: req.user._json.email,
				id: req.user._id
			} ).save( ( errs, newUser ) => {
				if ( errs ) {
					return res.status( 500 ).json( errs );
				} return res.status( 200 ).json( newUser );
			} );
		}
	} );
},

logout( req, res ) {
  req.logout();
	console.log( 'You are logged out. line 54 userCtrl');
  res.redirect( '/#/' );
},

getStats( req, res ) {
	console.log( req.body, googleKey);
	https.get( `https://www.googleapis.com/urlshortener/v1/url?shortUrl=${ req.body.shortUrl }&projection=FULL&key=${ googleKey }`, function( response ) {
		let str = '';
			response.on( 'data', function( data ) {
				str += data;
			} );
			response.on( 'end', function() {
				return res.status( 200 ).json( str )
			} );
			response.on( 'error', function( err ) {
				return res.status( 400 ).json( err );
			} );
	} );
},

getShortUrl( req, res ) {
	options = {
		uri: `https://www.googleapis.com/urlshortener/v1/url?key=${ googleKey }`,
		method: 'POST',
		json: {
			'longUrl': `http://localhost:8080/#/write/${ req.body.id }/story/${ req.body.storyId }`
		}
	};
	request( options, function( error, response, body ) {
				 if ( !error && response.statusCode == 200 ) {
					 return res.status( 200 ).json( body );
			 } else {
				 return res.status( 400 ).json( error );
			 }


 });
},

openLock( req, res ) {
	console.log( req.body, 'this is req.body' );
	let lock = new Auth0Lock( clientID, domain, {
		auth: {
			redirectUrl: 'http://localhost:8080/callback',
			responseType: 'code',
			params: {
				scope: 'openid email' // Learn about scopes: https://auth0.com/docs/scopes
			}
		},
		theme: {
			logo: './img/giphastrator-logo.png',
			primaryColor: 'black'
		},
		socialButtonStyle: 'small'
	});

		lock.show();

}

}
