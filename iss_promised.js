const needle = require('needle');

const fetchMyIP = function() {
  return needle ('get', 'https://api.ipify.org/?format=json')
  .then((response) => {
    const body = response.body;
    const ip = body.ip;
    return ip
  });
};

const fetchCoordsByIP = function(ip) {
  return needle ('get', `http://ipwho.is/${ip}`)
  .then ((response) => {
    const body = response.body;
    const latitude = body.latitude;
    const longitude = body.longitude;
    return {latitude, longitude};
  });
};

const fetchISSFlyOverTimes = function(coords) {
  return needle ('get', `https://iss-flyover.herokuapp.com/json/?lat=${coords.latitude}&lon=${coords.longitude}`)
  .then((response) => {
    const body = response.body;
    const passtimes = body.response;
    return passtimes;
  });
};

const nextISSTimesForMyLocation = function() {
  return fetchMyIP()
  .then((ip) => fetchCoordsByIP(ip))
  .then((coords) => fetchISSFlyOverTimes(coords))
  .then((passtimes) => {
    return passtimes;
  })
  .catch((error) => {
    console.log("It didn't work!", error)
  });
};

const printPassTimes = function(passTimes) {
  for (const pass of passTimes) {
    const datetime = new Date(0);
    datetime.setUTCSeconds(pass.risetime);
    const duration = pass.duration;
    console.log(`Next pass at ${datetime} for ${duration} seconds!`);
  }
};







module.exports = { nextISSTimesForMyLocation, printPassTimes };
//module.exports = { fetchMyIP, fetchCoordsByIP, fetchISSFlyOverTimes };
