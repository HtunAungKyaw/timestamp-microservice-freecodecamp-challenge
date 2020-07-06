// server.js
// where your node app starts

// init project
var express = require("express");
var app = express();
var moment = require("moment");

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC
var cors = require("cors");
app.use(cors({ optionSuccessStatus: 200 })); // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
app.use(express.static("public"));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function (req, res) {
  res.sendFile(__dirname + "/views/index.html");
});

// your first API endpoint...
app.get("/api/hello", function (req, res) {
  res.json({ greeting: "hello API" });
});

app.get("/api/timestamp/:date?", (req, res) => {
  const { date } = req.params;
  const res_Date = new Date(date);
  console.log();
  if (!date) {
    res.json({ unix: +new Date(), utc: new Date().toISOString() });
  } else if (moment(date, "YYYY-MM-DD").isValid()) {
    res.json({ unix: +res_Date, utc: res_Date.toUTCString() });
  } else {
    res.json({ error: "Invalid Date" });
  }
});

// listen for requests :)
var listener = app.listen(process.env.PORT || 3000, function () {
  console.log("Your app is listening on port " + listener.address().port);
});
