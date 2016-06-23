const Story = require('./Story');

module.exports = {

  postStory( req, res ) {
    new Story( req.body ).save( ( err, story ) => {
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
    Story.findById( req.params.id )
         .populate( `User` )
         .exec(( err, populatedStory) => {
           if (err) {
             return res.status( 500 ).json( err );
           }
           return res.status( 200 ).json( populatedStory );
         })

}
}
