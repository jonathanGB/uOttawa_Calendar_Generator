// init project
const express = require('express');
const CookieParser = require('cookie-parser')
const ScheduleGenerator = require('./lib/run')

var app = express();
app.use(CookieParser());
app.use(express.static('public'));


// routes
app.get("/", function (req, res) {
  res.sendFile(__dirname + '/views/index.html');
});


app.get("/getToken/:school", (req, res) => {
  var authURL = `${ScheduleGenerator.getAuthURL()}&state=${req.params.school}`;

  res.redirect(authURL);
});

app.get("/run", (req, res) => {
  var code = req.query.code;
  var school = req.query.state;
  
  if (!code || code === 'access_denied' || !school)
    res.redirect('/');
  else
    res.send(`topkek`);
})



// listen for requests
var listener = app.listen(process.env.PORT, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});