/*require.config({
    baseUrl: "",
    paths: {
        "some": ""
    },
    waitSeconds: 15
});
require(['HTMLCreateTemplates'], function (HTMLCreateTemplates) {
    let forecast_template = HTMLCreateTemplates.forecast_template;
    let forecast_panel_template = HTMLCreateTemplates.forecast_panel_template;

});*/
let forecast_template = '<div class="forecast box" >\n' +
    '                <div class="weather-time box" >\n' +
    '                    <div class="forecast-image box" ></div>\n' +
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
"use strict";

function t() {
    return "test";
}

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
        this._waiterAdded = false;
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
        waiter.id = this._buildClass.randomStringGenerator();
        document.getElementById(this._GLOBALPARENTID).appendChild(waiter);
        this._waiterAdded = waiter.id;
    }

    removeWaiter() {
        if (this._waiterAdded !== false) {
            var element = document.getElementById(this._waiterAdded);
            element.parentNode.removeChild(element);
            this._waiterAdded = false;
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
                if (curTime >= maxTime) break;
            }
        }
    }

    clearPanels() {
        if (this._displayedPanels.length === 0) return;
        for (let i = 0; i < this._displayedPanels.length; i++) {
            document.getElementById(this._displayedPanels[i]).remove();
        }
        this._displayedPanels = [];
    };

    displayDoubleLayout() {
        let w = document.getElementById(this._GLOBALPARENTID);
        let maxwidth = (w.offsetWidth - 10) / 2;
        const leftPanelId = this._buildClass.randomStringGenerator();
        const rightPanelId = this._buildClass.randomStringGenerator();
        let p1 = document.createElement('div');
        p1.style.width = maxwidth + 'px';
        p1.id = leftPanelId;
        p1.style.cssFloat = 'left';
        let p2 = document.createElement('div');
        p2.style.width = maxwidth + 'px';
        p2.id = rightPanelId;
        p2.style.cssFloat = 'right';
        document.getElementById(this._GLOBALPARENTID).appendChild(p1);
        document.getElementById(this._GLOBALPARENTID).appendChild(p2);
        return {
            left: leftPanelId,
            right: rightPanelId
        }
    }

    displayCompareMode(city1, city2) {
        let layout = this.displayDoubleLayout(),
            leftPanel = layout.left,
            rightPanel = layout.right;

        this.doApiCallbyId(city1).then(
            () => {
                this.removeWaiter();
                this.displayCurrentForecast(48, 3, leftPanel)
            });
        this.doApiCallbyId(city2).then(
            () => {
                this.removeWaiter();
                this.displayCurrentForecast(48, 3, rightPanel)
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
                    throw new Error('api request mistake encountered, cod: ' + data.cod + ' ' + data.message);
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
                    throw new Error('api request mistake encountered, cod: ' + data.cod + ' ' + data.message);
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
    let id = d.options[d.selectedIndex].value;
    la.clearPanels();
    la.addWaiter();
    la.doApiCallbyId(id).then(function () {
        la.removeWaiter();
        la.displayCurrentForecast(time, 3)
    }).catch(function () {
        la.removeWaiter();
        toggleModal();
    }).then(function () {
        placeallevents();
    });
}

function displayForecastByName() {
    let d = document.getElementById("manual-input-city");
    let name = d.value;
    la.clearPanels();
    la.addWaiter();
    la.doApiCallbyName(name).then(function () {
        la.removeWaiter();
        la.displayCurrentForecast(24, 3)
    }).catch(function (err) {
        la.removeWaiter();
        toggleModal(err);
    });
    placeallevents();

}

function clearAll() {
    la.clearPanels();
}

function Compare() {
    let d = document.getElementById("compare-one-city-selector");
    let var1 = d.options[d.selectedIndex].value;
    d = document.getElementById("compare-two-city-selector");
    let var2 = d.options[d.selectedIndex].value;
    la.clearPanels();
    la.addWaiter();
    la.displayCompareMode(var1, var2);
    placeallevents();
}

var modal = document.getElementById("request-error-modal");
var modalCloseButton = document.querySelector(".modal-close-button");

function placeallevents() {
    let elements = document.getElementsByClassName("forecast-image");
    for (let i = 0; i < elements.length; i++) {
        elements[i].addEventListener("mouseover", handleEventonPicture, true);
    }
}

function toggleModal() {
    if (arguments.length !== 0) {
        modal.querySelector('.modal-text').innerHTML = arguments[0].toString();
    }
    modal.classList.toggle("show-modal");
}

function windowOnClick(event) {
    if (event.target === modal) {
        toggleModal();
    }
}

modalCloseButton.addEventListener("click", toggleModal);
window.addEventListener("click", windowOnClick);

document.onmousemove = moveTip;

function moveTip(e) {
    let floatTipStyle = document.getElementById("floatTip").style;
    let w = 250; // Ширина слоя
    // Для браузера IE
    if (document.all) {
        var x = event.x + document.body.scrollLeft;
        var y = event.y + document.body.scrollTop;
        // Для остальных браузеров
    } else {
        var x = e.pageX; // Координата X курсора
        var y = e.pageY; // Координата Y курсора
    }
    // Показывать слой справа от курсора
    if ((x + w + 10) < document.body.clientWidth) {
        floatTipStyle.left = x + 'px';
        // Показывать слой слева от курсора
    } else {
        floatTipStyle.left = x - w + 'px';
    }
    // Положение от верхнего края окна браузера
    floatTipStyle.top = y + 20 + 'px';
}

function toolTipShow(text) {
    let floatTipStyle = document.getElementById("floatTip").style;
    document.getElementById("floatTip").innerHTML = text;
    floatTipStyle.display = "block";
}

function handleEventonPicture(event) {
    toolTipShow();
    let grandAncister = event.target.parentElement.parentElement;
    console.log(grandAncister);
    grandAncister.addEventListener("mouseover", toolTipShow);
    grandAncister.addEventListener("mouseout", toolTipHide);
}

function toolTipHide() {
    let floatTipStyle = document.getElementById("floatTip").style;
    floatTipStyle.display = "none"; // Прячем слой
}


console.log(grandAncister);
grandAncister.addEventListener("mouseleave", toolTipHide);
grandAncister.addEventListener("mouseenter", toolTipShow);

/*let grandAncisterCoords = event.target.parentNode.parentNode.getBoundingClientRect();
let minX = grandAncisterCoords.left;
let maxX = grandAncisterCoords.right;
let maxY = grandAncisterCoords.bottom;
let minY = grandAncisterCoords.top;
if ((event.clientX < minX || event.clientX > maxX) || (event.clientY < minY || event.clientY > maxY)) {
        floatTipStyle.display = "none";
    }
*/


