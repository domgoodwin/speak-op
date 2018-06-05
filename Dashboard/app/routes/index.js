// routes/index.js
const startRoutes = require('./startup');
const newRoutes = require('./newdash');
module.exports = function(app, db) {
  startRoutes(app, db);
  newRoutes(app, db);
  // Other route groups could go here, in the future
};
