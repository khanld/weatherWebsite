const request = require('request');
var key = '541da1b064484f37b5bc6da1adb2bce9';
//ed57bb3a81516b90bea0934e2b61106e
var location = (address)=>{
	var address = encodeURIComponent(address);
	return new Promise((resolve, reject)=>{
		request({
		url: `http://api.openweathermap.org/data/2.5/weather?q=${address}&APPID=${key}`,
		json:true,
	},(err, res, body)=>{
		if(err){
			reject("There's something wrong with the URL");
		}else if(body.cod === '404'){
			reject('NOT FOUND THE ADDRESS');
		}else if(body.cod === 200){

			resolve(body);
		}
	});
	
	})
}

module.exports = {
	location,
}
