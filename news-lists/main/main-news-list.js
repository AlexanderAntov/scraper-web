﻿(function () {
    'use strict';

    angular.module('app.mainNewsList', [])
        .controller('mainNewsListCtrl', MainNewsListCtrl);

    function MainNewsListCtrl($http, $scope, $sce, appConst) {
        $scope.onSearchValueChange = onSearchValueChange;
        $scope.summarize = summarize;
        $scope.$watch('searchInputVisible', cleanSearchValue);

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

        function cleanSearchValue(value) {
            if (!value) {
                $scope.searchValue = '';
                $scope.newsList = $scope.pristineNewsList;
            }
        }

        function onSearchValueChange(value) {
            var filteredNewsList = [],
                lowerCaseValue;

            if (value && value.length > 2) {
                lowerCaseValue = value.toLowerCase();
                $scope.pristineNewsList.forEach(function (newsModel) {
                    if ((newsModel.title && newsModel.title.toLowerCase().indexOf(lowerCaseValue) > -1) ||
                        (newsModel.info && newsModel.info.toLowerCase().indexOf(lowerCaseValue) > -1)) {
                        filteredNewsList.push(newsModel);
                    }
                });
            } else {
                filteredNewsList = $scope.pristineNewsList;
            }

            $scope.newsList = filteredNewsList;
        }
    }
})();