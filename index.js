const { fetchMyIP, fetchCoordsByIP, fetchISSFlyOverTimes, nextISSTimesForMyLocation } = require('./iss');

const printPassTimes = function(passTimes) {
  for (const pass of passTimes) {
    const datetime = new Date(0);
    datetime.setUTCSeconds(pass.risetime);
    const duration = pass.duration;
    console.log(`Next pass at ${datetime} for ${duration} seconds!`);
  }
};

nextISSTimesForMyLocation((error, passTimes) => {
  if (error) {
    return console.log("It didn't work!", error);
  }
  // success, print out the deets!
  printPassTimes(passTimes);
});

fetchMyIP((error, ip) => {
  if (error) {
    console.log("It didn't work!" , error);
    return;
  }
  console.log("It worked! Returned IP:", ip);

  fetchCoordsByIP(ip, (error, coords) => {
    if (error) {
      console.log("It didn't work!", error);
    }
    console.log("It worked! Returned coordinates:", coords);

    fetchISSFlyOverTimes(coords, (error, flyOverTimes) => {
      if (error) {
        console.log("It didn't work!", error);
      }
      console.log("It worked! Returned coordinates:", flyOverTimes);

    });

  });
  
});

/*Error: Success status was false. Server message says: Invalid IP address when fetching for IP 42

fetchCoordsByIP("42", (error, coords) => {
  if (error) {
    console.log("Error:", error.message);
    return;
  }
  console.log("Coordinates:", coords);
});
*/

/*Error: Status Code 400 when fetching ISS flyover times: invalid coordinates
const exampleCoords = { latitude: 'a', longitude: 'b' };

fetchISSFlyOverTimes(exampleCoords, (error, passTimes) => {
  if (error) {
    console.log("It didn't work!" , error);
    return;
  }

  console.log('It worked! Returned flyover times:' , passTimes);
});
*/