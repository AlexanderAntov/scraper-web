(function () {
    'use strict';

    angular.module('app.mainNewsList', [
        'app.newsListsService'
    ])
    .controller('mainNewsListCtrl', MainNewsListCtrl);

    function MainNewsListCtrl($http, $scope, $sce, appConst, newsListsService) {
        $scope.summarize = summarize;
        newsListsService.init($scope);

        $http.get('{0}/news?images="true"'.replace('{0}', appConst.backendUrl)).then(function (response) {
            if (response && response.data && response.data.length > 0) {
                response.data.forEach(function (newsModel, index) {
                    if (index === 0 || index === 1) {
                        newsModel.info = newsModel.info.replace(/\n/g, '<br/>');
                    }
                    newsModel.infoHtml = $sce.trustAsHtml(newsModel.info);
                });
                $scope.newsList = response.data;
                $scope.pristineNewsList = response.data;
            }
        });

        function summarize(model) {
            window.open('{0}/scrape/{1}'
                .replace('{0}', appConst.backendUrl)
                .replace('{1}', model.id));
        }
    }
})();
