(function () {
    'use strict';

    angular.module('app.home', [])
        .controller('homeCtrl', HomeCtrl);

    function HomeCtrl($scope, $state) {
        $scope.goToNewsList = goToNewsList;
        $scope.goToWeatherCharts = goToWeatherCharts;

        function goToNewsList() {
            $state.go('newsList');
        }

        function goToWeatherCharts() {
            $state.go('chartsWeatherLine');
        }
    }
})();
