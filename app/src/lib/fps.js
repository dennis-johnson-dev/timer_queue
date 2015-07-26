
  // frames / second
  // setInteval
  // tick, tick, tick, tick,
  // actual time = 1/60 s
  // should have 1 tick
  //
  // number of ticks / actual time
  // while i > 10
  // start
  //   let fps, ticks;
  //   record startTime
  //   current =  setInteval to call ticks
  //     accumulate ticks
  //     if currentTime - startTime === 1 s
  //       fps = ticks
  //       console.log(fps)
  //       clearInterval(current)

function getTime() {
  return window.performance.now();
}

export function start() {
  let fps;
  let ticks = 0;
  let startTime = getTime();
  const currentInterval = setInterval(() => {
    ticks++;
    if (getTime() - startTime >= 1000) {
      startTime = window.performance.now();
      console.log('fps', ticks);
      // setState
      ticks = 0;
    }
  }, 16.67);
}
