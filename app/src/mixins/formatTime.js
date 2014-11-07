function formatTime(total) {
  var hours = 0;
  var minutes = 0;
  while (total >= 3600) {
    if (total/3600 > 0) {
      hours += Math.floor(total/3600);
      total -= hours * 3600;
    }
  }
  while (total >= 60) {
    if (total/60 > 0) {
      minutes += Math.floor(total/60);
      total -= minutes * 60;
    }
  }
  hours = hours < 10 ? '0' + hours + ':' : hours + ':'; 
  minutes = minutes < 10 ? '0' + minutes + ':' : minutes + ':';    
  total = total < 10 ? '0' + total : total;
  var formattedTime = hours + minutes + total;
  return formattedTime;
}

module.exports = formatTime;