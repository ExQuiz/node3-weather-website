const request = require("request");

const forecast = (longitude, latitude, callback) => {
  const url = `https://api.darksky.net/forecast/8da3758b60b4911d2d70f35eeb313348/${encodeURIComponent(
    longitude
  )},${encodeURIComponent(latitude)}?units=si&lang=en`;

  request({ url, json: true }, (error, { body }) => {
    if (error) {
      callback("Unable to access Weather service", undefined);
    } else if (body.error) {
      callback("Unable to find location", undefined);
    } else {
      callback(
        undefined,
        // {
        //   summary: body.daily.data[0].summary,
        //   temperature: body.currently.temperature,
        //   rainChance: body.currently.precipProbability
        // });
        // // console.log(
        `${
          body.daily.data[0].summary
        } This is currently ${body.currently.temperature.toFixed(
          0
        )} degress outside and ${
          body.currently.precipProbability
        }% raining today `
      );
    }
  });
};

module.exports = forecast;
