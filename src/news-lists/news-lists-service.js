class NewsListsService {
    static init(scope) {
        scope.onSearchValueChange = (value) => this.onSearchValueChange(scope, value);
        scope.$watch('searchInputVisible', (value) => this.cleanSearchValue(scope, value));
    }

    static cleanSearchValue(scope, value) {
        if (!value) {
            scope.searchValue = '';
            scope.newsList = scope.pristineNewsList;
        }
    }

    static onSearchValueChange(scope, value) {
        let filteredNewsList = [],
            lowerCaseValue;

        if (value && value.length > 2) {
            lowerCaseValue = value.toLowerCase();
            scope.pristineNewsList.forEach((newsModel) => {
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