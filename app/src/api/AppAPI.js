import _ from 'lodash';
import Marty from 'marty';
require('marty').HttpStateSource.removeHook('parseJSON');
import Helper from './Helper';
import Immutable from 'immutable';

export default class AppAPI extends Marty.HttpStateSource {
  constructor(options) {
    super(options);
    this.requestQueue = this.getInitialState();
  }

  getInitialState() {
    return new Immutable.List();
  }

  requester(request, action) {
    // distinguish between optimistic updates
    // push request onto queue, resolve any other updates to the record
    this.requestQueue = this.requestQueue.push(request);
    // runs through requests
    // if all succeed in order, reset queue
    // if one fails, remove any succeeds from requestQueue
    return this._makeRequests();
  }

  flushRequests() {
    return this._makeRequests();
  }

  _makeRequests() {
    return Helper.wrapper(this.requestQueue.toJS(), this.request).then(
      this._clearSuccessfulRequests.bind(this),
      this._handleFailedRequest.bind(this)
    );
  }

  _clearSuccessfulRequests(results) {
    if (!results || results.length === 0) {
      return;
    }
    _.each(results, (result) => {
      const index = this.requestQueue.findIndex((request) => {
        return request.id === result.id;
      });

      if (index > -1) {
        this.requestQueue = this.requestQueue.delete(index);
      }
    });
    return results;
  }

  _handleFailedRequest(results) {
    // figure out the id situation...
    this._clearSuccessfulRequests(results);
    const id = results[results.length - 1] && results[results.length - 1].id || this.requestQueue.last().id || null;
    return Promise.reject({ msg: '', id });
  }

  removeRequest(action) {
    const index = this.requestQueue.findIndex((request) => {
      return request.id === action.id;
    });

    if (index > -1) {
      this.requestQueue = this.requestQueue.delete(index);
    }
  }
}
