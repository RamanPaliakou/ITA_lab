define('templatesHTML', function (templatesHTML) {
    return {
        forecast_template: '<div class="forecast box" >\n' +
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
        '            </div>',

        forecast_panel_template: '<div id="forecast-panel-template" class="forecast-container box">\n' +
        '            <div class="forecast-container-properties box">\n' +
        '                <span class="forecast-panel-title">Moscow</span>\n' +
        '            </div>\n' +
        '       </div>'

    }
});
