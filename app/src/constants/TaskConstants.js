var keyMirror = require('react/lib/keyMirror');

module.exports = {
  ActionTypes: keyMirror({
    DECREMENT: null,
    RESET_PROJECT: null,
    TASK_CREATE: null,
    RECEIVE_PROJECTS: null
  })
};
