(function () {
    'use strict';

    angular.module('app.weatherLineChart', [])
        .controller('weatherLineChartCtrl', WeatherLineChartCtrl);

    function WeatherLineChartCtrl($http, $stateParams) {
        var datesList = [],
            minValuesList = [],
            maxValuesList = [],
            cloudsPercentageList = [],
            windSpeedList = [],
            apiUrl;

        if ($stateParams.city) {
            apiUrl = 'https://scraper-api.herokuapp.com/weather-raw?city=' + $stateParams.city;
        } else {
            apiUrl = 'https://scraper-api.herokuapp.com/weather-raw';
        }

        $http.get(apiUrl).then(function (response) {
            var currentDate = new Date();
            response.data.list.slice(0, -1).forEach(function (weatherDataItem) {
                datesList.push(currentDate.toDateString().slice(0, -5));
                minValuesList.push(weatherDataItem.temp.min);
                maxValuesList.push(weatherDataItem.temp.max);
                cloudsPercentageList.push(weatherDataItem.clouds);
                windSpeedList.push(weatherDataItem.speed);
                currentDate.setDate(currentDate.getDate() + 1);
            });

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
                        name: 'max temp',
                        color: '#f96443',
                        data: maxValuesList
                    }, {
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
                        name: 'wind speed',
                        color: '#c7b1cc',
                        data: windSpeedList
                    }
                ]
            });
        });
    }
})();
