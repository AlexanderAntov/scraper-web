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
                url: '/',
                controller: 'appCtrl',
                templateUrl: 'index.html'
            })
            .state('home', {
                url: '/home',
                controller: 'homeCtrl',
                templateUrl: 'home/home.html'
            })
            .state('newsList', {
                url: '/news-list',
                controller: 'newsListCtrl',
                templateUrl: 'news-list/news-list.html'
            })
            .state('chartsWeatherLine', {
                url: '/weather-line-chart?city',
                controller: 'weatherLineChartCtrl',
                templateUrl: 'weather-line-chart/weather-line-chart.html'
            });
    })
    .controller('appCtrl', AppCtrl);

    function AppCtrl($state) {
        var that = this;

        that.goToIndex = goToIndex;

        init();

        function init() {
            $state.go('newsList');
        }

        function goToIndex() {
            $state.go('newsList');
        }
    }
})();
