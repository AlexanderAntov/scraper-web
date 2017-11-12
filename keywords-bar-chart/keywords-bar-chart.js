(function () {
    'use strict';

    angular.module('app.keywordsBarChart', [])
        .controller('keywordsBarChartCtrl', KeywordsBarChartCtrl);

    function KeywordsBarChartCtrl($http) {
        $http.get('https://scraper-api.herokuapp.com/news-keywords').then(function (response) {
        });
    }
})();
