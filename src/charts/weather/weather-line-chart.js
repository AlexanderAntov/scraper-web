(function () {
    'use strict';

    angular.module('app.weatherLineChart', [])
        .controller('weatherLineChartCtrl', WeatherLineChartCtrl);

    function WeatherLineChartCtrl($http, $stateParams, appConst) {
        var datesList = [],
            minValuesList = [],
            maxValuesList = [],
            cloudsPercentageList = [],
            windSpeedList = [],
            apiUrl;

        if ($stateParams.city) {
            apiUrl = '{0}/weather-raw?city=' + $stateParams.city;
        } else {
            apiUrl = '{0}/weather-raw';
        }

        $http.get(apiUrl.replace('{0}', appConst.backendUrl)).then(function (response) {
            var currentDate = new Date();
            response.data.list.slice(0, -1).forEach(function (weatherDataItem) {
                datesList.push(currentDate.toDateString().slice(0, -5));
                minValuesList.push(weatherDataItem.temp.min);
                maxValuesList.push(weatherDataItem.temp.max);
                cloudsPercentageList.push(weatherDataItem.clouds);
                windSpeedList.push(weatherDataItem.speed);
                currentDate.setDate(currentDate.getDate() + 1);
            });

            initSynchronizedHighlight();
            initChartsData();
        });

        function initSynchronizedHighlight() {
            document.getElementById('container').addEventListener('click', function (e) {
                var chart,
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

            Highcharts.Pointer.prototype.reset = function () {
                return undefined;
            };

            Highcharts.Point.prototype.highlight = function (event) {
                this.onMouseOver();
                this.series.chart.tooltip.refresh(this);
                this.series.chart.xAxis[0].drawCrosshair(event, this);
            };
        }

        function initChartsData() {
            Highcharts.chart('temperature-chart-container', {
                title: {
                    text: 'Temperature',
                    x: -20
                },
                xAxis: {
                    categories: datesList
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
                        data: maxValuesList
                    }, {
                        type: 'line',
                        name: 'min temp',
                        color: '#43ccf9',
                        data: minValuesList
                    }
                ]
            });

            Highcharts.chart('clouds-percentage-chart-container', {
                title: {
                    text: 'Clouds',
                    x: -20
                },
                xAxis: {
                    categories: datesList
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
                        data: cloudsPercentageList
                    }
                ]
            });

            Highcharts.chart('wind-speed-chart-container', {
                title: {
                    text: 'Wind speed',
                    x: -20
                },
                xAxis: {
                    categories: datesList
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
                        data: windSpeedList
                    }
                ]
            });
        }
    }
})();
