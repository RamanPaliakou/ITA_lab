define('api', function () {
    class apiProcessor {

        constructor(appId, operatorClass) {
            this._displayedWeatherState = {};
            this._appIdentifier = appId;
            this._operatorClass = operatorClass;
        }

        composeFromRecieved(obj) {
            let weatherState = [];
            for (let i = 0; i < obj.list.length; i++) {
                let fullTime = new Date(obj.list[i].dt_txt),
                    hours = fullTime.getHours(),
                    day = fullTime.getDate(),
                    month = fullTime.toLocaleString("en-us", { month: "long" });
                let singleForecast = {
                    city: obj.city.name,
                    minTemperature: obj.list[i].main.temp_min,
                    maxTemperature: obj.list[i].main.temp_max,
                    humidity: obj.list[i].main.humidity,
                    pressure: obj.list[i].main.pressure,
                    state: obj.list[i].weather[0].main,
                    hours: hours,
                    day: day,
                    month: month,
                    image: obj.list[i].weather[0].icon,
                    timePeriod: this._operatorClass.getTimePeriod(hours)
                };
                weatherState.push(singleForecast);
            }
            return weatherState;
        }

        recieveWeatherById(cityId) {
            let context = this;
            let result = [];
            let k = fetch("http://api.openweathermap.org/data/2.5/forecast?id=" +
                cityId + "&units=" + "metric" + "&APPID=" + this._appIdentifier)
                .then(data => data.json())
                .then(function (data) {
                    if (data.cod !== "200") {
                        throw new Error('api request mistake encountered, cod: ' + data.cod + ' ' + data.message);
                    }
                    result = context.composeFromRecieved(data);
                    console.log(result);
                    context._displayedWeatherState = result;
                });
            return k;
        }

        recieveWeatherByName(cityName) {
            let context = this;
            let result = [];
            let k = fetch("http://api.openweathermap.org/data/2.5/forecast?q=" +
                cityName + "&units=" + "metric" + "&APPID=" + this._appIdentifier)
                .then(data => data.json())
                .then(function (data) {
                    if (data.cod !== "200") {
                        throw new Error('api request mistake encountered, cod: ' + data.cod + ' ' + data.message);
                    }
                    result = context.composeFromRecieved(data);
                    console.log(result);
                    context._displayedWeatherState = result;
                });
            return k;
        }

        getWeather() {
            return this._displayedWeatherState;
        }

    }
    return {
        processorClass: apiProcessor
    }
});