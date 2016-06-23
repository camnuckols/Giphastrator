const express = require('express');
const { json } = require('body-parser');
const mongoose = require('mongoose');
const masterRoutes = require('./server/masterRoutes');

const app = express();
const port = 8080;

app.use( express.static( __dirname + "/../public" ) );
app.use( json() );

masterRoutes( app );

const mongoUri = 'mongodb://localhost:27017/giphastrator';
mongoose.connect(mongoUri);
mongoose.connection.once( `open`, () => {
  console.log( `Connected to Mongo at ${mongoUri}`);
})

app.listen( port, () => {
  console.log(`Express is listening on port ${port}`);
});
