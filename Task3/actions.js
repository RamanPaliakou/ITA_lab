/*
* TEMPLATES
* */
let fc = '<div class="forecast box">\n' +
    '                <div class="forecast-image box"></div>\n' +
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
    '       </div>';

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
var PANELARR = [];
var CURRENTDISPLAY={};

function AddForecast(data, panelNo) {
    let forecast = htmlToElement(fc);
    let a = testid() + testid();
    forecast.id = a;
    forecast.querySelector('.forecast-info').querySelector('.min-temperature').innerHTML = data.minTemperature;
    forecast.querySelector('.forecast-info').querySelector('.max-temperature').innerHTML = data.maxTemperature;
    forecast.querySelector('.forecast-info').querySelector('.pressure').innerHTML = data.pressure;
    forecast.querySelector('.forecast-info').querySelector('.humidity').innerHTML = data.humidity;
    let s= "images/" + data.image +".png";
    console.log(s);
    forecast.querySelector('.forecast-image').style.backgroundImage = "url("+s+")";
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

function DoApiCall() {
    fetch("http://api.openweathermap.org/data/2.5/forecast?id=524901&units=metric&APPID=41fbc5b96ec3cb955eab44d9786d563b")
        .then((resp) => resp.json()) // Transform the data into json
        .then(function (data) {
            let res= CURRENTDISPLAY = ComposeFromRecieved(data);
            console.log(data);
            return res;
        });
}
function BuildState() {
    AddPanel(CURRENTDISPLAY[0]);
    for (let i=0;i<CURRENTDISPLAY.length;i++) {
        AddForecast(CURRENTDISPLAY[i],PANELARR.length-1);
    }
}
function ComposeFromRecieved(obj) {
    let result=[];
    for (let i = 0; i < obj.list.length; i++) {
        let temp = {
            city: obj.city.name,
            minTemperature: obj.list[i].main.temp_min,
            maxTemperature: obj.list[i].main.temp_max,
            humidity: obj.list[i].main.humidity,
            pressure: obj.list[i].main.pressure,
            state: obj.list[i].weather[0].main,
            time: obj.list[i].dt_txt,
            image: obj.list[i].weather[0].icon
        };
        result.push(temp);
    }
    return result;
}