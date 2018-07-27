"use strict";

//INITIALIZATION
/*init templates*/
let forecast_template;
let forecast_panel_template;
require(['templatesHTML'], function (templatesHTML) {
    forecast_template = templatesHTML.forecast_template;
    forecast_panel_template = templatesHTML.forecast_panel_template;
});

/*init operational classes*/
let layoutActions;
let apiActions;
let basicActions;
require(['primitive', 'api', 'layout'], function (primitive, api, layout) {
    basicActions = new primitive.basicClass();
    layoutActions = new layout.actionsClass("parent", basicActions);
    apiActions = new api.processorClass("41fbc5b96ec3cb955eab44d9786d563b", basicActions);
});
//END-INITIALIZATION

//MAIN
/*button functions*/
function displaySingleForecast(period, apiInterval) {
    //get selected city from page
    let d = document.getElementById("one-city-selector");
    let id = d.options[d.selectedIndex].value;
    let state = {};

    //pre-display preparation
    layoutActions.clearPanels();
    layoutActions.addWaiter();
    apiActions.recieveWeatherById(id)
        .then(function () {
            state = apiActions.getWeather();
        })
        .then(function () {
            layoutActions.removeWaiter();
            layoutActions.displaySingleCityForecast(state, period, apiInterval)
        })
        .then(function () {
            placeEventsOnForecast();
        })
        .catch(function () {
            layoutActions.removeWaiter();
            toggleModal();
        });
}

function displayForecastByName(period, apiInterval) {
    //get city name from page
    let d = document.getElementById("manual-input-city");
    let name = d.value;
    let state = {};

    //pre-display preparation
    layoutActions.clearPanels();
    layoutActions.addWaiter();
    apiActions.recieveWeatherByName(name)
        .then(function () {
            state = apiActions.getWeather();
        })
        .then(function () {
            layoutActions.removeWaiter();
            layoutActions.displaySingleCityForecast(state, period, apiInterval);
        })
        .then(function () {
            placeEventsOnForecast();
        })
        .catch(function (err) {
            layoutActions.removeWaiter();
            toggleModal(err);
        });
}

function compareTwoForecasts(period, apiInterval) {
    //get info from web page
    let d = document.getElementById("compare-first-city-selector");
    let cityOne = d.options[d.selectedIndex].value;
    d = document.getElementById("compare-second-city-selector");
    let cityTwo = d.options[d.selectedIndex].value;

    //display double layout, get all id-s and init state
    let panels = layoutActions.showDoubleLayout();
    let leftPanel = panels.left;
    let rightPanel = panels.right;
    let stateOne = {};
    let stateTwo = {};

    //pre-display events
    layoutActions.clearPanels();
    layoutActions.addWaiter();

    //do requests and display forecasts
    apiActions.recieveWeatherById(cityOne)
        .then(() => {
            stateOne = apiActions.getWeather();
        })
        .then(() => {
            layoutActions.removeWaiter();
            layoutActions.displaySingleCityForecast(stateOne, period, apiInterval, leftPanel)
        })
        .then(function () {
            placeEventsOnForecast();
        })
        .catch(function (err) {
            layoutActions.removeWaiter();
            toggleModal(err);
        });
    apiActions.recieveWeatherById(cityTwo)
        .then(() => {
            stateTwo = apiActions.getWeather();
        })
        .then(() => {
            layoutActions.removeWaiter();
            layoutActions.displaySingleCityForecast(stateTwo, period, apiInterval, rightPanel)
        })
        .then(function () {
            placeEventsOnForecast();
        })
        .catch(function (err) {
            layoutActions.removeWaiter();
            toggleModal(err);
        });
}

function placeEventsOnForecast() {
    let elements = document.getElementsByClassName("forecast-image");
    for (let i = 0; i < elements.length; i++) {
        elements[i].addEventListener("mouseover", handleEventOnPicture, true);
    }
}

/*modal window handling*/
let modal = document.getElementById("request-error-modal");
let modalCloseButton = document.querySelector(".modal-close-button");
modalCloseButton.addEventListener("click", toggleModal);
window.addEventListener("click", windowOnClick);

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

/*appearing tip handling*/
document.onmousemove = moveTip;

function moveTip(event) {
    let floatTipStyle = document.getElementById("floatTip").style;
    let w = 250;
    let x = event.pageX;
    let y = event.pageY;
    //ie check
    if (document.all) {
        x = event.x + document.body.scrollLeft;
        y = event.y + document.body.scrollTop;
    }
    if ((x + w + 10) < document.body.clientWidth) {
        floatTipStyle.left = x + 'px';
    }
    else {
        floatTipStyle.left = x - w + 'px';
    }
    floatTipStyle.top = y + 20 + 'px';
}

function toolTipShow(text) {
    let floatTipStyle = document.getElementById("floatTip").style;
    document.getElementById("floatTip").innerHTML = text;
    floatTipStyle.display = "block";
}

function tooltipHide() {
    let floatTipStyle = document.getElementById("floatTip").style;
    floatTipStyle.display = "none";
}

function handleEventOnPicture(event) {
    let grandAncister = event.target.parentElement.parentElement;
    let minTemp = grandAncister.querySelector('.min-temperature').innerHTML;
    let maxTemp = grandAncister.querySelector('.max-temperature').innerHTML;
    let avgTemperature;
    minTemp = minTemp.substring(minTemp.indexOf(': ') + 1);
    maxTemp = maxTemp.substring(maxTemp.indexOf(': ') + 1);
    avgTemperature = 'avg t(*C): ' + ((parseFloat(minTemp) + parseFloat(maxTemp)) / 2).toPrecision(4);
    toolTipShow(avgTemperature);

    grandAncister.addEventListener("mouseover", handleEventOnAncister);
    grandAncister.addEventListener("mouseout", tooltipHide);
}

function handleEventOnAncister(event) {
    let am = event.currentTarget;
    console.log(am);
    let minTemp = am.querySelector('.min-temperature').innerHTML;
    let maxTemp = am.querySelector('.max-temperature').innerHTML;
    let avgTemperature;
    minTemp = minTemp.substring(minTemp.indexOf(': ') + 1);
    maxTemp = maxTemp.substring(maxTemp.indexOf(': ') + 1);
    avgTemperature = 'avg t(*C): ' + ((parseFloat(minTemp) + parseFloat(maxTemp)) / 2).toPrecision(4);
    toolTipShow(avgTemperature);
}

//END-MAIN

