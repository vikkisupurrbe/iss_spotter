const { fetchMyIP, fetchCoordsByIP } = require('./iss');


fetchMyIP((error, ip) => {
  if (error) {
    console.log("It didn't work!" , error);
    return;
  }
  console.log('It worked! Returned IP:', ip);

  fetchCoordsByIP(ip, (error, coords) => {
    if (error) {
      console.log("Error.", error);
    }
    console.log("Success.", coords);

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