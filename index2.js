const { nextISSTimesForMyLocation } = require('./iss_promised');

nextISSTimesForMyLocation()
  .then((passTimes) => {
    printPassTimes(passTimes)
  })
  .catch((error) => {
    console.log("Error: ", error.message)
  })

  const printPassTimes = (passTimes) => {
    for (const time of passTimes) {
      console.log(`The ISS is passing over at ${time.risetime} and will be visible for ${time.duration} ms.`)
    }
  }