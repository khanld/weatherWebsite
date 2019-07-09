console.log('hello');


const input = document.querySelector('#input');
const button = document.querySelector('#button');
const div1 = document.querySelector('#div1');
const div2 = document.querySelector('#div2');

const fetchAPI = ()=>{
	return fetch(`/weather?address=${input.value}`)
			.then((response)=>{
				return response.json();
			})
			.then((data)=>{
				if(data.err){
					div1.innerHTML = data.err;
				}else{
					div1.innerHTML = `<h2>Name: ${data.name}</h2><p>Temperature: ${data.temperature}</p><p>WeatherDuringTheDay: ${data.WeatherDuringTheDay}</p><p>Prediction:${data.Prediction}</p>`;
				}
			})
			.catch((err)=>{
				div1.innerHTML = "Can't not find the address";
			})
}

var searchWeather = (e)=>{
	if(e.keyCode === 13 || e.which === 13){
		div1.innerHTML = "Loading..."
		return fetchAPI();
	}
	
}

	


input.addEventListener('keypress', searchWeather);
button.addEventListener('click', (e)=>{
	div1.innerHTML = "Loading..."
	return fetchAPI();
});

