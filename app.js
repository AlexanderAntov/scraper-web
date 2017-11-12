(function () {
    'use strict';

    angular.module('app', [
        'ui.router',
        'app.home',
        'app.newsList',
        'app.techNewsList',
        'app.weatherLineChart',
        'app.keywordsBarChart'
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
            .state('techNewsList', {
                url: '/tech-news-list',
                controller: 'techNewsListCtrl',
                templateUrl: 'tech-news-list/tech-news-list.html'
            })
            .state('chartsWeatherLine', {
                url: '/weather-line-chart?city',
                controller: 'weatherLineChartCtrl',
                templateUrl: 'weather-line-chart/weather-line-chart.html'
            })
            .state('chartsKeywordsBar', {
                url: '/keywords-bar-chart',
                controller: 'keywordsBarChartCtrl',
                templateUrl: 'keywords-bar-chart/keywords-bar-chart.html'
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
