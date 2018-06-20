class ProgrammingNewsListCtrl extends BaseNewsController {
    constructor($http, $scope, $sce, appConst) {
        super($http, $scope, $sce, appConst, '{0}/programming?images="true"');
    }
}

angular.module('app.programmingNewsList', [
    'app.components.tileGrid',
    'app.components.searchHeader'
])
.controller('programmingNewsListCtrl', ProgrammingNewsListCtrl);
