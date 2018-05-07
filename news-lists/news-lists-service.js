(function () {
    'use strict';

    angular.module('app.newsListsService', [])
        .service('newsListsService', NewsListsService);

    function NewsListsService() {
        var that = this;

        that.init = init;

        function init(scope) {
            scope.onSearchValueChange = onSearchValueChange;
            scope.$watch('searchInputVisible', cleanSearchValue);

            function cleanSearchValue(value) {
                if (!value) {
                    scope.searchValue = '';
                    scope.newsList = scope.pristineNewsList;
                }
            }
    
            function onSearchValueChange(value) {
                var filteredNewsList = [],
                    lowerCaseValue;
    
                if (value && value.length > 2) {
                    lowerCaseValue = value.toLowerCase();
                    scope.pristineNewsList.forEach(function (newsModel) {
                        if ((newsModel.title && newsModel.title.toLowerCase().indexOf(lowerCaseValue) > -1) ||
                            (newsModel.info && newsModel.info.toLowerCase().indexOf(lowerCaseValue) > -1)) {
                            filteredNewsList.push(newsModel);
                        }
                    });
                } else {
                    filteredNewsList = scope.pristineNewsList;
                }
    
                scope.newsList = filteredNewsList;
            }
        }
    }
})();