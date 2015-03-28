var Marty = require('marty');
var Router = require('react-router');

module.exports = Router.create({
  routes: require('./Routes'),
  location: location()
});

function location() {
  if (typeof window !== 'undefined') {
    return Router.HistoryLocation;
  }
}