class SummarizeNewsCtrl {
    constructor($http, $stateParams, $scope, appConst) {
        this.$http = $http;
        this.$stateParams = $stateParams;
        this.$scope = $scope;
        this.appConst = appConst;
    }

    $onInit() {
        this.$scope.summaryVisible = true;
        this.$scope.toggleSummary = () => {
            this.$scope.summaryVisible = !this.$scope.summaryVisible;
        };

        this.$http.get(`${this.appConst.backendUrl}/scrape/${this.$stateParams.id}`).then((response) => {
            if (response && response.data) {
                this.$scope.summary = response.data.summary;
                this.$scope.fullText = response.data.text;
                this.$scope.percentOfOriginalText = Math.round(
                    (1 - response.data.summary.length / response.data.text.length) * 100
                );
            }
        });
    }
}

angular.module('app.summarizeNews', [])
.controller('summarizeNewsCtrl', SummarizeNewsCtrl);