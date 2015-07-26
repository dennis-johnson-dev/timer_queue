import React from 'react/addons';
import Router, { RouteHandler, Link } from 'react-router';
import Immutable from 'immutable';
import NotificationItem from './NotificationItem';
const Perf = React.addons.Perf;

const FPSMeter = React.createClass({
  displayName: 'FPSMeter',

  getInitialState() {
    return {
      fps: 0
    };
  },

  _getCurrentTime() {
    return window.performance.now();
  },

  componentDidMount() {
    let frames = 0;
    let startTime = this._getCurrentTime();
    const step = () => {
      frames++;
      if (this._getCurrentTime() - startTime >= 1000) {
        startTime = this._getCurrentTime();
        this.setState({ fps: frames });
        frames = 0;
      }
      window.requestAnimationFrame(step);
    };
    window.requestAnimationFrame(step);
  },

  render() {
    return (
      <div>
        <p>Current FPS: { this.state.fps }</p>
      </div>
    );
  }
});

module.exports = FPSMeter;
