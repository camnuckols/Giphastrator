const Story = require( './Story' );
const User = require( '../User/User' );
const { giphyKey } = require( '../config/config' );
const http = require( 'http' );

module.exports = {

	getGif( req, res ) {
		http.get( `http://api.giphy.com/v1/gifs/translate?s=${ req.body.searchTerm }&api_key=${ giphyKey }&rating=${ req.body.userRating }`, function( response ) {
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

  postStory( req, res ) {
		let pictureUrl;

		if ( req.body.words[ 0 ] ) {
			pictureUrl = req.body.words[ 0 ].substring( req.body.words[ 0 ].lastIndexOf( '=' ) + 3, req.body.words[ 0 ].lastIndexOf( '/>' ) - 2);
		} else {
			pictureUrl = req.body.words[ 0 ][ 0 ].substring( req.body.words[ 0 ][ 0 ].lastIndexOf( '=' ) + 3, req.body.words[ 0 ][ 0 ].lastIndexOf( '/>' ) - 2);
		}

		console.log( req.body.words[ 0 ].substring( req.body.words[ 0 ].lastIndexOf( '=' ) + 3, req.body.words[ 0 ].lastIndexOf( '>' ) - 1), 'this the first');
		console.log( req.body.words[ 0 ][ 0 ].substring( req.body.words[ 0 ][ 0 ].lastIndexOf( '=' ) + 3, req.body.words[ 0 ][ 0 ].lastIndexOf( '>' ) - 1), 'this is second');
		const story = {
			title: req.body.title,
			story: req.body.words[ 0 ],
			author: req.body.id,
			picture: pictureUrl
		};
    new Story( story ).save( ( err, story ) => {
      if (err) {
        return res.status( 500 ).json( err );
      }
			User.findByIdAndUpdate( req.body.id, { $push: { stories: story } }, ( err, user ) => {
	      return res.status( 201 ).json( story );
			} );
    });
  },

  getStory( req, res ) {
    Story.find( {}, ( err, stories ) => {
      if ( err ) {
        return res.status( 500 ).json( err );
      }
      return res.status( 200 ).json( stories );
    });
  },

  getOneStory( req, res ) {
    Story.findById( req.params.id )
		.populate( 'author' ).exec( ( err, story ) => {
           if ( err ) {
             return res.status( 500 ).json( err );
           }
           return res.status( 200 ).json( story );
         });
			 },

	editStory( req, res ) {
		Story.findByIdAndUpdate( req.params.id, req.body, ( err, story ) => {
			if ( err ) {
			    return res.status( 500 ).json( err );
			}
			return res.status( 200 ).json( story );
		} );
	},

	deleteStory( req, res ) {
		Story.findByIdAndRemove( req.params.id, ( err, deletedStory ) => {
			if ( err ) {
			    return res.status( 500 ).json( err );
			} return res.status( 200 ).json( deletedStory );
		} );
	}

}
