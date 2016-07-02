const storyRoutes = require('./Story/storyRoutes');
const userRoutes = require('./User/UserRoutes');

module.exports = app => {
storyRoutes( app );
userRoutes( app );
}
