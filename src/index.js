const express = require('express');
const path = require('path');
const hbs = require('hbs');
const fetchAPI = require('./API/fetchAPI');
const weather = require('./API/fetchWeather');
const port = process.env.PORT || 3000;

//Define paths for express config
const app = express();
const publicDirectoryPath = path.join(__dirname, '../public');
const viewsPath = path.join(__dirname, '../templates/views');
const partialsPath = path.join(__dirname, '../templates/partials');

//Setup hbs and views location
app.use(express.static(publicDirectoryPath));
app.set('view engine', 'hbs');
app.set('views', viewsPath);
hbs.registerPartials(partialsPath);

//Setup directory to serve
app.get('/', (req, res)=>{
	res.render('index', {
		name: "Duy Khanh",
		title: "Weather Forecast"
	});

});

app.get('/weather', (req, res)=>{
	if(!req.query.address){
		return res.send({
			error: "You must provide a address term",
		})
	};
	fetchAPI.location(req.query.address)
	.then(({name, lat,lon})=>{
		console.log(name);
		return weather.weatherInform(lat, lon);
	})
	.then(({currently, hourly,daily})=>{
		res.send({
			name: req.query.address,
			temperature: (currently.temperature-32)/1.8,
			WeatherDuringTheDay: hourly.summary,
			Prediction: daily.summary
	});
	})
	.catch((err)=>{
		res.send({
			err
		});
	})


});


app.get('/about', (req, res)=>{
	res.render('about', {
		title: "About",
		name: "Duy Khanh"
	});
});
app.get('/help', (req, res)=>{
	res.render('help', {
		title: "Help Page",
		name: "Duy Khanh"
	});
});

app.get('/help/*', (req,res)=>{
	res.render('errorPage',{
		message: 'Help article is not found',
		name: 'Duy Khanh'
	});
});

app.get('/*', (req,res)=>{
	res.render('errorPage',{
		message: '404 Page is not found',
		name: 'Duy Khanh'
	});
});


app.listen(port, ()=>{
	console.log("Your websever is now available");
})

