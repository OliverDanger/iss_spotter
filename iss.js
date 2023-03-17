const request = require('request');

const fetchMyIP = function(callback) {

  request('https://api.ipify.org?format=json', (error, response, body) => {
    if (error) {
      return callback(error, body);
    }

    if (response.statusCode !== 200) {
      const msg = `Status Code ${response.statusCode} when fetching IP. Response: ${body}`;
      callback(Error(msg), null);
      return;
    }

    const myIP = JSON.parse(body).ip;
    callback(error, myIP);
  });
};


const fetchCoordsByIp = function(ip, callback) {

  request(`http://ipwho.is/${ip}`, (error, response, body) => {
    if (error) {
      return callback(error, body);
    }

    if (response.statusCode !== 200) {
      const msg = `Status Code ${response.statusCode} when fetching coordinates. Response: ${body}`;
      callback(Error(msg), null);
      return;
    }
    const message = JSON.parse(body).message;
    if (message === "Invalid IP address") {
      const msg = `Status: ${message} \n Please validate IP!`;
      callback(Error(message), null);
      return;
    }

    const latitude = JSON.parse(body).latitude;
    const longitude = JSON.parse(body).longitude;
    const coordinates = [latitude, longitude];
    callback(error, coordinates);
  });
};


const fetchISSFlyOverTimes = function(lat, lon, callback) {

  request(`https://iss-flyover.herokuapp.com/json/?lat=${lat}&lon=${lon}`, (error, response, body) => {
    if (error) {
      return callback(error, body);
    }

    if (response.statusCode !== 200) {
      const msg = `Status Code ${response.statusCode} when fetching coordinates. Response: ${body}`;
      callback(Error(msg), null);
      return;
    }
    const message = JSON.parse(body).message;
    if (message === "invalid coordinates") {
      const msg = `Status: ${message} \n Please validate coordinates!`;
      callback(Error(message), null);
      return;
    }

    const flyOvers = JSON.parse(body).response;

    callback(error, flyOvers);
  });
};


const nextISSTimesForMyLocation = (callback) => {
  fetchMyIP((error, ip) => {
    if (error) {
      return; callback(error, null);
    }
  
    fetchCoordsByIp(ip, (error, coordinates) => {
      if (error) {
        return; callback(error, null);
      }
      const lat = coordinates[0];
      const lon = coordinates[1];
      fetchISSFlyOverTimes(lat, lon, (error, flyOverTimes) => {
        if (error) {
          return; callback(error, null);
        }
        callback(null, flyOverTimes)
      });
    });
  });
}



module.exports = {
  fetchMyIP,
  fetchCoordsByIp,
  fetchISSFlyOverTimes,
  nextISSTimesForMyLocation
};