var requester = {
  wrapper: wrapper
};

var it;

function wrapper(options, fetcher) {
  return new Promise(function(resolve, reject) {
    it = main(options, fetcher, resolve, reject);
    it.next();
  });
}

function requestData(option, fetcher) {
  return fetcher(option).then(function(result) {
    it.next(result);
  }, function(err) {
    it.throw(err);
  });
}

function *main(options, fetcher, resolve, reject) {
  let results = [];
  for (let option in options) {
    try {
      let result = yield requestData(options[option], fetcher);
      result = Object.assign(result, { uid: options[option].uid });
      results.push(result);
    } catch (err) {
      reject({ err, results });
    }
  }

  resolve(results);
}

module.exports = requester;