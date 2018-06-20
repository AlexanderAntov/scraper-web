class HomeCtrl {
    constructor($scope, $state) {
        $scope.goToNewsList = () => $state.go('newsList');
        $scope.goToTechNewsList = () => $state.go('techNewsList');
        $scope.goToProgrammingNewsList = () => $state.go('programmingNewsList');
        $scope.goToWeatherCharts = () => $state.go('chartsWeatherLine');
        $scope.goToKeywordsCharts = () => $state.go('chartsKeywordsBar');
    }
}

angular.module('app.home', [])
.controller('homeCtrl', HomeCtrl);
