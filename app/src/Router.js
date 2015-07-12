const Marty = require('marty');
const Router = require('react-router');

module.exports = Router.create({
  routes: require('./Routes'),
  location: location()
});

function location() {
  if (typeof window !== 'undefined') {
    return Router.HistoryLocation;
  }
}
