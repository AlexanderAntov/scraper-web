class AppConfig {
    constructor($qProvider, $stateProvider) {
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
                templateUrl: 'src/home/home.html'
            })
            .state('newsList', {
                url: '/news-list',
                controller: 'mainNewsListCtrl',
                templateUrl: 'src/news-lists/main/main-news-list.html'
            })
            .state('techNewsList', {
                url: '/tech-news-list',
                controller: 'techNewsListCtrl',
                templateUrl: 'src/news-lists/news-list.html'
            })
            .state('programmingNewsList', {
                url: '/programming-news-list',
                controller: 'programmingNewsListCtrl',
                templateUrl: 'src/news-lists/news-list.html'
            })
            .state('summarizeNews', {
                url: '/summarize-news/:id',
                controller: 'summarizeNewsCtrl',
                templateUrl: 'src/news-lists/summarize-news/summarize-news.html',
                params: {
                    id: null
                }
            })
            .state('chartsWeatherLine', {
                url: '/weather-line-chart?city',
                controller: 'weatherLineChartCtrl',
                templateUrl: 'src/charts/weather/weather-line-chart.html'
            })
            .state('chartsKeywordsBar', {
                url: '/keywords-bar-chart',
                controller: 'keywordsBarChartCtrl',
                templateUrl: 'src/charts/keywords/keywords-bar-chart.html'
            });
    }
}

class AppCtrl {
    constructor($state) {
        this.goToHome = () => $state.go('home');
        this.goToHome();
    }
}

angular.module('app', [
    'ui.router',
    'app.const',
    'app.home',
    'app.mainNewsList',
    'app.techNewsList',
    'app.programmingNewsList',
    'app.summarizeNews',
    'app.weatherLineChart',
    'app.keywordsBarChart'
])
.config(AppConfig)
.controller('appCtrl', AppCtrl);


