/*
* TEMPLATES
* */
let fc = '<div class="forecast box">\n' +
    '                <div class="forecast-image box sunny"></div>\n' +
    '                <div class="forecast-info box">\n' +
    '                    <div class="min-temperature text-info">10\'C</div>\n' +
    '                    <div class="max-temperature text-info">15\'C</div>\n' +
    '                    <div class="humidity text-info">45%</div>\n' +
    '                    <div class="pressure text-info">0,9atm</div>\n' +
    '                </div>\n' +
    '                <div class="forecast-time box test-time"></div>\n' +
    '            </div>';

let fp = '<div id="forecast-panel-template" class="forecast-container box">\n' +
    '            <div class="forecast-container-properties box">\n' +
    '                <span class="forecast-property-city-name">Moscow</span>\n' +
    '                <span class="forecast-property-date">2012-01-25 Post Meridiem </span>\n' +
    '            </div>\n' +
    '        </div>';

let testMeteo = {
    city: 'Moscow',
    minTemperature: 10,
    maxTemperature: 20,
    humidity: 5,
    pressure: 1,
    state: 'sunny',
    time: Date.parse('2012-01-23')
};

/**
 * END TEMPLATES
 * ADD FUNCTIONS
 */
function testid() {
    return Math.random().toString(36).substr(2);
}

function htmlToElement(html) {

    var template = document.createElement('template');
    html = html.trim(); // Never return a text node of whitespace as the result
    template.innerHTML = html;
    return template.content.firstChild;
}

/*
* END ADD FUNCTIONS
* MAIN FUNCTIONS
* */
var PANELARR=[];
function AddForecast(data,panelNo) {
    let forecast = htmlToElement(fc);
    let a = testid() + testid();
    forecast.id = a;
    forecast.querySelector('.forecast-info').querySelector('.min-temperature').innerHTML = data.minTemperature;
    forecast.querySelector('.forecast-info').querySelector('.max-temperature').innerHTML = data.maxTemperature;
    forecast.querySelector('.forecast-info').querySelector('.pressure').innerHTML = data.pressure;
    forecast.querySelector('.forecast-info').querySelector('.humidity').innerHTML = data.humidity;
    document.getElementById(PANELARR[panelNo]).appendChild(forecast);
}

function AddPanel(obj) {
    let panel = htmlToElement(fp);
    panel.querySelector('.forecast-container-properties').querySelector('.forecast-property-city-name').innerText = obj.city;
    panel.querySelector('.forecast-container-properties').querySelector('.forecast-property-date').innerText = obj.time.toString();
    let a = testid() + testid();
    panel.id = a;
    document.getElementById('addf').appendChild(panel);
    PANELARR.push(a);
}

function CreateForecast(obj) {
    let fcast = document.createElement('DIV');
    fcast.className += "forecast box";
    let fcast_img = document.createElement('fcast_img');
    fcast_img.className += "forecast-image box";
    let fcast_info = document.createElement('fc st_info');
    fcast_info.className += "forecast-info box";
    let fcast_info_maxtemp = document.createElement('fcast_info');
}
