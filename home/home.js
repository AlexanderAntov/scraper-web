(function () {
    'use strict';

    angular.module('app.home', [])
        .controller('homeCtrl', HomeCtrl);

    function HomeCtrl($scope, $state) {
        $scope.goToNewsList = goToNewsList;
        $scope.goToTechNewsList = goToTechNewsList;
        $scope.goToWeatherCharts = goToWeatherCharts;
        $scope.goToKeywordsCharts = goToKeywordsCharts;

        function goToNewsList() {
            $state.go('newsList');
        }

        function goToTechNewsList() {
            $state.go('techNewsList');
        }

        function goToWeatherCharts() {
            $state.go('chartsWeatherLine');
        }

        function goToKeywordsCharts() {
            $state.go('chartsKeywordsBar');
        }
    }
})();
