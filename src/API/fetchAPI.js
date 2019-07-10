const request = require('request');
var key = '541da1b064484f37b5bc6da1adb2bce9';
//ed57bb3a81516b90bea0934e2b61106e

var location = (address)=>{
	var address = encodeURIComponent(address);
	return new Promise((resolve, reject)=>{
		request({
		url: `http://api.apixu.com/v1/current.json?key=7325e01ddd1e4443ad843154190407&q=${address}`,
		json:true,
	},(err, res, body)=>{
		if(err){
			reject("There's something wrong with the URL");
		}else if(body.error){
			reject(body.error.message);
		}else{
			resolve(body.location);
		}
	});
	
	})
}


module.exports = {
	location,
}
