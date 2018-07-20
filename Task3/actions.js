

function htmlToElement(html) {
    var template = document.createElement('template');
    html = html.trim(); // Never return a text node of whitespace as the result
    template.innerHTML = html;
    return template.content.firstChild;
}

var td = htmlToElement('<td>foo</td>'),
    div = htmlToElement('<div><span>nested</span> <span>stuff</span></div>');

/**
 * @param {String} HTML representing any number of sibling elements
 * @return {NodeList}
 */
function htmlToElements(html) {
    var template = document.createElement('template');
    template.innerHTML = html;
    return template.content.childNodes;
}

var element1 = htmlToElement(' <div class="forecast-container box">\n' +
    '            <div class="forecast-container-properties box">\n' +
    '                <span class="forecast-property-city-name">Moscow</span>\n' +
    '                <span class="forecast-property-date">2012-01-25 Post Meridiem </span>\n' +
    '            </div>\n' +
    '            <div class="forecast box">\n' +
    '                <div class="forecast-image box sunny"></div>\n' +
    '                <div class="forecast-info box">\n' +
    '                    <div class="min-temperature text-info">10\'C</div>\n' +
    '                    <div class="max-temperature text-info">15\'C</div>\n' +
    '                    <div class="humidity text-info">45%</div>\n' +
    '                    <div class="pressure text-info">0,9atm</div>\n' +
    '                </div>\n' +
    '                <div class="forecast-time box test-time"></div>\n' +
    '            </div>\n' +
    '            <div class="forecast box">\n' +
    '                <div class="forecast-image box sunny"></div>\n' +
    '                <div class="forecast-info box">\n' +
    '                    <div class="min-temperature text-info">10\'C</div>\n' +
    '                    <div class="max-temperature text-info">15\'C</div>\n' +
    '                    <div class="humidity text-info">45%</div>\n' +
    '                    <div class="pressure text-info">0,9atm</div>\n' +
    '                </div>\n' +
    '                <div class="forecast-time box test-time"></div>\n' +
    '            </div>\n' +
    '            <div class="forecast box">\n' +
    '                <div class="forecast-image box sunny"></div>\n' +
    '                <div class="forecast-info box">\n' +
    '                    <div class="min-temperature text-info">10\'C</div>\n' +
    '                    <div class="max-temperature text-info">15\'C</div>\n' +
    '                    <div class="humidity text-info">45%</div>\n' +
    '                    <div class="pressure text-info">0,9atm</div>\n' +
    '                </div>\n' +
    '                <div class="forecast-time box test-time"></div>\n' +
    '            </div>\n' +
    '            <div class="forecast box">\n' +
    '                <div class="forecast-image box sunny"></div>\n' +
    '                <div class="forecast-info box">\n' +
    '                    <div class="min-temperature text-info">10\'C</div>\n' +
    '                    <div class="max-temperature text-info">15\'C</div>\n' +
    '                    <div class="humidity text-info">45%</div>\n' +
    '                    <div class="pressure text-info">0,9atm</div>\n' +
    '                </div>\n' +
    '                <div class="forecast-time box test-time"></div>\n' +
    '            </div>\n' +
    '        </div>');
function Do() {
    document.getElementById('addf').appendChild(element1.cloneNode(true));
}

