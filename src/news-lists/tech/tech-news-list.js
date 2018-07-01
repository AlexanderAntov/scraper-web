class TechNewsListCtrl extends BaseNewsController {
    constructor($http, $scope, $sce, appConst) {
        super($http, $scope, $sce, `${appConst.backendUrl}/tech-and-science?images=true`);
    }
}

angular.module('app.techNewsList', [
    'app.components.tileGrid',
    'app.components.searchHeader'
])
.controller('techNewsListCtrl', TechNewsListCtrl);
