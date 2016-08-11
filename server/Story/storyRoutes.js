const storyCtrl = require('./storyCtrl');
const userCtrl = require( '../User/userCtrl' );

module.exports = app => {


app.post( `/api/story`, storyCtrl.postStory );
app.post( '/api/giphy', storyCtrl.getGif );
app.post( '/api/story/favorites', storyCtrl.addToFavorites );
app.get( `/api/story/:id`, storyCtrl.getOneStory);
app.get( `/api/story`, storyCtrl.getStory );
app.put( '/api/story/:id', storyCtrl.editStory );
app.delete( '/api/story/:id', storyCtrl.deleteStory );

}
