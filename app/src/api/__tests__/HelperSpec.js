jest.autoMockOff();

var Helper = require('../Helper');
var es6Promise = require('es6-promise').Promise;

describe('#Helper', () => {
  var options = [
    {}
  ];

  pit('is true', () => {
    var fetcher = jest.genMockFn().mockReturnValue(es6Promise.resolve('hi'));
    
    return Helper.wrapper(options, fetcher).then(function(results) {
      var expectedResults = ['hi'];
      expect(results).toEqual(expectedResults);
    });
  });

  pit('has error and does not continue making requests', () => {
    var fetcher = jest.genMockFn().mockReturnValue(es6Promise.reject('yo'));

    return Helper.wrapper(options, fetcher).then(function(results) {
      expect(false).toBe(true);
    }, function(err) {
      expect(err).toBe('yo');
    });
  });
});