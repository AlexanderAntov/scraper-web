(function () {
    'use strict';

    angular.module('app', [
        'ui.router',
        'app.const',
        'app.home',
        'app.mainNewsList',
        'app.techNewsList',
        'app.programmingNewsList',
        'app.weatherLineChart',
        'app.keywordsBarChart'
    ])
    .config(AppConfig)
    .controller('appCtrl', AppCtrl);

    function AppConfig($qProvider, $stateProvider) {
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
                controller: 'mainNewsListCtrl',
                templateUrl: 'news-lists/main/main-news-list.html'
            })
            .state('techNewsList', {
                url: '/tech-news-list',
                controller: 'techNewsListCtrl',
                templateUrl: 'news-lists/news-list.html'
            })
            .state('programmingNewsList', {
                url: '/programming-news-list',
                controller: 'programmingNewsListCtrl',
                templateUrl: 'news-lists/news-list.html'
            })
            .state('chartsWeatherLine', {
                url: '/weather-line-chart?city',
                controller: 'weatherLineChartCtrl',
                templateUrl: 'charts/weather/weather-line-chart.html'
            })
            .state('chartsKeywordsBar', {
                url: '/keywords-bar-chart',
                controller: 'keywordsBarChartCtrl',
                templateUrl: 'charts/keywords/keywords-bar-chart.html'
            });
    }

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
