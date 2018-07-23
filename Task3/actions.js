/*
import {forecast_template} from "./elements";
import {forecast_panel_template} from "./elements";
are impossible due to site is not in a server and CORS-policy disallows the requests
*/
let forecast_template = '<div class="forecast box">\n' +
    '                <div class="weather-time box">\n' +
    '                    <div class="forecast-image box"></div>\n' +
    '                    <span class="forecast-time box"></span>\n' +
    '               </div>\n                           ' +
    '                <div class="forecast-info box">\n' +
    '                    <div class="min-temperature text-info">10\'C</div>\n' +
    '                    <div class="max-temperature text-info">15\'C</div>\n' +
    '                    <div class="humidity text-info">45%</div>\n' +
    '                    <div class="pressure text-info">0,9atm</div>\n' +
    '                </div>\n' +
    '            </div>';

let forecast_panel_template = '<div id="forecast-panel-template" class="forecast-container box">\n' +
    '            <div class="forecast-container-properties box">\n' +
    '                <span class="forecast-panel-title">Moscow</span>\n' +
    '            </div>\n' +
    '       </div>';

let forecast_inner_panel_template = '<div id="forecast-panel-template" class="forecast-container box">\n' +
    '            <div class="forecast-container-properties box">\n' +
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
        this._waiterAdded=false;
    };

//methods for displaying
    addForecast(obj_forecast, data, panelNo) {
        let forecast = this._buildClass.htmlToElement(obj_forecast);
        forecast.id = this._buildClass.randomStringGenerator();
        forecast.querySelector('.min-temperature').innerHTML = 'min-t(*C):' + data.minTemperature;
        forecast.querySelector('.max-temperature').innerHTML = 'max-t(*C):' + data.maxTemperature;
        forecast.querySelector('.pressure').innerHTML = 'presure: ' + data.pressure;
        forecast.querySelector('.humidity').innerHTML = 'humidity: ' + data.humidity;
        forecast.querySelector('.forecast-image').style.backgroundImage = "url(" + "images/" + data.image + ".png" + ")";
        forecast.querySelector('.forecast-time').innerText = "time:\n" + data.hours + ":00";
        this._displayedForecasts.push(forecast.id);
        document.getElementById(this._displayedPanels[panelNo]).appendChild(forecast);
    };

    addWaiter() {
        let waiter = document.createElement("div");
        waiter.className += "waiter waiter-picture";
        waiter.id=this._buildClass.randomStringGenerator();
        document.getElementById(this._GLOBALPARENTID).appendChild(waiter);
        this._waiterAdded=waiter.id;
    }

    removeWaiter() {
        if(this._waiterAdded !== false) {
            var element = document.getElementById(this._waiterAdded);
            element.parentNode.removeChild(element);
            this._waiterAdded=false;
        }
    }

    addPanel(obj_panel, title) {
        let parent = this._GLOBALPARENTID;
        if (arguments.length === 3) parent = arguments[2];
        let panel = this._buildClass.htmlToElement(obj_panel);
        panel.id = this._buildClass.randomStringGenerator();
        panel.querySelector('.forecast-panel-title').innerText = title;
        this._displayedPanels.push(panel.id);
        document.getElementById(parent).appendChild(panel);
        return this._displayedPanels.length - 1;
    };

    displayCurrentForecast(time, apiPeriod, parentId) {
        let parent = this._GLOBALPARENTID;
        if (arguments.length === 3) parent = arguments[2];
        let maxTime = time;
        let curTime = 0;
        let period = apiPeriod;
        let context = this;
        let j = 0;

        while (j < this._displayedWeatherState.length && curTime < maxTime) {
            let zone = this.getTimePeriod(this._displayedWeatherState[j].hours);
            let panelNo = this.addPanel(forecast_panel_template, this._displayedWeatherState[j].city + ', time-period: ' + zone, parent);
            while ((context.getTimePeriod(this._displayedWeatherState[j].hours)) === zone) {
                this.addForecast(forecast_template, this._displayedWeatherState[j], panelNo);
                j++;
                curTime += period;
                if (curTime >=maxTime) break;
            }
        }
    }

    removeAllChilds() {
        document.getElementById(this._GLOBALPARENTID).innerHTML = "";
        this._displayedPanels = [];
    }

    clearPanels() {
        if (this._displayedPanels.length === 0) return;
        for (let i = 0; i < this._displayedPanels.length; i++) {
            document.getElementById(this._displayedPanels[i]).remove();
        }
        this._displayedPanels = [];
    };

    displayCompareMode(city1, city2) {
        let context = this;
        let w = document.getElementById(this._GLOBALPARENTID);
        let maxwidth = (w.offsetWidth - 10) / 2;
        console.log(maxwidth);
        const leftPanelId = this._buildClass.randomStringGenerator();
        const rightPanelId = this._buildClass.randomStringGenerator();
        let p1 = document.createElement('div');
        p1.style.width = maxwidth+'px';
        p1.id = leftPanelId;
        p1.style.cssFloat = 'left';
        let p2 = document.createElement('div');
        p2.style.width = maxwidth+'px';
        p2.id = rightPanelId;
        p2.style.cssFloat = 'right';
        document.getElementById(this._GLOBALPARENTID).appendChild(p1);
        document.getElementById(this._GLOBALPARENTID).appendChild(p2);
        this.doApiCallbyId(city1).then(
            function () {
                context.removeWaiter();
                context.displayCurrentForecast(48, 3, p1.id)
            });
        this.doApiCallbyId(city2).then(
            function () {
                context.removeWaiter();
                context.displayCurrentForecast(48, 3, p2.id)
            });
    }

//methods for processing api
    doApiCallbyId(cityId) {
        let context = this;
        let result = [];
        let k = fetch("http://api.openweathermap.org/data/2.5/forecast?id=" +
            cityId + "&units=" + "metric" + "&APPID=" + context._appIdentifier)
            .then(data => data.json())
            .then(function (data) {
                if (data.cod !== "200") {
                    throw new Error('incorrect input data');
                }
                result = context.composeFromRecieved(data);
                context._displayedWeatherState = result;
            });
        return k;
    }

    doApiCallbyName(cityName) {
        let context = this;
        let result = [];
        let k = fetch("http://api.openweathermap.org/data/2.5/forecast?q=" +
            cityName + "&units=" + "metric" + "&APPID=" + context._appIdentifier)
            .then(data => data.json())
            .then(function (data) {
                if (data.cod !== "200") {
                    throw new Error('incorrect input data');
                }
                result = context.composeFromRecieved(data);
                context._displayedWeatherState = result;
            });
        return k;
    }

    composeFromRecieved(obj) {
        let result = [];
        for (let i = 0; i < obj.list.length; i++) {
            let hours = new Date(obj.list[i].dt_txt);
            hours = hours.getHours();
            let temp = {
                city: obj.city.name,
                minTemperature: obj.list[i].main.temp_min,
                maxTemperature: obj.list[i].main.temp_max,
                humidity: obj.list[i].main.humidity,
                pressure: obj.list[i].main.pressure,
                state: obj.list[i].weather[0].main,
                hours: hours,
                image: obj.list[i].weather[0].icon,
                timePeriod: "unknown"
            };
            result.push(temp);
        }
        this._displayedWeatherState = result;
        return result;
    };

    getTimePeriod(time) {
        if (+time >= 12) return "PM";
        if (+time < 12) return "AM";
    }

}


let la = new LayoutActions("41fbc5b96ec3cb955eab44d9786d563b", "parent", BuildActions);


function displaySingleForecast(time) {
    let d = document.getElementById("one-city-selector");
    let id= d.options[d.selectedIndex].value;
    la.clearPanels();
    la.addWaiter();
    la.doApiCallbyId(id).then(function () {
        la.removeWaiter();
        la.displayCurrentForecast(time,3)
    }).catch( function() {
        la.removeWaiter();
        toggleModal();
    });
}


function displayForecastByName() {
    let d = document.getElementById("manual-input-city");
    let name=d.value;
    console.log(name);
    la.clearPanels();
    la.addWaiter();
    la.doApiCallbyName(name).then(function () {
        la.removeWaiter();
        la.displayCurrentForecast(24,3)
    }).catch( function() {
        la.removeWaiter();
        toggleModal();
    });

}

function clearAll() {
    la.clearPanels();
}

function Compare() {
    let d = document.getElementById("compare-one-city-selector");
    let var1= d.options[d.selectedIndex].value;
    d= document.getElementById("compare-two-city-selector");
    let var2= d.options[d.selectedIndex].value;
    la.clearPanels();
    la.addWaiter();
    la.displayCompareMode(var1, var2);
}



/**/

var modal = document.querySelector(".modal");
var closeButton = document.querySelector(".close-button");

function toggleModal() {
    modal.classList.toggle("show-modal");
}

function windowOnClick(event) {
    if (event.target === modal) {
        toggleModal();
    }
}

closeButton.addEventListener("click", toggleModal);
window.addEventListener("click", windowOnClick);