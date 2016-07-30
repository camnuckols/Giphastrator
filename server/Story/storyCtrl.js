const Story = require('./Story');

module.exports = {

  postStory( req, res ) {
		console.log( req.body, 'this is req.body ');
		const story = {
			title: req.body.title,
			story: req.body.words[ 0 ],
			author: req.body.id
		};
    new Story( story ).save( ( err, story ) => {
      if (err) {
        return res.status( 500 ).json( err );
      }
      return res.status( 201 ).json( story );
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
    Story.findById( req.params.id, ( err, story ) => {
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
	}
}
