define('layout', function () {
    class LayoutActions {

        constructor(parentId, operatorClass) {
            this._displayedFCPanels = [];
            this._displayedFCWindows = [];
            this._displayedWaiterId = "";
            this._globalParentId = parentId;
            this._operatorClass = operatorClass;
            this._waiterDisplayedFlag = false;
        };

        htmlToElement(html) {
            let template = document.createElement('template');
            html = html.trim();
            template.innerHTML = html;
            return template.content.firstChild;
        };

        addWaiter() {
            let waiter = document.createElement("div");
            waiter.className += "waiter waiter-picture";
            waiter.id = this._operatorClass.randomStringGenerator();
            document.getElementById(this._globalParentId).appendChild(waiter);
            this._waiterDisplayedFlag = true;
            this._displayedWaiterId = waiter.id;
        }

        removeWaiter() {
            if (this._waiterDisplayedFlag !== false) {
                let waiter = document.getElementById(this._displayedWaiterId);
                waiter.parentNode.removeChild(waiter);
                this._waiterDisplayedFlag = false;
                this._displayedWaiterId = "";
            }
        }

        showDoubleLayout() {
            //double layout is two half-sized standard layouts
            let maxwidth = (document.getElementById(this._globalParentId).offsetWidth - 10) / 2;

            let leftPanel = document.createElement('div');
            leftPanel.id = this._operatorClass.randomStringGenerator();
            leftPanel.style.width = maxwidth + 'px';
            leftPanel.style.cssFloat = 'left';

            let rightPanel = document.createElement('div');
            rightPanel.id = this._operatorClass.randomStringGenerator();
            rightPanel.style.width = maxwidth + 'px';
            rightPanel.style.cssFloat = 'right';

            document.getElementById(this._globalParentId).appendChild(leftPanel);
            document.getElementById(this._globalParentId).appendChild(rightPanel);
            return {
                left: leftPanel.id,
                right: rightPanel.id
            }
        }

        /*changed to panelId*/
        addForecast(forecastHtmlTemplate, displayData, panelId) {
            //create element
            let forecast = this.htmlToElement(forecastHtmlTemplate);
            forecast.id = this._operatorClass.randomStringGenerator();
            //filling data
            forecast.querySelector('.min-temperature').innerHTML = 'min-t(*C): ' + displayData.minTemperature;
            forecast.querySelector('.max-temperature').innerHTML = 'max-t(*C): ' + displayData.maxTemperature;
            forecast.querySelector('.pressure').innerHTML = 'presure: ' + displayData.pressure;
            forecast.querySelector('.humidity').innerHTML = 'humidity: ' + displayData.humidity;
            forecast.querySelector('.forecast-image').style.backgroundImage = "url(" + "images/" + displayData.image + ".png" + ")";
            forecast.querySelector('.forecast-time').innerText = "time:\n" + displayData.hours + ":00";
            //add to displayed FCWindows array
            this._displayedFCWindows.push(forecast.id);
            //append
            document.getElementById(panelId).appendChild(forecast);
            return forecast.id;
        };

        addPanel(panelHtmlTemplate, title) {
            //remember parent. differs when comparison layout is displayed
            let parent = this._globalParentId;
            if (arguments.length === 3) parent = arguments[2];
            //create element
            let panel = this.htmlToElement(panelHtmlTemplate);
            panel.id = this._operatorClass.randomStringGenerator();
            //filling data
            panel.querySelector('.forecast-panel-title').innerText = title;
            //add to displayed FCPanlels array
            this._displayedFCPanels.push(panel.id);
            //append
            document.getElementById(parent).appendChild(panel);
            return panel.id;
        };

        clearPanels() {
            if (this._displayedFCPanels.length === 0) return;
            for (let i = 0; i < this._displayedFCPanels.length; i++) {
                document.getElementById(this._displayedFCPanels[i]).remove();
            }
            this._displayedFCPanels = [];
        };

        /*changed length*/
        displaySingleCityForecast(FCdata, displayedPeriod, apiPeriod) {
            let parent = this._globalParentId;
            if (arguments.length >= 4) parent = arguments[3];

            let context = this;
            let maxTime = displayedPeriod,
                curTime = 0,
                period = apiPeriod;

            let j = 0;
            while (j < FCdata.length && curTime < maxTime) {
                //create panel to display forecasts
                let timeZone = this._operatorClass.getTimePeriod(FCdata[j].hours);
                let panelId = this.addPanel(forecast_panel_template, FCdata[j].city + '; ' + FCdata[j].month +', '+FCdata[j].day +'; time-period: ' + timeZone, parent);
                //add forecast windows to panel
                while ((context._operatorClass.getTimePeriod(FCdata[j].hours)) === timeZone) {
                    this.addForecast(forecast_template, FCdata[j], panelId);
                    j++;
                    //inc total displayed weather forecast and check for number of displayed
                    curTime += period;
                    if (curTime >= maxTime || j>= FCdata.length) break;
                }
            }
        }

    }
    return {
        actionsClass: LayoutActions
    }
});