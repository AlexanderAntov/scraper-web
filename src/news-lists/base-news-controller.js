class BaseNewsController {
    constructor($http, $scope, $sce, appConst, restUrl) {
        this.$http = $http;
        this.$scope = $scope;
        this.$sce = $sce;
        this.appConst = appConst;
        this.restUrl = restUrl;
    }

    $onInit() {
        NewsListsService.init(this.$scope);

        this.$http.get(this.restUrl.replace('{0}', this.appConst.backendUrl)).then((response) => {
            if (response && response.data && response.data.length > 0) {
                response.data.forEach((newsModel, index) => {
                    newsModel.infoHtml = this.$sce.trustAsHtml(newsModel.info);
                });
                this.$scope.newsList = response.data;
                this.$scope.pristineNewsList = response.data;
            }
        });
    }
}
