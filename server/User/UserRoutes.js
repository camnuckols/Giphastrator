const userCtrl = require('./userCtrl');

module.exports = app => {

app.get( `/api/user/:id`, userCtrl.getUser );
app.get( `/api/user`, userCtrl.getAllUsers );
app.post( `/api/user`, userCtrl.createUser );
}
