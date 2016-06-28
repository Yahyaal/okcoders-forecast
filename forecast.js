var express = require('express');

var app = express();

var zipcodes = require('zipcodes');

var Forecast = require('forecast');

var forecast = new Forecast({
	service: 'forecast.io',
    key: '5b2a502a3e9cce8715fcebc3343372e0',
    units: 'F'
});

app.use('/', express.static('./public'));

app.get('/weather/:zip', function(req, res) {
	var location = zipcodes.lookup(req.params.zip);
	
	forecast.get([location.latitude, location.longitude], function(err,weather) {
		if(err) return console.dir(err);
		weather.city = location.city;
		weather.state = location.state;
		res.json(weather);
	});
	
});


app.listen(8080);
console.log('http://localhost:8080');
