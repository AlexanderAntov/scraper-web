class BaseNewsController {
    constructor($http, $scope, $sce, restUrl) {
        this.$http = $http;
        this.$scope = $scope;
        this.$sce = $sce;
        this.restUrl = restUrl;
    }

    $onInit() {
        NewsListsService.init(this.$scope);

        this.$http.get(this.restUrl).then(response => {
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
