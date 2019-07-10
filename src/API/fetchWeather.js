const request = require('request');

var weatherInform = (lat,long)=>{
	return new Promise((resolve, reject)=>{
		request({
		url:`https://api.darksky.net/forecast/ed57bb3a81516b90bea0934e2b61106e/${lat},${long}`,
		json: true,
	},(err, res, body)=>{
		if(err){
			reject("There's something wrong with the URL");
		}else if(body.code === 400){
			reject("WEATHER NOT FOUND")
		}else{
	
			resolve(body);
		}

	});
	})
}
module.exports = {
	weatherInform,
}