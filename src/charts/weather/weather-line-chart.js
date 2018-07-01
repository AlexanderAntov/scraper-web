class WeatherLineChartCtrl {
    constructor($http, $stateParams, appConst) {
        this.$http = $http;
        this.$stateParams = $stateParams;
        this.appConst = appConst;
    }

    $onInit() {
        this.datesList = [];
        this.minValuesList = [];
        this.maxValuesList = [];
        this.cloudsPercentageList = [];
        this.windSpeedList = [];
        let apiUrl;

        if (this.$stateParams.city) {
            apiUrl = `${this.appConst.backendUrl}/weather-raw?city=${this.$stateParams.city}`;
        } else {
            apiUrl = `${this.appConst.backendUrl}/weather-raw`;
        }

        this.$http.get(apiUrl).then((response) => {
            const currentDate = new Date();
            response.data.list.slice(0, -1).forEach((weatherDataItem) => {
                this.datesList.push(currentDate.toDateString().slice(0, -5));
                this.minValuesList.push(weatherDataItem.temp.min);
                this.maxValuesList.push(weatherDataItem.temp.max);
                this.cloudsPercentageList.push(weatherDataItem.clouds);
                this.windSpeedList.push(weatherDataItem.speed);
                currentDate.setDate(currentDate.getDate() + 1);
            });

            this.initSynchronizedHighlight();
            this.initChartsData();
        });
        this.initSynchronizedHighlight();
        this.initChartsData();
    }

    initSynchronizedHighlight() {
        document.getElementById('container').addEventListener('click', (e) => {
            let chart,
                point,
                i,
                event;

            for (i = 0; i < Highcharts.charts.length; i = i + 1) {
                chart = Highcharts.charts[i];
                event = chart.pointer.normalize(e.originalEvent);
                point = chart.series[0].searchPoint(event, true);

                if (point) {
                    point.highlight(e);
                }
            }
        });

        Highcharts.Pointer.prototype.reset = () => {
            return undefined;
        };

        Highcharts.Point.prototype.highlight = (event) => {
            this.onMouseOver();
            this.series.chart.tooltip.refresh(this);
            this.series.chart.xAxis[0].drawCrosshair(event, this);
        };
    }

    initChartsData() {
        Highcharts.chart('temperature-chart-container', {
            title: {
                text: 'Temperature',
                x: -20
            },
            xAxis: {
                categories: this.datesList
            },
            yAxis: {
                title: {
                    text: ''
                },
                plotLines: [
                    {
                        value: 0,
                        width: 1,
                        color: '#808080'
                    }
                ]
            },
            legend: {
                layout: 'vertical',
                align: 'right',
                verticalAlign: 'middle',
                borderWidth: 0
            },
            series: [
                {
                    type: 'line',
                    name: 'max temp',
                    color: '#f96443',
                    data: this.maxValuesList
                }, {
                    type: 'line',
                    name: 'min temp',
                    color: '#43ccf9',
                    data: this.minValuesList
                }
            ]
        });

        Highcharts.chart('clouds-percentage-chart-container', {
            title: {
                text: 'Clouds',
                x: -20
            },
            xAxis: {
                categories: this.datesList
            },
            yAxis: {
                title: {
                    text: ''
                },
                plotLines: [
                    {
                        value: 0,
                        width: 1,
                        color: '#808080'
                    }
                ]
            },
            legend: {
                layout: 'vertical',
                align: 'right',
                verticalAlign: 'middle',
                borderWidth: 0
            },
            series: [
                {
                    type: 'line',
                    name: 'clouds %',
                    color: '#0e2e60',
                    data: this.cloudsPercentageList
                }
            ]
        });

        Highcharts.chart('wind-speed-chart-container', {
            title: {
                text: 'Wind speed',
                x: -20
            },
            xAxis: {
                categories: this.datesList
            },
            yAxis: {
                title: {
                    text: ''
                },
                plotLines: [
                    {
                        value: 0,
                        width: 1,
                        color: '#808080'
                    }
                ]
            },
            legend: {
                layout: 'vertical',
                align: 'right',
                verticalAlign: 'middle',
                borderWidth: 0
            },
            series: [
                {
                    type: 'line',
                    name: 'wind speed',
                    color: '#c7b1cc',
                    data: this.windSpeedList
                }
            ]
        });
    }
}

angular.module('app.weatherLineChart', [])
.controller('weatherLineChartCtrl', WeatherLineChartCtrl);
