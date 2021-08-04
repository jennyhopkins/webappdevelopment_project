/*ES6 class */
class Forecast {
    constructor(predictionTime, predictionTemp, predictionDescription) {
        this._predictionTime = predictionTime;
        this._predictionTemp = predictionTemp;
        this._predictionDescription = predictionDescription;
    }

    //Getter
    get predictionTime() {
        return this._predictionTime;
    }

    get predictionTemp() {
        return this._predictionTemp;
    }

    get predictionDescription() {
        return this._predictionDescription;
    }
}

/*Function Expression */
const convertKelvinToFahrenheit = function (Kelvin) {
    let Fahrenheit = ((Kelvin - 273.15) * 9 / 5) + 32;
    return Fahrenheit;
}

function searchCurrentWeather() {
    let city = document.getElementById("city1").value;
    console.log("city entered: ", city);

    let myHeaders = new Headers();
    myHeaders.append('Access-Control-Allow-Origin', '');
    myHeaders.append("Accept", "/");

    let requestOptions = {
        method: 'GET',
        mode: 'cors',
        cache: 'no-cache',
        redirect: 'follow',
        referrerPolicy: 'no-referrer',
    };

    //securely read API key
    let url = "http://localhost:8010/proxy/data/2.5/weather?q=" + city + ",us&appid=" + config.apiKey;

    fetch(url, requestOptions)
        .then(response => response.text())
        .then(result => parseCurrentWeatherOutput(result))
        .catch(error => console.log('error', error));
}

function parseCurrentWeatherOutput(input) {
    const output = JSON.parse(input);
    console.log(output);
    let desc = output.weather[0].description; //weather info is in array
    console.log("weather" + desc);
    document.getElementById("desc").innerHTML = "Weather description: " + desc;
    let temp = Math.round(convertKelvinToFahrenheit(output.main.temp));
    document.getElementById("temp").innerHTML = "Temperature: " + temp + " F";
    let feels_like = Math.round(convertKelvinToFahrenheit(output.main.feels_like));
    document.getElementById("feels_like").innerHTML = "Feels like: " + feels_like + " F";
    console.log("feels_like: " + feels_like);
    let temp_min = Math.round(convertKelvinToFahrenheit(output.main.temp_min));
    document.getElementById("temp_min").innerHTML = "Min Temperature: " + temp_min + " F";
    let temp_max = Math.round(convertKelvinToFahrenheit(output.main.temp_max));
    document.getElementById("temp_max").innerHTML = "Max Temperature: " + temp_max + " F";
}

function searchDailyWeather() {
    let lat1 = document.getElementById("lat1").value;
    let long1 = document.getElementById("long1").value;

    let myHeaders = new Headers();
    myHeaders.append('Access-Control-Allow-Origin', '');
    myHeaders.append("Accept", "/");

    let requestOptions = {
        method: 'GET',
        mode: 'cors',
        cache: 'no-cache',
        redirect: 'follow',
        referrerPolicy: 'no-referrer',
    };

    // let url = "http://localhost:8010/proxy/data/2.5/onecall?lat=33.44&lon=-94.04&exclude=minutely,hourly,current&appid=" + config.apiKey;
    let url = "http://localhost:8010/proxy/data/2.5/onecall?lat=" + lat1 + "&lon=" + long1 + "&exclude=minutely,hourly,current&appid=" + config.apiKey;
    fetch(url, requestOptions)
        .then(response => response.text())
        .then(result => parseDailyWeatherOutput(result))
        .catch(error => console.log('error', error));
}

function parseDailyWeatherOutput(input) {
    const output = JSON.parse(input);
    console.log(output);
    let timezone = output.timezone;
    document.getElementById("timezone").innerHTML = "Timezone: " + timezone;
    let todayDayTemp = Math.round(convertKelvinToFahrenheit(output.daily[0].temp.day));
    console.log("today day temp: " + todayDayTemp);
    document.getElementById("todayDayTemp").innerHTML = "Today's day temperature: " + todayDayTemp + " F";
    let todayEveTemp = Math.round(convertKelvinToFahrenheit(output.daily[0].temp.eve));
    console.log("today eve temp: " + todayEveTemp);
    document.getElementById("todayEveTemp").innerHTML = "Today's evening temperature: " + todayEveTemp + " F";
    let todayMinTemp = Math.round(convertKelvinToFahrenheit(output.daily[0].temp.min));
    console.log("today min temp: " + todayMinTemp);
    document.getElementById("todayMinTemp").innerHTML = "Today's min temperature: " + todayMinTemp + " F";
    let todayMaxTemp = Math.round(convertKelvinToFahrenheit(output.daily[0].temp.max));
    console.log("today max temp: " + todayMaxTemp);
    document.getElementById("todayMaxTemp").innerHTML = "Today's max temperature: " + todayMaxTemp + " F";
    let todayWindSpeed = output.daily[0].wind_speed;
    document.getElementById("todayWindSpeed").innerHTML = "Today's wind speed: " + todayWindSpeed + " m/sec";
    let alerts = output.alerts;
    if (alerts != undefined) {
        document.getElementById("alerts").innerHTML = "Weather alerts: " + alerts;
    }
}

function searchAirPollution() {
    let lat2 = document.getElementById("lat2").value;
    let long2 = document.getElementById("long2").value;

    let myHeaders = new Headers();
    myHeaders.append('Access-Control-Allow-Origin', '');
    myHeaders.append("Accept", "/");

    let requestOptions = {
        method: 'GET',
        mode: 'cors',
        cache: 'no-cache',
        redirect: 'follow',
        referrerPolicy: 'no-referrer',
    };

    //let url = "http://localhost:8010/proxy/data/2.5/air_pollution?lat=33.44&lon=-94.04&appid=" + config.apiKey;
    let url = "http://localhost:8010/proxy/data/2.5/air_pollution?lat=" + lat2 + "&lon=" + long2 + "&appid=" + config.apiKey;

    fetch(url, requestOptions)
        .then(response => response.text())
        .then(result => parseAirPollutionOutput(result))
        .catch(error => console.log('error', error));
}

function parseAirPollutionOutput(input) {
    const output = JSON.parse(input);
    console.log(output);
    let aqi = output.list[0].main.aqi;
    document.getElementById("aqi").innerHTML = "Air quality index: " + aqi +
        "<br>AQI possible values: 1, 2, 3, 4, 5. 1 = Good, 2 = Fair, 3 = Moderate, 4 = Poor, 5 = Very Poor.";
    let co = output.list[0].components.co;
    document.getElementById("co").innerHTML = "Carbon Monoxide: " + co + " micrograms/cubic meter";
    let no = output.list[0].components.no;
    document.getElementById("no").innerHTML = "Nitrogen monoxide: " + no + " micrograms/cubic meter";
    let ozone = output.list[0].components.o3;
    document.getElementById("ozone").innerHTML = "Ozone: " + ozone + " micrograms/cubic meter";
}

function searchWeatherForecastByZipcode() {
    let zipcode = document.getElementById("zipcode").value;

    let myHeaders = new Headers();
    myHeaders.append('Access-Control-Allow-Origin', '');
    myHeaders.append("Accept", "/");

    let requestOptions = {
        method: 'GET',
        mode: 'cors',
        cache: 'no-cache',
        redirect: 'follow',
        referrerPolicy: 'no-referrer',
    };

    let url = "http://localhost:8010/proxy/data/2.5/forecast?zip=" + zipcode + "&appid=" + config.apiKey;

    fetch(url, requestOptions)
        .then(response => response.text())
        .then(result => convertJSONtoObject(JSON.parse(result).list))
        .catch(error => console.log('error', error));
}

/*Arrow function implementation */
let getDateTimeFromMilliseconds = dateTime => new Date(dateTime * 1000).toLocaleString();

function convertJSONtoObject(jsonArray) {
    //console.log("here convertJSONtoObject", jsonArray.length);
    let predictionArray = [];
    for (i = 0; i < 17; i++) {

        let predictionTimeFromJSON = getDateTimeFromMilliseconds(jsonArray[i].dt);
        let predictionTempFromJSON = Math.round(convertKelvinToFahrenheit(jsonArray[i].main.temp));
        let predictionDescriptionFromJSON = jsonArray[i].weather[0].description;

        //console.log("Jenny, " predictionTimeFromJSON, predictionTempFromJSON)
        const newObject = new Forecast(predictionTimeFromJSON, predictionTempFromJSON, predictionDescriptionFromJSON);
        predictionArray.push(newObject);
    }
    printToHTML(predictionArray);
}

function printToHTML(predictionArray) {
    let curSection = document.getElementById("forecast3");
    for (i = 0; i <= 17; i += 4) {

        let predictionTimeElem = document.createElement("h3");
        predictionTimeElem.innerHTML = "Forecast for: " + predictionArray[i]._predictionTime;
        let predictionTempElem = document.createElement("h3");
        predictionTempElem.innerHTML = "Temperature: " + predictionArray[i]._predictionTemp + " F";
        let predictionDescriptionElem = document.createElement("h3");
        predictionDescriptionElem.innerHTML = "Weather description: " + predictionArray[i]._predictionDescription;
        let newLineElem = document.createElement("hr");
        curSection.appendChild(predictionTimeElem);
        curSection.appendChild(predictionTempElem);
        curSection.appendChild(predictionDescriptionElem);
        curSection.appendChild(newLineElem);
    }
}

function openFortuneCookie() {
    alert("A good way to keep healthy is to eat more Chinese food.")
}

