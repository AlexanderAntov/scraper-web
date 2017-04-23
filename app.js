(function () {
    'use strict';

    angular.module('app', [
        'ui.router',
        'app.home',
        'app.newsList',
        'app.weatherLineChart'
    ])
    .config(function ($qProvider, $stateProvider) {
        $qProvider.errorOnUnhandledRejections(false);
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

        that.goToHome = goToHome;

        init();

        function init() {
            goToHome();
        }

        function goToHome() {
            $state.go('home');
        }
    }
})();
