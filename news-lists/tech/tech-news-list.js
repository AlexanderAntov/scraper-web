﻿(function () {
    'use strict';

    angular.module('app.techNewsList', [])
        .controller('techNewsListCtrl', TechNewsListCtrl);

    function TechNewsListCtrl($http, $scope, $sce, appConst) {
        $scope.onSearchValueChange = onSearchValueChange;
        $scope.$watch('searchInputVisible', cleanSearchValue);

        $http.get('{0}/tech-and-science?images="true"'.replace('{0}', appConst.backendUrl)).then(function (response) {
            if (response && response.data && response.data.length > 0) {
                response.data.forEach(function (newsModel, index) {
                    newsModel.infoHtml = $sce.trustAsHtml(newsModel.info);
                });
                $scope.newsList = response.data;
                $scope.pristineNewsList = response.data;
            }
        });

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