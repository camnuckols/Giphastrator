var passport = require('passport');
var Auth0Strategy = require('passport-auth0');
const config = require( './config/config' );

let strategy = new Auth0Strategy({
    domain:       config.domain,
    clientID:     config.clientID,
    clientSecret: config.clientSecret,
    callbackURL:  '/callback'
  }, function( accessToken, refreshToken, extraParams, profile, done ) {
    // extraParams.id_token has the JSON Web Token
    return done(null, profile);
  } );

passport.use( strategy );

passport.serializeUser( ( user, done ) => {
  done(null, user);
} );

passport.deserializeUser( ( user, done ) => {
  done( null, user );
} );

module.exports = strategy;
