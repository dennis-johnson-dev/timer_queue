// require("babel/polyfill");
//
// var context = require.context('./specs/', true, /\.js$/);
// context.keys().forEach(context);
require('../../app/css/style.scss');
require('../../public/vendor/bootstrap.min.css');
var Immutable = require('immutable');

/**
 * ES5 polyfills for PhantomJS
 */
require('babel/polyfill');
require('core-js/es5');

/**
 * Create a set of webpack module ids for our project's modules, excluding
 * tests. This will be used to clear the module cache before each test.
 */
var projectContext = require.context('../../app/src/components', true, /^((?!__unit__).)*.jsx?$/);
var projectModuleIds = Immutable.Set(
  projectContext.keys().map(module => (
    String(projectContext.resolve(module))
  ))
);

beforeEach(() => {
  /**
   * Clear the module cache before each test. Many of our modules, such as
   * Stores and Actions, are singletons that have state that we don't want to
   * carry over between tests. Clearing the cache makes `require(module)`
   * return a new instance of the singletons. Modules are still cached within
   * each test case.
   */
  var cache = require.cache;
  projectModuleIds.forEach(id => delete cache[id]);

  /**
   * Automatically mock the built in setTimeout and setInterval functions.
   */
  jasmine.clock().install();
});

afterEach(() => {
  jasmine.clock().uninstall();
});

/**
 * Load each test using webpack's dynamic require with contexts.
 */
var context = require.context('../../app/src/components', true, /Spec\.jsx?$/);
context.keys().forEach(context);
