const express = require( 'express' );
const { json } = require( 'body-parser' );
const mongoose = require( 'mongoose' );
const masterRoutes = require('./server/masterRoutes' );
const { mongo } = require( './server/config/config' );
const passport = require( 'passport' );
const strategy = require( './server/setup-passport' );
const cookieParser = require( 'cookie-parser' );
const session = require( 'express-session' );
const key = require( './server/config/config' );

const app = express();
const port = 8080;

app.use(cookieParser());
app.use(session({ secret: key.clientSecret, resave: false,  saveUninitialized: false }));
app.use(passport.initialize());
app.use(passport.session());

app.use( express.static( __dirname + "/public" ) );
app.use( json() );

masterRoutes( app );

const mongoUri = mongo;
mongoose.connect( mongoUri );
mongoose.connection.once( `open`, () => {
  console.log( `Connected to Mongo at ${ mongoUri }`);
});

app.listen( port, () => {
  console.log(`Express is listening on port ${ port }`);
});
// 
// import Auth0Lock from 'auth0-lock';
//
// const cid = "yKJO1ckwuY1X8gPEhTRfhJXyObfiLxih";
// const domain = "mdocs.auth0.com";
//
// const lock = new Auth0Lock(cid, domain);
//
// lock.show();
