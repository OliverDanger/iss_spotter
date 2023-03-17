const { fetchMyIP, fetchCoordsByIp, fetchISSFlyOverTimes } = require('./iss');

fetchMyIP((error, ip) => {
  if (error) {
    console.log('it didn\'t work!', error);
    return;
  }

  console.log('it worked! Returned IP:', ip);

  fetchCoordsByIp(ip, (error, coordinates) => {
    if (error) {
      console.log('it didn\'t work!', error);
      return;
    }
    console.log(`It worked! Returned coordinates:`, coordinates);
    const lat = coordinates[0];
    const lon = coordinates[1];
    fetchISSFlyOverTimes(lat, lon, (error, flyOverTimes) => {
      if (error) {
        console.log('it didn\'t work!', error);
        return;
      }
      console.log('It worked! Fly over times at your location are: \n', flyOverTimes);
    });

  });
});
