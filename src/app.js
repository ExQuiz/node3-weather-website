// core module
const path = require("path");
const geoCode = require("./utils/geoCode");
const forecast = require("./utils/forecast");
// npm module
const express = require("express");
const hbs = require("hbs");

const app = express();
const port = process.env.PORT || 3000;

// Define Paths for Express config
const publicDirectory = path.join(__dirname, "../public");
const viewPath = path.join(__dirname, "../template/views");
const partialsPath = path.join(__dirname, "../template/partials");

// Setup handlebars engine and views location
app.set("view engine", "hbs");
app.set("views", viewPath);
app.use(express.static(publicDirectory));
hbs.registerPartials(partialsPath);

// Setup Static directory to server
app.get("", (req, res) => {
  res.render("index", {
    title: "Weather App",
    name: "Hello world "
  });
});

app.get("/about", (req, res) => {
  res.render("about", {
    title: "About",
    name: "Hello world"
  });
});

app.get("/help", (req, res) => {
  res.render("help", {
    title: "Help Center",
    content: "Welcome to help center",
    name: "Hello world"
  });
});

app.get("/weather", (req, res) => {
  if (!req.query.address) {
    return res.send({ error: "Provide an address" });
  }

  const address = req.query.address;

  if (address) {
    geoCode(address, (error, { latitude, longitude, location } = {}) => {
      if (error) {
        return res.send({ error });
      }

      forecast(latitude, longitude, (error, forecastData) => {
        if (error) {
          return res.send({ error });
        }

        res.send({
          forecast: forecastData,
          location,
          address: req.query.address
        });

        console.log(location);
        console.log(forecastData);
      });
    });
  }
});

app.get("/product", (req, res) => {
  if (!req.query.search) {
    return res.send({ error: "Provide Search Term" });
  }

  console.log(req.query.search);
  res.send({
    product: []
  });
});
// app.com
// app.com/help
// app.com/about

// 404 Page directory
app.get("/help/*", (req, res) => {
  res.render("404Page", {
    pageNotFound: "No Matching Article"
  });
});

app.get("*", (req, res) => {
  res.render("404Page", {
    pageNotFound: "404 Not Found"
  });
});

// Listen on server port 3000
app.listen(port, () => {
  console.log("server is up on port" + port);
});

// reference for testing not userable in this program anymore
// app.get("", (req, res) => {
//   res.send("<h1>Weather</h1>");
// });

// app.get("/help", (req, res) => {
//   res.send([
//     {
//       name: "hello",
//       age: 2
//     },
//     {
//       name: "hello2",
//       age: 4
//     }
//   ]);
// });

// app.get("/about", (req, res) => {
//   res.send("<h1>About</h1>");
// });
