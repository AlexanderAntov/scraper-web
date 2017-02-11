(function () {
    'use strict';

    angular.module('app', [
        'ui.router',
        'app.newsList',
        'app.weatherLineChart'
    ])
    .config(function ($stateProvider) {
        $stateProvider
            .state('app', {
                url: '/home',
                controller: 'appCtrl',
                templateUrl: 'index.html'
            })
            .state('newsList', {
                url: '/news-list',
                controller: 'newsListCtrl',
                templateUrl: 'news-list/news-list.html'
            })
            .state('chartsWeatherLine', {
                url: '/weather-line-chart',
                controller: 'weatherLineChartCtrl',
                templateUrl: 'weather-line-chart/weather-line-chart.html'
            });
    })
    .controller('appCtrl', AppCtrl);

    function AppCtrl() {
    }
})();
