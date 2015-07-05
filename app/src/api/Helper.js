let it;

function wrapper(requests, fetcher) {
  return new Promise((resolve, reject) => {
    it = main(requests, fetcher, resolve, reject);
    it.next();
  });
}

function requestData(request, fetcher) {
  return fetcher(request).then((res) => {
    if (res.ok) {
      return res.json().then((body) => {
        it.next({ body, action: request.action, id: request.id });
      });
    }
  }, (err) => {
    it.throw(err);
  }).catch((err) => {
    it.throw(err);
  });
}

function *main(requests, fetcher, resolve, reject) {
  let results = [];
  for (let request of requests) {
    try {
      let result = yield requestData(request, fetcher);
      results.push(result);
    } catch (e) {
      console.log(request.url, e)
      reject(results);
    }
  }

  resolve(results);
}

module.exports = { wrapper };
