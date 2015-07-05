import Marty from 'marty';

export default class Application extends Marty.Application {
  constructor(options) {
    super(options);
    this.register(require('./stores'));
    this.register(require('./actions'));
    this.register(require('./queries'));
    this.register(require('./api'));
  }
}
