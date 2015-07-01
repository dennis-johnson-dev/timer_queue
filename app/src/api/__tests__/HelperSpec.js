jest.autoMockOff();

const Helper = require('../Helper');
const es6Promise = require('es6-promise').Promise;

describe('#Helper', () => {
  const action = {};
  const id = 123;
  const requests = [{
    action,
    id
  }];


  pit('is true', () => {
    const response = {
      ok: true,
      json: () => Promise.resolve('hi')
    };
    const fetcher = jest.genMockFn().mockReturnValue(es6Promise.resolve(response));
    return Helper.wrapper(requests, fetcher).then((results) => {
      const expectedResults = [{
        action,
        body: 'hi',
        id
      }];
      expect(results).toEqual(expectedResults);
    });
  });

  pit('has error and does not continue making requests', () => {
    const fetcher = jest.genMockFn().mockReturnValue(es6Promise.reject('yo'));

    return Helper.wrapper(requests, fetcher).then((results) => {
      expect(false).toBe(true);
    }, function(results) {
      expect(results).toEqual([]);
    });
  });
});
