/*
import {forecast_template} from "./elements";
import {forecast_panel_template} from "./elements";
are impossible due to site is not in a server and CORS-policy disallows the requests
*/
let forecast_template = '<div class="forecast box">\n' +
    '                <div class="forecast-image box"></div>\n' +
    '                <div class="forecast-info box">\n' +
    '                    <div class="min-temperature text-info">10\'C</div>\n' +
    '                    <div class="max-temperature text-info">15\'C</div>\n' +
    '                    <div class="humidity text-info">45%</div>\n' +
    '                    <div class="pressure text-info">0,9atm</div>\n' +
    '                </div>\n' +
    '                <div class="forecast-time box test-time"></div>\n' +
    '            </div>';

let forecast_panel_template = '<div id="forecast-panel-template" class="forecast-container box">\n' +
    '            <div class="forecast-container-properties box">\n' +
    '                <span class="forecast-property-city-name">Moscow</span>\n' +
    '                <span class="forecast-property-date">2012-01-25 Post Meridiem </span>\n' +
    '            </div>\n' +
    '       </div>';

class BuildActions {

    constructor() {
    };

    static randomStringGenerator() {
        return Math.random().toString(36).substr(2) + Math.random().toString(36).substr(2);
    };

    static htmlToElement(html) {
        let template = document.createElement('template');
        html = html.trim();
        template.innerHTML = html;
        return template.content.firstChild;
    };
}


class LayoutActions {
    constructor(appId, parentId, buildClass) {
        this._displayedPanels = [];
        this._displayedWeatherState = [];
        this._displayedForecasts = [];
        this._appIdentifier = appId;
        this._context = this;
        this._GLOBALPARENTID = parentId;
        this._buildClass = buildClass;
        this._fetchState = false;
    };

    addForecast(obj_forecast, data, panelNo) {
        let forecast = this._buildClass.htmlToElement(obj_forecast);
        forecast.id = this._buildClass.randomStringGenerator();
        forecast.querySelector('.min-temperature').innerHTML = data.minTemperature;
        forecast.querySelector('.forecast-info').querySelector('.max-temperature').innerHTML = data.maxTemperature;
        forecast.querySelector('.forecast-info').querySelector('.pressure').innerHTML = data.pressure;
        forecast.querySelector('.forecast-info').querySelector('.humidity').innerHTML = data.humidity;
        forecast.querySelector('.forecast-image').style.backgroundImage = "url(" + "images/" + data.image + ".png" + ")";
        forecast.querySelector('.forecast-time').style.backgroundImage = "url(" + "images/" + data.time + "-oclock.png" + ")";
        this._displayedForecasts.push(forecast.id);
        document.getElementById(this._displayedPanels[panelNo]).appendChild(forecast);
    };

    addPanel(obj_panel, obj_data) {
        let panel = this._buildClass.htmlToElement(obj_panel);
        panel.id = this._buildClass.randomStringGenerator();
        panel.querySelector('.forecast-container-properties').querySelector('.forecast-property-city-name').innerText = obj_data.city;
        panel.querySelector('.forecast-container-properties').querySelector('.forecast-property-date').innerText = obj_data.timePeriod;
        this._displayedPanels.push(panel.id);
        document.getElementById(this._GLOBALPARENTID).appendChild(panel);
    };

    doApiCbID(cityId) {

    }

    doApiCallbyId(cityId) {
        let context = this;
        let result = [];
        let k = fetch("http://api.openweathermap.org/data/2.5/forecast?id=" +
            cityId + "&units=" + "metric" + "&APPID=" + context._appIdentifier)
            .then(data => data.json())
            .then(function (data) {
                console.log('received data for city' + cityId);
                result = context.composeFromRecieved(data);
                context._displayedWeatherState = result;
            });
        return k;
    }


    composeFromRecieved(obj) {
        let result = [];
        for (let i = 0; i < obj.list.length; i++) {
            let hours = new Date(obj.list[i].dt_txt);
            let period = "";
            hours = hours.getHours();
            if (hours >= 12) {
                hours -= 12;
                period = "PM";
            }
            else {
                period = "AM";
            }
            let temp = {
                city: obj.city.name,
                minTemperature: obj.list[i].main.temp_min,
                maxTemperature: obj.list[i].main.temp_max,
                humidity: obj.list[i].main.humidity,
                pressure: obj.list[i].main.pressure,
                state: obj.list[i].weather[0].main,
                time: hours,
                image: obj.list[i].weather[0].icon,
                timePeriod: period
            };
            result.push(temp);
        }
        this._displayedWeatherState = result;
        return result;
    };

    clearPanels() {
        if (this._displayedPanels.length === 0) return;
        for (let i = 0; i < this._displayedPanels.length; i++) {
            document.getElementById(this._displayedPanels[i]).remove();
        }
        this._displayedPanels = [];
    };

    displayCurrentForecast() {
        let context = this;
        console.log('displaying forecast');
        for (let i = 0; i < context._displayedWeatherState.length; i += 4) {
            la.addPanel(forecast_panel_template, context._displayedWeatherState[i]);
            for (let j = i; j < 4 + i; j++) {
                la.addForecast(forecast_template, context._displayedWeatherState[j], context._displayedPanels.length - 1);
            }
        }
    }
}


let la = new LayoutActions("41fbc5b96ec3cb955eab44d9786d563b", "addf", BuildActions);
function displayForecastById(id) {
    la.clearPanels();
    la.doApiCallbyId(id).then(function () {
        la.displayCurrentForecast()
    });
}
