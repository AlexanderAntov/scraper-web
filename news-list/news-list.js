﻿(function () {
    'use strict';

    angular.module('app.newsList', [])
        .controller('newsListCtrl', NewsListCtrl);

    function NewsListCtrl($http, $scope) {
        $http.get('https://scraper-api.herokuapp.com/news?images="true"').then(function (response) {
            $scope.newsList = response.data;
        });
    }
})();
